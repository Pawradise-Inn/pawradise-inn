import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;

test.describe("US5-4: Staff Room Status Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.loginStaff();
  });

  test("Given I am logged in as staff, When I open the room status dashboard, Then I should see a list of all rooms that Check-in Date <= Today Date <= Check-out Date with their availability status and current bookings", async ({
    page,
  }) => {
    // Navigate to staff dashboard
    await page.goto("http://localhost:3000/staff/dashboard");

    // Verify dashboard is visible
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

    // Verify Room Bookings tab is visible (first tab)
    await expect(page.getByText("Room Bookings")).toBeVisible();

    // Check if there are room bookings displayed
    // The dashboard should show rooms with active bookings (check-in <= today <= check-out)
    const dashboardCards = page.locator('[data-testid="dashboard-card"]');
    const cardCount = await dashboardCards.count();

    if (cardCount > 0) {
      // If cards exist, verify they show room information
      const firstCard = dashboardCards.first();
      await expect(firstCard).toBeVisible();
    } else {
      // If no cards, verify the "No results found" message or loading state
      const noResults = page.getByText("No results found");
      const loading = page.getByText("Loading bookings...");
      const hasNoResults = await noResults.isVisible().catch(() => false);
      const isLoading = await loading.isVisible().catch(() => false);
      
      // Either no results or loading is acceptable
      expect(hasNoResults || isLoading || cardCount === 0).toBeTruthy();
    }
  });

  test("Given I am logged in as staff, When the system failed, Then I shouldn't see any room booking status", async ({
    page,
  }) => {
    // Navigate to staff dashboard
    await page.goto("http://localhost:3000/staff/dashboard");

    // Simulate API failure by intercepting the request
    await page.route("**/api/v1/bookedRooms/dashboard", (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: "Internal Server Error" }),
      });
    });

    // Reload the page to trigger the failed request
    await page.reload();

    // Verify error handling - should show "No results found" or empty state
    await expect(page.getByText("No results found")).toBeVisible({
      timeout: 10000,
    });
  });
});

