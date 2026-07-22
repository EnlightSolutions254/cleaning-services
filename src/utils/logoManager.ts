import { useState, useEffect } from 'react';
import { APEX_COMPANY_INFO } from '../data/cleaningData';

const LOGO_STORAGE_KEY = 'apex_clean_logo_url';

export const DEFAULT_LOGO_URL = APEX_COMPANY_INFO.logoUrl || '/images/logo.jpg';

export function getStoredLogoUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_LOGO_URL;
  try {
    const stored = localStorage.getItem(LOGO_STORAGE_KEY);
    if (stored && stored.trim() !== '') {
      return stored;
    }
  } catch (e) {
    console.warn('Unable to access localStorage for logo', e);
  }
  return DEFAULT_LOGO_URL;
}

export function updateFavicon(logoUrl: string) {
  if (typeof document === 'undefined') return;
  
  let favicon = document.getElementById('app-favicon') as HTMLLinkElement | null;
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.id = 'app-favicon';
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.href = logoUrl;

  let appleIcon = document.getElementById('app-apple-icon') as HTMLLinkElement | null;
  if (!appleIcon) {
    appleIcon = document.createElement('link');
    appleIcon.id = 'app-apple-icon';
    appleIcon.rel = 'apple-touch-icon';
    document.head.appendChild(appleIcon);
  }
  appleIcon.href = logoUrl;
}

export function saveLogoUrl(newLogoUrl: string): string {
  const urlToSave = newLogoUrl.trim() || DEFAULT_LOGO_URL;
  try {
    localStorage.setItem(LOGO_STORAGE_KEY, urlToSave);
  } catch (e) {
    console.warn('Failed to save logo to localStorage', e);
  }
  updateFavicon(urlToSave);
  // Dispatch custom event for reactive UI updates across all components
  window.dispatchEvent(new CustomEvent('apex-logo-updated', { detail: urlToSave }));
  return urlToSave;
}

export function resetLogoUrl(): string {
  try {
    localStorage.removeItem(LOGO_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear logo from localStorage', e);
  }
  updateFavicon(DEFAULT_LOGO_URL);
  window.dispatchEvent(new CustomEvent('apex-logo-updated', { detail: DEFAULT_LOGO_URL }));
  return DEFAULT_LOGO_URL;
}

/**
 * Custom hook to use the reactive active logo URL across Navbar, Footer, and Modals
 */
export function useLogoUrl(): {
  logoUrl: string;
  updateLogo: (url: string) => void;
  resetLogo: () => void;
} {
  const [logoUrl, setLogoUrl] = useState<string>(() => getStoredLogoUrl());

  useEffect(() => {
    // Sync initial favicon on load
    updateFavicon(logoUrl);

    const handleLogoChange = (e: CustomEvent<string> | Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setLogoUrl(customEvent.detail);
      } else {
        setLogoUrl(getStoredLogoUrl());
      }
    };

    window.addEventListener('apex-logo-updated', handleLogoChange as EventListener);
    window.addEventListener('storage', handleLogoChange as EventListener);

    return () => {
      window.removeEventListener('apex-logo-updated', handleLogoChange as EventListener);
      window.removeEventListener('storage', handleLogoChange as EventListener);
    };
  }, [logoUrl]);

  return {
    logoUrl,
    updateLogo: (url: string) => {
      const saved = saveLogoUrl(url);
      setLogoUrl(saved);
    },
    resetLogo: () => {
      const reset = resetLogoUrl();
      setLogoUrl(reset);
    },
  };
}
