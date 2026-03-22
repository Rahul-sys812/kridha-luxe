"use client";
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { FilterProvider } from '../context/FilterContext';

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </CartProvider>
    </AuthProvider>
  );
}
