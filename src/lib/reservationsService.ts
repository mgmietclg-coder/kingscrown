// ============================================================================
// Table Bookings Service (Firebase Firestore)
// ============================================================================
// This file handles all data operations with Firebase Firestore for the "Book a Table"
// feature and the Admin Dashboard.
//
// Target Firestore Collection: "TableBookings"
// Fields Stored:
//   - full_name (String)
//   - whatsapp_contact (String)
//   - number_of_guests (String/Number)
//   - reservation_date (String/Date)
//   - preferred_time_slot (String)
//   - seating_area_preference (String)
//   - occasion (String - Optional)
//   - special_requests (String)
//   - booking_status (String - Default: "Pending")
//   - created_at (Timestamp)
// ============================================================================

import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { ReservationRecord, ReservationStatus } from '../types';

// The Firestore collection name specified in the requirements
export const TABLE_BOOKINGS_COLLECTION = 'TableBookings';

// Local storage key for offline caching & fast instant UI response
const LOCAL_STORAGE_KEY = 'kings_crown_table_bookings_cache';

/**
 * Shape of data stored directly in Firestore's "TableBookings" collection
 */
export interface TableBookingFirestoreDoc {
  id?: string;
  full_name: string;
  whatsapp_contact: string;
  number_of_guests: number | string;
  reservation_date: string;
  preferred_time_slot: string;
  seating_area_preference: string;
  occasion?: string;
  special_requests: string;
  booking_status: string; // "Pending" | "Confirmed" | "Completed" | "Cancelled"
  created_at: any; // Firestore serverTimestamp or ISO Date string
  reservation_code?: string;
  table_assigned?: string;
  admin_notes?: string;
  updated_at?: string;
}

/**
 * Helper: Read locally cached bookings (used for offline resilience & fast load)
 */
export const getLocalReservations = (): ReservationRecord[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed: ReservationRecord[] = JSON.parse(raw);
      // Clean out any legacy mock entries
      const cleaned = parsed.filter(
        (item) => item.id && !item.id.startsWith('sample-')
      );
      if (cleaned.length !== parsed.length) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleaned));
      }
      return cleaned;
    }
  } catch (e) {
    console.error('Error reading local reservations:', e);
  }
  return [];
};

/**
 * Helper: Save bookings to local storage
 */
export const saveLocalReservations = (items: ReservationRecord[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving local reservations:', e);
  }
};

/**
 * Helper: Convert a Firestore Document into our UI ReservationRecord structure
 */
const mapFirestoreDocToRecord = (id: string, data: any): ReservationRecord => {
  // Convert Firestore Timestamp or ISO string to standard ISO date string
  let createdDateIso = new Date().toISOString();
  if (data.created_at) {
    if (typeof data.created_at.toDate === 'function') {
      createdDateIso = data.created_at.toDate().toISOString();
    } else if (typeof data.created_at === 'string') {
      createdDateIso = data.created_at;
    }
  }

  // Normalize status to lowercase for UI filter buttons
  const rawStatus = (data.booking_status || data.status || 'Pending').toLowerCase();
  let normalizedStatus: ReservationStatus = 'pending';
  if (rawStatus === 'confirmed') normalizedStatus = 'confirmed';
  else if (rawStatus === 'completed') normalizedStatus = 'completed';
  else if (rawStatus === 'cancelled') normalizedStatus = 'cancelled';

  return {
    id: id,
    reservationCode: data.reservation_code || data.reservationCode || `KC-${id.substring(0, 4).toUpperCase()}`,
    fullName: data.full_name || data.fullName || 'Guest',
    contactNumber: data.whatsapp_contact || data.contactNumber || '',
    email: data.email || '',
    guestCount: data.number_of_guests ?? data.guestCount ?? 2,
    date: data.reservation_date || data.date || new Date().toISOString().split('T')[0],
    timeSlot: data.preferred_time_slot || data.timeSlot || '7:30 PM',
    seatingArea: data.seating_area_preference || data.seatingArea || "Queen's Sky Deck (Rooftop)",
    diningOccasion: data.occasion || data.diningOccasion || 'Casual Dining',
    specialRequests: data.special_requests ?? data.specialRequests ?? '',
    status: normalizedStatus,
    tableAssigned: data.table_assigned || data.tableAssigned || '',
    adminNotes: data.admin_notes || data.adminNotes || '',
    createdAt: createdDateIso,
    updatedAt: data.updated_at || data.updatedAt
  };
};

