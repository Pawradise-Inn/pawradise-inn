import { test, expect } from "@playwright/test";

test.describe("US4-1: Customer Search Room by Date", () => {
  test.beforeEach(async ({ page }) => {
    // Login as customer
    await page.goto("http://localhost:3000/login");
    // Add login steps here
    await page.goto("http://localhost:3000/room/"); // Adjust URL as needed
  });

  test("TC2-1: Valid Date Search", async ({ page }) => {
    await page.fill('input[name="checkin"]', "20/11/2025");
    await page.fill('input[name="checkout"]', "25/11/2025");

    await page.click('button[type="submit"]');

    await expect(page.locator('[data-testid="room-card"]')).toBeVisible();
  });

  test("TC2-2: Checkout in Past", async ({ page }) => {
    await page.fill('input[name="checkin"]', "20/11/2025");
    await page.fill('input[name="checkout"]', "11/11/2025");

    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Date is invalid.*Entry date and Exit date must be later than today/i"
      )
    ).toBeVisible();
  });

  test("TC2-3: Checkout Before Checkin", async ({ page }) => {
    await page.fill('input[name="checkin"]', "20/11/2025");
    await page.fill('input[name="checkout"]', "19/11/2025");

    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Date is invalid.*Entry date must be earlier than exit date/i"
      )
    ).toBeVisible();
  });

  test("TC2-4: Checkin in Past", async ({ page }) => {
    await page.fill('input[name="checkin"]', "4/11/2025");
    await page.fill('input[name="checkout"]', "20/11/2025");

    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Date is invalid.*Entry date and Exit date must be later than today/i"
      )
    ).toBeVisible();
  });

  test("TC2-5: Checkin and Checkout in Past", async ({ page }) => {
    await page.fill('input[name="checkin"]', "4/11/2025");
    await page.fill('input[name="checkout"]', "6/11/2025");

    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Date is invalid.*Entry date and Exit date must be later than today/i"
      )
    ).toBeVisible();
  });

  test("TC2-6: Checkin and Checkout in Past, Same Day", async ({ page }) => {
    await page.fill('input[name="checkin"]', "4/11/2025");
    await page.fill('input[name="checkout"]', "4/11/2025");

    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Date is invalid.*Entry date and Exit date must be later than today/i"
      )
    ).toBeVisible();
  });

  test("TC2-7: Checkin and Checkout Same Day - Future", async ({ page }) => {
    await page.fill('input[name="checkin"]', "21/11/2025");
    await page.fill('input[name="checkout"]', "21/11/2025");

    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Date is invalid.*Entry and exit date cannot be the same/i"
      )
    ).toBeVisible();
  });

  test("TC2-8: Checkin and Checkout Same Day - Past", async ({ page }) => {
    await page.fill('input[name="checkin"]', "6/11/2025");
    await page.fill('input[name="checkout"]', "6/11/2025");

    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Date is invalid.*Entry date and Exit date must be later than today/i"
      )
    ).toBeVisible();
  });

  test("TC2-9: Checkin and Checkout Same Day - Future (Duplicate)", async ({
    page,
  }) => {
    await page.fill('input[name="checkin"]', "22/11/2025");
    await page.fill('input[name="checkout"]', "22/11/2025");

    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Date is invalid.*Entry and exit date cannot be the same/i"
      )
    ).toBeVisible();
  });

  test("TC2-10: Checkin After Checkout", async ({ page }) => {
    await page.fill('input[name="checkin"]', "29/11/2025");
    await page.fill('input[name="checkout"]', "26/11/2025");

    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Date is invalid.*Entry date must be earlier than exit date/i"
      )
    ).toBeVisible();
  });

  test("TC2-11: Checkin After Checkout - Past", async ({ page }) => {
    await page.fill('input[name="checkin"]', "22/11/2025");
    await page.fill('input[name="checkout"]', "8/11/2025");

    await page.click('button[type="submit"]');

    await expect(
      page.locator(
        "text=/Date is invalid.*Entry date and Exit date must be later than today/i"
      )
    ).toBeVisible();
  });
});
