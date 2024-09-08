"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
    addresses: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setAuth({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  const logout = () => {
    // Clear authentication state
    setAuth({
      token: null,
      user: null,
      addresses: [],
    });
    // Remove token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("allAddresses");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("deliverAddress");
    localStorage.removeItem("orderData");
    localStorage.removeItem("selectedAddress");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
