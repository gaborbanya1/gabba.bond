import { useState } from 'react';
import {
  ArrowRight,
  Baby,
  Bell,
  Check,
  ChevronRight,
  Download,
  Info,
  KeyRound,
  Lock,
  MapPin,
  ShieldCheck,
  UserCheck,
  Users,
  HeartHandshake,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PRODUCT_ACCENT } from './ProductShowcase3D';
import { AppRoute } from '../routing';

type Lang = 'hu' | 'en' | 'de';
type Target = 'child' | 'parent';

interface Step {
  title: string;
  desc: string;
  tip: string;
}

interface GuideCopy {
  home: string;
  pageTitle: string;
  pageSubtitle: string;
  previewNote: string;
  tabChild: string;
  tabChildSub: string;
  tabParent: string;
  tabParentSub: string;
  stepLabel: string;
  markDone: string;
  done: string;
  reset: string;
  progress: string;
  finishTitle: string;
  finishText: string;
  toParent: string;
  backToProduct: string;
  child: Step[];
  parent: Step[];
}

const COPY: Record<Lang, GuideCopy> = {
  hu: {
    home: 'Főoldal',
    pageTitle: 'JUNEAR Beállítási Útmutató',
    pageSubtitle:
      'Lépésről lépésre követhető útmutató a gyermek és a szülő telefonjának beállításához. Egyszerű, normál alkalmazás-telepítéssel.',
    previewNote:
      'A JUNEAR hamarosan elérhető. Az útmutató a végleges induláskor kisebb mértékben változhat — kérj értesítést, és szólunk, amint letölthető!',
    tabChild: 'Gyermek telefonja',
    tabChildSub: '6 lépés • Védett gyerekfelület',
    tabParent: 'Szülő telefonja',
    tabParentSub: '5 lépés • Szülői vezérlőpult',
    stepLabel: 'Lépés',
    markDone: 'Kész, tovább',
    done: 'Kész',
    reset: 'Újrakezdés',
    progress: 'lépés kész',
    finishTitle: 'Ez a telefon készen áll!',
    finishText: 'Minden lépést elvégeztél ezen a készüléken.',
    toParent: 'Tovább a szülő telefonjára',
    backToProduct: 'Vissza a JUNEAR oldalra',
    child: [
      {
        title: 'Alkalmazás telepítése és megnyitása',
        desc: 'Telepítsd a JUNEAR alkalmazást a gyermek telefonjára (Google Play Áruházból), majd nyisd meg.',
        tip: 'Nincs szükség gyári visszaállításra. Az első indításkor fogadd el a hívás-, helymeghatározási és értesítési engedélyeket.',
      },
      {
        title: '„Gyermek vagyok” profil kiválasztása',
        desc: 'Az üdvözlő képernyőn válaszd a gyermek profilt, és add meg a gyermek keresztnevét és életkorát.',
        tip: 'A név jelenik meg a szülő vezérlőpultján és minden értesítésben.',
      },
      {
        title: 'Kisegítő lehetőség és védelem bekapcsolása',
        desc: 'Kapcsold be a JUNEAR szolgáltatást a Kisegítő lehetőségek menüben, hogy a gyerekfelület ne legyen elhagyható.',
        tip: 'FONTOS: e nélkül a gyermek a kezdőgombbal kiléphetne a védett felületről.',
      },
      {
        title: 'Engedélyezett kontaktok és alkalmazások',
        desc: 'Add meg a családtagokat (fényképpel), akiket a gyermek hívhat, és válaszd ki a jóváhagyott alkalmazásokat.',
        tip: 'Csak az itt megadott számok hívhatók, és csak ezek hívhatják a gyermeket.',
      },
      {
        title: 'Párosító kód feljegyzése',
        desc: 'A beállítások között megjelenik a 6-jegyű párosító kód — ezt kell majd beírni a szülő telefonján.',
        tip: 'Tartsd szem előtt a kódot, vagy fotózd le a következő lépésekhez.',
      },
      {
        title: 'Gyerekfelület zárolása és indítása',
        desc: 'Nyomd meg a „Zárolás és indítás” gombot. A telefon ezzel a védett JUNEAR felületre vált.',
        tip: 'A beállításokhoz később a szülői PIN-kóddal térhetsz vissza.',
      },
    ],
    parent: [
      {
        title: 'JUNEAR telepítése a szülő telefonjára',
        desc: 'Telepítsd ugyanazt a JUNEAR alkalmazást a saját telefonodra, és engedélyezd az értesítéseket.',
        tip: 'Az értesítések nélkül nem kapnál jelzést zónaelhagyásról vagy alacsony akkuról.',
      },
      {
        title: '„Szülő vagyok” profil és regisztráció',
        desc: 'Válaszd a szülő profilt, add meg a neved és e-mail címed.',
        tip: 'Több szülő is csatlakozhat ugyanahhoz a gyermekhez.',
      },
      {
        title: 'Párosítás a 6-jegyű kóddal',
        desc: 'Írd be a gyermek telefonján látható párosító kódot, és nyomd meg a „Párosítás” gombot.',
        tip: 'A kapcsolat azonnal létrejön, a gyermek kártyája megjelenik a vezérlőpulton.',
      },
      {
        title: 'Biztonsági zónák beállítása',
        desc: 'Jelöld ki a térképen az otthon és az iskola biztonsági zónáját.',
        tip: 'Értesítést kapsz, ha a gyermek telefonja elhagyja a kijelölt zónát.',
      },
      {
        title: 'Értesítések és napló áttekintése',
        desc: 'Állítsd be, milyen eseményekről kérsz értesítést, és nézd át a hívásnaplót és az eseményeket.',
        tip: 'A frissítés ikonnal bármikor azonnali helyzet- és akkulekérést kérhetsz.',
      },
    ],
  },
  en: {
    home: 'Home',
    pageTitle: 'JUNEAR Setup Guide',
    pageSubtitle: 'Step-by-step guide to set up both the child’s and the parent’s phone. Simple, standard app installation.',
    previewNote:
      'JUNEAR is coming soon. This guide may change slightly at launch — request a notification and we will let you know as soon as it is available!',
    tabChild: 'Child’s phone',
    tabChildSub: '6 steps • Protected kids interface',
    tabParent: 'Parent’s phone',
    tabParentSub: '5 steps • Parent dashboard',
    stepLabel: 'Step',
    markDone: 'Done, next',
    done: 'Done',
    reset: 'Restart',
    progress: 'steps done',
    finishTitle: 'This phone is ready!',
    finishText: 'You completed every step on this device.',
    toParent: 'Continue with the parent’s phone',
    backToProduct: 'Back to JUNEAR',
    child: [
      {
        title: 'Install and open the app',
        desc: 'Install JUNEAR on your child’s phone (from Google Play) and open it.',
        tip: 'No factory reset needed. On first launch, grant the call, location and notification permissions.',
      },
      {
        title: 'Choose the “I am a child” profile',
        desc: 'On the welcome screen select the child profile and enter your child’s first name and age.',
        tip: 'The name appears on the parent dashboard and in every notification.',
      },
      {
        title: 'Enable accessibility protection',
        desc: 'Turn on the JUNEAR service in Accessibility settings so the kids interface cannot be left.',
        tip: 'IMPORTANT: without it, the child could exit the protected interface with the home button.',
      },
      {
        title: 'Approved contacts and apps',
        desc: 'Add the family members (with photos) your child may call and pick the approved apps.',
        tip: 'Only these numbers can be called — and only they can call your child.',
      },
      {
        title: 'Note the pairing code',
        desc: 'The settings show a 6-digit pairing code — you will enter it on the parent’s phone.',
        tip: 'Keep the code handy or take a photo of it.',
      },
      {
        title: 'Lock and start the kids interface',
        desc: 'Tap “Lock and start”. The phone switches to the protected JUNEAR interface.',
        tip: 'You can return to the settings later with the parent PIN.',
      },
    ],
    parent: [
      {
        title: 'Install JUNEAR on the parent’s phone',
        desc: 'Install the same JUNEAR app on your own phone and allow notifications.',
        tip: 'Without notifications you would not be alerted about zone exits or low battery.',
      },
      {
        title: '“I am a parent” profile and sign-up',
        desc: 'Choose the parent profile and enter your name and e-mail address.',
        tip: 'Several parents can connect to the same child.',
      },
      {
        title: 'Pair with the 6-digit code',
        desc: 'Enter the pairing code shown on the child’s phone and tap “Pair”.',
        tip: 'The connection is instant and your child’s card appears on the dashboard.',
      },
      {
        title: 'Set up safe zones',
        desc: 'Mark the home and school safe zones on the map.',
        tip: 'You get notified when the child’s phone leaves a zone.',
      },
      {
        title: 'Review alerts and history',
        desc: 'Choose which events you want to be notified about and review the call log and events.',
        tip: 'Use the refresh icon to request an instant location and battery update.',
      },
    ],
  },
  de: {
    home: 'Startseite',
    pageTitle: 'JUNEAR Einrichtungsanleitung',
    pageSubtitle: 'Schritt-für-Schritt-Anleitung für das Kinder- und das Eltern-Telefon. Einfache, normale App-Installation.',
    previewNote:
      'JUNEAR erscheint in Kürze. Die Anleitung kann sich zum Start noch leicht ändern — lassen Sie sich benachrichtigen, sobald die App verfügbar ist!',
    tabChild: 'Kinder-Telefon',
    tabChildSub: '6 Schritte • Geschützte Kinderoberfläche',
    tabParent: 'Eltern-Telefon',
    tabParentSub: '5 Schritte • Eltern-Dashboard',
    stepLabel: 'Schritt',
    markDone: 'Erledigt, weiter',
    done: 'Erledigt',
    reset: 'Neu starten',
    progress: 'Schritte erledigt',
    finishTitle: 'Dieses Telefon ist bereit!',
    finishText: 'Sie haben alle Schritte auf diesem Gerät abgeschlossen.',
    toParent: 'Weiter mit dem Eltern-Telefon',
    backToProduct: 'Zurück zu JUNEAR',
    child: [
      {
        title: 'App installieren und öffnen',
        desc: 'Installieren Sie JUNEAR auf dem Telefon Ihres Kindes (über Google Play) und öffnen Sie die App.',
        tip: 'Kein Werksreset nötig. Erteilen Sie beim ersten Start die Anruf-, Standort- und Benachrichtigungsrechte.',
      },
      {
        title: 'Profil „Ich bin ein Kind“ wählen',
        desc: 'Wählen Sie auf dem Startbildschirm das Kinderprofil und geben Sie Vorname und Alter ein.',
        tip: 'Der Name erscheint im Eltern-Dashboard und in jeder Benachrichtigung.',
      },
      {
        title: 'Bedienungshilfe-Schutz aktivieren',
        desc: 'Aktivieren Sie den JUNEAR-Dienst in den Bedienungshilfen, damit die Kinderoberfläche nicht verlassen werden kann.',
        tip: 'WICHTIG: Ohne diesen Schutz könnte das Kind die Oberfläche mit der Home-Taste verlassen.',
      },
      {
        title: 'Erlaubte Kontakte und Apps',
        desc: 'Fügen Sie die Familienmitglieder (mit Foto) hinzu, die Ihr Kind anrufen darf, und wählen Sie die erlaubten Apps.',
        tip: 'Nur diese Nummern können angerufen werden — und nur sie können Ihr Kind anrufen.',
      },
      {
        title: 'Kopplungscode notieren',
        desc: 'In den Einstellungen erscheint ein 6-stelliger Kopplungscode — diesen geben Sie am Eltern-Telefon ein.',
        tip: 'Halten Sie den Code bereit oder fotografieren Sie ihn.',
      },
      {
        title: 'Kinderoberfläche sperren und starten',
        desc: 'Tippen Sie auf „Sperren und starten“. Das Telefon wechselt in die geschützte JUNEAR-Oberfläche.',
        tip: 'Mit der Eltern-PIN gelangen Sie später zurück in die Einstellungen.',
      },
    ],
    parent: [
      {
        title: 'JUNEAR auf dem Eltern-Telefon installieren',
        desc: 'Installieren Sie dieselbe JUNEAR-App auf Ihrem Telefon und erlauben Sie Benachrichtigungen.',
        tip: 'Ohne Benachrichtigungen erhalten Sie keine Hinweise zu Zonen oder niedrigem Akku.',
      },
      {
        title: 'Profil „Ich bin ein Elternteil“ und Registrierung',
        desc: 'Wählen Sie das Elternprofil und geben Sie Namen und E-Mail-Adresse ein.',
        tip: 'Mehrere Elternteile können sich mit demselben Kind verbinden.',
      },
      {
        title: 'Mit dem 6-stelligen Code koppeln',
        desc: 'Geben Sie den Code vom Kinder-Telefon ein und tippen Sie auf „Koppeln“.',
        tip: 'Die Verbindung steht sofort, die Karte Ihres Kindes erscheint im Dashboard.',
      },
      {
        title: 'Sicherheitszonen einrichten',
        desc: 'Markieren Sie die Zonen für Zuhause und Schule auf der Karte.',
        tip: 'Sie werden benachrichtigt, wenn das Kinder-Telefon eine Zone verlässt.',
      },
      {
        title: 'Benachrichtigungen und Verlauf prüfen',
        desc: 'Legen Sie fest, über welche Ereignisse Sie informiert werden, und prüfen Sie Anrufliste und Ereignisse.',
        tip: 'Mit dem Aktualisieren-Symbol fordern Sie sofort Standort und Akkustand an.',
      },
    ],
  },
};

