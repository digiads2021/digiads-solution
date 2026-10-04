import { CircleCheck } from 'lucide-react';

export default function FormSuccess({ message, onReset, resetLabel = 'Send another request' }) {
  return (
    <div className="form-success" role="status" aria-live="polite">
      <CircleCheck size={44} aria-hidden="true" />
      <h3>Request received</h3>
      <p className="muted">{message}</p>
      {onReset && <button type="button" className="btn btn--secondary" onClick={onReset}>{resetLabel}</button>}
    </div>
  );
}
