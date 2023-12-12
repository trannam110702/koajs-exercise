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
export default sortResult;