/**
 * Standardized response utility for user-friendly notifications
 * Returns consistent format with header and content for frontend notifications
 * Supports both success and error responses
 */

const createErrorResponse = (
  statusCode,
  errorType,
  userMessage,
  details = null
) => {
  const errorResponses = {
    // 400 - Bad Request
    VALIDATION_ERROR: {
      header: "Invalid Input",
      content: userMessage || "Please check your input and try again",
    },
    MISSING_FIELDS: {
      header: "Missing Information",
      content: userMessage || "Please fill in all required fields",
    },
    INVALID_DATA: {
      header: "Invalid Data",
      content: userMessage || "The provided data is not valid",
    },

    // 401 - Unauthorized
    UNAUTHORIZED: {
      header: "Access Denied",
      content: userMessage || "Please log in to continue",
    },
    TOKEN_EXPIRED: {
      header: "Session Expired",
      content: userMessage || "Your session has expired. Please log in again",
    },

    // 403 - Forbidden
    FORBIDDEN: {
      header: "Permission Denied",
      content: userMessage || "You don't have permission to perform this action",
    },

    // 404 - Not Found
    NOT_FOUND: {
      header: "Not Found",
      content: userMessage || "The requested item could not be found",
    },
    PET_NOT_FOUND: {
      header: "Pet Not Found",
      content: userMessage || "This pet could not be found",
    },
    BOOKING_NOT_FOUND: {
      header: "Booking Not Found",
      content: userMessage || "This booking could not be found",
    },
    ROOM_NOT_FOUND: {
      header: "Room Not Found",
      content: userMessage || "This room could not be found",
    },
    SERVICE_NOT_FOUND: {
      header: "Service Not Found",
      content: userMessage || "This service could not be found",
    },
    USER_NOT_FOUND: {
      header: "User Not Found",
      content: userMessage || "This user could not be found",
    },
    PROFILE_NOT_FOUND: {
      header: "Profile Not Found",
      content: userMessage || "Profile could not be found",
    },
    NO_REVIEWS_FOUND:{
      header: "Review Not Found",
      content: userMessage || "Review could not be found",
    },
    PAYMENT_NOT_FOUND: {
      header: "Payment Not Found",
      content: userMessage || "Payment cound not be found"
    },

    // 409 - Conflict
    ALREADY_EXISTS: {
      header: "Already Exists",
      content: userMessage || "This item already exists",
    },
    DUPLICATE_BOOKING: {
      header: "Booking Conflict",
      content: userMessage || "A booking already exists for this time",
    },
    DUPLICATE_ACCOUNT: {
      header: "Account Exists",
      content: userMessage || "An account with this information already exists",
    },

    // 500 - Server Error
    SERVER_ERROR: {
      header: "Server Error",
      content: userMessage || "Something went wrong. Please try again later",
    },
    DATABASE_ERROR: {
      header: "Database Error",
      content: userMessage || "Unable to process your request. Please try again later",
    },
    UNABLE_TO_LOAD: {
      header: "Loading Failed",
      content: userMessage || "Unable to load data. Please refresh and try again",
    },
    UNABLE_TO_SAVE: {
      header: "Save Failed",
      content: userMessage || "Unable to save your changes. Please try again",
    },
    UNABLE_TO_DELETE: {
      header: "Delete Failed",
      content: userMessage || "Unable to delete this item. Please try again",
    },
    UNABLE_TO_UPDATE: {
      header: "Update Failed",
      content: userMessage || "Unable to update this item. Please try again",
    },
    UNABLE_TO_CHECK: {
      header: "Check Failed",
      content: userMessage || "Unable to check items from cart. Please try again",
    },

    // Business logic errors
    NO_DATA_FOUND: {
      header: "No Data Found",
      content: userMessage || "No data matches your criteria",
    },
    OPERATION_NOT_ALLOWED: {
      header: "Operation Not Allowed",
      content: userMessage || "This operation is not allowed at this time",
    },
    INVALID_STATUS: {
      header: "Invalid Status",
      content: userMessage || "The provided status is not valid",
    },
  };

  const errorInfo = errorResponses[errorType] || errorResponses.SERVER_ERROR;

  return {
    success: false,
    error: {
      type: errorType,
      header: errorInfo.header,
      content: errorInfo.content,
      statusCode,
      ...(details && { details }),
    },
  };
};

