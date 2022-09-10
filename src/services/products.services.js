import { churrasco } from "./api.services";

function getProducts() {
  return churrasco.get("products");
}

function createProduct({
  sku,
  code,
  name,
  description,
  pictures,
  price,
  currency,
}) {
  return churrasco.post("addproduct", {
    SKU: sku,
    code,
    name,
    description,
    pictures,
    price,
    currency,
  });
}

export { getProducts, createProduct };
