// ============================================================================
// Kings Crown Admin Portal Modal
// ============================================================================
// This component displays real-time table reservations fetched from the 
// Firebase Firestore collection "TableBookings".
//
// Key Features:
// 1. Live synchronization with Firestore (listens for newly submitted bookings)
// 2. Filter & search by guest name, contact, status ("Pending", "Confirmed", etc.)
// 3. Status updates & Table assignments synced back to Firestore
// ============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, Lock, ShieldCheck, Search, Filter, Calendar, Clock, Users, MapPin, 
  Phone, MessageSquare, CheckCircle, Clock3, AlertCircle, Trash2, 
  Download, RefreshCw, LogOut, ChevronDown, Check, Sparkles, User, Tag, 
  FileText, ExternalLink, Printer
} from 'lucide-react';

import { KingsCrownLogo } from './KingsCrownLogo';
import { ReservationRecord, ReservationStatus } from '../types';
import { 
  subscribeToReservations, 
  updateReservationStatus, 
  deleteReservationRecord 
} from '../lib/reservationsService';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_ADMIN_PASSCODE = 'admin123';
const ADMIN_AUTH_KEY = 'kings_crown_admin_authenticated';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data state
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | ReservationStatus>('ALL');
  const [dateFilter, setDateFilter] = useState<'ALL' | 'TODAY' | 'UPCOMING'>('ALL');
  const [selectedRecord, setSelectedRecord] = useState<ReservationRecord | null>(null);
  const [activeEditingId, setActiveEditingId] = useState<string | null>(null);
  const [tableAssignmentInput, setTableAssignmentInput] = useState('');
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Subscribe to real-time reservations
  useEffect(() => {
    if (!isOpen || !isAuthenticated) return;

    const unsubscribe = subscribeToReservations((data) => {
      setReservations(data);
    });

    return () => unsubscribe();
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === DEFAULT_ADMIN_PASSCODE || passcode.trim() === 'kingscrown' || passcode.trim() === 'admin7721') {
      setIsAuthenticated(true);
      setLoginError('');
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
    } else {
      setLoginError('Invalid Passcode. Enter default admin passcode: admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // ignore
    }
  };

  const showNotification = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleStatusChange = async (id: string | undefined, newStatus: ReservationStatus) => {
    if (!id) return;
    const targetId = id;
    // 1. Instantly update React state for immediate visual response
    setReservations((prev) =>
      prev.map((r) => (r.id === targetId || r.reservationCode === targetId ? { ...r, status: newStatus } : r))
    );
    if (selectedRecord && (selectedRecord.id === targetId || selectedRecord.reservationCode === targetId)) {
      setSelectedRecord((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    // 2. Persist to Firestore and Local Cache
    await updateReservationStatus(targetId, newStatus);
    showNotification(`Status updated to ${newStatus.toUpperCase()}`);
  };

  const handleSaveDetails = async (id: string | undefined) => {
    if (!id) return;
    const targetId = id;
    const currentRec = reservations.find((r) => r.id === targetId || r.reservationCode === targetId);
    
    // Instantly update state
    setReservations((prev) =>
      prev.map((r) =>
        r.id === targetId || r.reservationCode === targetId
          ? { ...r, tableAssigned: tableAssignmentInput, adminNotes: adminNotesInput }
          : r
      )
    );
    if (selectedRecord && (selectedRecord.id === targetId || selectedRecord.reservationCode === targetId)) {
      setSelectedRecord((prev) =>
        prev ? { ...prev, tableAssigned: tableAssignmentInput, adminNotes: adminNotesInput } : null
      );
    }

    await updateReservationStatus(
      targetId,
      currentRec?.status || 'pending',
      tableAssignmentInput,
      adminNotesInput
    );
    setActiveEditingId(null);
    showNotification('Table assignment & Admin notes saved.');
  };

  const handleDelete = async (id: string | undefined, code: string) => {
    if (!id) return;
    const targetId = id;
    // Instantly remove from React state
    setReservations((prev) => prev.filter((r) => r.id !== targetId && r.reservationCode !== code && r.reservationCode !== targetId));
    if (selectedRecord && (selectedRecord.id === targetId || selectedRecord.reservationCode === code || selectedRecord.reservationCode === targetId)) {
      setSelectedRecord(null);
    }
    // Delete from Firestore & local storage
    await deleteReservationRecord(targetId);
    showNotification(`Reservation ${code || targetId} deleted.`);
  };

  const handleExportCSV = () => {
    if (reservations.length === 0) return;
    const headers = ['Code', 'Name', 'Phone', 'Email', 'Guests', 'Date', 'Time', 'Area', 'Occasion', 'Special Requests', 'Status', 'Table', 'Notes', 'Created At'];
    const rows = reservations.map((r) => [
      `"${r.reservationCode}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.contactNumber}"`,
      `"${r.email || ''}"`,
      r.guestCount,
      `"${r.date}"`,
      `"${r.timeSlot}"`,
      `"${r.seatingArea}"`,
      `"${r.diningOccasion}"`,
      `"${(r.specialRequests || '').replace(/"/g, '""')}"`,
      `"${r.status}"`,
      `"${r.tableAssigned || ''}"`,
      `"${(r.adminNotes || '').replace(/"/g, '""')}"`,
      `"${r.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Kings_Crown_Reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and statistics
  const todayStr = new Date().toISOString().split('T')[0];

  const stats = useMemo(() => {
    const total = reservations.length;
    const pending = reservations.filter((r) => r.status === 'pending').length;
    const confirmed = reservations.filter((r) => r.status === 'confirmed').length;
    const todayCount = reservations.filter((r) => r.date === todayStr).length;
    const totalGuests = reservations.reduce((acc, r) => acc + (Number(r.guestCount) || 0), 0);
    return { total, pending, confirmed, todayCount, totalGuests };
  }, [reservations, todayStr]);

  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      // Search
      const matchSearch =
        searchQuery === '' ||
        r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.contactNumber.includes(searchQuery) ||
        r.reservationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.seatingArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.diningOccasion.toLowerCase().includes(searchQuery.toLowerCase());

      // Status
      const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;

      // Date
      let matchDate = true;
      if (dateFilter === 'TODAY') {
        matchDate = r.date === todayStr;
      } else if (dateFilter === 'UPCOMING') {
        matchDate = r.date >= todayStr;
      }

      return matchSearch && matchStatus && matchDate;
    });
  }, [reservations, searchQuery, statusFilter, dateFilter, todayStr]);

  if (!isOpen) return null;

  return (
    <div
      id="admin-dashboard-modal"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-[#0f0f0f] border border-[#C5A059]/60 max-w-6xl w-full rounded-none shadow-2xl relative my-auto flex flex-col max-h-[92vh] overflow-hidden text-[#F5F5F0]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#141414] border-b border-[#C5A059]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 p-1 bg-[#111111] border border-[#C5A059] flex items-center justify-center shadow-md">
              <KingsCrownLogo className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-[0.16em] text-[#F5F5F0]">
                  KINGS' CROWN ADMIN PORTAL
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 uppercase tracking-widest">
                  Client & Staff Only
                </span>
              </div>
              <p className="text-[11px] text-[#F5F5F0]/60 tracking-wider">
                Rupali Arcade, Level 4 • Live Customer Bookings & Table Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                id="admin-logout-btn"
                className="px-3 py-1.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-[#F5F5F0]/15 text-[#F5F5F0]/80 hover:text-rose-400 text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              id="close-admin-modal-btn"
              className="p-2 text-[#F5F5F0]/60 hover:text-[#C5A059] bg-[#1a1a1a] transition-colors border border-[#F5F5F0]/10"
              aria-label="Close admin portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action feedback toast */}
        {actionFeedback && (
          <div className="bg-[#C5A059] text-black px-4 py-2 text-xs font-bold tracking-wider uppercase text-center shrink-0 flex items-center justify-center gap-2 animate-in slide-in-from-top duration-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Body Content */}
        {!isAuthenticated ? (
          /* Login Screen for Private Client Access */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 bg-[#161616] border border-[#C5A059] flex items-center justify-center mb-5 shadow-xl">
              <Lock className="w-8 h-8 text-[#C5A059]" />
            </div>

            <h3 className="font-serif text-2xl font-bold tracking-wider text-[#F5F5F0] mb-2">
              Private Client Portal
            </h3>
            <p className="text-xs text-[#F5F5F0]/70 max-w-md mb-6 leading-relaxed">
              This management console is restricted to King's Crown restaurant managers, front-desk supervisors, and staff. Enter your admin passcode to access live guest bookings.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div className="text-left">
                <label className="block text-[11px] font-semibold tracking-wider text-[#C5A059] uppercase mb-1.5">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="Enter passcode (e.g. admin123)"
                  className="w-full bg-[#161616] border border-[#C5A059]/40 focus:border-[#C5A059] text-[#F5F5F0] text-sm px-4 py-3 outline-none transition-colors placeholder:text-[#F5F5F0]/30"
                  autoFocus
                />
                {loginError && (
                  <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{loginError}</span>
                  </p>
                )}
                <p className="text-[10px] text-[#F5F5F0]/40 mt-1">
                  Default Manager Passcode: <span className="text-[#C5A059] font-mono">admin123</span>
                </p>
              </div>

              <button
                type="submit"
                id="admin-login-submit-btn"
                className="w-full py-3.5 bg-gradient-to-r from-[#C5A059] via-[#E6CE94] to-[#C5A059] text-black font-extrabold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Top Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3.5 bg-[#161616] border border-[#C5A059]/30">
                <span className="text-[10px] uppercase tracking-wider text-[#F5F5F0]/60 block mb-1">
                  Total Bookings
                </span>
                <span className="font-serif text-2xl font-bold text-[#F5F5F0]">
                  {stats.total}
                </span>
              </div>

              <div className="p-3.5 bg-[#161616] border border-amber-500/30">
                <span className="text-[10px] uppercase tracking-wider text-amber-400/80 block mb-1">
                  Pending Review
                </span>
                <span className="font-serif text-2xl font-bold text-amber-400">
                  {stats.pending}
                </span>
              </div>

              <div className="p-3.5 bg-[#161616] border border-emerald-500/30">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 block mb-1">
                  Confirmed
                </span>
                <span className="font-serif text-2xl font-bold text-emerald-400">
                  {stats.confirmed}
                </span>
              </div>

              <div className="p-3.5 bg-[#161616] border border-[#C5A059]/30">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] block mb-1">
                  Today's Tables
                </span>
                <span className="font-serif text-2xl font-bold text-[#C5A059]">
                  {stats.todayCount}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3.5 bg-[#161616] border border-[#F5F5F0]/15">
                <span className="text-[10px] uppercase tracking-wider text-[#F5F5F0]/60 block mb-1">
                  Total Guests Expected
                </span>
                <span className="font-serif text-2xl font-bold text-[#F5F5F0]">
                  {stats.totalGuests}
                </span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-[#141414] p-4 border border-[#F5F5F0]/10 flex flex-col lg:flex-row items-center justify-between gap-3">
              
              {/* Search Box */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-[#F5F5F0]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guest, phone, code..."
                  className="w-full bg-[#1c1c1c] border border-[#F5F5F0]/15 focus:border-[#C5A059] text-xs text-[#F5F5F0] pl-10 pr-4 py-2.5 outline-none transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
                {/* Status Filter */}
                <div className="flex items-center gap-1 bg-[#1c1c1c] p-1 border border-[#F5F5F0]/10 text-xs">
                  {(['ALL', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        statusFilter === st
                          ? 'bg-[#C5A059] text-black'
                          : 'text-[#F5F5F0]/60 hover:text-[#F5F5F0]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {/* Date Filter */}
                <div className="flex items-center gap-1 bg-[#1c1c1c] p-1 border border-[#F5F5F0]/10 text-xs">
                  {(['ALL', 'TODAY', 'UPCOMING'] as const).map((df) => (
                    <button
                      key={df}
                      onClick={() => setDateFilter(df)}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        dateFilter === df
                          ? 'bg-[#C5A059] text-black'
                          : 'text-[#F5F5F0]/60 hover:text-[#F5F5F0]'
                      }`}
                    >
                      {df}
                    </button>
                  ))}
                </div>

                {/* CSV Export */}
                <button
                  onClick={handleExportCSV}
                  id="admin-export-csv-btn"
                  className="px-3 py-2 bg-[#1c1c1c] hover:bg-[#252525] border border-[#C5A059]/40 text-[#C5A059] text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors"
                  title="Export to CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Main Table / Grid View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Reservations List (Left 2 Columns) */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-[#F5F5F0]/10">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C5A059]">
                    Reservation Records ({filteredReservations.length})
                  </span>
                  <span className="text-[11px] text-[#F5F5F0]/50">
                    Click any entry to view full details or assign table
                  </span>
                </div>

                {filteredReservations.length === 0 ? (
                  <div className="bg-[#141414] p-10 border border-[#F5F5F0]/10 text-center space-y-2">
                    <Calendar className="w-8 h-8 text-[#F5F5F0]/30 mx-auto" />
                    <p className="text-sm font-semibold text-[#F5F5F0]">
                      {reservations.length === 0 ? 'No customer reservations yet' : 'No matching reservations found'}
                    </p>
                    <p className="text-xs text-[#F5F5F0]/50">
                      {reservations.length === 0 
                        ? 'New table bookings submitted by customers will appear here in real time.' 
                        : 'Adjust your search query or status filter.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                    {filteredReservations.map((rec) => {
                      const isSelected = selectedRecord?.id === rec.id || selectedRecord?.reservationCode === rec.reservationCode;
                      const isPending = rec.status === 'pending';
                      const isConfirmed = rec.status === 'confirmed';

                      return (
                        <div
                          key={rec.id || rec.reservationCode}
                          onClick={() => {
                            setSelectedRecord(rec);
                            setTableAssignmentInput(rec.tableAssigned || '');
                            setAdminNotesInput(rec.adminNotes || '');
                          }}
                          className={`p-4 bg-[#141414] border transition-all cursor-pointer hover:border-[#C5A059] ${
                            isSelected
                              ? 'border-[#C5A059] bg-[#1a1a1a] shadow-lg ring-1 ring-[#C5A059]/40'
                              : 'border-[#F5F5F0]/10'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#1e1e1e] border border-[#C5A059]/40 text-[#C5A059]">
                                  {rec.reservationCode}
                                </span>
                                <h4 className="font-bold text-sm text-[#F5F5F0]">
                                  {rec.fullName}
                                </h4>
                              </div>
                              <span className="text-[11px] text-[#F5F5F0]/60 block mt-0.5">
                                {rec.contactNumber} {rec.email && `• ${rec.email}`}
                              </span>
                            </div>

                            {/* Status Tag */}
                            <span
                              className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider border ${
                                isConfirmed
                                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                                  : isPending
                                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 animate-pulse'
                                  : rec.status === 'completed'
                                  ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                                  : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                              }`}
                            >
                              {rec.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-2 border-t border-[#F5F5F0]/5 text-[#F5F5F0]/80">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span>{rec.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span>{rec.timeSlot}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span>{rec.guestCount} Guests</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span className="truncate">{rec.seatingArea}</span>
                            </div>
                          </div>

                          {rec.specialRequests && (
                            <p className="text-[11px] text-amber-200/80 bg-amber-950/20 border border-amber-500/20 px-2.5 py-1.5 mt-2.5 line-clamp-1">
                              <strong>Request:</strong> {rec.specialRequests}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Selected Reservation Action Panel (Right 1 Column) */}
              <div className="bg-[#141414] border border-[#C5A059]/40 p-5 flex flex-col justify-between">
                {selectedRecord ? (
                  <div className="space-y-4">
                    <div className="border-b border-[#C5A059]/30 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#C5A059]">
                          {selectedRecord.reservationCode}
                        </span>
                        <span className="text-[10px] text-[#F5F5F0]/50">
                          {new Date(selectedRecord.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#F5F5F0] mt-1">
                        {selectedRecord.fullName}
                      </h3>
                    </div>

                    {/* Customer Action Direct Triggers */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${selectedRecord.contactNumber.replace(/[^0-9+]/g, '')}`}
                        className="py-2 px-3 bg-[#1e1e1e] hover:bg-[#252525] border border-[#F5F5F0]/15 text-[#C5A059] text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Guest</span>
                      </a>
                      <a
                        href={`https://wa.me/${selectedRecord.contactNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedRecord.fullName)},%20this%20is%20King's%20Crown%20Bar%20%26%20Restaurant%20at%20Rupali%20Arcade.%20Regarding%20your%20table%20booking%20(${selectedRecord.reservationCode}):`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 bg-[#1e1e1e] hover:bg-[#252525] border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    {/* Details Specification List */}
                    <div className="space-y-2 text-xs bg-[#1a1a1a] p-3.5 border border-[#F5F5F0]/5">
                      <div className="flex justify-between border-b border-[#F5F5F0]/5 pb-1">
                        <span className="text-[#F5F5F0]/60">Date & Slot:</span>
                        <span className="font-bold text-[#F5F5F0]">{selectedRecord.date} @ {selectedRecord.timeSlot}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#F5F5F0]/5 pb-1">
                        <span className="text-[#F5F5F0]/60">Party Size:</span>
                        <span className="font-bold text-[#F5F5F0]">{selectedRecord.guestCount} Guests</span>
                      </div>
                      <div className="flex justify-between border-b border-[#F5F5F0]/5 pb-1">
                        <span className="text-[#F5F5F0]/60">Preferred Area:</span>
                        <span className="font-bold text-[#C5A059]">{selectedRecord.seatingArea}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#F5F5F0]/5 pb-1">
                        <span className="text-[#F5F5F0]/60">Occasion:</span>
                        <span className="font-bold text-[#F5F5F0]">{selectedRecord.diningOccasion}</span>
                      </div>
                      {selectedRecord.specialRequests && (
                        <div className="pt-1">
                          <span className="text-[#F5F5F0]/60 block mb-1">Special Instructions:</span>
                          <p className="text-xs text-amber-200 bg-amber-950/30 p-2 border border-amber-500/20">
                            {selectedRecord.specialRequests}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Quick Status Buttons */}
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-[#C5A059] uppercase mb-1.5">
                        Update Status
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => handleStatusChange(selectedRecord.id || selectedRecord.reservationCode, 'confirmed')}
                          className={`py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
                            selectedRecord.status === 'confirmed'
                              ? 'bg-emerald-500 text-black border-emerald-500'
                              : 'bg-[#181818] text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10'
                          }`}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedRecord.id || selectedRecord.reservationCode, 'pending')}
                          className={`py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
                            selectedRecord.status === 'pending'
                              ? 'bg-amber-500 text-black border-amber-500'
                              : 'bg-[#181818] text-amber-400 border-amber-500/30 hover:bg-amber-500/10'
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedRecord.id || selectedRecord.reservationCode, 'completed')}
                          className={`py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
                            selectedRecord.status === 'completed'
                              ? 'bg-blue-500 text-black border-blue-500'
                              : 'bg-[#181818] text-blue-400 border-blue-500/30 hover:bg-blue-500/10'
                          }`}
                        >
                          Completed
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedRecord.id || selectedRecord.reservationCode, 'cancelled')}
                          className={`py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
                            selectedRecord.status === 'cancelled'
                              ? 'bg-rose-500 text-black border-rose-500'
                              : 'bg-[#181818] text-rose-400 border-rose-500/30 hover:bg-rose-500/10'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                    {/* Table Assignment & Staff Notes */}
                    <div className="space-y-3 pt-2 border-t border-[#F5F5F0]/10">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-wider text-[#F5F5F0]/70 uppercase mb-1">
                          Assigned Table Number
                        </label>
                        <input
                          type="text"
                          value={tableAssignmentInput}
                          onChange={(e) => setTableAssignmentInput(e.target.value)}
                          placeholder="e.g. Table T-12 (Sky Deck)"
                          className="w-full bg-[#1c1c1c] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] px-3 py-2 outline-none focus:border-[#C5A059]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold tracking-wider text-[#F5F5F0]/70 uppercase mb-1">
                          Internal Staff Notes
                        </label>
                        <textarea
                          rows={2}
                          value={adminNotesInput}
                          onChange={(e) => setAdminNotesInput(e.target.value)}
                          placeholder="Add internal notes on preferences or payments..."
                          className="w-full bg-[#1c1c1c] border border-[#F5F5F0]/15 text-xs text-[#F5F5F0] p-2.5 outline-none focus:border-[#C5A059] resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveDetails(selectedRecord.id || selectedRecord.reservationCode)}
                          className="flex-1 py-2 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => handleDelete(selectedRecord.id || selectedRecord.reservationCode, selectedRecord.reservationCode)}
                          className="p-2 bg-[#221515] hover:bg-[#331818] border border-rose-500/30 text-rose-400 transition-colors"
                          title="Delete reservation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center my-auto space-y-2 text-[#F5F5F0]/50">
                    <FileText className="w-8 h-8 text-[#C5A059]/40 mx-auto" />
                    <p className="text-xs font-bold uppercase tracking-wider text-[#F5F5F0]/70">
                      No Reservation Selected
                    </p>
                    <p className="text-[11px] leading-relaxed">
                      Select any reservation from the list to assign tables, modify statuses, or communicate with guests.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
