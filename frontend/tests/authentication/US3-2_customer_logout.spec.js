import { test, expect } from "@playwright/test";

test.describe("Customer Logout", () => {
    test("Logout successfully", async ({ page }) => {
        // Login
        await page.goto("http://localhost:3000/login");
        await page.getByRole("textbox", { name: "Username (For Login)" }).fill("test1234");
        await page.getByRole("textbox", { name: "Password" }).fill("1234");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page.getByText("Welcome Back")).toBeVisible({ timeout: 5000 });
        await page.waitForURL(/\/room|\/service|\/review|\/profile/, { timeout: 10000 });

        // Navigate to a profile page
        await page.goto("http://localhost:3000/profile");
        await expect(page).toHaveURL(/\/profile/);

        // Logout from there
        await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
        await page.getByRole("link", { name: "Logout" }).click();

        // Expect logout notifications and redirect to login
        await expect(page.getByText("Logged Out", { exact: true })).toBeVisible();
        await expect(page.getByText("You have been logged out")).toBeVisible();
        await expect(page).toHaveURL("http://localhost:3000/login");

        // Token cleared
        const token = await page.evaluate(() => localStorage.getItem("token"));
        expect(token).toBeNull();
    });
    test("Logout control is hidden when not authenticated", async ({ page }) => {
        // Start on login page, unauthenticated
        await page.goto("http://localhost:3000/login");
        await expect(page).toHaveURL("http://localhost:3000/login");

        // Logout link should not be visible when not logged in
        await expect(page.getByRole("link", { name: "Logout" })).toHaveCount(0);

        // Also ensure no token is present
        const token = await page.evaluate(() => localStorage.getItem("token"));
        expect(token).toBeNull();
    });

    test("Logout clears token and blocks access to protected routes", async ({ page }) => {
        // Login
        await page.goto("http://localhost:3000/login");
        await page.getByRole("textbox", { name: "Username (For Login)" }).fill("test1234");
        await page.getByRole("textbox", { name: "Password" }).fill("1234");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page.getByText("Welcome Back")).toBeVisible({ timeout: 5000 });
        await page.waitForURL(/\/room|\/service|\/review|\/profile/, { timeout: 10000 });

        // Confirm token exists
        await page.waitForFunction(() => localStorage.getItem("token") !== null, { timeout: 5000 });
        const tokenAfterLogin = await page.evaluate(() => localStorage.getItem("token"));
        expect(tokenAfterLogin).toBeTruthy();

        // Navigate to a profile page
        await page.goto("http://localhost:3000/profile");
        await expect(page).toHaveURL(/\/profile/);

        // Logout
        await page.getByRole("link", { name: "Logout" }).click();
        await expect(page.getByText("Logged Out", { exact: true })).toBeVisible();
        await expect(page).toHaveURL("http://localhost:3000/login");

        // Token removed
        const tokenAfterLogout = await page.evaluate(() => localStorage.getItem("token"));
        expect(tokenAfterLogout).toBeNull();

        // Try to access protected routes — should be redirected to login
        await page.goto("http://localhost:3000/profile");
        await expect(page).toHaveURL("http://localhost:3000/login");

        await page.goto("http://localhost:3000/dashboard");
        await expect(page).toHaveURL("http://localhost:3000/login");
    });

    test("Logout is idempotent (multiple clicks / reload)", async ({ page }) => {
        // Login
        await page.goto("http://localhost:3000/login");
        await page.getByRole("textbox", { name: "Username (For Login)" }).fill("test1234");
        await page.getByRole("textbox", { name: "Password" }).fill("1234");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page.getByText("Welcome Back")).toBeVisible({ timeout: 5000 });
        await page.waitForURL(/\/room|\/service|\/review|\/profile/, { timeout: 10000 });

        // Navigate to a profile page
        await page.goto("http://localhost:3000/profile");
        await expect(page).toHaveURL(/\/profile/);

        // First logout
        const logoutLink = page.getByRole("link", { name: "Logout" });
        await expect(logoutLink).toBeVisible();
        await logoutLink.click();
        await expect(page.getByText("Logged Out", { exact: true })).toBeVisible();
        await expect(page).toHaveURL("http://localhost:3000/login");

        // Ensure token cleared
        const tokenAfterLogout = await page.evaluate(() => localStorage.getItem("token"));
        expect(tokenAfterLogout).toBeNull();

        // Second logout attempt should be a no-op: link should not exist on login page
        await expect(page.getByRole("link", { name: "Logout" })).toHaveCount(0);

        // Reload and confirm still logged out
        await page.reload();
        await expect(page).toHaveURL("http://localhost:3000/login");
        const tokenAfterReload = await page.evaluate(() => localStorage.getItem("token"));
        expect(tokenAfterReload).toBeNull();
    });
});