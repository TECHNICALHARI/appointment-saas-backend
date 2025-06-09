export const Messages = {
  // Auth
  AUTH_SUCCESS: 'Authentication successful',
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'You are not authorized to perform this action',

  // User
  USER_CREATED: 'User registered successfully',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists with this email',
  PROFILE_FETCHED: 'Profile fetched successfully',

  // Company
  COMPANY_CREATED: 'Company registration submitted',
  COMPANY_APPROVED: 'Company approved successfully',
  COMPANY_DECLINED: 'Company declined',
  COMPANY_NOT_FOUND: 'Company not found',
  COMPANY_ALREADY_EXISTS: 'Company already registered',

  // Plan
  PLAN_CREATED: 'Plan created successfully',
  PLAN_UPDATED: 'Plan updated successfully',
  PLAN_DELETED: 'Plan deleted successfully',
  PLAN_NOT_FOUND: 'Plan not found',

  // Payment
  PAYMENT_SUCCESS: 'Payment processed successfully',
  PAYMENT_FAILED: 'Payment failed',
  PAYMENT_PENDING: 'Payment is pending',
  PAYMENT_CANCELLED: 'Payment was cancelled',

  // Booking
  BOOKING_CREATED: 'Appointment booked successfully',
  BOOKING_UPDATED: 'Appointment updated',
  BOOKING_CANCELLED: 'Appointment cancelled',
  BOOKING_NOT_FOUND: 'Appointment not found',

  // Slot/Service
  SERVICE_ADDED: 'Service added successfully',
  SERVICE_UPDATED: 'Service updated',
  SERVICE_NOT_FOUND: 'Service not found',
  SLOT_ADDED: 'Slot added successfully',
  SLOT_UPDATED: 'Slot updated successfully',
  SLOT_NOT_AVAILABLE: 'Selected slot is not available',

  // Validation & General
  BAD_REQUEST: 'Bad request',
  INTERNAL_ERROR: 'Something went wrong',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Resource not found',
  SUCCESS: 'Operation completed successfully',

  REQUIRED: (field: string) => `${field} is required`,
  EMAIL_INVALID: 'Invalid email address',
  MIN_LENGTH: (field: string, length: number) =>
    `${field} must be at least ${length} characters`,
};
