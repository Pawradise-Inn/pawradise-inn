// mockSlipOK.js
// Mock SlipOK API response so axios in your frontend gets fake data

/**
 * @param {import('@playwright/test').Page} page
 */
async function mockSlipOK(page, fakeResponse, status) {
  // Match the API your hook calls
  await page.route("**/api.slipok.com/api/line/apikey/**", async (route) => {
    await route.fulfill({
      status: status,
      contentType: "application/json",
      body: JSON.stringify(fakeResponse),
    });
  });
}

export { mockSlipOK };