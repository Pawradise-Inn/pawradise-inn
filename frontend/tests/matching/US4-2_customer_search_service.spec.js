import { test, expect } from "@playwright/test";

test.describe("US4-2: Customer Search Service", () => {
  test.beforeEach(async ({ page }) => {
    // Login as customer
    await page.goto("http://localhost:3000/login");
    // Add login steps here
    await page.goto("http://localhost:3000/service"); // Adjust URL as needed
  });

  test("TC2-17: Search Existing Service", async ({ page }) => {
    await page.fill('input[name="serviceName"]', "Grooming");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Grooming")).toBeVisible();
  });

  test("TC2-18: Search Non-Existing Service", async ({ page }) => {
    await page.fill('input[name="serviceName"]', "Walking");
    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Sorry.*your desired services is not on operation now/i"
      )
    ).toBeVisible();
  });

  test("TC2-19: Search Lowercase", async ({ page }) => {
    await page.fill('input[name="serviceName"]', "grooming");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Grooming")).toBeVisible();
  });

  test("TC2-20: Search with Trailing Space", async ({ page }) => {
    await page.fill('input[name="serviceName"]', " Grooming ");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Grooming")).toBeVisible();
  });
});
