import { test, expect } from "@playwright/test";

// Helper function to login as customer
async function loginAsCustomer(page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="Username"]', "testcustomer01");
  await page.fill('input[name="Password"]', "testcustomer01");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL(/\/room/);
}

test.describe("US4-3: Customer Browse Room", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page);
  });

  test("TC2-19: Browse Rooms", async ({ page }) => {
    // Wait for room cards to load
    await page.waitForSelector('[data-testid="room-card"]');

    // Verify each specific room is visible by checking room names
    await expect(
      page.locator('[data-testid="room-card"]:has-text("Room_001")')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="room-card"]:has-text("Room_002")')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="room-card"]:has-text("Room_003")')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="room-card"]:has-text("Room_004")')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="room-card"]:has-text("Room_005")')
    ).toBeVisible();
  });
});
