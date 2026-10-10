/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ==========================================
// 1. UTILISATEURS & AUTHENTIFICATION
// ==========================================

export type UserRole = 'TRAVELER' | 'AGENT' | 'COMPANY_MANAGER' | 'ADMIN';

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';

/**
 * Modèle Utilisateur sécurisé (aucun mot de passe ni jeton secret n'y figure)
 */
export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  status: UserStatus;
  companyId?: string; // Obligatoire pour AGENT et COMPANY_MANAGER
  assignedAgencyId?: string; // Optionnel pour AGENT de gare
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Rétrocompatibilité avec UserProfile
export type UserProfile = User;

/**
 * Session d'authentification sécurisée
 */
export interface AuthSession {
  token: string;
  userId: string;
  role: UserRole;
  companyId?: string;
  issuedAt: string;     // ISO 8601 UTC
  expiresAt: string;    // ISO 8601 UTC
  ipAddress?: string;
  userAgent?: string;
  isSimulatedDemo: boolean;
}

// ==========================================
// 2. PERMISSIONS & RBAC
// ==========================================

export type Permission =
  // Voyageur
  | 'TRIP_SEARCH'
  | 'TRIP_VIEW_DETAILS'
  | 'BOOKING_CREATE'
  | 'BOOKING_VIEW_OWN'
  | 'BOOKING_CANCEL_OWN'
  | 'PAYMENT_INITIATE'
  | 'TICKET_VIEW_OWN'
  | 'TICKET_DOWNLOAD_OWN'
  | 'PROFILE_MANAGE_OWN'
  // Agent de gare
  | 'AGENT_VIEW_ASSIGNED_TRIPS'
  | 'TICKET_SCAN_AND_VALIDATE'
  | 'BOARDING_REGISTER'
  // Responsable Compagnie
  | 'COMPANY_VIEW_OWN'
  | 'COMPANY_UPDATE_OWN'
  | 'AGENCY_MANAGE_OWN'
  | 'BUS_MANAGE_OWN'
  | 'TRIP_CREATE_OWN'
  | 'TRIP_UPDATE_OWN'
  | 'TRIP_CANCEL_OWN'
  | 'BOOKING_VIEW_COMPANY'
  | 'REVENUE_VIEW_COMPANY'
  | 'AGENT_MANAGE_COMPANY'
  // Administrateur central
  | 'ADMIN_SUPERVISION_ALL'
  | 'COMPANY_APPROVE'
  | 'COMPANY_REJECT'
  | 'COMPANY_SUSPEND'
  | 'COMPANY_REACTIVATE'
  | 'ALL_USERS_MANAGE'
  | 'ALL_TRANSACTIONS_VIEW'
  | 'AUDIT_LOGS_VIEW';

// ==========================================
// 3. COMPAGNIES & AGENCES
// ==========================================

export type CompanyStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED';

