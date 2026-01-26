import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  validateEmail,
  validateName,
  validateMessage,
  checkRateLimit,
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

  it('should return invalid for malformed email', () => {
    expect(validateEmail('notanemail')).toEqual({
      isValid: false,
      error: 'El email no es válido',
    });

    expect(validateEmail('missing@domain')).toEqual({
      isValid: false,
      error: 'El email no es válido',
    });
  });

  it('should return valid for correct email format', () => {
    expect(validateEmail('test@example.com')).toEqual({ isValid: true });
    expect(validateEmail('user.name@domain.org')).toEqual({ isValid: true });
  });

  it('should return invalid for email exceeding 254 characters', () => {
    const longEmail = 'a'.repeat(250) + '@test.com';
    expect(validateEmail(longEmail)).toEqual({
      isValid: false,
      error: 'El email es demasiado largo',
    });
  });
});

describe('validateName', () => {
  it('should return invalid for empty name', () => {
    expect(validateName('')).toEqual({
      isValid: false,
      error: 'El nombre es requerido',
    });
  });

  it('should return invalid for name shorter than 2 characters', () => {
    expect(validateName('A')).toEqual({
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
    expect(validateName('Juan')).toEqual({ isValid: true });
    expect(validateName('María García')).toEqual({ isValid: true });
  });
});

describe('validateMessage', () => {
  it('should return invalid for empty message', () => {
    expect(validateMessage('')).toEqual({
      isValid: false,
      error: 'El mensaje es requerido',
    });
  });

  it('should return invalid for message shorter than 10 characters', () => {
    expect(validateMessage('Hola')).toEqual({
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

  it('should return invalid for messages with suspicious XSS patterns', () => {
    expect(validateMessage('<script>alert("xss")</script>')).toEqual({
      isValid: false,
      error: 'El mensaje contiene contenido no permitido',
    });

    expect(validateMessage('Hello <img src=x onerror=alert(1)>')).toEqual({
      isValid: false,
      error: 'El mensaje contiene contenido no permitido',
    });

    expect(validateMessage('Click javascript:alert(1)')).toEqual({
      isValid: false,
      error: 'El mensaje contiene contenido no permitido',
    });
  });

  it('should return valid for correct message', () => {
    expect(validateMessage('Hola, me gustaría obtener más información sobre sus servicios.')).toEqual({
      isValid: true,
    });
  });
});

describe('checkRateLimit', () => {
  beforeEach(() => {
    // Reset rate limit state by mocking Date.now
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should allow submissions under the limit', () => {
    // First submission should be allowed
    expect(checkRateLimit()).toEqual({ isValid: true });
  });
});
