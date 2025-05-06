import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useParams } from "react";
import "../../../css/DeliveryCss/Del_manager/dm_dashboard.css";

function dm_overview() {
  const [orders, setorders] = useState([]);
  const [delPersons, setdelPersons] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get_all_orders"
        ); // Get users from the backend
        setorders(response.data.orders);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/deliver-person/all"
        ); // Get users from the backend
        setdelPersons(response.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []);

  return (
    <>
      <div id="dashboard">
        <div id="overview-cards">
          <div id="card-1" class="card">
            <h2>Total Orders</h2>
            <p>Currunt Orders - {orders.length}</p>
          </div>
          <div id="card-2" class="card">
            <h2>Delivery Persons</h2>
            <p>{delPersons.length} Available</p>
          </div>
          <div id="card-3" class="card">
            <h2>Total Revenue</h2>
            <p>Rs.50,000/=</p>
          </div>
        </div>
        <div id="charts">
          <div id="chart-1">
            <img
              src="https://cdn.dribbble.com/userupload/31758749/file/original-bfd76ccb003a29dcd14693b698f63a81.jpg?format=webp&resize=400x300&vertical=center"
              alt="Chart 1"
            />
          </div>
          <div id="chart-2">
            <img
              src="https://cdn.dribbble.com/userupload/8198187/file/still-bb86d37665db8a5833f287329e094c9a.png?format=webp&resize=400x300&vertical=center"
              alt="Chart 2"
            />
          </div>
          <div id="chart-3">
            <img
              src="https://cdn.dribbble.com/userupload/30390708/file/original-a3ed4fb8642c825c0424d793a8e962c7.jpg?format=webp&resize=400x300&vertical=center"
              alt="Chart 3"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default dm_overview;
