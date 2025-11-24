const puppeteer = require("puppeteer");
const names = require("./names.json");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Cookie Login
  await page.setCookie({
    name: "sessionid",
    value: "17843691127146670",
    domain: ".instagram.com",
    path: "/",
    httpOnly: true,
    secure: true
  });

  await page.goto("https://www.instagram.com/");
  await new Promise(r => setTimeout(r, 6000));

  // GC Page
  await page.goto("https://www.instagram.com/direct/t/1176649277224222/");
  await new Promise(r => setTimeout(r, 8000));

  for (const newName of names) {

    console.log("Changing name to:", newName);

    // Open GC Info
    await page.waitForSelector("svg[aria-label='Conversation information']");
    await page.click("svg[aria-label='Conversation information']");
    await new Promise(r => setTimeout(r, 5000));

    // Click rename
    await page.waitForSelector("div[role='button']:has(span:contains('Name'))");
    await page.click("div[role='button']:has(span:contains('Name'))");
    await new Promise(r => setTimeout(r, 4000));

    // Find input field
    const inputSelector = "input[type='text']";
    await page.waitForSelector(inputSelector);
    await page.click(inputSelector, { clickCount: 3 });
    await page.type(inputSelector, newName);

    // Save
    await page.waitForSelector("div[role='button']:has(span:contains('Done'))");
    await page.click("div[role='button']:has(span:contains('Done'))");

    await new Promise(r => setTimeout(r, 5000));
  }

  console.log("✔ Name rotation completed!");
  await browser.close();
})();
