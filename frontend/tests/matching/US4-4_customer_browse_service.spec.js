import { test, expect } from "@playwright/test";

test.describe("US4-4: Customer Browse Service", () => {
  test.beforeEach(async ({ page }) => {
    // Login as customer
    await page.goto("http://localhost:3000/login");
    // Add login steps here
  });

  test("TC: Browse Services", async ({ page }) => {
    await page.click('a[href*="service"]'); // Click service menu item

    await expect(page.locator("text=Service1")).toBeVisible();
    await expect(page.locator("text=Service2")).toBeVisible();
    await expect(page.locator("text=Service3")).toBeVisible();
    await expect(page.locator("text=Service4")).toBeVisible();
    await expect(page.locator("text=Service5")).toBeVisible();
  });
});
