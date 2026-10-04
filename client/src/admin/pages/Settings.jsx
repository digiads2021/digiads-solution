import { useEffect, useState } from 'react';
import { admin, changePassword } from '../../api/index.js';
import { Input, Textarea } from '../../components/ui/Field.jsx';
import { PageLoader, Spinner } from '../../components/ui/States.jsx';
import { PageHead } from '../components/AdminUI.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Settings() {
  const { admin: me } = useAuth();
  const isSuper = me?.role === 'superadmin';
  const [s, setS] = useState(null);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [pwMsg, setPwMsg] = useState({ type: '', text: '' });

  useEffect(() => { admin.settings().then(setS).catch((e) => setMsg({ type: 'error', text: e.message })); }, []);
  if (!s) return msg.text ? <div className="form-alert form-alert--error">{msg.text}</div> : <PageLoader />;

  const setPath = (group, key) => (e) => setS({ ...s, [group]: { ...(s[group] || {}), [key]: e.target.value } });
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await admin.updateSettings({ siteName: s.siteName, tagline: s.tagline, contact: s.contact, social: s.social, seoDefaults: s.seoDefaults });
      setMsg({ type: 'success', text: 'Settings saved. Reload the website to see changes.' });
    } catch (err) { setMsg({ type: 'error', text: err.message }); } finally { setSaving(false); }
  };
  const savePw = async (e) => {
    e.preventDefault();
    if (pw.newPassword.length < 10) return setPwMsg({ type: 'error', text: 'Use at least 10 characters.' });
    if (pw.newPassword !== pw.confirm) return setPwMsg({ type: 'error', text: 'Passwords do not match.' });
    try {
      await changePassword({ currentPassword: pw.currentPassword, newPassword: pw.newPassword });
      setPw({ currentPassword: '', newPassword: '', confirm: '' });
      setPwMsg({ type: 'success', text: 'Password updated.' });
    } catch (err) { setPwMsg({ type: 'error', text: err.message }); }
  };
  const c = s.contact || {};
  const seo = s.seoDefaults || {};
  const so = s.social || {};

  return (
    <>
      <PageHead crumbs="Admin / System" title="Settings" />
      {isSuper ? (
        <form className="panel" onSubmit={save} style={{ marginBottom: 20 }}>
          <div className="panel__head"><h2>Website settings</h2></div>
          <div className="panel__body form-grid">
            {msg.text && <div className={`full form-alert form-alert--${msg.type}`}>{msg.text}</div>}
            <div className="full notice">Leave a field empty to use the official default (phone, email and social links). Address and working hours appear on the website only once filled in.</div>
            <Input label="Site name" name="siteName" id="siteName" value={s.siteName || ''} onChange={(e) => setS({ ...s, siteName: e.target.value })} />
            <Input label="Tagline" name="tagline" id="tagline" value={s.tagline || ''} onChange={(e) => setS({ ...s, tagline: e.target.value })} />
            <Input label="Phone" name="phone" id="phone" value={c.phone || ''} onChange={setPath('contact', 'phone')} />
            <Input label="Email" name="email" id="email" type="email" value={c.email || ''} onChange={setPath('contact', 'email')} />
            <Input label="WhatsApp number" name="whatsapp" id="whatsapp" value={c.whatsapp || ''} onChange={setPath('contact', 'whatsapp')} />
            <Input label="Working hours" name="hours" id="hours" value={c.hours || ''} onChange={setPath('contact', 'hours')} />
            <Textarea label="Office address (India)" name="addressIndia" id="addressIndia" rows={2} value={c.addressIndia || ''} onChange={setPath('contact', 'addressIndia')} />
            <Textarea label="Office address (UAE)" name="addressUAE" id="addressUAE" rows={2} value={c.addressUAE || ''} onChange={setPath('contact', 'addressUAE')} />
            <Input label="Facebook URL" name="facebook" id="facebook" value={so.facebook || ''} onChange={setPath('social', 'facebook')} />
            <Input label="Instagram URL" name="instagram" id="instagram" value={so.instagram || ''} onChange={setPath('social', 'instagram')} />
            <Input label="LinkedIn URL" name="linkedin" id="linkedin" value={so.linkedin || ''} onChange={setPath('social', 'linkedin')} />
            <Input label="YouTube URL" name="youtube" id="youtube" value={so.youtube || ''} onChange={setPath('social', 'youtube')} />
            <Input label="X (Twitter) URL" name="x" id="x" value={so.x || ''} onChange={setPath('social', 'x')} />
            <Input label="Threads URL" name="threads" id="threads" value={so.threads || ''} onChange={setPath('social', 'threads')} />
            <div className="full"><Input label="Default SEO title" name="seoTitle" id="seoTitle" value={seo.title || ''} onChange={setPath('seoDefaults', 'title')} /></div>
            <div className="full"><Textarea label="Default SEO description" name="seoDesc" id="seoDesc" rows={2} value={seo.description || ''} onChange={setPath('seoDefaults', 'description')} /></div>
          </div>
          <div className="sticky-save"><button type="submit" className="btn btn--primary" disabled={saving}>{saving ? <><Spinner /> Saving…</> : 'Save settings'}</button></div>
        </form>
      ) : <div className="notice" style={{ marginBottom: 20 }}>Only a superadmin can change website settings.</div>}

      <form className="panel" onSubmit={savePw} style={{ maxWidth: 560 }}>
        <div className="panel__head"><h2>Change your password</h2></div>
        <div className="panel__body form">
          {pwMsg.text && <div className={`form-alert form-alert--${pwMsg.type}`}>{pwMsg.text}</div>}
          <Input label="Current password" name="cur" id="cur" type="password" autoComplete="current-password" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} />
          <Input label="New password" name="new" id="new" type="password" autoComplete="new-password" hint="At least 10 characters" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} />
          <Input label="Confirm new password" name="confirm" id="confirm" type="password" autoComplete="new-password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
          <button type="submit" className="btn btn--primary" style={{ justifySelf: 'start' }}>Update password</button>
        </div>
      </form>
    </>
  );
}
