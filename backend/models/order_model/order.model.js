import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Shipping_addrs: {
      type: String,
      required: true,
    },
    prd_name: {
      type: String,
      required: true,
    },
    prd_brand: {
      type: String,
      required: true,
    },
    item_price: {
      type: Number,
      required: true,
    },
    item_price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    tot_price: {
      type: Number,
      required: true,
    },
    payment_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
