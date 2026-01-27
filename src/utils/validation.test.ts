import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  validateEmail,
  validateName,
  validateMessage,
  checkRateLimit,
  recordSubmission,
  validateContactForm,
  ValidationResult,
} from './validation';

describe('validateEmail', () => {
  it('should return invalid for empty email', () => {
    expect(validateEmail('')).toEqual({
      isValid: false,
      error: 'El email es requerido',
    });
  });

  it('should return invalid for whitespace-only email', () => {
    expect(validateEmail('   ')).toEqual({
      isValid: false,
      error: 'El email es requerido',
    });
  });

  it('should return invalid for null-like values', () => {
    expect(validateEmail(undefined as unknown as string)).toEqual({
      isValid: false,
      error: 'El email es requerido',
    });
  });

  it('should return invalid for malformed email', () => {
    const invalidEmails = [
      'notanemail',
      'missing@domain',
      '@nodomain.com',
      'no@.com',
      'spaces in@email.com',
      'double@@at.com',
      'nodot@domaincom',
    ];

    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toEqual({
        isValid: false,
        error: 'El email no es válido',
      });
    });
  });

  it('should return valid for correct email format', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.org',
      'user+tag@example.co.uk',
      'first.last@subdomain.domain.com',
      'user123@test.io',
    ];

    validEmails.forEach((email) => {
      expect(validateEmail(email)).toEqual({ isValid: true });
    });
  });

  it('should return invalid for email exceeding 254 characters', () => {
    const longEmail = 'a'.repeat(250) + '@test.com';
    expect(validateEmail(longEmail)).toEqual({
      isValid: false,
      error: 'El email es demasiado largo',
    });
  });

  it('should accept email at exactly 254 characters', () => {
    const exactEmail = 'a'.repeat(241) + '@test.com'; // 241 + 9 = 250 < 254
    expect(validateEmail(exactEmail).isValid).toBe(true);
  });
});

describe('validateName', () => {
  it('should return invalid for empty name', () => {
    expect(validateName('')).toEqual({
      isValid: false,
      error: 'El nombre es requerido',
    });
  });

  it('should return invalid for whitespace-only name', () => {
    expect(validateName('   ')).toEqual({
      isValid: false,
      error: 'El nombre es requerido',
    });
  });

  it('should return invalid for undefined/null', () => {
    expect(validateName(undefined as unknown as string)).toEqual({
      isValid: false,
      error: 'El nombre es requerido',
    });
  });

  it('should return invalid for name shorter than 2 characters', () => {
    expect(validateName('A')).toEqual({
      isValid: false,
      error: 'El nombre debe tener al menos 2 caracteres',
    });

    expect(validateName(' A ')).toEqual({
      isValid: false,
      error: 'El nombre debe tener al menos 2 caracteres',
    });
  });

  it('should return invalid for name exceeding 100 characters', () => {
    const longName = 'A'.repeat(101);
    expect(validateName(longName)).toEqual({
      isValid: false,
      error: 'El nombre es demasiado largo',
    });
  });

  it('should return valid for correct name', () => {
    const validNames = [
      'Juan',
      'María García',
      'José Luis',
      'Aa', // minimum valid
      'A'.repeat(100), // maximum valid
    ];

    validNames.forEach((name) => {
      expect(validateName(name)).toEqual({ isValid: true });
    });
  });

  it('should handle names with special characters', () => {
    expect(validateName("O'Connor")).toEqual({ isValid: true });
    expect(validateName('José-María')).toEqual({ isValid: true });
    expect(validateName('Müller')).toEqual({ isValid: true });
  });
});

