/**
 * Hook to access UI Store
 * Provides easy access to theme, colors, and hero section configuration
 */
import uiStore from '../store/uiStore';

export function useUIStore() {
  return uiStore;
}

export default useUIStore;

