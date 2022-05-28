import { Page } from "puppeteer";

import { ProductData, SiteData, prepareData } from "@/lib/utils.ts";

export async function scrapPageForTest(
  page: Page,
  url: string,
  siteData: SiteData
): Promise<ProductData> {
  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  let result: ProductData;

  try {
    const rawData = await siteData.scrap(page);

    result = prepareData(rawData);
  } catch (_) {
    result = { productName: "not found", productPrice: Infinity };
  }

  return result;
}
