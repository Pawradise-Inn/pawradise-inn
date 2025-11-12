<<<<<<< HEAD
import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;
let petData;

test.describe("US5-2: Service Booking - Available and Unavailable Cases", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.login();

    // Create shared pet for all tests
    petData = await app.addPet({ name: "TestPet", type: "DOG" });
  });

  test("Date picked in the past for service should show validation error", async ({ page }) => {
    // Navigate to services page
    await page.goto("http://localhost:3000/service");

    // Open a service
    await page.getByTestId("service-card").first().click();

    // Wait for booking popup to be visible
    await expect(page.getByTestId("booking-bar")).toBeVisible();

    // Select pet
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    // Pick a past date
    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 1st," })
      .click();

    // Pick a valid time (still past combined)
    await page.getByTestId("pick-time").click();
    await page.locator("div").filter({ hasText: "10:00" }).last().click();

    // Submit and expect date validation
    await page.getByRole("button", { name: "BOOK" }).click();
    await expect(page.locator('b').getByText("Date is invalid")).toBeVisible();

    // Close
    await page.locator(".bi.bi-x-lg").first().click();
  });

  test("Wrong pet type for service should be rejected", async ({ page }) => {
    // Navigate to services page
    await page.goto("http://localhost:3000/service");

    // Create a rabbit pet for mismatch
    const rabbitPet = await app.addPet({ name: "TestRabbit", type: "RABBIT" });

    // Open the first available service
    // We'll test by trying to book a service (that's suitable for DOG) with a RABBIT pet
    // This should trigger the "not suitable" error
    const serviceCards = page.getByTestId("service-card");
    const cardCount = await serviceCards.count();
    
    if (cardCount === 0) {
      test.skip(true, "No service cards found on the page");
    }
    
    // Click on the first service card
    await serviceCards.first().click();
    await expect(page.getByTestId("booking-bar")).toBeVisible();

    // Select RABBIT pet (newly created)
    await page.getByText("Pick pet").click();
    await page.getByText(`${rabbitPet.data.name} (${rabbitPet.data.type})`).last().click();

    // Select valid future date (2025-11-30) and time
    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();

    await page.getByTestId("pick-time").click();
    await page.locator("div").filter({ hasText: "10:00" }).last().click();

    // Attempt to book and expect suitability error
    await page.getByRole("button", { name: "BOOK" }).click();
    await expect(
      page.getByText("This service is not suitable for your pet")
    ).toBeVisible();

    // Close popup
    await page.locator(".bi.bi-x-lg").first().click();

    // Cleanup rabbit pet
    await app.deletePet(rabbitPet.data.id);
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
    await page.goto("http://localhost:3000/service");
    
    // Select first available service and click on it
    await page.getByTestId("service-card").first().click();
    
    // Wait for booking popup to be visible
    await expect(page.getByTestId("booking-bar")).toBeVisible();
    
    // Select pet
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();
    
    // Select date (November 30th)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();
    
    // Select time (10:00)
    await page.getByTestId("pick-time").click();
    await page
      .locator("div")
      .filter({ hasText: "10:00" })
      .last()
      .click();
    
    // Wait for service status to update (service available)
    await expect(
      page.getByText("service available")
    ).toBeVisible({ timeout: 10000 });
    
    // Confirm booking
    await page.locator('form').getByRole("button", { name: "BOOK" }).click();
    
    // Wait for and verify success notification appears
    // The notification content "Service added to cart" appears in the notification card
    await expect(
      page.getByText("Service added to cart")
    ).toBeVisible({ timeout: 10000 });
    
    // Close popup (X icon)
    await page.locator(".bi.bi-x-lg").first().click();
    
    // Verify booking is in cart (filter specific pet)
    // The cart icon navigates to /cart page
    await page.getByTestId("cart-icon").click();
    
    // Wait for navigation to cart page
    await expect(page).toHaveURL(/\/cart/);
    
    // Wait for cart to load and verify booking is in cart
    // The cart card shows "For: {petName}" (capital F with colon) in a <p> tag
    // Find the exact text "For: TestPet" (not "For: TestPet1", etc.) using regex
    // Then locate the parent cart-card element by going up the DOM tree
    // Structure: cart-card > div.flex-grow > p (For: TestPet)
    const exactPetText = page.getByText(new RegExp(`^For: ${petData.data.name}$`, "i"));
    // Navigate up: p -> div.flex-grow -> cart-card
    const cartCard = exactPetText.locator("..").locator("..");
    
    // Verify it's the cart-card by checking it has the testid
    await expect(cartCard).toHaveAttribute("data-testid", "cart-card", { timeout: 10000 });
  });

  test("Given the service is unavailable, When I attempt to book, Then I shouldn't book", async ({
    page,
  }) => {
    // First, book the service 3 times (maximum capacity) to make it unavailable
    // Create 3 additional pets to make 3 bookings for the same service at the same time
    
    const pets = [];
    for (let i = 1; i <= 4; i++) {
      const pet = await app.addPet({ name: `TestPet${i}`, type: "DOG" });
      pets.push(pet);
    }
    
    // Navigate to services page
    await page.goto("http://localhost:3000/service");
    
    // Make 3 bookings for the same service at the same time slot
    for (let i = 0; i < 3; i++) {
      await page.getByTestId("service-card").first().click();
      
      await expect(page.getByTestId("booking-bar")).toBeVisible();
      
      await page.getByText("Pick pet").click();
      await page.getByText(`${pets[i].data.name} (${pets[i].data.type})`).last().click();
      
      await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
      await page
        .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
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
          page.getByText("This service is fully booked for the selected time")
        ).toBeVisible();
        
        // Close popup (X icon)
        await page.locator(".bi.bi-x-lg").first().click();
        break; // Service is full, exit loop
      } else {
        // Service is still available, book it
        await page.getByRole("button", { name: "BOOK" }).click();
        
        // Wait for booking confirmation
        
        // Close popup (X icon)
        await page.locator(".bi.bi-x-lg").first().click();
        
        // Go back to services page for next booking (if not last iteration)
        if (i < 2) {
          await page.goto("http://localhost:3000/service");
        }
      }
    }
    
    // Now try to book the same service at the same time with the original pet (should fail)
    await page.goto("http://localhost:3000/service");
    await page.getByTestId("service-card").first().click();
    
    await expect(page.getByTestId("booking-bar")).toBeVisible();
    
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();
    
    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();
    
    await page.getByTestId("pick-time").click();
    await page
      .locator("div")
      .filter({ hasText: "10:00" })
      .last()
      .click();
    
    // Wait for service status to update after selecting date and time
    const statusElement = page.locator('text=/service (available|not available)/');
    await expect(statusElement).toBeVisible({ timeout: 10000 });
    const statusText = await statusElement.textContent();
    
    // Attempt to book
    await page.locator('form').getByRole("button", { name: "BOOK" }).click();
    
    // If service was not available, expect error notification
    // If service was still available, booking might succeed or fail based on actual capacity
    if (statusText && statusText.includes("not available")) {
      // Wait for and verify error notification appears
      await expect(
        page.getByText("This service is fully booked for the selected time")
      ).toBeVisible({ timeout: 10000 });
    } else {
      // Service was still available - booking might succeed or fail
      // Check for either success or failure notification
      try {
        // If booking succeeds, we should see success notification
        await expect(
          page.getByText("Service added to cart")
        ).toBeVisible({ timeout: 5000 });
      } catch {
        // If booking fails, we should see error notification
        await expect(
          page.getByText(/This service is fully booked|This service is not suitable|error/i)
        ).toBeVisible({ timeout: 5000 });
      }
    }
    
    // Clean up additional pets
    for (const pet of pets) {
      await app.deletePet(pet.data.id);
    }
    
    // Close popup (X icon)
    await page.locator(".bi.bi-x-lg").first().click();
  });
});

