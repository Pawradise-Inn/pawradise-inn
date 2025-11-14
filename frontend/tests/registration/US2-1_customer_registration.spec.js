import { test, expect } from "@playwright/test";

test.describe("US2-1: Customer Registration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/register");
  });

  test("TC1-1: Valid Registration", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("matiba01@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti01");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("0649488957");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    // Check navigation to room page
    await expect(page).toHaveURL("http://localhost:3000/room");

    // Check for success notification on the room page
    await expect(
      page.locator("text=/Registration completed successfully/i")
    ).toBeVisible();
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

    // Check that submit button is disabled
    const submitButton = page.getByRole("button", {
      name: /submit|register|sign up|done/i,
    });
    await expect(submitButton).toBeDisabled();
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

    // Check that submit button is disabled
    const submitButton = page.getByRole("button", {
      name: /submit|register|sign up|done/i,
    });
    await expect(submitButton).toBeDisabled();
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

    // Listen for validation message
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Please include an '@' in");
      await dialog.accept();
    });

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    // Check for HTML5 validation message (browser native)
    const emailInput = page.getByLabel(/email/i);
    const validationMessage = await emailInput.evaluate(
      (el) => el.validationMessage
    );
    expect(validationMessage).toContain("@");
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

    // Check that submit button is disabled
    const submitButton = page.getByRole("button", {
      name: /submit|register|sign up|done/i,
    });
    await expect(submitButton).toBeDisabled();
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

    await expect(
      page.locator(
        "text=/This email is already taken.*Please choose a different one/i"
      )
    ).toBeVisible();
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

    // Check that submit button is disabled
    const submitButton = page.getByRole("button", {
      name: /submit|register|sign up|done/i,
    });
    await expect(submitButton).toBeDisabled();
  });

  test("TC1-8: Duplicate Username", async ({ page }) => {
    await page.getByLabel(/first.*name/i).fill("bungsell");
    await page.getByLabel(/last.*name/i).fill("roti");
    await page.getByLabel(/email/i).fill("different@gmail.com");
    await page.getByLabel(/username/i).fill("bungRakRoti");
    await page.getByLabel(/^password$/i).fill("roti12345678");
    await page.getByLabel(/confirm.*password/i).fill("roti12345678");
    await page.getByLabel(/phone/i).fill("0961562155");
    await page.getByLabel(/consent|agree/i).check();

    await page
      .getByRole("button", { name: /submit|register|sign up|done/i })
      .click();

    await expect(
      page.locator(
        "text=/This username is already taken.*Please choose a different one/i"
      )
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

    // Check that submit button is disabled
    const submitButton = page.getByRole("button", {
      name: /submit|register|sign up|done/i,
    });
    await expect(submitButton).toBeDisabled();
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

    await expect(page.locator("text=/Password do not match/i")).toBeVisible();
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

    // Check that submit button is disabled
    const submitButton = page.getByRole("button", {
      name: /submit|register|sign up|done/i,
    });
    await expect(submitButton).toBeDisabled();
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

    await expect(page.locator("text=/Phone number is invalid/i")).toBeVisible();
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

    await expect(page.locator("text=/Phone number is invalid/i")).toBeVisible();
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

    await expect(page.locator("text=/Phone number is invalid/i")).toBeVisible();
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

    // Check that submit button is disabled
    const submitButton = page.getByRole("button", {
      name: /submit|register|sign up|done/i,
    });
    await expect(submitButton).toBeDisabled();
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

    await expect(
      page.locator(
        "text=/This phone number is already taken.*Please choose a different one/i"
      )
    ).toBeVisible();
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

    // Check that submit button is disabled
    const submitButton = page.getByRole("button", {
      name: /submit|register|sign up|done/i,
    });
    await expect(submitButton).toBeDisabled();
  });
});
