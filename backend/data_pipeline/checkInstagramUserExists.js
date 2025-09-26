import puppeteer from "puppeteer";

export async function checkInstagramUserExists(username) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.instagram.com/${username}/`, { waitUntil: "domcontentloaded" });

  const exists = await page.evaluate(() => {
    const meta = document.querySelector("meta[property='og:description']");
    return !!meta; // true if found, false if not
  });

  await browser.close();
  return exists;
}