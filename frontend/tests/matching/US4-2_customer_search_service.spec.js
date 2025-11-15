import { test, expect } from "@playwright/test";

// Helper function to login as customer
async function loginAsCustomer(page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="Username"]', "testcustomer01");
  await page.fill('input[name="Password"]', "testcustomer01");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL(/\/room/);
}

test.describe("US4-2: Customer Search Service", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page);
    await page.goto("http://localhost:3000/service/");
  });

  test("TC2-17: Search Existing Service", async ({ page }) => {
    // Fill in the search input
    await page.locator('input[placeholder="search"]').fill("Grooming");

    // Verify Grooming service card is visible
    await expect(
      page.locator('[data-testid="service-card"]:has-text("Grooming")')
    ).toBeVisible();
  });

  test("TC2-18: Search Non-Existing Service", async ({ page }) => {
    // Fill in the search input
    await page.locator('input[placeholder="search"]').fill("NonExistService");

    // Verify no service cards are visible
    await expect(
      page.locator('[data-testid="service-card"]')
    ).not.toBeVisible();

    // Verify error message appears
    await expect(
      page.locator(
        "text=/Sorry.*your desired services is not on operation now/i"
      )
    ).toBeVisible();
  });

  test("TC2-19: Search Lowercase", async ({ page }) => {
    // Fill in the search input with lowercase
    await page.locator('input[placeholder="search"]').fill("grooming");

    // Verify Grooming service card is visible
    await expect(
      page.locator('[data-testid="service-card"]:has-text("Grooming")')
    ).toBeVisible();
  });

  test("TC2-20: Search with Trailing Space", async ({ page }) => {
    // Fill in the search input with trailing spaces
    await page.locator('input[placeholder="search"]').fill("Grooming  ");

    // Verify no service cards are visible
    await expect(
      page.locator('[data-testid="service-card"]')
    ).not.toBeVisible();

    // Verify error message appears
    await expect(
      page.locator(
        "text=/Sorry.*your desired services is not on operation now/i"
      )
    ).toBeVisible();
  });
});
