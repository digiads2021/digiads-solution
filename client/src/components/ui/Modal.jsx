import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js';

// Accessible modal dialog: Esc closes, focus moves inside and returns on close, backdrop click closes.
export default function Modal({ open, onClose, title, children, size, labelledBy, className = '', hideHeader = false }) {
  const ref = useRef(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    setTimeout(() => ref.current?.querySelector('input, textarea, select, button')?.focus(), 30);
    return () => { document.removeEventListener('keydown', onKey); previous?.focus?.(); };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className={`modal ${size === 'lg' ? 'modal--lg' : ''} ${className}`} role="dialog" aria-modal="true" aria-labelledby={labelledBy || 'modal-title'}>
        {!hideHeader && (
          <div className="modal__head">
            <h2 id="modal-title">{title}</h2>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close dialog"><X size={20} /></button>
          </div>
        )}
        {hideHeader ? children : <div className="modal__body">{children}</div>}
      </div>
    </div>,
    document.body
  );
}