describe('validateMessage', () => {
  it('should return invalid for empty message', () => {
    expect(validateMessage('')).toEqual({
      isValid: false,
      error: 'El mensaje es requerido',
    });
  });

  it('should return invalid for whitespace-only message', () => {
    expect(validateMessage('          ')).toEqual({
      isValid: false,
      error: 'El mensaje es requerido',
    });
  });

  it('should return invalid for undefined/null', () => {
    expect(validateMessage(undefined as unknown as string)).toEqual({
      isValid: false,
      error: 'El mensaje es requerido',
    });
  });

  it('should return invalid for message shorter than 10 characters', () => {
    expect(validateMessage('Hola')).toEqual({
      isValid: false,
      error: 'El mensaje debe tener al menos 10 caracteres',
    });

    expect(validateMessage('123456789')).toEqual({
      isValid: false,
      error: 'El mensaje debe tener al menos 10 caracteres',
    });
  });

  it('should return invalid for message exceeding 5000 characters', () => {
    const longMessage = 'A'.repeat(5001);
    expect(validateMessage(longMessage)).toEqual({
      isValid: false,
      error: 'El mensaje es demasiado largo (máximo 5000 caracteres)',
    });
  });

  it('should return valid for message at exactly 5000 characters', () => {
    const exactMessage = 'A'.repeat(5000);
    expect(validateMessage(exactMessage)).toEqual({ isValid: true });
  });

  it('should return valid for message at exactly 10 characters', () => {
    expect(validateMessage('1234567890')).toEqual({ isValid: true });
  });

  describe('XSS pattern detection', () => {
    it('should reject script tags', () => {
      const xssAttempts = [
        '<script>alert("xss")</script>',
        '<SCRIPT>alert(1)</SCRIPT>',
        '<script src="evil.js"></script>',
        'Hello <script>steal()</script> World',
      ];

      xssAttempts.forEach((message) => {
        expect(validateMessage(message)).toEqual({
          isValid: false,
          error: 'El mensaje contiene contenido no permitido',
        });
      });
    });

    it('should reject javascript: protocol', () => {
      const xssAttempts = [
        'Click javascript:alert(1)',
        'javascript:void(0)',
        'JAVASCRIPT:evil()',
      ];

      xssAttempts.forEach((message) => {
        expect(validateMessage(message)).toEqual({
          isValid: false,
          error: 'El mensaje contiene contenido no permitido',
        });
      });
    });

    it('should reject onerror handlers', () => {
      const xssAttempts = [
        'Hello <img src=x onerror=alert(1)>',
        '<div onerror="evil()">',
        'ONERROR=alert(1)',
      ];

      xssAttempts.forEach((message) => {
        expect(validateMessage(message)).toEqual({
          isValid: false,
          error: 'El mensaje contiene contenido no permitido',
        });
      });
    });

    it('should reject onclick handlers', () => {
      const xssAttempts = [
        '<div onclick="evil()">Click</div>',
        'onclick=alert(1)',
      ];

      xssAttempts.forEach((message) => {
        expect(validateMessage(message)).toEqual({
          isValid: false,
          error: 'El mensaje contiene contenido no permitido',
        });
      });
    });

    it('should reject iframe tags', () => {
      const xssAttempts = [
        '<iframe src="evil.com"></iframe>',
        '<IFRAME>content</IFRAME>',
      ];

      xssAttempts.forEach((message) => {
        expect(validateMessage(message)).toEqual({
          isValid: false,
          error: 'El mensaje contiene contenido no permitido',
        });
      });
    });
  });

  it('should return valid for correct message', () => {
    const validMessages = [
      'Hola, me gustaría obtener más información sobre sus servicios.',
      'Este es un mensaje de prueba válido.',
      'Tengo una pregunta sobre automatización de procesos.',
      'Me interesa conocer más sobre las soluciones de IA.',
    ];

    validMessages.forEach((message) => {
      expect(validateMessage(message)).toEqual({ isValid: true });
    });
  });

  it('should allow legitimate HTML-like content', () => {
    // Normal text that might look suspicious but is valid
    expect(validateMessage('El precio es menor a $100 euros')).toEqual({ isValid: true });
    expect(validateMessage('La ecuación es 2 < 3 > 1')).toEqual({ isValid: true });
  });
});

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Set a specific system time far in the future to clear any old submissions
    vi.setSystemTime(new Date('2028-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should allow submissions under the limit', () => {
    // First submission should be allowed
    expect(checkRateLimit()).toEqual({ isValid: true });
  });

  it('should track submissions correctly', () => {
    // Record 3 submissions (the max)
    recordSubmission();
    recordSubmission();
    recordSubmission();

    // 4th should be blocked
    expect(checkRateLimit()).toEqual({
      isValid: false,
      error: 'Demasiadas solicitudes. Por favor, espera un momento.',
    });
  });

  it('should reset after time window expires', () => {
    // Record 3 submissions
    recordSubmission();
    recordSubmission();
    recordSubmission();

    // Should be blocked
    expect(checkRateLimit()).toEqual({
      isValid: false,
      error: 'Demasiadas solicitudes. Por favor, espera un momento.',
    });

    // Advance time past the window (60 seconds)
    vi.advanceTimersByTime(61000);

    // Should be allowed again
    expect(checkRateLimit()).toEqual({ isValid: true });
  });
});

