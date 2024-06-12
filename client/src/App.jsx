import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import PdfViewer from "./pages/PdfViewer";

import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <Register /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route
          path="/pdfViewer"
          element={isAuthenticated ? <PdfViewer /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
