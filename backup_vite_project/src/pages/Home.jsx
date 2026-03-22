import React from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import StoreLocator from '../components/StoreLocator';
import CategoryCircles from '../components/CategoryCircles';
import PromoGrids from '../components/PromoGrids';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <CategoryCircles />
      <PromoGrids />
      <ProductGrid />
      <StoreLocator />
    </>
  );
}
