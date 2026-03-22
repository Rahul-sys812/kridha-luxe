"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Load from local storage initially
  useEffect(() => {
    const savedUser = localStorage.getItem('kridha_userInfo');
    if (savedUser) {
      try {
        setUserInfo(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse userInfo", e);
      }
    }
    const savedWishlist = localStorage.getItem('kridha_wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }
  }, []);

  // Sync to local storage on change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kridha_userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kridha_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('kridha_token', data.token);
      setUserInfo(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      localStorage.setItem('kridha_token', data.token);
      setUserInfo(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('kridha_userInfo');
    localStorage.removeItem('kridha_token');
  };

  const authFetch = (url, options = {}) => {
    const token = localStorage.getItem('kridha_token');
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  };

  const toggleWishlist = (product) => {
      setWishlist(prev => {
          const exists = prev.find(item => item.id === product.id);
          if (exists) {
              return prev.filter(item => item.id !== product.id);
          } else {
              return [...prev, product];
          }
      });
  };

  const value = {
    userInfo,
    login,
    register,
    logout,
    authFetch,
    wishlist,
    toggleWishlist
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
