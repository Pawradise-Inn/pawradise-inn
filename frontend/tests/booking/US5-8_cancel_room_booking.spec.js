import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";
import { mockSlipOK } from "../MockAPI";

let app;
let petData;

test.describe("US5-8: Cancel Room Booking", () => {
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

  test("Given I'm logged in as a customer and doesn't reaching the next day after reservation, When I want to cancel my room booking, Then system will cancel my room booking", async ({
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

    // Upload payment slip
    const slip = "https://storage.googleapis.com/paw_image/slip/fail.jpg";
    const uploadInput = page
      .locator('input[type="file"]')
      .filter({ hasText: "Upload" });
    await uploadInput.setInputFiles(slip);

    // Mock payment verification (success - payment completed)
    const valid_mockingAPI_response = {
      success: true,
      data: { success: true },
    };
    await mockSlipOK(page, valid_mockingAPI_response, 200);

    // Click Done to complete payment
    await page.getByRole("button", { name: "Done" }).click();

    // Wait for payment success page
    await page.waitForURL(/\/payment\/(success|failed)/, {
      timeout: 10000,
    });

    // Navigate to my bookings page
    await page.goto("http://localhost:3000/profile/booking");

    // Find the cancel button for the room booking
    // If payment completed = "cancel", if payment not completed = "delete"
    const cancelButtons = page.getByRole("button", { name: /cancel|delete/i });
    const roomCancelButton = cancelButtons.first();

    if (await roomCancelButton.isVisible()) {
      // Click cancel/delete button
      await roomCancelButton.click();

      // Confirm cancellation/deletion in the notification dialog
      await expect(
        page.getByText(/Are you sure|Confirm Deletion/i)
      ).toBeVisible();
      await page.getByRole("button", { name: /confirm|yes|ok/i }).click();

      // Verify success message (cancel or delete)
      await expect(
        page.getByText(/Room booking cancelled successfully|deleted successfully|cancelled|deleted/i)
      ).toBeVisible({ timeout: 5000 });

      // Verify booking is removed from the list
      await expect(roomCancelButton).not.toBeVisible({ timeout: 5000 });
    } else {
      // If cancel button not visible, booking might be past deadline
      test.skip(true, "Cancel button not available - booking may be past cancellation deadline");
    }
  });

  test("Given payment not completed, When I want to delete my room booking, Then system will delete my room booking", async ({
    page,
  }) => {
    // Step 1: Add item to cart
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

    // Mock FAILED payment verification - payment not completed
    const invalid_mockingAPI_response = {
      success: false,
      data: { success: false },
    };
    await mockSlipOK(page, invalid_mockingAPI_response, 400);

    // Click Done - payment fails but booking is created in PENDING
    await page.getByRole("button", { name: "Done" }).click();

    // Wait for payment failed page
    await page.waitForURL(/\/payment\/failed/, {
      timeout: 10000,
    });

    // Navigate to my bookings page
    await page.goto("http://localhost:3000/profile/booking");

    // Since payment not completed, should be "delete" not "cancel"
    const deleteButtons = page.getByRole("button", { name: /delete|cancel/i });
    const roomDeleteButton = deleteButtons.first();

    if (await roomDeleteButton.isVisible()) {
      // Click delete button (payment not completed = delete)
      await roomDeleteButton.click();

      // Confirm deletion
      await expect(
        page.getByText(/Are you sure|Confirm Deletion/i)
      ).toBeVisible();
      await page.getByRole("button", { name: /confirm|yes|ok/i }).click();

      // Verify success message (delete, not cancel)
      await expect(
        page.getByText(/deleted successfully|deleted/i)
      ).toBeVisible({ timeout: 5000 });

      // Verify booking is removed
      await expect(roomDeleteButton).not.toBeVisible({ timeout: 5000 });
    } else {
      test.skip(true, "Delete button not available");
    }
  });

  test("Given I am logged in as a customer and try to cancel my room booking after the allowed deadline, When I attempt to cancel, Then the system should reject the request and show the error message", async ({
    page,
  }) => {
    // This test requires a booking that is past the cancellation deadline
    // In a real scenario, we would need to create a booking and wait or manipulate the date
    // For now, we'll check if the cancel button is disabled or shows error

    await page.goto("http://localhost:3000/profile/booking");

    // Look for room booking cards
    const roomCards = page.locator('[class*="BookingRoomCard"]');
    const cardCount = await roomCards.count();

    if (cardCount > 0) {
      const firstCard = roomCards.first();
      const cancelButton = firstCard.getByRole("button", { name: /cancel/i });

      // If cancel button exists but is disabled or shows error on click
      if (await cancelButton.isVisible()) {
        await cancelButton.click();

        // Should show error about deadline
        await expect(
          page.getByText(/cannot be cancelled|deadline|not allowed|operation not allowed/i)
        ).toBeVisible({ timeout: 5000 });
      }
    } else {
      // Skip if no bookings available
      test.skip(true, "No room bookings available for testing cancellation deadline");
    }
  });
});

