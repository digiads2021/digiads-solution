import { useState } from 'react';

/**
 * Tiny form helper (no extra library):
 *  - values / setField
 *  - client-side validation via a validate(values) function returning { field: message }
 *  - server-side field errors merged in after submit
 *  - submitting / success / formError state
 */
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [formError, setFormError] = useState('');

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const bind = (name) => ({
    name,
    id: name,
    value: values[name] ?? '',
    onChange: (e) => setField(name, e.target.type === 'checkbox' ? e.target.checked : e.target.value),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    setFormError('');
    const clientErrors = validate ? validate(values) : {};
    const hasErrors = Object.values(clientErrors).some(Boolean);
    setErrors(clientErrors);
    if (hasErrors) {
      const first = Object.keys(clientErrors).find((k) => clientErrors[k]);
      document.getElementById(first)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const result = await onSubmit(values);
      setSuccess(result || true);
    } catch (err) {
      setErrors(err.errors || {});
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => { setValues(initialValues); setErrors({}); setSuccess(null); setFormError(''); };

  return { values, setValues, setField, errors, bind, handleSubmit, submitting, success, formError, reset };
}

// Shared validators
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim());
export const isPhone = (v) => /^[+]?[\d\s-]{7,16}$/.test(String(v || '').trim());