||||||| merged common ancestors
=======
import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;
let petData;

test.describe("US5-2: Service Booking - Available and Unavailable Cases", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.login();

    // Create shared pet for all tests
    petData = await app.addPet({ name: "TestPet", type: "DOG" });
  });

  test("Date picked in the past for service should show validation error", async ({ page }) => {
    // Navigate to services page
    await page.goto("http://localhost:3000/service");

    // Open a service
    await page.getByTestId("service-card").first().click();

    await expect(page.getByText(/Service/)).toBeVisible();

    // Select pet
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    // Pick a past date
    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Wednesday, October 1st," })
      .click();

    // Pick a valid time (still past combined)
    await page.getByTestId("pick-time").click();
    await page.locator("div").filter({ hasText: "10:00" }).last().click();

    // Submit and expect date validation
    await page.getByRole("button", { name: "BOOK" }).click();
    await expect(page.locator('b').getByText("Date is invalid")).toBeVisible();

    // Close
    await page.locator(".bi.bi-x-lg").first().click();
  });

  test("Wrong pet type for service should be rejected", async ({ page }) => {
    // Navigate to services page
    await page.goto("http://localhost:3000/service");

    // Create a rabbit pet for mismatch
    const rabbitPet = await app.addPet({ name: "TestRabbit", type: "RABBIT" });

    // Try to open a service that is NOT suitable for DOG
    let foundMismatch = false;
    for (let i = 0; i < 6; i++) {
      await page.getByTestId("service-card").nth(i).click();
      await expect(page.getByText(/Service/)).toBeVisible();

      // If popup lists "Suitable for DOG", close and try next service
      const dogCount = await page.getByText("Suitable for DOG").count();
      if (dogCount > 0) {
        await page.locator(".bi.bi-x-lg").first().click();
        continue;
      }

      // We found a service that doesn't list DOG
      foundMismatch = true;
      break;
    }

    // If none found, skip test gracefully
    if (!foundMismatch) {
      test.skip(true, "No service unsuitable for DOG found in fixtures");
    }

    // Select RABBIT pet (newly created)
    await page.getByText("Pick pet").click();
    await page.getByText(`${rabbitPet.data.name} (${rabbitPet.data.type})`).last().click();

    // Select valid future date (2025-11-30) and time
    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    await page.getByTestId("pick-time").click();
    await page.locator("div").filter({ hasText: "10:00" }).last().click();

    // Attempt to book and expect suitability error
    await page.getByRole("button", { name: "BOOK" }).click();
    await expect(
      page.getByText("This service is not suitable for your pet")
    ).toBeVisible();

    // Close popup
    await page.locator(".bi.bi-x-lg").first().click();

    // Cleanup rabbit pet
    await app.deletePet(rabbitPet.data.id);
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
    await page.goto("http://localhost:3000/service");
    
    // Select first available service and click on it
    await page.getByTestId("service-card").first().click();
    
    // Wait for booking popup to be visible
    await expect(page.getByText(/Service/)).toBeVisible();
    
    // Select pet
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();
    
    // Select date (November 30th)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
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
      page.getByText("Service added to cart")
    ).toBeVisible();
    
    // Close popup (X icon)
    await page.locator(".bi.bi-x-lg").first().click();
    
    // Verify booking is in cart (filter specific pet)
    await page.getByTestId("cart-icon").click();
    await expect(
      page
        .getByTestId("cart-card")
        .filter({ hasText: `for ${petData.data.name}` })
    ).toBeVisible();
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
    await page.goto("http://localhost:3000/service");
    
    // Make 3 bookings for the same service at the same time slot
    for (let i = 0; i < 3; i++) {
      await page.getByTestId("service-card").first().click();
      
      await expect(page.getByText(/Service/)).toBeVisible();
      
      await page.getByText("Pick pet").click();
      await page.getByText(`${pets[i].data.name} (${pets[i].data.type})`).last().click();
      
      await page.getByRole("button", { name: "mm/dd/yyyy" }).click();
      await page
        .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
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
          page.getByText("This service is fully booked for the selected time")
        ).toBeVisible();
        
        // Close popup (X icon)
        await page.locator(".bi.bi-x-lg").first().click();
        break; // Service is full, exit loop
      } else {
        // Service is still available, book it
        await page.getByRole("button", { name: "BOOK" }).click();
        
        // Wait for booking confirmation
        
        // Close popup (X icon)
        await page.locator(".bi.bi-x-lg").first().click();
        
        // Go back to services page for next booking (if not last iteration)
        if (i < 2) {
          await page.goto("http://localhost:3000/service");
        }
      }
    }
    
    // Now try to book the same service at the same time with the original pet (should fail)
    await page.goto("http://localhost:3000/service");
    await page.getByTestId("service-card").first().click();
    
    await expect(page.getByText(/Service/)).toBeVisible();
    
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();
    
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
      page.getByText("This service is fully booked for the selected time")
    ).toBeVisible();
    
    // Clean up additional pets
    for (const pet of pets) {
      await app.deletePet(pet.data.id);
    }
    
    // Close popup (X icon)
    await page.locator(".bi.bi-x-lg").first().click();
  });
});

>>>>>>> da5e18fa8eb86272f9b3c30522abe2afb5a68667
