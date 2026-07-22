import React from 'react';
import { LocationSection } from '../components/LocationSection';

interface LocationsPageProps {
  onBookInLocation: (townName: string) => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({ onBookInLocation }) => {
  return (
    <div className="pt-0 pb-8 space-y-8">
      <LocationSection onBookInLocation={onBookInLocation} />
    </div>
  );
};
