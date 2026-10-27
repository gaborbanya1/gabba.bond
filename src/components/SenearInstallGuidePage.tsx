import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SenearInstallGuidePageProps {
  onBackToHome: () => void;
  onBackToProduct: () => void;
  onContactClick?: () => void;
}

type Lang = 'hu' | 'en' | 'de';

interface SetupStepData {
  id: number;
  start: number;
  end: number;
  timeStamp: string;
  title: string;
  tasks: string[];
}

interface GuideCopy {
  videoId: string;
  backToSenearBtn: string;
  pageTitle: string;
  pageSubtitle: string;
  watchInVideoBtn: string;
  playingInVideoBtn: string;
  steps: SetupStepData[];
}

const GUIDE_COPY: Record<Lang, GuideCopy> = {
  hu: {
    videoId: 'yLFO0MMnATo',
    backToSenearBtn: 'Vissza a SENEAR főoldalra',
    pageTitle: 'SENEAR Beállítási Útmutató',
    pageSubtitle:
      'Kövesd a lépéseket, vagy kattints bármelyik pontra, és nézd meg nagy méretben a videón!',
    watchInVideoBtn: '▶ Megtekintés a videóban',
    playingInVideoBtn: '▶ Épp ez a rész megy a videóban',
    steps: [
      {
        id: 1,
        start: 7,
        end: 37,
        timeStamp: '00:07',
        title: '1. Alapbeállítások és Szerepkörök',
        tasks: [
          'Indítsd el a SENEAR alkalmazást mindkét készüléken, és hagyd jóvá az alapvető engedélyeket (Kamera, Helymeghatározás, Értesítések, Hívás- és SMS-kezelés).',
          'Válaszd ki a szerepkört: a saját telefonodon a **Gondozó**, az idős hozzátartozóén a **Gondozott** módot.',
        ],
      },
      {
        id: 2,
        start: 37,
        end: 117,
        timeStamp: '00:37',
        title: '2. Regisztráció és Védett Kioszk Mód',
        tasks: [
          'Add meg a Gondozó, majd a Gondozott nevét, telefonszámát és születési évét.',
          'Kapcsold be a **Más alkalmazások feletti megjelenést**, a **Rendszerbeállítások módosítását**, és állítsd be a SENEAR-t **alapértelmezett kezdőképernyőként**.',
          'A **Kisegítő lehetőségek (Accessibility)** menüben kapcsold be a **Kioszk őrszemet**.',
        ],
      },
      {
        id: 3,
        start: 117,
        end: 188,
        timeStamp: '01:57',
        title: '3. Készülékek párosítása és Háttérvédelem',
        tasks: [
          'A Gondozott telefonján az Általános beállításokban hagyd jóvá a párosítást, majd írd be a megjelenő **6 jegyű biztonsági kódot** a Gondozó telefonján.',
          'Az **SMS és akkumulátor vezérlés** menüben engedélyezd az értesítések olvasását, és **kapcsold ki az akkumulátor-optimalizálást**.',
        ],
      },
      {
        id: 4,
        start: 188,
        end: 341,
        timeStamp: '03:08',
        title: '4. Hívócsempék, Fényképek és Látáskönnyítés',
        tasks: [
          'Indítsd el a Gondozott telefonján a védett Kioszk módot, majd a saját telefonodról töltsd fel a családtagok fényképét és telefonszámát a csempékre.',
          'Válts igény szerint **4 vagy 6 csempés nézet** között, és a csúszkákkal állítsd be a nevek és arcképek méretét.',
        ],
      },
      {
        id: 5,
        start: 341,
        end: 459,
        timeStamp: '05:41',
        title: '5. Hívásszűrés és Automatikus Kihangosítás',
        tasks: [
          'A **Hívási engedélyeknél** add hozzá azokat az ismerősöket, akik a fő csempéken kívül is felhívhatják a gondozottat (az ismeretlen számokat a rendszer blokkolja).',
          'Igény esetén kapcsold be az **Automatikus hívásfogadást** (érintés nélküli felvétel 100%-os kihangosítással).',
        ],
      },
      {
        id: 6,
        start: 469,
        end: 587,
        timeStamp: '07:49',
        title: '6. Napi rutinok és Fotós Gyógyszeremlékeztető',
        tasks: [
          'Állíts be távolról reggeli ébresztőt vagy ismétlődő napi rutinokat.',
          'Hozz létre **Fényképes gyógyszeremlékeztetőt** pontos adagolással és fotóval — a „Bevettem” gomb megnyomásáról azonnal visszajelzést kapsz.',
        ],
      },
      {
        id: 7,
        start: 587,
        end: 663,
        timeStamp: '09:47',
        title: '7. GPS Biztonsági Zóna és SOS Gomb',
        tasks: [
          'A **GPS és navigáció** menüben rögzítsd az otthoni pozíciót, és kapcsold be az elbóklászás riasztást.',
          'A Gondozott telefonján az **SOS konfiguráció** menüben állítsd be a segélyhívó számot és az automatikus GPS-koordinátás SMS küldést.',
        ],
      },
      {
        id: 8,
        start: 663,
        end: 785,
        timeStamp: '11:03',
        title: '8. Riasztási értesítések, Tárcsázó és Gyors SMS',
        tasks: [
          'Kapcsold be az értesítéseket alacsony akkumulátorszint, ki-/bekapcsolás, töltés vagy elmulasztott gyógyszer esetére.',
          'Mutasd meg a hozzátartozónak a jobb alsó sarokban található nagy gombos tárcsázót és a gépelés nélküli Gyors SMS küldést.',
        ],
      },
    ],
  },

  en: {
    videoId: '7UUD1rOxeOo',
    backToSenearBtn: 'Back to SENEAR main page',
    pageTitle: 'SENEAR Setup Guide',
    pageSubtitle:
      'Follow the steps, or click any item to watch it in large format in the video!',
    watchInVideoBtn: '▶ Watch in video',
    playingInVideoBtn: '▶ Playing in video now',
    steps: [
      {
        id: 1,
        start: 0,
        end: 24,
        timeStamp: '00:00',
        title: '1. Installation, Role Selection & Permissions',
        tasks: [
          'Launch the SENEAR app on both phones, approve essential permissions (camera, location, microphone, notifications, phone calls, and SMS), then select **Caregiver** mode on the left phone and **Senior** mode on the right phone.',
        ],
      },
      {
        id: 2,
        start: 24,
        end: 105,
        timeStamp: '00:24',
        title: '2. Profile Details & Protected Kiosk System Permissions',
        tasks: [
          'Enter Caregiver details (Mary Smith) to open the Caregiver Dashboard, then enter Senior details (John Smith) and enable the Kiosk system permissions step by step: *Appear on top*, *Modify system settings*, *Default Home app*, and *SENEAR Kiosk Guard* in Accessibility.',
        ],
      },
      {
        id: 3,
        start: 105,
        end: 172,
        timeStamp: '01:45',
        title: '3. Two Phones, One System – Instant Pairing',
        tasks: [
          "Open *My Seniors & Pairing* on the Caregiver's phone and *General Settings* on the Senior's phone. Consent to pairing to generate the 6-digit security code (TD6F4T), link both phones with one tap, then enable SMS notification access and disable battery optimization under *SMS & Battery Management*.",
        ],
      },
      {
        id: 4,
        start: 172,
        end: 331,
        timeStamp: '02:52',
        title: '4. Remote Photo, Contact & Tile Setup (4 or 6 Tiles)',
        tasks: [
          "Start the protected Kiosk mode on the Senior's phone. Remotely upload and crop portrait photos for Tiles 1–4 (Mary, Peter, Eva, George), switch to the **6-tile layout** (04:01) to add Eve and John, and remotely adjust icon, text, and photo sizes in real time under *Show Profile Photos* (04:46).",
        ],
      },
      {
        id: 5,
        start: 331,
        end: 379,
        timeStamp: '05:31',
        title: '5. Call Permissions (Whitelist) & Scammer Protection',
        tasks: [
          'Under *Call Permissions*, add trusted contacts (such as Kate and Andrew) who are allowed to call the senior in addition to the 6 main speed-dial tiles, while unknown numbers and phone scammers are automatically blocked.',
        ],
      },
      {
        id: 6,
        start: 379,
        end: 451,
        timeStamp: '06:19',
        title: '6. Free Wi-Fi Call, 100% Speakerphone Auto-Answer & Callback',
        tasks: [
          'Remotely enable *Auto-answer* and *Auto-speaker* under *Advanced Call Settings* so incoming Wi-Fi calls are answered hands-free at 100% speakerphone volume with an on-screen volume slider. If auto-answer is off, missed calls display a red *Missed call!* badge on the tile for one-tap callback with *YES / NO* confirmation.',
        ],
      },
      {
        id: 7,
        start: 451,
        end: 454,
        timeStamp: '07:31',
        title: '7. Senior-Friendly, Large-Print Incoming SMS Popup',
        tasks: [
          "Standard SMS text messages sent to the senior's phone automatically pop up in a high-contrast, large-print card on the Kiosk screen and can be closed with a single tap.",
        ],
      },
      {
        id: 8,
        start: 454,
        end: 591,
        timeStamp: '07:34',
        title: '8. Alarms, Photo Medication Reminders & Power Alerts',
        tasks: [
          'Remotely schedule an 8:00 AM wake-up alarm and a photo medication reminder (*One vitamin drop in a glass of water*). At the scheduled time (08:40), the senior views the photo and taps *DONE / TAKEN* for instant confirmation. Also demonstrates *Notification Settings*, live power-off/restart and power-on push alerts, and *Alert History* (09:01).',
        ],
      },
      {
        id: 9,
        start: 591,
        end: 643,
        timeStamp: '09:51',
        title: '9. Live Mini-Map, Safe Zone & SOS Emergency Call',
        tasks: [
          "Check the senior's live location on the built-in Google Maps mini-map, launch turn-by-turn navigation, and configure the Home Safe Zone with a custom wandering alert radius (100m–1000m). On the Kiosk screen, pressing the red *SOS CALL* button or any contact tile shows a clear *YES / NO* confirmation screen (10:31).",
        ],
      },
      {
        id: 10,
        start: 643,
        end: 683,
        timeStamp: '10:43',
        title: '10. Large-Button Free-Dial Keypad & Quick SMS',
        tasks: [
          'Tap the keypad button in the bottom-right corner of the Kiosk screen to dial any phone number using the large-button keypad (10:52), or switch to the *SMS* tab (11:10) to send pre-written quick text messages (*Please call me!*) to family members without typing.',
        ],
      },
      {
        id: 11,
        start: 683,
        end: 757,
        timeStamp: '11:23',
        title: '11. Returning from Kiosk Mode to Local Caregiver Settings',
        tasks: [
          "Tap the top clock 5 times quickly on the senior's phone and enter the default 1234 PIN code (customizable anytime). Access all caregiver settings locally—including *Quick Messages Setup*, *Sound & Screen Settings* (ringer, speakerphone, automatic day/night brightness & volume sliders at 11:58), *Edit Contacts*, *Daily Routines*, and *SOS Configuration* with GPS emergency SMS contacts (12:21).",
        ],
      },
      {
        id: 12,
        start: 757,
        end: 778,
        timeStamp: '12:37',
        title: '12. Exiting Caregiver Settings to the Android Menu',
        tasks: [
          "Tap the red *Back to Phone Menu* button at the bottom of Caregiver Settings and select the phone's default Home app (*One UI Home*) to deactivate Kiosk mode and return to the standard Android menu. The protected Kiosk interface can be relaunched anytime via the SENEAR icon.",
        ],
      },
    ],
  },

  de: {
    videoId: '7UUD1rOxeOo',
    backToSenearBtn: 'Zurück zur SENEAR-Hauptseite',
    pageTitle: 'SENEAR Einrichtungsanleitung',
    pageSubtitle:
      'Folgen Sie den Schritten oder klicken Sie auf einen Punkt, um ihn groß im Video anzusehen!',
    watchInVideoBtn: '▶ Im Video ansehen',
    playingInVideoBtn: '▶ Läuft gerade im Video',
    steps: [
      {
        id: 1,
        start: 0,
        end: 24,
        timeStamp: '00:00',
        title: '1. Installation, Rollenauswahl & Berechtigungen',
        tasks: [
          'Starten Sie die SENEAR-App auf beiden Telefonen, bestätigen Sie die wichtigen Berechtigungen (Kamera, Standort, Mikrofon, Benachrichtigungen, Anrufe und SMS) und wählen Sie links den **Betreuer**-Modus und rechts den **Senioren**-Modus.',
        ],
      },
      {
        id: 2,
        start: 24,
        end: 105,
        timeStamp: '00:24',
        title: '2. Profildaten & Geschützte Kiosk-Systemberechtigungen',
        tasks: [
          'Geben Sie die Betreuerdaten (Mary Smith) und anschließend die Seniorendaten (John Smith) ein und aktivieren Sie Schritt für Schritt die Kiosk-Berechtigungen: *Appear on top*, *Modify system settings*, *Default Home app* sowie *SENEAR Kiosk Guard* in den Bedienungshilfen.',
        ],
      },
      {
        id: 3,
        start: 105,
        end: 172,
        timeStamp: '01:45',
        title: '3. Zwei Telefone, Ein System – Sofortige Kopplung',
        tasks: [
          'Öffnen Sie *My Seniors & Pairing* am Betreuer-Telefon und *General Settings* am Senioren-Telefon. Bestätigen Sie die Kopplung für den 6-stelligen Code (TD6F4T), verbinden Sie beide Geräte und aktivieren Sie SMS-Zugriff sowie Akku-Schutz unter *SMS & Battery Management*.',
        ],
      },
      {
        id: 4,
        start: 172,
        end: 331,
        timeStamp: '02:52',
        title: '4. Fotos, Kontakte & Kachel-Einrichtung (4 oder 6 Kacheln)',
        tasks: [
          'Starten Sie den geschützten Kiosk-Modus am Senioren-Telefon. Laden Sie Fotos für Kacheln 1–4 hoch, wechseln Sie zur **6-Kachel-Ansicht** (04:01) und passen Sie Symbol-, Text- und Fotogrößen in Echtzeit unter *Show Profile Photos* an (04:46).',
        ],
      },
      {
        id: 5,
        start: 331,
        end: 379,
        timeStamp: '05:31',
        title: '5. Anrufberechtigungen (Whitelist) & Betrugsschutz',
        tasks: [
          'Fügen Sie unter *Call Permissions* vertrauenswürdige Kontakte (z. B. Kate und Andrew) hinzu, die zusätzlich zu den 6 Hauptkacheln anrufen dürfen, während unbekannte Nummern und Telefonbetrüger automatisch blockiert werden.',
        ],
      },
      {
        id: 6,
        start: 379,
        end: 451,
        timeStamp: '06:19',
        title: '6. Kostenloser WLAN-Anruf, 100 % Freisprechen & Rückruf',
        tasks: [
          'Aktivieren Sie *Auto-answer* und *Auto-speaker* unter *Advanced Call Settings* für berührungslose Annahme bei 100 % Lautsprecher-Lautstärke. Verpasste Anrufe zeigen ein rotes *Missed call!*-Abzeichen für den Ein-Klick-Rückruf mit *YES / NO*-Bestätigung.',
        ],
      },
      {
        id: 7,
        start: 451,
        end: 454,
        timeStamp: '07:31',
        title: '7. Seniorengerechtes Großschrift-SMS-Popup',
        tasks: [
          'Klassische SMS-Nachrichten erscheinen automatisch als kontrastreiche Großschrift-Karte auf dem Kiosk-Bildschirm und lassen sich mit einem Tippen schließen.',
        ],
      },
      {
        id: 8,
        start: 454,
        end: 591,
        timeStamp: '07:34',
        title: '8. Wecker, Foto-Medikamentenerinnerung & Strom-Alarme',
        tasks: [
          'Planen Sie aus der Ferne einen 8:00-Uhr-Wecker und eine Foto-Medikamentenerinnerung. Zur geplanten Zeit (08:40) tippt der Senior auf *DONE / TAKEN*. Zeigt außerdem *Notification Settings*, Aus-/Einschalt-Alarme und *Alert History* (09:01).',
        ],
      },
      {
        id: 9,
        start: 591,
        end: 643,
        timeStamp: '09:51',
        title: '9. Live-Minikarte, Sicherheitszone & SOS-Notruf',
        tasks: [
          'Prüfen Sie den Live-Standort auf der Google-Maps-Minikarte, starten Sie die Navigation und richten Sie die Sicherheitszone (100–1000 m) ein. Am Kiosk-Bildschirm zeigt der rote *SOS CALL*-Button eine *YES / NO*-Bestätigung (10:31).',
        ],
      },
      {
        id: 10,
        start: 643,
        end: 683,
        timeStamp: '10:43',
        title: '10. Großtasten-Wählfeld & Schnell-SMS',
        tasks: [
          'Tippen Sie unten rechts auf das Tastenfeld zum freien Wählen (10:52) oder wechseln Sie zum Reiter *SMS* (11:10), um vorgefertigte Schnellnachrichten (*Please call me!*) ohne Tippen zu senden.',
        ],
      },
      {
        id: 11,
        start: 683,
        end: 757,
        timeStamp: '11:23',
        title: '11. Vom Kiosk-Modus in die lokalen Betreuer-Einstellungen',
        tasks: [
          'Tippen Sie 5-mal schnell auf die obere Uhr und geben Sie den Standard-PIN 1234 ein. Greifen Sie lokal auf alle Einstellungen zu: *Quick Messages Setup*, *Sound & Screen Settings* (11:58), *Edit Contacts*, *Daily Routines* und *SOS Configuration* (12:21).',
        ],
      },
      {
        id: 12,
        start: 757,
        end: 778,
        timeStamp: '12:37',
        title: '12. Betreuer-Einstellungen zum Android-Menü verlassen',
        tasks: [
          'Tippen Sie unten auf den roten Button *Back to Phone Menu* und wählen Sie die Standard-Start-App (*One UI Home*), um den Kiosk-Modus zu beenden und zum normalen Android-Menü zurückzukehren.',
        ],
      },
    ],
  },
};

