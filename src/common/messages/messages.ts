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

  REQUIRED: (field: string) => `${field} is required`,
  INVALID: (field: string) => `${field} is invalid`,
  MIN: (field: string, value: number) => `${field} must be at least ${value}`,
  CREATED: (entity: string) => `${entity} created successfully`,
  UPDATED: (entity: string) => `${entity} updated successfully`,
  DELETED: (entity: string) => `${entity} deleted successfully`,
  FETCHED: (entity: string) => `${entity} fetched successfully`,
  NOT_FOUND: (entity: string) => `${entity} not found`,
  ALREADY_EXISTS: (entity: string) => `${entity} already exists`,
};
