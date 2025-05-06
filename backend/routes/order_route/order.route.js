import express from "express";
import {
  allOrders,
  createOrder,
  removeOrder,
  getOrder,
  updateOrder,
} from "../../controllers/order_controller/order.controller.js";

const router = express.Router();

router.post("/add_order", createOrder);
router.get("/get_all_orders", allOrders);
router.delete("/remove_orders/:id", removeOrder);
router.get("/get_order/:id", getOrder);
router.put("/update_order/:id", updateOrder);

export default router;
