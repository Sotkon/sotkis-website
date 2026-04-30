import React, { useState, useEffect } from 'react';
import { AnimateOnScroll } from '../components/ui/AnimateOnScroll';
import { useLanguage } from '../contexts/LanguageContext';
import { contactTranslations } from '../translations/contact';
import './Contact.css';

const COUNTRIES = [
  'Portugal', 'Spain', 'France', 'Germany', 'Italy', 'United Kingdom',
  'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Poland', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'Ireland', 'Czech Republic', 'Romania',
  'Hungary', 'Greece', 'Brazil', 'United States', 'Canada', 'Mexico',
  'Argentina', 'Colombia', 'Chile', 'China', 'Japan', 'India', 'Australia',
  'South Africa', 'United Arab Emirates', 'Saudi Arabia', 'Other',
];

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = contactTranslations[language];

  const [formData, setFormData] = useState({
    contactType: '',
    name: '',
    email: '',
    phone: '',
    companyName: '',
    country: '',
    comments: '',
    privacyPolicy: false,
    newsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<boolean | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactType || !formData.email || !formData.privacyPolicy) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL ?? 'https://hub.sotkon.org/api/web-contacts';
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactType: formData.contactType,
          email: formData.email,
          name: formData.name || null,
          country: formData.country || null,
          companyName: formData.companyName || null,
          phone: formData.phone || null,
          comments: formData.comments || null,
          privacyAccepted: formData.privacyPolicy,
          newsletterConsent: formData.newsletter,
          privacyPolicyVersion: 'v1.0',
        }),
      });

      if (!res.ok) throw new Error('Server error');

      setSubmitSuccess(true);
      setFormData({
        contactType: '', name: '', email: '', phone: '',
        companyName: '', country: '', comments: '',
        privacyPolicy: false, newsletter: false,
      });
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPrivacyText = (text: string) => {
    const parts = text.split(/\[(.*?)\]\((.*?)\)/g);
    if (parts.length === 1) return text;
    return (
      <>
        {parts[0]}
        <a href={parts[2]} target="_blank" rel="noopener noreferrer" className="contact__privacy-link">
          {parts[1]}
        </a>
        {parts[3]}
      </>
    );
  };

  return (
    <div className="contact">
      {/* Signal emission ripple animations */}
      <div className="contact__ripples">
        <div className="contact__ripple-source-1">
          <div className="contact__ripple-1"></div>
          <div className="contact__ripple-2"></div>
          <div className="contact__ripple-3"></div>
        </div>
        <div className="contact__ripple-source-2">
          <div className="contact__ripple-4"></div>
          <div className="contact__ripple-5"></div>
        </div>
        <div className="contact__ripple-source-3">
          <div className="contact__ripple-6"></div>
          <div className="contact__ripple-7"></div>
        </div>
        <div className="contact__ripple-source-4">
          <div className="contact__ripple-8"></div>
          <div className="contact__ripple-9"></div>
        </div>
      </div>

      <div className="contact__container container">
        <div className="contact__content">
          {/* Contact Information */}
          <div className="contact__info">
            <div className="contact__header">
              <p className="contact__subtitle">{t.subtitle}</p>
              <h1 className="contact__title">{t.title}</h1>
            </div>
          </div>

          {/* Contact Form */}
          <AnimateOnScroll animation="fadeSlideUp" delay={300} duration={0.9}>
            <div className="contact__form-wrapper">
              {submitSuccess ? (
                <div style={{ color: '#ffffff', padding: '2rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94C11F', fontWeight: 600 }}>✓</span>{' '}
                    {t.success}
                  </p>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit}>

                  {/* Contact type — always first */}
                  <div className="contact__form-group contact__form-group--full">
                    <select
                      id="contactType"
                      name="contactType"
                      className="contact__form-select"
                      value={formData.contactType}
                      onChange={handleChange}
                      required
                      aria-label={t.form.contactType.placeholder}
                    >
                      <option value="">{t.form.contactType.placeholder}</option>
                      <option value="newsletter">{t.form.contactType.newsletter}</option>
                      <option value="distributor">{t.form.contactType.distributor}</option>
                      <option value="information">{t.form.contactType.information}</option>
                    </select>
                  </div>

                  {/* Newsletter: country, email, name */}
                  {formData.contactType === 'newsletter' && (
                    <>
                      <div className="contact__form-group">
                        <select
                          id="country"
                          name="country"
                          className="contact__form-select"
                          value={formData.country}
                          onChange={handleChange}
                          aria-label={t.form.country.placeholder}
                        >
                          <option value="">{t.form.country.placeholder}</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="contact__form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="contact__form-input"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder={t.form.email.placeholder}
                          autoComplete="email"
                        />
                      </div>
                      <div className="contact__form-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="contact__form-input"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t.form.name.placeholder}
                          autoComplete="name"
                        />
                      </div>
                    </>
                  )}

                  {/* Distributor: companyName, email, phone, country, comments */}
                  {formData.contactType === 'distributor' && (
                    <>
                      <div className="contact__form-group">
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          className="contact__form-input"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder={t.form.companyName.placeholder}
                          autoComplete="organization"
                        />
                      </div>
                      <div className="contact__form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="contact__form-input"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder={t.form.email.placeholder}
                          autoComplete="email"
                        />
                      </div>
                      <div className="contact__form-group">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="contact__form-input"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t.form.phone.placeholder}
                          autoComplete="tel"
                        />
                      </div>
                      <div className="contact__form-group">
                        <select
                          id="country"
                          name="country"
                          className="contact__form-select"
                          value={formData.country}
                          onChange={handleChange}
                          aria-label={t.form.country.placeholder}
                        >
                          <option value="">{t.form.country.placeholder}</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="contact__form-group contact__form-group--full">
                        <textarea
                          id="comments"
                          name="comments"
                          className="contact__form-textarea"
                          rows={3}
                          value={formData.comments}
                          onChange={handleChange}
                          placeholder={t.form.comments.placeholder}
                        />
                      </div>
                    </>
                  )}

                  {/* Information: name, email, comments */}
                  {formData.contactType === 'information' && (
                    <>
                      <div className="contact__form-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="contact__form-input"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t.form.name.placeholder}
                          autoComplete="name"
                        />
                      </div>
                      <div className="contact__form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="contact__form-input"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder={t.form.email.placeholder}
                          autoComplete="email"
                        />
                      </div>
                      <div className="contact__form-group contact__form-group--full">
                        <textarea
                          id="comments"
                          name="comments"
                          className="contact__form-textarea"
                          rows={3}
                          value={formData.comments}
                          onChange={handleChange}
                          placeholder={t.form.comments.placeholder}
                        />
                      </div>
                    </>
                  )}

                  {/* Always: privacy & newsletter checkboxes */}
                  <div className="contact__privacy-section">
                    <div className="contact__privacy-option">
                      <input
                        type="checkbox"
                        id="privacyPolicy"
                        name="privacyPolicy"
                        checked={formData.privacyPolicy}
                        onChange={handleChange}
                        required
                        className="contact__privacy-checkbox"
                      />
                      <label htmlFor="privacyPolicy" className="contact__privacy-label">
                        {renderPrivacyText(t.privacy.policy)}
                      </label>
                    </div>
                    <div className="contact__privacy-option">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="contact__privacy-checkbox"
                      />
                      <label htmlFor="newsletter" className="contact__privacy-label">
                        {t.privacy.newsletter}
                      </label>
                    </div>
                  </div>

                  <div className="contact__form-actions">
                    <button
                      type="submit"
                      className="contact__form-submit"
                      disabled={isSubmitting}
                      aria-label={isSubmitting ? t.form.submitting : t.form.submit}
                    >
                      {isSubmitting ? t.form.submitting : t.form.submit}
                    </button>
                    {submitError && (
                      <p style={{ color: '#ff6b6b', marginTop: '0.75rem', fontSize: '0.875rem' }}>
                        {t.error}
                      </p>
                    )}
                  </div>

                </form>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
};
