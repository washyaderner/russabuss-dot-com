import { useState } from 'react';

/**
 * ContactForm - React island for client-side form validation
 *
 * Fields: First name, Last name, Email, Service checkboxes, Message
 * Services: Mix & Master, Custom Tracks, Instrumentals, Studio Time, Vox, DJ, Other
 *
 * Future: Integrate with Resend API for email delivery
 */

const SERVICE_OPTIONS = [
  { id: 'mix-master', label: 'Mix & Master' },
  { id: 'custom-tracks', label: 'Custom Tracks' },
  { id: 'instrumentals', label: 'Instrumentals' },
  { id: 'studio-time', label: 'Studio Time' },
  { id: 'vocals', label: 'Vox' },
  { id: 'dj', label: 'DJ' },
  { id: 'other', label: 'Other' },
];

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  // Remove HTML tags and trim whitespace
  return input.replace(/<[^>]*>/g, '').trim();
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    services: [],
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, submitting, success, error

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function handleServiceToggle(serviceId) {
    setFormData(prev => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId];
      return { ...prev, services };
    });
  }

  function validateForm() {
    const newErrors = {};

    const firstName = sanitizeInput(formData.firstName);
    const lastName = sanitizeInput(formData.lastName);
    const email = sanitizeInput(formData.email);
    const message = sanitizeInput(formData.message);

    if (!firstName) {
      newErrors.firstName = 'First name is required';
    } else if (firstName.length > 100) {
      newErrors.firstName = 'First name is too long';
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (lastName.length > 100) {
      newErrors.lastName = 'Last name is too long';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!message) {
      newErrors.message = 'Please tell me about your project';
    } else if (message.length < 10) {
      newErrors.message = 'Please provide more detail';
    } else if (message.length > 5000) {
      newErrors.message = 'Message is too long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus('submitting');

    try {
      // Sanitize all inputs before sending
      const sanitizedData = {
        firstName: sanitizeInput(formData.firstName),
        lastName: sanitizeInput(formData.lastName),
        email: sanitizeInput(formData.email),
        services: formData.services,
        message: sanitizeInput(formData.message),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        services: [],
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="form-success">
        <div className="success-icon" aria-hidden="true">✓</div>
        <h3 className="success-title">Message Sent</h3>
        <p className="success-text">
          Thanks for reaching out! I'll get back to you within 24 hours.
        </p>
        <button
          type="button"
          className="success-button"
          onClick={() => setSubmitStatus('idle')}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`form-input ${errors.firstName ? 'form-input--error' : ''}`}
            value={formData.firstName}
            onChange={handleInputChange}
            autoComplete="given-name"
            maxLength={100}
            aria-invalid={errors.firstName ? 'true' : 'false'}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && (
            <span id="firstName-error" className="form-error" role="alert">
              {errors.firstName}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`form-input ${errors.lastName ? 'form-input--error' : ''}`}
            value={formData.lastName}
            onChange={handleInputChange}
            autoComplete="family-name"
            maxLength={100}
            aria-invalid={errors.lastName ? 'true' : 'false'}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
          {errors.lastName && (
            <span id="lastName-error" className="form-error" role="alert">
              {errors.lastName}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
          maxLength={254}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className="form-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <fieldset className="form-fieldset">
        <legend className="form-legend">What can I help with?</legend>
        <div className="checkbox-grid">
          {SERVICE_OPTIONS.map(service => (
            <label key={service.id} className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={formData.services.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
              />
              <span className="checkbox-text">{service.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Tell me about your project
        </label>
        <textarea
          id="message"
          name="message"
          className={`form-textarea ${errors.message ? 'form-textarea--error' : ''}`}
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          maxLength={5000}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" className="form-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      {submitStatus === 'error' && (
        <div className="form-alert form-alert--error" role="alert">
          Something went wrong. Please try again or email directly at audio@russabuss.com
        </div>
      )}

      <button
        type="submit"
        className="form-submit"
        disabled={submitStatus === 'submitting'}
      >
        {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
