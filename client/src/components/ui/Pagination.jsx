import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, pages, onChange }) {
  if (!pages || pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter((n) => n === 1 || n === pages || Math.abs(n - page) <= 1);
  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page"><ChevronLeft size={16} style={{ margin: 'auto' }} /></button>
      {nums.map((n, i) => (
        <span key={n} style={{ display: 'contents' }}>
          {i > 0 && n - nums[i - 1] > 1 && <span aria-hidden="true">…</span>}
          <button type="button" onClick={() => onChange(n)} aria-current={n === page ? 'page' : undefined}>{n}</button>
        </span>
      ))}
      <button type="button" onClick={() => onChange(page + 1)} disabled={page >= pages} aria-label="Next page"><ChevronRight size={16} style={{ margin: 'auto' }} /></button>
    </nav>
  );
}