/**
 * STEP 1: Save a new table reservation to Firebase Firestore
 * 
 * Takes the form inputs and writes a new document to the "TableBookings" collection
 * with all required fields (full_name, whatsapp_contact, number_of_guests, etc.).
 */
export const createTableBooking = async (params: {
  fullName: string;
  whatsappContact: string;
  numberOfGuests: number | string;
  reservationDate: string;
  preferredTimeSlot: string;
  seatingAreaPreference: string;
  occasion?: string;
  specialRequests?: string;
  reservationCode?: string;
}): Promise<{ docId: string; reservationCode: string }> => {
  // Generate a unique 4-digit booking code if not provided
  const reservationCode = params.reservationCode || `KC-${Math.floor(1000 + Math.random() * 9000)}`;

  // Prepare Firestore document data matching the exact required schema
  const bookingData = {
    full_name: params.fullName.trim(),
    whatsapp_contact: params.whatsappContact.trim(),
    number_of_guests: params.numberOfGuests,
    reservation_date: params.reservationDate,
    preferred_time_slot: params.preferredTimeSlot,
    seating_area_preference: params.seatingAreaPreference,
    occasion: params.occasion?.trim() || 'Casual Dining',
    special_requests: params.specialRequests?.trim() || '',
    booking_status: 'Pending', // Default required status: "Pending"
    created_at: serverTimestamp(), // Firestore server-side timestamp
    reservation_code: reservationCode,
    table_assigned: '',
    admin_notes: '',
    updated_at: new Date().toISOString()
  };

  // 1. Instantly update local cache for instant UI feedback
  const localRecord: ReservationRecord = {
    id: `temp_${Date.now()}`,
    reservationCode: reservationCode,
    fullName: bookingData.full_name,
    contactNumber: bookingData.whatsapp_contact,
    guestCount: bookingData.number_of_guests,
    date: bookingData.reservation_date,
    timeSlot: bookingData.preferred_time_slot,
    seatingArea: bookingData.seating_area_preference,
    diningOccasion: bookingData.occasion,
    specialRequests: bookingData.special_requests,
    status: 'pending',
    tableAssigned: '',
    adminNotes: '',
    createdAt: new Date().toISOString()
  };
  const existingLocal = getLocalReservations();
  saveLocalReservations([localRecord, ...existingLocal]);

  // 2. Save directly to Firebase Firestore collection "TableBookings"
  try {
    const docRef = await addDoc(collection(db, TABLE_BOOKINGS_COLLECTION), bookingData);
    console.log(`[Firestore] Successfully saved booking to "${TABLE_BOOKINGS_COLLECTION}" with ID:`, docRef.id);
    
    // Update local cached ID with the real Firestore ID
    localRecord.id = docRef.id;
    saveLocalReservations([localRecord, ...existingLocal]);

    return {
      docId: docRef.id,
      reservationCode
    };
  } catch (error: any) {
    console.error(`[Firestore Error] Could not save to "${TABLE_BOOKINGS_COLLECTION}":`, error);
    // Throw error so the form component can catch and show a user-friendly error message if needed
    throw error;
  }
};

/**
 * Backward-compatible wrapper for createTableBooking
 */
export const createReservation = async (reservation: Omit<ReservationRecord, 'id'>): Promise<string> => {
  const result = await createTableBooking({
    fullName: reservation.fullName,
    whatsappContact: reservation.contactNumber,
    numberOfGuests: reservation.guestCount,
    reservationDate: reservation.date,
    preferredTimeSlot: reservation.timeSlot,
    seatingAreaPreference: reservation.seatingArea,
    occasion: reservation.diningOccasion,
    specialRequests: reservation.specialRequests,
    reservationCode: reservation.reservationCode
  });
  return result.docId;
};

/**
 * STEP 2: Real-time listener for Admin Dashboard to fetch bookings from Firestore
 *
 * Listens to changes in the "TableBookings" collection in real time.
 * Whenever a new customer books a table or status is updated, the admin portal
 * automatically updates without needing a manual refresh.
 */
