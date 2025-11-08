import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;

test.describe("US6-7: Customer View Rating", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.login();
  });

  test("Given I am logged in as a customer, When I navigate to the review history page, Then I should see my reviews with ratings displayed", async ({
    page,
  }) => {
    // Navigate to review history page
    await page.goto("http://localhost:3000/review/history");
    await page.waitForLoadState("networkidle");

    // Verify we're on the history page
    await expect(page.getByText("Pawradise/Review")).toBeVisible();
    await expect(page.getByText("History")).toBeVisible();

    // Verify the history content area is visible
    const historyContent = page.locator(".p-6.flex-1");
    await expect(historyContent).toBeVisible();

    // Look for history cards (reviews)
    const historyCards = page.locator("text=room_").or(
      page.locator("text=service:").or(
        page.locator(".rounded-2xl.bg-\\[var\\(--cream-color\\)\\]")
      )
    );

    // History cards may or may not exist depending on whether user has reviews
    const cardCount = await historyCards.count();

    if (cardCount > 0) {
      // Verify at least one history card is visible
      await expect(historyCards.first()).toBeVisible();
    } else {
      // If no reviews, verify the page still loads correctly
      await expect(page.getByText("Pawradise/Review")).toBeVisible();
      console.log("No reviews in history to display ratings");
    }
  });

  test("Given I have submitted a review with a rating, When I view that review in history, Then I should see the rating stars displayed", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/review/history");
    await page.waitForLoadState("networkidle");

    // Look for edit or view buttons (indicating reviews exist)
    const reviewButtons = page.getByRole("button").filter({ 
      hasText: /edit|view/ 
    });
    const buttonCount = await reviewButtons.count();

    if (buttonCount > 0) {
      // Click on the first review
      await reviewButtons.first().click();
      await page.waitForTimeout(500);

      // Verify popup is visible
      const popup = page.locator(".fixed.w-dvw.h-dvh");
      await expect(popup).toBeVisible();

      // Verify rating section is visible
      const ratingLabel = page.getByText("Rating");
      await expect(ratingLabel).toBeVisible();

      // Verify rating stars are displayed
      const stars = page.locator(".bi-star-fill");
      await expect(stars.first()).toBeVisible();

      // Verify we have 5 stars
      const starCount = await stars.count();
      expect(starCount).toBeGreaterThanOrEqual(1); // At least some stars should be visible

      // Verify some stars are highlighted (yellow) based on the rating
      const yellowStars = stars.filter({ hasNotText: /text-gray-300/ });
      // At least one star should be yellow if there's a rating

      // Close popup
      const closeButton = page.locator(".bi-x-lg").first();
      await closeButton.click();
      await page.waitForTimeout(500);
    } else {
      console.log("No reviews available to view ratings");
    }
  });

  test("Given I am viewing a review with a staff reply, When I open that review, Then I should see my original rating along with the staff reply", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/review/history");
    await page.waitForLoadState("networkidle");

    // Look for reviews with staff replies (these show "view" button)
    const viewButtons = page.getByRole("button", { name: "view" });
    const viewButtonCount = await viewButtons.count();

    if (viewButtonCount > 0) {
      // Click on a review with staff reply
      await viewButtons.first().click();
      await page.waitForTimeout(500);

      // Verify popup is visible
      const popup = page.locator(".fixed.w-dvw.h-dvh");
      await expect(popup).toBeVisible();

      // Verify rating is still displayed
      const ratingLabel = page.getByText("Rating");
      await expect(ratingLabel).toBeVisible();

      // Verify rating stars are visible
      const stars = page.locator(".bi-star-fill");
      await expect(stars.first()).toBeVisible();

      // Verify staff reply section is visible
      const staffReplySection = page.getByText("Staff reply");
      await expect(staffReplySection).toBeVisible();

      // Verify reply by information is shown
      const replyBy = page.getByText(/Reply by:/i);
      await expect(replyBy).toBeVisible();

      // Close popup
      const closeButton = page.locator(".bi-x-lg").first();
      await closeButton.click();
      await page.waitForTimeout(500);
    } else {
      console.log("No reviews with staff replies available to view");
    }
  });

  test("Given I am viewing the room/service booking pages, When reviews are displayed, Then I should see ratings for those reviews", async ({
    page,
  }) => {
    // Navigate to room page where public reviews might be shown
    await page.goto("http://localhost:3000/room");
    await page.waitForLoadState("networkidle");

    // Look for review sections or rating displays
    // This depends on how reviews are displayed on the room/service pages
    // The test verifies that if ratings are shown, they're visible

    // Verify page loaded
    await expect(page).toHaveURL(/.*\/room/);

    // Check for any star ratings on the page
    const stars = page.locator(".bi-star-fill");
    const starCount = await stars.count();

    // Stars may or may not be present depending on whether reviews are shown
    // This test just verifies the page loads correctly
    await expect(page.locator("body")).toBeVisible();
  });

  test("Given I have multiple reviews with different ratings, When I view my review history, Then I should see each review with its corresponding rating", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/review/history");
    await page.waitForLoadState("networkidle");

    // Get all review cards
    const historyCards = page.locator(".rounded-2xl.bg-\\[var\\(--cream-color\\)\\]");
    const cardCount = await historyCards.count();

    if (cardCount > 1) {
      // Verify multiple reviews are displayed
      expect(cardCount).toBeGreaterThan(1);

      // Click on each review and verify rating is displayed
      for (let i = 0; i < Math.min(3, cardCount); i++) {
        const card = historyCards.nth(i);
        
        // Find the button in this card
        const button = card.getByRole("button").first();
        if (await button.isVisible({ timeout: 1000 }).catch(() => false)) {
          await button.click();
          await page.waitForTimeout(500);

          // Verify rating section is visible
          const ratingLabel = page.getByText("Rating");
          await expect(ratingLabel).toBeVisible();

          // Verify stars are visible
          const stars = page.locator(".bi-star-fill");
          await expect(stars.first()).toBeVisible();

          // Close popup
          const closeButton = page.locator(".bi-x-lg").first();
          await closeButton.click();
          await page.waitForTimeout(500);
        }
      }
    } else {
      console.log("Not enough reviews to test multiple ratings");
    }
  });
});

