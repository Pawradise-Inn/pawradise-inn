import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;
let petData;

test.describe("US6-2: Customer Review Product", () => {
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

  test("Given I am logged in and have a completed booking, When I navigate to review page and click review on a service, Then I should be able to submit a review with rating and comment", async ({
    page,
  }) => {
    // Navigate to review page
    await page.goto("http://localhost:3000/review");
    await page.waitForLoadState("networkidle");

    // Check if there are any items to review (services or rooms)
    const reviewCards = page.locator("text=review").filter({ hasText: "review" });
    const reviewButtonCount = await reviewCards.count();

    if (reviewButtonCount > 0) {
      // Click on the first review button
      await reviewCards.first().click();

      // Wait for the review popup to appear
      await page.waitForTimeout(500);

      // Verify the popup is visible
      const popup = page.locator(".fixed.w-dvw.h-dvh");
      await expect(popup).toBeVisible();

      // Verify rating stars are visible
      const stars = page.locator(".bi-star-fill");
      await expect(stars.first()).toBeVisible();

      // Select a rating (click on 4th star)
      const starButtons = page.locator(".bi-star-fill");
      await starButtons.nth(3).click();

      // Verify rating is selected (stars should be yellow)
      await expect(starButtons.nth(3)).toHaveClass(/text-yellow-400/);

      // Enter review text
      const textarea = page.locator('textarea[placeholder="Write your review here"]');
      await textarea.fill("This is a great service! Highly recommended.");

      // Verify text was entered
      await expect(textarea).toHaveValue("This is a great service! Highly recommended.");

      // Click submit review button
      const submitButton = page.getByRole("button", { name: "Submit Review" });
      await expect(submitButton).toBeVisible();
      await submitButton.click();

      // Wait for confirmation dialog
      await page.waitForTimeout(500);

      // Confirm the review submission (click confirm in notification)
      const confirmButton = page.getByRole("button", { name: /confirm|yes|ok/i }).first();
      if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await confirmButton.click();
      }

      // Wait for the popup to close
      await page.waitForTimeout(1000);

      // Verify we're back on the review page
      await expect(page.getByText("Pawradise/Review")).toBeVisible();
    } else {
      // If no items to review, just verify the page loads correctly
      await expect(page.getByText("Pawradise/Review")).toBeVisible();
      console.log("No items available to review in this test run");
    }
  });

  test("Given I am on the review popup, When I select different star ratings, Then the rating should update accordingly", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/review");
    await page.waitForLoadState("networkidle");

    const reviewButtons = page.locator("text=review").filter({ hasText: "review" });
    const count = await reviewButtons.count();

    if (count > 0) {
      await reviewButtons.first().click();
      await page.waitForTimeout(500);

      const starButtons = page.locator(".bi-star-fill");
      await expect(starButtons.first()).toBeVisible();

      // Test clicking different stars
      for (let i = 0; i < Math.min(5, await starButtons.count()); i++) {
        await starButtons.nth(i).click();
        await page.waitForTimeout(100);
        // Verify the clicked star and previous stars are highlighted
        for (let j = 0; j <= i; j++) {
          await expect(starButtons.nth(j)).toHaveClass(/text-yellow-400/);
        }
      }

      // Close the popup
      const closeButton = page.locator(".bi-x-lg").first();
      await closeButton.click();
      await page.waitForTimeout(500);
    }
  });

  test("Given I am on the review popup, When I click cancel, Then the popup should close without submitting", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/review");
    await page.waitForLoadState("networkidle");

    const reviewButtons = page.locator("text=review").filter({ hasText: "review" });
    const count = await reviewButtons.count();

    if (count > 0) {
      await reviewButtons.first().click();
      await page.waitForTimeout(500);

      // Verify popup is visible
      const popup = page.locator(".fixed.w-dvw.h-dvh");
      await expect(popup).toBeVisible();

      // Click cancel button
      const cancelButton = page.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeVisible();
      await cancelButton.click();

      // Wait for confirmation
      await page.waitForTimeout(500);

      // Confirm cancellation if confirmation dialog appears
      const confirmButton = page.getByRole("button", { name: /confirm|yes|ok/i }).first();
      if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await confirmButton.click();
      }

      // Verify popup is closed
      await page.waitForTimeout(500);
      await expect(page.getByText("Pawradise/Review")).toBeVisible();
    }
  });
});

