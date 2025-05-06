import React from "react";
import Dp_nav from "./dp_nav";
import { Outlet } from "react-router-dom";

function dp_dashboard() {
  return (
    <>
      <div id="main-content">
        <Dp_nav />
        <div id="sub-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default dp_dashboard;
