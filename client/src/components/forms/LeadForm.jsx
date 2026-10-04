import { useLocation } from 'react-router-dom';
import useForm, { isEmail, isPhone } from '../../hooks/useForm.js';
import { submitLead } from '../../api/index.js';
import { Input, Textarea, Honeypot } from '../ui/Field.jsx';
import { Spinner } from '../ui/States.jsx';
import FormSuccess from './FormSuccess.jsx';

const validate = (v) => ({
  name: v.name.trim().length < 2 ? 'Please enter your name' : '',
  phone: !isPhone(v.phone) ? 'Please enter a valid phone number' : '',
  email: v.email && !isEmail(v.email) ? 'Please enter a valid email address' : '',
});

// Service-page enquiry form. service = { slug, name }
export default function LeadForm({ service, idPrefix = 'lead' }) {
  const location = useLocation();
  const { bind, errors, handleSubmit, submitting, success, formError, reset } = useForm(
    { name: '', phone: '', email: '', city: '', message: '', website: '' },
    validate
  );
  // Prefix ids so two forms on one page don't share ids.
  const b = (name) => ({ ...bind(name), id: `${idPrefix}-${name}`, 'aria-describedby': errors[name] ? `${idPrefix}-${name}-error` : undefined });

  if (success) return <FormSuccess message={success.message} onReset={reset} />;

  return (
    <form className="form" noValidate onSubmit={handleSubmit((v) => submitLead({ ...v, service: service?.slug, serviceName: service?.name, sourcePage: location.pathname }))}>
      {formError && <div className="form-alert form-alert--error" role="alert">{formError}</div>}
      <Input label="Full name" required autoComplete="name" error={errors.name} {...b('name')} name={`${idPrefix}-name`} />
      <Input label="Phone" required type="tel" inputMode="tel" autoComplete="tel" error={errors.phone} {...b('phone')} name={`${idPrefix}-phone`} />
      <Input label="Email" type="email" autoComplete="email" error={errors.email} {...b('email')} name={`${idPrefix}-email`} />
      <Input label="City" autoComplete="address-level2" {...b('city')} name={`${idPrefix}-city`} />
      <Textarea label="Message" rows={3} placeholder="Anything we should know?" {...b('message')} name={`${idPrefix}-message`} />
      <Honeypot {...bind('website')} />
      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={submitting}>
        {submitting ? <><Spinner /> Sending…</> : 'Get Started'}
      </button>
      <p className="field-hint" style={{ margin: 0 }}>No obligation. A DigiAds expert will call you to understand your requirement.</p>
    </form>
  );
}
