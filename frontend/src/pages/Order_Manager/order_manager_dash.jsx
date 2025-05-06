import React, { useState } from "react";
import Sidebar from "./order_manager_sidebar";
import TableData from "./order_manager_table";

// Dummy data for orders (Replace this with actual data fetching)
const ordersData = [
  { id: 1, customer: "John Doe", status: "Pending", total: "$100" },
  { id: 2, customer: "Jane Smith", status: "Shipped", total: "$200" },
];

const OrderManagerDash = () => {
  const [orders, setOrders] = useState(ordersData);

  return (
    <div id="dashboard-container">
      <Sidebar />
      <div id="main-content">
        <h1 id="title">Orders Overview</h1>
        <TableData orders={orders} />
      </div>
    </div>
  );
};

export default OrderManagerDash;
