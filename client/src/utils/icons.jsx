// Maps icon names stored in MongoDB (e.g. "Building2") to Lucide icon components.
// Only the icons listed here are bundled, which keeps the JavaScript small.
import {
  Building2, Building, HeartHandshake, ClipboardCheck, Receipt, ShieldCheck, Rocket, BadgeCheck, FilePenLine,
  Briefcase, MonitorSmartphone, Earth, Globe, FileCheck, CalendarCheck, RefreshCw, Repeat, Calculator, Stamp,
  UtensilsCrossed, Ship, Gavel, Lightbulb, MessagesSquare, Scale, Users, LayoutDashboard, Smartphone, Plug,
  Landmark, ScrollText, Plane, FileText,
} from 'lucide-react';

const map = {
  Building2, Building, HeartHandshake, ClipboardCheck, Receipt, ShieldCheck, Rocket, BadgeCheck,
  FileSignature: FilePenLine, FilePenLine, Briefcase, MonitorSmartphone, Globe2: Earth, Earth, Globe,
  FileCheck2: FileCheck, FileCheck, CalendarCheck, RefreshCw, Repeat, Calculator, Stamp, UtensilsCrossed, Ship,
  Gavel, Lightbulb, MessagesSquare, Scale, Users, LayoutDashboard, Smartphone, Plug, Landmark, ScrollText, Plane, FileText,
};

export const iconNames = Object.keys(map);

export default function Icon({ name, size = 20, ...props }) {
  const Cmp = map[name] || FileText;
  return <Cmp size={size} strokeWidth={1.75} aria-hidden="true" {...props} />;
}
