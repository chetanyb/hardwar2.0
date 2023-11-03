import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import LandInfo from "./pages/LandInfo";
import LoanTest from "./pages/test";
import Sustainability from "./pages/Sustainability";

function Router() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/landinfo"
          element={isAuthenticated ? <LandInfo /> : <Navigate to="/" replace />}
        />
        {/* Route with no authentication */}
        <Route path="/test" element={<LoanTest creditValue={'1'} />} />
        <Route path="/sustainability" element={<Sustainability />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
