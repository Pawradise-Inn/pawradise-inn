import { test, expect } from "@playwright/test";
import TestPage from "../TestPage";

const paymentSuccessAPI = "...";
const paymentFailAPI = "...";

test.beforeEach(async ({ page }) => {
  const app = new TestPage(page);
  await app.login();

  await page.getByRole("link", { name: "profile" }).click();

  const navigator = page.getByRole("link").filter({ hasText: /^$/ }).nth(2);
  await navigator.click();
});

test("Sidebar behavior and path operate correctly", async ({ page }) => {
  // Locate nav link
  const navBarLink = page.getByTestId("navigatorNavbar");
  const sideBarLink = page.getByTestId("navigatorSidebar");

  // Check visibility and text
  await expect(navBarLink).toBeVisible();
  await expect(sideBarLink).toBeVisible();
  await expect(sideBarLink).toHaveText("Payment History");

  // Check background div
  const sideBarBg = sideBarLink
    .locator("xpath=..")
    .locator('div[class*="bg-[var(--dark-brown-color)]"]');
  await expect(sideBarBg).toBeVisible();
  await expect(page).toHaveURL("http://localhost:3000/profile/paymentHistory");
});

test("Payment card load correctly with successCard only", async ({
  page,
  request,
}) => {
  let totalPrice = 0;

  const response = await request.get(paymentSuccessAPI);
  expect(response.ok()).toBeTruthy();

  await page.route(paymentFailAPI, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    })
  );

  const successCard = page.getByTestId("paymentBlock-success");
  const failCard = page.getByTestId("paymentBlock-fail");

  await expect(successCard).toBeVisible();
  await expect(failCard).not.toBeVisible();

  await expect(successCard.getByText("Paid")).toBeVisible();

  const responseData = await response.json();
  for (const item of responseData) {
    await expect(successCard.getByText(item.name)).toBeVisible();
    await expect(successCard.getByText(`for ${item.pet_name}`)).toBeVisible();
    await expect(
      successCard.getByText(`$${item.price.toFixed(2)}`)
    ).toBeVisible();
    totalPrice += item.price;
  }

  await expect(
    successCard.getByText(`Total Price: $${totalPrice.toFixed(2)}`)
  ).toBeVisible();
});

test("Payment card load correctly with failCard only", async ({
  page,
  request,
}) => {
  let totalPrice = 0;

  const response = await request.get(paymentFailAPI);
  expect(response.ok()).toBeTruthy();

  await page.route(paymentSuccessAPI, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    })
  );

  const successCard = page.getByTestId("paymentBlock-success");
  const failCard = page.getByTestId("paymentBlock-fail");

  await expect(successCard).not.toBeVisible();
  await expect(failCard).toBeVisible();

  await expect(failCard.getByText("Failed")).toBeVisible();

  const responseData = await response.json();
  for (const item of responseData) {
    await expect(failCard.getByText(item.name)).toBeVisible();
    await expect(failCard.getByText(`for ${item.pet_name}`)).toBeVisible();
    await expect(failCard.getByText(`$${item.price.toFixed(2)}`)).toBeVisible();
    totalPrice += item.price;
  }

  await expect(
    failCard.getByText(`Total Price: $${totalPrice.toFixed(2)}`)
  ).toBeVisible();
});

test("Payment card load correctly with successCard and failCard", async ({
  page,
  request,
}) => {
  let successTotalPrice = 0;
  let failTotalPrice = 0;

  const response1 = await request.get(paymentSuccessAPI);
  expect(response1.ok()).toBeTruthy();

  const response2 = await request.get(paymentFailAPI);
  expect(response2.ok()).toBeTruthy();

  const successCard = page.getByTestId("paymentBlock-success");
  const failCard = page.getByTestId("paymentBlock-fail");

  await expect(successCard).toBeVisible();
  await expect(failCard).toBeVisible();

  await expect(successCard.getByText("Paid")).toBeVisible();
  await expect(failCard.getByText("Failed")).toBeVisible();

  const successData = await response1.json();
  for (const item of successData) {
    await expect(successCard.getByText(item.name)).toBeVisible();
    await expect(successCard.getByText(`for ${item.pet_name}`)).toBeVisible();
    await expect(
      successCard.getByText(`$${item.price.toFixed(2)}`)
    ).toBeVisible();
    successTotalPrice += item.price;
  }

  const failData = await response2.json();
  for (const item of failData) {
    await expect(failCard.getByText(item.name)).toBeVisible();
    await expect(failCard.getByText(`for ${item.pet_name}`)).toBeVisible();
    await expect(failCard.getByText(`$${item.price.toFixed(2)}`)).toBeVisible();
    failTotalPrice += item.price;
  }

  await expect(
    successCard.getByText(`Total Price: $${successTotalPrice.toFixed(2)}`)
  ).toBeVisible();
  await expect(
    failCard.getByText(`Total Price: $${failTotalPrice.toFixed(2)}`)
  ).toBeVisible();
});

test("Payment card load correctly without successCard and failCard", async ({
  page,
}) => {
  await page.route(paymentSuccessAPI, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    })
  );

  await page.route(paymentFailAPI, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    })
  );

  const successCard = page.getByTestId("paymentBlock-success");
  const failCard = page.getByTestId("paymentBlock-fail");

  await expect(successCard).not.toBeVisible();
  await expect(failCard).not.toBeVisible();
});