function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#1F2421]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic font-medium text-[#2C2C2C]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function SenearInstallGuidePage({
  onBackToProduct,
}: SenearInstallGuidePageProps) {
  const { language } = useLanguage();
  const lang: Lang = ['hu', 'en', 'de'].includes(language) ? (language as Lang) : 'en';
  const c = GUIDE_COPY[lang];

  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [playTrigger, setPlayTrigger] = useState<number>(0);

  useEffect(() => {
    setActiveStepId(1);
    setAutoPlay(false);
  }, [lang]);

  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const stepsScrollRef = useRef<HTMLDivElement>(null);

  const activeStep = c.steps.find((s) => s.id === activeStepId) || c.steps[0];

  const handlePlayStep = (step: SetupStepData, cardEl?: HTMLElement | null) => {
    setActiveStepId(step.id);
    setAutoPlay(true);
    setPlayTrigger((prev) => prev + 1);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      videoPlayerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (cardEl && stepsScrollRef.current) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  /**
   * On desktop (lg:), forward wheel events anywhere outside the right-hand
   * card list directly into the right-hand card list so the header and the
   * left-hand video never move a single millimeter while scrolling.
   */
  const handlePageWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    const listEl = stepsScrollRef.current;
    if (!listEl) return;
    if (!listEl.contains(e.target as Node)) {
      listEl.scrollTop += e.deltaY;
    }
  };

  return (
    <div
      onWheel={handlePageWheel}
      className="bg-[#FAFAFA] text-[#2C2C2C] lg:h-[calc(100vh-80px)] lg:overflow-hidden flex flex-col selection:bg-[#C5A880]/30 selection:text-[#1F2421]"
    >
      <style>{`
        .setup-steps-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .setup-steps-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .setup-steps-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(197, 168, 128, 0.55);
          border-radius: 9999px;
        }
        .setup-steps-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(140, 115, 85, 0.85);
        }
      `}</style>

      <div className="max-w-7xl w-full mx-auto px-4 pt-5 pb-8 lg:py-6 flex-1 flex flex-col min-h-0 gap-5">
        {/* Clean Simplified Header (Fixed on Desktop) */}
        <header className="shrink-0 space-y-2">
          <div>
            <button
              type="button"
              onClick={onBackToProduct}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8C7355] hover:text-[#2C2C2C] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{c.backToSenearBtn}</span>
            </button>
          </div>

          <div className="space-y-1">
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2C2C2C] tracking-tight">
              {c.pageTitle}
            </h1>
            <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed">
              {c.pageSubtitle}
            </p>
          </div>
        </header>

        {/* 12-Column Grid: 8-Col Fixed Video + 4-Col Internally Scrollable Step List */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1 min-h-0">
          {/* Left Side: Huge, Clean 16:9 Video Player (2/3 width, 8 columns, stationary) */}
          <div
            ref={videoPlayerRef}
            className="lg:col-span-8 sticky top-16 z-30 lg:static self-start bg-[#FAFAFA] lg:bg-transparent py-1 lg:py-0"
          >
            <div className="aspect-video w-full rounded-2xl shadow-xl overflow-hidden bg-black">
              <iframe
                key={`${c.videoId}-${activeStep.id}-${activeStep.start}-${activeStep.end}-${autoPlay}-${playTrigger}`}
                src={`https://www.youtube.com/embed/${c.videoId}?start=${activeStep.start}&end=${activeStep.end}&autoplay=${autoPlay ? 1 : 0}&rel=0`}
                title={activeStep.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Right Side: Clean Step List (1/3 width, 4 columns, independent vertical scroll on desktop) */}
          <div
            ref={stepsScrollRef}
            className="lg:col-span-4 lg:h-[calc(100vh-220px)] lg:overflow-y-auto lg:pr-2 scroll-smooth setup-steps-scroll space-y-4 pb-12"
          >
            {c.steps.map((step) => {
              const isActive = step.id === activeStepId;
              return (
                <div
                  key={step.id}
                  onClick={(e) => handlePlayStep(step, e.currentTarget)}
                  className={`rounded-2xl p-5 bg-white border transition-all cursor-pointer space-y-3.5 ${
                    isActive
                      ? 'border-[#C5A880] ring-2 ring-[#C5A880]/25 shadow-md'
                      : 'border-[#E8DFD4] hover:border-[#C5A880]/60 shadow-2xs'
                  }`}
                >
                  {/* 1. Step Title + Discreet Timestamp */}
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-heading text-base font-bold text-[#2C2C2C] leading-snug">
                      {step.title}
                    </h2>
                    <span className="font-mono text-xs text-[#8C7355] shrink-0 mt-0.5">
                      {step.timeStamp}
                    </span>
                  </div>

                  {/* 2. Short, Concise Bullet Points */}
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#5C5A56] leading-relaxed list-disc pl-4">
                    {step.tasks.map((task, idx) => (
                      <li key={idx}>{renderInlineBold(task)}</li>
                    ))}
                  </ul>

                  {/* 3. Clean Watch in Video Button */}
                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayStep(step, e.currentTarget.closest('div.rounded-2xl') as HTMLElement);
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-2 ${
                        isActive && autoPlay
                          ? 'bg-[#1B7A4E] text-white'
                          : isActive
                          ? 'bg-[#2C2C2C] text-white hover:bg-black'
                          : 'bg-[#F5F0EB] text-[#2C2C2C] hover:bg-[#E8DFD4]'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                      <span>
                        {isActive && autoPlay
                          ? c.playingInVideoBtn.replace(/^▶\s*/, '')
                          : c.watchInVideoBtn.replace(/^▶\s*/, '')}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
