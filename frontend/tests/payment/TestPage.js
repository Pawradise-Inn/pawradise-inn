import { formatDate } from "./Utils";

const frontendURL = "http://localhost:3000";

//  always add user: test1234 and password: 1234 in testing space
//  always add user: test1234 and password: 1234 in testing space
//  always add user: test1234 and password: 1234 in testing space
//  always add user: test1234 and password: 1234 in testing space
//  always add user: test1234 and password: 1234 in testing space

//  always add staff: poro and password: poro in testing space
//  always add staff: poro and password: poro in testing space
//  always add staff: poro and password: poro in testing space
//  always add staff: poro and password: poro in testing space
//  always add staff: poro and password: poro in testing space

//  always reset database if you test failed
//  always reset database if you test failed
//  always reset database if you test failed
//  always reset database if you test failed
//  always reset database if you test failed


export class TestPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.authToken = null;
  }

  async login() {
    await this.page.goto(`${frontendURL}/login`);
    await this.page
      .getByRole("textbox", { name: "Username (For Login)" })
      .fill("test1234");
    await this.page.getByRole("textbox", { name: "Password" }).fill("1234");
    await this.page.getByRole("button", { name: "Login" }).click();

    // Wait for navigation or token to be available
    await this.page.waitForURL(/\/room|\/profile|\/dashboard/, {
      timeout: 10000,
    });

    // Wait for token to be stored in localStorage
    await this.page.waitForFunction(
      () => localStorage.getItem("token") !== null,
      { timeout: 5000 }
    );

    // Store the token for API calls
    this.authToken = await this.page.evaluate(() =>
      localStorage.getItem("token")
    );
    console.log("Auth token:", this.authToken);
  }

  async loginStaff() {
    await this.page.goto(`${frontendURL}/login`);
    await this.page
      .getByRole("textbox", { name: "Username (For Login)" })
      .fill("poro");
    await this.page.getByRole("textbox", { name: "Password" }).fill("poro");
    await this.page.getByRole("button", { name: "Login" }).click();

    // Wait for navigation or token to be available
    await this.page.waitForURL(/\/room|\/profile|\/dashboard/, {
      timeout: 10000,
    });

    // Wait for token to be stored in localStorage
    await this.page.waitForFunction(
      () => localStorage.getItem("token") !== null,
      { timeout: 5000 }
    );

    // Store the token for API calls
    this.authToken = await this.page.evaluate(() =>
      localStorage.getItem("token")
    );
    console.log("Auth token:", this.authToken);
  }

  async getAuthToken() {
    if (!this.authToken) {
      // Wait for token to be available if not already stored
      await this.page.waitForFunction(
        () => localStorage.getItem("token") !== null,
        { timeout: 5000 }
      );
      this.authToken = await this.page.evaluate(() =>
        localStorage.getItem("token")
      );
    }

    if (!this.authToken) {
      throw new Error(
        "Authentication token not found. Make sure login() was called successfully."
      );
    }

    return this.authToken;
  }

  async addPet(pet) {
    const petData = {
      name: pet.name,
      sex: pet.sex || "MALE",
      age: pet.age || 1,
      type: pet.type,
      breed: pet.breed || "",
      disease: pet.medical || [],
      allergic: pet.allergy || [],
      picture: pet.picture || null,
    };

    const response = await this.page.request.post(
      "http://localhost:5000/api/v1/pet/register",
      {
        data: petData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await this.getAuthToken()}`,
        },
      }
    );

    if (!response.ok()) {
      throw new Error(`Failed to add pet: ${response.status()}`);
    } else {
      console.log(response);
    }

    return await response.json();
  }

  async deletePet(petId) {
    const response = await this.page.request.delete(
      `http://localhost:5000/api/v1/pet/${petId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await this.getAuthToken()}`,
        },
      }
    );

    if (!response.ok()) {
      throw new Error(`Failed to delete pet: ${response.status()}`);
    }

    return await response.json();
  }

  async createBookingRoom(
    pet,
    entryDate = "Choose Wednesday, October 1st,",
    exitDate = "Choose Thursday, October 2nd,"
  ) {
    await this.page.getByRole("link", { name: "room" }).click();
    await this.page.getByRole("button", { name: "BOOK" }).first().click();
    await this.page.getByText("Pick pet").click();
    await this.page.getByText(`${pet.name} (${pet.type})`).click();
    await this.page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await this.page.getByRole("gridcell", { name: entryDate }).click();
    await this.page.getByRole("button", { name: "mm/dd/yyyy" }).nth(2).click();
    await this.page.getByRole("gridcell", { name: exitDate }).click();
    await this.page.getByRole("button", { name: "BOOK" }).nth(3).click();
    await this.page.getByRole("button", { name: "Close" }).first().click();
    await this.page.getByRole("button", { name: "Close" }).click();
    await this.page.locator(".bi.bi-x-lg").first().click();

    const name = this.page.getByTestId("name");
    const price = this.page.getByText(/฿/);

    // Extract day, month, year from date strings for formatDate
    const entryParts = entryDate.replace("Choose ", "").split(" ");
    const exitParts = exitDate.replace("Choose ", "").split(" ");

    const entryDay = entryParts[2].replace(/[^\d]/g, "");
    const entryMonth = entryParts[1];
    const exitDay = exitParts[2].replace(/[^\d]/g, "");
    const exitMonth = exitParts[1];

    return {
      id: new Date(),
      name,
      price,
      pet,
      entryDate: formatDate(entryDay, entryMonth, new Date().getFullYear()),
      exitDate: formatDate(exitDay, exitMonth, new Date().getFullYear()),
    };
  }

  async createBookingService(
    pet,
    entryDate = "Choose Wednesday, October 1st,",
    entryTime = "10:00"
  ) {
    await this.page.getByRole("link", { name: "service" }).click();
    await this.page.getByTestId("service-card").first().click();
    await this.page.getByText("Pick pet").click();
    await this.page.getByText(`${pet.name} (${pet.type})`).click();
    await this.page.getByRole("button", { name: "mm/dd/yyyy" }).click();
    await this.page.getByRole("gridcell", { name: entryDate }).click();
    await this.page.getByTestId("pick-time").click();
    await this.page
      .locator("div")
      .filter({ hasText: entryTime })
      .last()
      .click();
    await this.page.getByRole("button", { name: "BOOK" }).click();
    await this.page.getByRole("button", { name: "Close" }).click();
    await this.page.locator(".bi.bi-x-lg").first().click();

    const name = this.page.getByTestId("name");
    const price = this.page.getByText(/฿/);

    // Extract day, month, year from date string for formatDate
    const entryParts = entryDate.replace("Choose ", "").split(" ");

    const entryDay = entryParts[2].replace(/[^\d]/g, "");
    const entryMonth = entryParts[1];

    return {
      id: new Date(),
      name,
      price,
      pet,
      entryDate: formatDate(entryDay, entryMonth, new Date().getFullYear()),
      entryTime,
    };
  }

  async createPayment(imageUrl) {
    await this.page.getByRole("link", { name: "room" }).click();
    await this.page.getByTestId("cart-icon").click();
    await this.page.getByTestId("check-all").click();
    await this.page.getByRole("button", { name: "payment" }).click();

    const uploadInput = this.page
      .locator('input[type="file"]')
      .filter({ hasText: "Upload" });

    // Upload first image
    const imagePath = imageUrl;
    await uploadInput.setInputFiles(imagePath);

    const doneBtn = this.page.getByRole("button", { name: "Done" });
    await doneBtn.click();
  }
}

export default TestPage;
