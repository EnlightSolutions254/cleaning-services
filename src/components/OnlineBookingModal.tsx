import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SERVICES_LIST, LOCATIONS_LIST, APEX_COMPANY_INFO } from '../data/cleaningData';
import { BookingRequest } from '../types';
import { saveLocalBooking } from '../lib/bookingStorage';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Phone,
  User,
  Clock,
  Sparkles,
  ShieldCheck,
  CreditCard,
  X,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
} from 'lucide-react';

interface OnlineBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  prefilledTown?: string;
  initialEstimateKsh?: number;
}

export const OnlineBookingModal: React.FC<OnlineBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  prefilledTown,
  initialEstimateKsh,
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Form Fields
  const [serviceId, setServiceId] = useState<string>(preselectedServiceId || 'residential-deep');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [locationTown, setLocationTown] = useState<string>(prefilledTown || 'Nakuru CBD');
  const [estateLandmark, setEstateLandmark] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('2 Bedroom House');
  const [preferredDate, setPreferredDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState<string>('08:30 AM');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa_stk' | 'mpesa_paybill' | 'cash_after'>('mpesa_stk');
  const [stkPhone, setStkPhone] = useState<string>('');

  const [bookingResult, setBookingResult] = useState<BookingRequest | null>(null);

  if (!isOpen) return null;

  const selectedService = SERVICES_LIST.find((s) => s.id === serviceId) || SERVICES_LIST[0];

  const calculatedPriceKsh = initialEstimateKsh || selectedService.priceStartingKsh;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#38BDF8', '#10B981', '#0F172A'],
      });
    } catch (e) {
      console.log('Confetti playback:', e);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const refNum = Math.floor(1000 + Math.random() * 9000);
      const referenceCode = `APEX-NK-${refNum}`;

      const newBooking: BookingRequest = {
        id: `bk-${Date.now()}`,
        referenceCode,
        customerName,
        phone,
        email: email || 'customer@apexcleannakuru.co.ke',
        locationTown,
        estateLandmark: estateLandmark || 'Nakuru Residence',
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        propertyType: propertyType || 'Home',
        propertySize: 'Standard',
        addOns: [],
        preferredDate: preferredDate || new Date().toISOString().split('T')[0],
        preferredTime: preferredTime || '09:00 AM',
        totalEstimatedKsh: calculatedPriceKsh,
        paymentMethod,
        paymentStatus: paymentMethod === 'mpesa_stk' ? 'paid_deposit' : 'pending',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      saveLocalBooking(newBooking);
      setBookingResult(newBooking);
      setStep(4);
      triggerCelebration();
    } catch (err) {
      console.error(err);
      alert('Could not save booking locally.');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateStkPush = async () => {
    const targetPhone = stkPhone || phone;
    if (!targetPhone) {
      alert('Please enter your M-Pesa phone number first');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Success! An M-Pesa PIN prompt of KSh 1,000 has been sent to ${targetPhone}. Please enter your M-Pesa PIN on your phone to complete payment for ${bookingResult?.referenceCode || APEX_COMPANY_INFO.name}.`);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#18181B]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 border border-zinc-200 shadow-2xl relative animate-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Title & Progress Bar */}
        {step < 4 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-[10px] bg-emerald-50 text-[#059669] font-bold text-xs border border-emerald-100">
                Step {step} of 3
              </span>
              <h2 className="text-xl font-bold text-[#18181B] font-sans">
                Book Cleaning Service in Nakuru
              </h2>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center gap-2 pt-1">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    s <= step ? 'bg-[#059669]' : 'bg-zinc-100'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Service & Property Configuration */}
        {step === 1 && (
          <div className="space-y-5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Select Service
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3 font-semibold text-[#0F172A] text-sm focus:ring-2 focus:ring-[#059669] outline-none"
              >
                {SERVICES_LIST.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.title} — Starting KSh {srv.priceStartingKsh.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Property / House Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3 font-semibold text-[#0F172A] focus:ring-2 focus:ring-[#059669] outline-none"
                >
                  <option value="Bedsitter / Studio Apt">Bedsitter / Studio Apt</option>
                  <option value="1 Bedroom Apartment">1 Bedroom Apartment</option>
                  <option value="2 Bedroom House">2 Bedroom House</option>
                  <option value="3 Bedroom Bungalow">3 Bedroom Bungalow</option>
                  <option value="4+ Bedroom Villa / Mansion">4+ Bedroom Villa / Mansion</option>
                  <option value="Commercial Office Space">Commercial Office Space</option>
                  <option value="Airbnb Serviced Suite">Airbnb Serviced Suite</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Nakuru Town / Sub-County
                </label>
                <select
                  value={locationTown}
                  onChange={(e) => setLocationTown(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3 font-semibold text-[#0F172A] focus:ring-2 focus:ring-[#059669] outline-none"
                >
                  {LOCATIONS_LIST.map((loc) => (
                    <option key={loc.id} value={loc.townName}>
                      {loc.townName} ({loc.subCounty})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 rounded-[16px] bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-[#0F172A]">
              <div>
                <p className="text-[11px] font-semibold uppercase text-[#059669]">Estimated Price</p>
                <p className="text-xl font-bold text-[#059669]">KSh {calculatedPriceKsh.toLocaleString()}</p>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#059669]" />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next: Contact & Address</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Contact Details & Estate Address */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Karanja"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3 font-medium text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number (M-Pesa) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0792000111"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3 font-medium text-[#0F172A]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address (Optional for Invoice)</label>
              <input
                type="email"
                placeholder="e.g. karanja@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3 font-medium text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Specific Estate / House / Landmark *</label>
              <input
                type="text"
                required
                placeholder="e.g. Milimani State House Rd, Apt 4B or Kiamunyi Bora Bora Near Olive Plaza"
                value={estateLandmark}
                onChange={(e) => setEstateLandmark(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3 font-medium text-[#0F172A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3 font-semibold text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Arrival Time</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3 font-semibold text-[#0F172A]"
                >
                  <option value="08:00 AM">08:00 AM (Early Squad)</option>
                  <option value="10:30 AM">10:30 AM (Mid-Morning)</option>
                  <option value="01:30 PM">01:30 PM (Afternoon)</option>
                  <option value="04:00 PM">04:00 PM (Late Shift)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-[12px] border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => {
                  if (!customerName || !phone || !estateLandmark) {
                    alert('Please fill in your name, phone, and estate location.');
                    return;
                  }
                  setStep(3);
                }}
                className="w-2/3 py-3 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Next: Payment Preference</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: M-Pesa & Payment Method */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="space-y-5 text-xs">
            <p className="font-semibold text-slate-700 uppercase tracking-wider">
              Select Preferred Payment Method
            </p>

            <div className="space-y-3">
              <label className={`flex items-start gap-3 p-4 rounded-[16px] border cursor-pointer transition-all ${
                paymentMethod === 'mpesa_stk' ? 'bg-emerald-50/80 border-[#059669] shadow-2xs' : 'bg-slate-50/80 border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="pm"
                  checked={paymentMethod === 'mpesa_stk'}
                  onChange={() => setPaymentMethod('mpesa_stk')}
                  className="mt-1 text-[#059669]"
                />
                <div>
                  <p className="font-bold text-[#0F172A] text-sm">Instant M-Pesa STK Push (Recommended)</p>
                  <p className="text-[#64748B]">Receive an automatic payment PIN prompt directly on your Safaricom phone.</p>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-4 rounded-[16px] border cursor-pointer transition-all ${
                paymentMethod === 'mpesa_paybill' ? 'bg-emerald-50/80 border-[#059669] shadow-2xs' : 'bg-slate-50/80 border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="pm"
                  checked={paymentMethod === 'mpesa_paybill'}
                  onChange={() => setPaymentMethod('mpesa_paybill')}
                  className="mt-1 text-[#059669]"
                />
                <div>
                  <p className="font-bold text-[#0F172A] text-sm">Manual M-Pesa Paybill / Till Number</p>
                  <p className="text-[#64748B]">Paybill: <strong>522522</strong> | Till Number: <strong>890214</strong></p>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-4 rounded-[16px] border cursor-pointer transition-all ${
                paymentMethod === 'cash_after' ? 'bg-emerald-50/80 border-[#059669] shadow-2xs' : 'bg-slate-50/80 border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="pm"
                  checked={paymentMethod === 'cash_after'}
                  onChange={() => setPaymentMethod('cash_after')}
                  className="mt-1 text-[#059669]"
                />
                <div>
                  <p className="font-bold text-[#0F172A] text-sm">Pay M-Pesa or Cash After Inspection</p>
                  <p className="text-[#64748B]">Zero deposit required now. Pay our Nakuru supervisor once satisfied with the cleaning.</p>
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-[12px] border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-3.5 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Processing Booking...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm & Book Now</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Success Confirmation Screen */}
        {step === 4 && bookingResult && (
          <div className="text-center space-y-5 py-2">
            <div className="w-16 h-16 bg-emerald-50 text-[#059669] border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="bg-emerald-50 text-[#059669] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
                Booking Reference: {bookingResult.referenceCode}
              </span>
              <h2 className="text-2xl font-bold text-[#0F172A] font-sans pt-1">
                Asante! Your Booking is Confirmed
              </h2>
              <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                Our Nakuru supervisor is preparing your team. We will call you on <strong>{bookingResult.phone}</strong> shortly.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50/80 p-4 rounded-[16px] border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200/80 pb-2 font-bold text-[#0F172A]">
                <span>Service:</span>
                <span>{bookingResult.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Location:</span>
                <span className="font-semibold text-[#0F172A]">{bookingResult.locationTown} ({bookingResult.estateLandmark})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Date & Time:</span>
                <span className="font-semibold text-[#0F172A]">{bookingResult.preferredDate} at {bookingResult.preferredTime}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/80 pt-2 font-bold text-sm text-[#059669]">
                <span>Total Quote:</span>
                <span>KSh {bookingResult.totalEstimatedKsh.toLocaleString()}</span>
              </div>
            </div>

            {/* STK Push Trigger Box if M-Pesa STK selected */}
            {paymentMethod === 'mpesa_stk' && (
              <div className="p-4 rounded-[16px] bg-[#0F172A] text-white space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-xs text-amber-400">Simulate M-Pesa STK Push Deposit</p>
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={stkPhone || phone}
                    onChange={(e) => setStkPhone(e.target.value)}
                    placeholder="2547XXXXXXXX"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-[10px] px-3 py-2 text-xs font-semibold text-white"
                  />
                  <button
                    onClick={handleSimulateStkPush}
                    disabled={loading}
                    className="bg-[#059669] hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-[10px] text-xs cursor-pointer"
                  >
                    Send STK Prompt
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  const text = encodeURIComponent(`Jambo ${APEX_COMPANY_INFO.name}! I just completed online booking ${bookingResult.referenceCode} for ${bookingResult.serviceTitle} in ${bookingResult.locationTown}.`);
                  window.open(`https://wa.me/${APEX_COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
                }}
                className="w-full py-3 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-[12px] bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
