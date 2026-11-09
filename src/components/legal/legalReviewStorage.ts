import { LegalDocKind } from '../../routing';

export type ReviewDocKey = 'senear_privacy' | 'senear_terms' | 'senear_operations';

export interface LegalReviewNote {
  text: string;
  updatedAt: string;
  author: string;
}

export type DocNotesMap = Record<string, LegalReviewNote>;
export type AllLegalNotesMap = Record<ReviewDocKey, DocNotesMap>;

const LOCAL_STORAGE_KEY = 'gabba_senear_legal_review_notes_v1';
const RTDB_BASE_URL =
  'https://nogond-834ed-default-rtdb.europe-west1.firebasedatabase.app/legal_review_notes';

export function toReviewDocKey(kind: LegalDocKind): ReviewDocKey {
  switch (kind) {
    case 'privacy':
      return 'senear_privacy';
    case 'terms':
      return 'senear_terms';
    case 'operations':
      return 'senear_operations';
  }
}

export function createEmptyAllNotes(): AllLegalNotesMap {
  return {
    senear_privacy: {},
    senear_terms: {},
    senear_operations: {},
  };
}

export function loadLocalLegalNotes(): AllLegalNotesMap {
  if (typeof window === 'undefined') return createEmptyAllNotes();
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return createEmptyAllNotes();
    const parsed = JSON.parse(raw) as Partial<AllLegalNotesMap>;
    return {
      senear_privacy: parsed.senear_privacy || {},
      senear_terms: parsed.senear_terms || {},
      senear_operations: parsed.senear_operations || {},
    };
  } catch {
    return createEmptyAllNotes();
  }
}

export function saveLocalLegalNotes(notes: AllLegalNotesMap): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Ignore localStorage quota/privacy errors
  }
}

export function mergeCloudAndLocalNotes(
  local: AllLegalNotesMap,
  cloud: Partial<AllLegalNotesMap> | null
): AllLegalNotesMap {
  if (!cloud) return local;
  const result = createEmptyAllNotes();
  const docKeys: ReviewDocKey[] = ['senear_privacy', 'senear_terms', 'senear_operations'];

  for (const dk of docKeys) {
    const localDoc = local[dk] || {};
    const cloudDoc = cloud[dk] || {};
    const allSectionIds = new Set([...Object.keys(localDoc), ...Object.keys(cloudDoc)]);

    for (const secId of allSectionIds) {
      const lNote = localDoc[secId];
      const cNote = cloudDoc[secId];
      if (lNote && cNote) {
        result[dk][secId] = cNote.updatedAt >= lNote.updatedAt ? cNote : lNote;
      } else if (cNote) {
        result[dk][secId] = cNote;
      } else if (lNote) {
        result[dk][secId] = lNote;
      }
    }
  }

  return result;
}

export async function fetchAllCloudLegalNotes(): Promise<Partial<AllLegalNotesMap> | null> {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') return null;
  try {
    const res = await fetch(`${RTDB_BASE_URL}.json`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data || {}) as Partial<AllLegalNotesMap>;
  } catch {
    return null;
  }
}

export async function saveCloudSectionNote(
  docKey: ReviewDocKey,
  sectionId: string,
  note: LegalReviewNote
): Promise<boolean> {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') return false;
  const safeSectionId = sectionId.replace(/[.#$/[\]]/g, '_');
  const payload: LegalReviewNote = {
    text: note.text.slice(0, 8000),
    updatedAt: note.updatedAt.slice(0, 64),
    author: (note.author || 'Adri').slice(0, 64),
  };
  try {
    const res = await fetch(`${RTDB_BASE_URL}/${docKey}/${safeSectionId}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function countNonEmptyNotes(docMap: DocNotesMap | undefined): number {
  if (!docMap) return 0;
  return Object.values(docMap).filter((n) => Boolean(n && n.text && n.text.trim().length > 0)).length;
}

export function formatNoteTimestamp(iso: string, lang: 'hu' | 'de' | 'en'): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const locale = lang === 'hu' ? 'hu-HU' : lang === 'de' ? 'de-DE' : 'en-GB';
    return d.toLocaleString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}