const CHILD_ICONS = [Download, UserCheck, ShieldCheck, Users, KeyRound, Lock];
const PARENT_ICONS = [Bell, HeartHandshake, KeyRound, MapPin, Info];

interface JunearSetupGuidePageProps {
  onNavigate: (route: AppRoute) => void;
  onContactClick: () => void;
}

export function JunearSetupGuidePage({ onNavigate, onContactClick }: JunearSetupGuidePageProps) {
  const { language, t } = useLanguage();
  const lang = (['hu', 'en', 'de'].includes(language) ? language : 'en') as Lang;
  const c = COPY[lang];
  const accent = PRODUCT_ACCENT.junear;

  const [target, setTarget] = useState<Target>('child');
  const [done, setDone] = useState<Record<Target, Set<number>>>({ child: new Set(), parent: new Set() });
  const [openStep, setOpenStep] = useState(0);

  const steps = target === 'child' ? c.child : c.parent;
  const icons = target === 'child' ? CHILD_ICONS : PARENT_ICONS;
  const doneSet = done[target];
  const allDone = doneSet.size === steps.length;

  const selectTarget = (tg: Target) => {
    setTarget(tg);
    setOpenStep(0);
    document.getElementById('junear-steps')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const markDone = (i: number) => {
    setDone((prev) => {
      const next = new Set(prev[target]);
      next.add(i);
      return { ...prev, [target]: next };
    });
    setOpenStep(i + 1 < steps.length ? i + 1 : -1);
  };

  return (
    <div className="bg-[#FAFAFA] text-[#2C2C2C] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#8C7355]">
          <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#2C2C2C] cursor-pointer">
            {c.home}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button type="button" onClick={() => onNavigate('junear')} className="hover:text-[#2C2C2C] cursor-pointer">
            JUNEAR
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2C2C2C] font-semibold">{t.nav.installGuide}</span>
        </nav>

        {/* Header */}
        <header className="space-y-5">
          <div className="flex items-center gap-4">
            <img src="/logos/junear-logo.png" alt="JUNEAR logo" className="w-16 h-16 object-contain" />
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">{c.pageTitle}</h1>
          </div>
          <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">{c.pageSubtitle}</p>
          <div className="flex items-start gap-3 p-4 rounded-2xl border bg-[#F1FAF8]" style={{ borderColor: `${accent.main}66` }}>
            <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent.main }} />
            <p className="text-sm text-[#24453F] leading-relaxed">
              {c.previewNote}{' '}
              <button type="button" onClick={onContactClick} className="font-bold underline cursor-pointer">
                {t.junear.btnMoreInfo}
              </button>
            </p>
          </div>
        </header>

        {/* Phone selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(
            [
              { key: 'child' as Target, title: c.tabChild, sub: c.tabChildSub, Icon: Baby },
              { key: 'parent' as Target, title: c.tabParent, sub: c.tabParentSub, Icon: HeartHandshake },
            ]
          ).map(({ key, title, sub, Icon }) => {
            const active = target === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => selectTarget(key)}
                className={`p-5 rounded-3xl border-2 text-left flex items-center gap-4 transition-all cursor-pointer ${
                  active ? 'bg-white shadow-lg' : 'bg-white/70 border-[#E8DFD4] hover:border-[#C5A880]/60'
                }`}
                style={active ? { borderColor: accent.main } : undefined}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: active ? accent.main : '#F5F0EB', color: active ? '#fff' : accent.main }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-heading font-bold text-lg">{title}</div>
                  <div className="text-xs font-semibold text-[#8C7355]">{sub}</div>
                </div>
                {active && <Check className="w-5 h-5 ml-auto" style={{ color: accent.main }} strokeWidth={3} />}
              </button>
            );
          })}
        </div>

        {/* Progress */}
        <div id="junear-steps" className="scroll-mt-28 flex items-center justify-between gap-3 text-sm">
          <div className="flex-1 h-2 rounded-full bg-[#E8DFD4] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(doneSet.size / steps.length) * 100}%`, background: accent.main }}
            />
          </div>
          <span className="font-semibold text-[#8C7355] whitespace-nowrap">
            {doneSet.size}/{steps.length} {c.progress}
          </span>
          <button
            type="button"
            onClick={() => {
              setDone((p) => ({ ...p, [target]: new Set() }));
              setOpenStep(0);
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#5C5A56] hover:text-[#2C2C2C] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> {c.reset}
          </button>
        </div>

        {/* Steps */}
        <ol className="space-y-4">
          {steps.map((step, i) => {
            const Icon = icons[i];
            const isDone = doneSet.has(i);
            const isOpen = openStep === i;
            const important = /^(FONTOS|IMPORTANT|WICHTIG)/.test(step.tip);
            return (
              <li
                key={`${target}-${i}`}
                className={`rounded-3xl border-2 bg-white overflow-hidden transition-all ${isOpen ? 'shadow-md' : ''}`}
                style={{ borderColor: isOpen ? accent.main : isDone ? '#A7DCC9' : '#E8DFD4' }}
              >
                <button
                  type="button"
                  onClick={() => setOpenStep(isOpen ? -1 : i)}
                  className="w-full p-5 flex items-center gap-4 text-left cursor-pointer"
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-black"
                    style={{
                      background: isDone ? '#10895F' : isOpen ? '#2C2C2C' : '#F0EAE1',
                      color: isDone || isOpen ? '#fff' : '#6E6B65',
                    }}
                  >
                    {isDone ? <Check className="w-5 h-5" strokeWidth={3} /> : i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: accent.main }}>
                      {c.stepLabel} {i + 1}
                    </div>
                    <div className="font-heading font-bold text-base sm:text-lg">{step.title}</div>
                  </div>
                  <Icon className="w-6 h-6 text-[#8C7355] shrink-0" />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:pl-20 space-y-4">
                    <p className="text-base text-[#5C5A56] leading-relaxed">{step.desc}</p>
                    <div
                      className={`p-3.5 rounded-2xl border text-sm leading-relaxed flex items-start gap-2.5 ${
                        important ? 'bg-amber-50 border-amber-300 text-amber-950' : 'bg-[#FAF8F5] border-[#C5A880]/35 text-[#5C5A56]'
                      }`}
                    >
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{step.tip}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => markDone(i)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2C2C2C] text-white text-sm font-bold hover:bg-black transition-all cursor-pointer"
                    >
                      {c.markDone}
                      <ArrowRight className="w-4 h-4" style={{ color: accent.soft }} />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {allDone && (
          <div className="rounded-3xl bg-gradient-to-br from-[#2C2C2C] to-[#1F2421] text-white p-8 text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ background: `${accent.main}33` }}>
              <Check className="w-8 h-8" style={{ color: accent.soft }} strokeWidth={3} />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">{c.finishTitle}</h2>
            <p className="text-stone-300">{c.finishText}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {target === 'child' && (
                <button
                  type="button"
                  onClick={() => selectTarget('parent')}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-[#1F2421] cursor-pointer"
                  style={{ background: accent.soft }}
                >
                  {c.toParent} →
                </button>
              )}
              <button
                type="button"
                onClick={() => onNavigate('junear')}
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 border border-white/20 hover:bg-white/20 cursor-pointer"
              >
                {c.backToProduct}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