export const subscribeToReservations = (callback: (reservations: ReservationRecord[]) => void) => {
  let unsubscribeFirestore = () => {};

  try {
    // Query "TableBookings" collection
    const bookingsQuery = query(
      collection(db, TABLE_BOOKINGS_COLLECTION),
      orderBy('created_at', 'desc')
    );

    unsubscribeFirestore = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: ReservationRecord[] = snapshot.docs.map((docSnap) => 
            mapFirestoreDocToRecord(docSnap.id, docSnap.data())
          );

          // Merge any unsynced local offline bookings
          const local = getLocalReservations();
          const combined = [...list];
          local.forEach((loc) => {
            if (!combined.some((c) => c.id === loc.id || c.reservationCode === loc.reservationCode)) {
              combined.push(loc);
            }
          });

          callback(combined);
        } else {
          // If Firestore is empty, return local records (or empty array)
          callback(getLocalReservations());
        }
      },
      (error) => {
        console.warn(`[Firestore onSnapshot Note] fallback to local cache:`, error.message);
        callback(getLocalReservations());
      }
    );
  } catch (err) {
    console.warn(`[Firestore subscription fallback]:`, err);
    callback(getLocalReservations());
  }

  // Cross-browser/tab storage event listener
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === LOCAL_STORAGE_KEY) {
      callback(getLocalReservations());
    }
  };
  window.addEventListener('storage', handleStorageChange);

  return () => {
    unsubscribeFirestore();
    window.removeEventListener('storage', handleStorageChange);
  };
};

/**
 * STEP 3: Update booking status, assigned table, and notes in Firestore
 */
export const updateReservationStatus = async (
  id: string,
  status: ReservationStatus,
  tableAssigned?: string,
  adminNotes?: string
) => {
  // Map lowercase UI status to capitalized display string ("Pending", "Confirmed", "Completed", "Cancelled")
  const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  // 1. Update in local storage
  const list = getLocalReservations();
  const updated = list.map((item) => {
    if (item.id === id || item.reservationCode === id) {
      return {
        ...item,
        status,
        ...(tableAssigned !== undefined ? { tableAssigned } : {}),
        ...(adminNotes !== undefined ? { adminNotes } : {}),
        updatedAt: new Date().toISOString()
      };
    }
    return item;
  });
  saveLocalReservations(updated);

  // 2. Update document in Firestore collection "TableBookings"
  try {
    const updatePayload: any = {
      booking_status: capitalizedStatus,
      updated_at: new Date().toISOString()
    };
    if (tableAssigned !== undefined) updatePayload.table_assigned = tableAssigned;
    if (adminNotes !== undefined) updatePayload.admin_notes = adminNotes;

    // Try direct doc update first
    if (id && !id.startsWith('temp_') && !id.startsWith('rec_') && !id.startsWith('KC-')) {
      const docRef = doc(db, TABLE_BOOKINGS_COLLECTION, id);
      await updateDoc(docRef, updatePayload);
      console.log(`[Firestore] Updated booking ${id} status to ${capitalizedStatus}`);
    } else {
      // If id is a reservation code or custom ID, query Firestore by reservation_code
      const q = query(collection(db, TABLE_BOOKINGS_COLLECTION), where('reservation_code', '==', id));
      const querySnap = await getDocs(q);
      querySnap.forEach(async (d) => {
        await updateDoc(d.ref, updatePayload);
        console.log(`[Firestore] Updated booking by code ${id} -> ${d.id}`);
      });
    }
  } catch (err) {
    console.warn('[Firestore update warning]:', err);
  }
};

/**
 * STEP 4: Delete a booking from Firestore
 */
export const deleteReservationRecord = async (id: string) => {
  // 1. Remove from local cache immediately
  const list = getLocalReservations();
  const filtered = list.filter((item) => item.id !== id && item.reservationCode !== id);
  saveLocalReservations(filtered);

  // 2. Delete from Firestore collection "TableBookings"
  try {
    if (id && !id.startsWith('temp_') && !id.startsWith('rec_') && !id.startsWith('KC-')) {
      const docRef = doc(db, TABLE_BOOKINGS_COLLECTION, id);
      await deleteDoc(docRef);
      console.log(`[Firestore] Deleted booking ${id}`);
    } else {
      // Search by reservation_code if needed
      const q = query(collection(db, TABLE_BOOKINGS_COLLECTION), where('reservation_code', '==', id));
      const querySnap = await getDocs(q);
      querySnap.forEach(async (d) => {
        await deleteDoc(d.ref);
        console.log(`[Firestore] Deleted booking by code ${id} -> ${d.id}`);
      });
    }
  } catch (err) {
    console.warn('[Firestore delete warning]:', err);
  }
};
