import React from "react";
import "../../../css/DeliveryCss/Del_person/dp_nav.css";
import { Link } from "react-router-dom";

function dp_nav() {
  return (
    <>
      <div id="delivery-sidebar">
        <div id="delivery-sidebar-header">
          <h2 id="delivery-sidebar-title">pissu kanna</h2>
        </div>
        <ul id="delivery-sidebar-menu">
          <li>
            <a href="#" id="delivery-dashboard-link">
              Dashboard
            </a>
          </li>
          <li>
            <Link to="my-deliveries">My Deliveries</Link>
          </li>
          <li>
            <a href="#" id="delivery-profile-link">
              Profile
            </a>
          </li>
          <li>
            <a href="#" id="delivery-logout-link">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default dp_nav;
