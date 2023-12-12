import fs from "fs";
const saveData = (jsData) =>
  fs.writeFileSync("./src/database/products.json", JSON.stringify(jsData));
export default saveData;
