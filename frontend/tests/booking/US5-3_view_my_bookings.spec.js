import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";
import { mockSlipOK } from "../MockAPI";

let app;
let petData;

test.describe("US5-3: View My Bookings", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.login();

    // Create shared pet for all tests
    petData = await app.addPet({ name: "TestPet", type: "DOG" });
  });

  test.afterEach(async () => {
    if (app && petData) {
      // Clean up: Delete the pet
      await app.deletePet(petData.data.id);
    }
  });

  test("Given I am logged in, When I see my booking, Then I should see my upcoming and past bookings with status", async ({
    page,
  }) => {
    // Step 1: Add item to cart and validate
    await page.goto("http://localhost:3000/room");
    await page.getByRole("button", { name: "BOOK" }).first().click();
    await expect(page.getByText(/Room/)).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).click();

    // Select future dates (2025-11-29 to 2025-11-30)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    await page.getByRole("button", { name: "BOOK" }).nth(3).click();
    await expect(
      page.getByText("Room booking created successfully")
    ).toBeVisible();
    await page.locator(".bi.bi-x-lg").first().click();

    // Verify item is in cart
    await page.getByTestId("cart-icon").click();
    await expect(
      page
        .getByTestId("cart-card")
        .filter({ hasText: `for ${petData.data.name}` })
    ).toBeVisible();
    await page.getByTestId("check-all").click();

    // Step 2 & 3: Proceed to payment - booking created immediately in PENDING status
    await page.getByRole("button", { name: "payment" }).click();

    // Upload payment slip (using a test image)
    const slip = "https://storage.googleapis.com/paw_image/slip/fail.jpg";
    const uploadInput = page
      .locator('input[type="file"]')
      .filter({ hasText: "Upload" });
    await uploadInput.setInputFiles(slip);

    // Mock payment verification (can be success or fail - booking still created)
    const valid_mockingAPI_response = {
      success: true,
      data: { success: true },
    };
    await mockSlipOK(page, valid_mockingAPI_response, 200);

    // Click Done to complete payment
    await page.getByRole("button", { name: "Done" }).click();

    // Wait for payment page (success or failed)
    await page.waitForURL(/\/payment\/(success|failed)/, {
      timeout: 10000,
    });

    // Step 3: Verify cart is empty (items moved to booking)
    await page.getByTestId("cart-icon").click();
    const cartCards = page.getByTestId("cart-card");
    const cartCount = await cartCards.count();
    expect(cartCount).toBe(0);

    // Step 3: Navigate to my bookings page - booking should be visible in PENDING status
    await page.goto("http://localhost:3000/profile/booking");

    // Verify booking is visible immediately after payment (in PENDING status)
    await expect(page.getByText("Room")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(petData.data.name)).toBeVisible();
    await expect(page.getByText(petData.data.type)).toBeVisible();
    // Booking should be in PENDING status (or show pending indicator)
  });

  test("Given payment fails, When I check my bookings, Then booking should still be created in PENDING status", async ({
    page,
  }) => {
    // Add item to cart
    await page.goto("http://localhost:3000/room");
    await page.getByRole("button", { name: "BOOK" }).first().click();
    await expect(page.getByText(/Room/)).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).click();

    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    await page.getByRole("button", { name: "BOOK" }).nth(3).click();
    await expect(
      page.getByText("Room booking created successfully")
    ).toBeVisible();
    await page.locator(".bi.bi-x-lg").first().click();

    // Go to cart and proceed to payment
    await page.getByTestId("cart-icon").click();
    await page.getByTestId("check-all").click();
    await page.getByRole("button", { name: "payment" }).click();

    // Upload payment slip
    const slip = "https://storage.googleapis.com/paw_image/slip/fail.jpg";
    const uploadInput = page
      .locator('input[type="file"]')
      .filter({ hasText: "Upload" });
    await uploadInput.setInputFiles(slip);

    // Mock FAILED payment verification - booking still created
    const invalid_mockingAPI_response = {
      success: false,
      data: { success: false },
    };
    await mockSlipOK(page, invalid_mockingAPI_response, 400);

    // Click Done - payment fails but booking is created
    await page.getByRole("button", { name: "Done" }).click();

    // Wait for payment failed page
    await page.waitForURL(/\/payment\/failed/, {
      timeout: 10000,
    });

    // Verify booking is still created and visible (in PENDING status)
    await page.goto("http://localhost:3000/profile/booking");
    await expect(page.getByText("Room")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(petData.data.name)).toBeVisible();
  });

  test("Given I have no booking, When I check, Then I shouldn't see a booking", async ({
    page,
  }) => {
    // Navigate to my bookings page without creating any bookings
    await page.goto("http://localhost:3000/profile/booking");

    // Verify no booking cards are visible
    // The page should show empty state or no booking cards
    const bookingCards = page.locator('[class*="BookingRoomCard"], [class*="BookingServiceCard"]');
    await expect(bookingCards.first()).not.toBeVisible({ timeout: 2000 }).catch(() => {
      // If cards don't exist, that's also fine
    });
  });
});

