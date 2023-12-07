import fs from "fs";
const products = require("./products.json");

export function getAll() {
  return products;
}

export function getAllWithLimit(limit) {
  let result = [];
  for (let index = 0; index < limit; index++) {
    const element = products[index];
    result.push(element);
  }
  return result;
}

export function sortResult(products, type) {
  let result = products;
  if (type === "asc") {
    result = products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  if (type === "desc") {
    result = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  return result;
}

export function getOne(id, fields) {
  const result = products.find((product) => product.id === parseInt(id));
  const resultWithFields = {};
  if (fields) {
    for (const key in result) {
      if (fields.includes(key)) {
        resultWithFields[key] = result[key];
      }
    }
    return resultWithFields;
  } else {
    return result;
  }
}

export function add(data) {
  // existed id
  if (getOne(data.id)) throw new Error("Existed id");
  const currentDate = new Date();
  const updatedproducts = [{ ...data, createdAt: currentDate.toISOString() }, ...products];
  return fs.writeFileSync("./src/database/products.json", JSON.stringify(updatedproducts));
}

export function update(data, id) {
  const productToUpdate = getOne(id);
  if (!productToUpdate) return null;
  const updatedproducts = products.map((product) => {
    if (product.id === parseInt(id)) return { ...product, ...data };
    return product;
  });
  fs.writeFileSync("./src/database/products.json", JSON.stringify(updatedproducts));
  return true;
}

export function deleteOne(id) {
  const updatedproducts = products.filter((product) => {
    return product.id !== parseInt(id);
  });
  if (!updatedproducts) return null;
  return fs.writeFileSync("./src/database/products.json", JSON.stringify(updatedproducts));
}
