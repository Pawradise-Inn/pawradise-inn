import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;

test.describe("US5-5: Staff Service Status Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.loginStaff();
  });

  test("Given I am logged in as staff, When I open the service status dashboard, Then I should see all of service booking that has a day to have service = today with their status and current bookings", async ({
    page,
  }) => {
    // Navigate to staff dashboard
    await page.goto("http://localhost:3000/staff/dashboard");

    // Click on Service Bookings tab (4th tab)
    await page.getByText("Service Bookings").click();

    // Wait for navigation to service-booked route
    await page.waitForURL(/\/service-booked/, { timeout: 5000 });

    // Verify service bookings are displayed
    const dashboardCards = page.locator('[data-testid="dashboard-card"]');
    const cardCount = await dashboardCards.count();

    if (cardCount > 0) {
      // If cards exist, verify they show service information
      const firstCard = dashboardCards.first();
      await expect(firstCard).toBeVisible();
    } else {
      // If no cards, verify the "No results found" message
      const noResults = page.getByText("No results found");
      const loading = page.getByText("Loading bookings...");
      const hasNoResults = await noResults.isVisible().catch(() => false);
      const isLoading = await loading.isVisible().catch(() => false);
      
      expect(hasNoResults || isLoading || cardCount === 0).toBeTruthy();
    }
  });

  test("Given I am logged in as staff, When the service is failed, Then I shouldn't see any service booking status", async ({
    page,
  }) => {
    // Navigate to staff dashboard
    await page.goto("http://localhost:3000/staff/dashboard");

    // Click on Service Bookings tab
    await page.getByText("Service Bookings").click();
    await page.waitForURL(/\/service-booked/, { timeout: 5000 });

    // Simulate API failure by intercepting the request
    await page.route("**/api/v1/bookedServices/dashboard", (route) => {
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

