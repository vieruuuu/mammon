import { Page } from "puppeteer";

import { RawProductData } from "@/lib/utils.ts";

async function scrap(page: Page) {
  const res = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const productName = document.querySelectorAll(
          "#ct-box-629483 > div.box-col2.clearfix > div.row.v2 > a > h2"
        )[0].textContent;

        const productPrice = document.querySelectorAll(
          "#ct-box-629483 > div.box-col2.clearfix > div.box-col2-inner > div.box-col3 > div.row.v4 > p.pret"
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
  name: "dabstore.ro",
  url: (product: string) => `https://www.dabstore.ro/search/${product}`,
};
