import { Page } from "puppeteer";

import { RawProductData } from "@/lib/utils.ts";

async function scrap(page: Page) {
  const res = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const productName = document.querySelectorAll(
          "#ProductList > div.items > div:nth-child(1) > div > div > div:nth-child(1) > div.span7 > div:nth-child(1) > div > h4.product-title > a"
        )[0].textContent;

        const productPrice = document
          .querySelectorAll(
            "#ProductList > div.items > div:nth-child(1) > div > div > div:nth-child(1) > div.span3.hidden-phone > div.product-list-price.right"
          )[0]
          .textContent?.replaceAll(".", ",");

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
  name: "itarena.ro",
  url: (product: string) => `https://www.itarena.ro/?sn.q=${product}`,
};
