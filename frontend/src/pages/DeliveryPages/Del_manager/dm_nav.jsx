import React from "react";
import "../../../css/DeliveryCss/Del_manager/dm_nav.css";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Graphics/logo.png";
function DmNav() {
  return (
    <div id="sidebar">
      <div id="sidebar-header">
        <h1>
          <img src={Logo} alt="Logo" />
        </h1>
      </div>
      <nav id="nav">
        <ul>
          <li>
            <Link to="dm_overview">Dashboard</Link>
          </li>
          <li>
            <Link to="dm_orders">Orders</Link>
          </li>
          <li>
            <Link to="dm_tracking">Tracking</Link>
          </li>
          <li>
            <Link to="dm_person_details">Delivery persons</Link>
          </li>
          <li>
            <div id="name-box">
              <h3>thaveesha@gmail.com</h3>
            </div>
            <button id="logout-btn">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DmNav;
