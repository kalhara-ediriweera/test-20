import React from "react";
import Dm_nav from "./dm_nav";
import { Outlet } from "react-router-dom";
import "../../../css/DeliveryCss/Del_manager/dm_dashboard.css";

function dm_dashboard() {
  return (
    <>
      <div id="main-content">
        <Dm_nav />
        <div id="sub-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default dm_dashboard;
