import { test, expect } from "@playwright/test";

test.describe("US2-3: Customer Edit Profile", () => {
  test.beforeEach(async ({ page }) => {
    // Login as customer
    await page.goto("http://localhost:3000/login");
    // Add login steps here
    await page.goto("http://localhost:3000/profile"); // Adjust URL as needed
  });

  test("TC1-28: Valid Profile Edit", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/phone/i).fill("5555555555");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/successfully.*updated/i")).toBeVisible();
  });

  test("TC1-29: Empty Firstname", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/firstname.*required/i")).toBeVisible();
  });

  test("TC1-30: Empty Lastname", async ({ page }) => {
    await page.getByLabel(/last.*name/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/lastname.*required/i")).toBeVisible();
  });

  test("TC1-31: Empty Username", async ({ page }) => {
    await page.getByLabel(/username/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/username.*required/i")).toBeVisible();
  });

  test("TC1-32: Duplicate Username", async ({ page }) => {
    await page.getByLabel(/username/i).fill("bungRakRoti");

    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=/username.*already.*taken/i")
    ).toBeVisible();
  });

  test("TC1-33: Short Phone Number", async ({ page }) => {
    await page.getByLabel(/phone/i).fill("5");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/phone.*10.*digit/i")).toBeVisible();
  });

  test("TC1-34: Long Phone Number", async ({ page }) => {
    await page.getByLabel(/phone/i).fill("55555555555555555555");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/phone.*10.*digit/i")).toBeVisible();
  });

  test("TC1-35: Invalid Phone Number", async ({ page }) => {
    await page.getByLabel(/phone/i).fill("phoneNumber");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/phone.*numeric/i")).toBeVisible();
  });

  test("TC1-36: Empty Phone Number", async ({ page }) => {
    await page.getByLabel(/phone/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/phone.*required/i")).toBeVisible();
  });

  test("TC1-37: Duplicate Phone Number", async ({ page }) => {
    await page.getByLabel(/phone/i).fill("5555555555");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/phone.*already.*use/i")).toBeVisible();
  });

  test("TC1-38: Invalid Email Format", async ({ page }) => {
    await page.getByLabel(/email/i).fill("matiba");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/invalid.*email/i")).toBeVisible();
  });

  test("TC1-39: Empty Email", async ({ page }) => {
    await page.getByLabel(/email/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/email.*required/i")).toBeVisible();
  });

  test("TC1-40: Duplicate Email", async ({ page }) => {
    await page.getByLabel(/email/i).fill("matiba@gmail.com");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/email.*already.*use/i")).toBeVisible();
  });
});
