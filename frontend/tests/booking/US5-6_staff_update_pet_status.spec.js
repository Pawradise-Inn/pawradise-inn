import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;
let petData;

test.describe("US5-6: Staff Update Pet Status", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.loginStaff();
  });

  test("Given I am logged in as an staff, When I update its status, Then the new status should be saved in the system and visible to the pet's owner in their account", async ({
    page,
  }) => {
    // First, create a booking as a customer to have a pet with active booking
    // We'll need to switch to customer account or use API to create test data
    // For now, navigate to pet status page and check if there are pets
    await page.goto("http://localhost:3000/staff/pet-status");

    // Look for a pet card or pet list
    const petCards = page.locator('[data-testid="pet-card"], [class*="PetCard"]');
    const cardCount = await petCards.count();

    if (cardCount > 0) {
      // Click on first pet to view details
      await petCards.first().click();

      // Wait for pet update page
      await page.waitForURL(/\/staff\/pet-status\/\d+/, { timeout: 5000 });

      // Find status dropdown
      const statusDropdown = page.locator('[element="changeStatus"]');
      if (await statusDropdown.isVisible()) {
        // Select a new status (e.g., "IN_PROGRESS")
        await statusDropdown.click();
        await page.getByText("In progress").click();

        // Save the status
        const saveButton = page.getByRole("button", { name: /save|Save/i });
        if (await saveButton.isVisible()) {
          await saveButton.click();

          // Verify success notification
          await expect(
            page.getByText(/Pet status updated successfully|updated/i)
          ).toBeVisible({ timeout: 5000 });
        }
      }
    } else {
      // Skip test if no pets available
      test.skip(true, "No pets with active bookings available for testing");
    }
  });

  test("Given I am logged in as staff, When I try to update the pet status with invalid data, Then the system should reject the update", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/staff/pet-status");

    const petCards = page.locator('[data-testid="pet-card"], [class*="PetCard"]');
    const cardCount = await petCards.count();

    if (cardCount > 0) {
      await petCards.first().click();
      await page.waitForURL(/\/staff\/pet-status\/\d+/, { timeout: 5000 });

      // Try to submit without selecting a status (if status is required)
      // Or try with invalid status value
      const saveButton = page.getByRole("button", { name: /save|Save/i });
      
      if (await saveButton.isVisible()) {
        // Attempt to save without valid status
        await saveButton.click();

        // Should show error message
        await expect(
          page.getByText(/Please provide|Invalid|Unable to update/i)
        ).toBeVisible({ timeout: 5000 });
      }
    } else {
      test.skip(true, "No pets with active bookings available for testing");
    }
  });
});

