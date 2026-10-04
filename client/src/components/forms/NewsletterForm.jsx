import { useState } from 'react';
import { subscribeNewsletter } from '../../api/index.js';
import { isEmail } from '../../hooks/useForm.js';
import { Spinner } from '../ui/States.jsx';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ status: 'idle', message: '' });

  const submit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) return setState({ status: 'error', message: 'Please enter a valid email address.' });
    setState({ status: 'loading', message: '' });
    try {
      const res = await subscribeNewsletter({ email });
      setState({ status: 'success', message: res.message });
      setEmail('');
    } catch (err) {
      setState({ status: 'error', message: err.message });
    }
  };

  return (
    <form className="news-form" onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
      <input id="newsletter-email" type="email" className="input" placeholder="Your email address" autoComplete="email" value={email}
        onChange={(e) => setEmail(e.target.value)} aria-invalid={state.status === 'error' ? 'true' : undefined} aria-describedby="newsletter-msg" />
      <button type="submit" className="btn btn--white" disabled={state.status === 'loading'}>
        {state.status === 'loading' ? <Spinner /> : 'Subscribe'}
      </button>
      <span id="newsletter-msg" className="news-form__msg" role="status" aria-live="polite" style={{ color: state.status === 'error' ? '#ffb4b4' : '#9be8c6' }}>
        {state.message}
      </span>
    </form>
  );
}
