import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { contactTranslations } from '../translations/contact';
import './ContactLightPrototype.css';

const COUNTRIES = [
  'Portugal', 'Spain', 'France', 'Germany', 'Italy', 'United Kingdom',
  'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Poland', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'Ireland', 'Czech Republic', 'Romania',
  'Hungary', 'Greece', 'Brazil', 'United States', 'Canada', 'Mexico',
  'Argentina', 'Colombia', 'Chile', 'China', 'Japan', 'India', 'Australia',
  'South Africa', 'United Arab Emirates', 'Saudi Arabia', 'Other',
];

type ContactType = '' | 'newsletter' | 'distributor' | 'information';

type FormData = {
  contactType: ContactType;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  country: string;
  comments: string;
  privacyPolicy: boolean;
  newsletter: boolean;
};

const initialFormData: FormData = {
  contactType: '',
  name: '',
  email: '',
  phone: '',
  companyName: '',
  country: '',
  comments: '',
  privacyPolicy: false,
  newsletter: false,
};

const HUB_CONTACTS_URL = 'https://hub.sotkon.org/api/web-contacts';

export const ContactLightPrototype: React.FC = () => {
  const location = useLocation();
  const t = contactTranslations.en;
  const isRealSubmit = new URLSearchParams(location.search).get('submit') === 'real';
  const [formData, setFormData] = useState<FormData>(() => {
    const params = new URLSearchParams(location.search);
    return {
      ...initialFormData,
      contactType: params.get('type') === 'newsletter' ? 'newsletter' : '',
      email: params.get('email') ?? '',
    };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastPayload, setLastPayload] = useState<Record<string, unknown> | null>(null);

  const payload = useMemo(() => ({
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
  }), [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setSubmitStatus('idle');
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactType || !formData.email || !formData.privacyPolicy) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setLastPayload(payload);

    try {
      if (isRealSubmit) {
        const response = await fetch(HUB_CONTACTS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Hub submission failed');
      }

      setSubmitStatus('success');
      if (isRealSubmit) setFormData(initialFormData);
    } catch {
      setSubmitStatus('error');
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
        <a href={parts[2]} target="_blank" rel="noopener noreferrer" className="contact-light__link">
          {parts[1]}
        </a>
        {parts[3]}
      </>
    );
  };

  return (
    <main className="contact-light">
      <section className="contact-light__shell" aria-labelledby="contact-light-title">
        <div className="contact-light__intro">
          <p className="contact-light__eyebrow">Hub contact form prototype</p>
          <h1 id="contact-light-title">Contact us</h1>
          <p>
            A light version of the SOTKIS contact form, prepared for the Umbraco replacement.
          </p>
          <div className="contact-light__mode">
            {isRealSubmit ? 'Real Hub submit mode' : 'Dry-run mode: no records are created'}
          </div>
        </div>

        <form className="contact-light__form" onSubmit={handleSubmit}>
          <div className="contact-light__field contact-light__field--full">
            <label htmlFor="contactType">Type of contact</label>
            <select
              id="contactType"
              name="contactType"
              value={formData.contactType}
              onChange={handleChange}
              required
            >
              <option value="">{t.form.contactType.placeholder}</option>
              <option value="newsletter">{t.form.contactType.newsletter}</option>
              <option value="distributor">{t.form.contactType.distributor}</option>
              <option value="information">{t.form.contactType.information}</option>
            </select>
          </div>

          {formData.contactType === 'newsletter' && (
            <>
              <div className="contact-light__field">
                <label htmlFor="country">Country</label>
                <select id="country" name="country" value={formData.country} onChange={handleChange}>
                  <option value="">{t.form.country.placeholder}</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="contact-light__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.form.email.placeholder}
                  autoComplete="email"
                />
              </div>
              <div className="contact-light__field contact-light__field--full">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.form.name.placeholder}
                  autoComplete="name"
                />
              </div>
            </>
          )}

          {formData.contactType === 'distributor' && (
            <>
              <div className="contact-light__field">
                <label htmlFor="companyName">Company</label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder={t.form.companyName.placeholder}
                  autoComplete="organization"
                />
              </div>
              <div className="contact-light__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.form.email.placeholder}
                  autoComplete="email"
                />
              </div>
              <div className="contact-light__field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.form.phone.placeholder}
                  autoComplete="tel"
                />
              </div>
              <div className="contact-light__field">
                <label htmlFor="country">Country</label>
                <select id="country" name="country" value={formData.country} onChange={handleChange}>
                  <option value="">{t.form.country.placeholder}</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="contact-light__field contact-light__field--full">
                <label htmlFor="comments">Message</label>
                <textarea
                  id="comments"
                  name="comments"
                  rows={4}
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder={t.form.comments.placeholder}
                />
              </div>
            </>
          )}

          {formData.contactType === 'information' && (
            <>
              <div className="contact-light__field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.form.name.placeholder}
                  autoComplete="name"
                />
              </div>
              <div className="contact-light__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.form.email.placeholder}
                  autoComplete="email"
                />
              </div>
              <div className="contact-light__field contact-light__field--full">
                <label htmlFor="comments">Message</label>
                <textarea
                  id="comments"
                  name="comments"
                  rows={4}
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder={t.form.comments.placeholder}
                />
              </div>
            </>
          )}

          <div className="contact-light__consents">
            <label className="contact-light__checkbox">
              <input
                type="checkbox"
                name="privacyPolicy"
                checked={formData.privacyPolicy}
                onChange={handleChange}
                required
              />
              <span>{renderPrivacyText(t.privacy.policy)}</span>
            </label>
            <label className="contact-light__checkbox">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <span>{t.privacy.newsletter}</span>
            </label>
          </div>

          <div className="contact-light__actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t.form.submitting : t.form.submit}
            </button>
            {submitStatus === 'success' && (
              <p className="contact-light__status contact-light__status--success">
                {isRealSubmit ? t.success : 'Dry run succeeded. Payload is shown below.'}
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="contact-light__status contact-light__status--error">{t.error}</p>
            )}
          </div>
        </form>

        {lastPayload && !isRealSubmit && (
          <pre className="contact-light__payload">
            {JSON.stringify(lastPayload, null, 2)}
          </pre>
        )}
      </section>
    </main>
  );
};
