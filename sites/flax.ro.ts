import { Page } from "puppeteer";

import { prepareData, RawProductData } from "@/lib/utils.ts";

async function scrap(page: Page) {
  const res = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let productName;
        let productPrice;

        try {
          productName = document.querySelectorAll(
            "#product > div.product-top-section.row > div.col-md-7.product-details > h1.name"
          )[0].textContent;

          productPrice = document.querySelectorAll(
            "#product > div.product-top-section.row > div.col-md-7.product-details > div.final-price-section.row > div:nth-child(1) > div.price-section > div.price"
          )[0].childNodes[0].textContent;
        } catch (_) {
          productName = document.querySelectorAll(
            "div > div.product-description > h2 > a"
          )[0].textContent;

          productPrice = document.querySelectorAll(
            "div > div.price-section > div.price"
          )[0].childNodes[0].textContent;
        }

        productPrice = productPrice?.replaceAll(",", ".");

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
  name: "flax.ro",
  url: (product: string) => `https://www.flax.ro/produse?term=${product}`,
};
