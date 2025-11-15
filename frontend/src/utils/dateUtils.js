/**
 * Convert a Date object to YYYY-MM-DD format in local timezone
 * This prevents timezone offset issues when sending dates to backend
 * @param {Date} date - Date object
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const formatDateForAPI = (date) => {
  if (!date) return null;
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Convert a Date object to local date string without timezone conversion
 * @param {Date|string} dateInput - Date object or date string
 * @returns {Date} Date object adjusted for local timezone
 */
export const getLocalDate = (dateInput) => {
  if (!dateInput) return null;
  
  const date = new Date(dateInput);
  // Get the timezone offset and adjust the date
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  
  return localDate;
};

/**
 * Parse date string from backend and convert to local Date object
 * @param {string} dateString - Date string from backend (YYYY-MM-DD or ISO format)
 * @returns {Date} Local Date object
 */
export const parseDateFromAPI = (dateString) => {
  if (!dateString) return null;
  
  // If it's just a date (YYYY-MM-DD), parse it as local date
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
  }
  
  // Otherwise parse as ISO string
  return new Date(dateString);
};