export interface Company {
  id: string;
  name: string;
  tradeName: string;
  logoUrl?: string;
  headquarters: string;
  city?: string;
  region?: string;
  country?: string; // Toujours 'Burkina Faso' par défaut
  phone: string;
  whatsapp: string;
  managerName: string;
  managerEmail: string;
  managerRole?: string;
  ifuNumber?: string;
  rccmNumber?: string;
  companyType?: string;
  description?: string;
  merchantCode?: string;
  servedCities?: string[];
  status: CompanyStatus;
  rejectionReason?: string;
  suspensionReason?: string;
  fleetCount: number;
  rating: number;
  supportingDocuments?: {
    rccmDoc?: string;
    transportLicenseDoc?: string;
    identityDoc?: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export type AgencyStatus = 'ACTIVE' | 'INACTIVE';

export interface Agency {
  id: string;
  companyId: string;
  name: string;
  code: string;
  address: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  // Alias de compatibilité
  lat?: number;
  lng?: number;
  phone: string;
  openingHours: string;
  status: AgencyStatus;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 4. ITINÉRAIRES, BUS & DÉPARTS
// ==========================================

export type RouteStatus = 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';

export interface Route {
  id: string;
  companyId: string;
  departureCity: string;
  destinationCity: string;
  departureAgencyId?: string;
  arrivalAgencyId?: string;
  estimatedDurationMinutes: number;
  distanceKm?: number;
  stops?: string[];
  status: RouteStatus;
  createdAt: string;
  updatedAt: string;
}

export type BusCategory = 'STANDARD' | 'CONFORT' | 'VIP';
export type BusStatus = 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE';

export interface Bus {
  id: string;
  companyId: string;
  agencyId?: string;
  registrationNumber: string; // Ex: 11-JJ-4567 BF
  // Alias de compatibilité
  registrationPlate?: string;
  fleetNumber: string;        // Ex: BUS-01
  brand: string;              // Ex: Scania, Mercedes, Yutong, Marcopolo
  model: string;              // Ex: Touring HD 2024
  manufactureYear?: number;
  seatCapacity: number;       // Entier positif strict
  totalSeats?: number;        // Alias
  seatLayout: '2x2' | '2x1' | 'VIP';
  category: BusCategory;
  amenities: string[];
  status: BusStatus;
  createdAt: string;
  updatedAt: string;
}

export type TripStatus =
  | 'DRAFT'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'BOARDING'
  | 'DEPARTED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface DepartureTrip {
  id: string;
  companyId: string;
  routeId?: string;
  busId?: string;
  departureCity: string;
  destinationCity: string;
  departureAgency: string;
  arrivalAgency: string;
  departureAgencyId?: string;
  arrivalAgencyId?: string;
  departureTime: string; // Format "HH:mm"
  arrivalTime: string;   // Format "HH:mm"
  date: string;          // Format "YYYY-MM-DD"
  priceXOF: number;      // Entier positif strict en Francs CFA
  busType: string;
  amenities: string[];
  totalSeats: number;
  availableSeatsCount: number;
  status: TripStatus;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyRegistrationInput {
  // A. Identité
  name: string;
  tradeName: string;
  companyType: string;
  ifuNumber: string;
  rccmNumber: string;
  establishedYear?: string;
  description: string;
  logoUrl?: string;
  headquartersAddress: string;
  city: string;
  region: string;
  country: string; // 'Burkina Faso'

  // B. Responsable
  managerName: string;
  managerRole: string;
  phone: string;
  email: string;
  professionalAddress: string;
  desiredUsername: string;

  // C. Connexion
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  dataConsentAccepted: boolean;

  // D. Coordonnées & Services
  whatsapp: string;
  secondaryPhone?: string;
  acceptedPaymentMethods: ('ORANGE_MONEY' | 'MOOV_MONEY' | 'WAVE')[];
  merchantCode?: string;
  websiteUrl?: string;

  // E. Opérationnel
  estimatedVehicles: number;
  estimatedSeats: number;
  agenciesCount: number;
  servedCities: string[];
  mainRoutes: string[];
  serviceCategories: BusCategory[];

  // F. Justificatifs
  rccmDocName?: string;
  transportLicenseDocName?: string;
  identityDocName?: string;
}

export type SeatStatus = 'AVAILABLE' | 'SELECTED' | 'LOCKED' | 'OCCUPIED';

export type SeatType = 'STANDARD' | 'VIP' | 'WINDOW' | 'AISLE';

export interface Seat {
  id: string;
  busId: string;
  seatNumber: number;
  row: number;
  column: number;
  seatType: SeatType;
  isBookable: boolean;
  status?: SeatStatus; // Calculé dynamiquement côté serveur
}

export interface BusSeat {
  seatNumber: number;
  status: SeatStatus;
  row: number;
  col: number; // 0: fenêtre gauche, 1: couloir gauche, 2: allée centrale, 3: couloir droit, 4: fenêtre droite
  priceXOF: number;
}

export type SeatLayoutType = '2+2' | '2+3' | '2+1_VIP' | 'CUSTOM';

export interface BusSeatLayout {
  busId: string;
  busType: string;
  layoutType: SeatLayoutType;
  totalSeats: number;
  seatsPerRow: number;
  rowCount: number;
  seats: Seat[];
}

export type SeatHoldStatus = 'ACTIVE' | 'CONSUMED' | 'RELEASED' | 'EXPIRED';

export interface SeatHold {
  id: string;
  departureTripId: string;
  seatIds: number[];
  travelerId: string;
  status: SeatHoldStatus;
  createdAt: string;       // ISO 8601 UTC
  expiresAt: string;       // ISO 8601 UTC (createdAt + 600s = 10 minutes)
  idempotencyKey: string;
}

export type TripSortOption = 'PRICE_ASC' | 'PRICE_DESC' | 'TIME_ASC' | 'DURATION_ASC';

export interface TripSearchQuery {
  originCityId?: string;
  originCity: string;
  destinationCityId?: string;
  destinationCity: string;
  departureDate: string; // YYYY-MM-DD
  passengerCount: number;
  category?: BusCategory;
  maxPriceXof?: number;
  departureTimeRange?: {
    startHour: number;
    endHour: number;
  };
  amenities?: string[];
  sortBy?: TripSortOption;
}

// ==========================================
// 5. RÉSERVATIONS & PAIEMENTS
// ==========================================

export type BookingStatus =
  | 'PENDING'
  | 'HELD'
  | 'AWAITING_PAYMENT'
  | 'CONFIRMED'
  | 'TICKET_GENERATED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'COMPLETED';

export interface BookingOrder {
  id: string;
  reference: string;          // Ex: TSR-BK-882190
  bookingRef: string;         // Alias de compatibilité
  departureTripId: string;
  tripId: string;             // Alias de compatibilité
  companyId: string;
  travelerId: string;
  userId: string;             // Alias de compatibilité
  passengerName: string;
  passengerPhone: string;
  seatIds: number[];
  selectedSeats: number[];    // Alias de compatibilité
  passengerCount: number;
  unitPriceXof: number;
  unitPriceXOF: number;       // Alias de compatibilité
  totalPriceXof: number;
  totalAmountXOF: number;     // Alias de compatibilité
  currency: 'XOF';
  status: BookingStatus;
  seatHoldId?: string;
  lockExpiresAt?: string;
  paymentRef?: string;
  createdAt: string;
  expiresAt?: string;
  updatedAt?: string;
}

export type PaymentMethod = 'ORANGE_MONEY' | 'MOOV_MONEY' | 'WAVE';

export type PaymentStatus =
  | 'INITIATED'
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'EXPIRED';

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  companyId?: string;
  externalRef: string;
  amountXOF: number;
  currency: 'XOF';
  paymentMethod: PaymentMethod;
  payerPhone: string;
  status: PaymentStatus;
  initiatedAt: string;
  confirmedAt?: string;
  failureReason?: string;
}

// ==========================================
// 6. BILLETS ÉLECTRONIQUES & QR CODES
// ==========================================

export type TicketStatus = 'VALID' | 'USED' | 'CANCELLED' | 'EXPIRED';

export interface ElectronicTicket {
  id: string;
  ticketNumber: string; // Ex: TSR-BF-2026-8819
  bookingId: string;
  tripId: string;
  companyId?: string;
  companyName: string;
  passengerName: string;
  seatNumbers: number[];
  departureCity: string;
  destinationCity: string;
  departureAgency: string;
  travelDate: string;
  departureTime: string;
  amountPaidXOF: number;
  status: TicketStatus;
  qrPayload: string;
  securityToken: string;
  validatedAt?: string;
  validatedByAgentId?: string;
  createdAt: string;
}

// ==========================================
// 7. JOURNAL D'AUDIT & SÉCURITÉ
// ==========================================

export type AuditActionType =
  | 'AUTH_LOGIN'
  | 'AUTH_LOGIN_FAILED'
  | 'AUTH_LOGOUT'
  | 'AUTH_REGISTER'
  | 'AUTH_SESSION_EXPIRED'
  | 'PERMISSION_DENIED'
  | 'COMPANY_REGISTER_SUBMITTED'
  | 'COMPANY_APPROVED'
  | 'COMPANY_REJECTED'
  | 'COMPANY_SUSPENDED'
  | 'COMPANY_REACTIVATED'
  | 'TRIP_CREATED'
  | 'TRIP_CANCELLED'
  | 'TRIP_SEARCH'
  | 'SEAT_LOCK_ACQUIRED'
  | 'SEAT_LOCK_RELEASED'
  | 'SEAT_HOLD_ACQUIRED'
  | 'SEAT_HOLD_RELEASED'
  | 'SEAT_CONFLICT_DETECTED'
  | 'BOOKING_CREATED'
  | 'BOOKING_PROVISIONAL_CREATED'
  | 'BOOKING_CONFIRMED'
  | 'BOOKING_CANCELLED'
  | 'PAYMENT_INITIATED'
  | 'PAYMENT_CONFIRMED'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_EXPIRED_HOLD_REJECTED'
  | 'WEBHOOK_SIGNATURE_INVALID'
  | 'TICKET_GENERATED'
  | 'TICKET_ISSUED'
  | 'TICKET_ISSUANCE_REJECTED_UNPAID'
  | 'TICKET_SCANNED_VALID'
  | 'TICKET_SCANNED_DUPLICATE_ALERT'
  | 'TICKET_SCANNED_INVALID'
  | 'BOARDING_VALIDATION_UNAUTHORIZED'
  | 'SECURITY_QR_FORGERY_DETECTED'
  | 'SECURITY_PRICE_TAMPERING_ATTEMPT'
  | 'ISOLATION_VIOLATION_BOARDING'
  | 'DOUBLE_BOARDING_ATTEMPT_BLOCKED'
  | 'TICKET_BOARDED_SUCCESS'
  | 'PRIVACY_VIOLATION_ATTEMPT';

export type AuditResourceType =
  | 'USER'
  | 'COMPANY'
  | 'TRIP'
  | 'SEAT'
  | 'BOOKING'
  | 'PAYMENT'
  | 'TICKET'
  | 'SESSION'
  | 'SYSTEM';

export type AuditResult = 'SUCCESS' | 'FAILURE' | 'WARNING';

export interface AuditLog {
  id: string;
  timestamp: string; // UTC ISO 8601
  actorId: string;
  actorRole: UserRole | 'SYSTEM';
  action: AuditActionType;
  resourceType: AuditResourceType;
  resourceId?: string;
  targetId?: string;
  companyId?: string;
  result?: AuditResult;
  status?: AuditResult;
  reason?: string;
  correlationId?: string;
  ipAddress?: string;
  details?: Record<string, unknown> | string;
}

// ==========================================
// 8. NOTIFICATIONS & API RESPONSES
// ==========================================

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'BOOKING' | 'PAYMENT' | 'ALERT' | 'TRIP' | 'SYSTEM';
  timestamp: string;
  read: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  correlationId: string;
  timestamp: string;
}

// ==========================================
// 9. ÉCRANS APPLICATIFS
// ==========================================

export type ScreenId =
  | '01_SPLASH'
  | '02_PUBLIC_HOME'
  | '03_LOGIN'
  | '04_REGISTER'
  | '05_SEARCH_TRIP'
  | '06_SEARCH_RESULTS'
  | '07_TRIP_DETAILS'
  | '08_SEAT_SELECTION'
  | '09_PAYMENT'
  | '10_PAYMENT_CONFIRMATION'
  | '11_ELECTRONIC_TICKET'
  | '12_TRAVEL_HISTORY'
  | '13_TRAVELER_PROFILE'
  | '14_COMPANY_DASHBOARD'
  | '15_MANAGE_TRIPS'
  | '16_QR_SCANNER'
  | '17_ADMIN_DASHBOARD'
  | '18_REGISTER_COMPANY'
  | '19_INTERACTIVE_MAP'
  | '20_NOTIFICATIONS'
  | '21_SETTINGS'
  | '22_OFFLINE_MODE'
  | '23_PROMO_END';

export interface ScreenMetadata {
  id: ScreenId;
  number: string;
  group: string;
  title: string;
  description: string;
}
