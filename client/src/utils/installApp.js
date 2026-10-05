// "Download App" support: the site installs as an app (PWA) on Android, desktop Chrome/Edge and iPhone.
// The browser's install prompt fires once, early in page load, so it is captured here at startup.
let deferredPrompt = null;
const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());

const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
export const isIOS = /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document);
export const isStandalone = () =>
  typeof window !== 'undefined' && (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true);

let installed = isStandalone();

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // keep it for our own "Download App" button
    deferredPrompt = e;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    installed = true;
    deferredPrompt = null;
    notify();
  });
}

export const installState = () => ({ canPrompt: Boolean(deferredPrompt), installed });

export const subscribeInstall = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

// Shows the browser's install dialog. Returns 'accepted' | 'dismissed' | 'unavailable'.
export async function promptInstall() {
  if (!deferredPrompt) return 'unavailable';
  const prompt = deferredPrompt;
  deferredPrompt = null;
  prompt.prompt();
  const { outcome } = await prompt.userChoice;
  if (outcome === 'accepted') installed = true;
  notify();
  return outcome;
}

// Registers the (no-cache) service worker that makes the site installable. Production only.
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { /* install button falls back to instructions */ });
  });
}
