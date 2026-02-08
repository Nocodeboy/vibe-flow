import { useEffect, useCallback } from 'react';

const GA_MEASUREMENT_ID = 'G-N2MBMH1DWS';
const CONSENT_STORAGE_KEY = 'cookie-consent';

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

type ConsentValue = 'accepted' | 'rejected' | null;

const getStoredConsent = (): ConsentValue => {
    if (typeof window === 'undefined') return null;

    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (consent === 'accepted' || consent === 'rejected') {
        return consent;
    }

    return null;
};

// Check if user has given consent
export const hasAnalyticsConsent = (): boolean => getStoredConsent() === 'accepted';

// Check if consent has been given (accepted or rejected)
export const hasConsentBeenGiven = (): boolean => getStoredConsent() !== null;

const updateGoogleConsent = (accepted: boolean): void => {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('consent', 'update', {
        analytics_storage: accepted ? 'granted' : 'denied',
        ad_storage: accepted ? 'granted' : 'denied',
        ad_user_data: accepted ? 'granted' : 'denied',
        ad_personalization: accepted ? 'granted' : 'denied'
    });
};

// Set consent
export const setConsent = (accepted: boolean): void => {
    localStorage.setItem(CONSENT_STORAGE_KEY, accepted ? 'accepted' : 'rejected');
    loadGoogleAnalytics();
    updateGoogleConsent(accepted);
};

// Load Google Analytics script
const loadGoogleAnalytics = (): void => {
    if (typeof window === 'undefined') return;

    // Prevent loading twice
    if (window.gtag) {
        return;
    }

    // Create and inject the gtag script
    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);
    }

    const consent = getStoredConsent();

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
    };

    window.gtag('consent', 'default', {
        analytics_storage: consent === 'accepted' ? 'granted' : 'denied',
        ad_storage: consent === 'accepted' ? 'granted' : 'denied',
        ad_user_data: consent === 'accepted' ? 'granted' : 'denied',
        ad_personalization: consent === 'accepted' ? 'granted' : 'denied'
    });

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true // GDPR compliance
    });
};

// Custom hook for analytics
export const useAnalytics = () => {
    useEffect(() => {
        loadGoogleAnalytics();
    }, []);

    const trackEvent = useCallback((eventName: string, params?: Record<string, unknown>) => {
        if (hasAnalyticsConsent() && window.gtag) {
            window.gtag('event', eventName, params);
        }
    }, []);

    const trackPageView = useCallback((path: string, title?: string) => {
        if (hasAnalyticsConsent() && window.gtag) {
            window.gtag('event', 'page_view', {
                page_path: path,
                page_title: title
            });
        }
    }, []);

    return { trackEvent, trackPageView };
};

export default useAnalytics;
