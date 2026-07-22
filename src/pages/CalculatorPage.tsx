import React from 'react';
import { PriceCalculator } from '../components/PriceCalculator';

interface CalculatorPageProps {
  onBookWithEstimate: (calculatedData: {
    serviceType: string;
    totalKsh: number;
    bedrooms: number;
    bathrooms: number;
    sofaSeats: number;
    locationTown: string;
    addOns: string[];
  }) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onBookWithEstimate }) => {
  return (
    <div className="pt-0 pb-8 space-y-8">
      <PriceCalculator onBookWithEstimate={onBookWithEstimate} />
    </div>
  );
};
