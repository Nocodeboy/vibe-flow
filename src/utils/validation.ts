/**
 * Form validation utilities
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'El email es requerido' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'El email no es válido' };
  }

  if (email.length > 254) {
    return { isValid: false, error: 'El email es demasiado largo' };
  }

  return { isValid: true };
}

/**
 * Validate name
 */
export function validateName(name: string): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'El nombre es requerido' };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: 'El nombre debe tener al menos 2 caracteres' };
  }

  if (name.trim().length > 100) {
    return { isValid: false, error: 'El nombre es demasiado largo' };
  }

  return { isValid: true };
}

/**
 * Validate message content
 */
export function validateMessage(message: string): ValidationResult {
  if (!message || message.trim().length === 0) {
    return { isValid: false, error: 'El mensaje es requerido' };
  }

  if (message.trim().length < 10) {
    return { isValid: false, error: 'El mensaje debe tener al menos 10 caracteres' };
  }

  if (message.trim().length > 5000) {
    return { isValid: false, error: 'El mensaje es demasiado largo (máximo 5000 caracteres)' };
  }

  // Basic XSS pattern detection (additional server-side validation recommended)
  const suspiciousPatterns = /<script|javascript:|onerror=|onclick=|<iframe|<img[^>]+onerror/i;
  if (suspiciousPatterns.test(message)) {
    return { isValid: false, error: 'El mensaje contiene contenido no permitido' };
  }

  return { isValid: true };
}

/**
 * Rate limiting helper - stores submission times in memory
 */
const submissionTimes: number[] = [];
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS = 3;

export function checkRateLimit(): ValidationResult {
  const now = Date.now();

  // Remove submissions outside the time window
  while (submissionTimes.length > 0 && submissionTimes[0] < now - RATE_LIMIT_WINDOW) {
    submissionTimes.shift();
  }

  if (submissionTimes.length >= MAX_SUBMISSIONS) {
    return {
      isValid: false,
      error: 'Demasiadas solicitudes. Por favor, espera un momento.',
    };
  }

  return { isValid: true };
}

export function recordSubmission(): void {
  submissionTimes.push(Date.now());
}

/**
 * Validate entire contact form
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): ValidationResult {
  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) return nameValidation;

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) return emailValidation;

  const messageValidation = validateMessage(data.message);
  if (!messageValidation.isValid) return messageValidation;

  const rateLimitCheck = checkRateLimit();
  if (!rateLimitCheck.isValid) return rateLimitCheck;

  return { isValid: true };
}
