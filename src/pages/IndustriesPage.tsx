import React from 'react';
import { IndustriesSection } from '../components/IndustriesSection';

interface IndustriesPageProps {
  onSelectIndustryQuote: (industryTitle: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onSelectIndustryQuote }) => {
  return (
    <div className="pt-0 pb-8 space-y-8">
      <IndustriesSection onSelectIndustryQuote={onSelectIndustryQuote} />
    </div>
  );
};
