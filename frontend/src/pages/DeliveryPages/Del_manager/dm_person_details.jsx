import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useParams } from "react";
import { FaTimes } from "react-icons/fa";
import { jsPDF } from "jspdf";

function dm_person_details() {
  const [delPersons, setdelPersons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
  }, []); // runs once on mount

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearInput = () => {
    setSearchQuery(""); // Set the input value to an empty string
  };

  const filteredPersons = delPersons.filter((person) =>
    person.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Delivery Person Report", 14, 20);

    const personCount = filteredPersons.length;
    doc.setFontSize(12);
    doc.text(`Total Persons: ${personCount}`, 14, 30);

    const headers = ["Email", "Full Name", "Address", "Vehicle Number"];
    doc.text(headers[0], 14, 40);
    doc.text(headers[1], 70, 40);
    doc.text(headers[2], 100, 40);
    doc.text(headers[3], 170, 40);

    let yOffset = 50;
    filteredPersons.forEach((person) => {
      doc.text(person.email, 14, yOffset);
      doc.text(person.firstname, 70, yOffset);
      doc.text(person.address, 100, yOffset);
      doc.text(person.vehicleNumber, 170, yOffset);
      yOffset += 10;
    });

    doc.save("delivery-person-report.pdf"); 
  };

  return (
    <>
      <div id="delivery-container">
        <h2 id="delivery-title">Delivery Person Details</h2>
        <div id="search-div">
          <input
            type="search"
            name=""
            id="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by email"
          />
          <button id="Search-btn" onClick={clearInput}>
            <span>Clear X</span>
            <div id="icon-div">
              <FaTimes size={15} color="white" />
            </div>
          </button>
        </div>
        <table id="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Vehicle Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredPersons.map((person) => (
              <tr key={person._id}>
                <td>{person.email}</td>
                <td>{person.firstname}{" "}{person.lastname}</td>
                <td>{person.address}</td>
                <td>{person.vehicleNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button id="report-btn" onClick={generateReport}>
          Get Report
        </button>
      </div>
    </>
  );
}

export default dm_person_details;
