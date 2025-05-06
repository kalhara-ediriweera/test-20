import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useParams } from "react";
import { FaSearch } from "react-icons/fa";
import "../../../css/DeliveryCss/Del_manager/dm_dashboard.css";

function DmTracking() {
  const [asigns, setasigns] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/deliver-asign/all"
        ); // Get users from the backend
        setasigns(response.data.asigns);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // First delete operation
      const response1 = await axios.delete(
        `http://localhost:5000/api/deliver-asign/delete/abc/${id}`
      );
      if (response1.data.success) {
        // Second delete operation (if the first succeeds)
        const response2 = await axios.delete(
          `http://localhost:5000/api/remove_orders/${id}`
        );
        if (response2.data.success) {
          // If both delete operations succeed, update the state
          setasigns(asigns.filter((asign) => asign._id !== id));
        }
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <>
      <h2>Order Tracking</h2>
      <div id="search-div">
        <input type="search" name="" id="search-input" />
        <button id="Search-btn">
          <span>Search</span>
          <div id="icon-div">
            <FaSearch size={15} color="white" />
          </div>
        </button>
      </div>
      <table id="table">
        <thead>
          <tr>
            <th id="order-id">Order ID</th>
            <th id="order-date">Product Name</th>
            <th id="order-date">Owner Email</th>
            <th id="order-date">Owner Address</th>
            <th id="order-date">Delivery Person</th>
            <th id="order-status">Status</th>
            <th id="order-status">Action</th>
          </tr>
        </thead>
        <tbody>
          {asigns.map((asigneddetails) => (
            <tr id="order-row">
              <td id="order-id-value">{asigneddetails.product_id}</td>
              <td id="order-id-value">{asigneddetails.product_name}</td>
              <td id="order-id-value">{asigneddetails.owner_email}</td>
              <td id="order-id-value">{asigneddetails.owner_address}</td>
              <td id="order-id-value">{asigneddetails.delPerson_email}</td>
              <td id="order-status-value">
                <span
                  className="status-progress"
                  id={asigneddetails.delStatus}
                  style={{
                    backgroundColor:
                      asigneddetails.delStatus === "assigned"
                        ? "#FFCCCB"
                        : asigneddetails.delStatus === "package-pickup"
                        ? "#FFFF00"
                        : asigneddetails.delStatus === "on-road"
                        ? "#ADD8E6"
                        : asigneddetails.delStatus === "completed"
                        ? "#90EE90"
                        : "",
                    color: "black",
                  }}
                >
                  {asigneddetails.delStatus}
                </span>
              </td>
              <td>
                <button
                  id="table-btn-delete"
                  onClick={() => handleDelete(asigneddetails.product_id)}
                  disabled={asigneddetails.delStatus !== "completed"}
                  style={{
                    cursor:
                      asigneddetails.delStatus === "completed"
                        ? "pointer"
                        : "not-allowed",
                    opacity: asigneddetails.delStatus !== "completed" ? 0.5 : 1,
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button id="report-btn">Get Report</button>
    </>
  );
}

export default DmTracking;
