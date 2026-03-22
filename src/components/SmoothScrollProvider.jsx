"use client";
import React, { useEffect, useRef } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}
