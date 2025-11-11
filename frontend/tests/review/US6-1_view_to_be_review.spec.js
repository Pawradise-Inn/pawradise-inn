import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;

test.describe("US6-1: View To Be Reviewed", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.login();
  });

  test("Given I am logged in as a customer, When I navigate to the review page, Then I should see the review page with sidebar and content", async ({
    page,
  }) => {
    // Navigate to review page
    await page.goto("http://localhost:3000/review");

    // Wait for the page to load and APIs to complete
    await page.waitForLoadState("networkidle");

    // Verify the page title is visible
    await expect(page.getByText("Pawradise/Review")).toBeVisible();

    // Verify the sidebar shows "To be reviewed" option
    await expect(page.getByText("To be reviewed")).toBeVisible();

    // Verify the sidebar shows "History" option
    await expect(page.getByText("History")).toBeVisible();

    // Verify we're on the review page (URL should be /review)
    await expect(page).toHaveURL(/.*\/review$/);

    // Verify the page content area is visible (the Outlet content)
    // The ReviewComp component should be rendered
    const contentArea = page.locator(".flex-1.p-6");
    await expect(contentArea).toBeVisible();
  });

  test("Given I am on the review page, When I click on 'To be reviewed' in the sidebar, Then I should see the review page content", async ({
    page,
  }) => {
    // Navigate to review page
    await page.goto("http://localhost:3000/review");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Verify we're on the review page
    await expect(page).toHaveURL(/.*\/review$/);

    // Verify the page title is visible
    await expect(page.getByText("Pawradise/Review")).toBeVisible();

    // Click on "To be reviewed" in the sidebar to ensure we're on that tab
    const toBeReviewedLink = page.getByText("To be reviewed").first();
    await toBeReviewedLink.click();

    // Wait for navigation to complete
    await page.waitForLoadState("networkidle");

    // Verify we're still on the review page
    await expect(page).toHaveURL(/.*\/review$/);

    // Verify the content area is visible
    const contentArea = page.locator(".flex-1.p-6");
    await expect(contentArea).toBeVisible();
  });

  test("Given I am on the review page, When the page loads, Then the review interface should be accessible and display correctly", async ({
    page,
  }) => {
    // Navigate to review page
    await page.goto("http://localhost:3000/review");

    // Wait for the page to load and APIs to complete
    await page.waitForLoadState("networkidle");

    // Verify the page title is visible
    await expect(page.getByText("Pawradise/Review")).toBeVisible();

    // Verify the sidebar is visible with both navigation options
    await expect(page.getByText("To be reviewed")).toBeVisible();
    await expect(page.getByText("History")).toBeVisible();

    // Verify the page content area is visible
    // The ReviewComp component should be rendered, showing rooms and services to be reviewed (if any)
    const contentArea = page.locator(".flex-1.p-6");
    await expect(contentArea).toBeVisible();

    // Verify the sidebar is properly rendered (check for sidebar container)
    const sidebar = page.locator("aside.bg-white");
    await expect(sidebar).toBeVisible();
  });
});
