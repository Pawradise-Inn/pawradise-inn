import { test, expect } from "@playwright/test";

test.describe("US4-3: Customer Browse Room", () => {
  test.beforeEach(async ({ page }) => {
    // Login as customer
    await page.goto("http://localhost:3000/login");
    // Add login steps here
  });

  test("TC2-19: Browse Rooms", async ({ page }) => {
    await page.click('a[href*="room"]'); // Click room menu item

    await expect(page.locator("text=Room_001")).toBeVisible();
    await expect(page.locator("text=Room_002")).toBeVisible();
    await expect(page.locator("text=Room_003")).toBeVisible();
    await expect(page.locator("text=Room_004")).toBeVisible();
    await expect(page.locator("text=Room_005")).toBeVisible();
  });
});
