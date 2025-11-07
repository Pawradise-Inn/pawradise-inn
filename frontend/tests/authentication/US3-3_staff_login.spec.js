import { test, expect } from "@playwright/test";

test.describe("Staff Login", () => {
  test("Initial login page elements", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    // Verify login page URL
    await expect(page).toHaveURL("http://localhost:3000/login");

    // Verify form elements are visible
    await expect(
      page.getByRole("textbox", { name: "Username (For Login)" })
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

    // Verify form fields are editable
    await expect(
      page.getByRole("textbox", { name: "Username (For Login)" })
    ).toBeEditable();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeEditable();
  });

  test("Failed login with incorrect username shows notification", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/login");

    // Fill in incorrect username
    await page
      .getByRole("textbox", { name: "Username (For Login)" })
      .fill("poroja");
    await page.getByRole("textbox", { name: "Password" }).fill("poro");

    // Verify fields are filled correctly
    await expect(
      page.getByRole("textbox", { name: "Username (For Login)" })
    ).toHaveValue("poroja");
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "poro"
    );

    // Click login button
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for and verify error notification header appears
    // Header from responseHandler.js for UNAUTHORIZED error
    await expect(page.getByText("Access Denied")).toBeVisible({ timeout: 5000 });

    // Verify error notification content from auth.js
    await expect(
      page.getByText("Invalid username or password")
    ).toBeVisible();

    // Verify we're still on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");

    // Verify token is NOT stored in localStorage
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeNull();
  });

  test("Failed login with incorrect password shows notification", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/login");

    // Fill in correct username but wrong password
    await page
      .getByRole("textbox", { name: "Username (For Login)" })
      .fill("poro");
    await page.getByRole("textbox", { name: "Password" }).fill("WrongPassword123");

    // Click login button
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for and verify error notification header appears
    // Header from responseHandler.js for UNAUTHORIZED error
    await expect(page.getByText("Access Denied")).toBeVisible({ timeout: 5000 });

    // Verify error notification content from auth.js
    await expect(
      page.getByText("Invalid username or password")
    ).toBeVisible();

    // Verify we're still on the login page
    await expect(page).toHaveURL("http://localhost:3000/login");

    // Verify token is NOT stored
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeNull();
  });

  test("Successful login with correct credentials", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    // Verify initial state - no token
    const initialToken = await page.evaluate(() => localStorage.getItem("token"));
    expect(initialToken).toBeNull();

    // Fill in correct credentials
    await page
      .getByRole("textbox", { name: "Username (For Login)" })
      .fill("poro");
    await page.getByRole("textbox", { name: "Password" }).fill("poro");

    // Verify fields are filled correctly
    await expect(
      page.getByRole("textbox", { name: "Username (For Login)" })
    ).toHaveValue("poro");
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "poro"
    );

    // Click login button
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for and verify success notification appears
    // Header from responseHandler.js for LOGIN_SUCCESSFUL
    await expect(page.getByText("Welcome Back")).toBeVisible({ timeout: 5000 });

    // Verify success notification content from responseHandler.js
    await expect(
      page.getByText("You have been logged in successfully")
    ).toBeVisible();

    // Wait for navigation after successful login
    await page.waitForURL(/\/dashboard|\/pet-status|\/review|\/management/, {
      timeout: 10000,
    });

    // Verify we navigated away from login page
    await expect(page).not.toHaveURL("http://localhost:3000/login");

    // Wait for and verify token is stored in localStorage
    await page.waitForFunction(
      () => localStorage.getItem("token") !== null,
      { timeout: 5000 }
    );

    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).not.toBeNull();
    expect(token).toBeTruthy();
  });

  test("Form validation - empty fields", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    const loginBtn = page.getByRole("button", { name: "Login" });

    // The app disables the button when fields are empty
    await expect(loginBtn).toBeVisible();
    await expect(loginBtn).toBeDisabled();

    // Still on login page, and no token stored
    await expect(page).toHaveURL("http://localhost:3000/login");
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeNull();

    await page
      .getByRole("textbox", { name: "Username (For Login)" })
      .fill("poro");

    await expect(loginBtn).toBeDisabled();

    // Still on login page, and no token stored
    await expect(page).toHaveURL("http://localhost:3000/login");
    const token2 = await page.evaluate(() => localStorage.getItem("token"));
    expect(token2).toBeNull();
  });
});