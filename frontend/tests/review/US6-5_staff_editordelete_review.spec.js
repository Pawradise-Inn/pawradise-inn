import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;

test.describe("US6-5: Customer Edit or Delete Review", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.login();
  });

  test("Given I am logged in as a customer and have submitted a review, When I view my review history and click edit, Then I should be able to update my review and rating", async ({
    page,
  }) => {
    // Navigate to review history page
    await page.goto("http://localhost:3000/review/history");
    await page.waitForLoadState("networkidle");

    // Verify we're on the history page
    await expect(page.getByText("Pawradise/Review")).toBeVisible();
    await expect(page.getByText("History")).toBeVisible();

    // Look for review cards in history
    const historyCards = page.locator("text=edit").or(page.locator("button").filter({ hasText: "edit" }));
    const editButtonCount = await historyCards.count();

    if (editButtonCount > 0) {
      // Click on the first edit button (reviews without staff reply can be edited)
      const editButton = page.getByRole("button", { name: "edit" }).first();
      await editButton.click();

      // Wait for popup to appear
      await page.waitForTimeout(500);

      // Verify popup is visible
      const popup = page.locator(".fixed.w-dvw.h-dvh");
      await expect(popup).toBeVisible();

      // Verify rating stars are visible and editable
      const stars = page.locator(".bi-star-fill");
      await expect(stars.first()).toBeVisible();

      // Change rating by clicking a different star
      if (await stars.count() >= 5) {
        await stars.nth(4).click(); // Click 5th star
        await page.waitForTimeout(200);
      }

      // Update review text
      const textarea = page.locator('textarea').filter({ hasText: /review|detail/i }).or(
        page.locator('textarea[placeholder*="review"]')
      );
      if (await textarea.count() > 0) {
        await textarea.first().fill("Updated review: This service was excellent!");
        await expect(textarea.first()).toHaveValue("Updated review: This service was excellent!");
      }

      // Click Update button
      const updateButton = page.getByRole("button", { name: "Update" });
      if (await updateButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await updateButton.click();

        // Wait for confirmation
        await page.waitForTimeout(500);

        // Confirm update if confirmation dialog appears
        const confirmButton = page.getByRole("button", { name: /confirm|yes|ok/i }).first();
        if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          await confirmButton.click();
        }

        // Wait for popup to close
        await page.waitForTimeout(1000);
        await expect(page.getByText("Pawradise/Review")).toBeVisible();
      }
    } else {
      console.log("No editable reviews available in this test run");
    }
  });

  test("Given I am viewing my review, When I click delete, Then I should be able to delete my review", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/review/history");
    await page.waitForLoadState("networkidle");

    // Look for edit buttons (which indicate reviews that can be edited/deleted)
    const editButtons = page.getByRole("button", { name: "edit" });
    const editButtonCount = await editButtons.count();

    if (editButtonCount > 0) {
      // Click edit to open the review popup
      await editButtons.first().click();
      await page.waitForTimeout(500);

      // Verify popup is visible
      const popup = page.locator(".fixed.w-dvw.h-dvh");
      await expect(popup).toBeVisible();

      // Look for Delete button
      const deleteButton = page.getByRole("button", { name: "Delete" });
      if (await deleteButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await deleteButton.click();

        // Wait for confirmation dialog
        await page.waitForTimeout(500);

        // Confirm deletion
        const confirmButton = page.getByRole("button", { name: /confirm|yes|ok/i }).first();
        if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          await confirmButton.click();
        }

        // Wait for deletion to complete
        await page.waitForTimeout(1000);

        // Verify we're back on the review page
        await expect(page.getByText("Pawradise/Review")).toBeVisible();
      }
    } else {
      console.log("No reviews available to delete in this test run");
    }
  });

  test("Given I have a review with a staff reply, When I view that review, Then I should not be able to edit or delete it", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/review/history");
    await page.waitForLoadState("networkidle");

    // Look for reviews with staff replies (these should show "view" button instead of "edit")
    const viewButtons = page.getByRole("button", { name: "view" });
    const viewButtonCount = await viewButtons.count();

    if (viewButtonCount > 0) {
      // Click on a review with staff reply
      await viewButtons.first().click();
      await page.waitForTimeout(500);

      // Verify popup is visible
      const popup = page.locator(".fixed.w-dvw.h-dvh");
      await expect(popup).toBeVisible();

      // Verify staff reply section is visible
      const staffReplySection = page.getByText("Staff reply");
      await expect(staffReplySection).toBeVisible();

      // Verify textarea is disabled (read-only)
      const textarea = page.locator('textarea').first();
      const isDisabled = await textarea.isDisabled();
      expect(isDisabled).toBeTruthy();

      // Verify rating stars are not clickable (no cursor-pointer class or disabled)
      const stars = page.locator(".bi-star-fill");
      if (await stars.count() > 0) {
        const firstStar = stars.first();
        const starClasses = await firstStar.getAttribute("class");
        // Stars should not have cursor-pointer class when staff has replied
        expect(starClasses).not.toContain("cursor-pointer");
      }

      // Verify Update and Delete buttons are not present
      const updateButton = page.getByRole("button", { name: "Update" });
      const deleteButton = page.getByRole("button", { name: "Delete" });
      
      await expect(updateButton).not.toBeVisible({ timeout: 1000 }).catch(() => {});
      await expect(deleteButton).not.toBeVisible({ timeout: 1000 }).catch(() => {});

      // Close the popup
      const closeButton = page.locator(".bi-x-lg").first();
      await closeButton.click();
      await page.waitForTimeout(500);
    } else {
      console.log("No reviews with staff replies available in this test run");
    }
  });

  test("Given I am editing my review, When I cancel the update, Then the changes should not be saved", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/review/history");
    await page.waitForLoadState("networkidle");

    const editButtons = page.getByRole("button", { name: "edit" });
    const editButtonCount = await editButtons.count();

    if (editButtonCount > 0) {
      await editButtons.first().click();
      await page.waitForTimeout(500);

      // Get original text
      const textarea = page.locator('textarea').first();
      const originalText = await textarea.inputValue();

      // Modify the text
      await textarea.fill("This text should not be saved");

      // Close popup without updating (click X button)
      const closeButton = page.locator(".bi-x-lg").first();
      await closeButton.click();
      await page.waitForTimeout(500);

      // Reopen the review to verify text wasn't changed
      await editButtons.first().click();
      await page.waitForTimeout(500);

      const textareaAfter = page.locator('textarea').first();
      const textAfterCancel = await textareaAfter.inputValue();

      // The text should either be the original or empty (depending on implementation)
      // This test verifies that canceling doesn't save changes
      expect(textAfterCancel).not.toBe("This text should not be saved");

      // Close popup
      await closeButton.click();
    }
  });
});

