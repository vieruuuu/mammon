import puppeteer, { Browser } from "puppeteer";
import downloadChrome from "./lib/downloadChrome.ts";

import sites from "./sites/sites.ts";

import { ProductData, SiteData, prepareData } from "@/lib/utils.ts";

import stealthScript from "@/lib/stealth.ts";

await downloadChrome();

const browser = await puppeteer.launch({ headless: true });

const product = prompt("product name:") as string;

if (!product) {
  throw "type a product name";
}

console.log("searching for the product...");

await waitForAllSites();

await browser.close();

async function createPage({
  browser,
  siteData,
}: {
  browser: Browser;
  siteData: SiteData;
}) {
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 Edg/94.0.992.47"
  );

  await page.evaluateOnNewDocument((stealthScript: string) => {
    eval(stealthScript);
  }, stealthScript);

  const searchPageUrl = siteData.url(encodeURI(product));

  await page.goto(searchPageUrl, {
    waitUntil: "networkidle2",
  });

  let result: ProductData;

  try {
    const rawData = await siteData.scrap(page);

    result = prepareData(rawData);
  } catch (_) {
    result = { productName: "not found", productPrice: Infinity };
  }

  await page.close();

  return { name: siteData.name, ...result };
}

function sortResults(results: ProductData[]) {
  results.sort((a, b) => a.productPrice - b.productPrice);

  return results;
}

async function waitForAllSites() {
  const promises = [];

  for (const siteData of sites) {
    promises.push(createPage({ browser, siteData }));
  }

  const results = await Promise.all(promises);

  const resultsSorted = sortResults(results);

  console.log(resultsSorted);
}
