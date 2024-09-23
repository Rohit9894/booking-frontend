import React from "react";
import { Routes, Route } from "react-router-dom";
import Booking from "./Booking";


function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Booking />} />
    </Routes>
  );
}

export default AllRoutes;
