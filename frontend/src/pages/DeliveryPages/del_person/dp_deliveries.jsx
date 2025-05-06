import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useParams } from "react";
import "../../../css/DeliveryCss/Del_person/dp_dashboard.css";

function dp_deliveries() {
  const [asigns, setAsigns] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/deliver-asign/all"
        );
        setAsigns(response.data.asigns);
      } catch (err) {
        console.error("Error fetching deliveries:", err);
      }
    }
    fetchUsers();
  }, []);

  // Handle Status Change for each row
  const handleStatusChange = (e, orderId) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: e.target.value, // Save the status for the specific orderId
    }));
  };

  // Update Status in the Backend
  const updateStatus = async (orderId) => {
    try {
      const status = selectedStatus[orderId] || ""; // Get the selected status or default to empty
      if (!status) {
        alert("Please select a status before updating.");
        return;
      }

      // Sending the update request to backend API
      await axios.put(
        `http://localhost:5000/api/deliver-asign/update/${orderId}`,
        {
          delStatus: status,
        }
      );

      // Optionally, re-fetch the data or update state to reflect changes
      const updatedAsigns = asigns.map((asigneddetails) => {
        if (asigneddetails._id === orderId) {
          return { ...asigneddetails, delStatus: status };
        }
        return asigneddetails;
      });

      setAsigns(updatedAsigns);
      alert("Status updated successfully.");
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <>
      <h2>My Deliveries</h2>
      <table id="delivery-dashboard">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Owner Email</th>
            <th>Owner Address</th>
            <th>Current Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {asigns.map((asigneddetails) => (
            <tr key={asigneddetails._id}>
              <td>{asigneddetails.product_id}</td>
              <td>{asigneddetails.product_name}</td>
              <td>{asigneddetails.owner_email}</td>
              <td>{asigneddetails.owner_address}</td>
              <td>
                <select
                  value={
                    selectedStatus[asigneddetails._id] ||
                    asigneddetails.delStatus
                  }
                  onChange={(e) => handleStatusChange(e, asigneddetails._id)}
                >
                  <option value="package-pickup">Package Pickup</option>
                  <option value="on-road">On Road</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td>
                <button onClick={() => updateStatus(asigneddetails._id)}>
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default dp_deliveries;
