import { BookingRequest } from '../types';

const STORAGE_KEY = 'apex_clean_nakuru_bookings';

const DEFAULT_BOOKINGS: BookingRequest[] = [
  {
    id: 'bk-1',
    referenceCode: 'APEX-NK-8921',
    customerName: 'Dr. Samuel Karanja',
    phone: '+254722112233',
    email: 'karanja.s@gmail.com',
    locationTown: 'Milimani Estate',
    estateLandmark: 'Near Golf Club Gate',
    serviceId: 'residential-deep',
    serviceTitle: 'Residential Deep Cleaning + Sofa Washing',
    propertyType: '4 Bedroom Mansion',
    propertySize: 'Large',
    addOns: ['Sofa Wash'],
    preferredDate: '2026-07-25',
    preferredTime: '08:30 AM',
    totalEstimatedKsh: 11000,
    paymentMethod: 'mpesa_stk',
    paymentStatus: 'paid_deposit',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'bk-2',
    referenceCode: 'APEX-NK-8922',
    customerName: 'Faith Wanjiku',
    phone: '+254711998877',
    email: 'faith.wanjiku@naka-suites.co.ke',
    locationTown: 'Naka & Pipeline',
    estateLandmark: 'Pipeline Stage 2',
    serviceId: 'airbnb-turnover',
    serviceTitle: 'Airbnb Turnover Cleaning (2 Units)',
    propertyType: '2 Bedroom Serviced Apt',
    propertySize: 'Medium',
    addOns: [],
    preferredDate: '2026-07-23',
    preferredTime: '11:00 AM',
    totalEstimatedKsh: 5600,
    paymentMethod: 'mpesa_paybill',
    paymentStatus: 'paid_full',
    status: 'dispatched',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'bk-3',
    referenceCode: 'APEX-NK-8923',
    customerName: 'Mercy Njoroge',
    phone: '+254733445566',
    email: 'mercy.prop@gmail.com',
    locationTown: 'Kiamunyi',
    estateLandmark: 'Bora Bora Crescent',
    serviceId: 'post-construction',
    serviceTitle: 'Post-Construction Cleaning',
    propertyType: '5 Bedroom Villa Site',
    propertySize: 'XL',
    addOns: [],
    preferredDate: '2026-07-24',
    preferredTime: '07:00 AM',
    totalEstimatedKsh: 18500,
    paymentMethod: 'cash_after',
    paymentStatus: 'pending',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

export function getLocalBookings(): BookingRequest[] {
  if (typeof window === 'undefined') return DEFAULT_BOOKINGS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BOOKINGS));
      return DEFAULT_BOOKINGS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read bookings from localStorage', e);
    return DEFAULT_BOOKINGS;
  }
}

export function saveLocalBooking(booking: BookingRequest): BookingRequest {
  const current = getLocalBookings();
  const updated = [booking, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save booking to localStorage', e);
  }
  return booking;
}

export function updateLocalBookingStatus(id: string, newStatus: BookingRequest['status']): BookingRequest | null {
  const current = getLocalBookings();
  let updatedBooking: BookingRequest | null = null;
  const updated = current.map((b) => {
    if (b.id === id) {
      updatedBooking = { ...b, status: newStatus };
      return updatedBooking;
    }
    return b;
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update booking status in localStorage', e);
  }
  return updatedBooking;
}
