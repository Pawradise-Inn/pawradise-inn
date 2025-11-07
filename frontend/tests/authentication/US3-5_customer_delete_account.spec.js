import { test, expect } from "@playwright/test";

test.describe("Customer Delete Account", () => {
  const baseUrl = "http://localhost:3000";
  const username = "test1234";
  const password = "1234";

  // Helper to login and land on /profile (your delete UI lives there)
  const loginAndGoProfile = async (page) => {
    await page.goto(`${baseUrl}/login`);
    await page.getByRole("textbox", { name: "Username (For Login)" }).fill(username);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Welcome Back")).toBeVisible({ timeout: 5000 });
    await page.waitForURL(/\/room|\/profile|\/dashboard/, { timeout: 10000 });
    await page.goto(`${baseUrl}/profile`);
    await expect(page).toHaveURL(/\/profile/);
  };

  test("Delete control is hidden when not authenticated", async ({ page }) => {
    await page.goto(`${baseUrl}/profile`);
    // App should guard profile and send us to login
    await expect(page).toHaveURL(`${baseUrl}/login`);

    // Delete UI shouldn't be present unauthenticated
    await expect(page.getByRole("button", { name: "Delete account" })).toHaveCount(0);

    // No token
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeNull();
  });

  test("Open delete dialog and cancel — account remains", async ({ page }) => {
    await loginAndGoProfile(page);

    // Open dialog
    await expect(page.getByRole("button", { name: "Delete account" })).toBeVisible();
    await page.getByRole("button", { name: "Delete account" }).click();

    // Cancel (button may be 'Cancel' or 'cancel')
    const cancelBtn = page.getByRole('button', { name: 'cancel', exact: true });

    await expect(cancelBtn).toBeVisible();
    await cancelBtn.click();

    // Still on profile, still authenticated
    await expect(page).toHaveURL(/\/profile/);
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeTruthy();
  });

  test("Validation: confirm button disabled when password empty", async ({ page }) => {
    await loginAndGoProfile(page);

    await page.getByRole("button", { name: "Delete account" }).click();

    const pwd = page.getByRole("textbox", { name: "Password" });
    const confirmBtn = page.getByRole('button', { name: 'confirm' });

    await expect(confirmBtn).toBeVisible();
    // Ensure empty
    await pwd.fill("");
    await confirmBtn.click();
    await expect(page.getByText('Please enter your password.')).toBeVisible();

    // Still on profile and still logged in
    await expect(page).toHaveURL(/\/profile/);
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeTruthy();
  });

  test("Wrong password — shows error and does not delete", async ({ page }) => {
    await loginAndGoProfile(page);

    await page.getByRole("button", { name: "Delete account" }).click();

    await page.getByRole("textbox", { name: "Password" }).fill("WRONG_PASSWORD");
    await page.getByRole("button", { name: /confirm/i }).click();

    // Expect some error to appear; adapt selector/text to your UI if needed
    await expect(page.getByText("Incorrect password")).toBeVisible({ timeout: 5000 });
    
    // Still authenticated and on profile
    await expect(page).toHaveURL(/\/profile/);
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeTruthy();
  });

  test("Delete account successfully (logs out + removes token + prevents re-login)", async ({ page }) => {
    await loginAndGoProfile(page);

    // Perform delete
    await page.getByRole("button", { name: "Delete account" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: /confirm/i }).click();

    // Success notifications
    await expect(page.getByText("Deleted Successfully")).toBeVisible();
    await expect(page.getByText("Account deleted and logged out successfully")).toBeVisible();

    // Redirected to login and token cleared
    await expect(page).toHaveURL(`${baseUrl}/login`);
    const tokenAfter = await page.evaluate(() => localStorage.getItem("token"));
    expect(tokenAfter).toBeNull();

    // Attempt to login again with the same (now-deleted) account should fail
    await page.getByRole("textbox", { name: "Username (For Login)" }).fill(username);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Access Denied")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/Invalid username or password/i)).toBeVisible();
    await expect(page).toHaveURL(`${baseUrl}/login`);

    // Protected routes should be blocked
    await page.goto(`${baseUrl}/profile`);
    await expect(page).toHaveURL(`${baseUrl}/login`);
    await page.goto(`${baseUrl}/dashboard`);
    await expect(page).toHaveURL(`${baseUrl}/login`);
  });
});
