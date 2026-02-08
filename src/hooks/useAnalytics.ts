import { useEffect, useCallback } from 'react';

const GA_MEASUREMENT_ID = 'G-N2MBMH1DWS';

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
    }
}

// Check if user has given consent
export const hasAnalyticsConsent = (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('cookie-consent') === 'accepted';
};

// Check if consent has been given (accepted or rejected)
export const hasConsentBeenGiven = (): boolean => {
    if (typeof window === 'undefined') return false;
    const consent = localStorage.getItem('cookie-consent');
    return consent === 'accepted' || consent === 'rejected';
};

// Set consent
export const setConsent = (accepted: boolean): void => {
    localStorage.setItem('cookie-consent', accepted ? 'accepted' : 'rejected');
    if (accepted) {
        loadGoogleAnalytics();
    }
};

// Load Google Analytics script
const loadGoogleAnalytics = (): void => {
    if (typeof window === 'undefined') return;

    // Prevent loading twice
    if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
        return;
    }

    // Create and inject the gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true, // GDPR compliance
        cookie_flags: 'SameSite=None;Secure'
    });
};

// Custom hook for analytics
export const useAnalytics = () => {
    useEffect(() => {
        // Only load if consent was previously given
        if (hasAnalyticsConsent()) {
            loadGoogleAnalytics();
        }
    }, []);

    const trackEvent = useCallback((eventName: string, params?: Record<string, unknown>) => {
        if (hasAnalyticsConsent() && window.gtag) {
            window.gtag('event', eventName, params);
        }
    }, []);

    const trackPageView = useCallback((path: string, title?: string) => {
        if (hasAnalyticsConsent() && window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: path,
                page_title: title
            });
        }
    }, []);

    return { trackEvent, trackPageView };
};

export default useAnalytics;
