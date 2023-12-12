import saveData from "../helpers/saveData";
import sortResult from "../helpers/product/sort";
import pickFields from "../helpers/product/pickFields";
const products = require("./products.json");

export function getAll(params) {
  let result = products;
  if (params.limit) {
    result = result.slice(0, params.limit);
  }
  if (params.sort) {
    result = sortResult(result, params.sort);
  }
  return result;
}

export function getOne(id, fields) {
  const result = products.find((product) => product.id === parseInt(id));
  return pickFields(result, fields);
}

export function add(data) {
  // existed id
  if (getOne(data.id)) throw new Error("Existed id");
  const currentDate = new Date();
  const updatedproducts = [{ ...data, createdAt: currentDate.toISOString() }, ...products];
  return saveData(updatedproducts);
}

export function update(data, id) {
  const productToUpdate = getOne(id);
  if (!productToUpdate) return null;
  const updatedproducts = products.map((product) => {
    if (product.id === parseInt(id)) return { ...product, ...data };
    return product;
  });
  saveData(updatedproducts);
  return true;
}

export function deleteOne(id) {
  const updatedproducts = products.filter((product) => {
    return product.id !== parseInt(id);
  });
  if (!updatedproducts) return null;
  return saveData(updatedproducts);
}
