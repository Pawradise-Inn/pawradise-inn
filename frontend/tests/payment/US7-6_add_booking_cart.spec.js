// everytime you fail this test clear data where booking must go because
// this test actually booking room and service so if data is already occupied
// it mean test data can't not be create

import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app; // Declare in outer scope
let petData;

let bookedRoom = [];
let bookedService = [];

const findCard = async (
  page,
  {
    name,
    pet_name,
    price,
    entryDate = null,
    exitDate = null,
    entryTime = null,
  },
  type
) => {
  const card = await page
    .getByTestId("cart-card")
    .filter({ hasText: `${type} ${name}` })
    .filter({ hasText: `for ${pet_name}` })
    .filter({ hasText: `price ${price.toFixed(2)} THB` })
    .filter({
      hasText:
        type === "Service"
          ? `entryDate & entryTime /  ${entryDate} & ${entryTime}`
          : `entryDate & exitDate /  ${entryDate} & ${exitDate}`,
    });

  return card;
};

test.beforeEach(async ({ page }) => {
  app = new TestPage(page);
  await app.login();

  // Create shared pet for all tests
  petData = await app.addPet({ name: "TestPet", type: "DOG" });

  // Create 2 room bookings
  const bookedRoomData1 = await app.createBookingRoom(
    petData.data,
    "Choose Thursday, November 27th,",
    "Choose Friday, November 28th,"
  );

  const bookedRoomData2 = await app.createBookingRoom(
    petData.data,
    "Choose Saturday, November 29th,",
    "Choose Sunday, November 30th,"
  );

  const bookedServiceData1 = await app.createBookingService(
    petData.data,
    "Choose Thursday, November 27th,",
    "10:00"
  );

  const bookedServiceData2 = await app.createBookingService(
    petData.data,
    "Choose Friday, November 28th,",
    "10:00"
  );

  const bookedServiceData3 = await app.createBookingService(
    petData.data,
    "Choose Saturday, November 29th,",
    "12:00"
  );

  bookedRoom.push(bookedRoomData1, bookedRoomData2);
  bookedService.push(
    bookedServiceData1,
    bookedServiceData2,
    bookedServiceData3
  );
});

test.afterEach(async () => {
  if (app && petData) {
    // Clean up: Delete all bookings first, then the pet
    bookedRoom.forEach(async (item) => {
      await findCard(item, "Room")
        .getByRole("button", { name: "Delete" })
        .click();
    });
    bookedService.forEach(async (item) => {
      await findCard(item, "Service")
        .getByRole("button", { name: "Delete" })
        .click();
    });
    await app.deletePet(petData.data.id);
  }
});

test("Initial load element", async ({ page }) => {
  await page.getByTestId("cart-icon").click();

  await expect(page.getByText("Cart")).toBeVisible();
  await expect(page.getByRole("button", { name: "Payment" })).toBeVisible();
  await expect(page.getByTestId("check all")).not.toBeVisible();
  await expect(page.getByTestId("navigatorNavbar")).not.toBeVisible();
  await expect(page).toHaveURL("http://localhost:3000/cart");

  bookedRoom.forEach(async (item) => {
    const card = await findCard(item, "Room");
    await expect(card).toBeVisible();
    await expect(card.getByRole("img")).toBeVisible();
    await expect(card.getByRole("button", { name: "Delete" })).toBeVisible();
    await expect(card.getByRole("checkbox")).toBeVisible();
    await expect(card.getByRole("checkbox")).not.toBeChecked();
  });

  bookedService.forEach(async (item) => {
    const card = await findCard(item, "Service");
    await expect(card).toBeVisible();
    await expect(card.getByRole("img")).toBeVisible();
    await expect(card.getByRole("button", { name: "Delete" })).toBeVisible();
    await expect(card.getByRole("checkbox")).toBeVisible();
    await expect(card.getByRole("checkbox")).not.toBeChecked();
  });

  await expect(page.getByTestId("check-all")).not.toBeChecked();
  await expect(page.getByText(`Total 0.00 THB`)).toBeVisible();
});

