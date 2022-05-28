import { assertEquals } from "https://deno.land/std@0.141.0/testing/asserts.ts";
import puppeteer from "puppeteer";

import { scrapPageForTest } from "./lib.ts";

import { cel, emag } from "@/sites/sites.ts";

import stealthScript from "@/lib/stealth.ts";

Deno.test({
  name: "websites",
  async fn(t) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 Edg/94.0.992.47"
    );

    await page.evaluateOnNewDocument((stealthScript: string) => {
      eval(stealthScript);
    }, stealthScript);

    await t.step(cel.name, async () => {
      const { productName } = await scrapPageForTest(
        page,
        "https://www.cel.ro/cauta/bx8071512400f/",
        cel
      );

      assertEquals(
        productName,
        "Procesor Intel Core i5-12400F 2.5GHz Socket 1700 Box bx8071512400f"
      );
    });

    await t.step(emag.name, async () => {
      const { productName } = await scrapPageForTest(
        page,
        "https://www.emag.ro/search/100-100000022BOX?ref=effective_search",
        emag
      );

      assertEquals(
        productName,
        "Procesor AMD Ryzen™ 5 3600X, 35MB, 4.4 GHz cu Wraith Spire cooler"
      );
    });

    await page.close();
    await browser.close();
  },

  sanitizeOps: false,
});
