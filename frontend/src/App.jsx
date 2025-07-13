import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useAuth } from "./context/AuthContext";
import Home from "./home/home";

const App = () => {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/signup"
        element={!token ? <Signup /> : <Navigate to="/" />}
      />

      {/* Protected route */}
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
