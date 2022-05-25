import { Page } from "puppeteer";

import { prepareData, RawProductData } from "@/lib/utils.ts";

async function scrap(page: Page) {
  const res = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const productName = document.querySelectorAll(
          "div > div > div.card-v2-info > div > a"
        )[0].textContent;

        const productPrice = document.querySelectorAll(
          "div.card-v2-content > div.card-v2-pricing > p.product-new-price"
        )[0].textContent;

        return resolve({
          productName,
          productPrice,
        });
      })
  );

  return prepareData(res as RawProductData);
}

export default {
  scrap,
  name: "emag.ro",
  url: (product: string) =>
    `https://www.emag.ro/search/${product}?ref=effective_search`,
};
