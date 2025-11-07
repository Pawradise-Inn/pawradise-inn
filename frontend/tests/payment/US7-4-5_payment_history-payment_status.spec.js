import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app; // Declare in outer scope
let petData;

let bookedRoom = [];
let bookedService = [];

// Global image paths for testing
const slip =
  "https://storage.googleapis.com/paw_image/slip/fail.jpg?fbclid=IwY2xjawN0aJJleHRuA2FlbQIxMABicmlkETFYc25qOXJIQUFmQ2VWbGFZAR4ojfiXMQsFChjXORJ-EPWDg75REhSYpRqvCTAtm32GERESrhiW-a5Fn9uY0Q_aem_8Q4wTev00gLEMmiugA2UEA";

const invalid_mockingAPI_response = {
  success: false,
  data: {
    success: false,
  },
};

const valid_mockingAPI_response = {
  success: true,
  data: {
    success: true,
  },
};

const findStaffPaymentCard = async (
  page,
  { name, entryDate = null, exitDate = null, entryTime = null },
  type
) => {
  const card = await page
    .getByTestId("staff-payment-card")
    .filter({ hasText: `${type} ${name}` })
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
    "Choose Wednesday, October 1st,",
    "Choose Thursday, October 2nd,"
  );

  const bookedRoomData2 = await app.createBookingRoom(
    petData.data,
    "Choose Friday, October 3rd,",
    "Choose Saturday, October 4th,"
  );

  const bookedServiceData1 = await app.createBookingService(
    petData.data,
    "Choose Wednesday, October 1st,",
    "10:00"
  );

  const bookedServiceData2 = await app.createBookingService(
    petData.data,
    "Choose Thursday, October 2nd,",
    "10:00"
  );

  const bookedServiceData3 = await app.createBookingService(
    petData.data,
    "Choose Friday, October 3rd,",
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
      await findCartCard(item, "Room")
        .getByRole("button", { name: "Delete" })
        .click();
    });
    bookedService.forEach(async (item) => {
      await findCartCard(item, "Service")
        .getByRole("button", { name: "Delete" })
        .click();
    });
    await app.deletePet(petData.data.id);
  }
});

test("Staff got payment data with failed slip and change status", async ({
  page,
}) => {
  app.createPayment(slip, invalid_mockingAPI_response, 400);
    await page.getByRole("link", { name: "profile" }).click();

  const navigator = page.getByRole("link").filter({ hasText: /^$/ }).nth(2);
  await navigator.click();

  let totalPrice = 0;
  let containerMyPaymentBefore = page.getByTestId("mypayment-container");
  bookedRoom.forEach(async (item) => {
    const card = findMypaymentCard(item, "Room");
    await expect(card).toBeVisible();
    containerMyPaymentBefore = containerMyPaymentBefore.filter({ has: card });
    totalPrice += item.price;
  });

  bookedService.forEach(async (item) => {
    const card = findMypaymentCard(item, "Service");
    await expect(card).toBeVisible();
    containerMyPaymentBefore = containerMyPaymentBefore.filter({ has: card });
    totalPrice += item.price;
  });

  await expect(
    containerMyPaymentBefore
      .filter({ hasText: `Total Price: $${totalPrice.toFixed(2)}` })
      .filter({ hasText: "Failed" })
  ).toBeVisible();
  app.loginStaff();

  await page.getByRole("link", { name: "management" }).click();
  await page.getByRole("link").filter({ hasText: /^$/ }).nth(1).click();

  const container = page.getByTestId("staff-payment-container");
  bookedRoom.forEach(async (item) => {
    const card = findStaffPaymentCard(item, "Room");
    await expect(card).toBeVisible();
    container = container.filter({ has: card });
  });

  bookedService.forEach(async (item) => {
    const card = findStaffPaymentCard(item, "Service");
    await expect(card).toBeVisible();
    container = container.filter({ has: card });
  });

  await expect(
    container
      .filter({ hasText: "test1234" })
      .filter({ hasText: `Total Price: $${totalPrice.toFixed(2)}` })
      .filter({ hasText: "Failed" })
  ).toBeVisible();

  await expect(container.getByRole("img")).toBeVisible();

  await container.getByText("FAILED").nth(1).click();
  await container
    .locator("div")
    .filter({ hasText: /^Success$/ })
    .last()
    .click();

  await expect(
    container
      .filter({ hasText: "test1234" })
      .filter({ hasText: `Total Price: $${totalPrice.toFixed(2)}` })
      .filter({ hasText: "Success" })
  ).toBeVisible();

  app.login();
  await page.getByRole("link", { name: "profile" }).click();

  await navigator.click();

  // Re-query the container after logging back in
  let containerMyPaymentAfter = page.getByTestId("mypayment-container");
  bookedRoom.forEach(async (item) => {
    const card = findMypaymentCard(item, "Room");
    containerMyPaymentAfter = containerMyPaymentAfter.filter({ has: card });
  });

  bookedService.forEach(async (item) => {
    const card = findMypaymentCard(item, "Service");
    containerMyPaymentAfter = containerMyPaymentAfter.filter({ has: card });
  });

  await expect(
    containerMyPaymentAfter
      .filter({ hasText: `Total Price: $${totalPrice.toFixed(2)}` })
      .filter({ hasText: "Success" })
  ).toBeVisible();
});

test("Staff got payment data with paid slip", async ({ page }) => {
  app.createPayment(slip, valid_mockingAPI_response, 200);
  app.loginStaff();

  await page.getByRole("link", { name: "management" }).click();
  await page.getByRole("link").filter({ hasText: /^$/ }).nth(1).click();

  let totalPrice = 0;
  const container = page.getByTestId("staff-payment-container");
  bookedRoom.forEach(async (item) => {
    const card = findStaffPaymentCard(item, "Room");
    await expect(card).toBeVisible();
    container = container.filter({ has: card });
    totalPrice += item.price;
  });

  bookedService.forEach(async (item) => {
    const card = findStaffPaymentCard(item, "Service");
    await expect(card).toBeVisible();
    container = container.filter({ has: card });
    totalPrice += item.price;
  });

  await expect(
    container
      .filter({ hasText: "test1234" })
      .filter({ hasText: `Total Price: $${totalPrice.toFixed(2)}` })
      .filter({ hasText: "Paid" })
  ).toBeVisible();

  await expect(container.getByRole("img")).toBeVisible();

  bookedRoom = [];
  bookedService = [];
});