// Helper function to send error response
const sendErrorResponse = (
  res,
  statusCode,
  errorType,
  userMessage,
  details = null
) => {
  const errorResponse = createErrorResponse(
    statusCode,
    errorType,
    userMessage,
    details
  );
  return res.status(statusCode).json(errorResponse);
};

// Success response types and messages
const createSuccessResponse = (
  statusCode,
  successType,
  userMessage,
  data = null,
  details = null
) => {
  const successResponses = {
    // 200 - Success Operations
    LOADED_SUCCESSFULLY: {
      header: "Loaded Successfully",
      content: userMessage || "Data loaded successfully",
    },
    UPDATED_SUCCESSFULLY: {
      header: "Updated Successfully", 
      content: userMessage || "Your changes have been saved",
    },
    DELETED_SUCCESSFULLY: {
      header: "Deleted Successfully",
      content: userMessage || "Item deleted successfully",
    },
    
    // 201 - Created Operations
    CREATED_SUCCESSFULLY: {
      header: "Created Successfully",
      content: userMessage || "Item created successfully",
    },
    REGISTERED_SUCCESSFULLY: {
      header: "Registration Complete",
      content: userMessage || "Registration completed successfully",
    },
    BOOKED_SUCCESSFULLY: {
      header: "Booking Confirmed",
      content: userMessage || "Your booking has been confirmed",
    },
    
    // Authentication Success
    LOGIN_SUCCESSFUL: {
      header: "Welcome Back",
      content: userMessage || "You have been logged in successfully",
    },
    LOGOUT_SUCCESSFUL: {
      header: "Logged Out",
      content: userMessage || "You have been logged out successfully",
    },
    PROFILE_UPDATED: {
      header: "Profile Updated",
      content: userMessage || "Your profile has been updated successfully",
    },
    
    // Pet Management Success
    PET_REGISTERED: {
      header: "Pet Registered",
      content: userMessage || "Your pet has been registered successfully",
    },
    PET_UPDATED: {
      header: "Pet Updated",
      content: userMessage || "Pet information updated successfully",
    },
    PET_STATUS_UPDATED: {
      header: "Status Updated",
      content: userMessage || "Pet status updated successfully",
    },
    
    // Booking Success
    BOOKING_CREATED: {
      header: "Booking Created",
      content: userMessage || "Your booking has been created successfully",
    },
    BOOKING_UPDATED: {
      header: "Booking Updated", 
      content: userMessage || "Booking updated successfully",
    },
    BOOKING_CANCELLED: {
      header: "Booking Cancelled",
      content: userMessage || "Your booking has been cancelled",
    },
    
    // Review Success
    REVIEW_SUBMITTED: {
      header: "Review Submitted",
      content: userMessage || "Thank you for your review",
    },
    REPLY_POSTED: {
      header: "Reply Posted",
      content: userMessage || "Your reply has been posted successfully",
    },
    
    // Generic Success
    OPERATION_SUCCESSFUL: {
      header: "Success",
      content: userMessage || "Operation completed successfully",
    },
    SAVED_SUCCESSFULLY: {
      header: "Saved",
      content: userMessage || "Your changes have been saved",
    },
    CHECK_SUCCESSFULLY: {
      header: "Checked",
      content: userMessage || "Check items successfully",
    }
  };

  const successInfo = successResponses[successType] || successResponses.OPERATION_SUCCESSFUL;

  return {
    success: true,
    message: {
      type: successType,
      header: successInfo.header,
      content: successInfo.content,
      statusCode,
      ...(details && { details }),
    },
    ...(data && { data }),
  };
};

// Helper function to send success response
const sendSuccessResponse = (
  res,
  statusCode,
  successType,
  userMessage,
  data = null,
  details = null
) => {
  const successResponse = createSuccessResponse(
    statusCode,
    successType,
    userMessage,
    data,
    details
  );
  return res.status(statusCode).json(successResponse);
};

module.exports = {
  createErrorResponse,
  sendErrorResponse,
  createSuccessResponse,
  sendSuccessResponse,
};