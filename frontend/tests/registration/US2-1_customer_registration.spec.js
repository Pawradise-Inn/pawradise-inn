import { test, expect } from "@playwright/test";

test.describe("US2-1: Customer Registration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/register"); // Adjust URL as needed
  });

  test("TC1-1: Valid Registration", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page).toHaveURL("http://localhost:3000/room");
  });

  test("TC1-2: Empty Firstname", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/firstname.*required/i")).toBeVisible();
  });

  test("TC1-3: Empty Lastname", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/lastname.*required/i")).toBeVisible();
  });

  test("TC1-4: Invalid Email Format", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/invalid.*email/i")).toBeVisible();
  });

  test("TC1-5: Empty Email", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/email.*required/i")).toBeVisible();
  });

  test("TC1-6: Duplicate Email", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("differentUsername");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/email.*already.*use/i")).toBeVisible();
  });

  test("TC1-7: Empty Username", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/username.*required/i")).toBeVisible();
  });

  test("TC1-8: Duplicate Username", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("different@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(
      page.locator("text=/username.*already.*taken/i")
    ).toBeVisible();
  });

  test("TC1-9: Empty Password", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("");
    await page.getByLabel(/confirm.*password/i).fill("");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/password.*required/i")).toBeVisible();
  });

  test("TC1-10: Password Mismatch", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti1234567890");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/password.*do not match/i")).toBeVisible();
  });

  test("TC1-11: Empty Confirm Password", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(
      page.locator("text=/confirm.*password.*required/i")
    ).toBeVisible();
  });

  test("TC1-12: Short Phone Number", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/phone.*10.*digit/i")).toBeVisible();
  });

  test("TC1-13: Long Phone Number", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("55555555555555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/phone.*10.*digit/i")).toBeVisible();
  });

  test("TC1-14: Invalid Phone Number", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("phoneNumber");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/phone.*number/i")).toBeVisible();
  });

  test("TC1-15: Empty Phone Number", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/phone.*required/i")).toBeVisible();
  });

  test("TC1-16: Duplicate Phone Number", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("different@gmail.com");
    await page.getByLabel(/username/i).fill("differentUsername");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5555555555");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(page.locator("text=/phone.*already.*use/i")).toBeVisible();
  });

  test("TC1-17: Consent Not Checked", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("5555555555");
    // Consent not checked

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(
      page.locator("text=/consent.*required|agree.*terms/i")
    ).toBeVisible();
  });
});
