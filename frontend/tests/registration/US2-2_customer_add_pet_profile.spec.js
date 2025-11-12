import { test, expect } from "@playwright/test";

test.describe("US2-2: Customer Add Pet Profile", () => {
  test.beforeEach(async ({ page }) => {
    // Login as customer
    await page.goto("http://localhost:3000/login");
    // Add login steps here
    await page.goto("http://localhost:3000/profile/pet/new"); // Adjust URL as needed
  });

  test("TC1-18: Valid Pet Profile - All Fields", async ({ page }) => {
    await page.getByLabel(/sex/i).selectOption("MALE");
    await page.getByLabel(/pet.*type/i).selectOption("DOG");
    await page.getByLabel(/pet.*name/i).fill("Scooby Doo");
    await page.getByLabel(/age/i).fill("15");
    await page.getByLabel(/food.*allergy/i).fill("Scooby Snack");
    await page.getByLabel(/breed/i).fill("Scooby");
    await page.getByLabel(/medical.*condition/i).fill("Fear ghost");
    await page
      .locator('input[type="file"]')
      .setInputFiles("path/to/test-image.jpg");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/successfully.*created/i")).toBeVisible();
  });

  test("TC1-19: Valid Pet Profile - No Image", async ({ page }) => {
    await page.getByLabel(/sex/i).selectOption("FEMALE");
    await page.getByLabel(/pet.*type/i).selectOption("CAT");
    await page.getByLabel(/pet.*name/i).fill("Scooby Doo");
    await page.getByLabel(/age/i).fill("15");
    await page.getByLabel(/food.*allergy/i).fill("Scooby Snack");
    await page.getByLabel(/breed/i).fill("Scooby");
    await page.getByLabel(/medical.*condition/i).fill("Fear ghost");
    // Skip image upload

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/successfully.*created/i")).toBeVisible();
  });

  test("TC1-20: Sex Not Selected", async ({ page }) => {
    // Do not select sex
    await page.getByLabel(/pet.*type/i).selectOption("DOG");
    await page.getByLabel(/pet.*name/i).fill("Scooby Doo");
    await page.getByLabel(/age/i).fill("15");
    await page.getByLabel(/food.*allergy/i).fill("Scooby Snack");
    await page.getByLabel(/breed/i).fill("Scooby");
    await page.getByLabel(/medical.*condition/i).fill("Fear ghost");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/sex.*required/i")).toBeVisible();
  });

  test("TC1-21: Pet Type Not Selected", async ({ page }) => {
    await page.getByLabel(/sex/i).selectOption("MALE");
    // Do not select pet type
    await page.getByLabel(/pet.*name/i).fill("Scooby Doo");
    await page.getByLabel(/age/i).fill("15");
    await page.getByLabel(/food.*allergy/i).fill("Scooby Snack");
    await page.getByLabel(/breed/i).fill("Scooby");
    await page.getByLabel(/medical.*condition/i).fill("Fear ghost");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/pet.*type.*required/i")).toBeVisible();
  });

  test("TC1-22: Empty Pet Name", async ({ page }) => {
    await page.getByLabel(/sex/i).selectOption("MALE");
    await page.getByLabel(/pet.*type/i).selectOption("DOG");
    await page.getByLabel(/pet.*name/i).fill("");
    await page.getByLabel(/age/i).fill("15");
    await page.getByLabel(/food.*allergy/i).fill("Scooby Snack");
    await page.getByLabel(/breed/i).fill("Scooby");
    await page.getByLabel(/medical.*condition/i).fill("Fear ghost");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/pet.*name.*required/i")).toBeVisible();
  });

  test("TC1-23: Invalid Pet Age", async ({ page }) => {
    await page.getByLabel(/sex/i).selectOption("MALE");
    await page.getByLabel(/pet.*type/i).selectOption("DOG");
    await page.getByLabel(/pet.*name/i).fill("Scooby Doo");
    await page.getByLabel(/age/i).fill("My age");
    await page.getByLabel(/food.*allergy/i).fill("Scooby Snack");
    await page.getByLabel(/breed/i).fill("Scooby");
    await page.getByLabel(/medical.*condition/i).fill("Fear ghost");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/age.*integer/i")).toBeVisible();
  });

  test("TC1-24: Empty Pet Age", async ({ page }) => {
    await page.getByLabel(/sex/i).selectOption("MALE");
    await page.getByLabel(/pet.*type/i).selectOption("DOG");
    await page.getByLabel(/pet.*name/i).fill("Scooby Doo");
    await page.getByLabel(/age/i).fill("");
    await page.getByLabel(/food.*allergy/i).fill("Scooby Snack");
    await page.getByLabel(/breed/i).fill("Scooby");
    await page.getByLabel(/medical.*condition/i).fill("Fear ghost");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/age.*required/i")).toBeVisible();
  });

  test("TC1-25: Empty Food Allergy", async ({ page }) => {
    await page.getByLabel(/sex/i).selectOption("MALE");
    await page.getByLabel(/pet.*type/i).selectOption("DOG");
    await page.getByLabel(/pet.*name/i).fill("Scooby Doo");
    await page.getByLabel(/age/i).fill("15");
    await page.getByLabel(/food.*allergy/i).fill("");
    await page.getByLabel(/breed/i).fill("Scooby");
    await page.getByLabel(/medical.*condition/i).fill("Fear ghost");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/successfully.*created/i")).toBeVisible();
  });

  test("TC1-26: Empty Pet Breed", async ({ page }) => {
    await page.getByLabel(/sex/i).selectOption("MALE");
    await page.getByLabel(/pet.*type/i).selectOption("DOG");
    await page.getByLabel(/pet.*name/i).fill("Scooby Doo");
    await page.getByLabel(/age/i).fill("15");
    await page.getByLabel(/food.*allergy/i).fill("Scooby Snack");
    await page.getByLabel(/breed/i).fill("");
    await page.getByLabel(/medical.*condition/i).fill("Fear ghost");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/successfully.*created/i")).toBeVisible();
  });

  test("TC1-27: Empty Medical Condition", async ({ page }) => {
    await page.getByLabel(/sex/i).selectOption("MALE");
    await page.getByLabel(/pet.*type/i).selectOption("DOG");
    await page.getByLabel(/pet.*name/i).fill("Scooby Doo");
    await page.getByLabel(/age/i).fill("15");
    await page.getByLabel(/food.*allergy/i).fill("Scooby Snack");
    await page.getByLabel(/breed/i).fill("Scooby");
    await page.getByLabel(/medical.*condition/i).fill("");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=/successfully.*created/i")).toBeVisible();
  });
});
