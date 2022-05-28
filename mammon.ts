import puppeteer from "puppeteer";
import downloadChrome from "./lib/downloadChrome.ts";

import sites from "./sites/sites.ts";

import { ProductData, scrapPage } from "@/lib/utils.ts";

await downloadChrome();

const browser = await puppeteer.launch({ headless: true });

const product = prompt("product name:") as string;

if (!product) {
  throw "type a product name";
}

console.log("searching for the product...");

await waitForAllSites();

await browser.close();

function sortResults(results: ProductData[]) {
  results.sort((a, b) => a.productPrice - b.productPrice);

  return results;
}

async function waitForAllSites() {
  const promises = [];

  for (const siteData of sites) {
    promises.push(scrapPage({ browser, siteData, product }));
  }

  const results = await Promise.all(promises);

  const resultsSorted = sortResults(results);

  console.log(resultsSorted);
}
