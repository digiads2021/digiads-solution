import useForm, { isEmail, isPhone } from '../../hooks/useForm.js';
import { submitContact } from '../../api/index.js';
import { Input, Textarea, Honeypot } from '../ui/Field.jsx';
import { Spinner } from '../ui/States.jsx';
import FormSuccess from './FormSuccess.jsx';

const validate = (v) => ({
  name: v.name.trim().length < 2 ? 'Please enter your name' : '',
  email: !isEmail(v.email) ? 'Please enter a valid email address' : '',
  phone: !isPhone(v.phone) ? 'Please enter a valid phone number' : '',
  subject: v.subject.trim().length < 2 ? 'Please add a subject' : '',
  message: v.message.trim().length < 5 ? 'Please write a short message' : '',
});

export default function ContactForm() {
  const { bind, errors, handleSubmit, submitting, success, formError, reset } = useForm(
    { name: '', email: '', phone: '', subject: '', message: '', website: '' },
    validate
  );
  if (success) return <FormSuccess message={success.message} onReset={reset} resetLabel="Send another message" />;

  return (
    <form className="form form--compact form--contact" noValidate onSubmit={handleSubmit(submitContact)}>
      {formError && <div className="form-alert form-alert--error" role="alert">{formError}</div>}
      <div className="form-row">
        <Input label="Full name" required autoComplete="name" error={errors.name} {...bind('name')} />
        <Input label="Phone" required type="tel" autoComplete="tel" error={errors.phone} {...bind('phone')} />
      </div>
      <Input label="Email" required type="email" autoComplete="email" error={errors.email} {...bind('email')} />
      <Input label="Subject" required error={errors.subject} {...bind('subject')} />
      <Textarea label="Message" required rows={4} error={errors.message} {...bind('message')} />
      <Honeypot {...bind('website')} />
      <button type="submit" className="btn btn--primary btn--lg ct-submit" disabled={submitting}>
        {submitting ? <><Spinner /> Sending…</> : 'Send message'}
      </button>
    </form>
  );
}
