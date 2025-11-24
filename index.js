
const puppeteer = require("puppeteer");
const names = require("./names.json");
const SESSIONID = "17843691127146670";
(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.setCookie({
    name: "sessionid",
    value: SESSIONID,
    domain: ".instagram.com"
});
    await page.goto("https://www.instagram.com/accounts/login/");

    console.log("⏳ Login manually required…");
    await page.waitForTimeout(25000); 

    await page.goto("https://www.instagram.com/direct/t/1176649277224222/");

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
