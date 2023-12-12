import saveData from "../helpers/saveData";
import pickFields from "../helpers/pickFields";
import sortResult from "../helpers/product/sort";
const products = require("./products.json");

/**
 * Get all products with option params
 * @param {Object} params
 * @returns {[{id: number, name: string, price: string, description: string, product: string, color: string, image: string, createdAt: string}]}
 */
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

/**
 * Get specific product by id and pick optional fields
 * @param {string | number} id - product id
 * @param {Object} fields - optional fields
 * @return {{id: number, name: string, price: string, description: string, product: string, color: string, image: string, createdAt: string}}
 */
export function getOne(id, fields) {
  const result = products.find((product) => product.id === parseInt(id));
  return pickFields(result, fields);
}

/**
 * Add a product
 * @param {Object} data
 * @returns {undefined}
 */
export function add(data) {
  if (getOne(data.id)) throw new Error("Existed id");
  const updatedproducts = [{ ...data, createdAt: new Date().toISOString() }, ...products];
  return saveData(updatedproducts);
}

/**
 * Update a product
 * @param {Object} data - data to update
 * @param {string} id - product id to update
 * @returns {true | Error}
 */
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
/**
 * Delete a product
 * @param {number | string} id - product id to delete
 * @returns {undefined}
 */
export function deleteOne(id) {
  const updatedproducts = products.filter((product) => {
    return product.id !== parseInt(id);
  });
  if (!updatedproducts) return null;
  return saveData(updatedproducts);
}
