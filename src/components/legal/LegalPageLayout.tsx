import { useEffect, useRef, useState, useCallback, type MouseEvent } from 'react';
import {
  Activity,
  AlertTriangle,
  Ban,
  Building2,
  CheckCircle2,
  ChevronRight,
  CloudCheck,
  CreditCard,
  Database,
  Download,
  Eye,
  FileCheck2,
  Hash,
  Lock,
  Mail,
  MapPin,
  MessageSquarePlus,
  MessageSquareText,
  PhoneCall,
  Printer,
  RefreshCw,
  Scale,
  Server,
  ShieldCheck,
  Smartphone,
  Trash2,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppRoute, LegalDocKind, ROUTE_PATHS, buildRouteHref } from '../../routing';
import { FOCUS_RING } from '../senear/hooks';
import {
  GABBA_STUDIO_OPERATOR,
  LEGAL_UI_COPY,
  LegalIconKey,
  LegalLang,
  LegalTableCellValue,
  ProductLegalBundle,
  resolveLegalLang,
} from './legalCore';
import {
  AllLegalNotesMap,
  countNonEmptyNotes,
  createEmptyAllNotes,
  fetchAllCloudLegalNotes,
  formatNoteTimestamp,
  loadLocalLegalNotes,
  mergeCloudAndLocalNotes,
  saveCloudSectionNote,
  saveLocalLegalNotes,
  toReviewDocKey,
} from './legalReviewStorage';

export interface LegalPageLayoutProps {
  bundle: ProductLegalBundle;
  activeDoc: LegalDocKind;
  focusDeletion?: boolean;
  onNavigate?: (route: AppRoute) => void;
}

const DOC_ORDER: LegalDocKind[] = ['privacy', 'terms', 'operations'];

const REVIEW_UI_COPY: Record<
  LegalLang,
  {
    exportPdfBtn: string;
    exportPdfSub: string;
    panelBadge: string;
    panelTitle: string;
    panelDesc: string;
    cloudActiveLabel: string;
    refreshBtn: string;
    generalNoteLabel: string;
    generalNotePlaceholder: string;
    jumpToCommentsLabel: string;
    addSectionNoteBtn: string;
    sectionNoteHeader: (title: string) => string;
    sectionNotePlaceholder: string;
    savingLabel: string;
    savedCloudLabel: (timeStr: string) => string;
    savedLocalLabel: string;
    saveNowBtn: string;
    printSummaryTitle: string;
    printGeneralLabel: string;
    printSectionNoteTitle: (author: string, timeStr: string) => string;
  }
> = {
  hu: {
    exportPdfBtn: 'Letöltés PDF-ként (megjegyzésekkel együtt)',
    exportPdfSub: 'PDF mentés / Nyomtatás',
    panelBadge: 'Ügyvédi véleményezés & Felhőszinkron (Adri & Gábor)',
    panelTitle: 'Ügyvédi megjegyzések és PDF exportálás',
    panelDesc:
      'Minden fejezet végén (és itt általánosan is) közvetlenül az oldalon tudsz megjegyzést írni. A beírt észrevételek automatikusan mentődnek a felhőbe, így Gábor azonnal látja őket a saját gépén, a „Letöltés PDF-ként” gombbal pedig a teljes dokumentum a megjegyzéseiddel együtt exportálható.',
    cloudActiveLabel: 'Felhőszinkron aktív — Gábor valós időben látja a beírt megjegyzéseket',
    refreshBtn: 'Frissítés',
    generalNoteLabel:
      'Általános ügyvédi észrevétel ehhez a dokumentumhoz (pl. esernyő-struktúra, felépítés, általános javaslatok):',
    generalNotePlaceholder:
      'Írd ide az általános észrevételeidet ehhez a dokumentumhoz vagy a gabba.bond főoldal vs. SENEAR aloldal (esernyő-struktúra) elválasztásához...',
    jumpToCommentsLabel: 'Megjegyzéssel ellátott fejezetek ezen az oldalon:',
    addSectionNoteBtn: 'Ügyvédi megjegyzés hozzáfűzése ehhez a ponthoz (Adri)',
    sectionNoteHeader: (title) => `Ügyvédi megjegyzés (Adri) — ${title}`,
    sectionNotePlaceholder:
      'Írd ide a jogi javaslatodat, módosítási kérésedet vagy kérdésedet ehhez a fejezethez (automatikusan mentődik)...',
    savingLabel: 'Mentés a felhőbe...',
    savedCloudLabel: (timeStr) =>
      timeStr ? `Felhőbe mentve (${timeStr}) — Gábor is látja` : 'Felhőbe mentve — Gábor is látja',
    savedLocalLabel: 'Helyileg mentve',
    saveNowBtn: 'Mentés most',
    printSummaryTitle: 'ÜGYVÉDI ÉSZREVÉTELEK ÉS MEGJEGYZÉSEK ÖSSZESÍTÉSE (ADRI)',
    printGeneralLabel: 'Általános megjegyzés a dokumentumhoz',
    printSectionNoteTitle: (author, timeStr) =>
      `ÜGYVÉDI MEGJEGYZÉS (${author || 'Adri'}${timeStr ? ` · ${timeStr}` : ''}):`,
  },
  de: {
    exportPdfBtn: 'Als PDF speichern (inkl. Anmerkungen)',
    exportPdfSub: 'PDF-Export / Drucken',
    panelBadge: 'Juristische Prüfung & Cloud-Sync (Adri & Gábor)',
    panelTitle: 'Anwaltsnotizen & PDF-Export',
    panelDesc:
      'Sie können unter jedem Abschnitt (sowie hier allgemein) direkt auf der Seite Kommentare hinterlassen. Alle Notizen werden automatisch in der Cloud gespeichert, sodass Gábor sie sofort sieht, und werden beim PDF-Export vollständig mitgedruckt.',
    cloudActiveLabel: 'Cloud-Sync aktiv — Gábor sieht alle Anmerkungen in Echtzeit',
    refreshBtn: 'Aktualisieren',
    generalNoteLabel: 'Allgemeine juristische Anmerkung zu diesem Dokument (z. B. Dachmarken-Struktur):',
    generalNotePlaceholder: 'Allgemeine Anmerkungen zu diesem Dokument hier eingeben...',
    jumpToCommentsLabel: 'Kommentierte Abschnitte auf dieser Seite:',
    addSectionNoteBtn: 'Juristische Anmerkung zu diesem Abschnitt hinzufügen (Adri)',
    sectionNoteHeader: (title) => `Juristische Anmerkung (Adri) — ${title}`,
    sectionNotePlaceholder: 'Anmerkung oder Änderungsvorschlag zu diesem Abschnitt eingeben (wird automatisch gespeichert)...',
    savingLabel: 'Wird in der Cloud gespeichert...',
    savedCloudLabel: (timeStr) =>
      timeStr ? `In der Cloud gespeichert (${timeStr})` : 'In der Cloud gespeichert',
    savedLocalLabel: 'Lokal gespeichert',
    saveNowBtn: 'Jetzt speichern',
    printSummaryTitle: 'ZUSAMMENFASSUNG DER JURISTISCHEN ANMERKUNGEN (ADRI)',
    printGeneralLabel: 'Allgemeine Anmerkung zum Dokument',
    printSectionNoteTitle: (author, timeStr) =>
      `JURISTISCHE ANMERKUNG (${author || 'Adri'}${timeStr ? ` · ${timeStr}` : ''}):`,
  },
  en: {
    exportPdfBtn: 'Save as PDF (including comments)',
    exportPdfSub: 'PDF Export / Print',
    panelBadge: 'Legal Review & Cloud Sync (Adri & Gábor)',
    panelTitle: 'Legal Review Notes & PDF Export',
    panelDesc:
      'You can add inline comments at the bottom of any section (or a general note below). All notes auto-save to the cloud in real time so Gábor can see them immediately, and they are included when exporting the page as a PDF.',
    cloudActiveLabel: 'Cloud Sync active — Gábor sees all comments in real time',
    refreshBtn: 'Refresh',
    generalNoteLabel: 'General legal comment for this document (e.g. umbrella structure, overall feedback):',
    generalNotePlaceholder: 'Write general comments for this document or the umbrella structure here...',
    jumpToCommentsLabel: 'Commented sections on this page:',
    addSectionNoteBtn: 'Add legal comment to this section (Adri)',
    sectionNoteHeader: (title) => `Legal Comment (Adri) — ${title}`,
    sectionNotePlaceholder: 'Write your legal note or revision suggestion for this section (auto-saves)...',
    savingLabel: 'Saving to cloud...',
    savedCloudLabel: (timeStr) =>
      timeStr ? `Saved to cloud (${timeStr}) — visible to Gábor` : 'Saved to cloud — visible to Gábor',
    savedLocalLabel: 'Saved locally',
    saveNowBtn: 'Save now',
    printSummaryTitle: 'SUMMARY OF LEGAL REVIEW COMMENTS (ADRI)',
    printGeneralLabel: 'General Document Comment',
    printSectionNoteTitle: (author, timeStr) =>
      `LEGAL COMMENT (${author || 'Adri'}${timeStr ? ` · ${timeStr}` : ''}):`,
  },
};