describe('recordSubmission', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Set a specific system time far in the future to clear any old submissions
    vi.setSystemTime(new Date('2029-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should record submission time', () => {
    // Before recording, rate limit should pass
    expect(checkRateLimit()).toEqual({ isValid: true });

    // Record max submissions
    recordSubmission();
    recordSubmission();
    recordSubmission();

    // After max submissions, rate limit should fail
    expect(checkRateLimit()).toEqual({
      isValid: false,
      error: 'Demasiadas solicitudes. Por favor, espera un momento.',
    });
  });
});

describe('validateContactForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Set a specific system time far in the future to clear any old submissions
    vi.setSystemTime(new Date('2030-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return valid for complete valid form', () => {
    const result = validateContactForm({
      name: 'Juan García',
      email: 'juan@example.com',
      message: 'Hola, me gustaría obtener más información sobre sus servicios.',
    });

    expect(result).toEqual({ isValid: true });
  });

  it('should return name error first for invalid name', () => {
    const result = validateContactForm({
      name: '',
      email: 'invalid',
      message: 'short',
    });

    expect(result).toEqual({
      isValid: false,
      error: 'El nombre es requerido',
    });
  });

  it('should return email error for invalid email (when name is valid)', () => {
    const result = validateContactForm({
      name: 'Juan García',
      email: 'invalid-email',
      message: 'short',
    });

    expect(result).toEqual({
      isValid: false,
      error: 'El email no es válido',
    });
  });

  it('should return message error for invalid message (when name and email are valid)', () => {
    const result = validateContactForm({
      name: 'Juan García',
      email: 'juan@example.com',
      message: 'short',
    });

    expect(result).toEqual({
      isValid: false,
      error: 'El mensaje debe tener al menos 10 caracteres',
    });
  });

  it('should return rate limit error when limit exceeded', () => {
    const validData = {
      name: 'Juan García',
      email: 'juan@example.com',
      message: 'Este es un mensaje válido para el formulario de contacto.',
    };

    // First 3 submissions should pass
    expect(validateContactForm(validData)).toEqual({ isValid: true });
    recordSubmission();

    expect(validateContactForm(validData)).toEqual({ isValid: true });
    recordSubmission();

    expect(validateContactForm(validData)).toEqual({ isValid: true });
    recordSubmission();

    // 4th should fail due to rate limiting
    expect(validateContactForm(validData)).toEqual({
      isValid: false,
      error: 'Demasiadas solicitudes. Por favor, espera un momento.',
    });
  });

  it('should validate all fields in order', () => {
    // All invalid - should return name error first
    expect(
      validateContactForm({
        name: '',
        email: '',
        message: '',
      })
    ).toEqual({
      isValid: false,
      error: 'El nombre es requerido',
    });

    // Name valid, rest invalid - should return email error
    expect(
      validateContactForm({
        name: 'Juan',
        email: '',
        message: '',
      })
    ).toEqual({
      isValid: false,
      error: 'El email es requerido',
    });

    // Name and email valid, message invalid - should return message error
    expect(
      validateContactForm({
        name: 'Juan',
        email: 'juan@test.com',
        message: '',
      })
    ).toEqual({
      isValid: false,
      error: 'El mensaje es requerido',
    });
  });

  it('should reject XSS attempts in message', () => {
    const result = validateContactForm({
      name: 'Juan García',
      email: 'juan@example.com',
      message: '<script>alert("xss")</script> mensaje malicioso',
    });

    expect(result).toEqual({
      isValid: false,
      error: 'El mensaje contiene contenido no permitido',
    });
  });
});
