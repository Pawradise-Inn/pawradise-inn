import { test, expect } from "@playwright/test";

// Helper function to login as customer
async function loginAsCustomer(page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="Username"]', "testcustomer02");
  await page.fill('input[name="Password"]', "testcustomer02");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL(/\/room/);
}

test.describe.serial("US2-3: Customer Edit Profile", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page);
    await page.goto("http://localhost:3000/profile");

    // Wait for page to load
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

  test("TC1-28: Valid Profile Edit", async ({ page }) => {
    await page.locator('input[placeholder="Firstname"]').fill("bungsell");
    await page.locator('input[placeholder="Lastname"]').fill("roti");
    await page
      .locator('input[placeholder*="mail" i]')
      .fill("matiba02@gmail.com");
    await page.locator('input[placeholder="Username"]').fill("bungRakRoti02");
    await page.locator('input[placeholder*="phone" i]').fill("0245014634");

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
