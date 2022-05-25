import { Page } from "puppeteer";

import { prepareData, RawProductData } from "@/lib/utils.ts";

async function scrap(page: Page) {
  const res = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const productName = document.querySelectorAll(
          "#products-list > article > div > div.grid-full.col-xs-8.col-sm-4.col-md-4 > h2.h5.name > a"
        )[0].textContent;

        const productPrice = document.querySelectorAll(
          "div.price.margin-bottom-xs.clearfix.col-xs-6.grid-full > div > strong"
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
  name: "vexio.ro",
  url: (product: string) => `https://www.vexio.ro/?sn.q=${product}`,
};
