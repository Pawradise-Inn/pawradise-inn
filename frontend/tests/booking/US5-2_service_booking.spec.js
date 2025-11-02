import { test, expect } from "@playwright/test";
import TestPage from "../payment/TestPage";

let app;
let petData;

test.describe("US5-2: Service Booking - Available and Unavailable Cases", () => {
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

  test("Given I have selected an available service, When I confirm the booking with a date I want my pet to have a service, Then the booking should be saved and I should receive a booking confirmation", async ({
    page,
  }) => {
    // Navigate to services page
    await page.getByRole("link", { name: "service" }).click();
    
    // Select first available service and click on it
    await page.getByTestId("service-card").first().click();
    
    // Wait for booking popup to be visible
    await expect(
      page.getByRole("heading", { name: /Service/ })
    ).toBeVisible();
    
    // Select pet
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).click();
    
    // Select date (November 30th)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 30th," })
      .click();
    
    // Select time (10:00)
    await page.getByTestId("pick-time").click();
    await page
      .locator("div")
      .filter({ hasText: "10:00" })
      .last()
      .click();
    
    // Confirm booking
    await page.getByRole("button", { name: "BOOK" }).click();
    
    // Wait for and verify success notification appears
    await expect(
      page.getByText("Booking Confirmed")
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText("Service booking created successfully")
    ).toBeVisible();
    
    // Close popup
    await page.getByRole("button", { name: "Close" }).click();
    await page.locator(".bi.bi-x-lg").first().click();
    
    // Verify booking is in cart
    await page.getByTestId("cart-icon").click();
    await expect(page.getByTestId("cart-card")).toBeVisible();
  });

  test("Given the service is unavailable, When I attempt to book, Then I shouldn't book", async ({
    page,
  }) => {
    // First, book the service 3 times (maximum capacity) to make it unavailable
    // Create 3 additional pets to make 3 bookings for the same service at the same time
    
    const pets = [];
    for (let i = 1; i <= 3; i++) {
      const pet = await app.addPet({ name: `TestPet${i}`, type: "DOG" });
      pets.push(pet);
    }
    
    // Navigate to services page
    await page.getByRole("link", { name: "service" }).click();
    
    // Make 3 bookings for the same service at the same time slot
    for (let i = 0; i < 3; i++) {
      await page.getByTestId("service-card").first().click();
      
      await expect(
        page.getByRole("heading", { name: /Service/ })
      ).toBeVisible();
      
      await page.getByText("Pick pet").click();
      await page.getByText(`${pets[i].data.name} (${pets[i].data.type})`).click();
      
      await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
      await page
        .getByRole("gridcell", { name: "Choose Saturday, November 30th," })
        .click();
      
      await page.getByTestId("pick-time").click();
      await page
        .locator("div")
        .filter({ hasText: "10:00" })
        .last()
        .click();
      
      // Check if service is still available before booking
      const statusElement = page.locator('text=/service (available|not available)/');
      const statusText = await statusElement.textContent();
      
      if (statusText && statusText.includes("not available")) {
        // Service is now full, attempt booking should fail
        await page.getByRole("button", { name: "BOOK" }).click();
        
        // Wait for and verify error notification appears
        await expect(
          page.getByText("Operation Not Allowed")
        ).toBeVisible({ timeout: 10000 });
        await expect(
          page.getByText("This service is fully booked for the selected time")
        ).toBeVisible();
        
        // Close popup
        await page.getByRole("button", { name: "Close" }).click();
        await page.locator(".bi.bi-x-lg").first().click();
        break; // Service is full, exit loop
      } else {
        // Service is still available, book it
        await page.getByRole("button", { name: "BOOK" }).click();
        
        // Wait for booking confirmation
        await expect(
          page.getByText("Booking Confirmed")
        ).toBeVisible({ timeout: 10000 });
        
        // Close popup
        await page.getByRole("button", { name: "Close" }).click();
        await page.locator(".bi.bi-x-lg").first().click();
        
        // Go back to services page for next booking (if not last iteration)
        if (i < 2) {
          await page.getByRole("link", { name: "service" }).click();
        }
      }
    }
    
    // Now try to book the same service at the same time with the original pet (should fail)
    await page.getByRole("link", { name: "service" }).click();
    await page.getByTestId("service-card").first().click();
    
    await expect(
      page.getByRole("heading", { name: /Service/ })
    ).toBeVisible();
    
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).click();
    
    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Wednesday, October 1st," })
      .click();
    
    await page.getByTestId("pick-time").click();
    await page
      .locator("div")
      .filter({ hasText: "10:00" })
      .last()
      .click();
    
    // Check if service status shows as unavailable before booking
    await expect(
      page.getByText("service not available")
    ).toBeVisible();
    
    // Attempt to book
    await page.getByRole("button", { name: "BOOK" }).click();
    
    // Wait for and verify error notification appears
    await expect(
      page.getByText("Operation Not Allowed")
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText("This service is fully booked for the selected time")
    ).toBeVisible();
    
    // Clean up additional pets
    for (const pet of pets) {
      await app.deletePet(pet.data.id);
    }
    
    // Close popup
    await page.getByRole("button", { name: "Close" }).click();
    await page.locator(".bi.bi-x-lg").first().click();
  });
});

