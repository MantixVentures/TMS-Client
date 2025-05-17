import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NormalFines from "./NormalFines";
import CourtFines from "./CourtFines";

const FinesManagement = () => {
  return (
    <Routes>
      <Route path="normal" element={<NormalFines />} />
      <Route path="court" element={<CourtFines />} />
      <Route path="/" element={<Navigate to="normal" replace />} />
    </Routes>
  );
};

export default FinesManagement;
