import { Page } from "puppeteer";

interface RawProductData {
  productName: string;
  productPrice: string;
}

interface ProductData {
  productName: string;
  productPrice: number;
}

interface SiteData {
  url: (product: string) => string;
  name: string;
  scrap: (page: Page) => Promise<ProductData>;
}

const prepareData = ({
  productName,
  productPrice,
}: RawProductData): ProductData => ({
  productName: productName.trim(),
  productPrice: parseFloat(
    productPrice.trim().replaceAll(".", "").replaceAll(",", ".")
  ),
});

export { prepareData };

export type { RawProductData, ProductData, SiteData };
