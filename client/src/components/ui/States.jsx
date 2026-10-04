import { TriangleAlert, Inbox } from 'lucide-react';

export const Spinner = () => <span className="spinner" aria-hidden="true" />;

export const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <Spinner />
    <span className="visually-hidden">Loading…</span>
  </div>
);

export const Skeleton = ({ height = 16, width = '100%', style }) => <div className="skeleton" style={{ height, width, ...style }} aria-hidden="true" />;

export const CardSkeletons = ({ count = 6, height = 180, className = 'grid grid-3' }) => (
  <div className={className} aria-busy="true" aria-label="Loading">
    {Array.from({ length: count }).map((_, i) => <Skeleton key={i} height={height} style={{ borderRadius: 10 }} />)}
  </div>
);

export const EmptyState = ({ title = 'Nothing here yet', text, children }) => (
  <div className="state">
    <Inbox size={40} aria-hidden="true" />
    <h3>{title}</h3>
    {text && <p>{text}</p>}
    {children}
  </div>
);

export const ErrorState = ({ message = 'Something went wrong.', onRetry }) => (
  <div className="state" role="alert">
    <TriangleAlert size={40} aria-hidden="true" />
    <h3>We couldn’t load this</h3>
    <p>{message}</p>
    {onRetry && <button type="button" className="btn btn--secondary" onClick={onRetry}>Try again</button>}
  </div>
);
