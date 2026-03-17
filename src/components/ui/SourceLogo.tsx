import { useState } from 'react';
import {
  FileText, Database, Globe, Mic, Plug,
  HardDrive, Cloud, Building2, Package, BarChart3, TrendingUp, Terminal, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Source, SourceCategory, ConnectorProvider } from '@/types';
import { CONNECTORS } from '@/data/mockData';

// ─── Shared constants ────────────────────────────────────────────────────────

export const CATEGORY_ICONS: Record<SourceCategory, React.ComponentType<{ className?: string }>> = {
  data_room: FileText,
  premium_report: Database,
  api: Database,
  web: Globe,
  interview: Mic,
  connector: Plug,
};

export const CATEGORY_COLORS: Record<SourceCategory, { text: string; bg: string; border: string }> = {
  data_room: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  premium_report: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  api: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  web: { text: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200' },
  interview: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  connector: { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
};

export const CONNECTOR_ICONS: Record<ConnectorProvider, React.ComponentType<{ className?: string }>> = {
  google_drive: HardDrive,
  dropbox: Cloud,
  sharepoint: Building2,
  box: Package,
  capitaliq: BarChart3,
  pitchbook: TrendingUp,
  bloomberg: Terminal,
  intralinks: Shield,
  datasite: Database,
};

export const CONNECTOR_COLORS: Record<ConnectorProvider, { text: string; bg: string; border: string; iconBg: string }> = {
  google_drive: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', iconBg: 'bg-green-500' },
  dropbox: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-500' },
  sharepoint: { text: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200', iconBg: 'bg-sky-500' },
  box: { text: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-slate-500' },
  capitaliq: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-500' },
  pitchbook: { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', iconBg: 'bg-rose-500' },
  bloomberg: { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', iconBg: 'bg-orange-500' },
  intralinks: { text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200', iconBg: 'bg-cyan-500' },
  datasite: { text: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', iconBg: 'bg-violet-500' },
};

// Local logo paths for connectors
const CONNECTOR_LOGOS: Record<string, string> = {
  bloomberg: '/bloomeberg.jpeg', // Note: typo in filename
  capitaliq: '/capital-iq.jpeg',
  intralinks: '/intralinks.jpeg',
  pitchbook: '/pitchbook.jpeg',
  sharepoint: '/sharepoint.png',
  datasite: '/datasiteglobal_logo.jpeg',
  // Google Drive, Dropbox, Box use external URLs (work well)
};

// Premium report logos (mapped by author keywords)
const PREMIUM_REPORT_LOGOS: Record<string, string> = {
  gartner: '/gartner.jpeg',
  euromonitor: '/euromonitor.jpeg',
  mergermarket: '/mergermarket.jpeg',
};

// ─── Connector Logo Component ───────────────────────────────────────────────

export function ConnectorLogo({ src, alt, size = 24, connectorId }: { src: string; alt: string; size?: number; connectorId?: string }) {
  const [error, setError] = useState(false);

  // Use local logo if available
  const localLogo = connectorId && CONNECTOR_LOGOS[connectorId];
  const logoSrc = localLogo || src;

  if (error) {
    // Fallback: afficher les initiales
    const initials = alt.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-600 font-semibold text-[10px] rounded"
        style={{ fontSize: size * 0.4 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={logoSrc}
      alt={alt}
      width={size}
      height={size}
      className="object-contain"
      onError={() => setError(true)}
    />
  );
}

// ─── Source Logo Component ──────────────────────────────────────────────────

export function SourceLogo({ source, size = 14 }: { source: Source; size?: number }) {
  const [imageError, setImageError] = useState(false);

  // Determine logo path
  let logoPath: string | null = null;

  // Check if it's a connector source
  if (source.connectorId) {
    logoPath = CONNECTOR_LOGOS[source.connectorId] || null;

    // If no local logo, use the connector's logoUrl
    if (!logoPath) {
      const connector = CONNECTORS.find(c => c.id === source.connectorId);
      if (connector) {
        return <ConnectorLogo src={connector.logoUrl} alt={connector.name} size={size} connectorId={source.connectorId} />;
      }
    }
  }
  // Data room documents always come from Datasite
  else if (source.category === 'data_room') {
    logoPath = CONNECTOR_LOGOS.datasite;
    if (!logoPath) {
      const datasiteConnector = CONNECTORS.find(c => c.id === 'datasite');
      if (datasiteConnector) {
        return <ConnectorLogo src={datasiteConnector.logoUrl} alt={datasiteConnector.name} size={size} connectorId="datasite" />;
      }
    }
  }
  // Check if it's a premium report with known provider
  else if (source.category === 'premium_report' && source.author) {
    const authorLower = source.author.toLowerCase();
    if (authorLower.includes('gartner')) logoPath = PREMIUM_REPORT_LOGOS.gartner;
    else if (authorLower.includes('euromonitor')) logoPath = PREMIUM_REPORT_LOGOS.euromonitor;
    else if (authorLower.includes('mergermarket')) logoPath = PREMIUM_REPORT_LOGOS.mergermarket;
  }

  // If we have a logo and no error, show image
  if (logoPath && !imageError) {
    return (
      <img
        src={logoPath}
        alt="Logo"
        width={size}
        height={size}
        className="object-contain"
        onError={() => setImageError(true)}
      />
    );
  }

  // Fallback to icon
  let connector = source.connectorId ? CONNECTORS.find(c => c.id === source.connectorId) : null;

  // For data_room sources without explicit connectorId, use Datasite connector
  if (!connector && source.category === 'data_room') {
    connector = CONNECTORS.find(c => c.id === 'datasite') || null;
  }

  const Icon = connector ? (CONNECTOR_ICONS[connector.provider] || Plug) : CATEGORY_ICONS[source.category];
  const colors = connector ? CONNECTOR_COLORS[connector.provider] : CATEGORY_COLORS[source.category];

  // Map size to Lucide icon size classes
  const sizeClass = size <= 12 ? 'w-3 h-3' : size <= 16 ? 'w-4 h-4' : 'w-5 h-5';

  return <Icon className={cn(colors.text, sizeClass)} />;
}
