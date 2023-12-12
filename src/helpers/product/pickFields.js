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
export default pickFields;
