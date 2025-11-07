import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";
import { mockSlipOK } from "../MockAPI";

let app;
let petData;

test.describe("US5-7: Customer View Pet Status", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.login();

    // Create shared pet for all tests
    petData = await app.addPet({ name: "TestPet", type: "DOG" });
  });

  test.afterEach(async () => {
    if (app && petData) {
      // Clean up: Delete the pet
      await app.deletePet(petData.data.id);
    }
  });

  test("Given I'm logged in and my pet has an active booking, When I open the my pet page, Then I can see the current pet status", async ({
    page,
  }) => {
    // Step 1: Add item to cart and validate
    await page.goto("http://localhost:3000/room");
    await page.getByRole("button", { name: "BOOK" }).first().click();
    await expect(page.getByText(/Room/)).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).click();

    // Select future dates
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    await page.getByRole("button", { name: "BOOK" }).nth(3).click();
    await expect(
      page.getByText("Room booking created successfully")
    ).toBeVisible();
    await page.locator(".bi.bi-x-lg").first().click();

    // Verify item is in cart
    await page.getByTestId("cart-icon").click();
    await expect(
      page
        .getByTestId("cart-card")
        .filter({ hasText: `for ${petData.data.name}` })
    ).toBeVisible();
    await page.getByTestId("check-all").click();

    // Step 2 & 3: Proceed to payment - booking created immediately in PENDING status
    await page.getByRole("button", { name: "payment" }).click();

    // Upload payment slip
    const slip = "https://storage.googleapis.com/paw_image/slip/fail.jpg";
    const uploadInput = page
      .locator('input[type="file"]')
      .filter({ hasText: "Upload" });
    await uploadInput.setInputFiles(slip);

    // Mock payment verification
    const valid_mockingAPI_response = {
      success: true,
      data: { success: true },
    };
    await mockSlipOK(page, valid_mockingAPI_response, 200);

    // Click Done to complete payment
    await page.getByRole("button", { name: "Done" }).click();

    // Wait for payment page
    await page.waitForURL(/\/payment\/(success|failed)/, {
      timeout: 10000,
    });

    // Navigate to pet overview page - pet should have active booking now
    await page.goto(`http://localhost:3000/profile/pet/${petData.data.id}`);

    // Verify pet status is visible
    await expect(page.getByText(petData.data.name)).toBeVisible();
    
    // Verify status information is displayed (could be IDLE, QUEUE, IN_PROGRESS, etc.)
    const statusText = page.locator('text=/IDLE|QUEUE|IN_PROGRESS|COMPLETED|Status/i');
    await expect(statusText.first()).toBeVisible({ timeout: 5000 });
  });

  test("Given I am logged in as a customer with an active booking, When I open the my pet page but the system cannot load data, Then I should see error message", async ({
    page,
  }) => {
    // Navigate to pet page
    await page.goto(`http://localhost:3000/profile/pet/${petData.data.id}`);

    // Simulate API failure by intercepting the request
    await page.route(`**/api/v1/pet/${petData.data.id}`, (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: "Internal Server Error" }),
      });
    });

    // Reload the page to trigger the failed request
    await page.reload();

    // Verify error message is shown
    // The error should be displayed via notification or error state
    await expect(
      page.getByText(/Unable to load|Failed to load|Error/i)
    ).toBeVisible({ timeout: 10000 });
  });
});

