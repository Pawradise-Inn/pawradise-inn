import { test, expect } from "@playwright/test";

// Helper function to login as testcustomer01
async function loginAsTestCustomer01(page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="Username"]', "testcustomer01");
  await page.fill('input[name="Password"]', "testcustomer01");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL(/\/room/);
}

// Helper function to login as testcustomer02
async function loginAsTestCustomer02(page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="Username"]', "testcustomer02");
  await page.fill('input[name="Password"]', "testcustomer02");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL(/\/room/);
}

// Separate describe block for TC1-28 - runs first with testcustomer01
test.describe("US2-3: Customer Edit Profile - Valid Update", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestCustomer01(page);
    await page.goto("http://localhost:3000/profile");
    await page.waitForLoadState("networkidle");
  });

  test("TC1-28: Valid Profile Edit", async ({ page }) => {
    await page.locator('input[placeholder="Firstname"]').fill("bungsell");
    await page.locator('input[placeholder="Lastname"]').fill("roti");
    await page.locator('input[placeholder*="mail" i]').fill("matiba@gmail.com");
    await page.locator('input[placeholder="Username"]').fill("bungRakRoti");
    await page.locator('input[placeholder*="phone" i]').fill("5555555555");

    await page.getByRole("button", { name: /done/i }).click();

    // Handle confirmation dialog
    await expect(
      page.locator("text=/Are you sure to update the data/i")
    ).toBeVisible();
    await page.getByRole("button", { name: /confirm/i }).click();

    // Check success notification
    await expect(
      page.locator("text=/Your profile has been updated successfully/i")
    ).toBeVisible();
  });
});

// Main validation tests - use testcustomer02
test.describe("US2-3: Customer Edit Profile - Validation Tests", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestCustomer02(page);
    await page.goto("http://localhost:3000/profile");
    await page.waitForLoadState("networkidle");
  });

  test("TC1-29: Empty Firstname", async ({ page }) => {
    await page.locator('input[placeholder="Firstname"]').fill("");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please fill in all required fields/i")
    ).toBeVisible();
  });

  test("TC1-30: Empty Lastname", async ({ page }) => {
    await page.locator('input[placeholder="Lastname"]').fill("");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please fill in all required fields/i")
    ).toBeVisible();
  });

  test("TC1-31: Empty Username", async ({ page }) => {
    await page.locator('input[placeholder="Username"]').fill("");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please fill in all required fields/i")
    ).toBeVisible();
  });

  test("TC1-32: Duplicate Username", async ({ page }) => {
    await page.locator('input[placeholder="Username"]').fill("bungRakRoti");

    await page.getByRole("button", { name: /done/i }).click();

    // Handle confirmation dialog
    await expect(
      page.locator("text=/Are you sure to update the data/i")
    ).toBeVisible();
    await page.getByRole("button", { name: /confirm/i }).click();

    await expect(
      page.locator(
        "text=/This username is already taken.*Please choose a different one/i"
      )
    ).toBeVisible();
  });

  test("TC1-33: Short Phone Number", async ({ page }) => {
    await page.locator('input[placeholder*="phone" i]').fill("5");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(page.locator("text=/Phone number is invalid/i")).toBeVisible();
  });

  test("TC1-34: Long Phone Number", async ({ page }) => {
    await page
      .locator('input[placeholder*="phone" i]')
      .fill("55555555555555555555");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(page.locator("text=/Phone number is invalid/i")).toBeVisible();
  });

  test("TC1-35: Invalid Phone Number", async ({ page }) => {
    await page.locator('input[placeholder*="phone" i]').fill("phoneNumber");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(page.locator("text=/Phone number is invalid/i")).toBeVisible();
  });

  test("TC1-36: Empty Phone Number", async ({ page }) => {
    await page.locator('input[placeholder*="phone" i]').fill("");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please fill in all required fields/i")
    ).toBeVisible();
  });

  test("TC1-37: Duplicate Phone Number", async ({ page }) => {
    await page.locator('input[placeholder*="phone" i]').fill("5555555555");

    await page.getByRole("button", { name: /done/i }).click();

    // Handle confirmation dialog
    await expect(
      page.locator("text=/Are you sure to update the data/i")
    ).toBeVisible();
    await page.getByRole("button", { name: /confirm/i }).click();

    await expect(
      page.locator(
        "text=/This phone number is already taken.*Please choose a different one/i"
      )
    ).toBeVisible();
  });

  test("TC1-38: Invalid Email Format", async ({ page }) => {
    await page.locator('input[placeholder*="mail" i]').fill("matiba");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please enter a valid email address/i")
    ).toBeVisible();
  });

  test("TC1-39: Empty Email", async ({ page }) => {
    await page.locator('input[placeholder*="mail" i]').fill("");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please fill in all required fields/i")
    ).toBeVisible();
  });

  test("TC1-40: Duplicate Email", async ({ page }) => {
    await page.locator('input[placeholder*="mail" i]').fill("matiba@gmail.com");

    await page.getByRole("button", { name: /done/i }).click();

    // Handle confirmation dialog
    await expect(
      page.locator("text=/Are you sure to update the data/i")
    ).toBeVisible();
    await page.getByRole("button", { name: /confirm/i }).click();

    await expect(
      page.locator(
        "text=/This email is already taken.*Please choose a different one/i"
      )
    ).toBeVisible();
  });
});

// Separate describe block for cleanup - resets testcustomer01 profile
test.describe("US2-3: Cleanup", () => {
  test("US2-3: Cleanup - Reset Customer Profile to Original", async ({
    page,
  }) => {
    // Login with updated credentials
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="Username"]', "bungRakRoti");
    await page.fill('input[name="Password"]', "testcustomer01");
    await page.getByRole("button", { name: /login/i }).click();
    await page.waitForURL(/\/room/);

    // Navigate to profile
    await page.goto("http://localhost:3000/profile/");
    await page.waitForLoadState("networkidle");

    // Reset to original testcustomer01 values
    await page.locator('input[placeholder="Firstname"]').fill("testcustomer01");
    await page.locator('input[placeholder="Lastname"]').fill("testcustomer01");
    await page
      .locator('input[placeholder*="mail" i]')
      .fill("testcustomer01@gmail.com");
    await page.locator('input[placeholder="Username"]').fill("testcustomer01");
    await page.locator('input[placeholder*="phone" i]').fill("0150797041");

    await page.getByRole("button", { name: /done/i }).click();

    // Handle confirmation dialog
    await expect(
      page.locator("text=/Are you sure to update the data/i")
    ).toBeVisible();
    await page.getByRole("button", { name: /confirm/i }).click();

    // Check success notification
    await expect(
      page.locator("text=/Your profile has been updated successfully/i")
    ).toBeVisible();
  });
});
