/**
 * Sort the array of products
 * @param {Array} products
 * @param {string} type
 * @returns {Array}
 */
const sortResult = (products, type) => {
  let result;
  switch (type) {
    case "asc":
      result = products.sort((a, b) => {
        console.log(new Date(a.createdAt) - new Date(b.createdAt));
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
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
export default sortResult;
