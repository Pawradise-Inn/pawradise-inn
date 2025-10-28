const frontendURL = "http://localhost:3000";

//  always add user: test1234 and password: 1234 in testing space
//  always add user: test1234 and password: 1234 in testing space
//  always add user: test1234 and password: 1234 in testing space
//  always add user: test1234 and password: 1234 in testing space
//  always add user: test1234 and password: 1234 in testing space

export class TestPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async login() {
    await this.page.goto(`${frontendURL}/login`);
    await this.page
      .getByRole("textbox", { name: "Username (For Login)" })
      .fill("test1234");
    await this.page.getByRole("textbox", { name: "Password" }).fill("1234");
    await this.page.getByRole("button", { name: "Login" }).click();
  }
}

export default TestPage;
