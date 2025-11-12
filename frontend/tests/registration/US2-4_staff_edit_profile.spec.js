import { test, expect } from "@playwright/test";

test.describe("US2-4: Staff Edit Profile", () => {
  test.beforeEach(async ({ page }) => {
    // Login as staff
    await page.goto("http://localhost:3000/login");
    // Add staff login steps here
    await page.goto("http://localhost:3000/staff/management/profile"); // Adjust URL as needed
  });

  test("TC1-41: Valid Profile Edit", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/phone/i).fill("5555555555");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/successfully.*updated/i")).toBeVisible();
  });

  test("TC1-42: Empty Firstname", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/firstname.*required/i")).toBeVisible();
  });

  test("TC1-43: Empty Lastname", async ({ page }) => {
    await page.getByLabel(/last.*name/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/lastname.*required/i")).toBeVisible();
  });

  test("TC1-44: Empty Username", async ({ page }) => {
    await page.getByLabel(/username/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/username.*required/i")).toBeVisible();
  });

  test("TC1-45: Duplicate Username", async ({ page }) => {
    await page.getByLabel(/username/i).fill("bungRakRoti");

    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=/username.*already.*taken/i")
    ).toBeVisible();
  });

  test("TC1-46: Short Phone Number", async ({ page }) => {
    await page.getByLabel(/phone/i).fill("5");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/phone.*10.*digit/i")).toBeVisible();
  });

  test("TC1-47: Long Phone Number", async ({ page }) => {
    await page.getByLabel(/phone/i).fill("55555555555555555555");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/phone.*10.*digit/i")).toBeVisible();
  });

  test("TC1-48: Invalid Phone Number", async ({ page }) => {
    await page.getByLabel(/phone/i).fill("phoneNumber");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/phone.*numeric/i")).toBeVisible();
  });

  test("TC1-49: Empty Phone Number", async ({ page }) => {
    await page.getByLabel(/phone/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/phone.*required/i")).toBeVisible();
  });

  test("TC1-50: Duplicate Phone Number", async ({ page }) => {
    await page.getByLabel(/phone/i).fill("5555555555");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/phone.*already.*use/i")).toBeVisible();
  });

  test("TC1-51: Invalid Email Format", async ({ page }) => {
    await page.getByLabel(/email/i).fill("matiba");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/invalid.*email/i")).toBeVisible();
  });

  test("TC1-52: Empty Email", async ({ page }) => {
    await page.getByLabel(/email/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/email.*required/i")).toBeVisible();
  });

  test("TC1-53: Duplicate Email", async ({ page }) => {
    await page.getByLabel(/email/i).fill("matiba@gmail.com");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/email.*already.*use/i")).toBeVisible();
  });
});
