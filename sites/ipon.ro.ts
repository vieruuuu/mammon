import { Page } from "puppeteer";

import { RawProductData } from "@/lib/utils.ts";

async function scrap(page: Page) {
  const res = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const productName = document.querySelectorAll(
          "div.search-list__grid--cards.search-list__grid--cards--shop.grid > div > div > div > a.shop-card__overlay-link"
        )[0].textContent;

        const productPrice = document.querySelectorAll(
          "div.shop-card__body > div.shop-card__price-block > div.shop-card__price"
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
  name: "ipon.ro",
  url: (product: string) => `https://ipon.ro/kereses/shop?keyword=${product}`,
};
