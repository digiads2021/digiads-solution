import { useLocation } from 'react-router-dom';
import useForm, { isEmail, isPhone } from '../../hooks/useForm.js';
import { submitConsultation } from '../../api/index.js';
import { Input, Textarea, Select, Honeypot } from '../ui/Field.jsx';
import { Spinner } from '../ui/States.jsx';
import FormSuccess from './FormSuccess.jsx';

const validate = (v) => ({
  name: v.name.trim().length < 2 ? 'Please enter your name' : '',
  phone: !isPhone(v.phone) ? 'Please enter a valid phone number' : '',
  email: v.email && !isEmail(v.email) ? 'Please enter a valid email address' : '',
});

// service: optional { slug, name } to pre-fill
export default function ConsultationForm({ service, onDone, compact = false }) {
  const location = useLocation();
  const form = useForm(
    { name: '', phone: '', email: '', preferredContact: 'phone', message: '', website: '' },
    validate
  );
  const { bind, errors, handleSubmit, submitting, success, formError, reset } = form;

  if (success) return <FormSuccess message={success.message} onReset={onDone ? undefined : reset} />;

  return (
    <form className="form" noValidate onSubmit={handleSubmit((v) =>
      submitConsultation({ ...v, service: service?.slug, serviceName: service?.name, sourcePage: location.pathname })
    )}>
      {formError && <div className="form-alert form-alert--error" role="alert">{formError}</div>}
      {service?.name && <div className="badge" style={{ justifySelf: 'start' }}>Service: {service.name}</div>}
      <Input label="Full name" required autoComplete="name" error={errors.name} {...bind('name')} />
      <div className={compact ? 'form' : 'form-row'}>
        <Input label="Phone" required type="tel" autoComplete="tel" inputMode="tel" error={errors.phone} {...bind('phone')} />
        <Input label="Email" type="email" autoComplete="email" error={errors.email} {...bind('email')} />
      </div>
      <Select label="Preferred contact method" options={[{ value: 'phone', label: 'Phone call' }, { value: 'whatsapp', label: 'WhatsApp' }, { value: 'email', label: 'Email' }]} {...bind('preferredContact')} />
      <Textarea label="What do you need help with?" rows={compact ? 3 : 4} placeholder="e.g. I want to start a company with a friend and also need GST." error={errors.message} {...bind('message')} />
      <Honeypot {...bind('website')} />
      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={submitting}>
        {submitting ? <><Spinner /> Sending…</> : 'Request a callback'}
      </button>
      <p className="field-hint" style={{ margin: 0 }}>By submitting, you agree to be contacted by DigiAds about your request. See our <a href="/privacy-policy">Privacy Policy</a>.</p>
    </form>
  );
}