test("Adding and Deleting cart card for Room and Service", async ({ page }) => {
  await page.getByTestId("cart-icon").click();
  const itemsAmount = await page.getByTestId("cart-card").count();

  const bookedRoomData = await app.createBookingRoom(
    petData.data,
    "Choose Thursday, November 27th,",
    "Choose Friday, November 28th,"
  );
  const bookedServiceData = await app.createBookingService(
    petData.data,
    "Choose Sunday, November 30th,",
    "14:00"
  );

  await page.getByTestId("cart-icon").click();
  expect(await page.getByTestId("cart-card").count()).toBe(itemsAmount + 2);

  const bookedRoomCard = await findCard(bookedRoomData, "Room");
  await expect(bookedRoomCard).toBeVisible();
  await expect(bookedRoomCard.getByRole("img")).toBeVisible();
  await expect(
    bookedRoomCard.getByRole("button", { name: "Delete" })
  ).toBeVisible();
  await expect(bookedRoomCard.getByRole("checkbox")).toBeVisible();
  await expect(bookedRoomCard.getByRole("checkbox")).not.toBeChecked();

  const bookedServiceCard = await findCard(bookedServiceData, "Room");
  await expect(bookedServiceCard).toBeVisible();
  await expect(bookedServiceCard.getByRole("img")).toBeVisible();
  await expect(
    bookedServiceCard.getByRole("button", { name: "Delete" })
  ).toBeVisible();
  await expect(bookedServiceCard.getByRole("checkbox")).toBeVisible();
  await expect(bookedServiceCard.getByRole("checkbox")).not.toBeChecked();

  await bookedRoomCard.getByRole("button", { name: "Delete" }).click();
  await expect(bookedRoomCard).not.toBeVisible();
  expect(await page.getByTestId("cart-card").count()).toBe(itemsAmount + 1);

  await bookedServiceCard.getByRole("button", { name: "Delete" }).click();
  await expect(bookedServiceCard).not.toBeVisible();
  expect(await page.getByTestId("cart-card").count()).toBe(itemsAmount);
});

test("Check one box then click payment button", async ({ page }) => {
  await page.getByTestId("cart-icon").click();

  bookedRoom.forEach(async (item) => {
    await item.getByRole("checkbox").click();
    await expect(
      page.getByText(`Total ${item.price.toFixed(2)} THB`)
    ).toBeVisible();
    await page.getByRole("button", { name: "Payment" }).click();
    await expect(
      page.getByText(`Total Price: ${item.price.toFixed(2)} THB`)
    ).toBeVisible();
    await page.getByRole("button", { name: "Cancel" }).click();
    await item.getByRole("checkbox").not.toBeChecked();
    page.getByText(`Total 0.00 THB`);
  });

  bookedService.forEach(async (item) => {
    await item.getByRole("checkbox").click();
    await expect(
      page.getByText(`Total ${item.price.toFixed(2)} THB`)
    ).toBeVisible();
    await page.getByRole("button", { name: "Payment" }).click();
    await expect(
      page.getByText(`Total Price: ${item.price.toFixed(2)} THB`)
    ).toBeVisible();
    await page.getByRole("button", { name: "Cancel" }).click();
    await item.getByRole("checkbox").not.toBeChecked();
    page.getByText(`Total 0.00 THB`);
  });
});

test("Check all box then click payment button", async ({ page }) => {
  await page.getByTestId("cart-icon").click();
  let total = 0;

  bookedRoom.forEach(async (item) => {
    await item.getByRole("checkbox").click();
    total += item.price;
    await expect(page.getByText(`Total ${total.toFixed(2)} THB`)).toBeVisible();
  });

  bookedService.forEach(async (item) => {
    await item.getByRole("checkbox").click();
    total += item.price;
    await expect(page.getByText(`Total ${total.toFixed(2)} THB`)).toBeVisible();
  });

  await page.getByRole("button", { name: "Payment" }).click();
  await expect(
    page.getByText(`Total Price: ${total.toFixed(2)} THB`)
  ).toBeVisible();
});

test("All checkbox behavior", async ({ page }) => {
  await page.getByTestId("cart-icon").click();
  const checkAll = page.getByTestId("check-all");
  const cartCards = page.getByTestId("cart-card");

  await checkAll.click();
  for (let i = 0; i < (await cartCards.count()); i++) {
    await expect(cartCards.nth(i).getByRole("checkbox")).toBeChecked();
  }

  await checkAll.click();
  for (let i = 0; i < (await cartCards.count()); i++) {
    await expect(cartCards.nth(i).getByRole("checkbox")).not.toBeChecked();
  }

  for (let i = 0; i < (await cartCards.count()); i++) {
    await cartCards.nth(i).getByRole("checkbox").click();
  }
  await expect(checkAll).toBeChecked();

  for (let i = 0; i < (await cartCards.count()); i++) {
    await cartCards.nth(i).getByRole("checkbox").click();
  }
  await expect(checkAll).not.toBeChecked();
});
