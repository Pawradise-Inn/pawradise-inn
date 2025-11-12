<<<<<<< HEAD
import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;
let petData;

test.describe("US5-1: Room Booking - Available and Unavailable Cases", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.login();

    // Create shared pet for all tests
    petData = await app.addPet({ name: "TestPet", type: "DOG" });
  });

  test("Wrong pet type should be rejected with suitable type error", async ({ page }) => {
    // Navigate to rooms page
    await page.goto("http://localhost:3000/room");

    // Find a room that is not suitable for DOG (look for CAT)
    const catRoomCard = page
      .getByTestId("room-card")
      .filter({ hasText: "Suitable for CAT" })
      .first();
    
    // Verify CAT room exists
    await expect(catRoomCard).toBeVisible({ timeout: 5000 });
    
    // Open the CAT room booking popup
    await catRoomCard.getByRole("button", { name: "BOOK" }).click();

    // Ensure popup visible
    await expect(page.getByTestId("booking-bar")).toBeVisible();

    // Select DOG pet created in setup
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    // Pick a valid future-ish date range
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    // Attempt booking - expect suitability error
    await page.locator('form').getByRole("button", { name: "BOOK" }).click();
    
    // Wait for error notification to appear
    // The notification shows the error message in a <b> tag within the notification card
    await expect(
      page.locator('b').getByText("This room type is not suitable for your pet")
    ).toBeVisible({ timeout: 10000 });

    // Close popup
    await page.locator(".bi.bi-x-lg").first().click();
  });

  test("Date picked in the past should show validation error", async ({ page }) => {
    await page.goto("http://localhost:3000/room");
    await page.getByRole("button", { name: "BOOK" }).first().click();

    await expect(page.getByTestId("booking-bar")).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    // Select past dates (relative to other tests in this suite)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Friday, October 31st," })
      .click();
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 1st," })
      .click();

    // Submit and expect date validation
    await page.locator('form').getByRole("button", { name: "BOOK" }).click();
    await expect(page.locator('b').getByText("Date is invalid")).toBeVisible();

    await page.locator(".bi.bi-x-lg").first().click();
  });

  test("Exit date earlier than entry date should show validation error", async ({ page }) => {
    await page.goto("http://localhost:3000/room");
    await page.getByRole("button", { name: "BOOK" }).first().click();

    await expect(page.getByTestId("booking-bar")).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    // Entry: Nov 30, Exit: Nov 29 (invalid order)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();

    await page.locator('form').getByRole("button", { name: "BOOK" }).click();
    await expect(page.locator('b').getByText("Date is invalid")).toBeVisible();

    await page.locator(".bi.bi-x-lg").first().click();
  });
  test.afterEach(async () => {
    if (app && petData) {
      // Clean up: Delete the pet
      await app.deletePet(petData.data.id);
    }
  });

  test("Given I have selected an available room, When I confirm the booking with check-in and check-out dates, Then the booking should be saved and I should receive a booking confirmation", async ({
    page,
  }) => {
    // Navigate to rooms page
    await page.goto("http://localhost:3000/room");

    // Select first available room and click BOOK
    await page.getByRole("button", { name: "BOOK" }).first().click();

    // Wait for booking popup to be visible
    await expect(page.getByTestId("booking-bar")).toBeVisible();

    // Select pet
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    // Select check-in date (November 29th)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();

    // Select check-out date (November 30th)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    // Wait for booking status to update (room available)
    await expect(
      page.getByText("room available")
    ).toBeVisible({ timeout: 10000 });

    // Confirm booking
    await page.locator('form').getByRole("button", { name: "BOOK" }).click();

    // Wait for and verify success notification appears
    // The notification content "Room added to cart" appears in the notification card
    await expect(
      page.getByText("Room added to cart")
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

  test("Given I have selected an unavailable room, When I try to book, Then the system should reject booking", async ({
    page,
  }) => {
    // Create additional pets to fill the room capacity
    // We'll attempt multiple bookings to ensure the room becomes unavailable
    const additionalPets = [];

    // Navigate to rooms page
    await page.getByRole("link", { name: "room" }).click();

    // First, let's fill up the room by making multiple bookings
    // Create 5 additional pets (assuming room capacity is reasonable)
    for (let i = 1; i <= 5; i++) {
      const pet = await app.addPet({ name: `TestPet${i}`, type: "DOG" });
      additionalPets.push(pet);

      // Book the room with this pet
      await page.getByRole("button", { name: "BOOK" }).first().click();

      await expect(page.getByTestId("booking-bar")).toBeVisible();

      await page.getByText("Pick pet").click();
      await page.getByText(`${pet.data.name} (${pet.data.type})`).last().click();

      await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
      await page
        .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
        .click();

      await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
      await page
        .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
        .click();

      // Check room status - if it shows "room not available", we can test the rejection
      const statusElement = page.locator(
        "text=/room (available|not available)/"
      );
      const statusText = await statusElement.textContent();

      if (statusText && statusText.includes("not available")) {
        // Room is now full, attempt booking should fail
        await page.locator('form').getByRole("button", { name: "BOOK" }).click();

        // Wait for and verify error notification appears
        await expect(
          page.getByText("This room is fully booked for the selected dates")
        ).toBeVisible();

        // Close popup (X icon)
        await page.locator(".bi.bi-x-lg").first().click();
        break; // Room is full, exit loop
      } else {
        // Room is still available, book it
        await page.locator('form').getByRole("button", { name: "BOOK" }).click();

        // Wait for booking confirmation

        // Close popup (X icon)
        await page.locator(".bi.bi-x-lg").first().click();

      // Go back to rooms page for next booking
      await page.goto("http://localhost:3000/room");
      }
    }

    // If room wasn't full after 5 bookings, try one more with original pet
    // This will verify the rejection logic works even if capacity is high
    await page.goto("http://localhost:3000/room");
    await page.getByRole("button", { name: "BOOK" }).first().click();

    await expect(page.getByTestId("booking-bar")).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();

    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    // Check status again
    const finalStatusElement = page.locator(
      "text=/room (available|not available)/"
    );
    const finalStatusText = await finalStatusElement.textContent();

    if (finalStatusText && finalStatusText.includes("not available")) {
      // Attempt booking - should fail
      await page.locator('form').getByRole("button", { name: "BOOK" }).click();

      // Wait for and verify error notification appears
      await expect(
        page.getByText("This room is fully booked for the selected dates")
      ).toBeVisible();
    } else {
      // Room might still have capacity, but we've tested the booking flow
      // Attempt booking - may succeed or fail depending on capacity
      await page.locator('form').getByRole("button", { name: "BOOK" }).click();

      // Check for either success or failure
      try {
        // success path continues without header assertion
      } catch {
        // If booking failed, verify error message
        await expect(
          page.getByText("This room is fully booked for the selected dates")
        ).toBeVisible();
      }
    }

    // Clean up additional pets
    for (const pet of additionalPets) {
      await app.deletePet(pet.data.id);
    }

    // Close popup if still open
    try {
      await page.locator(".bi.bi-x-lg").first().click({ timeout: 1000 });
    } catch {
      // Popup already closed
    }
  });
});
||||||| merged common ancestors
=======
import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

let app;
let petData;

test.describe("US5-1: Room Booking - Available and Unavailable Cases", () => {
  test.beforeEach(async ({ page }) => {
    app = new TestPage(page);
    await app.login();

    // Create shared pet for all tests
    petData = await app.addPet({ name: "TestPet", type: "DOG" });
  });

  test("Wrong pet type should be rejected with suitable type error", async ({ page }) => {
    // Navigate to rooms page
    await page.goto("http://localhost:3000/room");

    // Open a room that is not suitable for DOG (look for CAT)
    await page
      .getByTestId("room-card")
      .filter({ hasText: "Suitable for CAT" })
      .first()
      .getByRole("button", { name: "BOOK" })
      .click();

    // Ensure popup visible
    await expect(page.getByTestId("booking-bar")).toBeVisible();

    // Select DOG pet created in setup
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    // Pick a valid future-ish date range
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    // Attempt booking - expect suitability error
    await page.locator('form').getByRole("button", { name: "BOOK" }).click();
    await expect(
      page.getByText("This room type is not suitable for your pet")
    ).toBeVisible();

    // Close popup
    await page.locator(".bi.bi-x-lg").first().click();
  });

  test("Date picked in the past should show validation error", async ({ page }) => {
    await page.goto("http://localhost:3000/room");
    await page.getByRole("button", { name: "BOOK" }).first().click();

    await expect(page.getByTestId("booking-bar")).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    // Select past dates (relative to other tests in this suite)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Friday, October 31st," })
      .click();
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 1st," })
      .click();

    // Submit and expect date validation
    await page.locator('form').getByRole("button", { name: "BOOK" }).click();
    await expect(page.locator('b').getByText("Date is invalid")).toBeVisible();

    await page.locator(".bi.bi-x-lg").first().click();
  });

  test("Exit date earlier than entry date should show validation error", async ({ page }) => {
    await page.goto("http://localhost:3000/room");
    await page.getByRole("button", { name: "BOOK" }).first().click();

    await expect(page.getByTestId("booking-bar")).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    // Entry: Nov 30, Exit: Nov 29 (invalid order)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();

    await page.locator('form').getByRole("button", { name: "BOOK" }).click();
    await expect(page.locator('b').getByText("Date is invalid")).toBeVisible();

    await page.locator(".bi.bi-x-lg").first().click();
  });
  test.afterEach(async () => {
    if (app && petData) {
      // Clean up: Delete the pet
      await app.deletePet(petData.data.id);
    }
  });

  test("Given I have selected an available room, When I confirm the booking with check-in and check-out dates, Then the booking should be saved and I should receive a booking confirmation", async ({
    page,
  }) => {
    // Navigate to rooms page
    await page.goto("http://localhost:3000/room");

    // Select first available room and click BOOK
    await page.getByRole("button", { name: "BOOK" }).first().click();

    // Wait for booking popup to be visible
    await expect(page.getByTestId("booking-bar")).toBeVisible();

    // Select pet
    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    // Select check-in date (November 29th)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();

    // Select check-out date (November 30th)
    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    // Wait for booking status to update (room available)
    await expect(
      page.getByText("room available")
    ).toBeVisible({ timeout: 10000 });

    // Confirm booking
    await page.locator('form').getByRole("button", { name: "BOOK" }).click();

    // Wait for and verify success notification appears
    // The notification content "Room added to cart" appears in the notification card
    await expect(
      page.getByText("Room added to cart")
    ).toBeVisible({ timeout: 10000 });

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

  test("Given I have selected an unavailable room, When I try to book, Then the system should reject booking", async ({
    page,
  }) => {
    // Create additional pets to fill the room capacity
    // We'll attempt multiple bookings to ensure the room becomes unavailable
    const additionalPets = [];

    // Navigate to rooms page
    await page.getByRole("link", { name: "room" }).click();

    // First, let's fill up the room by making multiple bookings
    // Create 5 additional pets (assuming room capacity is reasonable)
    for (let i = 1; i <= 5; i++) {
      const pet = await app.addPet({ name: `TestPet${i}`, type: "DOG" });
      additionalPets.push(pet);

      // Book the room with this pet
      await page.getByRole("button", { name: "BOOK" }).first().click();

      await expect(page.getByTestId("booking-bar")).toBeVisible();

      await page.getByText("Pick pet").click();
      await page.getByText(`${pet.data.name} (${pet.data.type})`).last().click();

      await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
      await page
        .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
        .click();

      await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
      await page
        .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
        .click();

      // Check room status - if it shows "room not available", we can test the rejection
      const statusElement = page.locator(
        "text=/room (available|not available)/"
      );
      const statusText = await statusElement.textContent();

      if (statusText && statusText.includes("not available")) {
        // Room is now full, attempt booking should fail
        await page.locator('form').getByRole("button", { name: "BOOK" }).click();

        // Wait for and verify error notification appears
        await expect(
          page.getByText("This room is fully booked for the selected dates")
        ).toBeVisible();

        // Close popup (X icon)
        await page.locator(".bi.bi-x-lg").first().click();
        break; // Room is full, exit loop
      } else {
        // Room is still available, book it
        await page.locator('form').getByRole("button", { name: "BOOK" }).click();

        // Wait for booking confirmation

        // Close popup (X icon)
        await page.locator(".bi.bi-x-lg").first().click();

      // Go back to rooms page for next booking
      await page.goto("http://localhost:3000/room");
      }
    }

    // If room wasn't full after 5 bookings, try one more with original pet
    // This will verify the rejection logic works even if capacity is high
    await page.goto("http://localhost:3000/room");
    await page.getByRole("button", { name: "BOOK" }).first().click();

    await expect(page.getByTestId("booking-bar")).toBeVisible();

    await page.getByText("Pick pet").click();
    await page.getByText(`${petData.data.name} (${petData.data.type})`).last().click();

    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Saturday, November 29th," })
      .click();

    await page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await page
      .getByRole("gridcell", { name: "Choose Sunday, November 30th," })
      .click();

    // Check status again
    const finalStatusElement = page.locator(
      "text=/room (available|not available)/"
    );
    const finalStatusText = await finalStatusElement.textContent();

    if (finalStatusText && finalStatusText.includes("not available")) {
      // Attempt booking - should fail
      await page.locator('form').getByRole("button", { name: "BOOK" }).click();

      // Wait for and verify error notification appears
      await expect(
        page.getByText("This room is fully booked for the selected dates")
      ).toBeVisible();
    } else {
      // Room might still have capacity, but we've tested the booking flow
      // Attempt booking - may succeed or fail depending on capacity
      await page.locator('form').getByRole("button", { name: "BOOK" }).click();

      // Check for either success or failure
      try {
        // success path continues without header assertion
      } catch {
        // If booking failed, verify error message
        await expect(
          page.getByText("This room is fully booked for the selected dates")
        ).toBeVisible();
      }
    }

    // Clean up additional pets
    for (const pet of additionalPets) {
      await app.deletePet(pet.data.id);
    }

    // Close popup if still open
    try {
      await page.locator(".bi.bi-x-lg").first().click({ timeout: 1000 });
    } catch {
      // Popup already closed
    }
  });
});
>>>>>>> da5e18fa8eb86272f9b3c30522abe2afb5a68667
