const fs = require("fs");
const faker = require("faker");

const generateProducts = () => {
  const products = [];

  for (let i = 1; i <= 1000; i++) {
    const product = {
      id: i,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.sentence(),
      product: faker.commerce.product(),
      color: faker.commerce.color(),
      createdAt: faker.date.past().toISOString(),
      image: faker.image.imageUrl(),
    };

    products.push(product);
  }

  return products;
};

const productsData = generateProducts();
fs.writeFileSync("./src/database/products.json", JSON.stringify(productsData, null, 2));
console.log("Products data generated and saved to products.json");
