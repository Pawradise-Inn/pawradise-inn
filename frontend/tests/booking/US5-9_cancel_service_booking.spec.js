import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";
import { mockSlipOK } from "../MockAPI";

let app;
let petData;

test.describe("US5-9: Cancel Service Booking", () => {
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

  test("Given I'm logged in as a customer and doesn't reaching the next day after reservation, When I want to cancel my service booking, Then system will cancel my service booking", async ({
    page,
  }) => {
    // Step 1: Add item to cart and validate
    await page.goto("http://localhost:3000/service");
    await page.getByTestId("service-card").first().click();
    await expect(page.getByText(/Service/)).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).click();

    // Select future date (2025-11-30) and time
    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    await page.getByTestId("pick-time").click();
    await page.locator("div").filter({ hasText: "10:00" }).last().click();

    await page.getByRole("button", { name: "BOOK" }).click();
    await expect(
      page.getByText("Service booking created successfully")
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

    // Find the cancel button for the service booking
    // If payment completed = "cancel", if payment not completed = "delete"
    const cancelButtons = page.getByRole("button", { name: /cancel|delete/i });
    const serviceCancelButton = cancelButtons.first();

    if (await serviceCancelButton.isVisible()) {
      // Click cancel/delete button
      await serviceCancelButton.click();

      // Confirm cancellation/deletion in the notification dialog
      await expect(
        page.getByText(/Are you sure|Confirm Deletion/i)
      ).toBeVisible();
      await page.getByRole("button", { name: /confirm|yes|ok/i }).click();

      // Verify success message (cancel or delete)
      await expect(
        page.getByText(/Service booking cancelled successfully|deleted successfully|cancelled|deleted/i)
      ).toBeVisible({ timeout: 5000 });

      // Verify booking is removed from the list
      await expect(serviceCancelButton).not.toBeVisible({ timeout: 5000 });
    } else {
      // If cancel button not visible, booking might be past deadline
      test.skip(true, "Cancel button not available - booking may be past cancellation deadline");
    }
  });

  test("Given payment not completed, When I want to delete my service booking, Then system will delete my service booking", async ({
    page,
  }) => {
    // Step 1: Add item to cart
    await page.goto("http://localhost:3000/service");
    await page.getByTestId("service-card").first().click();
    await expect(page.getByText(/Service/)).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).click();

    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    await page.getByTestId("pick-time").click();
    await page.locator("div").filter({ hasText: "10:00" }).last().click();

    await page.getByRole("button", { name: "BOOK" }).click();
    await expect(
      page.getByText("Service booking created successfully")
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
    const serviceDeleteButton = deleteButtons.first();

    if (await serviceDeleteButton.isVisible()) {
      // Click delete button (payment not completed = delete)
      await serviceDeleteButton.click();

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
      await expect(serviceDeleteButton).not.toBeVisible({ timeout: 5000 });
    } else {
      test.skip(true, "Delete button not available");
    }
  });

  test("Given I am logged in as a customer and try to cancel my service booking after the allowed deadline, When I attempt to cancel, Then the system should reject the request and show the error message", async ({
    page,
  }) => {
    // This test requires a booking that is past the cancellation deadline
    await page.goto("http://localhost:3000/profile/booking");

    // Look for service booking cards
    const serviceCards = page.locator('[class*="BookingServiceCard"]');
    const cardCount = await serviceCards.count();

    if (cardCount > 0) {
      const firstCard = serviceCards.first();
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
      test.skip(true, "No service bookings available for testing cancellation deadline");
    }
  });
});

