import Order from "../../models/order_model/order.model.js";

export const createOrder = async (req, res) => {
  const {
    name,
    Shipping_addrs,
    prd_name,
    prd_brand,
    item_price,
    quantity,
    tot_price,
    payment_type,
  } = req.body;

  try {
    const newOrder = new Order({
      name,
      Shipping_addrs,
      prd_name,
      prd_brand,
      item_price,

      quantity,
      tot_price,
      payment_type,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ success: true, message: "Order added successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all orders
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orders = await Order.findOne();
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//delete orders
export const removeOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Order is Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};

// Assign Delivery Person

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    Shipping_addrs,
    prd_name,
    prd_brand,
    item_price,

    quantity,
    tot_price,
    payment_type,
  } = req.body;

  try {
    // Find the user by ID and update their details
    const order = await Order.findByIdAndUpdate(
      id,
      {
        name,
        Shipping_addrs,
        prd_name,
        prd_brand,
        item_price,

        quantity,
        tot_price,
        payment_type,
      },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
