/**
 * Safe localStorage utilities with error handling
 */

export const safeGetLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`LocalStorage error for key "${key}":`, error);
    return defaultValue;
  }
};

export const safeSetLocalStorage = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`LocalStorage error setting key "${key}":`, error);
    return false;
  }
};

export const safeRemoveLocalStorage = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`LocalStorage error removing key "${key}":`, error);
    return false;
  }
};