import Router from "koa-router";
import * as productHandler from "../handlers/products/productHandlers";
import {
  productInputMiddleware,
  productUpdateInputMiddleware,
} from "../middleware/productInputMiddleware";

// Prefix all routes with /products
const router = new Router({
  prefix: "/api",
});

// Routes will go here

router.get("/products", productHandler.getProducts);
router.post("/products", productInputMiddleware, productHandler.save);
router.put("/product/:id", productUpdateInputMiddleware, productHandler.update);
router.delete("/product/:id", productHandler.deleteOne);
router.get("/product/:id", productHandler.getProduct);

export default router;
