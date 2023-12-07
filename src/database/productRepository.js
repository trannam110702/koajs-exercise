import fs from "fs";
const products = require("./products.json");

const saveData = (jsData) =>
  fs.writeFileSync("./src/database/products.json", JSON.stringify(jsData));
const sortResult = (products, type) => {
  let result;
  switch (type) {
    case "asc":
      result = products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case "desc":
      result = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      result = products;
      break;
  }
  return result;
};
const pickFields = (data, fields) => {
  const result = {};
  if (fields) {
    for (const key in data) {
      if (fields.includes(key)) {
        result[key] = data[key];
      }
    }
    return result;
  } else {
    return data;
  }
};
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
