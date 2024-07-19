import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import EditDetails from "./components/EditDetails";
import Home from "./components/Home";
import "./App.css";
import AuthProvider from "./AuthContext";
import AddEmployee from "./components/AddEmployee";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllEmployees from "./components/AllEmployees";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/allemployees" element={<AllEmployees />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/editdetails" element={<EditDetails />} />
            <Route path="/" element={<Home />} />
          </Routes>
            <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
