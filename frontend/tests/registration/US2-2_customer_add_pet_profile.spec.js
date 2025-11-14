import { test, expect } from "@playwright/test";

// Helper function to login as customer
async function loginAsCustomer(page) {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="Username"]', "testcustomer01");
  await page.fill('input[name="Password"]', "testcustomer01");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL(/\/room/);
}

test.describe("US2-2: Customer Add Pet Profile", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page);
    await page.goto("http://localhost:3000/profile/pet/new");

    // Wait for page animations to complete
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000); // Additional wait for animations
  });

  test("TC1-18: Valid Pet Profile - All Fields", async ({ page }) => {
    await page.locator('label:has(input[value="MALE"]) span').click();

    await page.locator("text=Select Pet Type").click();
    await page.waitForTimeout(500);
    await page.locator("text=DOG").click();

    await page
      .locator(
        'label:has-text("Pet name") + input, label:has-text("Pet name") ~ input, input[name="petName"]'
      )
      .first()
      .waitFor({ state: "visible" });
    await page
      .locator(
        'label:has-text("Pet name") + input, label:has-text("Pet name") ~ input, input[name="petName"]'
      )
      .first()
      .fill("Scooby Doo");

    await page
      .locator(
        'label:has-text("Age") + input, label:has-text("Age") ~ input, input[name="age"]'
      )
      .first()
      .fill("15");
    await page
      .locator(
        'label:has-text("Food allergy") + input, input[name="foodAllergy"]'
      )
      .first()
      .fill("Scooby Snack");
    await page
      .locator('label:has-text("Pet breed") + input, input[name="breed"]')
      .first()
      .fill("Scooby");
    await page
      .locator(
        'label:has-text("Medical condition") + input, input[name="medicalCondition"]'
      )
      .first()
      .fill("Fear ghost");

    await page
      .locator('input[type="file"]')
      .setInputFiles("frontend/tests/registration/assets/kitasan_black.png");

    // Click Done button
    await page.getByRole("button", { name: /done/i }).click();

    await expect(page.locator("text=/Create this new pet/i")).toBeVisible();
    await page.getByRole("button", { name: /confirm/i }).click();

    await expect(
      page.locator("text=/Your pet has been registered successfully/i")
    ).toBeVisible();
  });

  test("TC1-19: Valid Pet Profile - No Image", async ({ page }) => {
    await page.locator('label:has(input[value="FEMALE"]) span').click();
    await page.locator("text=Select Pet Type").click();
    await page.waitForTimeout(500);
    await page.locator("text=CAT").click();

    await page
      .locator('label:has-text("Pet name") + input, input[name="petName"]')
      .first()
      .fill("Scooby Doo");
    await page
      .locator('label:has-text("Age") + input, input[name="age"]')
      .first()
      .fill("15");
    await page
      .locator(
        'label:has-text("Food allergy") + input, input[name="foodAllergy"]'
      )
      .first()
      .fill("Scooby Snack");
    await page
      .locator('label:has-text("Pet breed") + input, input[name="breed"]')
      .first()
      .fill("Scooby");
    await page
      .locator(
        'label:has-text("Medical condition") + input, input[name="medicalCondition"]'
      )
      .first()
      .fill("Fear ghost");

    await page.getByRole("button", { name: /done/i }).click();
    await expect(page.locator("text=/Create this new pet/i")).toBeVisible();
    await page.getByRole("button", { name: /confirm/i }).click();
    await expect(
      page.locator("text=/Your pet has been registered successfully/i")
    ).toBeVisible();
  });

  test("TC1-20: Sex Not Selected", async ({ page }) => {
    await page.locator("text=Select Pet Type").click();
    await page.waitForTimeout(500);
    await page.locator("text=DOG").click();

    await page
      .locator('label:has-text("Pet name") + input, input[name="petName"]')
      .first()
      .fill("Scooby Doo");
    await page
      .locator('label:has-text("Age") + input, input[name="age"]')
      .first()
      .fill("15");
    await page
      .locator(
        'label:has-text("Food allergy") + input, input[name="foodAllergy"]'
      )
      .first()
      .fill("Scooby Snack");
    await page
      .locator('label:has-text("Pet breed") + input, input[name="breed"]')
      .first()
      .fill("Scooby");
    await page
      .locator(
        'label:has-text("Medical condition") + input, input[name="medicalCondition"]'
      )
      .first()
      .fill("Fear ghost");

    await page.getByRole("button", { name: /done/i }).click();
    await expect(
      page.locator("text=/Please provide all required pet information/i")
    ).toBeVisible();
  });

  test("TC1-21: Pet Type Not Selected", async ({ page }) => {
    await page.locator('label:has(input[value="MALE"]) span').click();

    await page
      .locator('label:has-text("Pet name") + input, input[name="petName"]')
      .first()
      .fill("Scooby Doo");
    await page
      .locator('label:has-text("Age") + input, input[name="age"]')
      .first()
      .fill("15");
    await page
      .locator(
        'label:has-text("Food allergy") + input, input[name="foodAllergy"]'
      )
      .first()
      .fill("Scooby Snack");
    await page
      .locator('label:has-text("Pet breed") + input, input[name="breed"]')
      .first()
      .fill("Scooby");
    await page
      .locator(
        'label:has-text("Medical condition") + input, input[name="medicalCondition"]'
      )
      .first()
      .fill("Fear ghost");

    await page.getByRole("button", { name: /done/i }).click();
    await expect(
      page.locator("text=/Please provide all required pet information/i")
    ).toBeVisible();
  });

  test("TC1-22: Empty Pet Name", async ({ page }) => {
    await page.locator('label:has(input[value="MALE"]) span').click();
    await page.locator("text=Select Pet Type").click();
    await page.waitForTimeout(500);
    await page.locator("text=DOG").click();

    await page
      .locator('label:has-text("Pet name") + input, input[name="petName"]')
      .first()
      .fill("");
    await page
      .locator('label:has-text("Age") + input, input[name="age"]')
      .first()
      .fill("15");
    await page
      .locator(
        'label:has-text("Food allergy") + input, input[name="foodAllergy"]'
      )
      .first()
      .fill("Scooby Snack");
    await page
      .locator('label:has-text("Pet breed") + input, input[name="breed"]')
      .first()
      .fill("Scooby");
    await page
      .locator(
        'label:has-text("Medical condition") + input, input[name="medicalCondition"]'
      )
      .first()
      .fill("Fear ghost");

    await page.getByRole("button", { name: /done/i }).click();
    await expect(
      page.locator("text=/Please provide all required pet information/i")
    ).toBeVisible();
  });

  test("TC1-23: Invalid Pet Age", async ({ page }) => {
    await page.locator('label:has(input[value="MALE"]) span').click();
    await page.locator("text=Select Pet Type").click();
    await page.waitForTimeout(500);
    await page.locator("text=DOG").click();

    await page
      .locator('label:has-text("Pet name") + input, input[name="petName"]')
      .first()
      .fill("Scooby Doo");
    await page
      .locator('label:has-text("Age") + input, input[name="age"]')
      .first()
      .fill("My age");
    await page
      .locator(
        'label:has-text("Food allergy") + input, input[name="foodAllergy"]'
      )
      .first()
      .fill("Scooby Snack");
    await page
      .locator('label:has-text("Pet breed") + input, input[name="breed"]')
      .first()
      .fill("Scooby");
    await page
      .locator(
        'label:has-text("Medical condition") + input, input[name="medicalCondition"]'
      )
      .first()
      .fill("Fear ghost");

    await page.getByRole("button", { name: /done/i }).click();
    await expect(
      page.locator("text=/Please provide a valid number for pet age/i")
    ).toBeVisible();
  });

  test("TC1-24: Empty Pet Age", async ({ page }) => {
    await page.locator('label:has(input[value="MALE"]) span').click();
    await page.locator("text=Select Pet Type").click();
    await page.waitForTimeout(500);
    await page.locator("text=DOG").click();

    await page
      .locator('label:has-text("Pet name") + input, input[name="petName"]')
      .first()
      .fill("Scooby Doo");
    await page
      .locator('label:has-text("Age") + input, input[name="age"]')
      .first()
      .fill("");
    await page
      .locator(
        'label:has-text("Food allergy") + input, input[name="foodAllergy"]'
      )
      .first()
      .fill("Scooby Snack");
    await page
      .locator('label:has-text("Pet breed") + input, input[name="breed"]')
      .first()
      .fill("Scooby");
    await page
      .locator(
        'label:has-text("Medical condition") + input, input[name="medicalCondition"]'
      )
      .first()
      .fill("Fear ghost");

    await page.getByRole("button", { name: /done/i }).click();
    await expect(
      page.locator("text=/Please provide all required pet information/i")
    ).toBeVisible();
  });

  test("TC1-25: Empty Food Allergy", async ({ page }) => {
    await page.locator('label:has(input[value="MALE"]) span').click();
    await page.locator("text=Select Pet Type").click();
    await page.waitForTimeout(500);
    await page.locator("text=DOG").click();

    await page
      .locator('label:has-text("Pet name") + input, input[name="petName"]')
      .first()
      .fill("Scooby Doo");
    await page
      .locator('label:has-text("Age") + input, input[name="age"]')
      .first()
      .fill("15");
    await page
      .locator(
        'label:has-text("Food allergy") + input, input[name="foodAllergy"]'
      )
      .first()
      .fill("");
    await page
      .locator('label:has-text("Pet breed") + input, input[name="breed"]')
      .first()
      .fill("Scooby");
    await page
      .locator(
        'label:has-text("Medical condition") + input, input[name="medicalCondition"]'
      )
      .first()
      .fill("Fear ghost");

    await page.getByRole("button", { name: /done/i }).click();
    await expect(
      page.locator("text=/Please provide all required pet information/i")
    ).toBeVisible();
  });

  test("TC1-26: Empty Pet Breed", async ({ page }) => {
    await page.locator('label:has(input[value="MALE"]) span').click();
    await page.locator("text=Select Pet Type").click();
    await page.waitForTimeout(500);
    await page.locator("text=DOG").click();

    await page
      .locator('label:has-text("Pet name") + input, input[name="petName"]')
      .first()
      .fill("Scooby Doo");
    await page
      .locator('label:has-text("Age") + input, input[name="age"]')
      .first()
      .fill("15");
    await page
      .locator(
        'label:has-text("Food allergy") + input, input[name="foodAllergy"]'
      )
      .first()
      .fill("Scooby Snack");
    await page
      .locator('label:has-text("Pet breed") + input, input[name="breed"]')
      .first()
      .fill("");
    await page
      .locator(
        'label:has-text("Medical condition") + input, input[name="medicalCondition"]'
      )
      .first()
      .fill("Fear ghost");

    await page.getByRole("button", { name: /done/i }).click();
    await expect(
      page.locator("text=/Please provide all required pet information/i")
    ).toBeVisible();
  });

  test("TC1-27: Empty Medical Condition", async ({ page }) => {
    await page.locator('label:has(input[value="MALE"]) span').click();
    await page.locator("text=Select Pet Type").click();
    await page.waitForTimeout(500);
    await page.locator("text=DOG").click();

    await page
      .locator('label:has-text("Pet name") + input, input[name="petName"]')
      .first()
      .fill("Scooby Doo");
    await page
      .locator('label:has-text("Age") + input, input[name="age"]')
      .first()
      .fill("15");
    await page
      .locator(
        'label:has-text("Food allergy") + input, input[name="foodAllergy"]'
      )
      .first()
      .fill("Scooby Snack");
    await page
      .locator('label:has-text("Pet breed") + input, input[name="breed"]')
      .first()
      .fill("Scooby");
    await page
      .locator(
        'label:has-text("Medical condition") + input, input[name="medicalCondition"]'
      )
      .first()
      .fill("");

    await page.getByRole("button", { name: /done/i }).click();
    await expect(
      page.locator("text=/Please provide all required pet information/i")
    ).toBeVisible();
  });
});
