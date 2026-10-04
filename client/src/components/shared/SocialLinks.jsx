import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useSite } from '../../context/SiteContext.jsx';

// Brand marks that lucide does not ship.
const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" />
  </svg>
);
const ThreadsIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.7 11.12a7.6 7.6 0 0 0-.29-.13c-.17-3.13-1.88-4.92-4.75-4.94h-.04c-1.72 0-3.15.73-4.03 2.07l1.58 1.08c.66-1 1.69-1.21 2.45-1.21h.03c.95.01 1.66.28 2.12.81.34.39.56.92.67 1.6a12.1 12.1 0 0 0-2.7-.13c-2.71.16-4.46 1.74-4.34 3.93.06 1.11.62 2.07 1.56 2.69.8.53 1.83.79 2.9.73 1.41-.08 2.52-.62 3.29-1.6.59-.75.96-1.71 1.12-2.93.67.4 1.17.94 1.44 1.58.47 1.09.5 2.88-.97 4.34-1.28 1.28-2.82 1.83-5.15 1.85-2.58-.02-4.54-.85-5.81-2.46-1.19-1.51-1.8-3.69-1.83-6.48.03-2.79.64-4.97 1.83-6.48 1.27-1.61 3.23-2.44 5.81-2.46 2.6.02 4.59.85 5.91 2.48.65.8 1.13 1.8 1.45 2.97l1.86-.5c-.39-1.43-1-2.67-1.82-3.68C17.96 2.04 15.47.98 12.26.96h-.01C9.05.98 6.6 2.05 4.96 4.13 3.5 5.98 2.75 8.55 2.72 11.77v.02c.03 3.22.78 5.79 2.24 7.64 1.64 2.08 4.09 3.15 7.29 3.17h.01c2.85-.02 4.85-.77 6.51-2.42 2.17-2.16 2.1-4.88 1.39-6.54-.51-1.19-1.48-2.16-2.81-2.8Zm-4.9 4.6c-1.19.07-2.42-.47-2.48-1.6-.05-.84.6-1.78 2.55-1.89.22-.01.44-.02.66-.02.71 0 1.37.07 1.97.2-.22 2.79-1.53 3.25-2.7 3.31Z" />
  </svg>
);

const NETWORKS = [
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'youtube', label: 'YouTube', Icon: Youtube },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'x', label: 'X (Twitter)', Icon: XIcon },
  { key: 'threads', label: 'Threads', Icon: ThreadsIcon },
];

// Row of round social icons. variant: "dark" (on navy backgrounds) or "light".
export default function SocialLinks({ variant = 'light', size = 18, className = '' }) {
  const { settings } = useSite();
  const links = NETWORKS.filter((n) => settings?.social?.[n.key]);
  if (!links.length) return null;
  return (
    <ul className={`social social--${variant} ${className}`} aria-label="DigiAds on social media">
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a href={settings.social[key]} target="_blank" rel="noopener noreferrer" aria-label={`DigiAds on ${label}`} title={label}>
            <Icon size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
