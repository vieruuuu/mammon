import { Page } from "puppeteer";

import { RawProductData } from "@/lib/utils.ts";

async function scrap(page: Page) {
  const res = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const productName = document.querySelectorAll(
          "div.productlisting > div > div.topArea > div.productListing-nume > h2 > a > span"
        )[0].textContent;

        const productPrice = document.querySelectorAll(
          "div.productlisting > div > div.topArea > div.productListing-nume > div > div > span.price"
        )[0].textContent;

        return resolve({
          productName,
          productPrice,
        });
      })
  );

  return res as RawProductData;
}

export default {
  scrap,
  name: "cel.ro",
  url: (product: string) => `https://www.cel.ro/cauta/${product}`,
};
