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
  await new Promise(r => setTimeout(r, 6000));

  // Go to GC
  await page.goto("https://www.instagram.com/direct/t/1176649277224222/");
  await new Promise(r => setTimeout(r, 7000));

  for (const newName of names) {
    console.log("Changing name to:", newName);

    const inputSelector = "input[placeholder='Group Name']";
    const saveBtnSelector = "button[type='submit']";

    await page.waitForSelector(inputSelector);
    await page.click(inputSelector, { clickCount: 3 });
    await page.type(inputSelector, newName);

    await page.waitForSelector(saveBtnSelector);
    await page.click(saveBtnSelector);

    await new Promise(r => setTimeout(r, 4000)); // delay between changes
  }

  console.log("✔ Name rotation completed!");
  await browser.close();
})();
