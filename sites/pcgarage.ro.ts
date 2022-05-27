import { Page } from "puppeteer";

import { RawProductData } from "@/lib/utils.ts";

async function scrap(page: Page) {
  const res = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let productName;
        let productPrice;

        try {
          productName = document.querySelectorAll(
            "div.product_box_middle > div.product_box_name > h2 > a"
          )[0].textContent;

          productPrice = document.querySelectorAll(
            "div.product_box_bottom > div > div.product_box_price_container > div.pb-price > .price"
          )[0].textContent;
        } catch (_) {
          productName = document.querySelector("#product_name")?.textContent;

          productPrice = document.querySelectorAll(
            "#psbx > div.ps_top.ps_top_taller.gradient_ps_shop > p.ps_sell_price > span.price_num"
          )[0].textContent;
        }

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
  name: "pcgarage.ro",
  url: (product: string) => `https://www.pcgarage.ro/cauta/${product}`,
};
