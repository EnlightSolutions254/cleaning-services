import React, { useState, useEffect } from 'react';
import { BookingRequest } from '../types';
import { APEX_COMPANY_INFO } from '../data/cleaningData';
import { getLocalBookings, updateLocalBookingStatus } from '../lib/bookingStorage';
import { useLogoUrl, DEFAULT_LOGO_URL } from '../utils/logoManager';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
  X,
  Phone,
  Filter,
  DollarSign,
  Download,
  RefreshCw,
  Truck,
  ShieldAlert,
  Image as ImageIcon,
  Upload,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'bookings' | 'logo'>('bookings');

  // Logo management state
  const { logoUrl, updateLogo, resetLogo } = useLogoUrl();
  const [logoInput, setLogoInput] = useState<string>(logoUrl);
  const [logoSaveSuccess, setLogoSaveSuccess] = useState(false);

  useEffect(() => {
    setLogoInput(logoUrl);
  }, [logoUrl]);

  const fetchBookings = () => {
    setLoading(true);
    try {
      const data = getLocalBookings();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching admin bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdateStatus = (id: string, newStatus: string) => {
    try {
      const updated = updateLocalBookingStatus(id, newStatus as any);
      if (updated) {
        setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredBookings = bookings.filter(
    (b) => filterStatus === 'all' || b.status === filterStatus
  );

  const totalKshRevenue = bookings.reduce((sum, b) => sum + (b.totalEstimatedKsh || 0), 0);
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed' || b.status === 'dispatched').length;

  const handleSaveLogo = () => {
    updateLogo(logoInput);
    setLogoSaveSuccess(true);
    setTimeout(() => setLogoSaveSuccess(false), 3500);
  };

  const handleResetLogo = () => {
    resetLogo();
    setLogoInput(DEFAULT_LOGO_URL);
    setLogoSaveSuccess(true);
    setTimeout(() => setLogoSaveSuccess(false), 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateLogo(reader.result);
          setLogoInput(reader.result);
          setLogoSaveSuccess(true);
          setTimeout(() => setLogoSaveSuccess(false), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#18181B]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#18181B] text-white rounded-[24px] max-w-5xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 border border-zinc-800 shadow-2xl relative animate-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-[12px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white font-sans">{APEX_COMPANY_INFO.name}</h2>
                <span className="bg-[#059669] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Manager Portal</span>
              </div>
              <p className="text-xs text-zinc-400">Live Operation Dispatch & Brand Logo Control</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchBookings}
              className="p-2 rounded-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
              title="Refresh Bookings"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-[12px] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-[#059669] text-white shadow-sm'
                : 'bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Operation Dispatch & Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logo')}
            className={`px-4 py-2 rounded-[12px] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'logo'
                ? 'bg-[#059669] text-white shadow-sm'
                : 'bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Update Logo & Favicon</span>
          </button>
        </div>

        {activeTab === 'logo' ? (
          /* LOGO MANAGEMENT TAB */
          <div className="space-y-6 bg-zinc-900/60 p-6 rounded-[20px] border border-zinc-800">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-400" />
                <span>Brand Logo & Favicon Configuration</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Update the official logo JPG/PNG path or upload a new image. The logo updates live in the top navigation header, footer, and browser tab favicon.
              </p>
            </div>

            {logoSaveSuccess && (
              <div className="p-4 rounded-[12px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>Logo & Favicon updated successfully! Changes applied live across Navbar, Footer, and Browser Tab.</span>
              </div>
            )}

            {/* Current Active Preview */}
            <div className="p-5 rounded-[16px] bg-zinc-950 border border-zinc-800 space-y-3">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Active Logo Preview
              </span>
              <div className="flex flex-wrap items-center gap-6">
                {/* Navbar style preview */}
                <div className="flex items-center gap-3 p-3 bg-white rounded-[16px] border border-zinc-300">
                  <img
                    src={logoUrl}
                    alt="Logo Preview Navbar"
                    className="w-10 h-10 object-cover rounded-[12px] border border-zinc-200"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="text-zinc-900 font-bold text-sm">
                    Jokulu<span className="text-[#059669]"> Cleaning</span>
                  </div>
                </div>

                {/* Footer style preview */}
                <div className="flex items-center gap-3 p-3 bg-[#18181B] rounded-[16px] border border-zinc-700">
                  <img
                    src={logoUrl}
                    alt="Logo Preview Footer"
                    className="w-9 h-9 object-cover rounded-[10px] border border-zinc-700"
                  />
                  <div className="text-white font-bold text-xs uppercase tracking-tight">
                    APEX CLEAN NAKURU
                  </div>
                </div>

                {/* Favicon preview */}
                <div className="flex items-center gap-2 p-3 bg-zinc-900 rounded-[16px] border border-zinc-800 text-xs text-zinc-300">
                  <img
                    src={logoUrl}
                    alt="Favicon Preview"
                    className="w-5 h-5 object-cover rounded-[4px]"
                  />
                  <span className="text-[11px] text-zinc-400">Browser Favicon Icon</span>
                </div>
              </div>
            </div>

            {/* Inputs & Actions */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  Logo File Path or Image URL (.jpg, .png, .svg)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={logoInput}
                    onChange={(e) => setLogoInput(e.target.value)}
                    placeholder="/images/logo.jpg"
                    className="flex-1 bg-zinc-950 border border-zinc-700 rounded-[12px] px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSaveLogo}
                    className="px-5 py-2.5 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Apply Logo Path</span>
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Default file path is <code className="text-emerald-400 font-mono">/images/logo.jpg</code>
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800">
                <label className="px-4 py-2.5 rounded-[12px] bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-2 border border-zinc-700">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>Upload Logo Image from Computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleResetLogo}
                  className="px-4 py-2.5 rounded-[12px] bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white font-medium text-xs transition-colors cursor-pointer flex items-center gap-1.5 border border-zinc-700/50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Default (/images/logo.jpg)</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* BOOKINGS TAB */
          <>
            {/* Analytics Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-[16px] bg-zinc-900/90 border border-zinc-800 space-y-1">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Total Pipeline Revenue</p>
                <p className="text-2xl font-bold text-emerald-400 font-sans">KSh {totalKshRevenue.toLocaleString()}</p>
                <p className="text-[10px] text-zinc-500">Booked & Pending Jobs</p>
              </div>

              <div className="p-4 rounded-[16px] bg-zinc-900/90 border border-zinc-800 space-y-1">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Active Dispatches</p>
                <p className="text-2xl font-bold text-amber-400 font-sans">{confirmedCount} Teams</p>
                <p className="text-[10px] text-zinc-500">In Milimani, Kiamunyi & Naka</p>
              </div>

              <div className="p-4 rounded-[16px] bg-zinc-900/90 border border-zinc-800 space-y-1">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Total Bookings Recorded</p>
                <p className="text-2xl font-bold text-white font-sans">{bookings.length}</p>
                <p className="text-[10px] text-zinc-500">M-Pesa Connected</p>
              </div>
            </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-zinc-300">Filter Status:</span>
            {['all', 'pending', 'confirmed', 'dispatched', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold capitalize transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table / Cards */}
        <div className="space-y-3">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-[16px] bg-zinc-900/70 border border-zinc-800 hover:border-emerald-500/40 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-1 rounded-[6px]">
                    {b.referenceCode}
                  </span>
                  <h3 className="font-bold text-white text-sm">{b.customerName}</h3>
                  <a href={`tel:${b.phone}`} className="text-xs text-emerald-400 font-medium flex items-center gap-1 hover:underline">
                    <Phone className="w-3 h-3" />
                    <span>{b.phone}</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-300">
                    KSh {(b.totalEstimatedKsh || 0).toLocaleString()}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                    b.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : b.status === 'dispatched'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {b.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Location:</strong> {b.locationTown} ({b.estateLandmark})</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Date/Time:</strong> {b.preferredDate} @ {b.preferredTime}</span>
                </div>

                <div>
                  <span><strong>Service:</strong> {b.serviceTitle} ({b.propertyType})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-1">
                {b.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                    className="px-3 py-1.5 rounded-[8px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-xs cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                )}

                {b.status === 'confirmed' && (
                  <button
                    onClick={() => handleUpdateStatus(b.id, 'dispatched')}
                    className="px-3 py-1.5 rounded-[8px] bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Dispatch Nakuru Team</span>
                  </button>
                )}

                {b.status === 'dispatched' && (
                  <button
                    onClick={() => handleUpdateStatus(b.id, 'completed')}
                    className="px-3 py-1.5 rounded-[8px] bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Completed & Paid</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        </>
        )}

      </div>
    </div>
  );
};
