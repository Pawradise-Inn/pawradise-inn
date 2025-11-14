import { test, expect } from "@playwright/test";

// Helper function to login as teststaff01
async function loginAsTestStaff01(page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="Username"]', "teststaff01");
  await page.fill('input[name="Password"]', "teststaff01");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL(/\/staff\/dashboard/);
}

// Helper function to login as teststaff02
async function loginAsTestStaff02(page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="Username"]', "teststaff02");
  await page.fill('input[name="Password"]', "teststaff02");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL(/\/staff\/dashboard/);
}

// Separate describe block for TC1-41 - runs first with teststaff01
test.describe("US2-4: Staff Edit Profile - Valid Update", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestStaff01(page);
    await page.goto("http://localhost:3000/staff/management/profile");
    await page.waitForLoadState("networkidle");
  });

  test("TC1-41: Valid Profile Edit", async ({ page }) => {
    await page
      .locator('input[placeholder="Firstname"]')
      .waitFor({ state: "visible" });

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

// Main validation tests - use teststaff02
test.describe("US2-4: Staff Edit Profile - Validation Tests", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestStaff02(page);
    await page.goto("http://localhost:3000/staff/management/profile");
    await page.waitForLoadState("networkidle");
  });

  test("TC1-42: Empty Firstname", async ({ page }) => {
    await page
      .locator('input[placeholder="Firstname"]')
      .waitFor({ state: "visible" });

    await page.locator('input[placeholder="Firstname"]').fill("");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please fill in all required fields/i")
    ).toBeVisible();
  });

  test("TC1-43: Empty Lastname", async ({ page }) => {
    await page
      .locator('input[placeholder="Lastname"]')
      .waitFor({ state: "visible" });

    await page.locator('input[placeholder="Lastname"]').fill("");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please fill in all required fields/i")
    ).toBeVisible();
  });

  test("TC1-44: Empty Username", async ({ page }) => {
    await page
      .locator('input[placeholder="Username"]')
      .waitFor({ state: "visible" });

    await page.locator('input[placeholder="Username"]').fill("");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please fill in all required fields/i")
    ).toBeVisible();
  });

  test("TC1-45: Duplicate Username", async ({ page }) => {
    await page
      .locator('input[placeholder="Username"]')
      .waitFor({ state: "visible" });

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

  test("TC1-46: Short Phone Number", async ({ page }) => {
    await page
      .locator('input[placeholder*="phone" i]')
      .waitFor({ state: "visible" });

    await page.locator('input[placeholder*="phone" i]').fill("5");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(page.locator("text=/Phone number is invalid/i")).toBeVisible();
  });

  test("TC1-47: Long Phone Number", async ({ page }) => {
    await page
      .locator('input[placeholder*="phone" i]')
      .waitFor({ state: "visible" });

    await page
      .locator('input[placeholder*="phone" i]')
      .fill("55555555555555555555");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(page.locator("text=/Phone number is invalid/i")).toBeVisible();
  });

  test("TC1-48: Invalid Phone Number", async ({ page }) => {
    await page
      .locator('input[placeholder*="phone" i]')
      .waitFor({ state: "visible" });

    await page.locator('input[placeholder*="phone" i]').fill("phoneNumber");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(page.locator("text=/Phone number is invalid/i")).toBeVisible();
  });

  test("TC1-49: Empty Phone Number", async ({ page }) => {
    await page
      .locator('input[placeholder*="phone" i]')
      .waitFor({ state: "visible" });

    await page.locator('input[placeholder*="phone" i]').fill("");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please fill in all required fields/i")
    ).toBeVisible();
  });

  test("TC1-50: Duplicate Phone Number", async ({ page }) => {
    await page
      .locator('input[placeholder*="phone" i]')
      .waitFor({ state: "visible" });

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

  test("TC1-51: Invalid Email Format", async ({ page }) => {
    await page
      .locator('input[placeholder*="mail" i]')
      .waitFor({ state: "visible" });

    await page.locator('input[placeholder*="mail" i]').fill("matiba");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please enter a valid email address/i")
    ).toBeVisible();
  });

  test("TC1-52: Empty Email", async ({ page }) => {
    await page
      .locator('input[placeholder*="mail" i]')
      .waitFor({ state: "visible" });

    await page.locator('input[placeholder*="mail" i]').fill("");

    await page.getByRole("button", { name: /done/i }).click();

    await expect(
      page.locator("text=/Please fill in all required fields/i")
    ).toBeVisible();
  });

  test("TC1-53: Duplicate Email", async ({ page }) => {
    await page
      .locator('input[placeholder*="mail" i]')
      .waitFor({ state: "visible" });

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

// Separate describe block for cleanup - resets teststaff01 profile
test.describe("US2-4: Cleanup", () => {
  test("Reset Staff Profile to Original", async ({ page }) => {
    // Login with updated credentials
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="Username"]', "bungRakRoti");
    await page.fill('input[name="Password"]', "teststaff01");
    await page.getByRole("button", { name: /login/i }).click();
    await page.waitForURL(/\/staff\/dashboard/);

    // Navigate to profile
    await page.goto("http://localhost:3000/staff/management/profile");
    await page.waitForLoadState("networkidle");

    // Wait for inputs to be visible
    await page
      .locator('input[placeholder="Firstname"]')
      .waitFor({ state: "visible" });

    // Reset to original values
    await page.locator('input[placeholder="Firstname"]').fill("teststaff01");
    await page.locator('input[placeholder="Lastname"]').fill("teststaff01");
    await page
      .locator('input[placeholder*="mail" i]')
      .fill("teststaff01@gmail.com");
    await page.locator('input[placeholder="Username"]').fill("teststaff01");
    await page.locator('input[placeholder*="phone" i]').fill("0067412457");

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
