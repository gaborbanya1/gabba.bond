import { useState, useId } from 'react';
import {
  ArrowLeft,
  Smartphone,
  Power,
  Hand,
  QrCode,
  ShieldCheck,
  AlertTriangle,
  Wifi,
  Download,
  Copy,
  Check,
  Printer,
  FileCode2,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Info,
  CheckCircle2,
  Settings,
  Sliders,
  Trash2,
  RefreshCw,
  ArrowRight,
  Package,
  History,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/types';

interface SenearInstallGuidePageProps {
  onBackToHome: () => void;
  onOpenSimulator?: () => void;
  onContactClick?: () => void;
}

// -----------------------------------------------------------------------------
// Complete Multilingual Dictionary (EN, DE, HU)
// -----------------------------------------------------------------------------
const I18N_WIZARD = {
  en: {
    backToHome: 'Back to Overview',
    breadcrumb: 'SENEAR Installation Wizard',
    pageTitle: 'SENEAR Installation Guide',
    pageSubtitle:
      'Step-by-step setup wizard for Android Enterprise QR provisioning. Simple, fail-safe, and free of Google accounts.',
    deviceOwnerPill: 'Device Owner Kiosk Mode',
    noGoogleAccountPill: 'Zero Google Account Setup',
    langSelectorLabel: 'Language:',

    // Conditional phone question
    phoneQuestionTitle: 'Are you installing SENEAR on a NEW phone or a USED phone?',
    phoneQuestionSubtitle:
      'Android Enterprise Device Owner permissions require a completely unconfigured system. Choose your starting scenario below:',
    usedPhoneTitle: 'USED / Existing Phone',
    usedPhoneSubtitle:
      'Has previous accounts, apps, or settings. We will start with a quick 2-minute Factory Reset to wipe it clean.',
    usedPhoneBadge: 'Starts with Phase 1: Factory Reset',
    newPhoneTitle: 'BRAND-NEW Phone',
    newPhoneSubtitle:
      'Fresh out of the sealed box. Never had any Google account added. Skips directly to the 6-tap QR setup.',
    newPhoneBadge: 'Skips to Phase 2: Kiosk Setup',
    btnStart: 'Start Setup',
    changeDeviceType: 'Change device type',
    deviceTypeBadgeUsed: 'Configuring: USED Phone (Phase 1 + 2)',
    deviceTypeBadgeNew: 'Configuring: NEW Phone (Phase 2 Only)',

    // Phase Headers
    phase1Heading: 'Phase 1: Factory Reset',
    phase1Subheading: 'Wipe all previous data to unlock firmware-level kiosk permissions.',
    phase2Heading: 'Phase 2: Kiosk Installation',
    phase2Subheading: 'Android Enterprise QR provisioning on the clean Welcome screen.',

    // Phase 1 Steps
    p1s1Title: 'Step 1: Open Settings',
    p1s1Category: 'Device Preparation',
    p1s1Desc: 'On the target device, open the standard Android Settings application.',
    p1s1Tip: 'Look for the gear icon on the home screen or swipe down to tap the quick settings gear.',
    p1s1VisualText: 'Android Settings App',

    p1s2Title: 'Step 2: Find Reset Options',
    p1s2Category: 'System Menu',
    p1s2Desc:
      'Navigate to System > Reset options (on Samsung and some other models, this is located under General Management > Reset).',
    p1s2Tip: 'You can also tap the search icon at the top of Settings and type "Reset".',
    p1s2VisualText: 'System > Reset options',

    p1s3Title: 'Step 3: Erase All Data',
    p1s3Category: 'Wipe Selection',
    p1s3Desc: 'Select "Erase all data (factory reset)" from the list of options.',
    p1s3Tip:
      'The phone will summarize that Google accounts, apps, and storage will be erased. This is required.',
    p1s3VisualText: 'Erase all data (factory reset)',

    p1s4Title: 'Step 4: Confirm and Reboot',
    p1s4Category: 'Wipe Execution',
    p1s4Desc:
      'Confirm the action. The phone will completely wipe all previous data and will reboot to the initial "Welcome" language selection screen.',
    p1s4Tip:
      'Rebooting takes approximately 2 to 4 minutes. Do not interrupt until the welcome screen appears.',
    p1s4VisualText: 'Rebooting to factory state...',

    // Phase 2 Steps
    p2s1Title: 'Step 1: Power On & Language Screen',
    p2s1Category: 'Boot Verification',
    p2s1Desc: 'Turn on the device and wait for the initial "Welcome" or language selection screen.',
    p2s1Tip: 'IMPORTANT: Stay on this greeting screen! Do NOT tap "Start" or configure Wi-Fi manually.',
    p2s1VisualText: 'Initial "Welcome" / "Hi there" Screen',

    p2s2Title: 'Step 2: The Secret 6 Taps',
    p2s2Category: 'Hidden Activation Gesture',
    p2s2Desc: 'Tap quickly 6 times on an empty area of the screen (avoiding any buttons or text).',
    p2s2Tip:
      'Tap rapidly on the blank space. The device will chime or show a prompt launching the enterprise QR wizard.',
    p2s2VisualText: '6 Rapid Taps on Blank Screen Area',
    p2s2PracticeLabel: 'Practice the 6-tap gesture here:',
    p2s2PracticeSuccess: '✓ QR Mode Triggered!',
    p2s2TapScreenBtn: 'Tap Screen (+1)',

    p2s3Title: 'Step 3: Scan the QR Code',
    p2s3Category: 'Camera Viewfinder & Wi-Fi',
    p2s3Desc:
      'The device will automatically recognize setup mode, prompt you to connect to Wi-Fi, and open its native QR code scanner. Scan the SENEAR QR code displayed below.',
    p2s3Tip: 'Point the phone camera steadily at the provisioning QR code displayed in the box below.',
    p2s3VisualText: 'Native Camera QR Scanner',
    p2s3QrBadge: 'SENEAR Provisioning QR Code',
    p2s3QrSubtitle: 'Point the phone camera at this QR code to initiate provisioning.',
    p2s3QrPathLabel: 'Image location: public/qr/senear-provisioning-qr.png',

    p2s4Title: 'Step 4: Automatic Setup & Kiosk Lock',
    p2s4Category: 'Enrollment Finalization',
    p2s4Desc:
      'The device will download the SENEAR app directly from our secure servers, install it, and grant the necessary Device Owner (kiosk) permissions instantly. No Google account login is required.',
    p2s4Tip:
      'SENEAR launches immediately into protected kiosk mode, fully secured and ready for everyday use.',
    p2s4VisualText: 'Kiosk Initialized & Verified',

    // Stepper buttons
    btnDoneNext: 'Done — Next Step',
    btnPrevious: 'Previous Step',
    btnComplete: 'Complete Setup',
    stepActiveBadge: 'In Progress',
    stepCompletedBadge: 'Completed',
    stepPendingBadge: 'Upcoming',

    // Completion Card
    completionTitle: 'Installation Completed Successfully!',
    completionSubtitle:
      'SENEAR is now active as the Device Owner. Accidental app deletion, settings confusion, and play-store prompts are completely locked down.',
    btnRestartWizard: 'Restart Wizard',
    btnOpenSimulator: 'Test Web Simulator',
    btnContactSupport: 'Contact Technical Support',

    // QR Box
    qrBoxTitle: 'SENEAR Provisioning QR Code',
    qrBoxSubtitle: 'Scan this code with the target phone during Step 3',
    qrTabInteractive: 'Interactive QR Code',
    qrTabPayload: 'JSON Payload',
    btnCopyJson: 'Copy JSON Config',
    btnCopied: 'Copied!',
    btnPrintCard: 'Print Setup Card',
    qrHoldDistance: 'Ready for scanning (Hold phone 20–30 cm away)',

    // FAQs
    faqTitle: 'Frequently Asked Setup Questions',
    faq1Q: 'What if tapping 6 times does not open the QR scanner?',
    faq1A:
      'Ensure the phone is on the clean "Welcome" screen right after a factory reset, before pressing "Start". Tap rapidly in the upper empty white area of the screen.',
    faq2Q: 'Is a SIM card needed during this setup?',
    faq2A:
      'No SIM card is needed! The phone only requires a standard Wi-Fi connection to download the SENEAR package.',
    faq3Q: 'Why is no Google account required?',
    faq3A:
      'Android Enterprise Device Owner mode installs the app at firmware root level, bypassing Google Play accounts and preventing unwanted popups for seniors.',
  },

  de: {
    backToHome: 'Zurück zur Übersicht',
    breadcrumb: 'SENEAR Installations-Assistent',
    pageTitle: 'SENEAR Installationsanleitung',
    pageSubtitle:
      'Schritt-für-Schritt-Assistent für die Android Enterprise QR-Bereitstellung. Einfach, fehlbedienungssicher und ohne Google-Konto.',
    deviceOwnerPill: 'Device Owner Kiosk-Modus',
    noGoogleAccountPill: 'Einrichtung ohne Google-Konto',
    langSelectorLabel: 'Sprache:',

    // Conditional phone question
    phoneQuestionTitle: 'Installieren Sie SENEAR auf einem NEUEN oder einem GEBRAUCHTEN Telefon?',
    phoneQuestionSubtitle:
      'Android Enterprise Device Owner-Rechte erfordern ein vollständig unkonfiguriertes System. Wählen Sie Ihr Szenario:',
    usedPhoneTitle: 'GEBRAUCHTES / Vorhandenes Telefon',
    usedPhoneSubtitle:
      'Enthält bestehende Konten oder Apps. Wir beginnen mit einem schnellen 2-minütigen Zurücksetzen auf Werkseinstellungen.',
    usedPhoneBadge: 'Startet mit Phase 1: Werkseinstellungen',
    newPhoneTitle: 'FABRIKNEUES Telefon',
    newPhoneSubtitle:
      'Frisch ausgepackt. Es wurde noch nie ein Google-Konto hinzugefügt. Springt direkt zur 6-Tipp-QR-Einrichtung.',
    newPhoneBadge: 'Springt direkt zu Phase 2: Kiosk-Setup',
    btnStart: 'Einrichtung starten',
    changeDeviceType: 'Gerätezustand ändern',
    deviceTypeBadgeUsed: 'Konfiguration: GEBRAUCHTES Telefon (Phase 1 + 2)',
    deviceTypeBadgeNew: 'Konfiguration: FABRIKNEUES Telefon (nur Phase 2)',

    // Phase Headers
    phase1Heading: 'Phase 1: Werkseinstellungen',
    phase1Subheading: 'Alle vorherigen Daten löschen, um Kioskrechte auf Firmware-Ebene freizuschalten.',
    phase2Heading: 'Phase 2: Kiosk-Installation',
    phase2Subheading: 'Android Enterprise QR-Bereitstellung auf dem sauberen Willkommensbildschirm.',

    // Phase 1 Steps
    p1s1Title: 'Schritt 1: Einstellungen öffnen',
    p1s1Category: 'Gerätevorbereitung',
    p1s1Desc: 'Öffnen Sie auf dem Zielgerät die Standard-App „Einstellungen“ (Settings).',
    p1s1Tip: 'Suchen Sie nach dem Zahnrad-Symbol auf dem Startbildschirm oder in den Schnelleinstellungen.',
    p1s1VisualText: 'Android Einstellungen App',

    p1s2Title: 'Schritt 2: Zurücksetzen finden',
    p1s2Category: 'Systemmenü',
    p1s2Desc:
      'Navigieren Sie zu System > Optionen zum Zurücksetzen (bei Samsung-Geräten unter Allgemeine Verwaltung > Zurücksetzen).',
    p1s2Tip: 'Sie können auch die Suchleiste in den Einstellungen nutzen und „Zurücksetzen“ eingeben.',
    p1s2VisualText: 'System > Optionen zum Zurücksetzen',

    p1s3Title: 'Schritt 3: Alle Daten löschen',
    p1s3Category: 'Auswahl Zurücksetzen',
    p1s3Desc: 'Wählen Sie „Alle Daten löschen (Werkseinstellungen)“ aus der Liste.',
    p1s3Tip:
      'Das Telefon weist darauf hin, dass Google-Konten, Apps und Daten gelöscht werden. Dies ist erforderlich.',
    p1s3VisualText: 'Alle Daten löschen (Werkseinstellungen)',

    p1s4Title: 'Schritt 4: Bestätigen und Neustart',
    p1s4Category: 'Ausführung Zurücksetzen',
    p1s4Desc:
      'Bestätigen Sie die Aktion. Das Telefon löscht alle bisherigen Daten und startet anschließend mit dem anfänglichen „Willkommen“-Bildschirm neu.',
    p1s4Tip:
      'Der Neustart dauert ca. 2 bis 4 Minuten. Warten Sie, bis der Begrüßungsbildschirm erscheint.',
    p1s4VisualText: 'Neustart in den Werkszustand...',

    // Phase 2 Steps
    p2s1Title: 'Schritt 1: Einschalten & Willkommensbildschirm',
    p2s1Category: 'Startüberprüfung',
    p2s1Desc: 'Schalten Sie das Gerät ein und warten Sie auf den anfänglichen „Willkommen“-Bildschirm.',
    p2s1Tip: 'WICHTIG: Bleiben Sie auf diesem Bildschirm! Tippen Sie NICHT auf „Start“ und richten Sie kein WLAN manuell ein.',
    p2s1VisualText: 'Anfänglicher Begrüßungsbildschirm',

    p2s2Title: 'Schritt 2: Die geheimen 6 Fingertipps',
    p2s2Category: 'Versteckte Aktivierungsgeste',
    p2s2Desc: 'Tippen Sie zügig 6-mal auf einen leeren Bereich des Bildschirms (vermeiden Sie Schaltflächen und Textfelder).',
    p2s2Tip:
      'Tippen Sie schnell hintereinander auf den freien Bereich. Das Gerät signalisiert den Modus und öffnet den QR-Assistenten.',
    p2s2VisualText: '6 schnelle Fingertipps auf freie Fläche',
    p2s2PracticeLabel: 'Geste hier üben:',
    p2s2PracticeSuccess: '✓ QR-Modus ausgelöst!',
    p2s2TapScreenBtn: 'Bildschirm antippen (+1)',

    p2s3Title: 'Schritt 3: QR-Code scannen',
    p2s3Category: 'Kamera-Sucher & WLAN',
    p2s3Desc:
      'Das Gerät erkennt den Einrichtungsmodus, fordert zur WLAN-Verbindung auf und öffnet den integrierten QR-Scanner. Scannen Sie den unten angezeigten SENEAR QR-Code.',
    p2s3Tip: 'Halten Sie die Kamera ruhig auf den Bereitstellungs-QR-Code im Kasten unten.',
    p2s3VisualText: 'Integrierter Setup-QR-Scanner',
    p2s3QrBadge: 'SENEAR Provisioning QR-Code',
    p2s3QrSubtitle: 'Richten Sie die Telefonkamera auf diesen QR-Code, um das Setup zu starten.',
    p2s3QrPathLabel: 'Dateipfad: public/qr/senear-provisioning-qr.png',

    p2s4Title: 'Schritt 4: Automatische Einrichtung & Kiosksperre',
    p2s4Category: 'Abschluss Bereitstellung',
    p2s4Desc:
      'Das Gerät lädt die SENEAR-App direkt von unseren sicheren Servern herunter, installiert sie und erteilt sofort alle Device Owner (Kiosk)-Rechte. Es ist kein Google-Konto erforderlich.',
    p2s4Tip:
      'SENEAR startet sofort im geschützten Kioskmodus – manipulationssicher und sofort einsatzbereit.',
    p2s4VisualText: 'Kiosk initialisiert & verifiziert',

    // Stepper buttons
    btnDoneNext: 'Erledigt — Nächster Schritt',
    btnPrevious: 'Vorheriger Schritt',
    btnComplete: 'Einrichtung abschließen',
    stepActiveBadge: 'In Bearbeitung',
    stepCompletedBadge: 'Erledigt',
    stepPendingBadge: 'Ausstehend',

    // Completion Card
    completionTitle: 'Installation erfolgreich abgeschlossen!',
    completionSubtitle:
      'SENEAR ist jetzt als Device Owner aktiv. Versehentliches Löschen von Apps, Systemeinstellungen und Play Store-Käufe sind vollständig gesperrt.',
    btnRestartWizard: 'Assistent neu starten',
    btnOpenSimulator: 'Web-Simulator testen',
    btnContactSupport: 'Technischen Support kontaktieren',

    // QR Box
    qrBoxTitle: 'SENEAR Bereitstellungs-QR-Code',
    qrBoxSubtitle: 'Scannen Sie diesen Code in Schritt 3 mit dem Zieltelefon',
    qrTabInteractive: 'Interaktiver QR-Code',
    qrTabPayload: 'JSON-Konfiguration',
    btnCopyJson: 'JSON kopieren',
    btnCopied: 'Kopiert!',
    btnPrintCard: 'Anleitung drucken',
    qrHoldDistance: 'Bereit zum Scannen (Abstand ca. 20–30 cm)',

    // FAQs
    faqTitle: 'Häufig gestellte Fragen zur Einrichtung',
    faq1Q: 'Was, wenn 6-maliges Tippen den QR-Scanner nicht öffnet?',
    faq1A:
      'Stellen Sie sicher, dass das Telefon auf dem anfänglichen Willkommensbildschirm steht, bevor Sie auf „Start“ drücken. Tippen Sie schnell auf die obere freie weiße Fläche.',
    faq2Q: 'Wird während des Setups eine SIM-Karte benötigt?',
    faq2A:
      'Nein! Das Telefon benötigt lediglich eine normale WLAN-Verbindung, um das SENEAR-Paket herunterzuladen.',
    faq3Q: 'Warum ist kein Google-Konto erforderlich?',
    faq3A:
      'Der Android Enterprise Device Owner-Modus installiert die App direkt auf Systemebene, wodurch Google Play-Konten und verwirrende Passworteingaben für Senioren entfallen.',
  },

  hu: {
    backToHome: 'Vissza a főoldalra',
    breadcrumb: 'SENEAR Telepítési Varázsló',
    pageTitle: 'SENEAR Telepítési Útmutató',
    pageSubtitle:
      'Lépésről lépésre követhető varázsló Android Enterprise QR telepítéshez. Egyszerű, elállíthatatlan és Google-fiók mentes.',
    deviceOwnerPill: 'Device Owner Kioszk Mód',
    noGoogleAccountPill: 'Google-fiók mentes beállítás',
    langSelectorLabel: 'Nyelv:',

    // Conditional phone question
    phoneQuestionTitle: 'ÚJ vagy HASZNÁLT telefonra telepíted a SENEAR-t?',
    phoneQuestionSubtitle:
      'Az Android Enterprise Device Owner jogosultsághoz teljesen tiszta rendszer szükséges. Válaszd ki az aktuális kiindulási állapotot:',
    usedPhoneTitle: 'HASZNÁLT / Már beállított telefon',
    usedPhoneSubtitle:
      'Már vannak rajta fiókok vagy alkalmazások. Egy gyors 2 perces Gyári Visszaállítással kezdünk, hogy teljesen töröljük.',
    usedPhoneBadge: 'Az 1. Fázissal indul: Gyári Visszaállítás',
    newPhoneTitle: 'VADONATÚJ telefon',
    newPhoneSubtitle:
      'Most bontottad ki a dobozból, nincs még rajta Google-fiók. Azonnal a 2. fázisra (a 6 koppintásos QR beállításra) ugrik.',
    newPhoneBadge: 'Közvetlenül a 2. Fázisra ugrik: Kioszk Beállítás',
    btnStart: 'Kezdés',
    changeDeviceType: 'Készülék állapotának módosítása',
    deviceTypeBadgeUsed: 'Beállítás típusa: HASZNÁLT telefon (1. + 2. Fázis)',
    deviceTypeBadgeNew: 'Beállítás típusa: VADONATÚJ telefon (csak 2. Fázis)',

    // Phase Headers
    phase1Heading: '1. Fázis: Gyári Visszaállítás',
    phase1Subheading: 'Minden korábbi adat törlése a kioszk jogosultságok feloldásához.',
    phase2Heading: '2. Fázis: Kioszk Telepítés',
    phase2Subheading: 'Android Enterprise QR regisztráció a nyitó „Üdvözöljük” képernyőn.',

    // Phase 1 Steps
    p1s1Title: '1. Lépés: Beállítások megnyitása',
    p1s1Category: 'Készülék Előkészítés',
    p1s1Desc: 'A céleszközön nyisd meg a standard Android Beállítások (Settings) alkalmazást.',
    p1s1Tip: 'Keresd a fogaskerék ikont a kezdőképernyőn vagy az alkalmazáslistában.',
    p1s1VisualText: 'Android Beállítások Alkalmazás',

    p1s2Title: '2. Lépés: Keresd meg a visszaállítást',
    p1s2Category: 'Rendszer Menü',
    p1s2Desc:
      'Navigálj a Rendszer > Visszaállítási opciók menübe (Samsung telefonokon: Általános kezelés > Visszaállítás).',
    p1s2Tip: 'Használhatod a Beállítások felső keresőmezőjét is: írd be, hogy „Visszaállítás”.',
    p1s2VisualText: 'Rendszer > Visszaállítási opciók',

    p1s3Title: '3. Lépés: Minden adat törlése',
    p1s3Category: 'Törlés Kiválasztása',
    p1s3Desc: 'Válaszd az „Összes adat törlése (gyári visszaállítás)” menüpontot.',
    p1s3Tip:
      'A telefon összegzi, hogy a fiókok, alkalmazások és adatok törlődni fognak. Erre szükség van.',
    p1s3VisualText: 'Összes adat törlése (gyári visszaállítás)',

    p1s4Title: '4. Lépés: Megerősítés és újraindítás',
    p1s4Category: 'Törlés Végrehajtása',
    p1s4Desc:
      'Erősítsd meg a műveletet. A telefon teljesen törli az adatokat, majd újraindul a kezdeti „Üdvözöljük” nyelvválasztó képernyőre.',
    p1s4Tip:
      'Az újraindulás 2–4 percet vesz igénybe. Ne szakítsd meg, várd meg a nyitóképernyőt.',
    p1s4VisualText: 'Újraindulás gyári állapotba...',

    // Phase 2 Steps
    p2s1Title: '1. Lépés: Bekapcsolás & Nyitóképernyő',
    p2s1Category: 'Kezdeti Ellenőrzés',
    p2s1Desc: 'Kapcsold be az eszközt, és várd meg a kezdeti „Üdvözöljük” nyelvválasztó képernyőt.',
    p2s1Tip: 'FONTOS: Maradj ezen a nyitóképernyőn! Ne kattints a „Kezdés” gombra és ne állíts be Wi-Fi-t előre.',
    p2s1VisualText: 'Kezdeti „Üdvözöljük” Képernyő',

    p2s2Title: '2. Lépés: A titkos 6 koppintás',
    p2s2Category: 'Rejtett Aktiváló Gesztus',
    p2s2Desc: 'Koppints gyorsan egymás után 6-szor a képernyő egy üres felületére (elkerülve a gombokat és mezőket).',
    p2s2Tip:
      'Koppints tempósan a fehér üres területre. A telefon hangjelzést ad, és elindítja a beépített QR-kódos varázslót.',
    p2s2VisualText: '6 Gyors Koppintás az Üres Képernyőre',
    p2s2PracticeLabel: 'Gyakorold a 6 koppintást itt:',
    p2s2PracticeSuccess: '✓ QR Telepítő Mód Aktiválva!',
    p2s2TapScreenBtn: 'Koppints a képernyőre (+1)',

    p2s3Title: '3. Lépés: Olvasd be a QR-kódot',
    p2s3Category: 'Kamera Kereső & Wi-Fi',
    p2s3Desc:
      'A készülék automatikusan felismeri a telepítési módot, kéri a Wi-Fi csatlakozást, majd megnyitja a gyári QR-kód olvasót. Olvasd be az alább található SENEAR QR-kódot.',
    p2s3Tip: 'Irányítsd a telefon kameráját stabilan az alábbi dobozban lévő provisioning QR-kódra.',
    p2s3VisualText: 'Gyári QR-kód Olvasó',
    p2s3QrBadge: 'SENEAR Provisioning QR-kód',
    p2s3QrSubtitle: 'Irányítsd a telefon kameráját erre a QR-kódra a beolvasáshoz.',
    p2s3QrPathLabel: 'Fájl helye: public/qr/senear-provisioning-qr.png',

    p2s4Title: '4. Lépés: Automatikus beállítás & Kioszk zárolás',
    p2s4Category: 'Telepítés Véglegesítése',
    p2s4Desc:
      'A készülék közvetlenül a biztonságos szervereinkről letölti a SENEAR alkalmazást, feltelepíti, és azonnal megadja a Device Owner (kioszk) jogokat. Google-fiókos belépés NEM szükséges.',
    p2s4Tip:
      'A SENEAR azonnal elindul védett kioszk módban, elállíthatatlanul és készen a használatra.',
    p2s4VisualText: 'Kioszk Inicializálva & Ellenőrizve',

    // Stepper buttons
    btnDoneNext: 'Kész — Következő Lépés',
    btnPrevious: 'Előző Lépés',
    btnComplete: 'Telepítés Befejezése',
    stepActiveBadge: 'Folyamatban',
    stepCompletedBadge: 'Kész',
    stepPendingBadge: 'Következő',

    // Completion Card
    completionTitle: 'A telepítés sikeresen befejeződött!',
    completionSubtitle:
      'A SENEAR sikeresen élesítve van Device Owner módban. A véletlen alkalmazástörlés, a rendszer elállítása és a Play Áruházas felugró ablakok teljesen le vannak zárva.',
    btnRestartWizard: 'Varázsló újrakezdése',
    btnOpenSimulator: 'Webes Szimulátor tesztelése',
    btnContactSupport: 'Technikai támogatás felkeresése',

    // QR Box
    qrBoxTitle: 'SENEAR Telepítő QR-kód',
    qrBoxSubtitle: 'Olvasd be ezt a kódot a 3. lépés során a céltelefonnal',
    qrTabInteractive: 'Interaktív QR-kód',
    qrTabPayload: 'JSON Konfiguráció',
    btnCopyJson: 'JSON másolása',
    btnCopied: 'Másolva!',
    btnPrintCard: 'Kártya nyomtatása',
    qrHoldDistance: 'Készen áll a beolvasásra (Tartsd 20–30 cm távolságra)',

    // FAQs
    faqTitle: 'Gyakori Kérdések a Telepítésről',
    faq1Q: 'Mi történik, ha a 6 koppintás nem nyitja meg a QR-kód olvasót?',
    faq1A:
      'Győződj meg róla, hogy a nyitó „Üdvözöljük” képernyőn vagy a gyári visszaállítás után, még mielőtt a „Kezdés” gombra nyomnál. Koppints tempósan a felső üres fehér részre.',
    faq2Q: 'Szükséges SIM-kártya a beállítás közben?',
    faq2A:
      'Nem! A telefonnak csupán Wi-Fi hálózatra van szüksége a SENEAR csomag automatikus letöltéséhez.',
    faq3Q: 'Miért nincs szükség Google-fiókra?',
    faq3A:
      'Az Android Enterprise Device Owner mód közvetlenül firmware szinten telepíti és zárolja az appot, így nincs szükség fiókra és elkerülhetők a jelszó kérések az idős használónál.',
  },
};

type PhoneType = 'used' | 'new';

interface StepDefinition {
  id: string;
  phase: 1 | 2;
  stepNumber: number;
  titleKey: keyof typeof I18N_WIZARD.en;
  categoryKey: keyof typeof I18N_WIZARD.en;
  descKey: keyof typeof I18N_WIZARD.en;
  tipKey: keyof typeof I18N_WIZARD.en;
  visualTextKey: keyof typeof I18N_WIZARD.en;
  type: 'settings' | 'navigation' | 'erase' | 'reboot' | 'welcome' | 'taps' | 'qr_scan' | 'automatic';
}

const ALL_STEPS: StepDefinition[] = [
  // Phase 1: Factory Reset
  {
    id: 'p1_s1',
    phase: 1,
    stepNumber: 1,
    titleKey: 'p1s1Title',
    categoryKey: 'p1s1Category',
    descKey: 'p1s1Desc',
    tipKey: 'p1s1Tip',
    visualTextKey: 'p1s1VisualText',
    type: 'settings',
  },
  {
    id: 'p1_s2',
    phase: 1,
    stepNumber: 2,
    titleKey: 'p1s2Title',
    categoryKey: 'p1s2Category',
    descKey: 'p1s2Desc',
    tipKey: 'p1s2Tip',
    visualTextKey: 'p1s2VisualText',
    type: 'navigation',
  },
  {
    id: 'p1_s3',
    phase: 1,
    stepNumber: 3,
    titleKey: 'p1s3Title',
    categoryKey: 'p1s3Category',
    descKey: 'p1s3Desc',
    tipKey: 'p1s3Tip',
    visualTextKey: 'p1s3VisualText',
    type: 'erase',
  },
  {
    id: 'p1_s4',
    phase: 1,
    stepNumber: 4,
    titleKey: 'p1s4Title',
    categoryKey: 'p1s4Category',
    descKey: 'p1s4Desc',
    tipKey: 'p1s4Tip',
    visualTextKey: 'p1s4VisualText',
    type: 'reboot',
  },
  // Phase 2: Kiosk Installation
  {
    id: 'p2_s1',
    phase: 2,
    stepNumber: 1,
    titleKey: 'p2s1Title',
    categoryKey: 'p2s1Category',
    descKey: 'p2s1Desc',
    tipKey: 'p2s1Tip',
    visualTextKey: 'p2s1VisualText',
    type: 'welcome',
  },
  {
    id: 'p2_s2',
    phase: 2,
    stepNumber: 2,
    titleKey: 'p2s2Title',
    categoryKey: 'p2s2Category',
    descKey: 'p2s2Desc',
    tipKey: 'p2s2Tip',
    visualTextKey: 'p2s2VisualText',
    type: 'taps',
  },
  {
    id: 'p2_s3',
    phase: 2,
    stepNumber: 3,
    titleKey: 'p2s3Title',
    categoryKey: 'p2s3Category',
    descKey: 'p2s3Desc',
    tipKey: 'p2s3Tip',
    visualTextKey: 'p2s3VisualText',
    type: 'qr_scan',
  },
  {
    id: 'p2_s4',
    phase: 2,
    stepNumber: 4,
    titleKey: 'p2s4Title',
    categoryKey: 'p2s4Category',
    descKey: 'p2s4Desc',
    tipKey: 'p2s4Tip',
    visualTextKey: 'p2s4VisualText',
    type: 'automatic',
  },
];

export function SenearInstallGuidePage({
  onBackToHome,
  onOpenSimulator,
  onContactClick,
}: SenearInstallGuidePageProps) {
  const { language, setLanguage } = useLanguage();
  const currentLang = (language in I18N_WIZARD ? language : 'en') as SupportedLanguage;
  const t = I18N_WIZARD[currentLang];

  // State: selected phone type ('used' | 'new')
  const [selectedPhoneType, setSelectedPhoneType] = useState<PhoneType>('used');

  // Compute active steps based on condition
  const activeSteps =
    selectedPhoneType === 'used'
      ? ALL_STEPS
      : ALL_STEPS.filter((step) => step.phase === 2);

  // State: active accordion step id (defaults to first step in activeSteps)
  const [activeStepId, setActiveStepId] = useState<string>('p1_s1');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isWizardComplete, setIsWizardComplete] = useState(false);

  // QR Code card state
  const [activeQrTab, setActiveQrTab] = useState<'qr' | 'json'>('qr');
  const [copiedJson, setCopiedJson] = useState(false);
  const [interactiveTapCount, setInteractiveTapCount] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scroll and focus helper
  const scrollToStep = (stepId: string, delay = 260) => {
    setTimeout(() => {
      const el = document.getElementById(`step-${stepId}`) || document.getElementById('stepper-wizard');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const focusable = el.querySelector<HTMLElement>('button, [tabindex="0"], a');
        if (focusable) {
          focusable.focus();
        }
      }
    }, delay);
  };

  // When switching phone type:
  const handleSelectPhoneType = (type: PhoneType) => {
    setSelectedPhoneType(type);
    setIsWizardComplete(false);
    setCompletedSteps(new Set());
    if (type === 'new') {
      setActiveStepId('p2_s1');
    } else {
      setActiveStepId('p1_s1');
    }
  };

  // Start button handler: sets phone type and jumps directly to first step
  const handleStartStep = (type: PhoneType) => {
    handleSelectPhoneType(type);
    const targetStepId = type === 'used' ? 'p1_s1' : 'p2_s1';
    scrollToStep(targetStepId);
  };

  const currentStepIndex = activeSteps.findIndex((s) => s.id === activeStepId);
  const currentStep = activeSteps[currentStepIndex] || activeSteps[0];

  // "Done / Next" handler with smooth slow closing animation sequence
  const handleStepDoneNext = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(activeStepId);
    setCompletedSteps(newCompleted);

    if (currentStepIndex < activeSteps.length - 1) {
      const nextStep = activeSteps[currentStepIndex + 1];
      setActiveStepId(nextStep.id);
      scrollToStep(nextStep.id, 280);
    } else {
      // Completed all steps - allow the final step's closing animation to complete smoothly
      setTimeout(() => {
        setIsWizardComplete(true);
        setTimeout(() => {
          const wizardEl = document.getElementById('stepper-wizard');
          if (wizardEl) {
            wizardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }, 700);
    }
  };

  // "Previous" handler
  const handleStepPrev = () => {
    if (currentStepIndex > 0) {
      const prevStep = activeSteps[currentStepIndex - 1];
      setActiveStepId(prevStep.id);
      scrollToStep(prevStep.id);
    }
  };

  // Android Enterprise Provisioning Payload
  const provisioningPayload = {
    'android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_NAME': 'hu.gabba.senear',
    'android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION':
      'https://download.gabba.hu/senear/latest/senear-dpc.apk',
    'android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM':
      '4d7a8e99b4f2c019d5e3816a12b48992f801a24d56f6',
    'android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED': false,
    'android.app.extra.PROVISIONING_SKIP_ENCRYPTION': true,
    'android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE': {
      kiosk_mode: true,
      fail_safe_ui: true,
      emergency_sos_enabled: true,
      remote_portal_sync: true,
      disable_app_uninstalls: true,
      disable_status_bar: true,
    },
  };
  const jsonString = JSON.stringify(provisioningPayload, null, 2);

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleTapSimulation = () => {
    setInteractiveTapCount((prev) => (prev >= 6 ? 1 : prev + 1));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] selection:bg-[#C5A880]/30 selection:text-[#1F2421]">
      {/* ------------------------------------------------------------------- */}
      {/* Top Header Bar: Breadcrumb + Dedicated Language Toggle              */}
      {/* ------------------------------------------------------------------- */}
      <div className="border-b border-[#C5A880]/20 bg-[#FFFFFF]/90 backdrop-blur-md sticky top-20 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb back */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 font-semibold text-[#8C7355] hover:text-[#2C2C2C] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t.backToHome}</span>
            </button>
            <span className="text-[#C5A880]/60">/</span>
            <span className="font-medium text-[#5C5A56] truncate max-w-[200px] sm:max-w-none">
              {t.breadcrumb}
            </span>
          </div>

          {/* Multilingual Selector Toggle (EN, DE, HU) */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#8C7355] hidden sm:flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{t.langSelectorLabel}</span>
            </span>

            <div className="flex items-center bg-[#F5F0EB] p-1 rounded-xl border border-[#C5A880]/35 shadow-2xs">
              {(
                [
                  { code: 'en', label: 'English', short: 'EN' },
                  { code: 'de', label: 'Deutsch', short: 'DE' },
                  { code: 'hu', label: 'Magyar', short: 'HU' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLanguage(opt.code)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    language === opt.code
                      ? 'bg-[#2C2C2C] text-[#FAFAFA] shadow-xs scale-102'
                      : 'text-[#6E6B65] hover:text-[#2C2C2C] hover:bg-white/60'
                  }`}
                  title={opt.label}
                >
                  {opt.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {/* ------------------------------------------------------------------- */}
        {/* Hero Section                                                        */}
        {/* ------------------------------------------------------------------- */}
        <section className="relative">
          <div className="bg-gradient-to-br from-[#FFFFFF] via-[#FAF7F2] to-[#F5EFE6] rounded-3xl border-2 border-[#C5A880] p-6 sm:p-10 lg:p-12 shadow-lg overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#FFFFFF] text-[#8C7355] border border-[#C5A880]/40 shadow-2xs flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.deviceOwnerPill}</span>
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#FFFFFF] text-[#5C5A56] border border-[#C5A880]/30 shadow-2xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{t.noGoogleAccountPill}</span>
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C2C2C] tracking-tight leading-[1.15]">
                  {t.pageTitle}
                </h1>

                <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed max-w-2xl">
                  {t.pageSubtitle}
                </p>
              </div>

              {/* Smartphone Mockup Image */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative group max-w-[240px] w-full">
                  <div className="relative bg-[#1A1A1A] rounded-[36px] p-2.5 shadow-2xl border-4 border-[#2C2C2C] ring-1 ring-[#C5A880]/50 overflow-hidden">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2">
                      <div className="w-10 h-1 bg-[#3A3A3A] rounded-full" />
                      <div className="w-2.5 h-2.5 bg-[#111111] rounded-full border border-[#333333]" />
                    </div>

                    <div className="relative rounded-[28px] overflow-hidden bg-[#FAFAFA] aspect-[9/19.5]">
                      <img
                        src="senear-device-mockup.png"
                        alt="SENEAR App Mockup"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/screenshots/senear/senear-1_hu.png';
                        }}
                      />
                      <div className="absolute bottom-2 left-2 right-2 bg-[#2C2C2C]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-white text-[11px] flex items-center justify-between border border-white/20">
                        <span className="font-bold">SENEAR Kiosk</span>
                        <span className="text-[9px] text-[#C5A880] font-mono">DPC Locked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------- */}
        {/* REQUIREMENT 2: Conditional Starting Point (New vs. Used Phone)      */}
        {/* ------------------------------------------------------------------- */}
        <section id="device-selection" className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C2C2C] tracking-tight">
              {t.phoneQuestionTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed">
              {t.phoneQuestionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Option 1: USED PHONE */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleStartStep('used')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStartStep('used');
                }
              }}
              className={`p-6 sm:p-8 rounded-3xl text-left transition-all duration-300 cursor-pointer border-2 relative overflow-hidden flex flex-col justify-between ${
                selectedPhoneType === 'used'
                  ? 'bg-gradient-to-br from-[#FFFFFF] via-[#FFFBF5] to-[#F9F3EA] border-[#8C7355] shadow-lg ring-2 ring-[#C5A880]/40 scale-[1.01]'
                  : 'bg-[#FFFFFF] border-[#E8DFD4] hover:border-[#C5A880]/60 hover:bg-[#FAF8F5] shadow-2xs'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      selectedPhoneType === 'used'
                        ? 'bg-[#8C7355] text-white shadow-xs'
                        : 'bg-[#F5F0EB] text-[#8C7355]'
                    }`}
                  >
                    <RotateCcw className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2C2C2C]">
                    {t.usedPhoneTitle}
                  </h3>
                  <p className="text-sm text-[#5C5A56] mt-2 leading-relaxed">
                    {t.usedPhoneSubtitle}
                  </p>
                </div>
              </div>

              <div>
                {selectedPhoneType === 'used' && (
                  <div className="mt-4 flex items-center justify-end text-xs font-bold">
                    <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  </div>
                )}

                {/* Kezdés Button Highlighted in Green like "Selected" text */}
                <div className="mt-4 pt-3 border-t border-[#C5A880]/15">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartStep('used');
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-700 border-2 border-emerald-400 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer group"
                  >
                    <span>{t.btnStart}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Option 2: NEW PHONE */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleStartStep('new')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStartStep('new');
                }
              }}
              className={`p-6 sm:p-8 rounded-3xl text-left transition-all duration-300 cursor-pointer border-2 relative overflow-hidden flex flex-col justify-between ${
                selectedPhoneType === 'new'
                  ? 'bg-gradient-to-br from-[#FFFFFF] via-[#F4F9F6] to-[#EBF5EF] border-emerald-600 shadow-lg ring-2 ring-emerald-500/30 scale-[1.01]'
                  : 'bg-[#FFFFFF] border-[#E8DFD4] hover:border-[#C5A880]/60 hover:bg-[#FAF8F5] shadow-2xs'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      selectedPhoneType === 'new'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-[#F5F0EB] text-emerald-700'
                    }`}
                  >
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2C2C2C]">
                    {t.newPhoneTitle}
                  </h3>
                  <p className="text-sm text-[#5C5A56] mt-2 leading-relaxed">
                    {t.newPhoneSubtitle}
                  </p>
                </div>
              </div>

              <div>
                {selectedPhoneType === 'new' && (
                  <div className="mt-4 flex items-center justify-end text-xs font-bold">
                    <span className="flex items-center gap-1 text-emerald-700 font-bold bg-white px-2.5 py-1 rounded-full border border-emerald-300">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  </div>
                )}

                {/* Kezdés Button Highlighted in Green like "Selected" text */}
                <div className="mt-4 pt-3 border-t border-emerald-200/50">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartStep('new');
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-700 border-2 border-emerald-400 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer group"
                  >
                    <span>{t.btnStart}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active selection summary bar */}
          <div className="max-w-4xl mx-auto bg-[#F5F0EB] p-3.5 rounded-2xl border border-[#C5A880]/30 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-[#2C2C2C] font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {selectedPhoneType === 'used'
                  ? t.deviceTypeBadgeUsed
                  : t.deviceTypeBadgeNew}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8C7355] text-xs">
                {activeSteps.length} Total Steps &bull;{' '}
                {completedSteps.size} of {activeSteps.length} Done
              </span>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------- */}
        {/* REQUIREMENT 3: Interactive Accordion / Stepper UI                   */}
        {/* ------------------------------------------------------------------- */}
        <section id="stepper-wizard" className="space-y-6 max-w-4xl mx-auto">
          {/* Completion Celebration Card (if all steps finished) */}
          {isWizardComplete ? (
            <div className="bg-gradient-to-br from-[#2C2C2C] to-[#1F2421] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#C5A880] text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10" strokeWidth={3} />
              </div>

              <div className="space-y-2 max-w-2xl mx-auto">
                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {t.completionTitle}
                </h3>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                  {t.completionSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    setCompletedSteps(new Set());
                    setIsWizardComplete(false);
                    setActiveStepId(selectedPhoneType === 'used' ? 'p1_s1' : 'p2_s1');
                  }}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.btnRestartWizard}</span>
                </button>

                {onOpenSimulator && (
                  <button
                    onClick={onOpenSimulator}
                    className="px-6 py-3 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-[#1F2421] font-bold text-sm transition-all cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t.btnOpenSimulator}</span>
                  </button>
                )}

                <button
                  onClick={onBackToHome}
                  className="px-6 py-3 rounded-xl bg-[#2C2C2C] hover:bg-black text-white font-semibold text-sm border border-stone-600 transition-all cursor-pointer"
                >
                  {t.backToHome}
                </button>
              </div>
            </div>
          ) : (
            /* The Interactive Accordion Steps List */
            <div className="space-y-4">
              {activeSteps.map((step, idx) => {
                const isActive = step.id === activeStepId;
                const isCompleted = completedSteps.has(step.id);

                return (
                  <div
                    key={step.id}
                    id={`step-${step.id}`}
                    className={`rounded-3xl transition-all duration-[850ms] border-2 overflow-hidden scroll-mt-28 ${
                      isActive
                        ? 'bg-[#FFFFFF] border-[#C5A880] shadow-md ring-2 ring-[#C5A880]/20'
                        : isCompleted
                        ? 'bg-[#FAF8F5] border-emerald-300/80 hover:border-emerald-400'
                        : 'bg-[#FFFFFF] border-[#E8DFD4] hover:border-[#C5A880]/50'
                    }`}
                  >
                    {/* Collapsed/Header Bar */}
                    <button
                      onClick={() => setActiveStepId(step.id)}
                      className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors duration-[850ms] ${
                        isActive ? 'bg-[#FAF7F2]/60' : 'hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Step Circle Indicator */}
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-heading font-black text-base shrink-0 transition-all duration-[850ms] ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : isActive
                              ? 'bg-[#2C2C2C] text-[#FAFAFA] shadow-xs'
                              : 'bg-[#F0EAE1] text-[#6E6B65]'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-5 h-5" strokeWidth={3} />
                          ) : (
                            step.stepNumber
                          )}
                        </div>

                        {/* Title and Phase Tag */}
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                                step.phase === 1
                                  ? 'bg-[#F5F0EB] text-[#8C7355]'
                                  : 'bg-emerald-50 text-emerald-700'
                              }`}
                            >
                              Phase {step.phase}:{' '}
                              {step.phase === 1 ? 'Wipe' : 'Kiosk'}
                            </span>
                            <span className="text-[11px] text-[#8C7355] hidden sm:inline">
                              &bull; {t[step.categoryKey]}
                            </span>
                          </div>

                          <h3
                            className={`font-heading text-lg sm:text-xl font-bold mt-1 ${
                              isActive
                                ? 'text-[#2C2C2C]'
                                : isCompleted
                                ? 'text-stone-800'
                                : 'text-stone-600'
                            }`}
                          >
                            {t[step.titleKey]}
                          </h3>
                        </div>
                      </div>

                      {/* Status pill & Expand chevron */}
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full hidden sm:inline-block ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isActive
                              ? 'bg-[#2C2C2C] text-white'
                              : 'bg-[#F0EAE1] text-[#6E6B65]'
                          }`}
                        >
                          {isCompleted
                            ? t.stepCompletedBadge
                            : isActive
                            ? t.stepActiveBadge
                            : t.stepPendingBadge}
                        </span>

                        <ChevronDown
                          className={`w-5 h-5 text-[#8C7355] shrink-0 transition-transform duration-[850ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            isActive ? 'rotate-180 text-[#2C2C2C]' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Expanded Detail Body with Stately, Slow Closing Animation */}
                    <div className={`step-accordion-collapse ${isActive ? 'is-expanded' : ''}`}>
                      <div className="min-h-0 overflow-hidden">
                        <div className="p-6 sm:p-8 pt-2 sm:pt-4 border-t border-[#F0EAE1] space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          {/* Left: Step Description, Tips, Practice */}
                          <div className="lg:col-span-7 space-y-4">
                            <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">
                              {t[step.descKey]}
                            </p>

                            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C5A880]/35 flex items-start gap-3 text-xs sm:text-sm text-[#5C5A56]">
                              <Info className="w-4 h-4 text-[#8C7355] shrink-0 mt-0.5" />
                              <span>{t[step.tipKey]}</span>
                            </div>

                            {/* Special Interactive Widget for Phase 2 Step 2 (6 taps) */}
                            {step.id === 'p2_s2' && (
                              <div className="p-4 bg-white rounded-2xl border border-[#C5A880]/30 space-y-2">
                                <div className="text-xs font-bold text-[#8C7355] flex items-center justify-between">
                                  <span>{t.p2s2PracticeLabel}</span>
                                  <span className="font-mono text-[#2C2C2C]">
                                    ({interactiveTapCount} / 6 taps)
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                  <button
                                    onClick={handleTapSimulation}
                                    className="px-4 py-2 rounded-xl bg-[#2C2C2C] hover:bg-black text-white text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                                  >
                                    <Hand className="w-4 h-4 text-[#C5A880]" />
                                    <span>{t.p2s2TapScreenBtn}</span>
                                  </button>

                                  <div className="flex gap-1.5">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                      <div
                                        key={i}
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                                          interactiveTapCount >= i
                                            ? 'bg-emerald-600 text-white scale-110 shadow-xs'
                                            : 'bg-[#EAEAEA] text-[#888888]'
                                        }`}
                                      >
                                        {i}
                                      </div>
                                    ))}
                                  </div>

                                  {interactiveTapCount >= 6 && (
                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 animate-bounce">
                                      {t.p2s2PracticeSuccess}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Embedded QR Code Image Card for Phase 2 Step 3 */}
                            {step.id === 'p2_s3' && (
                              <div className="pt-2">
                                <div className="bg-[#FFFFFF] rounded-3xl p-5 sm:p-6 border-2 border-[#C5A880] shadow-md inline-block max-w-sm text-center">
                                  <div className="relative group mx-auto w-52 h-52 sm:w-60 sm:h-60 bg-[#FAFAFA] rounded-2xl p-3 border border-[#E8DFD4] flex items-center justify-center overflow-hidden">
                                    <img
                                      src="/qr/senear-provisioning-qr.png"
                                      alt="SENEAR Android Enterprise Provisioning QR Code"
                                      className="w-full h-full object-contain rounded-xl"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/senear-qr.png';
                                      }}
                                    />
                                    {/* Scan line indicator effect */}
                                    <div className="absolute inset-x-3 top-2 h-1 bg-[#C5A880]/70 rounded-full animate-pulse pointer-events-none" />
                                  </div>

                                  <div className="mt-3.5 space-y-1.5 text-center">
                                    <div className="text-xs sm:text-sm font-bold text-[#2C2C2C] flex items-center justify-center gap-1.5">
                                      <QrCode className="w-4 h-4 text-[#8C7355]" />
                                      <span>{t.p2s3QrBadge}</span>
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-[#5C5A56] leading-relaxed">
                                      {t.p2s3QrSubtitle}
                                    </p>
                                    <div className="pt-1">
                                      <span className="inline-block px-2.5 py-1 rounded-lg bg-[#F5F0EB] text-[#8C7355] text-[10px] font-mono border border-[#C5A880]/30 select-all">
                                        📁 {t.p2s3QrPathLabel}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right: Step Visual Mockup Box */}
                          <div className="lg:col-span-5 flex justify-center">
                            {/* Visual card for Settings */}
                            {step.type === 'settings' && (
                              <div className="w-full max-w-[280px] bg-[#FAF8F5] rounded-2xl p-6 border border-[#C5A880]/40 shadow-sm text-center space-y-3">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2C2C2C] text-[#C5A880] flex items-center justify-center shadow-md">
                                  <Settings
                                    className="w-8 h-8 animate-spin"
                                    style={{ animationDuration: '25s' }}
                                  />
                                </div>
                                <div className="font-heading font-bold text-sm text-[#2C2C2C]">
                                  {t.p1s1VisualText}
                                </div>
                                <div className="text-[11px] text-[#5C5A56] bg-white p-2 rounded-lg border border-[#C5A880]/20">
                                  Tap the Settings gear on home screen
                                </div>
                              </div>
                            )}

                            {/* Visual card for Navigation */}
                            {step.type === 'navigation' && (
                              <div className="w-full max-w-[280px] bg-white rounded-2xl p-5 border border-[#C5A880]/40 shadow-sm space-y-2.5">
                                <div className="flex items-center gap-2 text-xs font-bold text-[#8C7355] uppercase pb-1 border-b border-[#F5F0EB]">
                                  <Sliders className="w-3.5 h-3.5 text-[#C5A880]" />
                                  <span>{t.p1s2VisualText}</span>
                                </div>
                                <div className="space-y-1.5 text-xs">
                                  <div className="bg-[#F5F0EB] p-2 rounded-lg font-medium text-[#2C2C2C] flex items-center justify-between">
                                    <span>1. System</span>
                                    <span className="text-[10px] text-[#8C7355]">&rarr;</span>
                                  </div>
                                  <div className="bg-[#FAF7F2] p-2 rounded-lg font-medium text-[#2C2C2C] flex items-center justify-between">
                                    <span>2. Reset options</span>
                                    <span className="text-[10px] text-[#8C7355]">&rarr;</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Visual card for Erase */}
                            {step.type === 'erase' && (
                              <div className="w-full max-w-[280px] bg-red-50/70 rounded-2xl p-5 border border-red-200 text-center space-y-3">
                                <div className="w-12 h-12 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                                  <Trash2 className="w-6 h-6" />
                                </div>
                                <div className="font-heading font-bold text-sm text-red-900">
                                  {t.p1s3VisualText}
                                </div>
                                <div className="text-[11px] text-red-800 bg-white/80 p-2 rounded-lg border border-red-200">
                                  Erase all data & accounts
                                </div>
                              </div>
                            )}

                            {/* Visual card for Reboot */}
                            {step.type === 'reboot' && (
                              <div className="w-full max-w-[280px] bg-gradient-to-br from-[#2C2C2C] to-[#1F2421] text-white rounded-2xl p-5 text-center space-y-3">
                                <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                                  <RefreshCw
                                    className="w-6 h-6 animate-spin"
                                    style={{ animationDuration: '6s' }}
                                  />
                                </div>
                                <div className="font-heading font-bold text-sm text-white">
                                  {t.p1s4VisualText}
                                </div>
                                <div className="text-[11px] text-stone-300">
                                  Wiping phone & preparing Welcome screen
                                </div>
                              </div>
                            )}

                            {/* Visual card for Welcome */}
                            {step.type === 'welcome' && (
                              <div className="w-full max-w-[280px] bg-gradient-to-b from-[#2C2C2C] to-[#1F2421] rounded-2xl p-5 text-white text-center space-y-3">
                                <div className="w-8 h-8 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                  EN
                                </div>
                                <div className="font-heading font-bold text-base text-white">
                                  Welcome / Hi there
                                </div>
                                <div className="text-[11px] text-amber-300 bg-amber-900/40 p-2 rounded border border-amber-500/30">
                                  ⚠ Stay on this screen! Do NOT press Start
                                </div>
                              </div>
                            )}

                            {/* Visual card for Taps */}
                            {step.type === 'taps' && (
                              <div className="w-full max-w-[280px] bg-[#FAF8F5] rounded-2xl p-5 border-2 border-dashed border-[#C5A880] text-center space-y-3">
                                <div className="w-16 h-16 mx-auto rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#8C7355]">
                                  <Hand className="w-8 h-8" />
                                </div>
                                <div className="font-heading font-bold text-sm text-[#2C2C2C]">
                                  {t.p2s2VisualText}
                                </div>
                                <div className="text-[11px] text-[#5C5A56]">
                                  Triggers hidden Android Enterprise camera
                                </div>
                              </div>
                            )}

                            {/* Visual card for QR Scan */}
                            {step.type === 'qr_scan' && (
                              <div className="w-full max-w-[280px] bg-[#1F2421] rounded-2xl p-4 text-white space-y-3 text-center">
                                <div className="flex justify-between text-[11px] text-stone-300">
                                  <span className="flex items-center gap-1 text-emerald-400">
                                    <Wifi className="w-3.5 h-3.5" /> Wi-Fi Ready
                                  </span>
                                  <span>Scanner</span>
                                </div>
                                <div className="aspect-square bg-black/60 rounded-xl border border-white/20 flex items-center justify-center relative">
                                  <div className="absolute inset-x-2 h-0.5 bg-[#C5A880] animate-pulse" />
                                  <QrCode className="w-16 h-16 text-white/40" />
                                </div>
                                <div className="text-[11px] text-stone-300">
                                  {t.p2s3VisualText}
                                </div>
                              </div>
                            )}

                            {/* Visual card for Automatic Setup */}
                            {step.type === 'automatic' && (
                              <div className="w-full max-w-[280px] bg-[#FAF8F5] rounded-2xl p-5 border border-[#C5A880]/40 space-y-3">
                                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>{t.p2s4VisualText}</span>
                                </div>
                                <div className="space-y-1 text-xs">
                                  <div className="flex justify-between font-semibold text-[#5C5A56]">
                                    <span>APK Download</span>
                                    <span>100%</span>
                                  </div>
                                  <div className="h-2 w-full bg-[#EAEAEA] rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full w-full" />
                                  </div>
                                </div>
                                <div className="text-[11px] text-[#5C5A56] bg-white p-2 rounded-lg border border-[#C5A880]/20">
                                  Device Owner Granted &bull; Google Login Bypassed
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Accordion Action Buttons Bar: Done/Next & Previous */}
                        <div className="pt-4 border-t border-[#F0EAE1] flex flex-wrap items-center justify-between gap-4">
                          <div>
                            {idx > 0 && (
                              <button
                                onClick={handleStepPrev}
                                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#5C5A56] hover:text-[#2C2C2C] hover:bg-[#F5F0EB] transition-colors cursor-pointer"
                              >
                                &larr; {t.btnPrevious}
                              </button>
                            )}
                          </div>

                          <button
                            onClick={handleStepDoneNext}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2C2C2C] text-[#FAFAFA] text-xs sm:text-sm font-bold hover:bg-black active:scale-98 transition-all cursor-pointer shadow-sm hover:shadow-md"
                          >
                            <span>
                              {idx === activeSteps.length - 1
                                ? t.btnComplete
                                : t.btnDoneNext}
                            </span>
                            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ------------------------------------------------------------------- */}
        {/* Centered QR Code Card Component (Embedded in guide)                 */}
        {/* ------------------------------------------------------------------- */}
        <section id="qr-code-embed" className="max-w-4xl mx-auto scroll-mt-28">
          <div className="bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#F5EFE6] rounded-3xl border-2 border-[#C5A880] p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden text-center space-y-6">
            <div className="space-y-2 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2C2C2C] text-[#FAFAFA] shadow-xs">
                <QrCode className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Android Enterprise Token</span>
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C2C2C] tracking-tight">
                {t.qrBoxTitle}
              </h3>
              <p className="text-sm text-[#5C5A56] leading-relaxed">
                {t.qrBoxSubtitle}
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="inline-flex p-1 bg-[#EFE9DF] rounded-xl border border-[#C5A880]/30 shadow-2xs">
              <button
                onClick={() => setActiveQrTab('qr')}
                className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                  activeQrTab === 'qr'
                    ? 'bg-[#2C2C2C] text-white shadow-xs'
                    : 'text-[#5C5A56] hover:text-[#2C2C2C]'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{t.qrTabInteractive}</span>
              </button>
              <button
                onClick={() => setActiveQrTab('json')}
                className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                  activeQrTab === 'json'
                    ? 'bg-[#2C2C2C] text-white shadow-xs'
                    : 'text-[#5C5A56] hover:text-[#2C2C2C]'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>{t.qrTabPayload}</span>
              </button>
            </div>

            {activeQrTab === 'qr' ? (
              <div className="space-y-5">
                {/* Scalable High-Contrast SVG QR Code */}
                <div className="inline-block p-6 sm:p-7 bg-[#FFFFFF] rounded-3xl border-2 border-[#C5A880] shadow-md relative group">
                  <div className="relative w-60 h-60 sm:w-68 sm:h-68 mx-auto flex items-center justify-center bg-white p-2">
                    <svg
                      viewBox="0 0 256 256"
                      className="w-full h-full text-[#1F2421]"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="256" height="256" fill="#FFFFFF" />

                      {/* Corner Finder Patterns */}
                      <rect x="16" y="16" width="56" height="56" fill="#2C2C2C" rx="8" />
                      <rect x="24" y="24" width="40" height="40" fill="#FFFFFF" rx="4" />
                      <rect x="32" y="32" width="24" height="24" fill="#2C2C2C" rx="2" />

                      <rect x="184" y="16" width="56" height="56" fill="#2C2C2C" rx="8" />
                      <rect x="192" y="24" width="40" height="40" fill="#FFFFFF" rx="4" />
                      <rect x="200" y="32" width="24" height="24" fill="#2C2C2C" rx="2" />

                      <rect x="16" y="184" width="56" height="56" fill="#2C2C2C" rx="8" />
                      <rect x="24" y="192" width="40" height="40" fill="#FFFFFF" rx="4" />
                      <rect x="32" y="200" width="24" height="24" fill="#2C2C2C" rx="2" />

                      {/* Timing & Data Grid */}
                      <g fill="#2C2C2C">
                        <rect x="80" y="24" width="8" height="8" rx="1" />
                        <rect x="96" y="24" width="8" height="8" rx="1" />
                        <rect x="112" y="24" width="8" height="8" rx="1" />
                        <rect x="128" y="24" width="8" height="8" rx="1" />
                        <rect x="144" y="24" width="8" height="8" rx="1" />
                        <rect x="160" y="24" width="8" height="8" rx="1" />

                        <rect x="84" y="44" width="16" height="8" rx="1" />
                        <rect x="108" y="44" width="24" height="8" rx="1" />
                        <rect x="140" y="44" width="8" height="16" rx="1" />
                        <rect x="156" y="44" width="16" height="8" rx="1" />

                        <rect x="84" y="60" width="8" height="16" rx="1" />
                        <rect x="100" y="60" width="16" height="8" rx="1" />
                        <rect x="124" y="60" width="8" height="8" rx="1" />

                        <rect x="44" y="84" width="16" height="8" rx="1" />
                        <rect x="68" y="84" width="8" height="16" rx="1" />
                        <rect x="84" y="84" width="24" height="8" rx="1" />
                        <rect x="116" y="84" width="8" height="8" rx="1" />
                        <rect x="132" y="84" width="16" height="16" rx="1" />
                        <rect x="156" y="84" width="8" height="8" rx="1" />
                        <rect x="172" y="84" width="24" height="8" rx="1" />
                        <rect x="204" y="84" width="8" height="16" rx="1" />

                        <rect x="44" y="100" width="8" height="16" rx="1" />
                        <rect x="60" y="100" width="16" height="8" rx="1" />
                        <rect x="84" y="100" width="8" height="24" rx="1" />
                        <rect x="172" y="100" width="8" height="16" rx="1" />
                        <rect x="188" y="100" width="16" height="8" rx="1" />

                        <rect x="44" y="124" width="24" height="8" rx="1" />
                        <rect x="180" y="124" width="16" height="8" rx="1" />
                        <rect x="204" y="124" width="24" height="8" rx="1" />

                        <rect x="44" y="140" width="8" height="8" rx="1" />
                        <rect x="60" y="140" width="16" height="16" rx="1" />
                        <rect x="172" y="140" width="24" height="8" rx="1" />
                        <rect x="204" y="140" width="8" height="16" rx="1" />

                        <rect x="84" y="180" width="8" height="16" rx="1" />
                        <rect x="100" y="180" width="16" height="8" rx="1" />
                        <rect x="124" y="180" width="24" height="8" rx="1" />
                        <rect x="156" y="180" width="8" height="8" rx="1" />
                        <rect x="172" y="180" width="24" height="16" rx="1" />

                        <rect x="84" y="204" width="24" height="8" rx="1" />
                        <rect x="116" y="204" width="8" height="16" rx="1" />
                        <rect x="132" y="204" width="16" height="8" rx="1" />
                        <rect x="156" y="204" width="8" height="8" rx="1" />
                        <rect x="204" y="204" width="16" height="8" rx="1" />
                      </g>

                      {/* Center Emblem Shield */}
                      <rect
                        x="98"
                        y="98"
                        width="60"
                        height="60"
                        rx="12"
                        fill="#FFFFFF"
                        stroke="#C5A880"
                        strokeWidth="4"
                      />
                      <rect x="106" y="106" width="44" height="44" rx="8" fill="#2C2C2C" />
                      <text
                        x="128"
                        y="132"
                        fill="#C5A880"
                        fontSize="13"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        NEAR
                      </text>
                    </svg>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#C5A880]/30 text-xs text-[#5C5A56] font-medium flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{t.qrHoldDistance}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2C2C2C] text-[#FAFAFA] text-xs font-semibold hover:bg-black transition-all cursor-pointer shadow-2xs"
                  >
                    {copiedJson ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t.btnCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{t.btnCopyJson}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFFFF] text-[#2C2C2C] text-xs font-semibold hover:bg-[#F5F0EB] border border-[#C5A880]/40 transition-all cursor-pointer shadow-2xs"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#8C7355]" />
                    <span>{t.btnPrintCard}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* JSON View */
              <div className="space-y-3 text-left max-w-2xl mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#8C7355] uppercase tracking-wider">
                    Provisioning Payload JSON
                  </span>
                  <button
                    onClick={handleCopyJson}
                    className="text-xs font-bold text-[#2C2C2C] hover:text-[#8C7355] cursor-pointer flex items-center gap-1"
                  >
                    {copiedJson ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedJson ? t.btnCopied : t.btnCopyJson}</span>
                  </button>
                </div>
                <div className="bg-[#1A1A1A] text-stone-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner border border-stone-800">
                  <pre>{jsonString}</pre>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------- */}
        {/* FAQs Section                                                        */}
        {/* ------------------------------------------------------------------- */}
        <section className="max-w-4xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2C2C2C]">
              {t.faqTitle}
            </h3>
          </div>

          <div className="space-y-2.5">
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#C5A880]/30 shadow-2xs overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-sm text-[#2C2C2C] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#8C7355] shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C7355] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#5C5A56] leading-relaxed border-t border-[#F5F0EB]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
