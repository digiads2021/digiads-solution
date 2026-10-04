import { Link } from 'react-router-dom';
import { formatDate, assetUrl } from '../../utils/format.js';

export default function BlogCard({ post, compact = false }) {
  return (
    <article className="card card--hover" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10, padding: compact ? 20 : 24 }}>
      {!compact && post.featuredImage?.url && (
        <img src={assetUrl(post.featuredImage.url)} alt={post.featuredImage.alt || ''} loading="lazy" width="640" height="360" style={{ borderRadius: 8, aspectRatio: '16/9', objectFit: 'cover' }} />
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="badge">{post.category}</span>
        <span className="small muted">{formatDate(post.publishedAt)}</span>
      </div>
      <h3 style={{ fontSize: compact ? '1rem' : '1.125rem', margin: 0 }}>
        <Link to={`/blog/${post.slug}`} style={{ color: 'var(--text-primary)' }}>
          {post.title}
          <span style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />
        </Link>
      </h3>
      {!compact && post.excerpt && <p className="small muted" style={{ margin: 0 }}>{post.excerpt}</p>}
    </article>
  );
}
