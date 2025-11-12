import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

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
    // Create booking using helper method
    await app.createBookingRoom(
      petData.data,
      "Choose Saturday, November 29th,",
      "Choose Sunday, November 30th,"
    );

    // Navigate to pet overview page to view pet status
    await page.goto(`http://localhost:3000/profile/pet/${petData.data.id}`);

    // Verify pet status is visible - use heading role to avoid strict mode violation
    await expect(page.getByRole("heading", { name: petData.data.name, exact: true })).toBeVisible();
    
    // Verify status information is displayed (could be IDLE, QUEUE, IN_PROGRESS, etc.)
    const statusText = page.locator('text=/IDLE|QUEUE|IN_PROGRESS|COMPLETED|Status/i');
    await expect(statusText.first()).toBeVisible({ timeout: 5000 });
  });

  test("Given I am logged in as a customer with an active booking, When I open the my pet page but the system cannot load data, Then I should see error message", async ({
    page,
  }) => {
    // Simulate API failure by intercepting the request BEFORE navigation
    await page.route(`**/api/v1/pets/${petData.data.id}`, (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          error: {
            type: "UNABLE_TO_LOAD",
            header: "Loading Failed",
            content: "Unable to load data. Please refresh and try again",
            statusCode: 500,
          },
        }),
      });
    });

    // Navigate to pet page - this will trigger the failed request
    await page.goto(`http://localhost:3000/profile/pet/${petData.data.id}`);

    // Verify error message is shown via notification
    // The axios interceptor will show a notification with the error header and content
    await expect(
      page.getByText(/Loading Failed|Unable to load data/i)
    ).toBeVisible({ timeout: 10000 });
  });
});

