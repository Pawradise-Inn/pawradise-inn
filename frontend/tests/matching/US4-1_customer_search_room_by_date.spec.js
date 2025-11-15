import { test, expect } from "@playwright/test";

// Helper function to login as customer
async function loginAsCustomer(page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="Username"]', "testcustomer01");
  await page.fill('input[name="Password"]', "testcustomer01");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL(/\/room/);
}

// Helper function to select date from React DatePicker
async function selectDate(
  page,
  buttonIndex,
  day,
  month = "November",
  year = "2025"
) {
  // Click the date picker button (0 = check-in, 1 = check-out)
  const buttons = page.locator('button[type="button"].rounded-2xl');
  await buttons.nth(buttonIndex).click();

  // Wait for calendar to appear
  await page.waitForSelector(".react-datepicker");

  // Navigate to correct month if needed
  const currentMonth = await page
    .locator(".react-datepicker__current-month")
    .textContent();
  if (!currentMonth.includes(month) || !currentMonth.includes(year)) {
    // Click next/previous month button as needed
    // For simplicity, assuming we're in November 2025
  }

  // Click the specific day
  await page
    .locator(
      `.react-datepicker__day--0${day
        .toString()
        .padStart(2, "0")}:not(.react-datepicker__day--outside-month)`
    )
    .first()
    .click();
}

test.describe("US4-1: Customer Search Room by Date", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page);
  });

  test("TC2-1: Valid Date Search", async ({ page }) => {
    // Select check-in: November 20, 2025
    await selectDate(page, 0, 20);

    // Select check-out: November 25, 2025
    await selectDate(page, 1, 25);

    // Verify at least one room card is visible
    await expect(
      page.locator('[data-testid="room-card"]').first()
    ).toBeVisible();
  });

  test("TC2-2: Checkout in Past", async ({ page }) => {
    // Select check-in: November 20, 2025
    await selectDate(page, 0, 20);

    // Select check-out: November 11, 2025
    await selectDate(page, 1, 11);

    await expect(
      page.locator("text=/Entry date and Exit date must be later than today/i")
    ).toBeVisible();
  });

  test("TC2-3: Checkout Before Checkin", async ({ page }) => {
    // Select check-in: November 20, 2025
    await selectDate(page, 0, 20);

    // Select check-out: November 19, 2025
    await selectDate(page, 1, 19);

    await expect(
      page.locator("text=/Entry date must be earlier than exit date/i")
    ).toBeVisible();
  });

  test("TC2-4: Checkin in Past", async ({ page }) => {
    // Select check-in: November 4, 2025
    await selectDate(page, 0, 4);

    // Select check-out: November 20, 2025
    await selectDate(page, 1, 20);

    await expect(
      page.locator("text=/Entry date and Exit date must be later than today/i")
    ).toBeVisible();
  });

  test("TC2-5: Checkin and Checkout in Past", async ({ page }) => {
    // Select check-in: November 4, 2025
    await selectDate(page, 0, 4);

    // Select check-out: November 6, 2025
    await selectDate(page, 1, 6);

    await expect(
      page.locator("text=/Entry date and Exit date must be later than today/i")
    ).toBeVisible();
  });

  test("TC2-6: Checkin and Checkout in Past, Same Day", async ({ page }) => {
    // Select check-in: November 4, 2025
    await selectDate(page, 0, 4);

    // Select check-out: November 4, 2025
    await selectDate(page, 1, 4);

    await expect(
      page.locator("text=/Entry date and Exit date must be later than today/i")
    ).toBeVisible();
  });

  test("TC2-7: Checkin and Checkout Same Day - Future", async ({ page }) => {
    // Select check-in: November 21, 2025
    await selectDate(page, 0, 21);

    // Select check-out: November 21, 2025
    await selectDate(page, 1, 21);

    await expect(
      page.locator("text=/Entry and exit date cannot be the same/i")
    ).toBeVisible();
  });

  test("TC2-8: Checkin and Checkout Same Day - Past", async ({ page }) => {
    // Select check-in: November 6, 2025
    await selectDate(page, 0, 6);

    // Select check-out: November 6, 2025
    await selectDate(page, 1, 6);

    await expect(
      page.locator("text=/Entry date and Exit date must be later than today/i")
    ).toBeVisible();
  });

  test("TC2-9: Checkin and Checkout Same Day - Future (Duplicate)", async ({
    page,
  }) => {
    // Select check-in: November 22, 2025
    await selectDate(page, 0, 22);

    // Select check-out: November 22, 2025
    await selectDate(page, 1, 22);

    await expect(
      page.locator("text=/Entry and exit date cannot be the same/i")
    ).toBeVisible();
  });

  test("TC2-10: Checkin After Checkout", async ({ page }) => {
    // Select check-in: November 29, 2025
    await selectDate(page, 0, 29);

    // Select check-out: November 26, 2025
    await selectDate(page, 1, 26);

    await expect(
      page.locator("text=/Entry date must be earlier than exit date/i")
    ).toBeVisible();
  });

  test("TC2-11: Checkin After Checkout - Past", async ({ page }) => {
    // Select check-in: November 22, 2025
    await selectDate(page, 0, 22);

    // Select check-out: November 8, 2025
    await selectDate(page, 1, 8);

    await expect(
      page.locator("text=/Entry date and Exit date must be later than today/i")
    ).toBeVisible();
  });
});
