import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SERVICES_LIST, LOCATIONS_LIST, APEX_COMPANY_INFO } from '../data/cleaningData';
import { BookingRequest } from '../types';
import { saveLocalBooking } from '../lib/bookingStorage';
import { PageHero } from '../components/PageHero';
import {
  Calendar,
  CheckCircle2,
  Phone,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Form Fields
  const [serviceId, setServiceId] = useState<string>('residential-deep');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [locationTown, setLocationTown] = useState<string>('Nakuru CBD');
  const [estateLandmark, setEstateLandmark] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('2 Bedroom House');
  const [preferredDate, setPreferredDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState<string>('08:30 AM');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa_stk' | 'mpesa_paybill' | 'cash_after'>('mpesa_stk');
  const [stkPhone, setStkPhone] = useState<string>('');

  const [bookingResult, setBookingResult] = useState<BookingRequest | null>(null);

  const selectedService = SERVICES_LIST.find((s) => s.id === serviceId) || SERVICES_LIST[0];
  const calculatedPriceKsh = selectedService.priceStartingKsh;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10B981', '#F59E0B', '#3B82F6'],
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
      const referenceCode = `JK-NK-${refNum}`;

      const newBooking: BookingRequest = {
        id: `bk-${Date.now()}`,
        referenceCode,
        customerName,
        phone,
        email: email || APEX_COMPANY_INFO.email,
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
      alert(`Success! An M-Pesa PIN prompt of KSh 1,000 has been sent to ${targetPhone}. Please enter your M-Pesa PIN on your phone.`);
    }, 600);
  };

  return (
    <div className="pt-2 pb-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Hero Header */}
      <PageHero
        title="Schedule Your Cleaning Service in"
        highlightText="Nakuru"
        subtitle="Instant KSh pricing, zero hidden fees, and same-day dispatch across Nakuru County."
        backgroundImageUrl="/images/booking-hero.jpg"
        stats={[
          { value: "30 Mins", label: "Fast Dispatch" },
          { value: "0 Fees", label: "Hidden Cost" },
          { value: "M-Pesa", label: "Instant Payment" },
          { value: "100%", label: "Satisfaction Guarantee" },
        ]}
      />

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        {step < 4 && (
          <div className="space-y-3 pb-2 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                Step {step} of 3
              </span>
              <span className="text-xs font-semibold text-slate-500">
                M-Pesa Till: <strong className="text-slate-900">{APEX_COMPANY_INFO.mpesaTill}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    s <= step ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-5 text-xs sm:text-sm">
            <div>
              <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                1. Select Cleaning Service
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500"
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
                <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  2. Property / House Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-white"
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
                <label className="block font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  3. Town / Location
                </label>
                <select
                  value={locationTown}
                  onChange={(e) => setLocationTown(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {LOCATIONS_LIST.map((loc) => (
                    <option key={loc.id} value={loc.townName}>
                      {loc.townName} ({loc.subCounty})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-slate-800">
              <div>
                <p className="text-[11px] font-bold uppercase text-emerald-800">Estimated Total Quote</p>
                <p className="text-2xl font-black text-emerald-700">KSh {calculatedPriceKsh.toLocaleString()}</p>
              </div>
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Next: Contact Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Karanja"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Phone Number (M-Pesa) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0792000111"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Email Address (Optional for Digital Invoice)</label>
              <input
                type="email"
                placeholder="e.g. karanja@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Estate / House / Street Landmark *</label>
              <input
                type="text"
                required
                placeholder="e.g. Milimani State House Rd, Apt 4B or Kiamunyi Bora Bora Near Olive Plaza"
                value={estateLandmark}
                onChange={(e) => setEstateLandmark(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Preferred Service Date</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Arrival Time Slot</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-bold text-slate-900 bg-white"
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
                className="w-1/3 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => {
                  if (!customerName || !phone || !estateLandmark) {
                    alert('Please fill in your name, phone number, and estate landmark.');
                    return;
                  }
                  setStep(3);
                }}
                className="w-2/3 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Next: Payment Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="space-y-5 text-xs sm:text-sm">
            <p className="font-extrabold text-slate-800 uppercase tracking-wider">
              Select Preferred Payment Option
            </p>

            <div className="space-y-3">
              <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'mpesa_stk' ? 'bg-emerald-50 border-emerald-500 shadow-xs' : 'bg-slate-50 border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="pm_page"
                  checked={paymentMethod === 'mpesa_stk'}
                  onChange={() => setPaymentMethod('mpesa_stk')}
                  className="mt-1 text-emerald-600"
                />
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">Instant M-Pesa STK Push (Recommended)</p>
                  <p className="text-slate-600">Receive an automatic Safaricom M-Pesa PIN prompt directly on your phone.</p>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'mpesa_paybill' ? 'bg-emerald-50 border-emerald-500 shadow-xs' : 'bg-slate-50 border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="pm_page"
                  checked={paymentMethod === 'mpesa_paybill'}
                  onChange={() => setPaymentMethod('mpesa_paybill')}
                  className="mt-1 text-emerald-600"
                />
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">Manual M-Pesa Paybill / Till Number</p>
                  <p className="text-slate-600">Paybill: <strong>522522</strong> | Till Number: <strong>890214</strong></p>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'cash_after' ? 'bg-emerald-50 border-emerald-500 shadow-xs' : 'bg-slate-50 border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="pm_page"
                  checked={paymentMethod === 'cash_after'}
                  onChange={() => setPaymentMethod('cash_after')}
                  className="mt-1 text-emerald-600"
                />
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">Pay After Inspection</p>
                  <p className="text-slate-600">Zero deposit required upfront. Pay our Nakuru team leader after cleaning.</p>
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Processing Reservation...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm & Book Cleaning</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4 */}
        {step === 4 && bookingResult && (
          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Ref Code: {bookingResult.referenceCode}
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-sans pt-2">
                Asante! Your Booking is Confirmed
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Our Nakuru supervisor is preparing your crew. We will contact you on <strong>{bookingResult.phone}</strong> shortly.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left text-xs sm:text-sm space-y-3 max-w-lg mx-auto">
              <div className="flex justify-between border-b border-slate-200 pb-2 font-bold text-slate-900">
                <span>Service:</span>
                <span>{bookingResult.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-slate-800">{bookingResult.locationTown} ({bookingResult.estateLandmark})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-semibold text-slate-800">{bookingResult.preferredDate} at {bookingResult.preferredTime}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-black text-base text-emerald-700">
                <span>Total Estimated Price:</span>
                <span>KSh {bookingResult.totalEstimatedKsh.toLocaleString()}</span>
              </div>
            </div>

            {paymentMethod === 'mpesa_stk' && (
              <div className="p-5 rounded-2xl bg-emerald-950 text-white space-y-3 text-left max-w-lg mx-auto">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs text-emerald-300">Simulate M-Pesa STK Push Prompt</p>
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={stkPhone || phone}
                    onChange={(e) => setStkPhone(e.target.value)}
                    placeholder="2547XXXXXXXX"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white"
                  />
                  <button
                    onClick={handleSimulateStkPush}
                    disabled={loading}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
                  >
                    Send STK Prompt
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <button
                onClick={() => {
                  const text = encodeURIComponent(`Jambo ${APEX_COMPANY_INFO.name}! I just completed online booking ${bookingResult.referenceCode} for ${bookingResult.serviceTitle} in ${bookingResult.locationTown}.`);
                  window.open(`https://wa.me/${APEX_COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
                }}
                className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>

              <a
                href={`tel:${APEX_COMPANY_INFO.phone}`}
                className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Dispatch</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
