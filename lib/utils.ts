import { Page } from "puppeteer";

import { Browser } from "puppeteer";

import stealthScript from "@/lib/stealth.ts";

interface RawProductData {
  productName: string;
  productPrice: string;
}

interface ProductData {
  productName: string;
  productPrice: number;
}

interface SiteData {
  url: (product: string) => string;
  name: string;
  scrap: (page: Page) => Promise<RawProductData>;
}

const prepareData = ({
  productName,
  productPrice,
}: RawProductData): ProductData => ({
  productName: productName.trim(),
  productPrice: parseFloat(
    productPrice.trim().replaceAll(".", "").replaceAll(",", ".")
  ),
});

async function scrapPage({
  browser,
  siteData,
  product,
}: {
  browser: Browser;
  siteData: SiteData;
  product: string;
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

export { prepareData, scrapPage };

export type { RawProductData, ProductData, SiteData };
