import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function OrderManagerTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get_all_orders"
        );
        setOrders(response.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }
    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/remove_orders/${orderId}`
      );
      if (response.status === 200) {
        // Remove the deleted order from the UI
        setOrders(orders.filter((order) => order._id !== orderId));
        toast.success("Order Deleted !");
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <>
      <table id="orders-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Shipping Address</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>
              Item Price <br /> (per unit)
            </th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Payment Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.Shipping_addrs}</td>
              <td>{order.prd_name}</td>
              <td>{order.cetegory}</td>
              <td>{order.item_price}</td>
              <td>{order.quantity}</td>
              <td>{order.tot_price}</td>
              <td>{order.payment_type}</td>
              <td>
                <button onClick={() => deleteOrder(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </>
  );
}

export default OrderManagerTable;