function renderTableCell(cell: LegalTableCellValue, isFirstCol: boolean) {
  if (typeof cell === 'string') {
    return (
      <span className={isFirstCol ? 'font-bold text-[#1F2421] print:text-black' : 'text-[#3F3C38] print:text-black'}>
        {cell}
      </span>
    );
  }
  return (
    <div className="space-y-1.5">
      {cell.badge && (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9] print:border-gray-400 print:text-black print:bg-transparent">
          {cell.badge}
        </span>
      )}
      {cell.title && (
        <div className="font-bold text-[#1F2421] leading-snug print:text-black">{cell.title}</div>
      )}
      {cell.lines.length === 1 ? (
        <p className="leading-relaxed text-[#3F3C38] print:text-black">{cell.lines[0]}</p>
      ) : (
        <ul className="space-y-1.5">
          {cell.lines.map((line, idx) => (
            <li key={idx} className="flex items-start gap-1.5 leading-relaxed text-[#3F3C38] print:text-black">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#1B7A4E] shrink-0 mt-1.5 print:bg-black" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function renderSectionIcon(icon: LegalIconKey | undefined) {
  switch (icon) {
    case 'smartphone':
      return <Smartphone aria-hidden="true" className="w-5 h-5" />;
    case 'scale':
      return <Scale aria-hidden="true" className="w-5 h-5" />;
    case 'database':
      return <Database aria-hidden="true" className="w-5 h-5" />;
    case 'eye':
      return <Eye aria-hidden="true" className="w-5 h-5" />;
    case 'server':
      return <Server aria-hidden="true" className="w-5 h-5" />;
    case 'trash':
      return <Trash2 aria-hidden="true" className="w-5 h-5" />;
    case 'warning':
      return <AlertTriangle aria-hidden="true" className="w-5 h-5" />;
    case 'credit-card':
      return <CreditCard aria-hidden="true" className="w-5 h-5" />;
    case 'file-check':
      return <FileCheck2 aria-hidden="true" className="w-5 h-5" />;
    case 'activity':
      return <Activity aria-hidden="true" className="w-5 h-5" />;
    case 'phone-call':
      return <PhoneCall aria-hidden="true" className="w-5 h-5" />;
    case 'users':
      return <Users aria-hidden="true" className="w-5 h-5" />;
    case 'lock':
      return <Lock aria-hidden="true" className="w-5 h-5" />;
    default:
      return <ShieldCheck aria-hidden="true" className="w-5 h-5" />;
  }
}

export function LegalPageLayout({
  bundle,
  activeDoc,
  focusDeletion = false,
  onNavigate,
}: LegalPageLayoutProps) {
  const { language } = useLanguage();
  const activeLang: LegalLang = resolveLegalLang(language);
  const ui = LEGAL_UI_COPY[activeLang];
  const revUi = REVIEW_UI_COPY[activeLang];
  const operator = GABBA_STUDIO_OPERATOR.byLang[activeLang];
  const docsForLang = bundle.documents[activeLang];
  const doc = docsForLang[activeDoc];
  const deletionHero = bundle.deletionHero?.[activeLang];

  const activeDocKey = toReviewDocKey(activeDoc);
  const [allNotes, setAllNotes] = useState<AllLegalNotesMap>(() => createEmptyAllNotes());
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [savingMap, setSavingMap] = useState<Record<string, 'saving' | 'cloud' | 'local'>>({});
  const [isRefreshingCloud, setIsRefreshingCloud] = useState(false);
  const debounceTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const syncFromCloud = useCallback(async () => {
    setIsRefreshingCloud(true);
    const local = loadLocalLegalNotes();
    const cloud = await fetchAllCloudLegalNotes();
    const merged = mergeCloudAndLocalNotes(local, cloud);
    saveLocalLegalNotes(merged);
    setAllNotes(merged);
    setIsRefreshingCloud(false);
  }, []);

  useEffect(() => {
    const initialLocal = loadLocalLegalNotes();
    setAllNotes(initialLocal);
    void syncFromCloud();

    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        void syncFromCloud();
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [syncFromCloud]);

  const currentDocNotes = allNotes[activeDocKey] || {};

  const persistNoteToCloud = useCallback(
    async (docKey: typeof activeDocKey, sectionId: string, textValue: string) => {
      const stateKey = `${docKey}:${sectionId}`;
      setSavingMap((prev) => ({ ...prev, [stateKey]: 'saving' }));
      const noteObj = {
        text: textValue,
        updatedAt: new Date().toISOString(),
        author: 'Adri',
      };
      const ok = await saveCloudSectionNote(docKey, sectionId, noteObj);
      setSavingMap((prev) => ({ ...prev, [stateKey]: ok ? 'cloud' : 'local' }));
    },
    []
  );

  const handleNoteChange = useCallback(
    (sectionId: string, newText: string) => {
      const updatedAt = new Date().toISOString();
      const noteObj = { text: newText, updatedAt, author: 'Adri' };

      setAllNotes((prev) => {
        const next: AllLegalNotesMap = {
          ...prev,
          [activeDocKey]: {
            ...(prev[activeDocKey] || {}),
            [sectionId]: noteObj,
          },
        };
        saveLocalLegalNotes(next);
        return next;
      });

      const timerKey = `${activeDocKey}:${sectionId}`;
      setSavingMap((prev) => ({ ...prev, [timerKey]: 'saving' }));
      if (debounceTimersRef.current[timerKey]) {
        clearTimeout(debounceTimersRef.current[timerKey]);
      }
      debounceTimersRef.current[timerKey] = setTimeout(() => {
        void persistNoteToCloud(activeDocKey, sectionId, newText);
      }, 550);
    },
    [activeDocKey, persistNoteToCloud]
  );

  const handleImmediateSave = useCallback(
    (sectionId: string) => {
      const timerKey = `${activeDocKey}:${sectionId}`;
      if (debounceTimersRef.current[timerKey]) {
        clearTimeout(debounceTimersRef.current[timerKey]);
      }
      const currentText = allNotes[activeDocKey]?.[sectionId]?.text ?? '';
      void persistNoteToCloud(activeDocKey, sectionId, currentText);
    },
    [activeDocKey, allNotes, persistNoteToCloud]
  );

  const renderSectionNoteBox = (sectionId: string, sectionTitle: string) => {
    const note = currentDocNotes[sectionId];
    const hasText = Boolean(note && note.text && note.text.trim().length > 0);
    const expandKey = `${activeDocKey}:${sectionId}`;
    const isExpanded = Boolean(expandedSections[expandKey] || hasText);
    const saveStatus = savingMap[expandKey] || (hasText ? 'cloud' : undefined);
    const formattedTime = note?.updatedAt ? formatNoteTimestamp(note.updatedAt, activeLang) : '';

    return (
      <div className="pt-3 border-t border-[#EFE9DF] print:border-t-0 print:pt-2">
        {/* Screen Interactive Comment Toggle / Editor */}
        <div className="print:hidden">
          {!isExpanded ? (
            <button
              type="button"
              onClick={() => setExpandedSections((prev) => ({ ...prev, [expandKey]: true }))}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFBEB] hover:bg-[#FEF3C7] text-amber-950 border border-amber-300/90 text-xs font-bold transition-colors cursor-pointer ${FOCUS_RING}`}
            >
              <MessageSquarePlus aria-hidden="true" className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{revUi.addSectionNoteBtn}</span>
            </button>
          ) : (
            <div className="rounded-2xl bg-[#FFFDF7] border-2 border-amber-300/90 p-4 sm:p-5 space-y-3 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor={`note-${activeDocKey}-${sectionId}`}
                  className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-950"
                >
                  <MessageSquareText aria-hidden="true" className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{revUi.sectionNoteHeader(sectionTitle)}</span>
                </label>

                <div className="flex items-center gap-2">
                  {saveStatus === 'saving' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      <RefreshCw aria-hidden="true" className="w-3 h-3 animate-spin shrink-0" />
                      <span>{revUi.savingLabel}</span>
                    </span>
                  )}
                  {saveStatus === 'cloud' && hasText && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9]">
                      <CloudCheck aria-hidden="true" className="w-3.5 h-3.5 text-[#1B7A4E] shrink-0" />
                      <span>{revUi.savedCloudLabel(formattedTime)}</span>
                    </span>
                  )}
                  {saveStatus === 'local' && hasText && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-100 text-stone-800 border border-stone-300">
                      <span>{revUi.savedLocalLabel}</span>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleImmediateSave(sectionId)}
                    className={`px-2.5 py-1 rounded-lg bg-[#1F2421] text-white text-[11px] font-bold hover:bg-[#2C2C2C] transition-colors cursor-pointer ${FOCUS_RING}`}
                  >
                    {revUi.saveNowBtn}
                  </button>
                </div>
              </div>

              <textarea
                id={`note-${activeDocKey}-${sectionId}`}
                rows={3}
                value={note?.text ?? ''}
                onChange={(e) => handleNoteChange(sectionId, e.target.value)}
                onBlur={() => handleImmediateSave(sectionId)}
                placeholder={revUi.sectionNotePlaceholder}
                className="w-full rounded-xl bg-white border border-amber-300 px-3.5 py-2.5 text-xs sm:text-sm text-[#1F2421] placeholder:text-[#7A756E] leading-relaxed focus:outline-2 focus:outline-[#1B7A4E]"
              />
            </div>
          )}
        </div>

        {/* Print / PDF Export Rendered Comment Box (only shown when non-empty!) */}
        {hasText && (
          <div className="hidden print:block mt-3 rounded-xl border-2 border-black bg-[#FFFDF7] p-3.5 text-black break-inside-avoid">
            <div className="text-xs font-extrabold uppercase tracking-wide border-b border-gray-400 pb-1 mb-1.5">
              {revUi.printSectionNoteTitle(note?.author || 'Adri', formattedTime)}
            </div>
            <div className="text-xs leading-relaxed whitespace-pre-wrap">{note?.text}</div>
          </div>
        )}
      </div>
    );
  };

  const commentedSectionsList = [
    ...(currentDocNotes['general']?.text?.trim()
      ? [{ id: 'lawyer-review-panel', label: revUi.printGeneralLabel, text: currentDocNotes['general'].text }]
      : []),
    ...(currentDocNotes['operator']?.text?.trim()
      ? [
          {
            id: 'operator',
            label: `1. ${doc.operatorSectionTitle.replace(/^1\.\s*/, '')}`,
            text: currentDocNotes['operator'].text,
          },
        ]
      : []),
    ...doc.sections
      .filter((sec) => Boolean(currentDocNotes[sec.id]?.text?.trim()))
      .map((sec) => ({
        id: sec.id,
        label: `${sec.number}. ${sec.title}`,
        text: currentDocNotes[sec.id].text,
      })),
  ];

  const activeRoute: AppRoute =
    focusDeletion && bundle.scope.deleteAccountRoute
      ? bundle.scope.deleteAccountRoute
      : bundle.scope.routes[activeDoc];

  const canonicalUrl = `https://gabba.bond${ROUTE_PATHS[activeRoute]}`;
  const hasGdprBadges = Boolean(
    doc.operatorSectionGdprBadge || doc.sections.some((sec) => Boolean(sec.gdprBadge))
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const rawHash = window.location.hash.replace(/^#+/, '');
    if (rawHash && !['privacy', 'terms', 'operations', 'aszf', 'agb', 'gdpr'].includes(rawHash.toLowerCase())) {
      const target = document.getElementById(rawHash);
      if (target) {
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        setTimeout(() => target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }), 60);
        return;
      }
    }
    if (focusDeletion) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [activeDoc, focusDeletion]);

  const handleSpaRoute = (route: AppRoute) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(route);
  };

  const scrollToAnchor = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.history.replaceState(null, '', `${window.location.pathname}#${id}`);
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] print:bg-white print:text-black">
      {/* =====================================================================
          STICKY TOP LEGAL SUB-NAVIGATION BAR (3 Docs + PDF Export + Note Counters)
          ===================================================================== */}
      <div className="sticky top-20 z-30 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#DFD2BE] shadow-2xs print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
            <nav
              aria-label={ui.docSwitcherAria}
              className="flex items-center gap-1.5 overflow-x-auto pb-0.5 sm:pb-0"
            >
              {DOC_ORDER.map((kind) => {
                const targetRoute = bundle.scope.routes[kind];
                const itemDoc = docsForLang[kind];
                const isSelected = activeDoc === kind && !focusDeletion;
                const noteCount = countNonEmptyNotes(allNotes[toReviewDocKey(kind)]);
                return (
                  <a
                    key={kind}
                    href={buildRouteHref(targetRoute)}
                    aria-current={isSelected ? 'page' : undefined}
                    onClick={handleSpaRoute(targetRoute)}
                    className={`inline-flex min-h-10 items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#1F2421] text-white shadow-xs'
                        : 'bg-white text-[#3F3C38] border border-[#DFD2BE] hover:bg-[#F3EDE3] hover:text-[#1F2421]'
                    } ${FOCUS_RING}`}
                  >
                    <span>{itemDoc.shortTabLabel}</span>
                    {noteCount > 0 && (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                          isSelected
                            ? 'bg-amber-400 text-[#1F2421]'
                            : 'bg-amber-100 text-amber-950 border border-amber-300'
                        }`}
                      >
                        💬 {noteCount}
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => window.print()}
                className={`inline-flex min-h-10 items-center gap-2 px-4 py-2 rounded-xl bg-[#1B7A4E] text-white text-xs sm:text-sm font-bold hover:bg-[#14593A] shadow-xs transition-colors cursor-pointer ${FOCUS_RING}`}
              >
                <Download aria-hidden="true" className="w-4 h-4 shrink-0" />
                <span>{revUi.exportPdfBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Legal Document Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10 print:max-w-none print:px-0 print:py-2 print:space-y-5">
        {/* Print-Only Official Document Masthead */}
        <div className="hidden print:block border-b-2 border-black pb-4 space-y-1 text-xs text-black">
          <div className="font-bold uppercase tracking-wider">
            gabba · {bundle.scope.productName}
          </div>
          <div>
            <strong>{operator.operatorLabel}:</strong> {operator.operatorName} · {operator.hqValue} ·{' '}
            {GABBA_STUDIO_OPERATOR.email}
          </div>
          <div>
            <strong>{ui.canonicalUrlLabel}</strong> {canonicalUrl} ·{' '}
            <strong>{ui.effectiveDateLabel}</strong> {doc.effectiveDateValue}
          </div>
        </div>

        {/* Breadcrumb Trail (Screen Only) */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#7A5F43] border-b border-[#E8DFD4] pb-4 print:hidden"
        >
          <a
            href={buildRouteHref('home')}
            onClick={handleSpaRoute('home')}
            className={`hover:text-[#1F2421] underline-offset-4 hover:underline rounded-sm px-0.5 ${FOCUS_RING}`}
          >
            {ui.studioHome}
          </a>
          <ChevronRight aria-hidden="true" className="w-3.5 h-3.5" />
          <a
            href={buildRouteHref(bundle.scope.productRoute)}
            onClick={handleSpaRoute(bundle.scope.productRoute)}
            className={`hover:text-[#1F2421] underline-offset-4 hover:underline rounded-sm px-0.5 ${FOCUS_RING}`}
          >
            {bundle.scope.productName}
          </a>
          <ChevronRight aria-hidden="true" className="w-3.5 h-3.5" />
          <span className="text-[#1F2421] font-bold">
            {focusDeletion && deletionHero ? deletionHero.title : doc.breadcrumbCurrent}
          </span>
        </nav>

        {/* Dedicated Top Account & Data Deletion View (/delete-account) */}
        {focusDeletion && deletionHero && (
          <section
            id="delete-account-instructions"
            className="scroll-mt-36 bg-gradient-to-br from-[#FFFDF9] to-[#F5F0EB] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A880] shadow-sm space-y-6 print:bg-white print:border-gray-400 print:shadow-none print:break-inside-avoid"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1B7A4E] text-white print:bg-transparent print:text-black print:border print:border-black">
                  <Trash2 aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  <span>{deletionHero.badge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300">
                  <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span>{deletionHero.irreversibleBadge}</span>
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                {deletionHero.title}
              </h1>
              <p className="text-sm sm:text-base text-[#4A4743] leading-relaxed">
                {deletionHero.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white p-5 border border-[#E8DFD4] space-y-3">
                <h2 className="font-heading text-base sm:text-lg font-bold text-[#1F2421] flex items-center gap-2">
                  <Smartphone aria-hidden="true" className="w-5 h-5 text-[#1B7A4E] shrink-0" />
                  <span>{deletionHero.method1Title}</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed">
                  {deletionHero.method1Desc}
                </p>
                <ul className="space-y-2 pt-1">
                  {deletionHero.method1Steps.map((step, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-[#1F2421] leading-relaxed flex items-start gap-2.5 bg-[#FAF8F5] p-3 rounded-xl border border-[#E8DFD4]"
                    >
                      <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-[#1B7A4E] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-[#E8DFD4] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h2 className="font-heading text-base sm:text-lg font-bold text-[#1F2421] flex items-center gap-2">
                    <Mail aria-hidden="true" className="w-5 h-5 text-[#7A5F43] shrink-0" />
                    <span>{deletionHero.method2Title}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed">
                    {deletionHero.method2Desc}
                  </p>
                </div>
                <div>
                  <a
                    href={`mailto:${GABBA_STUDIO_OPERATOR.email}?subject=SENEAR%20Account%20and%20Data%20Deletion%20Request`}
                    className={`inline-flex min-h-11 items-center gap-2 px-4 py-3 rounded-xl bg-[#1F2421] text-white text-xs sm:text-sm font-bold hover:bg-[#2C2C2C] transition-colors shadow-xs ${FOCUS_RING}`}
                  >
                    <Mail aria-hidden="true" className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{deletionHero.method2Btn}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 border border-[#E8DFD4] space-y-3">
              <h2 className="font-heading text-base sm:text-lg font-bold text-[#1F2421] flex items-center gap-2">
                <Database aria-hidden="true" className="w-5 h-5 text-[#7A5F43] shrink-0" />
                <span>{deletionHero.whatDeletedTitle}</span>
              </h2>
              <ul className="space-y-2">
                {deletionHero.whatDeletedItems.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-[#4A4743] leading-relaxed flex items-start gap-2">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#1B7A4E] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-[#F0EAE1] text-xs sm:text-sm font-semibold text-[#1F2421]">
                {deletionHero.irreversibleDesc}
              </div>
            </div>
          </section>
        )}

        {/* Document Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9]">
              <ShieldCheck aria-hidden="true" className="w-3.5 h-3.5 text-[#1B7A4E] shrink-0" />
              <span>{doc.badges[0]}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#4A4743] border border-[#DFD2BE]">
              <Server aria-hidden="true" className="w-3.5 h-3.5 text-[#7A5F43] shrink-0" />
              <span>{doc.badges[1]}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#4A4743] border border-[#DFD2BE]">
              <FileCheck2 aria-hidden="true" className="w-3.5 h-3.5 text-[#7A5F43] shrink-0" />
              <span>{doc.badges[2]}</span>
            </span>
          </div>

          <div className="space-y-2.5">
            {focusDeletion ? (
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                {doc.title}
              </h2>
            ) : (
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2421] tracking-tight">
                {doc.title}
              </h1>
            )}
            <p className="text-xs sm:text-sm font-semibold text-[#7A5F43] print:text-black">
              {ui.effectiveDateLabel}{' '}
              <span className="text-[#1F2421] font-bold">{doc.effectiveDateValue}</span>
              {' · '}
              <span className="text-[#5C5A56] font-normal break-all">{canonicalUrl}</span>
            </p>
            <p className="text-sm sm:text-base text-[#4A4743] leading-relaxed max-w-4xl print:text-black">
              {doc.subtitle}
            </p>
          </div>
        </header>

        {/* =====================================================================
            LAWYER REVIEW & PDF EXPORT PANEL (Screen + Print Summary)
            ===================================================================== */}
        <section
          id="lawyer-review-panel"
          className="scroll-mt-36 rounded-3xl bg-gradient-to-br from-[#FFFDF7] to-[#FAF5E8] border-2 border-[#C5A880] p-5 sm:p-7 shadow-xs space-y-4 print:hidden"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1F2421] text-[#E5CFA8]">
                  <Scale aria-hidden="true" className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>{revUi.panelBadge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9]">
                  <CloudCheck aria-hidden="true" className="w-3.5 h-3.5 text-[#1B7A4E] shrink-0" />
                  <span>{revUi.cloudActiveLabel}</span>
                </span>
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-extrabold text-[#1F2421]">
                {revUi.panelTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#4A4743] leading-relaxed">
                {revUi.panelDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => void syncFromCloud()}
                disabled={isRefreshingCloud}
                className={`inline-flex min-h-11 items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white text-[#1F2421] border border-[#C5A880] text-xs font-bold hover:bg-[#FAF8F5] transition-colors cursor-pointer ${FOCUS_RING}`}
              >
                <RefreshCw
                  aria-hidden="true"
                  className={`w-3.5 h-3.5 text-[#7A5F43] shrink-0 ${isRefreshingCloud ? 'animate-spin' : ''}`}
                />
                <span>{revUi.refreshBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className={`inline-flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B7A4E] text-white text-xs sm:text-sm font-extrabold hover:bg-[#14593A] shadow-sm transition-colors cursor-pointer ${FOCUS_RING}`}
              >
                <Download aria-hidden="true" className="w-4 h-4 shrink-0" />
                <span>{revUi.exportPdfBtn}</span>
              </button>
            </div>
          </div>

          {/* General Document-Level Lawyer Note */}
          <div className="rounded-2xl bg-white border border-amber-300/90 p-4 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor={`note-${activeDocKey}-general`}
                className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1F2421]"
              >
                <MessageSquareText aria-hidden="true" className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{revUi.generalNoteLabel}</span>
              </label>

              <div className="flex items-center gap-2">
                {savingMap[`${activeDocKey}:general`] === 'saving' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <RefreshCw aria-hidden="true" className="w-3 h-3 animate-spin shrink-0" />
                    <span>{revUi.savingLabel}</span>
                  </span>
                )}
                {(savingMap[`${activeDocKey}:general`] === 'cloud' ||
                  Boolean(currentDocNotes['general']?.text?.trim())) &&
                  savingMap[`${activeDocKey}:general`] !== 'saving' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9]">
                      <CloudCheck aria-hidden="true" className="w-3.5 h-3.5 text-[#1B7A4E] shrink-0" />
                      <span>
                        {revUi.savedCloudLabel(
                          currentDocNotes['general']?.updatedAt
                            ? formatNoteTimestamp(currentDocNotes['general'].updatedAt, activeLang)
                            : ''
                        )}
                      </span>
                    </span>
                  )}
                <button
                  type="button"
                  onClick={() => handleImmediateSave('general')}
                  className={`px-2.5 py-1 rounded-lg bg-[#1F2421] text-white text-[11px] font-bold hover:bg-[#2C2C2C] transition-colors cursor-pointer ${FOCUS_RING}`}
                >
                  {revUi.saveNowBtn}
                </button>
              </div>
            </div>

            <textarea
              id={`note-${activeDocKey}-general`}
              rows={3}
              value={currentDocNotes['general']?.text ?? ''}
              onChange={(e) => handleNoteChange('general', e.target.value)}
              onBlur={() => handleImmediateSave('general')}
              placeholder={revUi.generalNotePlaceholder}
              className="w-full rounded-xl bg-[#FFFDF9] border border-[#DFD2BE] px-3.5 py-2.5 text-xs sm:text-sm text-[#1F2421] placeholder:text-[#7A756E] leading-relaxed focus:outline-2 focus:outline-[#1B7A4E]"
            />
          </div>

          {commentedSectionsList.length > 0 && (
            <div className="pt-1 space-y-2">
              <div className="text-xs font-bold text-[#7A5F43]">{revUi.jumpToCommentsLabel}</div>
              <div className="flex flex-wrap gap-2">
                {commentedSectionsList.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={scrollToAnchor(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/90 hover:bg-amber-200/80 text-amber-950 border border-amber-300 text-xs font-bold transition-colors ${FOCUS_RING}`}
                  >
                    <span>💬</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Print-Only Summary of Lawyer Comments at Top of PDF (if any exist) */}
        {commentedSectionsList.length > 0 && (
          <section className="hidden print:block rounded-2xl border-2 border-black bg-[#FFFDF7] p-4 space-y-2.5 text-black break-inside-avoid">
            <h2 className="text-sm font-extrabold uppercase tracking-wide border-b border-black pb-1.5">
              {revUi.printSummaryTitle} ({commentedSectionsList.length})
            </h2>
            <div className="space-y-2">
              {commentedSectionsList.map((item) => (
                <div key={item.id} className="text-xs leading-relaxed border-b last:border-b-0 border-gray-300 pb-1.5 last:pb-0">
                  <div className="font-bold">{item.label}:</div>
                  <div className="whitespace-pre-wrap pl-2">{item.text}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Highlights Summary Box */}
        <section className="bg-gradient-to-br from-[#2C2C2C] to-[#1F2421] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#C5A880]/40 space-y-5 print:bg-white print:from-white print:to-white print:text-black print:border-gray-300 print:shadow-none print:p-4 print:break-inside-avoid">
          <div className="flex items-center gap-2.5">
            <Lock aria-hidden="true" className="w-5 h-5 text-[#C5A880] print:text-black" />
            <h2 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white print:text-black">
              {doc.quickSummaryTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doc.quickSummaryItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/6 border border-white/12 rounded-2xl p-4 space-y-1.5 print:bg-white print:border-gray-300"
              >
                <div className="flex items-center gap-2 text-[#E5CFA8] font-bold text-xs sm:text-sm print:text-black">
                  <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-emerald-400 shrink-0 print:text-black" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed print:text-black">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Table of Contents */}
        <nav
          aria-label={ui.tocTitle}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DFD4] space-y-3 print:hidden"
        >
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#7A5F43]">
            {ui.tocTitle}
          </div>
          {hasGdprBadges ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <a
                href="#operator"
                onClick={scrollToAnchor('operator')}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 px-3.5 py-2.5 rounded-xl text-xs bg-[#FAF8F5] text-[#1F2421] border border-[#E8DFD4] hover:bg-[#F0EAE1] transition-colors ${FOCUS_RING}`}
              >
                <span className="font-semibold leading-snug">
                  <span className="font-extrabold text-[#7A5F43] mr-1">1.</span>
                  {doc.operatorSectionTitle.replace(/^1\.\s*/, '')}
                </span>
                {doc.operatorSectionGdprBadge && (
                  <span className="self-start sm:self-center shrink-0 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9]">
                    {doc.operatorSectionGdprBadge}
                  </span>
                )}
              </a>
              {doc.sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={scrollToAnchor(sec.id)}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 px-3.5 py-2.5 rounded-xl text-xs bg-[#FAF8F5] text-[#1F2421] border border-[#E8DFD4] hover:bg-[#F0EAE1] transition-colors ${FOCUS_RING}`}
                >
                  <span className="font-semibold leading-snug">
                    <span className="font-extrabold text-[#7A5F43] mr-1">{sec.number}.</span>
                    {sec.title}
                  </span>
                  {sec.gdprBadge && (
                    <span className="self-start sm:self-center shrink-0 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9]">
                      {sec.gdprBadge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <a
                href="#operator"
                onClick={scrollToAnchor('operator')}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF8F5] text-[#2C2C2C] border border-[#E8DFD4] hover:bg-[#F0EAE1] transition-colors ${FOCUS_RING}`}
              >
                <span className="font-bold text-[#7A5F43]">1.</span>
                <span>{operator.operatorLabel}</span>
              </a>
              {doc.sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={scrollToAnchor(sec.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF8F5] text-[#2C2C2C] border border-[#E8DFD4] hover:bg-[#F0EAE1] transition-colors ${FOCUS_RING}`}
                >
                  <span className="font-bold text-[#7A5F43]">{sec.number}.</span>
                  <span>{sec.title.split('(')[0].trim()}</span>
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Section 1: Operator & Impressum Card (No tax number) */}
        <section
          id="operator"
          className="scroll-mt-40 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD4] shadow-2xs space-y-5 print:border-gray-300 print:shadow-none print:p-4 print:break-inside-avoid"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#F5F0EB] text-[#7A5F43] flex items-center justify-center font-bold shrink-0 mt-0.5 print:hidden">
                <Building2 aria-hidden="true" className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                {doc.operatorSectionGdprBadge && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9] print:border-gray-400 print:text-black print:bg-transparent">
                    {doc.operatorSectionGdprBadge}
                  </span>
                )}
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1F2421]">
                  {doc.operatorSectionTitle}
                </h2>
              </div>
            </div>
            <a
              href="#operator"
              onClick={scrollToAnchor('operator')}
              aria-label={`${ui.anchorAriaPrefix} ${doc.operatorSectionTitle}`}
              className={`p-1.5 rounded-lg text-[#7A5F43] hover:text-[#1F2421] hover:bg-[#F5F0EB] print:hidden ${FOCUS_RING}`}
            >
              <Hash aria-hidden="true" className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] print:bg-white print:border-gray-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {operator.operatorLabel}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#1F2421] mt-1">
                {operator.operatorName}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] print:bg-white print:border-gray-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {operator.hqLabel}
              </div>
              <div className="text-sm font-semibold text-[#1F2421] mt-1 flex items-start gap-1.5">
                <MapPin aria-hidden="true" className="w-4 h-4 text-[#7A5F43] shrink-0 mt-0.5 print:hidden" />
                <span>{operator.hqValue}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] print:bg-white print:border-gray-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {operator.emailLabel}
              </div>
              <a
                href={`mailto:${GABBA_STUDIO_OPERATOR.email}`}
                className={`text-sm sm:text-base font-bold text-[#14593A] underline underline-offset-4 hover:text-[#1B7A4E] mt-1 inline-flex items-center gap-1.5 print:text-black ${FOCUS_RING}`}
              >
                <Mail aria-hidden="true" className="w-4 h-4 shrink-0 print:hidden" />
                <span>{GABBA_STUDIO_OPERATOR.email}</span>
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] print:bg-white print:border-gray-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {operator.cloudLabel}
              </div>
              <div className="text-sm font-semibold text-[#1F2421] mt-1">
                {operator.cloudValue}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] sm:col-span-2 print:bg-white print:border-gray-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {operator.scopeLabel}
              </div>
              <div className="text-sm font-semibold text-[#1F2421] mt-1">
                {bundle.scope.packageOrDomain[activeLang]}
              </div>
            </div>
          </div>

          {renderSectionNoteBox('operator', doc.operatorSectionTitle)}
        </section>

        {/* Sections 2..N */}
        <div className="space-y-6 print:space-y-4">
          {doc.sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className={
                sec.isWarningBox
                  ? `scroll-mt-40 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-amber-400/90 shadow-xs space-y-5 print:bg-white print:border-black print:shadow-none print:p-4 ${sec.table ? '' : 'print:break-inside-avoid'}`
                  : `scroll-mt-40 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD4] shadow-2xs space-y-5 print:border-gray-300 print:shadow-none print:p-4 ${sec.table ? '' : 'print:break-inside-avoid'}`
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 print:hidden ${
                      sec.isWarningBox
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-[#F5F0EB] text-[#7A5F43]'
                    }`}
                  >
                    {renderSectionIcon(sec.icon)}
                  </div>
                  <div className="space-y-1.5">
                    {sec.gdprBadge && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9] print:border-gray-400 print:text-black print:bg-transparent">
                        {sec.gdprBadge}
                      </span>
                    )}
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1F2421]">
                      {sec.number}. {sec.title}
                    </h2>
                    {sec.intro && (
                      <p className="text-sm sm:text-base text-[#4A4743] leading-relaxed print:text-black">
                        {sec.intro}
                      </p>
                    )}
                  </div>
                </div>

                <a
                  href={`#${sec.id}`}
                  onClick={scrollToAnchor(sec.id)}
                  aria-label={`${ui.anchorAriaPrefix} ${sec.title}`}
                  className={`p-1.5 rounded-lg text-[#7A5F43] hover:text-[#1F2421] hover:bg-[#F5F0EB] shrink-0 print:hidden ${FOCUS_RING}`}
                >
                  <Hash aria-hidden="true" className="w-4 h-4" />
                </a>
              </div>

              {sec.paragraphs && sec.paragraphs.length > 0 && (
                <div className="space-y-3">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-xs sm:text-sm text-[#4A4743] leading-relaxed print:text-black">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {sec.table && (
                <div
                  role="region"
                  aria-label={sec.table.caption || sec.title}
                  tabIndex={0}
                  className={`overflow-x-auto rounded-2xl border border-[#DFD2BE] shadow-2xs bg-white print:overflow-visible print:border-gray-400 print:shadow-none ${FOCUS_RING}`}
                >
                  <table className="w-full min-w-[760px] border-collapse text-left text-xs sm:text-[13px] print:min-w-0 print:text-[11px]">
                    {sec.table.caption && (
                      <caption className="sr-only">{sec.table.caption}</caption>
                    )}
                    <thead>
                      <tr className="bg-[#1F2421] text-white print:bg-gray-100 print:text-black">
                        {sec.table.headers.map((header, hIdx) => (
                          <th
                            key={hIdx}
                            scope="col"
                            className="px-4 py-3.5 font-bold tracking-wide border-b border-[#373D39] first:w-[19%] last:w-[17%] print:border-gray-400 print:px-2.5 print:py-2"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFD4] print:divide-gray-300">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="even:bg-[#FAF8F5] odd:bg-white hover:bg-[#F4EFE7]/60 transition-colors print:bg-white print:break-inside-avoid"
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-4 py-3.5 align-top border-r last:border-r-0 border-[#EFE9DF] print:border-gray-300 print:px-2.5 print:py-2 ${
                                cIdx === 0 ? 'bg-[#FAF6F0]/75 print:bg-white' : ''
                              }`}
                            >
                              {renderTableCell(cell, cIdx === 0)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {sec.neverCollectedBox && (
                <div className="rounded-2xl bg-gradient-to-br from-[#F2FAF5] to-[#FAF8F5] border-2 border-[#B7DFC9] p-5 sm:p-6 space-y-4 print:bg-white print:border-gray-400 print:p-4 print:break-inside-avoid">
                  <div className="space-y-1.5">
                    {sec.neverCollectedBox.badge && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#14593A] text-white print:bg-transparent print:text-black print:border print:border-black">
                        <Ban aria-hidden="true" className="w-3 h-3 shrink-0" />
                        <span>{sec.neverCollectedBox.badge}</span>
                      </span>
                    )}
                    <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#1F2421]">
                      {sec.neverCollectedBox.title}
                    </h3>
                    {sec.neverCollectedBox.subtitle && (
                      <p className="text-xs sm:text-sm text-[#4A4743] leading-relaxed print:text-black">
                        {sec.neverCollectedBox.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sec.neverCollectedBox.items.map((item, nIdx) => (
                      <div
                        key={nIdx}
                        className="rounded-xl bg-white p-3.5 border border-[#CDE6D8] space-y-1 shadow-2xs print:border-gray-300 print:shadow-none"
                      >
                        {item.label && (
                          <div className="flex items-start gap-2 font-bold text-xs sm:text-sm text-[#14593A] print:text-black">
                            <Ban aria-hidden="true" className="w-4 h-4 text-[#1B7A4E] shrink-0 mt-0.5 print:hidden" />
                            <span>{item.label}</span>
                          </div>
                        )}
                        <p className="text-xs text-[#4A4743] leading-relaxed print:text-black">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sec.subsections && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  {sec.subsections.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="rounded-2xl p-5 bg-[#FAF8F5] border border-[#E8DFD4] space-y-3 print:bg-white print:border-gray-300 print:p-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-[#1F2421]">
                          {sub.subtitle}
                        </h3>
                        {sub.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9] print:border-gray-400 print:text-black print:bg-transparent">
                            {sub.badge}
                          </span>
                        )}
                      </div>
                      {sub.paragraphs?.map((p, pIdx) => (
                        <p key={pIdx} className="text-xs sm:text-sm text-[#4A4743] leading-relaxed print:text-black">
                          {p}
                        </p>
                      ))}
                      {sub.bullets && (
                        <ul className="space-y-2.5 pt-1">
                          {sub.bullets.map((b, bIdx) => (
                            <li
                              key={bIdx}
                              className="text-xs sm:text-sm text-[#4A4743] leading-relaxed flex items-start gap-2 print:text-black"
                            >
                              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#1B7A4E] shrink-0 mt-2" />
                              <span>
                                {b.label && <strong className="text-[#1F2421] font-bold">{b.label} </strong>}
                                {b.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {sec.bullets && (
                <ul className="space-y-3 pt-1">
                  {sec.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className={`p-4 rounded-2xl text-xs sm:text-sm text-[#4A4743] leading-relaxed flex items-start gap-3 print:bg-white print:border-gray-300 print:text-black print:p-3 ${
                        sec.isWarningBox
                          ? 'bg-amber-50/75 border border-amber-200'
                          : 'bg-[#FAF8F5] border border-[#E8DFD4]/90'
                      }`}
                    >
                      {sec.isWarningBox ? (
                        <AlertTriangle
                          aria-hidden="true"
                          className="w-4 h-4 text-amber-800 shrink-0 mt-0.5 print:hidden"
                        />
                      ) : (
                        <CheckCircle2
                          aria-hidden="true"
                          className="w-4 h-4 text-[#1B7A4E] shrink-0 mt-0.5 print:hidden"
                        />
                      )}
                      <div>
                        {b.label && (
                          <strong className="text-[#1F2421] font-bold block sm:inline mb-0.5 sm:mb-0">
                            {b.label}{' '}
                          </strong>
                        )}
                        <span>{b.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {sec.footerNote && (
                <p className="text-xs text-[#5C5A56] pt-2 border-t border-[#F0EAE1]">{sec.footerNote}</p>
              )}

              {renderSectionNoteBox(sec.id, `${sec.number}. ${sec.title}`)}
            </section>
          ))}
        </div>

        {/* Bottom Action & Contact Card */}
        <section
          id="account-deletion"
          className="scroll-mt-40 bg-gradient-to-br from-[#F5F0EB] to-[#EFE7DC] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A880] space-y-6 print:hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2.5 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1B7A4E] text-white">
                <ShieldCheck aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                <span>{ui.contactCardBadge}</span>
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1F2421]">
                {ui.contactCardTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#4A4743] leading-relaxed">
                {ui.contactCardDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className={`inline-flex min-h-11 items-center gap-2 px-5 py-3 rounded-xl bg-[#1B7A4E] text-white text-xs sm:text-sm font-extrabold hover:bg-[#14593A] shadow-sm transition-colors cursor-pointer shrink-0 ${FOCUS_RING}`}
            >
              <Download aria-hidden="true" className="w-4 h-4 shrink-0" />
              <span>{revUi.exportPdfBtn}</span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7A5F43]">
              {ui.otherDocsHeading}
            </div>
            <div className="flex flex-wrap gap-2">
              {DOC_ORDER.map((kind) => {
                const targetRoute = bundle.scope.routes[kind];
                const isCurrent = activeDoc === kind && !focusDeletion;
                return (
                  <a
                    key={kind}
                    href={buildRouteHref(targetRoute)}
                    onClick={handleSpaRoute(targetRoute)}
                    className={`inline-flex min-h-10 items-center px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'bg-[#1F2421] text-white'
                        : 'bg-white text-[#1F2421] border border-[#C5A880]/70 hover:bg-[#FAF8F5]'
                    } ${FOCUS_RING}`}
                  >
                    {docsForLang[kind].shortTabLabel}
                  </a>
                );
              })}

              {bundle.scope.deleteAccountRoute && (
                <a
                  href={buildRouteHref(bundle.scope.deleteAccountRoute)}
                  onClick={handleSpaRoute(bundle.scope.deleteAccountRoute)}
                  className={`inline-flex min-h-10 items-center px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    focusDeletion
                      ? 'bg-[#1F2421] text-white'
                      : 'bg-white text-[#1F2421] border border-[#C5A880]/70 hover:bg-[#FAF8F5]'
                  } ${FOCUS_RING}`}
                >
                  {ui.deleteAccountBtn}
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={`mailto:${GABBA_STUDIO_OPERATOR.email}?subject=${encodeURIComponent(`${bundle.scope.productName} GDPR / Legal Request`)}`}
              className={`inline-flex min-h-11 items-center gap-2 px-5 py-3 rounded-xl bg-[#1F2421] text-white text-xs sm:text-sm font-bold hover:bg-[#2C2C2C] transition-colors shadow-xs ${FOCUS_RING}`}
            >
              <Mail aria-hidden="true" className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{ui.contactEmailBtn}</span>
            </a>

            <a
              href={buildRouteHref(bundle.scope.productRoute)}
              onClick={handleSpaRoute(bundle.scope.productRoute)}
              className={`inline-flex min-h-11 items-center gap-2 px-4 py-3 rounded-xl bg-white text-[#1F2421] border border-[#9A7B4F] text-xs sm:text-sm font-semibold hover:bg-[#FAF8F5] transition-colors ${FOCUS_RING}`}
            >
              <span>{ui.backToProductBtn(bundle.scope.productName)}</span>
            </a>

            <a
              href={buildRouteHref('home')}
              onClick={handleSpaRoute('home')}
              className={`inline-flex min-h-11 items-center gap-2 px-4 py-3 rounded-xl bg-white text-[#1F2421] border border-[#9A7B4F] text-xs sm:text-sm font-semibold hover:bg-[#FAF8F5] transition-colors ${FOCUS_RING}`}
            >
              <span>{ui.backToStudioBtn}</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
