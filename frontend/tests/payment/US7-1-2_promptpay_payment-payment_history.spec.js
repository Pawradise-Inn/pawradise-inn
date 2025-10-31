import { test, expect } from "@playwright/test";
import TestPage from "./TestPage";

let app; // Declare in outer scope
let petData;

let bookedRoom = [];
let bookedService = [];

const findCartCard = async (
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

const findMypaymentCard = async (page, { name, pet_name, price }, type) => {
  const card = await page
    .getByTestId("mypayment-card")
    .filter({ hasText: `${type} ${name}` })
    .filter({ hasText: `for ${pet_name}` })
    .filter({ hasText: `$${price.toFixed(2)}` });

  return card;
};

const findBookingCard = async (page, { name, pet_name }, type) => {
  const card = await page
    .getByTestId("mybooking-card")
    .filter({ hasText: `${type} ${name}` })
    .filter({ hasText: `for ${pet_name}` });

  return card;
};

test.describe("Focus on payment behaviour", () => {
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

    await page.getByRole("link", { name: "room" }).click();
    await page.getByTestId("cart-icon").click();
    await page.getByTestId("check-all").click();
    await page.getByRole("button", { name: "payment" }).click();
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

  test("Initial load element", async ({ page }) => {
    await expect(page.getByText("Waiting for payment")).toBeVisible();
    await expect(page.getByText("Please upload your evidence")).toBeVisible();

    await expect(page.getByRole("button", { name: "Upload" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Done" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Cancle" })).toBeVisible();

    await expect(page.getByTestId("payment-qr")).toBeVisible();
    await expect(page.getByTestId("payment-upload")).toBeVisible();

    await expect(page.getByTestId("navigatorNavbar")).not.toBeVisible();
    await expect(page).toHaveURL("http://localhost:3000/payment");
  });

  test("Cancel button behavior to return to cart page", async ({ page }) => {
    const cancleBtn = page.getByRole("button", { name: "Cancle" });
    await cancleBtn.click();

    await expect(page).toHaveURL("http://localhost:3000/cart");

    bookedRoom.forEach(async (item) => {
      const card = await findCartCard(item, "Room");
      await expect(card).toBeVisible();
      await expect(card.getByRole("img")).toBeVisible();
      await expect(card.getByRole("button", { name: "Delete" })).toBeVisible();
      await expect(card.getByRole("checkbox")).toBeVisible();
      await expect(card.getByRole("checkbox")).not.toBeChecked();
    });

    bookedService.forEach(async (item) => {
      const card = await findCartCard(item, "Service");
      await expect(card).toBeVisible();
      await expect(card.getByRole("img")).toBeVisible();
      await expect(card.getByRole("button", { name: "Delete" })).toBeVisible();
      await expect(card.getByRole("checkbox")).toBeVisible();
      await expect(card.getByRole("checkbox")).not.toBeChecked();
    });

    await expect(page.getByTestId("check-all")).not.toBeChecked();
    await expect(page.getByText(`Total 0.00 THB`)).toBeVisible();
  });

  test("Done button with invalid slip, main-menu btn and check myPayment", async ({
    page,
  }) => {
    const uploadInput = page
      .locator('input[type="file"]')
      .filter({ hasText: "Upload" });

    // Upload first image
    const imagePath =
      "https://storage.googleapis.com/paw_image/rooms/CatStandard.jpg";
    await uploadInput.setInputFiles(imagePath);

    const doneBtn = page.getByRole("button", { name: "Done" });
    await doneBtn.click();

    await expect(page).toHaveURL("http://localhost:3000/payment/failed  ");
    await expect(page.getByText("payment failed")).toBeVisible();

    const mainBtn = page.getByRole("button", { name: "main-menu" });
    await expect(mainBtn).toBeVisible();
    await mainBtn.click();
    await expect(page).toHaveURL("http://localhost:3000/room");

    await page.getByRole("link", { name: "profile" }).click();

    const navigator = page.getByRole("link").filter({ hasText: /^$/ }).nth(2);
    await navigator.click();

    let totalPrice = 0;
    const container = page.getByTestId("mypayment-container");
    bookedRoom.forEach(async (item) => {
      const card = findMypaymentCard(item, "Room");
      await expect(card).toBeVisible();
      container = container.filter({ has: card });
      totalPrice += item.price;
    });

    bookedService.forEach(async (item) => {
      const card = findMypaymentCard(item, "Service");
      await expect(card).toBeVisible();
      container = container.filter({ has: card });
      totalPrice += item.price;
    });

    await expect(
      container
        .filter({ hasText: `Total Price: $${totalPrice.toFixed(2)}` })
        .filter({ hasText: "Failed" })
    ).toBeVisible();
  });

  test("Done button with invalid slip and re-upload btn", async ({ page }) => {
    const totalPrice = page.getByText(/Total Price:/).textContent();

    const uploadInput = page
      .locator('input[type="file"]')
      .filter({ hasText: "Upload" });

    // Upload first image
    const imagePath =
      "https://storage.googleapis.com/paw_image/rooms/CatStandard.jpg";
    await uploadInput.setInputFiles(imagePath);

    const doneBtn = page.getByRole("button", { name: "Done" });
    await doneBtn.click();

    await expect(page).toHaveURL("http://localhost:3000/payment/failed");

    await expect(page.getByText("payment failed")).toBeVisible();

    const reuploadBtn = page.getByRole("button", { name: "re-upload" });
    await expect(reuploadBtn).toBeVisible();
    await reuploadBtn.click();
    await expect(page).toHaveURL("http://localhost:3000/payment");
    await expect(page.getByText(totalPrice)).toBeVisible();
  });

  test("Done button with valid slip and main-menu btn and check myPayment", async ({
    page,
  }) => {
    const uploadInput = page
      .locator('input[type="file"]')
      .filter({ hasText: "Upload" });

    // Upload first image
    const imagePath =
      "https://storage.googleapis.com/paw_image/rooms/CatStandard.jpg";
    await uploadInput.setInputFiles(imagePath);

    const doneBtn = page.getByRole("button", { name: "Done" });
    await doneBtn.click();

    await expect(page).toHaveURL("http://localhost:3000/payment/successful ");
    await expect(page.getByText("payment successful")).toBeVisible();

    const mainBtn = page.getByRole("button", { name: "main-menu" });
    await expect(mainBtn).toBeVisible();
    await mainBtn.click();
    await expect(page).toHaveURL("http://localhost:3000/room");

    await page.getByRole("link", { name: "profile" }).click();

    const navigator = page.getByRole("link").filter({ hasText: /^$/ }).nth(2);
    await navigator.click();

    let totalPrice = 0;
    const container = page.getByTestId("mypayment-container");
    bookedRoom.forEach(async (item) => {
      const card = findMypaymentCard(item, "Room");
      await expect(card).toBeVisible();
      container = container.filter({ has: card });
      totalPrice += item.price;
    });

    bookedService.forEach(async (item) => {
      const card = findMypaymentCard(item, "Service");
      await expect(card).toBeVisible();
      container = container.filter({ has: card });
      totalPrice += item.price;
    });

    await expect(
      container
        .filter({ hasText: `Total Price: $${totalPrice.toFixed(2)}` })
        .filter({ hasText: "Paid" })
    ).toBeVisible();

    bookedRoom = [];
    bookedService = [];
  });

  test("Done button with valid slip and checking myBooking", async ({
    page,
  }) => {
    const uploadInput = page
      .locator('input[type="file"]')
      .filter({ hasText: "Upload" });

    // Upload first image
    const imagePath =
      "https://storage.googleapis.com/paw_image/rooms/CatStandard.jpg";
    await uploadInput.setInputFiles(imagePath);

    const doneBtn = page.getByRole("button", { name: "Done" });
    await doneBtn.click();

    await expect(page).toHaveURL("http://localhost:3000/payment/successful ");
    await expect(page.getByText("payment successful")).toBeVisible();

    const mybookingBtn = page.getByRole("button", { name: "my booking" });
    await expect(mybookingBtn).toBeVisible();
    await mybookingBtn.click();
    await expect(page).toHaveURL("http://localhost:3000/profile/booking");

    bookedRoom.forEach(async (item) => {
      const card = findBookingCard(item, "Room");
      expect((await card.count()) > 0).toBe(true);
    });

    bookedService.forEach(async (item) => {
      const card = findBookingCard(item, "Service");
      expect((await card.count()) > 0).toBe(true);
    });

    bookedRoom = [];
    bookedService = [];
  });

  test("Re-upload button behavior to change picture", async ({ page }) => {
    await page.getByRole("button", { name: "payment" }).click();
    // Get the upload input and re-upload input
    const uploadInput = page
      .locator('input[type="file"]')
      .filter({ hasText: "Upload" });
    const imageDisplay = page.getByTestId("payment-upload");

    // Upload first image
    const firstImagePath =
      "https://storage.googleapis.com/paw_image/rooms/CatStandard.jpg";
    await uploadInput.setInputFiles(firstImagePath);

    // Verify first image is displayed
    await expect(imageDisplay).toBeVisible();
    await expect(imageDisplay).toHaveAttribute("src", /.+/); // Ensure src is not empty
    const firstImageSrc = await imageDisplay.getAttribute("src");

    // Use re-upload input to upload second image
    const secondImagePath =
      "https://storage.googleapis.com/paw_image/unnamed.jpg";
    await uploadInput.setInputFiles(secondImagePath);

    // Verify image display is updated with new image
    await expect(imageDisplay).toBeVisible();
    await expect(imageDisplay).toHaveAttribute("src", /.+/); // Ensure src is not empty
    const secondImageSrc = await imageDisplay.getAttribute("src");

    // Verify the image source has changed
    expect(secondImageSrc).not.toBe(firstImageSrc);
  });
});

test.describe("Focus on payment history page behavior", () => {
  test.beforeEach(async ({ page }) => {
    const app = new TestPage(page);
    await app.login();

    await page.getByRole("link", { name: "profile" }).click();

    const navigator = page.getByRole("link").filter({ hasText: /^$/ }).nth(2);
    await navigator.click();
  });

  test("Sidebar behavior and path operate correctly", async ({ page }) => {
    // Locate nav link
    const navBarLink = page.getByTestId("navigatorNavbar");
    const sideBarLink = page.getByTestId("navigatorSidebar");

    // Check visibility and text
    await expect(navBarLink).toBeVisible();
    await expect(sideBarLink).toBeVisible();
    await expect(sideBarLink).toHaveText("Payment History");

    // Check background div
    const sideBarBg = sideBarLink
      .locator("xpath=..")
      .locator('div[class*="bg-[var(--dark-brown-color)]"]');
    await expect(sideBarBg).toBeVisible();
    await expect(page).toHaveURL(
      "http://localhost:3000/profile/paymentHistory"
    );
  });
});
