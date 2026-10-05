import { useEffect, useState } from 'react';
import { CheckCircle2, Download, EllipsisVertical, MonitorDown, Share, SquarePlus, Smartphone } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { installState, isIOS, promptInstall, subscribeInstall } from '../../utils/installApp.js';

// Platform-specific steps for browsers that can't show the one-tap install prompt.
function InstallSteps() {
  if (isIOS) {
    return (
      <ol className="app-steps">
        <li><span><Share size={18} aria-hidden="true" /></span><p>Open this site in <strong>Safari</strong> and tap the <strong>Share</strong> button.</p></li>
        <li><span><SquarePlus size={18} aria-hidden="true" /></span><p>Scroll down and tap <strong>Add to Home Screen</strong>.</p></li>
        <li><span><CheckCircle2 size={18} aria-hidden="true" /></span><p>Tap <strong>Add</strong> — the DigiAds app appears on your home screen.</p></li>
      </ol>
    );
  }
  return (
    <ol className="app-steps">
      <li><span><EllipsisVertical size={18} aria-hidden="true" /></span><p>Open your browser menu (<strong>⋮</strong> in Chrome or Edge).</p></li>
      <li><span><MonitorDown size={18} aria-hidden="true" /></span><p>Choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p></li>
      <li><span><CheckCircle2 size={18} aria-hidden="true" /></span><p>Confirm — DigiAds opens like an app from your home screen or desktop.</p></li>
    </ol>
  );
}

export default function DownloadApp() {
  const [state, setState] = useState(installState);
  const [help, setHelp] = useState(false);
  useEffect(() => subscribeInstall(() => setState(installState())), []);

  const onDownload = async () => {
    if (state.canPrompt) {
      const outcome = await promptInstall();
      if (outcome !== 'unavailable') return;
    }
    setHelp(true);
  };

  return (
    <div className="app-card">
      <img className="app-card__icon" src="/icon-192.png" alt="" width="60" height="60" loading="lazy" />
      <div className="app-card__text">
        <h3>Get the DigiAds app</h3>
        <p>Services, WhatsApp chat and expert help — one tap from your home screen.</p>
        <ul className="app-card__platforms" aria-label="Available on">
          <li><Smartphone size={14} aria-hidden="true" /> Android</li>
          <li><Smartphone size={14} aria-hidden="true" /> iPhone</li>
          <li><MonitorDown size={14} aria-hidden="true" /> Desktop</li>
        </ul>
      </div>
      {state.installed ? (
        <span className="app-card__installed"><CheckCircle2 size={18} aria-hidden="true" /> App installed</span>
      ) : (
        <button type="button" className="btn btn--glow app-card__btn" onClick={onDownload}>
          <Download size={18} aria-hidden="true" /> Download App
        </button>
      )}

      <Modal open={help} onClose={() => setHelp(false)} title="Install the DigiAds app">
        <p className="muted" style={{ marginTop: 0 }}>It takes a few seconds and needs no app store. The app opens full-screen with its own icon.</p>
        <InstallSteps />
        <button type="button" className="btn btn--primary btn--block" onClick={() => setHelp(false)}>Got it</button>
      </Modal>
    </div>
  );
}
