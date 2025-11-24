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
    value: "17843691127146670", // YOUR SESSION
    domain: ".instagram.com",
    path: "/",
    httpOnly: true,
    secure: true
  });

  await page.goto("https://www.instagram.com/");
  await page.waitFor(5000);

  // GC Page
  await page.goto("https://www.instagram.com/direct/t/1176649277224222/");
  await page.waitFor(7000);

  for (const newName of names) {
    console.log("Changing name to:", newName);

    const input = "input[placeholder='Group Name']";
    await page.waitForSelector(input);
    await page.click(input, { clickCount: 3 });
    await page.type(input, newName);

    const saveBtn = "button[type='submit']";
    await page.waitForSelector(saveBtn);
    await page.click(saveBtn);

    await page.waitFor(4000); // old compatible delay
  }

  console.log("✔ Name rotation completed!");
  await browser.close();
})();
