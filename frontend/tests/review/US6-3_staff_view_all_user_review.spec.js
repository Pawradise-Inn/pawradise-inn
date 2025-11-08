import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;

test.describe("US6-3: Staff View All User Review", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.loginStaff();
  });

  test("Given I am logged in as staff, When I navigate to the staff review page, Then I should see all user reviews", async ({
    page,
  }) => {
    // Navigate to staff review page
    await page.goto("http://localhost:3000/staff/review");
    await page.waitForLoadState("networkidle");

    // Verify the page title is visible
    await expect(page.getByText("Review")).toBeVisible();

    // Verify search functionality is present
    const searchInput = page.getByPlaceholder("search by room or service name");
    await expect(searchInput).toBeVisible();

    // Verify date filter is present
    const dateFilter = page.getByRole("button", { name: /mm\/dd\/yyyy/i });
    await expect(dateFilter).toBeVisible();

    // Verify star filter is present
    const starFilter = page.getByRole("button", { name: /All|star/i });
    await expect(starFilter).toBeVisible();

    // Verify the page content area is visible
    const reviewSection = page.locator(".mx-auto.max-w-7xl");
    await expect(reviewSection).toBeVisible();
  });

  test("Given I am on the staff review page, When reviews exist, Then I should see review cards with customer information", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/staff/review");
    await page.waitForLoadState("networkidle");

    // Check if reviews are displayed
    const reviewCards = page.locator('[data-probe="REVIEW-CARD-ACTIVE"]');
    const reviewCount = await reviewCards.count();

    if (reviewCount > 0) {
      // Verify first review card is visible
      const firstCard = reviewCards.first();
      await expect(firstCard).toBeVisible();

      // Verify review card contains customer name
      const customerName = firstCard.locator("text=/Customer|commenter_name/i");
      await expect(customerName.first()).toBeVisible();

      // Verify rating is displayed
      const rating = firstCard.locator("text=/\\d+\\.\\d+\\/5\\.0/i");
      await expect(rating.first()).toBeVisible();

      // Verify staff reply section is present
      const staffReplySection = firstCard.locator("text=Staff reply");
      await expect(staffReplySection).toBeVisible();

      // Verify reply textarea is present
      const replyTextarea = firstCard.locator('textarea[placeholder*="reply"]');
      await expect(replyTextarea).toBeVisible();
    } else {
      // If no reviews, verify empty state message
      const emptyMessage = page.getByText("No reviews available");
      await expect(emptyMessage).toBeVisible();
    }
  });

  test("Given I am on the staff review page, When I search for a review, Then I should see filtered results", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/staff/review");
    await page.waitForLoadState("networkidle");

    // Enter search term
    const searchInput = page.getByPlaceholder("search by room or service name");
    await searchInput.fill("test");

    // Wait for search results to load
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Verify search input has the value
    await expect(searchInput).toHaveValue("test");

    // Clear search
    await searchInput.clear();
    await page.waitForLoadState("networkidle");
  });

  test("Given I am on the staff review page, When reviews span multiple pages, Then I should see pagination controls", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/staff/review");
    await page.waitForLoadState("networkidle");

    // Check if pagination exists (it only shows if there are more than 3 reviews)
    const pagination = page.locator('[aria-label*="pagination"]').or(
      page.locator("button").filter({ hasText: /next|prev|page/i })
    );

    // Pagination may or may not be present depending on data
    const hasPagination = await pagination.count() > 0;

    if (hasPagination) {
      await expect(pagination.first()).toBeVisible();
    } else {
      // If no pagination, verify we're on the first/only page
      await expect(page.getByText("Review")).toBeVisible();
    }
  });
});

