import { test, expect } from "@playwright/test";

// Helper function to login as customer
async function loginAsCustomer(page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="Username"]', "testcustomer01");
  await page.fill('input[name="Password"]', "testcustomer01");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL(/\/room/);
}

test.describe("US4-4: Customer Browse Service", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page);
    await page.goto("http://localhost:3000/service/");
  });

  //TODO: PLEASE COMMENT THIS ENTIRE TEST ON PRODUCTION TESTING
  test("TC2-20: Browse Services", async ({ page }) => {
    // Wait for service cards to load
    await page.waitForSelector('[data-testid="service-card"]');

    // Verify each specific service is visible by checking service names
    await expect(
      page.locator('[data-testid="service-card"]:has-text("Bathing")')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="service-card"]:has-text("Fighting")')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="service-card"]:has-text("Grooming")')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="service-card"]:has-text("Swimming")')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="service-card"]:has-text("Training")')
    ).toBeVisible();
  });

  //TODO: PLEASE UNCOMMENT THIS ENTIRE TEST ON PRODUCTION TESTING
  // test("TC2-20: Browse Services (ACTUAL TEST PLAN)", async ({ page }) => {
  //   await page.waitForSelector('[data-testid="service-card"]');

  //   await expect(
  //     page.locator('[data-testid="service-card"]:has-text("Service1")')
  //   ).toBeVisible();
  //   await expect(
  //     page.locator('[data-testid="service-card"]:has-text("Service2")')
  //   ).toBeVisible();
  //   await expect(
  //     page.locator('[data-testid="service-card"]:has-text("Service3")')
  //   ).toBeVisible();
  //   await expect(
  //     page.locator('[data-testid="service-card"]:has-text("Service4")')
  //   ).toBeVisible();
  //   await expect(
  //     page.locator('[data-testid="service-card"]:has-text("Service5")')
  //   ).toBeVisible();
  // });
});
