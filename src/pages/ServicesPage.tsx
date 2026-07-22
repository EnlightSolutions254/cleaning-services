import React from 'react';
import { ServicesSection } from '../components/ServicesSection';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="pt-0 pb-8 space-y-8">
      <ServicesSection onSelectService={(serviceId) => onOpenBooking(serviceId)} />
    </div>
  );
};
