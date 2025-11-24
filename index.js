const puppeteer = require("puppeteer");
const names = require("./names.json");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // 🔥 Add Instagram Cookies here
  await page.setCookie({
    name: "sessionid",
    value: "17843691127146670", // <-- Tumhara sessionId
    domain: ".instagram.com",
    path: "/",
    httpOnly: true,
    secure: true
  });

  await page.goto("https://www.instagram.com/");
  await page.waitForTimeout(4000);

  // Go to GC
  await page.goto("https://www.instagram.com/direct/t/1176649277224222/");
  await page.waitForTimeout(6000);

  for (const newName of names) {
    console.log("Changing name to:", newName);

    await page.waitForSelector("input[placeholder='Group Name']");
    await page.click("input[placeholder='Group Name']", { clickCount: 3 });
    await page.type("input[placeholder='Group Name']", newName);

    await page.waitForSelector("button[type='submit']");
    await page.click("button[type='submit']");

    await page.waitForTimeout(4000);
  }

  console.log("✔ All names applied!");
  await browser.close();
})();
