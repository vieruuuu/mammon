import { Page } from "puppeteer";

import { prepareData, RawProductData } from "@/lib/utils.ts";

async function scrap(page: Page) {
  const res = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const productName = document.querySelectorAll(
          "div.produse_body > div.produse_liste_filter > div.product_grid > div:nth-child(1) > div > div.npi_name > a"
        )[0].textContent;

        const productPrice = document.querySelectorAll(
          "div.produse_body > div.produse_liste_filter > div.product_grid > div:nth-child(1) > div > div.npi_price > div > div > span.real_price"
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
  name: "evomag.ro",
  url: (product: string) => `https://www.evomag.ro/?sn.q=${product}`,
};
