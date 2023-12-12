import {
  getAll as getAllProducts,
  getOne as getOneProduct,
  add as addProduct,
  deleteOne as deleteOneProduct,
  update as updateProduct,
} from "../../database/productRepository";

export async function getProducts(ctx) {
  try {
    const Products = getAllProducts(ctx.request.query);
    ctx.body = {
      data: Products,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

export async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.request.query;
    let getCurrentProduct;
    if (fields) {
      getCurrentProduct = getOneProduct(id, fields.split(","));
    } else {
      getCurrentProduct = getOneProduct(id);
    }
    if (getCurrentProduct) {
      return (ctx.body = {
        data: getCurrentProduct,
      });
    }
    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export async function save(ctx) {
  try {
    const postData = ctx.request.body;
    addProduct(postData);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export async function update(ctx) {
  try {
    const postData = ctx.request.body;
    if (updateProduct(postData, ctx.params.id)) {
      ctx.status = 201;
      return (ctx.body = {
        success: true,
      });
    }
    throw new Error("Product Not Found with that id!");
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export async function deleteOne(ctx) {
  try {
    deleteOneProduct(ctx.params.id);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}
