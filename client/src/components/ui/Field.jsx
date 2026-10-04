// Accessible form fields: label, required marker, error message linked by aria-describedby.
export function Field({ label, name, required, error, hint, children }) {
  return (
    <div className="field">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="req" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && <span className="field-error" id={`${name}-error`}>{error}</span>}
    </div>
  );
}

export const Input = ({ label, required, error, hint, ...props }) => (
  <Field label={label} name={props.name} required={required} error={error} hint={hint}>
    <input className="input" required={required} {...props} />
  </Field>
);

export const Textarea = ({ label, required, error, hint, ...props }) => (
  <Field label={label} name={props.name} required={required} error={error} hint={hint}>
    <textarea className="textarea" required={required} {...props} />
  </Field>
);

export const Select = ({ label, required, error, hint, options = [], placeholder, ...props }) => (
  <Field label={label} name={props.name} required={required} error={error} hint={hint}>
    <select className="select" required={required} {...props}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((o) => (typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>))}
    </select>
  </Field>
);

// Hidden honeypot field: humans never see it, bots often fill it.
export const Honeypot = ({ value, onChange }) => (
  <div className="hp-field" aria-hidden="true">
    <label htmlFor="website">Website</label>
    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={value || ''} onChange={onChange} />
  </div>
);
