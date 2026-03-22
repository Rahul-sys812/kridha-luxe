import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem('kridha_userInfo');
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  });

  const [wishlist, setWishlist] = useState(() => {
      const saved = localStorage.getItem('kridha_wishlist');
      if (saved) {
          return JSON.parse(saved);
      }
      return [];
  });

  useEffect(() => {
    localStorage.setItem('kridha_userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem('kridha_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      setUserInfo(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setUserInfo(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:5000/api/users/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    } finally {
      setUserInfo(null);
      localStorage.removeItem('kridha_userInfo');
    }
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
    wishlist,
    toggleWishlist
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
