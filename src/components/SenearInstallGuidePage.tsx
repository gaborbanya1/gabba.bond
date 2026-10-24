import { useState } from 'react';
import {
  Smartphone,
  ShieldCheck,
  Download,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Info,
  CheckCircle2,
  Settings,
  ArrowRight,
  Users,
  HeartHandshake,
  Bell,
  Volume2,
  PhoneCall,
  MapPin,
  Lock,
  KeyRound,
  UserCheck,
  AlertTriangle,
  ChevronRight,
  Wifi,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SenearInstallGuidePageProps {
  onBackToHome: () => void;
  onBackToProduct: () => void;
  onContactClick?: () => void;
}

// -----------------------------------------------------------------------------
// Complete Multilingual Dictionary (EN, DE, HU) — Unified Step-by-Step Guide
// -----------------------------------------------------------------------------
const I18N_WIZARD = {
  en: {
    backToHome: 'Back to Overview',
    breadcrumb: 'Step-by-Step Setup Guide',
    pageTitle: 'SENEAR Setup Guide',
    pageSubtitle:
      'Step-by-step configuration guide for both the Senior’s phone and the Caregiver’s phone. Standard installation — no factory reset or QR provisioning required.',
    pageNote:
      'Good news: the senior’s phone no longer necessarily needs a SIM card for voice and video calls! A Wi-Fi internet connection is enough — the senior can still receive calls and call their 4 selected main contacts.',
    standardInstallPill: 'Standard App Installation',
    dualPhonePill: 'Senior + Caregiver Phone Guide',
    langSelectorLabel: 'Language:',

    // Role / Phone selector section
    phoneQuestionTitle: 'Which phone would you like to configure right now?',
    phoneQuestionSubtitle:
      'SENEAR works as a connected pair — or standalone for the senior. Choose whether to set up the Senior’s phone, the Caregiver’s phone, or walk through both step by step:',

    seniorPhoneTitle: '1. Senior’s Phone (Care Receiver)',
    seniorPhoneSubtitle:
      'Sets up the elderly person’s phone: profile details, system & battery permissions, 4 photo speed-dial contacts, daily routine & medication alarms, SOS button, 6-digit pairing code, Kiosk lock, and how to exit back to normal phone mode.',
    seniorPhoneBadge: '8 Steps • Protected Kiosk Setup',

    caregiverPhoneTitle: '2. Caregiver’s Phone (Family / Relative)',
    caregiverPhoneSubtitle:
      'Sets up the family member’s phone: Caregiver registration, 6-digit pairing, remote photo contact & daily routine management, Home Safe Zone, hands-free auto-answer, Wi-Fi calling without SIM, and alert history.',
    caregiverPhoneBadge: '6 Steps • Remote Dashboard Setup',

    bothPhonesTitle: 'Complete Setup (Both Phones)',
    bothPhonesSubtitle:
      'Walks through all 14 steps in sequence: first preparing the Senior’s phone, then pairing and configuring the Caregiver’s phone.',

    btnStartSenior: 'Set Up Senior’s Phone',
    btnStartCaregiver: 'Set Up Caregiver’s Phone',
    btnStartBoth: 'Show All 14 Steps (Both Phones)',

    deviceTypeBadgeSenior: 'Configuring: SENIOR’S Phone (Steps 1–8)',
    deviceTypeBadgeCaregiver: 'Configuring: CAREGIVER’S Phone (Steps 1–6)',
    deviceTypeBadgeBoth: 'Configuring: BOTH Phones (Full 14-Step Walkthrough)',

    // Phase Tags
    phase1Tag: 'Senior’s Phone',
    phase2Tag: 'Caregiver’s Phone',

    // -------------------------------------------------------------------------
    // SENIOR PHONE STEPS (Phase 1: Steps 1 - 8)
    // -------------------------------------------------------------------------
    s1Title: 'Step 1: Install & Open the SENEAR App',
    s1Category: 'Standard Installation',
    s1Desc:
      'Install the SENEAR application on the senior’s (care receiver’s) phone from the Google Play Store, then open the application.',
    s1Tip:
      'When launching for the first time, accept the pop-up system permissions (phone calls, SMS, location, and notifications).',
    s1VisualText: 'Google Play Store Install',
    s1VisualSub: 'Grant Call, SMS, GPS & Notification permissions on first launch',

    s2Title: 'Step 2: Choose I am the Senior & Basic Information (1/2)',
    s2Category: 'Role Selection',
    s2Desc:
      'On the welcome screen, tap **I am the Senior**. On **Step 1: Basic Information**, enter the senior’s name, phone number, and birth year, then tap **Next**.',
    s2Tip:
      'The senior’s name will appear on the Caregiver’s dashboard and inside every SOS, battery, or wandering alert notification.',
    s2VisualText: '“I am the Senior” → Basic Information',
    s2VisualSub: 'Enter Name, Phone Number & Birth Year',

    s3Title: 'Step 3: System Permissions & Kiosk Guard (2/2)',
    s3Category: 'System Permissions',
    s3Desc:
      'On the screen, tap the red permission cards one by one:\n1. **System Permission: Screen Pinning & Pop-up Messages** — in the app list that opens, find **SENEAR** and enable it. Then return to the settings and the tile will turn green.\n2. **Default Senior Ringtone** — in the list that opens, find **SENEAR** and enable it. Then return to the settings and the tile will turn green.\n3. **Default Home Screen (Recommended)** — in the list that opens, find and select **SENEAR**. Then return to the settings and the tile will turn green.\n4. **Kiosk Guard (Accessibility)** — on the Accessibility page that opens, tap **Installed apps**, find **SENEAR**, and switch both toggles ON. Then return to the settings and the tile will turn green.',
    s3Tip:
      'IMPORTANT: Every successfully granted permission shows a green **Granted** badge. The **Next** button only becomes active after the required permissions have been granted.',
    s3VisualText: 'Screen + Ringtone + Home + Kiosk Guard',
    s3VisualSub: 'Find & enable SENEAR in each system list',

    s4Title: 'Step 4: General Settings, Legal Info, Quick Messages & Sound/Display',
    s4Category: 'Caregiver Settings (Top Menu Items)',
    s4Desc:
      'In the **Caregiver Settings** menu that opens, go through the top buttons from top to bottom:\n1. **General Settings** — here you can change the admin (caregiver) password (default: 1234), and view the senior’s **6-Digit Pairing Code** after accepting the GDPR notice (you will enter this code on the Caregiver’s phone to connect the devices). On this screen, you can also permanently delete all cloud and local data (**Permanently delete cloud profile and data (GDPR)**) if the app is no longer used.\n2. **Safety & Legal Info / User Manual** — review the Non-Medical / Emergency Disclaimer and setup guide at any time.\n3. **Quick Messages Settings** — pre-written SMS messages that the senior can quickly send to any of the 4 main contacts.\n4. **Sound & Display Settings** — enable the **senior-friendly ringtone**, turn on **automatic speakerphone** for calls, and adjust the **brightness and volume** of both the Kiosk and the Admin menu.',
    s4Tip:
      'Write down or take a photo of the 6-digit Pairing Code (e.g. K4M9A2) in General Settings — you will use it to link the Caregiver’s phone.',
    s4VisualText: '6-Digit Pairing Code: K4M9A2',
    s4VisualSub: 'General Settings + Legal Info + Quick SMS + Sound & Display',

    s5Title: 'Step 5: Background Protection & Battery (By Phone Brand)',
    s5Category: 'Background Protection & Battery',
    s5Desc:
      'Next in the Caregiver Settings list is **Background Protection & Battery**. If you need to adjust anything here, this menu item will be displayed with a **red exclamation mark (!)**. In that case, select the phone’s brand below and apply the corresponding instructions so the phone’s battery saver never stops the background **SOS**, **Home Safe Zone (Geofencing)**, **Daily Routine Alarms**, and **Online Heartbeat** services:',
    s5Tip:
      'IMPORTANT: Without unrestricted battery access, Android may put the app to sleep when the screen is off, delaying alerts or alarms.',
    s5VisualText: 'Battery: Unrestricted + Autostart',
    s5VisualSub: 'Prevents phone power savers from stopping SOS, GPS & alarms',

    s6Title: 'Step 6: Call Permissions, Contacts & Photos, Daily Routines & SOS',
    s6Category: 'Caregiver Settings (Bottom Menu Items)',
    s6Desc:
      'Continue down the remaining buttons in the **Caregiver Settings** menu:\n1. **Call Permissions (Whitelist)** — configure which additional people (besides the 4 main contacts) are allowed to call the senior. Unknown callers are automatically rejected.\n2. **Contact Settings** — enter the name, relationship (e.g. Daughter), and phone number for the **4 large photo call tiles**, and choose a photo from the gallery (automatically center-cropped and compressed). You can also adjust the font size, and when paired, edit these 4 contacts remotely from the Caregiver’s phone.\n3. **Daily Routines & Reminders** — create reminders in 4 categories (**⏰ Wake-up Alarm**, **💊 Medication**, **💧 Hydration**, **📅 Custom Task**) with multi-line instructions and an optional pill-box photo. When the alarm rings on the Kiosk screen, the senior taps **VIEW DETAILS** (which silences the sound and shows what to take and how much), then taps the giant green **DONE / TAKEN** button.\n4. **SOS Configuration** — set the emergency number to call (e.g. Ambulance or a family member) and select which people additionally receive an SMS with the GPS location.',
    s6Tip:
      'The 4 main contacts are always allowed automatically in call filtering, so only additional trusted numbers (e.g. neighbor, doctor) need to be added under Call Permissions (Whitelist).',
    s6VisualText: 'Whitelist + 4 Photo Contacts + Routines + SOS',
    s6VisualSub: 'Anti-scam call filter, auto-cropped photos, 2-step alarms & SOS',

    s7Title: 'Step 7: Lock Device & Start Kiosk Mode',
    s7Category: 'Kiosk Activation',
    s7Desc:
      'At the bottom of the Caregiver Settings menu, tap the green **Lock Device and Start Kiosk** button. The senior’s phone immediately enters the protected, fail-safe SENEAR Kiosk home screen!',
    s7Tip:
      'If the **Missing Kiosk Protection!** warning appears, set SENEAR as the **default Home screen** and enable **Kiosk Guard (Accessibility)**.',
    s7VisualText: 'Kiosk Active & Locked',
    s7VisualSub: 'Foolproof 4-tile Senior Home Screen is now live',

    s8Title: 'Step 8: How to Exit Kiosk Mode Back to the Normal Phone',
    s8Category: 'Exiting Kiosk & Normal Mode',
    s8Desc:
      'If you entered the Kiosk after setting up all blocking mechanisms, here is how you can return to the normal mobile interface: on the Kiosk screen, tap the clock 5 times and enter the admin password (1234). Then, in the menu that opens, tap the red button again (**Back to Phone Menu**) and select the other option instead of SENEAR — after that, the phone can be used normally again.',
    s8Tip:
      'IMPORTANT: If you only want to change the settings, you do not need to select another Home screen — after making your changes, simply tap the green **Lock Device and Start Kiosk** button again. Use the red **Back to Phone Menu** button when you want to return to normal phone use.',
    s8VisualText: '5× Clock → 1234 → Red Button',
    s8VisualSub: 'Tap “Back to Phone Menu” & choose the other launcher instead of SENEAR',

    // -------------------------------------------------------------------------
    // CAREGIVER PHONE STEPS (Phase 2: Steps 1 - 6)
    // -------------------------------------------------------------------------
    c1Title: 'Step 1: Install SENEAR on the Caregiver’s Phone',
    c1Category: 'Caregiver App Install',
    c1Desc:
      'Install and open the same SENEAR application on the family member’s (Caregiver’s) smartphone. Allow notification permissions when prompted so critical alerts arrive immediately with sound.',
    c1Tip:
      'Make sure Android Notification permissions are allowed — this guarantees you receive instant SOS, low-battery (<20%), power-off, and wandering alerts, as well as incoming Wi-Fi calls even when your phone is locked.',
    c1VisualText: 'Caregiver Smartphone Install',
    c1VisualSub: 'Allow Push Notifications for instant SOS & battery alerts',

    c2Title: 'Step 2: Choose I am a Caregiver & Register',
    c2Category: 'Caregiver Profile',
    c2Desc:
      'On the welcome screen, tap the blue **I am a Caregiver** button. Enter your first and last name, phone number, and email address, then tap **Continue to Dashboard**.',
    c2Tip:
      'Your Caregiver profile automatically registers a secure push channel and places your phone number onto the paired Senior’s speed-dial tile.',
    c2VisualText: 'Select: “I am a Caregiver”',
    c2VisualSub: 'Enter Caregiver Name, Phone Number & Email Address',

    c3Title: 'Step 3: Pair with the Senior’s 6-Digit Code',
    c3Category: 'Device Pairing',
    c3Desc:
      'In the main menu of the Caregiver Dashboard, open **My Seniors & Pairing**. After accepting the GDPR notice, enter the 6-digit code shown on the Senior’s phone (in General Settings, e.g. K4M9A2) into the **Pair a New Senior** field, then tap the **Pair Device** button.',
    c3Tip:
      'Multiple family members can pair with the same senior using the same 6-digit code, and one caregiver can monitor multiple seniors at the same time!',
    c3VisualText: 'Enter 6-Digit Code & Pair',
    c3VisualSub: 'Links Senior & Caregiver in real time',

    c4Title: 'Step 4: Remote Speed-Dial Contacts & Daily Routine Reminders',
    c4Category: 'Remote Contacts & Routines',
    c4Desc:
      'On the paired senior’s profile page, you can manage their daily life remotely:\n1. **Remote Speed-Dial Contacts & Photos** — edit the senior’s **4 large photo call tiles** directly from your phone. Selecting a photo from your gallery automatically center-crops and compresses it for instant cloud sync, updating the Senior’s Kiosk screen in real time.\n2. **Daily Routines, Wake-up Alarms & Medication Reminders** — create routines in 4 categories (**⏰ Wake-up Alarm**, **💊 Medication**, **💧 Hydration**, **📅 Custom Task**) with multi-line dosage/instructions and an optional photo of the pill box.\n3. **2-Step Senior Confirmation** — when the alarm rings on the Senior’s phone, the senior taps **VIEW DETAILS** (which silences the alarm and shows the instructions and photo), then taps the giant green **DONE / TAKEN** button. This immediately updates your Caregiver screen with a green **✅ Confirmed** badge and timestamp.',
    c4Tip:
      'Any contact, photo, or daily routine you save on the Caregiver Dashboard is automatically synchronized to the Senior’s phone within seconds.',
    c4VisualText: 'Remote Contacts + 2-Step Routine Alarms',
    c4VisualSub: 'VIEW DETAILS → DONE / TAKEN → ✅ Confirmed on your phone',

    c5Title: 'Step 5: Home Zone, Auto-Answer & Two-Way Wi-Fi Calling',
    c5Category: 'Geofence & Calls',
    c5Desc:
      'On the senior’s detailed profile page:\n1. You can start a **regular phone call** or a **Wi-Fi-based call** if the senior does not have a SIM card but has internet access via Wi-Fi. During a Wi-Fi call, **Video Calling** can also be switched on.\n2. **Set Current Location as Home** — when the senior is at home, tap this button and from then on this will be their home location.\n3. **Wandering Alerts**, which you can configure under **Notification Settings**, will be checked against the location set as Home.\n4. **Auto-Answer (Speakerphone)** means that the senior’s phone answers your call hands-free on speakerphone without the senior having to tap anything.\n5. If the senior has a SIM card (and therefore mobile internet), the **Navigate** button opens Google Maps to help you quickly get to the senior if they wander off.',
    c5Tip:
      'If the senior’s phone has no SIM card, enable **Allow Wi-Fi Calling (if no SIM / mobile network)** in **Notification Settings** — then both you and the senior (using any of their 4 contact tiles) can make two-way Wi-Fi voice and video calls!',
    c5VisualText: 'Home Zone + Auto-Answer + Wi-Fi Call',
    c5VisualSub: 'Adjustable wandering distance & two-way calls without SIM',

    c6Title: 'Step 6: Alert History, Safety & Legal Info & GDPR Deletion',
    c6Category: 'Monitoring, Legal & GDPR',
    c6Desc:
      '- Under **Alert History**, you can review and filter SOS emergency alerts, wandering events, battery warnings, and system messages.\n- In **Notification Settings**, choose which push notifications you want to receive: battery dropping below 20%, phone switched on, switched off / offline status, charger connected, Wi-Fi calling, and wandering alerts.\n- **Safety & Legal Info / User Manual** — you can review the Non-Medical / Emergency Disclaimer and setup instructions anytime on the Welcome screen or inside the Caregiver Dashboard menu.\n- **One-Tap GDPR Deletion** — under **My Profile → Permanently delete account and all data (GDPR)**, you can permanently wipe all cloud and local data with a single tap.',
    c6Tip:
      'In **My Profile**, you can edit your details or permanently delete your account and all synchronized cloud data (GDPR) at any time.',
    c6VisualText: 'Alert History, Legal Info & GDPR Wipe',
    c6VisualSub: 'Filterable event log, safety disclaimer & one-tap data erasure',

    // Stepper buttons
    btnDoneNext: 'Done — Next Step',
    btnPrevious: 'Previous Step',
    btnComplete: 'Finish Setup Guide',
    btnContinueToCaregiver: 'Continue to Caregiver’s Phone Setup →',
    stepActiveBadge: 'Current Step',
    stepCompletedBadge: 'Completed',
    stepPendingBadge: 'Upcoming',

    // Completion Card
    completionTitle: 'Setup Completed Successfully!',
    completionSubtitle:
      'Both the Senior’s Kiosk phone and the Caregiver’s Dashboard are now configured and connected. You can switch between the Senior and Caregiver guides anytime above.',
    btnRestartWizard: 'Restart Guide',
    btnOpenSimulator: 'Test Web Simulator',
    btnContactSupport: 'Contact Support',

    // FAQs
    faqTitle: 'Frequently Asked Questions about Setup',
    faq0Q: 'How can I enter Setup (Caregiver Settings) from the locked Kiosk screen?',
    faq0A:
      'You can always enter the Caregiver Settings menu using the admin password — by default it is 1234, and you can change it anytime in General Settings. On the Kiosk screen, simply tap the clock 5 times in a row and enter the password 1234.',
    faq1Q: 'Do I still need to Factory Reset the phone or scan a QR code with 6 taps?',
    faq1A:
      'No! SENEAR installs like a standard Android app. You do not need to wipe the phone or use a 6-tap QR code wizard. Simply install the app, grant the requested permissions in the 2-step setup wizard, and enable the SENEAR Kiosk Guard (Accessibility Service).',
    faq2Q: 'Where do I find the 6-digit Pairing Code to link the two phones?',
    faq2A:
      'On the Senior’s phone, open Caregiver Settings > General Settings. The 6-digit Pairing Code is displayed in a blue card. Enter this code on the Caregiver’s phone under My Seniors & Pairing.',
    faq3Q: 'How does Remote Auto-Answer on Speakerphone work?',
    faq3A:
      'In the Caregiver app, you can toggle “Auto-Answer (Speakerphone)” on the senior’s profile. A secure signal is sent immediately to the senior’s phone so when you call them, their phone automatically answers the call and switches to loud speakerphone.',
    faq4Q: 'Can the senior’s phone work without pairing to a caregiver phone, or without a SIM card?',
    faq4A:
      'Yes! Standalone Kiosk mode (4 photo speed-dial tiles, daily routine alarms, SOS call, quick SMS, loud senior ringtone) works 100% independently and free of charge. And when paired with a Caregiver over Wi-Fi, both phones can make two-way Wi-Fi voice and video calls even if the senior’s phone has no SIM card.',

    // Visual Card & Badge Labels
    selectedBadge: 'Selected',
    childModeBadge: 'Child Mode',
    dpcLockedBadge: 'Kiosk Protected',
    stepsTotalLabel: 'Steps',
    stepsDoneLabel: 'of',
    stepsCompletedLabel: 'Completed',
    visualRoleSeniorBtn: 'I am the Senior',
    visualRoleCaregiverBtn: 'I am a Caregiver',
    visualLockKioskBtn: '✓ Lock Device and Start Kiosk',
    visualExitKioskBtn: '⬅ Back to Phone Menu',
    visualAutoAnswerLabel: '🔊 Auto-Answer (Speaker)',
    visualRoutineConfirmBadge: '✅ Confirmed • 08:05',
  },

  de: {
    backToHome: 'Zurück zur Übersicht',
    breadcrumb: 'Schritt-für-Schritt-Einrichtung',
    pageTitle: 'SENEAR Einrichtungsanleitung',
    pageSubtitle:
      'Schritt-für-Schritt-Anleitung für das Smartphone des Seniors und das Smartphone des Betreuers. Normale App-Installation – kein Zurücksetzen auf Werkseinstellungen und kein QR-Code nötig.',
    pageNote:
      'Gute Nachricht: Das Senioren-Telefon braucht für Sprach- und Videoanrufe nicht mehr unbedingt eine SIM-Karte! Eine WLAN-Internetverbindung genügt — so kann der Senior weiterhin Anrufe annehmen und seine 4 ausgewählten Hauptkontakte anrufen.',
    standardInstallPill: 'Normale App-Installation',
    dualPhonePill: 'Senioren- + Betreuer-Telefon Anleitung',
    langSelectorLabel: 'Sprache:',

    // Role / Phone selector section
    phoneQuestionTitle: 'Welches Telefon möchten Sie jetzt einrichten?',
    phoneQuestionSubtitle:
      'Wählen Sie, ob Sie das Telefon des Seniors (Pflegeempfängers), das Telefon des Betreuers (Angehörigen) oder beide nacheinander einrichten möchten:',

    seniorPhoneTitle: '1. Telefon des Seniors (Pflegeempfänger)',
    seniorPhoneSubtitle:
      'Einrichtung des Senioren-Telefons: Profil, System- & Akku-Berechtigungen, 4 Foto-Kurzwahlkontakte, Tagesroutinen & Medikamentenwecker, SOS-Taste, 6-stelliger Kopplungscode, Kiosk-Sperre und Rückkehr zum normalen Telefonmodus.',
    seniorPhoneBadge: '8 Schritte • Kiosk-Einrichtung',

    caregiverPhoneTitle: '2. Telefon des Betreuers (Angehöriger)',
    caregiverPhoneSubtitle:
      'Einrichtung des Betreuer-Telefons: Registrierung, 6-stellige Kopplung, Fernverwaltung von Foto-Kontakten & Tagesroutinen, Zuhause-Zone, automatische Rufannahme, WLAN-Anrufe ohne SIM und Alarmverlauf.',
    caregiverPhoneBadge: '6 Schritte • Betreuer-Dashboard',

    bothPhonesTitle: 'Komplette Einrichtung (Beide Telefone)',
    bothPhonesSubtitle:
      'Zeigt alle 14 Schritte nacheinander: zuerst das Senioren-Telefon, danach das Betreuer-Telefon.',

    btnStartSenior: 'Senioren-Telefon einrichten',
    btnStartCaregiver: 'Betreuer-Telefon einrichten',
    btnStartBoth: 'Alle 14 Schritte anzeigen (Beide Telefone)',

    deviceTypeBadgeSenior: 'Aktuell: SENIOREN-Telefon (Schritte 1–8)',
    deviceTypeBadgeCaregiver: 'Aktuell: BETREUER-Telefon (Schritte 1–6)',
    deviceTypeBadgeBoth: 'Aktuell: BEIDE Telefone (Alle 14 Schritte)',

    // Phase Tags
    phase1Tag: 'Senioren-Telefon',
    phase2Tag: 'Betreuer-Telefon',

    // -------------------------------------------------------------------------
    // SENIOR PHONE STEPS (Phase 1: Steps 1 - 8)
    // -------------------------------------------------------------------------
    s1Title: 'Schritt 1: SENEAR App installieren & öffnen',
    s1Category: 'Normale Installation',
    s1Desc:
      'Installieren Sie die SENEAR-App aus dem Google Play Store auf dem Telefon des Pflegeempfängers (Seniors) und öffnen Sie anschließend die App.',
    s1Tip:
      'Akzeptieren Sie beim ersten Start die angezeigten Systemberechtigungen (Telefonanrufe, SMS, Standort und Benachrichtigungen).',
    s1VisualText: 'Installation über Google Play',
    s1VisualSub: 'Anruf-, SMS-, Standort- und Benachrichtigungsberechtigungen erlauben',

    s2Title: 'Schritt 2: Ich bin Pflegeempfänger & Grunddaten (1/2)',
    s2Category: 'Rollenauswahl',
    s2Desc:
      'Tippen Sie auf dem Begrüßungsbildschirm auf **Ich bin Pflegeempfänger**. Geben Sie unter **Schritt 1: Grunddaten eingeben** den Namen des Seniors, die Telefonnummer und das Geburtsjahr ein und tippen Sie auf **Weiter**.',
    s2Tip:
      'Der eingegebene Name wird im Betreuer-Dashboard sowie bei allen SOS-, Akku- und Standort-Alarmen angezeigt.',
    s2VisualText: '„Ich bin Pflegeempfänger“ → Grunddaten',
    s2VisualSub: 'Name, Telefonnummer & Geburtsjahr eintragen',

    s3Title: 'Schritt 3: Systemberechtigungen & Kiosk-Wächter (2/2)',
    s3Category: 'Systemberechtigungen',
    s3Desc:
      'Tippen Sie auf dem Bildschirm nacheinander auf die roten Berechtigungskarten:\n1. **Systemberechtigung: Bildschirmfixierung und Pop-up-Meldungen** — suchen Sie in der sich öffnenden App-Liste nach **SENEAR** und aktivieren Sie die Berechtigung. Kehren Sie danach zu den Einstellungen zurück und die Kachel wird grün.\n2. **Standard-Seniorenklingelton** — suchen Sie in der sich öffnenden Liste nach **SENEAR** und aktivieren Sie die Berechtigung. Kehren Sie danach zu den Einstellungen zurück und die Kachel wird grün.\n3. **Standard-Startbildschirm (Empfohlen)** — suchen Sie in der sich öffnenden Liste nach **SENEAR** und wählen Sie es aus. Kehren Sie danach zu den Einstellungen zurück und die Kachel wird grün.\n4. **Kiosk-Wächter (Bedienungshilfen)** — tippen Sie auf der sich öffnenden Bedienungshilfen-Seite auf **Installierte Apps**, suchen Sie nach **SENEAR** und schalten Sie beide Schalter ein. Kehren Sie danach zu den Einstellungen zurück und die Kachel wird grün.',
    s3Tip:
      'WICHTIG: Bei jeder erfolgreich erteilten Berechtigung erscheint eine grüne **Erteilt**-Markierung. Die Schaltfläche **Weiter** ist erst aktiv, nachdem die erforderlichen Berechtigungen erteilt wurden.',
    s3VisualText: 'Bildschirm + Klingelton + Startbildschirm + Kiosk-Wächter',
    s3VisualSub: 'SENEAR in jeder Systemliste suchen & aktivieren',

    s4Title: 'Schritt 4: Allgemeine Einstellungen, Rechtliches, Schnellnachrichten & Ton/Anzeige',
    s4Category: 'Betreuer-Einstellungen (Obere Menüpunkte)',
    s4Desc:
      'Gehen Sie im sich öffnenden Menü **Betreuer-Einstellungen** die oberen Schaltflächen von oben nach unten durch:\n1. **Allgemeine Einstellungen** — hier können Sie das Admin-Passwort (standardmäßig 1234) ändern und sehen nach Zustimmung zur DSGVO-Erklärung den **6-stelligen Kopplungscode** des Seniors (diesen geben Sie später auf dem Betreuer-Telefon ein). Zudem können auf dieser Seite sämtliche Cloud- und Lokaldaten gemäß DSGVO endgültig gelöscht werden (**Cloud-Profil und Daten endgültig löschen (DSGVO)**).\n2. **Sicherheit & Rechtliches / Anleitung** — hier können Sie jederzeit die rechtlichen Sicherheitshinweise (Nicht-Medizinprodukt / Notruf-Hinweis) und die Anleitung einsehen.\n3. **Schnellnachrichten einstellen** — vorformulierte SMS-Nachrichten, die der Senior schnell an einen der 4 Hauptkontakte senden kann.\n4. **Ton- und Anzeigeeinstellungen** — schalten Sie den **seniorenfreundlichen Klingelton** und die **automatische Freisprechfunktion** bei Anrufen ein und passen Sie **Helligkeit und Lautstärke** für den Kiosk und das Admin-Menü an.',
    s4Tip:
      'Notieren oder fotografieren Sie den 6-stelligen Kopplungscode (z. B. K4M9A2) in den Allgemeinen Einstellungen — damit verbinden Sie das Betreuer-Telefon.',
    s4VisualText: '6-stelliger Code: K4M9A2',
    s4VisualSub: 'Allgemeine Einstellungen + Rechtliches + Schnell-SMS + Ton & Anzeige',

    s5Title: 'Schritt 5: Hintergrundschutz & Akku (Nach Smartphone-Marke)',
    s5Category: 'Hintergrundschutz & Akku',
    s5Desc:
      'Als Nächstes folgt in der Liste der Menüpunkt **Hintergrundschutz & Akku**. Falls Sie hier etwas einstellen müssen, wird dieser Menüpunkt mit einem **roten Ausrufezeichen (!)** angezeigt. Wählen Sie in diesem Fall unten das Smartphone-Modell bzw. die Marke aus und führen Sie die beschriebenen Einstellungen durch, damit Hintergrunddienste für **SOS**, **Zuhause-Zone (Geofencing)**, **Tagesroutinen-Wecker** und **Online-Status** niemals durch Energiesparfunktionen beendet werden:',
    s5Tip:
      'WICHTIG: Ohne diese Einstellung kann das Betriebssystem die App bei ausgeschaltetem Bildschirm in den Tiefschlaf versetzen.',
    s5VisualText: 'Akku: Nicht eingeschränkt + Autostart',
    s5VisualSub: 'Verhindert das Beenden von SOS, GPS & Weckern im Hintergrund',

    s6Title: 'Schritt 6: Anrufberechtigungen, Kontakte, Tagesroutinen & SOS-Konfiguration',
    s6Category: 'Betreuer-Einstellungen (Untere Menüpunkte)',
    s6Desc:
      'Gehen Sie nun die unteren vier Schaltflächen in den **Betreuer-Einstellungen** der Reihe nach durch:\n1. **Anrufberechtigungen (Whitelist)** — legen Sie fest, welche weiteren Personen (außer den 4 Hauptkontakten) den Senior anrufen dürfen. Unbekannte Anrufer werden automatisch abgewiesen.\n2. **Kontakte einstellen** — geben Sie Name, Beziehung (z. B. Tochter) und Telefonnummer der **4 großen Foto-Anrufkacheln** ein und wählen Sie ein Foto aus der Galerie (automatisch mittig zugeschnitten und komprimiert). Auch die Schriftgröße ist hier einstellbar, und bei Kopplung lassen sich die 4 Kontakte aus der Ferne bearbeiten.\n3. **Tagesroutinen und Erinnerungen** — erstellen Sie Erinnerungen in 4 Kategorien (**⏰ Wecker**, **💊 Medikamente**, **💧 Trinken**, **📅 Eigene Aufgabe**) mit mehrzeiligen Dosierungsanweisungen und optionalem Foto der Medikamentenschachtel. Klingelt der Alarm auf dem Kiosk-Bildschirm, tippt der Senior zuerst auf **DETAILS ANZEIGEN** (der Ton verstummt und die genaue Anweisung samt Foto erscheint) und danach auf die große grüne Taste **ERLEDIGT**.\n4. **SOS-Konfiguration** — legen Sie die anzurufende Notrufnummer fest und bestimmen Sie, wer bei einem Notruf zusätzlich eine SMS mit dem GPS-Standort erhält.',
    s6Tip:
      'Die 4 Hauptkontakte sind im Anruffilter immer automatisch erlaubt — nur zusätzliche vertrauenswürdige Nummern (z. B. Nachbar, Arzt) müssen unter Anrufberechtigungen (Whitelist) ergänzt werden.',
    s6VisualText: 'Whitelist + 4 Foto-Kontakte + Routinen + SOS',
    s6VisualSub: 'Anruffilter, automatischer Foto-Zuschnitt, 2-stufige Alarme & SOS',

    s7Title: 'Schritt 7: Gerät sperren und Kiosk starten',
    s7Category: 'Kiosk-Aktivierung',
    s7Desc:
      'Tippen Sie ganz unten im Einstellungsmenü auf die grüne Schaltfläche **Gerät sperren und Kiosk starten**. Das Telefon wechselt sofort in die geschützte, unverstellbare SENEAR Kiosk-Oberfläche!',
    s7Tip:
      'Wenn die Warnung **Fehlender Kiosk-Schutz!** erscheint, legen Sie SENEAR als **Standard-Startbildschirm** fest und schalten Sie den **Kiosk-Wächter (Bedienungshilfen)** ein.',
    s7VisualText: 'Kiosk Aktiv & Gesichert',
    s7VisualSub: 'Fehlersicherer Senioren-Startbildschirm ist jetzt aktiv',

    s8Title: 'Schritt 8: Kiosk-Modus verlassen & zurück zum normalen Telefon',
    s8Category: 'Kiosk verlassen & Normalmodus',
    s8Desc:
      'Wenn Sie nach dem Einrichten aller Sperrmechanismen in den Kiosk gewechselt sind, können Sie so wieder zur normalen Smartphone-Oberfläche zurückkehren: Tippen Sie auf dem Kiosk-Bildschirm 5-mal auf die Uhr und geben Sie das Admin-Passwort (1234) ein. Tippen Sie anschließend im sich öffnenden Menü erneut auf die rote Taste (**Zurück zum Telefonmenü**) und wählen Sie dort anstelle von SENEAR die andere Option aus — danach kann das Telefon wieder ganz normal verwendet werden.',
    s8Tip:
      'WICHTIG: Wenn Sie nur Einstellungen ändern möchten, müssen Sie keinen anderen Startbildschirm auswählen — drücken Sie nach der Änderung einfach wieder auf die grüne Taste **Gerät sperren und Kiosk starten**. Verwenden Sie die rote Taste **Zurück zum Telefonmenü**, wenn Sie zur normalen Telefonnutzung zurückkehren möchten.',
    s8VisualText: '5× Uhr → 1234 → Rote Taste',
    s8VisualSub: '„Zurück zum Telefonmenü“ → andere Option statt SENEAR wählen',

    // -------------------------------------------------------------------------
    // CAREGIVER PHONE STEPS (Phase 2: Steps 1 - 6)
    // -------------------------------------------------------------------------
    c1Title: 'Schritt 1: SENEAR auf dem Betreuer-Telefon installieren',
    c1Category: 'Betreuer-App installieren',
    c1Desc:
      'Installieren und öffnen Sie dieselbe SENEAR App auf dem Smartphone des betreuenden Familienmitglieds. Erlauben Sie beim Start unbedingt die Benachrichtigungsberechtigung.',
    c1Tip:
      'Durch erlaubte Push-Benachrichtigungen erhalten Sie sofortige Alarme bei SOS, niedrigem Akku (<20 %), Ausschalten des Geräts oder Verlassen der Sicherheitszone sowie eingehende WLAN-Anrufe auch bei gesperrtem Bildschirm.',
    c1VisualText: 'Installation auf Betreuer-Telefon',
    c1VisualSub: 'Push-Benachrichtigungen für sofortige Alarme erlauben',

    c2Title: 'Schritt 2: Ich bin Betreuer wählen & Registrieren',
    c2Category: 'Betreuer-Profil',
    c2Desc:
      'Tippen Sie auf dem Begrüßungsbildschirm auf die blaue Schaltfläche **Ich bin Betreuer**. Geben Sie Ihren Vor- und Nachnamen, Ihre Telefonnummer und Ihre E-Mail-Adresse ein und tippen Sie auf **Weiter zum Dashboard**.',
    c2Tip:
      'Ihr Betreuer-Profil speichert automatisch den sicheren Push-Kanal und hinterlegt Ihre Telefonnummer auf der Kurzwahlkachel des gekoppelten Seniors.',
    c2VisualText: 'Rolle: „Ich bin Betreuer“',
    c2VisualSub: 'Name, Telefonnummer und E-Mail-Adresse des Betreuers eingeben',

    c3Title: 'Schritt 3: Mit dem 6-stelligen Code des Seniors koppeln',
    c3Category: 'Gerätekopplung',
    c3Desc:
      'Öffnen Sie im Hauptmenü des Betreuer-Dashboards den Punkt **Meine Senioren & Kopplung**. Nachdem Sie der DSGVO-Meldung zugestimmt haben, geben Sie in das Feld **Neuen Senior koppeln** den auf dem Telefon des Seniors (unter Allgemeine Einstellungen) angezeigten 6-stelligen Code (z. B. K4M9A2) ein und tippen Sie auf die Schaltfläche **Gerät koppeln**.',
    c3Tip:
      'Mehrere Familienmitglieder können sich mit demselben 6-stelligen Code verbinden, und ein Betreuer kann auch mehrere Senioren gleichzeitig überwachen.',
    c3VisualText: '6-stelligen Code eingeben',
    c3VisualSub: 'Verbindet Senioren- & Betreuer-Telefon in Echtzeit',

    c4Title: 'Schritt 4: Ferngesteuerte Foto-Kontakte & Tagesroutinen / Medikamentenwecker',
    c4Category: 'Kontakte & Tagesroutinen',
    c4Desc:
      'Auf dem Profilblatt des gekoppelten Seniors können Sie Kontakte und Erinnerungen bequem aus der Ferne verwalten:\n1. **Ferngesteuerte Kurzwahlkontakte & Fotos** — bearbeiten Sie die **4 großen Foto-Anrufkacheln** direkt von Ihrem Telefon aus. Wenn Sie ein Foto aus der Galerie auswählen, wird es automatisch mittig zugeschnitten und komprimiert und aktualisiert den Kiosk-Bildschirm des Seniors sofort in Echtzeit.\n2. **Tagesroutinen, Wecker & Medikamentenerinnerungen** — erstellen Sie Erinnerungen in 4 Kategorien (**⏰ Wecker**, **💊 Medikamente**, **💧 Trinken**, **📅 Eigene Aufgabe**) mit mehrzeiligen Dosierungsanweisungen und einem optionalen Foto der Medikamentenschachtel.\n3. **2-stufige Bestätigung durch den Senior** — wenn der Alarm klingelt, tippt der Senior auf **DETAILS ANZEIGEN** (der Alarmton verstummt und zeigt die genaue Dosierung samt Foto) und anschließend auf die große grüne Taste **ERLEDIGT**. Dadurch erscheint auf Ihrem Betreuer-Bildschirm sofort ein grünes **✅ Bestätigt**-Abzeichen mit Uhrzeit.',
    c4Tip:
      'Alle im Betreuer-Dashboard gespeicherten Kontakte, Fotos und Tagesroutinen werden automatisch innerhalb weniger Sekunden mit dem Senioren-Telefon synchronisiert.',
    c4VisualText: 'Fernkontakte + 2-Stufen-Routinen',
    c4VisualSub: 'DETAILS ANZEIGEN → ERLEDIGT → ✅ Bestätigt auf Ihrem Telefon',

    c5Title: 'Schritt 5: Zuhause-Zone, Auto-Rufannahme & Zwei-Wege-WLAN-Anrufe',
    c5Category: 'Sicherheitszone & Anrufe',
    c5Desc:
      'Auf dem detaillierten Profilblatt des Seniors:\n1. Sie können einen **herkömmlichen Anruf** oder einen **WLAN-basierten Anruf** starten, falls der Senior keine SIM-Karte hat, aber über WLAN mit dem Internet verbunden ist. Beim WLAN-Anruf kann auch ein **Videoanruf** zugeschaltet werden.\n2. **Aktuellen Standort als Zuhause festlegen** — wenn der Senior zu Hause ist, tippen Sie auf diese Schaltfläche, und ab diesem Zeitpunkt gilt dieser Ort als seine Wohnadresse.\n3. Die **Weglauf-Alarme**, die Sie unter **Benachrichtigungseinstellungen** konfigurieren können, werden anhand der als Zuhause festgelegten Position überprüft.\n4. **Automatische Rufannahme (Freisprecher)** bedeutet, dass das Telefon des Seniors Ihren Anruf berührungslos und auf Lautsprecher annimmt, ohne dass der Senior auf den Bildschirm tippen muss.\n5. Wenn der betreute Nutzer eine SIM-Karte (und damit mobiles Internet) hat, hilft Ihnen Google Maps über die Schaltfläche **Navigieren** jederzeit, schnell zum Senior zu gelangen, falls dieser sich verirrt.',
    c5Tip:
      'Hat das Senioren-Telefon keine SIM-Karte, aktivieren Sie in den **Benachrichtigungseinstellungen** die Option **WLAN-Anruf erlauben (ohne SIM/Mobilfunk)** — dann können sowohl Sie als auch der Senior (über seine 4 Kontaktkacheln) gegenseitig WLAN-Sprach- und Videoanrufe führen!',
    c5VisualText: 'Zuhause-Zone + Auto-Rufannahme + WLAN-Anruf',
    c5VisualSub: 'Einstellbarer Weglauf-Abstand & Zwei-Wege-Anrufe ohne SIM',

    c6Title: 'Schritt 6: Alarmverlauf, Sicherheitshinweise & DSGVO-Datenlöschung',
    c6Category: 'Protokoll, Rechtliches & DSGVO',
    c6Desc:
      '- Unter **Alarmverlauf** können Sie alle SOS-Notrufe, Weglauf-Ereignisse, Akku- und Systemmeldungen gefiltert einsehen.\n- Im Menü **Benachrichtigungseinstellungen** wählen Sie aus, wofür Sie Push-Benachrichtigungen erhalten möchten: Akkustand unter 20 %, Ein-/Ausschalten des Telefons, Ladegerät angeschlossen, WLAN-Anrufe und Weglauf-Alarm.\n- **Sicherheit & Rechtliches / Benutzerhandbuch** — den Hinweis zum Nicht-Medizinprodukt / Notruf-Haftungsausschluss sowie die Bedienungsanleitung können Sie jederzeit auf dem Begrüßungsbildschirm oder im Menü des Betreuer-Dashboards einsehen.\n- **Ein-Klick-DSGVO-Datenlöschung** — unter **Mein Profil → Konto und alle Daten endgültig löschen (DSGVO)** können Sie sämtliche Cloud- und Lokaldaten mit einem Fingertipp unwiderruflich löschen.',
    c6Tip:
      'Unter **Mein Profil** können Sie Ihre Daten jederzeit bearbeiten oder Ihr Konto samt allen synchronisierten Daten endgültig löschen (DSGVO).',
    c6VisualText: 'Alarmverlauf, Rechtliches & DSGVO-Löschung',
    c6VisualSub: 'Filterbares Protokoll, Sicherheitshinweise & Ein-Klick-Löschung',

    // Stepper buttons
    btnDoneNext: 'Erledigt — Nächster Schritt',
    btnPrevious: 'Vorheriger Schritt',
    btnComplete: 'Einrichtung abschließen',
    btnContinueToCaregiver: 'Weiter zur Einrichtung des Betreuer-Telefons →',
    stepActiveBadge: 'Aktueller Schritt',
    stepCompletedBadge: 'Erledigt',
    stepPendingBadge: 'Ausstehend',

    // Completion Card
    completionTitle: 'Einrichtung erfolgreich abgeschlossen!',
    completionSubtitle:
      'Sowohl das Senioren-Telefon (Kiosk) als auch das Betreuer-Dashboard sind jetzt fertig eingerichtet und miteinander verbunden.',
    btnRestartWizard: 'Anleitung neu starten',
    btnOpenSimulator: 'Web-Simulator testen',
    btnContactSupport: 'Support kontaktieren',

    // FAQs
    faqTitle: 'Häufige Fragen zur Einrichtung',
    faq0Q: 'Wie gelange ich vom gesperrten Kiosk-Bildschirm in die Betreuer-Einstellungen?',
    faq0A:
      'Mit dem Admin-Passwort können Sie jederzeit in das Betreuer-Menü wechseln — standardmäßig lautet es 1234, kann aber in den Allgemeinen Einstellungen geändert werden. Tippen Sie auf dem Kiosk-Bildschirm einfach 5-mal hintereinander auf die Uhr und geben Sie das Passwort 1234 ein.',
    faq1Q: 'Muss das Telefon noch auf Werkseinstellungen zurückgesetzt oder per QR-Code installiert werden?',
    faq1A:
      'Nein! SENEAR wird wie eine ganz normale Android-App installiert. Es ist kein Zurücksetzen auf Werkseinstellungen und kein 6-maliges Tippen für einen QR-Code nötig. Installieren Sie einfach die App, erteilen Sie die Berechtigungen im 2-stufigen Einrichtungsassistenten und aktivieren Sie den SENEAR Kiosk-Wächter (Bedienungshilfen).',
    faq2Q: 'Wo finde ich den 6-stelligen Kopplungscode?',
    faq2A:
      'Auf dem Telefon des Seniors unter „Betreuer-Einstellungen“ > „Allgemeine Einstellungen“. Geben Sie diesen 6-stelligen Code auf dem Betreuer-Telefon unter „Meine Senioren & Kopplung“ ein.',
    faq3Q: 'Wie funktioniert die automatische Rufannahme mit Freisprecher?',
    faq3A:
      'Der Betreuer kann in seiner App den Schalter „Automatische Rufannahme (Freisprecher)“ aktivieren. Das Signal wird sofort an das Senioren-Telefon gesendet, sodass eingehende Anrufe automatisch angenommen und auf den Lautsprecher geschaltet werden.',
    faq4Q: 'Funktioniert das Senioren-Telefon auch ohne Kopplung oder ohne SIM-Karte?',
    faq4A:
      'Ja! Der eigenständige Kiosk-Modus (4 große Foto-Kurzwahltasten, Tagesroutinen-Wecker, SOS-Notruf, Schnell-SMS, lauter Senioren-Klingelton) funktioniert komplett unabhängig und kostenlos. Und bei Verbindung mit einem Betreuer über WLAN können beide Telefone auch ohne SIM-Karte im Senioren-Telefon gegenseitig Sprach- und Videoanrufe über WLAN führen.',

    // Visual Card & Badge Labels
    selectedBadge: 'Ausgewählt',
    childModeBadge: 'Kindermodus',
    dpcLockedBadge: 'Kiosk Geschützt',
    stepsTotalLabel: 'Schritte',
    stepsDoneLabel: 'von',
    stepsCompletedLabel: 'Erledigt',
    visualRoleSeniorBtn: 'Ich bin Pflegeempfänger',
    visualRoleCaregiverBtn: 'Ich bin Betreuer',
    visualLockKioskBtn: '✓ Gerät sperren und Kiosk starten',
    visualExitKioskBtn: '⬅ Zurück zum Telefonmenü',
    visualAutoAnswerLabel: '🔊 Auto-Rufannahme',
    visualRoutineConfirmBadge: '✅ Bestätigt • 08:05',
  },

  hu: {
    backToHome: 'Vissza a főoldalra',
    breadcrumb: 'Lépésről Lépésre Beállítási Útmutató',
    pageTitle: 'Beállítási Útmutató',
    pageSubtitle:
      'Részletes, lépésről lépésre követhető beállítási útmutató a Gondozott telefonjához és a Gondozó telefonjához. Egyszerű, normál telepítéssel — gyári visszaállítás és QR-kód nélkül.',
    pageNote:
      'Jó hír: a gondozott telefonjába mostantól nem feltétlenül kell SIM-kártya a hang- és videóhívásokhoz! Elég, ha Wi-Fi-n keresztül van internetkapcsolata — így is tud hívást fogadni, és a 4 kiválasztott fő kontaktját is fel tudja hívni.',
    standardInstallPill: 'Normál Alkalmazás Telepítés',
    dualPhonePill: 'Gondozott + Gondozó Telefon Beállítása',
    langSelectorLabel: 'Nyelv:',

    // Role / Phone selector section
    phoneQuestionTitle: 'Melyik telefont szeretnéd most beállítani?',
    phoneQuestionSubtitle:
      'Válaszd ki, hogy az idős hozzátartozó (Gondozott) telefonját, a családtag (Gondozó) telefonját, vagy mindkét készüléket egymás után szeretnéd-e beállítani:',

    seniorPhoneTitle: '1. Gondozott Telefonja (Idős hozzátartozó)',
    seniorPhoneSubtitle:
      'Az idős felhasználó telefonjának beállítása: alapadatok, rendszer- és akkumulátor-engedélyek, 4 fényképes gyorshívó kontakt, napi rutinok és gyógyszeremlékeztető, SOS gomb, 6-jegyű párosító kód, Kioszk lezárás és visszalépés a normál telefonba.',
    seniorPhoneBadge: '8 lépés • Védett Kioszk beállítása',

    caregiverPhoneTitle: '2. Gondozó Telefonja (Családtag / Segítő)',
    caregiverPhoneSubtitle:
      'A gondozó saját telefonjának beállítása: regisztráció, összekapcsolás a 6-jegyű kóddal, távoli névjegy-, fotó- és napi rutin kezelés, Otthon Zóna, kihangosított automatikus hívásfogadás, Wi-Fi hívás SIM nélkül és riasztási előzmények.',
    caregiverPhoneBadge: '6 lépés • Távfelügyeleti Vezérlőpult',

    bothPhonesTitle: 'Mindkét Telefon Teljes Beállítása (1–14. lépés)',
    bothPhonesSubtitle:
      'Végigvezet a teljes folyamaton: először a Gondozott telefonjának előkészítésén, majd a Gondozó telefonjával való összekapcsoláson.',

    btnStartSenior: 'Gondozott Telefonjának Beállítása',
    btnStartCaregiver: 'Gondozó Telefonjának Beállítása',
    btnStartBoth: 'Mindkét Telefon Beállítása (Teljes folyamat, 14 lépés)',

    deviceTypeBadgeSenior: 'Kiválasztott útmutató: GONDOZOTT Telefonja (1–8. lépés)',
    deviceTypeBadgeCaregiver: 'Kiválasztott útmutató: GONDOZÓ Telefonja (1–6. lépés)',
    deviceTypeBadgeBoth: 'Kiválasztott útmutató: MINDKÉT Telefon (1–14. lépés)',

    // Phase Tags
    phase1Tag: 'Gondozott Telefonja',
    phase2Tag: 'Gondozó Telefonja',

    // -------------------------------------------------------------------------
    // SENIOR PHONE STEPS (Phase 1: Steps 1 - 8)
    // -------------------------------------------------------------------------
    s1Title: '1. Lépés: Alkalmazás telepítése és megnyitása',
    s1Category: 'Normál Telepítés',
    s1Desc:
      'Telepítsd a SENEAR alkalmazást a gondozott (idős hozzátartozó) telefonjára a Google Play Áruházból, majd nyisd meg az alkalmazást.',
    s1Tip:
      'Az első indításkor fogadd el a felugró rendszerengedélyeket (hívásindítás, SMS, helymeghatározás és értesítések).',
    s1VisualText: 'Telepítés a Google Play Áruházból',
    s1VisualSub: 'Hívás, SMS, GPS és értesítési engedélyek megadása első indításkor',

    s2Title: '2. Lépés: Gondozott vagyok profil és Alapadatok (1/2)',
    s2Category: 'Profil Kiválasztása',
    s2Desc:
      'Az üdvözlő képernyőn (**Üdvözöljük a SENEAR alkalmazásban!**) nyomd meg a **Gondozott vagyok** gombot. Az **1. Lépés: Alapadatok megadása** képernyőn add meg a gondozott nevét (pl. Kovács István), telefonszámát és születési évét, majd nyomd meg a **Tovább** gombot.',
    s2Tip:
      'A megadott név fog megjelenni a Gondozó telefonján a vezérlőpulton, valamint minden SOS-, akkumulátor- és elkóborlási riasztásban.',
    s2VisualText: '„Gondozott vagyok” → Alapadatok',
    s2VisualSub: 'Név, telefonszám és születési év kitöltése',

    s3Title: '3. Lépés: Rendszerengedélyek és Kioszk Őrszem (2/2)',
    s3Category: 'Rendszerengedélyek',
    s3Desc:
      'A képernyőn sorban koppints a piros engedélykártyákra:\n1. **Rendszerengedély: képernyőrögzítésre és felugró üzenetekre** — a megnyíló alkalmazáslistában keresd meg a **SENEAR**-t és engedélyezd. Ezután lépj vissza a beállításokba és a csempe zöldre vált.\n2. **Alapértelmezett idős csengőhang** — a megnyíló listában keresd meg a **SENEAR**-t és engedélyezd. Ezután lépj vissza a beállításokba és a csempe zöldre vált.\n3. **Alapértelmezett Kezdőképernyő (Ajánlott)** — a megnyíló listában keresd meg és válaszd ki a **SENEAR**-t. Ezután lépj vissza a beállításokba és a csempe zöldre vált.\n4. **Kioszk Őrszem (Kisegítő lehetőségek)** — a megnyíló Kisegítő lehetőségek oldalon kattints a **Telepített alkalmazások**-ra, keresd meg a **SENEAR**-t és kapcsold be mind a kettő gombot. Ezután lépj vissza a beállításokba és a csempe zöldre vált.',
    s3Tip:
      'FONTOS: Minden sikeresen megadott engedélynél zöld **Megadva** jelzés jelenik meg. A **Tovább** gomb csak a kötelező engedélyek megadása után aktív.',
    s3VisualText: 'Képernyő + Csengőhang + Kezdőképernyő + Kioszk Őrszem',
    s3VisualSub: 'A megnyíló listákban keresd meg és engedélyezd a SENEAR-t',

    s4Title: '4. Lépés: Általános beállítások, Jogi tájékoztató, Gyors üzenetek és Hang/Képernyő',
    s4Category: 'Gondozói Beállítások (Felső menüpontok)',
    s4Desc:
      'A megnyíló **Gondozói Beállítások** menüben fentről lefelé haladva állítsd be az első négy gombot:\n1. **Általános beállítások** — itt módosíthatod az admin (gondozói) jelszót (alapértelmezetten 1234), és itt látod a gondozott **6-jegyű Párosítási Kód**-ját is, miután elfogadtad a GDPR tájékoztatót (ezt a 6-jegyű kódot kell majd beírni a Gondozó telefonján az összekapcsoláshoz). Ugyanitt törölhető véglegesen minden felhőbeli és helyi adat (**Felhőprofil és adatok végleges törlése (GDPR)**), ha az alkalmazást már nem használjátok.\n2. **Biztonsági és Jogi Tájékoztató / Útmutató** — itt bármikor elolvasható a nem-orvostechnikai / segélyhívó felelősségkizáró nyilatkozat és a használati útmutató.\n3. **Gyors üzenetek beállítása** — előre megírt SMS-ek, amiket a gondozott gyorsan elküldhet a 4 fő kontakt valamelyikének.\n4. **Hang és képernyő beállítások** — itt kapcsolhatod be az **idősbarát csengőhangot**, a **hívások automatikus kihangosítását**, valamint beállíthatod a Kioszk és az Admin menü **fényerejét és hangerejét**.',
    s4Tip:
      'Írd fel vagy fotózd le az Általános beállításokban látható 6-jegyű Párosítási Kódot (pl. K4M9A2), mert a Gondozó telefonján ezzel kötöd össze a két készüléket.',
    s4VisualText: '6-jegyű Párosítási Kód: K4M9A2',
    s4VisualSub: 'Általános beállítások + Jogi tájékoztató + Gyors üzenetek + Hang és képernyő',

    s5Title: '5. Lépés: Háttérvédelem & Akku (Telefonmárkák szerint)',
    s5Category: 'Háttérvédelem & Akku',
    s5Desc:
      'A menüsorban a következő gomb a **Háttérvédelem & Akku**. Amennyiben itt be kell valamit állítanod, akkor ez a menüpont egy **piros felkiáltójellel (!)** lesz látható. Ebben az esetben kell alul a mobil típusát (márkáját) megadni és a leírtakat beállítani, hogy a telefon energiatakarékos rendszere soha ne állítsa le a háttérben futó **SOS**, **Otthon Zóna**, **Napi Rutin ébresztő** és **Online életjel** szolgáltatásokat:',
    s5Tip:
      'FONTOS: Enélkül a telefon lezárt képernyőnél elaltathatja az alkalmazást, ami késleltetheti a riasztásokat vagy az ébresztőket.',
    s5VisualText: 'Háttérvédelem & Akku: Nem korlátozott',
    s5VisualSub: 'Megakadályozza, hogy a telefon leállítsa az SOS-t, a GPS-t és az emlékeztetőket',

    s6Title: '6. Lépés: Hívási Engedélyek, Kontaktok, Napi rutinok és SOS Konfiguráció',
    s6Category: 'Gondozói Beállítások (Alsó menüpontok)',
    s6Desc:
      'Haladj tovább lefelé a **Gondozói Beállítások** menü alsó négy gombján:\n1. **Hívási Engedélyek (Whitelist)** — állítsd be, kik azok a további személyek (a 4 fő kontakton kívül), akik hívhatják a gondozott személyt. Az ismeretlen hívók automatikusan elutasításra kerülnek.\n2. **Kontaktok beállítása** — megadhatod a **4 nagy fényképes hívócsempe** nevét, kapcsolatát (pl. Lánya) és telefonszámát, valamint fényképet választhatsz a galériából (amelyet az app automatikusan középre vág és tömörít). A név és a kapcsolat betűmérete is állítható, és párosítás után ez a 4 kontakt távolról, a Gondozó telefonjáról is szerkeszthető.\n3. **Napi rutinok és emlékeztetők** — 4 kategóriában (**⏰ Ébresztő**, **💊 Gyógyszer**, **💧 Folyadékpótlás**, **📅 Egyéni feladat**) hozhatsz létre emlékeztetőket többsoros adagolási leírással és a gyógyszeres doboz opcionális fotójával. Amikor az emlékeztető megszólal a Kioszk képernyőn, a gondozott rányom a **MEGNÉZEM** gombra (ekkor a hang elhalkul és megjelenik a pontos adagolás + fotó), majd megnyomja a hatalmas zöld **BEVETTEM** gombot.\n4. **SOS Konfiguráció** — beállítható a hívandó segélyszám (pl. Mentők vagy egy családtag száma), és az is, hogy vészhelyzeti híváskor (SOS) kik kapjanak még SMS-t a GPS-helyzettel.',
    s6Tip:
      'A 4 fő kontakt a hívásszűrésben mindig automatikusan engedélyezett, így a Hívási Engedélyek (Whitelist) alatt csak az egyéb (pl. szomszéd, orvos) számokat kell külön felvenni.',
    s6VisualText: 'Whitelist + 4 Fotós Kontakt + Napi rutinok + SOS',
    s6VisualSub: 'Hívásszűrés, automatikusan körbevágott fotók, 2 lépéses emlékeztetők & SOS',

    s7Title: '7. Lépés: Eszköz lezárása és Kioszk indítása',
    s7Category: 'Kioszk Élesítése',
    s7Desc:
      'A Gondozói Beállítások menü alján nyomd meg a zöld **Eszköz lezárása és Kioszk indítása** gombot. A telefon ezzel belép a védett, elállíthatatlan SENEAR Kioszk főképernyőre, és készen áll a használatra!',
    s7Tip:
      'Ha a **Hiányzó Kioszk Védelem!** figyelmeztetés jelenik meg, állítsd be a SENEAR-t **alapértelmezett kezdőképernyőnek** és kapcsold be a **Kioszk Őrszemet (Kisegítő lehetőségek)**.',
    s7VisualText: 'Kioszk Lezárva & Aktív',
    s7VisualSub: 'Az elállíthatatlan 4-csempés idősbarát felület elindult',

    s8Title: '8. Lépés: Hogyan tudok kilépni a Kioszkból vissza a normál telefonba?',
    s8Category: 'Kilépés a Kioszkból & Normál Mód',
    s8Desc:
      'Ha beléptél a Kioszkba, miután beállítottál minden blokkoló mechanizmust, így tudsz visszalépni a normál mobilfelületre: a Kioszk kijelzőn kattints 5-ször az órára, és add meg az admin jelszót (1234). Ezután a megnyíló menüben megint a piros gombra kell nyomni (**Vissza a telefon menüjébe**), és ott a SENEAR helyett a másik opciót kell kiválasztani — utána újra normál módon használható a telefon.',
    s8Tip:
      'FONTOS: Ha csak a beállításokon szeretnél módosítani, nem kell másik kezdőképernyőt választanod — a módosítás után egyszerűen nyomj újra a zöld **Eszköz lezárása és Kioszk indítása** gombra. A piros **Vissza a telefon menüjébe** gombot akkor használd, ha vissza szeretnél térni a normál telefonos használathoz.',
    s8VisualText: '5× Óra → 1234 → Piros gomb',
    s8VisualSub: '„Vissza a telefon menüjébe” → SENEAR helyett a másik opció kiválasztása',

    // -------------------------------------------------------------------------
    // CAREGIVER PHONE STEPS (Phase 2: Steps 1 - 6)
    // -------------------------------------------------------------------------
    c1Title: '1. Lépés: SENEAR telepítése a Gondozó telefonjára',
    c1Category: 'Gondozói App Telepítése',
    c1Desc:
      'Telepítsd és nyisd meg ugyanazt a SENEAR alkalmazást a gondozó (családtag) saját telefonján is. Az első indításkor engedélyezd az értesítéseket (Notifications).',
    c1Tip:
      'Az értesítések engedélyezése elengedhetetlen ahhoz, hogy az SOS vészjelzések, a 20% alatti akkumulátor-riasztások, a kikapcsolási jelzések, az elkóborlási értesítések és a bejövő Wi-Fi hívások lezárt képernyőn is azonnal megérkezzenek.',
    c1VisualText: 'Telepítés a Gondozó Telefonjára',
    c1VisualSub: 'Értesítési engedélyek megadása az azonnali riasztásokhoz',

    c2Title: '2. Lépés: Gondozó vagyok profil és Gondozói Regisztráció',
    c2Category: 'Gondozói Profil',
    c2Desc:
      'Az üdvözlő képernyőn válaszd a **Gondozó vagyok** gombot. A **Gondozói Regisztráció** képernyőn add meg a vezeték- és keresztneved (pl. Nagy Mária), a telefonszámod és az e-mail címed, majd koppints a **Tovább a Vezérlőpultra** gombra.',
    c2Tip:
      'A rendszer automatikusan létrehozza a gondozói profilodat, regisztrálja a push-értesítési csatornát, és párosításkor beállítja a telefonszámodat a Gondozott gyorstárcsázó csempéjére.',
    c2VisualText: '„Gondozó vagyok” → Regisztráció',
    c2VisualSub: 'Gondozó nevének, telefonszámának és e-mail címének megadása',

    c3Title: '3. Lépés: Összekapcsolás a 6-jegyű Párosítási Kóddal',
    c3Category: 'Készülékek Párosítása',
    c3Desc:
      'A Gondozói Vezérlőpult főmenüjében lépj a **Gondozottaim & Párosítás** menüpontba. Miután elfogadtad a GDPR üzenetet, az **Új Gondozott Párosítása** mezőbe írd be a Gondozott telefonján (az Általános beállításokban) látható 6-jegyű kódot (pl. K4M9A2), majd nyomd meg az **Eszköz párosítása** gombot.',
    c3Tip:
      'Egy gondozotthoz több családtag is csatlakozhat ugyanazzal a 6-jegyű kóddal, és egy gondozó több idős hozzátartozót is felügyelhet egyszerre!',
    c3VisualText: '6-jegyű Kód Beírása & Párosítás',
    c3VisualSub: 'Azonnali, valós idejű kapcsolat a két telefon között',

    c4Title: '4. Lépés: Távoli Névjegy- és Fotókezelés, Napi Rutinok és Gyógyszeremlékeztető',
    c4Category: 'Távoli Névjegyek & Napi Rutinok',
    c4Desc:
      'A gondozott adatlapján távolról, a saját telefonodról is beállíthatod a névjegyeket és a napi emlékeztetőket:\n1. **Távoli Névjegy- és Fotókezelés** — szerkesztheted a gondozott **4 nagy fényképes hívócsempéjét** (név, rokonság, telefonszám, fotó). A galériából kiválasztott képet az app automatikusan középre vágja és tömöríti az azonnali felhőszinkronizációhoz, így az valós időben frissül a Gondozott Kioszk képernyőjén.\n2. **Napi Rutinok, Ébresztő és Gyógyszeremlékeztető** — 4 kategóriában (**⏰ Ébresztő**, **💊 Gyógyszer**, **💧 Folyadékpótlás**, **📅 Egyéni feladat**) hozhatsz létre emlékeztetőket többsoros adagolási leírással és a gyógyszeres doboz opcionális fényképével.\n3. **2 lépéses visszaigazolás a Gondozottnál** — amikor az emlékeztető megszólal, a gondozott rányom a **MEGNÉZEM** gombra (ekkor a hang elhalkul és megjelenik a pontos adagolás + fotó), majd megnyomja az óriási zöld **BEVETTEM** gombot. Ekkor a te képernyődön azonnal megjelenik a zöld **✅ Elfogadva / Bevette** jelzés a pontos időponttal.',
    c4Tip:
      'Minden távolról elmentett névjegy, fénykép és napi rutin néhány másodpercen belül automatikusan megjelenik a Gondozott telefonján.',
    c4VisualText: 'Távoli Fotós Kontaktok + Napi Rutinok',
    c4VisualSub: 'MEGNÉZEM → BEVETTEM → ✅ Bevette visszajelzés a telefonodon',

    c5Title: '5. Lépés: Otthon Zóna, Automatikus Hívásfogadás és Kétirányú Wi-Fi hívás',
    c5Category: 'Zónavédelem & Hívások',
    c5Desc:
      'A gondozott részletes adatlapján:\n1. Indíthatsz **hagyományos hívást** vagy akár **Wi-Fi alapú hívást** is, ha a gondozottnak nem lenne SIM-kártyája, de van internete Wi-Fi-ről. A Wi-Fi hívásnál **Videóhívás** is bekapcsolható.\n2. **Jelenlegi hely beállítása otthonként** — amikor a gondozott otthon van, kattints erre a gombra és onnantól kezdve ez lesz az otthoni pozíciója.\n3. Az **Elkóborlási Riasztások**, amit az **Értesítési beállítások** alatt állíthatsz be, az otthonként beállított pozícióhoz lesz ellenőrizve.\n4. Az **Automatikus hívásfogadás (Kihangosítva)** azt jelenti, hogy a gondozott telefonja érintés nélkül, kihangosítva veszi fel a te hívásodat, anélkül, hogy a gondozottnak rá kelljen kattintania.\n5. Ha a gondozott felhasználónak van SIM-kártyája (és ezzel mobilnete), akkor a **Navigálás** gombbal a Google Maps mindig segít gyorsan a gondozotthoz menni, ha elkóborolna.',
    c5Tip:
      'Ha a gondozott telefonjában nincs SIM-kártya, az **Értesítési beállítások** menüben kapcsold be a **Wi-Fi hívás engedélyezése (ha nincs SIM/Mobilnet)** opciót — így te is és a gondozott is (a 4 kontaktcsempe bármelyikével) kétirányú Wi-Fi hang- és videóhívást indíthattok!',
    c5VisualText: 'Otthon Zóna + Auto-hívásfogadás + Wi-Fi hívás',
    c5VisualSub: 'Állítható elkóborlási távolság & kétirányú hívás SIM nélkül',

    c6Title: '6. Lépés: Riasztási előzmények, Biztonsági tájékoztató és GDPR adattörlés',
    c6Category: 'Eseménynapló, Jogi Info & GDPR',
    c6Desc:
      '- A főmenüben a **Riasztási előzmények** alatt szűrhetően visszanézheted az SOS vészjelzéseket, elkóborlásokat, akkumulátor- és rendszerüzeneteket.\n- Az **Értesítési beállítások** menüben választhatod ki, miről kérsz push-értesítést: akkumulátor 20% alá merülése, a telefon bekapcsolása, kikapcsolása / offline állapota, töltőre csatlakozása, Wi-Fi hívás és elkóborlási riasztás.\n- **Biztonsági és Jogi Tájékoztató / Használati Útmutató** — a nem-orvostechnikai / segélyhívó felelősségkizáró nyilatkozatot és a beállítási segédletet bármikor megtekintheted az Üdvözlő képernyőn vagy a Gondozói Vezérlőpult menüjében.\n- **Egynyomásos GDPR Adattörlés** — a **Saját profil → Fiók és minden adat végleges törlése (GDPR)** menüpontban egyetlen gombnyomással véglegesen törölheted az összes felhőbeli és helyi adatot.',
    c6Tip:
      'A **Saját profil** menüben bármikor módosíthatod az adataidat, vagy egyetlen érintéssel véglegesen törölheted a fiókodat és minden szinkronizált adatot (GDPR).',
    c6VisualText: 'Riasztási Előzmények, Jogi Info & GDPR Törlés',
    c6VisualSub: 'Szűrhető eseménynapló, biztonsági tájékoztató és egynyomásos törlés',

    // Stepper buttons
    btnDoneNext: 'Kész — Következő Lépés',
    btnPrevious: 'Előző Lépés',
    btnComplete: 'Beállítás Befejezése',
    btnContinueToCaregiver: 'Tovább a Gondozó telefonjának beállítására →',
    stepActiveBadge: 'Folyamatban',
    stepCompletedBadge: 'Kész',
    stepPendingBadge: 'Következő',

    // Completion Card
    completionTitle: 'A beállítás sikeresen elkészült!',
    completionSubtitle:
      'A Gondozott Kioszk telefonja és a Gondozó Vezérlőpultja mostantól összehangoltan, biztonságosan működik. Fent bármikor válthatsz a Gondozott és a Gondozó útmutatója között.',
    btnRestartWizard: 'Útmutató újrakezdése',
    btnOpenSimulator: 'Webes Szimulátor kipróbálása',
    btnContactSupport: 'Technikai támogatás felkeresése',

    // FAQs
    faqTitle: 'Gyakori Kérdések a Beállításról',
    faq0Q: 'Hogyan tudok belépni a setupba (Gondozói Beállításokba)?',
    faq0A:
      'Az admin jelszóval bármikor ki lehet ugrani a gondozói menübe: alaphelyzetben ez 1234, de az Általános beállításokban tetszőlegesen át is lehet állítani. A Kioszk kijelzőn 5-ször egymás után kell rákattintani az órára, majd megadni az 1234 jelszót.',
    faq1Q: 'Szükséges még gyári visszaállítás (Factory Reset) vagy 6-koppintásos QR-kód a telepítéshez?',
    faq1A:
      'Nem! A SENEAR mostantól normál Android alkalmazásként telepíthető, így nincs szükség sem a telefon törlésére, sem a 6-koppintásos QR-kód olvasásra. Elég feltelepíteni az appot, a 2 lépéses varázslóban megadni az engedélyeket, és bekapcsolni a SENEAR Kioszk Őrszemet (Kisegítő lehetőségek).',
    faq2Q: 'Hol találom a 6-jegyű Párosítási Kódot, amivel összeköthetem a két telefont?',
    faq2A:
      'A Gondozott telefonján a „Gondozói Beállítások” > „Általános beállítások” menüpontban, egy kék kártyán nagy számokkal jelenik meg a 6-jegyű Párosítási Kód. Ezt kell beírni a Gondozó telefonján a „Gondozottaim & Párosítás” menüben.',
    faq3Q: 'Hogyan működik a távolról élesíthető Automatikus Hívásfogadás kihangosítva?',
    faq3A:
      'A Gondozó a saját telefonján (a Gondozott részletes adatlapján) egyetlen kapcsolóval élesítheti az „Automatikus hívásfogadás (kihangosítva)” funkciót. A rendszer azonnal továbbítja a parancsot a gondozott telefonjára, amely a bejövő hívást automatikusan felveszi és kihangosítja.',
    faq4Q: 'Használható a Gondozott telefonja önállóan vagy SIM-kártya nélkül is?',
    faq4A:
      'Igen! A Gondozott Kioszk felülete (a 4 fényképes gyorshívó gomb, a napi rutin ébresztők, az SOS segélyhívás, a gyors SMS-ek és az idősbarát csengőhang) párosítás nélkül is teljes értékűen és ingyenesen működik. Gondozóval összekapcsolva pedig Wi-Fi-n keresztül SIM-kártya nélkül is kétirányú hang- és videóhívást indíthattok egymásnak.',

    // Visual Card & Badge Labels
    selectedBadge: 'Kiválasztva',
    childModeBadge: 'Gyermek Mód',
    dpcLockedBadge: 'Kioszk Védelem',
    stepsTotalLabel: 'lépés összesen',
    stepsDoneLabel: '/',
    stepsCompletedLabel: 'kész',
    visualRoleSeniorBtn: 'Gondozott vagyok',
    visualRoleCaregiverBtn: 'Gondozó vagyok',
    visualLockKioskBtn: '✓ Eszköz lezárása és Kioszk indítása',
    visualExitKioskBtn: '⬅ Vissza a telefon menüjébe',
    visualAutoAnswerLabel: '🔊 Auto-Hívásfogadás',
    visualRoutineConfirmBadge: '✅ Elfogadva • 08:05',
  },
};

type GuideTarget = 'senior' | 'caregiver' | 'both';

interface StepDefinition {
  id: string;
  phase: 1 | 2;
  stepNumber: number;
  titleKey: keyof typeof I18N_WIZARD.en;
  categoryKey: keyof typeof I18N_WIZARD.en;
  descKey: keyof typeof I18N_WIZARD.en;
  tipKey: keyof typeof I18N_WIZARD.en;
  visualTextKey: keyof typeof I18N_WIZARD.en;
  visualSubKey: keyof typeof I18N_WIZARD.en;
  isRedWarning?: boolean;
  visualType:
    | 'senior_install'
    | 'senior_role'
    | 'senior_a11y_ringtone'
    | 'senior_battery_oem'
    | 'senior_contacts_sos'
    | 'senior_pairing_code'
    | 'senior_kiosk_lock'
    | 'senior_kiosk_exit'
    | 'caregiver_install'
    | 'caregiver_role'
    | 'caregiver_pair'
    | 'caregiver_contacts_routines'
    | 'caregiver_home_autoanswer'
    | 'caregiver_history';
}

const ALL_STEPS: StepDefinition[] = [
  // Phase 1: Senior's Phone Setup (8 Steps)
  {
    id: 's_1',
    phase: 1,
    stepNumber: 1,
    titleKey: 's1Title',
    categoryKey: 's1Category',
    descKey: 's1Desc',
    tipKey: 's1Tip',
    visualTextKey: 's1VisualText',
    visualSubKey: 's1VisualSub',
    visualType: 'senior_install',
  },
  {
    id: 's_2',
    phase: 1,
    stepNumber: 2,
    titleKey: 's2Title',
    categoryKey: 's2Category',
    descKey: 's2Desc',
    tipKey: 's2Tip',
    visualTextKey: 's2VisualText',
    visualSubKey: 's2VisualSub',
    visualType: 'senior_role',
  },
  {
    id: 's_3',
    phase: 1,
    stepNumber: 3,
    titleKey: 's3Title',
    categoryKey: 's3Category',
    descKey: 's3Desc',
    tipKey: 's3Tip',
    visualTextKey: 's3VisualText',
    visualSubKey: 's3VisualSub',
    visualType: 'senior_a11y_ringtone',
  },
  {
    id: 's_4',
    phase: 1,
    stepNumber: 4,
    titleKey: 's4Title',
    categoryKey: 's4Category',
    descKey: 's4Desc',
    tipKey: 's4Tip',
    visualTextKey: 's4VisualText',
    visualSubKey: 's4VisualSub',
    visualType: 'senior_pairing_code',
  },
  {
    id: 's_5',
    phase: 1,
    stepNumber: 5,
    titleKey: 's5Title',
    categoryKey: 's5Category',
    descKey: 's5Desc',
    tipKey: 's5Tip',
    visualTextKey: 's5VisualText',
    visualSubKey: 's5VisualSub',
    visualType: 'senior_battery_oem',
  },
  {
    id: 's_6',
    phase: 1,
    stepNumber: 6,
    titleKey: 's6Title',
    categoryKey: 's6Category',
    descKey: 's6Desc',
    tipKey: 's6Tip',
    visualTextKey: 's6VisualText',
    visualSubKey: 's6VisualSub',
    visualType: 'senior_contacts_sos',
  },
  {
    id: 's_7',
    phase: 1,
    stepNumber: 7,
    titleKey: 's7Title',
    categoryKey: 's7Category',
    descKey: 's7Desc',
    tipKey: 's7Tip',
    visualTextKey: 's7VisualText',
    visualSubKey: 's7VisualSub',
    visualType: 'senior_kiosk_lock',
  },
  {
    id: 's_8',
    phase: 1,
    stepNumber: 8,
    titleKey: 's8Title',
    categoryKey: 's8Category',
    descKey: 's8Desc',
    tipKey: 's8Tip',
    visualTextKey: 's8VisualText',
    visualSubKey: 's8VisualSub',
    isRedWarning: true,
    visualType: 'senior_kiosk_exit',
  },

  // Phase 2: Caregiver's Phone Setup (6 Steps)
  {
    id: 'c_1',
    phase: 2,
    stepNumber: 1,
    titleKey: 'c1Title',
    categoryKey: 'c1Category',
    descKey: 'c1Desc',
    tipKey: 'c1Tip',
    visualTextKey: 'c1VisualText',
    visualSubKey: 'c1VisualSub',
    visualType: 'caregiver_install',
  },
  {
    id: 'c_2',
    phase: 2,
    stepNumber: 2,
    titleKey: 'c2Title',
    categoryKey: 'c2Category',
    descKey: 'c2Desc',
    tipKey: 'c2Tip',
    visualTextKey: 'c2VisualText',
    visualSubKey: 'c2VisualSub',
    visualType: 'caregiver_role',
  },
  {
    id: 'c_3',
    phase: 2,
    stepNumber: 3,
    titleKey: 'c3Title',
    categoryKey: 'c3Category',
    descKey: 'c3Desc',
    tipKey: 'c3Tip',
    visualTextKey: 'c3VisualText',
    visualSubKey: 'c3VisualSub',
    visualType: 'caregiver_pair',
  },
  {
    id: 'c_4',
    phase: 2,
    stepNumber: 4,
    titleKey: 'c4Title',
    categoryKey: 'c4Category',
    descKey: 'c4Desc',
    tipKey: 'c4Tip',
    visualTextKey: 'c4VisualText',
    visualSubKey: 'c4VisualSub',
    visualType: 'caregiver_contacts_routines',
  },
  {
    id: 'c_5',
    phase: 2,
    stepNumber: 5,
    titleKey: 'c5Title',
    categoryKey: 'c5Category',
    descKey: 'c5Desc',
    tipKey: 'c5Tip',
    visualTextKey: 'c5VisualText',
    visualSubKey: 'c5VisualSub',
    visualType: 'caregiver_home_autoanswer',
  },
  {
    id: 'c_6',
    phase: 2,
    stepNumber: 6,
    titleKey: 'c6Title',
    categoryKey: 'c6Category',
    descKey: 'c6Desc',
    tipKey: 'c6Tip',
    visualTextKey: 'c6VisualText',
    visualSubKey: 'c6VisualSub',
    visualType: 'caregiver_history',
  },
];

export function SenearInstallGuidePage({
  onBackToHome,
  onBackToProduct,
}: SenearInstallGuidePageProps) {
  const { language } = useLanguage();
  const currentLang = (language in I18N_WIZARD ? language : 'en') as keyof typeof I18N_WIZARD;
  const t = I18N_WIZARD[currentLang];

  // Helper to render **bold** segments without quotes and clean multi-line spacing
  const renderRichText = (text: string, isRed = false) => {
    const lines = text.split('\n');
    const renderLine = (line: string, lineIdx: number) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={lineIdx} className="block">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong
                  key={pIdx}
                  className={isRed ? 'font-extrabold text-red-950' : 'font-bold text-[#1F2421]'}
                >
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </span>
      );
    };

    if (lines.length <= 1) {
      return renderLine(text, 0);
    }
    return <span className="flex flex-col gap-2">{lines.map((l, idx) => renderLine(l, idx))}</span>;
  };

  // State: selected guide target ('senior' | 'caregiver' | 'both')
  const [selectedTarget, setSelectedTarget] = useState<GuideTarget>('senior');

  // Compute active steps based on selected target
  const activeSteps =
    selectedTarget === 'senior'
      ? ALL_STEPS.filter((step) => step.phase === 1)
      : selectedTarget === 'caregiver'
      ? ALL_STEPS.filter((step) => step.phase === 2)
      : ALL_STEPS;

  // State: active accordion step id
  const [activeStepId, setActiveStepId] = useState<string>('s_1');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isWizardComplete, setIsWizardComplete] = useState(false);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [highlightedStepId, setHighlightedStepId] = useState<string | null>(null);
  const [selectedPhoneBrand, setSelectedPhoneBrand] = useState<string>('');

  // Smooth scroll helper
  const smoothScrollToElement = (
    element: HTMLElement,
    duration = 550,
    offset = 100,
    onComplete?: () => void
  ) => {
    let startTime: number | null = null;
    let lastTime: number | null = null;

    const step = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
        lastTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      const dt = Math.max(0.001, Math.min(0.05, (currentTime - (lastTime || currentTime)) / 1000));
      lastTime = currentTime;

      const rect = element.getBoundingClientRect();
      const currentDiff = rect.top - offset;

      if (timeElapsed >= duration || Math.abs(currentDiff) <= 1.0) {
        if (Math.abs(currentDiff) > 0.5) {
          window.scrollBy(0, currentDiff);
        }
        const focusable =
          element.querySelector<HTMLElement>('button, [tabindex="0"], a') ||
          element;
        if (focusable) {
          focusable.focus({ preventScroll: true });
        }
        if (onComplete) {
          onComplete();
        }
        return;
      }

      const dampingFactor = 1 - Math.exp(-dt * 12);
      const scrollStep = currentDiff * dampingFactor;

      window.scrollBy(0, scrollStep);
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const scrollToStep = (stepId: string, delay = 40) => {
    setTimeout(() => {
      const el =
        document.getElementById(`step-${stepId}`) ||
        document.getElementById('stepper-wizard');
      if (el) {
        smoothScrollToElement(el, 550, 100);
      }
    }, delay);
  };

  const handleSelectTarget = (target: GuideTarget) => {
    setSelectedTarget(target);
    setIsWizardComplete(false);
    setCompletedSteps(new Set());
    if (target === 'caregiver') {
      setActiveStepId('c_1');
    } else {
      setActiveStepId('s_1');
    }
  };

  const handleStartStep = (target: GuideTarget) => {
    handleSelectTarget(target);
    const targetStepId = target === 'caregiver' ? 'c_1' : 's_1';

    setTimeout(() => {
      const el =
        document.getElementById(`step-${targetStepId}`) ||
        document.getElementById('stepper-wizard');
      if (el) {
        setHighlightedStepId(targetStepId);
        smoothScrollToElement(el, 850, 100, () => {
          setTimeout(() => {
            setHighlightedStepId(null);
          }, 2000);
        });
      }
    }, 60);
  };

  const currentStepIndex = activeSteps.findIndex((s) => s.id === activeStepId);

  const handleStepDoneNext = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(activeStepId);
    setCompletedSteps(newCompleted);

    if (currentStepIndex < activeSteps.length - 1) {
      const nextStep = activeSteps[currentStepIndex + 1];
      setActiveStepId(nextStep.id);
      scrollToStep(nextStep.id, 40);
    } else {
      setTimeout(() => {
        setIsWizardComplete(true);
        setTimeout(() => {
          const wizardEl = document.getElementById('stepper-wizard');
          if (wizardEl) {
            smoothScrollToElement(wizardEl, 550, 100);
          }
        }, 80);
      }, 350);
    }
  };

  const handleStepPrev = () => {
    if (currentStepIndex > 0) {
      const prevStep = activeSteps[currentStepIndex - 1];
      setActiveStepId(prevStep.id);
      scrollToStep(prevStep.id, 40);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] selection:bg-[#C5A880]/30 selection:text-[#1F2421]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {/* ------------------------------------------------------------------- */}
        {/* Hero Section                                                        */}
        {/* ------------------------------------------------------------------- */}
        <section className="relative pt-2 pb-6">
          {/* Ambient Gold Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -left-36 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Breadcrumb: Home › SENEAR › Setup guide */}
          <nav className="relative z-10 flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#8C7355] mb-8">
            <button type="button" onClick={onBackToHome} className="hover:text-[#2C2C2C] cursor-pointer">
              {t.backToHome}
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button type="button" onClick={onBackToProduct} className="hover:text-[#2C2C2C] cursor-pointer">
              SENEAR
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#2C2C2C] font-semibold">{t.breadcrumb}</span>
          </nav>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="space-y-6 text-center flex flex-col items-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[#FFFFFF] text-[#8C7355] border border-[#C5A880]/40 shadow-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.standardInstallPill}</span>
                </span>
                <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[#FFFFFF] text-[#5C5A56] border border-[#C5A880]/30 shadow-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{t.dualPhonePill}</span>
                </span>
              </div>

              <div className="space-y-3 flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <img src="/logos/senear-logo.png" alt="SENEAR logo" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
                  <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C2C2C] tracking-tight leading-[1.14]">
                    SENEAR {t.pageTitle.replace(/^SENEAR\s*/, '')}
                  </h1>
                </div>
                <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed max-w-3xl mx-auto">
                  {t.pageSubtitle}
                </p>
              </div>

              {/* Helpful Green Info Banner */}
              <div className="bg-emerald-50/90 border border-emerald-300/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-center gap-3 shadow-xs text-center max-w-3xl mx-auto">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Wifi className="w-4 h-4 text-emerald-700" />
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                  {t.pageNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------- */}
        {/* Phone Role Selection: Senior Phone vs. Caregiver Phone              */}
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
            {/* Option 1: SENIOR'S PHONE */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleStartStep('senior')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStartStep('senior');
                }
              }}
              className={`p-6 sm:p-8 rounded-3xl text-left transition-all duration-300 cursor-pointer border-2 relative overflow-hidden flex flex-col justify-between ${
                selectedTarget === 'senior'
                  ? 'bg-gradient-to-br from-[#FFFFFF] via-[#F4F9F6] to-[#EBF5EF] border-emerald-600 shadow-lg ring-2 ring-emerald-500/30 scale-[1.01]'
                  : 'bg-[#FFFFFF] border-[#E8DFD4] hover:border-[#C5A880]/60 hover:bg-[#FAF8F5] shadow-2xs'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      selectedTarget === 'senior'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-[#F5F0EB] text-emerald-700'
                    }`}
                  >
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {t.seniorPhoneBadge}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2C2C2C]">
                    {t.seniorPhoneTitle}
                  </h3>
                  <p className="text-sm text-[#5C5A56] mt-2 leading-relaxed">
                    {t.seniorPhoneSubtitle}
                  </p>
                </div>
              </div>

              <div>
                {selectedTarget === 'senior' && (
                  <div className="mt-4 flex items-center justify-end text-xs font-bold">
                    <span className="flex items-center gap-1 text-emerald-700 font-bold bg-white px-2.5 py-1 rounded-full border border-emerald-300">
                      <Check className="w-3.5 h-3.5" /> {t.selectedBadge}
                    </span>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-emerald-200/50">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartStep('senior');
                    }}
                    className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all duration-200 cursor-pointer group"
                  >
                    <span>{t.btnStartSenior}</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>

            {/* Option 2: CAREGIVER'S PHONE */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleStartStep('caregiver')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStartStep('caregiver');
                }
              }}
              className={`p-6 sm:p-8 rounded-3xl text-left transition-all duration-300 cursor-pointer border-2 relative overflow-hidden flex flex-col justify-between ${
                selectedTarget === 'caregiver'
                  ? 'bg-gradient-to-br from-[#FFFFFF] via-[#FFFBF5] to-[#F9F3EA] border-[#8C7355] shadow-lg ring-2 ring-[#C5A880]/40 scale-[1.01]'
                  : 'bg-[#FFFFFF] border-[#E8DFD4] hover:border-[#C5A880]/60 hover:bg-[#FAF8F5] shadow-2xs'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      selectedTarget === 'caregiver'
                        ? 'bg-[#8C7355] text-white shadow-xs'
                        : 'bg-[#F5F0EB] text-[#8C7355]'
                    }`}
                  >
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F5F0EB] text-[#8C7355] border border-[#C5A880]/40">
                    {t.caregiverPhoneBadge}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2C2C2C]">
                    {t.caregiverPhoneTitle}
                  </h3>
                  <p className="text-sm text-[#5C5A56] mt-2 leading-relaxed">
                    {t.caregiverPhoneSubtitle}
                  </p>
                </div>
              </div>

              <div>
                {selectedTarget === 'caregiver' && (
                  <div className="mt-4 flex items-center justify-end text-xs font-bold">
                    <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <Check className="w-3.5 h-3.5" /> {t.selectedBadge}
                    </span>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-[#C5A880]/20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartStep('caregiver');
                    }}
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#2C2C2C] hover:bg-black active:scale-[0.98] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all duration-200 cursor-pointer group"
                  >
                    <span>{t.btnStartCaregiver}</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1.5 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Full combined walkthrough button */}
          <div className="max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => handleStartStep('both')}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex flex-wrap items-center justify-between gap-3 cursor-pointer ${
                selectedTarget === 'both'
                  ? 'bg-[#2C2C2C] text-white border-[#C5A880] shadow-md'
                  : 'bg-white text-[#2C2C2C] border-[#E8DFD4] hover:border-[#C5A880]'
              }`}
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm sm:text-base">
                    {t.bothPhonesTitle}
                  </div>
                  <div
                    className={`text-xs ${
                      selectedTarget === 'both' ? 'text-stone-300' : 'text-[#5C5A56]'
                    }`}
                  >
                    {t.bothPhonesSubtitle}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#C5A880] text-[#1F2421] shrink-0">
                {t.btnStartBoth}
              </span>
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------------- */}
        {/* Interactive Accordion / Stepper UI (Single Unified Section)         */}
        {/* ------------------------------------------------------------------- */}
        <section id="stepper-wizard" className="space-y-6 max-w-4xl mx-auto">
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
                {selectedTarget === 'senior' && (
                  <button
                    onClick={() => handleStartStep('caregiver')}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>{t.btnContinueToCaregiver}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setCompletedSteps(new Set());
                    setIsWizardComplete(false);
                    setActiveStepId(selectedTarget === 'caregiver' ? 'c_1' : 's_1');
                  }}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.btnRestartWizard}</span>
                </button>

                <button
                  onClick={onBackToHome}
                  className="px-6 py-3 rounded-xl bg-[#2C2C2C] hover:bg-black text-white font-semibold text-sm border border-stone-600 transition-all cursor-pointer"
                >
                  {t.backToHome}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {activeSteps.map((step, idx) => {
                const isActive = step.id === activeStepId;
                const isCompleted = completedSteps.has(step.id);
                const isHighlighted = highlightedStepId === step.id;
                const isRed = Boolean(step.isRedWarning);

                return (
                  <div
                    key={step.id}
                    id={`step-${step.id}`}
                    tabIndex={-1}
                    className={`rounded-3xl transition-all duration-350 border-2 overflow-hidden scroll-mt-36 outline-none ${
                      isRed
                        ? isActive
                          ? 'bg-red-50/70 border-red-600 shadow-lg ring-2 ring-red-500/30'
                          : 'bg-red-50/40 border-red-400 hover:border-red-600 shadow-xs'
                        : isHighlighted
                        ? 'bg-[#FFFFFF] border-emerald-500 shadow-xl ring-4 ring-emerald-500/40 scale-[1.015]'
                        : isActive
                        ? 'bg-[#FFFFFF] border-[#C5A880] shadow-md ring-2 ring-[#C5A880]/20'
                        : isCompleted
                        ? 'bg-[#FAF8F5] border-emerald-300/80 hover:border-emerald-400'
                        : 'bg-[#FFFFFF] border-[#E8DFD4] hover:border-[#C5A880]/50'
                    }`}
                  >
                    {/* Header Bar */}
                    <button
                      onClick={() => {
                        setActiveStepId(step.id);
                        scrollToStep(step.id, 40);
                      }}
                      className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors duration-350 ${
                        isRed
                          ? isActive
                            ? 'bg-red-100/70'
                            : 'hover:bg-red-100/50'
                          : isActive
                          ? 'bg-[#FAF7F2]/60'
                          : 'hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-heading font-black text-base shrink-0 transition-all duration-350 ${
                            isRed
                              ? 'bg-red-600 text-white shadow-sm'
                              : isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : isActive
                              ? 'bg-[#2C2C2C] text-[#FAFAFA] shadow-xs'
                              : 'bg-[#F0EAE1] text-[#6E6B65]'
                          }`}
                        >
                          {isCompleted && !isRed ? (
                            <Check className="w-5 h-5" strokeWidth={3} />
                          ) : (
                            step.stepNumber
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                                isRed
                                  ? 'bg-red-600 text-white border border-red-700'
                                  : step.phase === 1
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-[#F5F0EB] text-[#8C7355] border border-[#C5A880]/40'
                              }`}
                            >
                              {step.phase === 1 ? t.phase1Tag : t.phase2Tag}
                            </span>
                            <span
                              className={`text-[11px] hidden sm:inline font-semibold ${
                                isRed ? 'text-red-700' : 'text-[#8C7355]'
                              }`}
                            >
                              &bull; {t[step.categoryKey]}
                            </span>
                          </div>

                          <h3
                            className={`font-heading text-lg sm:text-xl font-bold mt-1 ${
                              isRed
                                ? 'text-red-700'
                                : isActive
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

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full hidden sm:inline-block ${
                            isRed
                              ? 'bg-red-100 text-red-800 border border-red-300 font-bold'
                              : isCompleted
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
                          className={`w-5 h-5 shrink-0 transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            isRed
                              ? 'text-red-700'
                              : 'text-[#8C7355]'
                          } ${isActive ? 'rotate-180 text-[#2C2C2C]' : ''}`}
                        />
                      </div>
                    </button>

                    {/* Expanded Detail Body */}
                    <div className={`step-accordion-collapse ${isActive ? 'is-expanded' : ''}`}>
                      <div className="min-h-0 overflow-hidden">
                        <div
                          className={`p-6 sm:p-8 pt-2 sm:pt-4 border-t space-y-6 ${
                            isRed ? 'border-red-200 bg-white/80' : 'border-[#F0EAE1]'
                          }`}
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Left: Step Description & Tip */}
                            <div className="lg:col-span-7 space-y-4">
                              <div
                                className={`text-base sm:text-lg leading-relaxed ${
                                  isRed
                                    ? 'text-red-800 font-semibold bg-red-50 p-4 rounded-2xl border border-red-300'
                                    : 'text-[#5C5A56]'
                                }`}
                              >
                                {renderRichText(t[step.descKey], isRed)}
                              </div>

                              {step.visualType === 'senior_battery_oem' && (() => {
                                const brandSelectorI18n = {
                                  en: {
                                    label: 'Select the phone brand:',
                                    placeholder: '— Choose phone brand —',
                                    options: [
                                      {
                                        id: 'xiaomi',
                                        name: 'Xiaomi / Redmi / POCO (MIUI & HyperOS)',
                                        text: '**Xiaomi / Redmi / POCO (MIUI & HyperOS):** Enable **Autostart** AND set Battery Saver to **No restrictions**.',
                                      },
                                      {
                                        id: 'samsung',
                                        name: 'Samsung (One UI)',
                                        text: '**Samsung (One UI):** Open **App Info → Battery** → select **Unrestricted**, and ensure SENEAR is not in **Sleeping / Deep sleeping apps**.',
                                      },
                                      {
                                        id: 'huawei',
                                        name: 'Huawei / Honor',
                                        text: '**Huawei / Honor:** Open **Phone Manager → App Launch** → turn off **Manage automatically** and enable all 3 toggles (**Auto-launch**, **Secondary launch**, **Run in background**).',
                                      },
                                      {
                                        id: 'oneplus',
                                        name: 'OnePlus / OPPO / Realme',
                                        text: '**OnePlus / OPPO / Realme:** Open **App Info → Battery usage** → enable both **Allow background activity** and **Allow auto-launch**.',
                                      },
                                      {
                                        id: 'motorola',
                                        name: 'Motorola / Lenovo / Vivo / Asus / Nokia',
                                        text: '**Motorola / Lenovo / Vivo / Asus / Nokia:** Open **App Info → Battery** → select **Unrestricted** and allow background autostart.',
                                      },
                                      {
                                        id: 'mediatek',
                                        name: 'MediaTek phones (TCL, Alcatel, ZTE, Ulefone, Cubot, Doogee)',
                                        text: '**MediaTek phones (TCL, Alcatel, ZTE, Ulefone, Cubot, Doogee):** Set Battery to **Unrestricted** and turn **OFF DuraSpeed** (or whitelist SENEAR).',
                                      },
                                    ],
                                  },
                                  de: {
                                    label: 'Telefonmarke auswählen:',
                                    placeholder: '— Bitte Telefonmarke wählen —',
                                    options: [
                                      {
                                        id: 'xiaomi',
                                        name: 'Xiaomi / Redmi / POCO (MIUI & HyperOS)',
                                        text: '**Xiaomi / Redmi / POCO (MIUI & HyperOS):** **Autostart** aktivieren UND Energiesparmodus auf **Keine Beschränkungen** setzen.',
                                      },
                                      {
                                        id: 'samsung',
                                        name: 'Samsung (One UI)',
                                        text: '**Samsung (One UI):** **App-Info → Akku** → **Nicht eingeschränkt** wählen und prüfen, dass SENEAR nicht unter **Standby / Tiefer Standby** steht.',
                                      },
                                      {
                                        id: 'huawei',
                                        name: 'Huawei / Honor',
                                        text: '**Huawei / Honor:** **Telefonmanager → App-Start** → **Automatisch verwalten** ausschalten und alle 3 Schalter (**Auto-Start**, **Sekundärer Start**, **Im Hintergrund ausführen**) aktivieren.',
                                      },
                                      {
                                        id: 'oneplus',
                                        name: 'OnePlus / OPPO / Realme',
                                        text: '**OnePlus / OPPO / Realme:** **App-Info → Akkunutzung** → sowohl **Hintergrundaktivität zulassen** als auch **Auto-Start zulassen** aktivieren.',
                                      },
                                      {
                                        id: 'motorola',
                                        name: 'Motorola / Lenovo / Vivo / Asus / Nokia',
                                        text: '**Motorola / Lenovo / Vivo / Asus / Nokia:** **App-Info → Akku** → **Nicht eingeschränkt** wählen und Hintergrund-Autostart erlauben.',
                                      },
                                      {
                                        id: 'mediatek',
                                        name: 'MediaTek-Geräte (TCL, Alcatel, ZTE, Ulefone, Cubot, Doogee)',
                                        text: '**MediaTek-Geräte (TCL, Alcatel, ZTE, Ulefone, Cubot, Doogee):** Akku auf **Nicht eingeschränkt** setzen und **DuraSpeed ausschalten** (oder SENEAR freigeben).',
                                      },
                                    ],
                                  },
                                  hu: {
                                    label: 'Válaszd ki a telefon márkáját:',
                                    placeholder: '— Válaszd ki a telefon márkáját —',
                                    options: [
                                      {
                                        id: 'xiaomi',
                                        name: 'Xiaomi / Redmi / POCO (MIUI & HyperOS)',
                                        text: '**Xiaomi / Redmi / POCO (MIUI & HyperOS):** Kapcsold be az **Automatikus indítás** (Autostart) opciót, ÉS az Akkumulátorkímélőnél válaszd a **Nincs korlátozás** beállítást.',
                                      },
                                      {
                                        id: 'samsung',
                                        name: 'Samsung (One UI)',
                                        text: '**Samsung (One UI):** Nyisd meg az **Alkalmazás adatai → Akkumulátor** menüt → válaszd a **Nem korlátozott** opciót, és ellenőrizd, hogy a SENEAR nincs az **Alvó / Mélyalvó alkalmazások** között.',
                                      },
                                      {
                                        id: 'huawei',
                                        name: 'Huawei / Honor',
                                        text: '**Huawei / Honor:** Nyisd meg a **Telefonkezelő → Alkalmazásindítás** menüt → kapcsold ki az **Automatikus kezelés** kapcsolót, és engedélyezd mind a 3 opciót (**Automatikus indítás**, **Másodlagos indítás**, **Futtatás a háttérben**).',
                                      },
                                      {
                                        id: 'oneplus',
                                        name: 'OnePlus / OPPO / Realme',
                                        text: '**OnePlus / OPPO / Realme:** Nyisd meg az **Alkalmazás adatai → Akkumulátorhasználat** menüt → kapcsold be a **Háttértevékenység engedélyezése** és az **Automatikus indítás engedélyezése** opciókat.',
                                      },
                                      {
                                        id: 'motorola',
                                        name: 'Motorola / Lenovo / Vivo / Asus / Nokia',
                                        text: '**Motorola / Lenovo / Vivo / Asus / Nokia:** Nyisd meg az **Alkalmazás adatai → Akkumulátor** menüt → válaszd a **Nem korlátozott** opciót és engedélyezd a háttérbeli automatikus indítást.',
                                      },
                                      {
                                        id: 'mediatek',
                                        name: 'MediaTek készülékek (TCL, Alcatel, ZTE, Ulefone, Cubot, Doogee)',
                                        text: '**MediaTek készülékek (TCL, Alcatel, ZTE, Ulefone, Cubot, Doogee):** Állítsd az Akkumulátort **Nem korlátozott** értékre, és kapcsold **KI a DuraSpeed** funkciót (vagy engedélyezd benne a SENEAR-t).',
                                      },
                                    ],
                                  },
                                };

                                const bData = brandSelectorI18n[currentLang] ?? brandSelectorI18n.en;
                                const activeOption = bData.options.find(
                                  (o) => o.id === selectedPhoneBrand
                                );

                                return (
                                  <div className="space-y-3 pt-1">
                                    <div className="space-y-1.5">
                                      <label
                                        htmlFor="phone-brand-select"
                                        className="block text-xs sm:text-sm font-bold text-[#2C2C2C]"
                                      >
                                        {bData.label}
                                      </label>
                                      <div className="relative">
                                        <select
                                          id="phone-brand-select"
                                          value={selectedPhoneBrand}
                                          onChange={(e) => setSelectedPhoneBrand(e.target.value)}
                                          className="w-full appearance-none rounded-2xl border-2 border-[#C5A880] bg-[#FAF8F5] px-4 py-3.5 pr-10 text-sm sm:text-base font-bold text-[#1F2421] shadow-2xs focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                                        >
                                          <option value="">{bData.placeholder}</option>
                                          {bData.options.map((opt) => (
                                            <option key={opt.id} value={opt.id}>
                                              {opt.name}
                                            </option>
                                          ))}
                                        </select>
                                        <ChevronDown className="w-5 h-5 text-[#8C7355] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                                      </div>
                                    </div>

                                    {activeOption && (
                                      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/90 border-2 border-emerald-500 text-sm sm:text-base text-emerald-950 leading-relaxed flex items-start gap-3 shadow-xs">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                        <div>{renderRichText(activeOption.text)}</div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}

                              {typeof t[step.tipKey] === 'string' &&
                              (t[step.tipKey].startsWith('FONTOS') ||
                                t[step.tipKey].startsWith('IMPORTANT') ||
                                t[step.tipKey].startsWith('WICHTIG')) ? (
                                <div className="bg-amber-50/90 p-4 rounded-2xl border border-amber-300 flex items-start gap-3 text-xs sm:text-sm text-amber-950 shadow-2xs">
                                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                                  </div>
                                  <span className="font-medium leading-relaxed">
                                    {renderRichText(t[step.tipKey], false)}
                                  </span>
                                </div>
                              ) : (
                                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C5A880]/35 flex items-start gap-3 text-xs sm:text-sm text-[#5C5A56]">
                                  <Info className="w-4 h-4 text-[#8C7355] shrink-0 mt-0.5" />
                                  <span>{renderRichText(t[step.tipKey], false)}</span>
                                </div>
                              )}
                            </div>

                            {/* Right: Step Visual Mockup Card */}
                            <div className="lg:col-span-5 flex justify-center">
                              <div
                                className={`w-full max-w-[300px] rounded-2xl p-5 border shadow-sm text-center space-y-3 ${
                                  isRed
                                    ? 'bg-red-50/80 border-red-300'
                                    : 'bg-[#FAF8F5] border-[#C5A880]/40'
                                }`}
                              >
                                <div
                                  className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center shadow-md ${
                                    isRed
                                      ? 'bg-red-600 text-white'
                                      : 'bg-[#2C2C2C] text-[#C5A880]'
                                  }`}
                                >
                                  {step.visualType === 'senior_install' && (
                                    <Download className="w-7 h-7 text-emerald-400" />
                                  )}
                                  {step.visualType === 'senior_role' && (
                                    <UserCheck className="w-7 h-7 text-emerald-400" />
                                  )}
                                  {step.visualType === 'senior_a11y_ringtone' && (
                                    <Volume2 className="w-7 h-7 text-emerald-400" />
                                  )}
                                  {step.visualType === 'senior_battery_oem' && (
                                    <Settings className="w-7 h-7 text-amber-400" />
                                  )}
                                  {step.visualType === 'senior_contacts_sos' && (
                                    <Users className="w-7 h-7 text-[#C5A880]" />
                                  )}
                                  {step.visualType === 'senior_pairing_code' && (
                                    <KeyRound className="w-7 h-7 text-sky-400" />
                                  )}
                                  {step.visualType === 'senior_kiosk_lock' && (
                                    <Lock className="w-7 h-7 text-emerald-400" />
                                  )}
                                  {step.visualType === 'senior_kiosk_exit' && (
                                    <RotateCcw className="w-7 h-7 text-white" />
                                  )}
                                  {step.visualType === 'caregiver_install' && (
                                    <Bell className="w-7 h-7 text-[#C5A880]" />
                                  )}
                                  {step.visualType === 'caregiver_role' && (
                                    <HeartHandshake className="w-7 h-7 text-sky-400" />
                                  )}
                                  {step.visualType === 'caregiver_pair' && (
                                    <KeyRound className="w-7 h-7 text-emerald-400" />
                                  )}
                                  {step.visualType === 'caregiver_contacts_routines' && (
                                    <Clock className="w-7 h-7 text-emerald-400" />
                                  )}
                                  {step.visualType === 'caregiver_home_autoanswer' && (
                                    <PhoneCall className="w-7 h-7 text-emerald-400" />
                                  )}
                                  {step.visualType === 'caregiver_history' && (
                                    <MapPin className="w-7 h-7 text-[#C5A880]" />
                                  )}
                                </div>

                                <div
                                  className={`font-heading font-bold text-sm ${
                                    isRed ? 'text-red-800' : 'text-[#2C2C2C]'
                                  }`}
                                >
                                  {t[step.visualTextKey]}
                                </div>

                                {/* Contextual visual preview inside card */}
                                {step.visualType === 'senior_role' && (
                                  <div className="py-2 px-3 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-2xs">
                                    {t.visualRoleSeniorBtn}
                                  </div>
                                )}
                                {step.visualType === 'caregiver_role' && (
                                  <div className="py-2 px-3 rounded-xl bg-sky-700 text-white font-bold text-xs shadow-2xs">
                                    {t.visualRoleCaregiverBtn}
                                  </div>
                                )}
                                {(step.visualType === 'senior_pairing_code' ||
                                  step.visualType === 'caregiver_pair') && (
                                  <div className="py-2 px-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 font-mono font-extrabold text-lg tracking-widest">
                                    K4M9A2
                                  </div>
                                )}
                                {step.visualType === 'senior_kiosk_lock' && (
                                  <div className="py-2 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs">
                                    {t.visualLockKioskBtn}
                                  </div>
                                )}
                                {step.visualType === 'senior_kiosk_exit' && (
                                  <div className="py-2.5 px-3 rounded-xl bg-red-600 text-white font-bold text-xs shadow-xs">
                                    {t.visualExitKioskBtn}
                                  </div>
                                )}
                                {step.visualType === 'caregiver_contacts_routines' && (
                                  <div className="py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs">
                                    {t.visualRoutineConfirmBadge}
                                  </div>
                                )}
                                {step.visualType === 'caregiver_home_autoanswer' && (
                                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-[11px] font-bold text-emerald-900">
                                    <span>{t.visualAutoAnswerLabel}</span>
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px]">
                                      ON
                                    </span>
                                  </div>
                                )}

                                <div className="text-[11px] text-[#5C5A56] bg-white p-2.5 rounded-xl border border-[#C5A880]/25 leading-snug">
                                  {t[step.visualSubKey]}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Accordion Action Buttons Bar */}
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

                            <div className="flex flex-wrap items-center gap-3">
                              {selectedTarget === 'senior' &&
                                idx === activeSteps.length - 1 && (
                                  <button
                                    onClick={() => handleStartStep('caregiver')}
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all cursor-pointer shadow-sm"
                                  >
                                    <span>{t.btnContinueToCaregiver}</span>
                                  </button>
                                )}

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
                  </div>
                );
              })}
            </div>
          )}
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
              { q: t.faq0Q, a: t.faq0A },
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A },
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
