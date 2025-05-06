import axios from "axios";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "../../../css/DeliveryCss/Del_manager/dm_dashboard.css";

function dm_orders() {
  const [orders, setorders] = useState([]);
  const [delPersons, setdelPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState({}); // Store selected person for each order

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get_all_orders"
        );
        setorders(response.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }

    async function fetchDelPersons() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/deliver-person/all"
        );
        setdelPersons(response.data.users);
      } catch (err) {
        console.error("Error fetching delivery persons:", err);
      }
    }

    fetchOrders();
    fetchDelPersons();
  }, []); // Runs once on mount

  // Handle the change in the dropdown selection
  const handleSelectPerson = (orderId, delPersonId) => {
    setSelectedPerson((prevSelected) => ({
      ...prevSelected,
      [orderId]: delPersonId,
    }));
  };

  // Function to handle the 'Assign' button click
  const handleAssignDelivery = async (orderId) => {
    const delPersonId = selectedPerson[orderId]; // Get selected delivery person for this order

    if (!delPersonId) {
      toast.error("Please select a delivery person.");
      return;
    }

    const order = orders.find((order) => order._id === orderId);
    const delPerson = delPersons.find((person) => person._id === delPersonId);

    if (order && delPerson) {
      const payload = {
        product_id: order._id,
        product_name: order.prd_name,
        owner_email: order.name,
        owner_address: order.Shipping_addrs,
        owner_phone: order.tot_price, // assuming it's for phone
        delPerson_email: delPerson.email,
        delStatus: "Assigned",
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/deliver-asign/new",
          payload
        );
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          alert("Failed to assign delivery.");
        }
      } catch (err) {
        console.error("Error assigning delivery:", err);
        toast.error(
          err.response?.data?.message ||
            "A delivery for this product has already been assigned"
        );
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      // First delete operation
      const response1 = await axios.delete(
        `http://localhost:5000/api/remove_orders/${id}`
      );
      if (response1.data.success) {
        // Second delete operation (if the first succeeds)
        const response2 = await axios.delete(
          `http://localhost:5000/api/deliver-asign/delete/abc/${id}`
        );
        if (response2.data.success) {
          // If both delete operations succeed, update the state
          setorders(orders.filter((order) => order._id !== id));
        }
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <>
      <h2>Orders Overview</h2>
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
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Owner Email</th>
            <th>Address</th>
            <th>Phone No</th>
            <th>Assign Person</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.prd_name}</td>
              <td>{order.name}</td>
              <td>{order.Shipping_addrs}</td>
              <td>{order.tot_price}</td>
              <td>
                <select
                  name={`select-person-${order._id}`}
                  id="select-input"
                  onChange={(e) =>
                    handleSelectPerson(order._id, e.target.value)
                  } // Handle selection
                >
                  <option value="">Select Person</option>
                  {delPersons
                    .filter((person) => person.status === "available")
                    .map((person) => (
                      <option key={person._id} value={person._id}>
                        {person.firstname}
                      </option>
                    ))}
                </select>
              </td>

              <td>
                {/* "Assign" button to trigger the delivery assignment */}
                <button
                  id="table-btn"
                  onClick={() => handleAssignDelivery(order._id)} // Trigger assignment
                >
                  Assign
                </button>
                <button id="table-btn">Edit</button>
                <button id="table-btn" onClick={() => handleDelete(order._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button id="report-btn">Get Report</button>
      <ToastContainer />
    </>
  );
}

export default dm_orders;
