import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  Info,
  KeyRound,
  Lock,
  QrCode,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Usb,
  Users,
  WifiOff,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export type JunearSetupTab = 'qr' | 'usb' | 'parent' | 'antibrick';
type Lang = 'hu' | 'de' | 'en';

interface GuideStep {
  title: string;
  desc: string;
  tip: string;
  codeBadge?: string;
}

interface TabCopy {
  label: string;
  sub: string;
  summary: string;
  steps: GuideStep[];
}

interface SetupCopy {
  metaTitle: string;
  home: string;
  backToJunear: string;
  badge: string;
  pageTitle: string;
  pageSubtitle: string;
  complianceCallout: string;
  stepWord: string;
  markDoneBtn: string;
  resetBtn: string;
  progressSuffix: string;
  completedTitle: string;
  completedBody: string;
  nextTabBtn: string;
  tabs: Record<JunearSetupTab, TabCopy>;
}

const SETUP_COPY: Record<Lang, SetupCopy> = {
  hu: {
    metaTitle: 'JUNEAR Beállítási Útmutató — Gyári QR, WebUSB, Szülői PWA & Anti-Brick | gabba',
    home: 'Főoldal',
    backToJunear: 'Vissza a JUNEAR oldalra',
    badge: '100% GOOGLE PLAY KONFORM HIBRID TELEPÍTÉS • EUR3',
    pageTitle: 'JUNEAR Beállítási & Üzembe Helyezési Útmutató',
    pageSubtitle:
      'Válaszd ki a nektek legmegfelelőbb módot: 6-érintéses gyári QR új készülékhez, adatvesztés nélküli Böngészős WebUSB meglévő telefonhoz, Szülői/Iskolai összekapcsolás vagy a Kettős Anti-Brick vésznyitó.',
    complianceCallout:
      'Natív Android Enterprise DevicePolicyManager védelem: a JUNEAR soha nem kér sebezhető Kisegítő lehetőségek (AccessibilityService) engedélyt, és 0% reklám-azonosítót (AD_ID) tartalmaz.',
    stepWord: 'Lépés',
    markDoneBtn: 'Kész, következő lépés',
    resetBtn: 'Alaphelyzet',
    progressSuffix: 'lépés elvégezve',
    completedTitle: 'Minden lépést sikeresen elvégeztél ebben a szakaszban!',
    completedBody: 'Folytathatod a következő beállítási füllel vagy visszatérhetsz a JUNEAR áttekintéshez.',
    nextTabBtn: 'Tovább a következő fülre',
    tabs: {
      qr: {
        label: '1. Gyári QR (6-érintéses)',
        sub: 'Új vagy visszaállított telefonhoz',
        summary:
          'A legerősebb, eltávolíthatatlan Device Owner védelem vadonatúj vagy gyári állapotra visszaállított Android készüléken — kábel és számítógép nélkül.',
        steps: [
          {
            title: 'Szülői PWA megnyitása és GDPR 8. cikk nyilatkozat',
            desc: 'Nyisd meg a saját telefonodon vagy gépeden a JUNEAR Szülői Központot, válaszd ki a nyelvet (HU/DE/EN), és fogadd el az előre be nem jelölt GDPR 8. cikk szerinti szülői felügyeleti nyilatkozatot.',
            tip: 'A Szülői Központ iPhone-on (Safari -> Főképernyőhöz adás), Androidon és böngészőben is azonnal működik.',
          },
          {
            title: '6 érintés a gyermek telefonjának üdvözlőképernyőjén',
            desc: 'Kapcsold be az új (vagy gyári állapotra állított) gyermek-telefont. A legelső „Üdvözöljük / Hi there” képernyő üres részét érintsd meg gyorsan egymás után 6-szor.',
            tip: 'FONTOS: Ne lépj tovább a nyelvválasztón! A 6 érintés nyitja meg az Android beépített vállalati QR-olvasóját.',
          },
          {
            title: 'Wi-Fi csatlakozás és a JUNEAR QR-kód beolvasása',
            desc: 'Add meg az otthoni Wi-Fi jelszót (vagy használd a Szülői PWA által QR-kódba ágyazott Wi-Fi adatokat), majd olvasd be a Szülői Központ „6-Tap Factory QR” ablakában megjelenő kódot.',
            tip: 'Az Android ellenőrzi az APK SHA-256 ujjlenyomatát, és beállítja a natív Device Owner módot.',
            codeBadge: 'bond.gabba.junear/bond.gabba.junear.core.mdm.JunearDeviceAdminReceiver',
          },
          {
            title: 'Párosítás a JNR-XXXX kóddal és korcsoport választás',
            desc: 'Írd be a Szülői PWA-ban látható rövid párosító kódot (pl. JNR-9400), válaszd ki a gyermek korcsoportját (6–7, 8–9, 10–11 vagy 12–14 év) és a független olvasási módot (pl. Szimbólum + Noémi hang).',
            tip: 'Az Offline 8 jegyű Anti-Brick mesterkulcs ebben a pillanatban titkosítva létrejön mindkét eszközön.',
          },
          {
            title: 'Kioszk aktiválása és E.164 hívólista tesztelése',
            desc: 'Érintsd meg a Kioszk indítása gombot. A gyermek előtt megjelenik a színes Bento kezdőképernyő és a 3 másodperces SOS sáv.',
            tip: 'Próbáld ki a családi gyorshívást (+36 / +43 / +49) a hívásszűrő megerősítéséhez.',
          },
        ],
      },
      usb: {
        label: '2. Böngészős WebUSB',
        sub: 'Adatvesztés nélkül (/junear/usb-setup)',
        summary:
          'Meglévő, már belakott gyermek-telefon védelme gyári visszaállítás (factory reset) és parancssori ADB telepítése nélkül, közvetlenül Chrome vagy Edge böngészőből.',
        steps: [
          {
            title: 'JUNEAR telepítése a gyermek meglévő telefonjára',
            desc: 'Telepítsd a JUNEAR alkalmazást a gyermek Android telefonjára, de még ne zárold a felületet.',
            tip: 'Minden meglévő családi fénykép és helyi fájl érintetlen marad a telefonon!',
          },
          {
            title: 'Fejlesztői beállítások és USB-hibakeresés ideiglenes bekapcsolása',
            desc: 'A gyermek telefonján nyisd meg: Beállítások -> A telefonról -> érintsd meg 7-szer a „Build szám” sort, majd a Fejlesztői beállításokban kapcsold be az „USB-hibakeresés” (USB debugging) kapcsolót.',
            tip: 'A varázsló végén az USB-hibakeresést 1 érintéssel visszazárjuk.',
          },
          {
            title: 'Fiókok ideiglenes kijelentkeztetése a 60 mp-es beállítás idejére',
            desc: 'Az Android biztonsági szabálya miatt a Beállítások -> Fiókok menüben ideiglenesen távolítsd el a bejelentkezett Google-fióko(ka)t a kábeles aktiválás erejéig.',
            tip: 'FONTOS: Amint a Device Owner aktiválás (kb. 10 másodperc) lefutott, a szükséges fiók visszatehető.',
          },
          {
            title: 'USB-C csatlakoztatás & WebUSB 1-Kattintásos Varázsló indítása',
            desc: 'Kösd össze a gyermek telefonját USB-C adat-kábellel egy laptoppal/PC-vel (Chrome vagy Edge böngésző), nyisd meg a Szülői PWA /junear/usb-setup felületét, kattints a csatlakozásra, és hagyd jóvá az RSA kulcsot a telefon képernyőjén.',
            tip: 'A böngésző natív WebUSB protokollon keresztül futtatja le a hivatalos Device Owner parancsot:',
            codeBadge: 'dpm set-device-owner bond.gabba.junear/bond.gabba.junear.core.mdm.JunearDeviceAdminReceiver',
          },
          {
            title: 'USB-hibakeresés kikapcsolása és Kioszk lezárása',
            desc: 'Húzd ki a kábelt, kapcsold ki a Fejlesztői beállításokat, és párosítsd a telefont a JNR-XXXX kóddal.',
            tip: 'A telefon mostantól ugyanazzal a teljes Device Owner védelemmel fut, mint a gyári QR-kódos módban!',
          },
        ],
      },
      parent: {
        label: '3. Szülői PWA, Nagyszülők & Iskola',
        sub: '2+ Társszülő • Fotófal • classCode',
        summary:
          'Többfelnőttes családi és iskolai együttműködés szigorú eur3 GDPR adatvédelmi falakkal.',
        steps: [
          {
            title: '2. Egyenrangú Társszülő (Anya & Apa) meghívása',
            desc: 'A Szülői PWA „Hívólista & Kettős Kézfogás” fülén add hozzá a másik szülőt Társszülő Adminként (coParentUids). Mindkét szülő pontosan ugyanazokkal a jogokkal rendelkezik.',
            tip: ' mindkét szülő telefonszámánál kapcsold be a „2x Sürgősségi Áttörés” kapcsolót (3 percen belüli 2. híváskor néma módban is csörög).',
          },
          {
            title: 'Nagyszülők meghívása a Csak-Olvasási Családi Fotófalra',
            desc: 'Hívd meg a nagyszülőket „Családtag — Olvasási Fal” (familyMemberUids) szerepkörrel. Ők egy letisztult felületet kapnak a gyermek által megosztott <= 250 KB WebP fotókkal és gyorshívó gombokkal.',
            tip: 'A nagyszülők nem módosíthatnak véletlenül semmilyen Kioszk szabályt, és nem látják a GPS nyomkövetést.',
          },
          {
            title: 'Iskolai osztálykód (classCode) és allowedSchoolWindow megadása',
            desc: 'Ha a gyermek osztálya használja a JUNEAR Tanári Fókusz Konzolt, írd be az osztályfőnöktől kapott kódot (pl. SOPRON-3A), és állítsd be a tanítási időablakot (pl. H–P 07:45–15:30).',
            tip: 'A tanár SOHA nem látja a gyermek helyzetét, családi fotóit (!isTeacherRole), névjegyeit vagy üzeneteit.',
          },
          {
            title: 'Szülői Tiltólista & 1-Érintéses Szünidő / Betegnap Kapcsoló',
            desc: 'Add meg azokat az alkalmazás-csomagokat, amelyeket a tanár 45 perces tanórai feloldással sem nyithat meg. Ha a gyermek beteg, nyomd meg az 1-érintéses „Szünidő / Betegszabadság” gombot.',
            tip: 'Betegszabadság módban az összes tanórai fókusz zár azonnal felfüggesztődik.',
          },
        ],
      },
      antibrick: {
        label: '4. Kettős Anti-Brick Vésznyitó',
        sub: 'Távoli felhő + 100% Offline 8 jegyű kód',
        summary:
          'Garantált szülői vészkijárat minden élethelyzetre: online 1 kattintással, vagy térerő és SIM-kártya nélkül 8 jegyű matematikai mesterkóddal.',
        steps: [
          {
            title: '1. Útvonal (Online): Távoli Firestore Vészfeloldás (REMOTE_RELEASE)',
            desc: 'Nyisd meg a Szülői PWA „5. Hibrid MDM & Anti-Brick” fülét, és kattints a „Távoli Kioszk Vészfeloldás Indítása” gombra, majd erősítsd meg.',
            tip: 'Amint a gyermek telefonja Wi-Fi-re vagy mobilnetre csatlakozik, a RemoteMdmCommandListener azonnal feloldja a LockTask és Device Owner korlátozásokat.',
            codeBadge: 'mdmCommands/{cmdId} -> commandType: "REMOTE_RELEASE"',
          },
          {
            title: '2. Útvonal (100% Offline): 5 érintés a Kioszk Pajzs jelvényen',
            desc: 'Ha a telefon repülőgép módban van, nincs SIM-kártya vagy nincs térerő: érintsd meg gyorsan 5-ször a gyermek képernyőjének tetején látható „Kioszk Zár Aktív” pajzs ikont.',
            tip: 'A rendszer saját beépített numerikus billentyűzetet (OfflineUnlockSheet) nyit meg, így külső billentyűzet-alkalmazás sem szükséges.',
          },
          {
            title: 'Napi 8 jegyű HMAC-SHA256 Mesterkód beírása (XXXX-XXXX)',
            desc: 'Olvasd le a saját Szülői PWA-dban látható 8 jegyű kódot (pl. 7977-7033), és üsd be a gyermek telefonján.',
            tip: 'FONTOS: Az RFC 4226 HMAC-SHA256 algoritmus +/- 1 UTC nap óraeltérést is tolerál, 5 hibás próba után pedig 60 másodperces helyi védelmet alkalmaz.',
            codeBadge: 'HMAC_SHA256(secret, "JUNEAR-UNLOCK-V1:" + utcEpochDay)',
          },
        ],
      },
    },
  },
  de: {
    metaTitle: 'JUNEAR Einrichtungsanleitung — Werks-QR, WebUSB, Eltern-PWA & Anti-Brick | gabba',
    home: 'Startseite',
    backToJunear: 'Zurück zu JUNEAR',
    badge: '100% GOOGLE-PLAY-KONFORME HYBRID-EINRICHTUNG • EUR3',
    pageTitle: 'JUNEAR Einrichtungs- & Sicherheitsanleitung',
    pageSubtitle:
      'Wählen Sie den passenden Weg: 6-Tap Werks-QR für Neugeräte, Browser-WebUSB ohne Datenverlust für bestehende Handys, Familien-/Schul-Verknüpfung oder das duale Anti-Brick-Notfallsystem.',
    complianceCallout:
      'Nativer Android Enterprise DevicePolicyManager: JUNEAR nutzt keinerlei unsichere Bedienungshilfen (AccessibilityService) und enthält 0% Werbe-IDs (AD_ID).',
    stepWord: 'Schritt',
    markDoneBtn: 'Erledigt, nächster Schritt',
    resetBtn: 'Zurücksetzen',
    progressSuffix: 'Schritte erledigt',
    completedTitle: 'Alle Schritte in diesem Bereich erfolgreich abgeschlossen!',
    completedBody: 'Wechseln Sie zum nächsten Reiter oder kehren Sie zur JUNEAR-Übersicht zurück.',
    nextTabBtn: 'Weiter zum nächsten Reiter',
    tabs: {
      qr: {
        label: '1. Werks-QR (6-Tap)',
        sub: 'Für neue / zurückgesetzte Geräte',
        summary:
          'Maximaler, unlöschbarer Device-Owner-Schutz auf neuen oder zurückgesetzten Android-Smartphones komplett ohne Kabel.',
        steps: [
          {
            title: 'Eltern-PWA öffnen & DSGVO Art. 8 Einwilligung bestätigen',
            desc: 'Öffnen Sie die JUNEAR Eltern-Zentrale am eigenen Gerät, wählen Sie Ihre Sprache (DE/HU/EN) und bestätigen Sie die elterliche Verantwortung gemäß DSGVO Artikel 8.',
            tip: 'Funktioniert sofort auf iPhone (Safari -> Zum Home-Bildschirm), Android und Desktop.',
          },
          {
            title: '6-mal auf den Willkommensbildschirm des Kindergeräts tippen',
            desc: 'Schalten Sie das neue Android-Handy ein und tippen Sie auf der allerersten „Willkommen“-Seite 6-mal rasch auf eine freie Stelle.',
            tip: 'WICHTIG: Noch nicht auf „Starten“ tippen! Die 6 Tipps öffnen den integrierten Enterprise-QR-Scanner.',
          },
          {
            title: 'WLAN verbinden & JUNEAR-QR-Code scannen',
            desc: 'Verbinden Sie das WLAN und scannen Sie den in der Eltern-PWA angezeigten 6-Tap-QR-Code.',
            tip: 'Android prüft die SHA-256-Prüfsumme und aktiviert nativen Device-Owner-Schutz.',
            codeBadge: 'bond.gabba.junear/bond.gabba.junear.core.mdm.JunearDeviceAdminReceiver',
          },
          {
            title: 'Mit JNR-XXXX koppeln & Altersstufe / Lesemodus wählen',
            desc: 'Geben Sie den Kopplungscode (z.B. JNR-9400) ein und wählen Sie Altersstufe (6–7 bis 12–14) sowie den unabhängigen Lesemodus.',
            tip: 'Dabei wird automatisch das lokale Offline-Entsperrgeheimnis sicher synchronisiert.',
          },
          {
            title: 'Kiosk starten & E.164-Familienanruf testen',
            desc: 'Starten Sie den geschützten Bento-Bildschirm und testen Sie einen Kurzwahl-Anruf (+43 / +49 / +36).',
            tip: 'Unbekannte Rufnummern werden ab sofort lautlos gefiltert.',
          },
        ],
      },
      usb: {
        label: '2. Browser-WebUSB',
        sub: 'Ohne Datenverlust (/junear/usb-setup)',
        summary:
          'Aktiviert vollen Device-Owner-Schutz auf einem bereits genutzten Handy ohne Werksreset direkt über Chrome oder Edge per USB-C.',
        steps: [
          {
            title: 'JUNEAR-App auf dem bestehenden Kindergerät installieren',
            desc: 'Installieren Sie JUNEAR auf dem Android-Telefon des Kindes.',
            tip: 'Alle vorhandenen Fotos und lokalen Dateien bleiben vollständig erhalten!',
          },
          {
            title: 'Entwickleroptionen & USB-Debugging kurz aktivieren',
            desc: 'Unter Einstellungen -> Über das Telefon 7-mal auf „Build-Nummer“ tippen und danach in den Entwickleroptionen „USB-Debugging“ einschalten.',
            tip: 'Nach dem 60-Sekunden-Setup schalten wir USB-Debugging sofort wieder aus.',
          },
          {
            title: 'Google-Konten für den kurzen Setup-Moment abmelden',
            desc: 'Melden Sie unter Einstellungen -> Konten vorhandene Konten kurzzeitig ab, damit Android die Device-Owner-Ernennung zulässt.',
            tip: 'WICHTIG: Direkt nach der Aktivierung können benötigte Konten wieder hinzugefügt werden.',
          },
          {
            title: 'USB-C anschließen & WebUSB-Assistent starten',
            desc: 'Verbinden Sie das Handy per USB-C mit Ihrem Laptop/PC (Chrome/Edge), öffnen Sie /junear/usb-setup und bestätigen Sie den RSA-Dialog am Handy.',
            tip: 'Der Browser führt das offizielle Kommando ohne zusätzliche Treiber/CLI aus:',
            codeBadge: 'dpm set-device-owner bond.gabba.junear/bond.gabba.junear.core.mdm.JunearDeviceAdminReceiver',
          },
          {
            title: 'USB-Debugging deaktivieren & Kiosk koppeln',
            desc: 'Trennen Sie das Kabel, deaktivieren Sie die Entwickleroptionen und koppeln Sie das Gerät per JNR-XXXX.',
            tip: 'Das Gerät ist nun genauso stark geschützt wie nach einem Werks-QR-Setup!',
          },
        ],
      },
      parent: {
        label: '3. Eltern-PWA, Oma & Schule',
        sub: '2+ Co-Parents • Fotowand • classCode',
        summary:
          'Rollengerechte Zusammenarbeit für beide Elternteile, Großeltern und Lehrkräfte mit strikter DSGVO-Trennung.',
        steps: [
          {
            title: 'Zweiten gleichberechtigten Co-Parent einladen',
            desc: 'Fügen Sie den zweiten Elternteil als Co-Parent Admin (coParentUids) hinzu und aktivieren Sie für beide den 2x Notfall-Durchbruch.',
            tip: 'Beide Elternteile verwalten Kontakte, Aufgaben und Spielzeiten gleichberechtigt.',
          },
          {
            title: 'Großeltern zur schreibgeschützten Fotowand einladen',
            desc: 'Laden Sie Großeltern als Familienmitglied (familyMemberUids) ein: Sie sehen aktiv geteilte WebP-Fotos (<= 250 KB) und Direktwahl-Karten.',
            tip: 'Kein versehentliches Verstellen von Kiosk-Regeln und kein Zugriff auf GPS-Standorte.',
          },
          {
            title: 'Schul-Klassencode (classCode) & Schulfenster festlegen',
            desc: 'Tragen Sie den Klassencode (z.B. SOPRON-3A) und das erlaubte Zeitfenster (z.B. Mo–Fr 07:45–15:30) ein.',
            tip: 'Lehrkräfte sehen NIEMALS GPS, Familienfotos (!isTeacherRole), Kontakte oder Chats.',
          },
          {
            title: 'Eltern-Sperrliste & 1-Tap Ferien-/Krankheitstag nutzen',
            desc: 'Sperren Sie unerwünschte Apps global und nutzen Sie bei Krankheit den 1-Tap-Schalter zur sofortigen Aufhebung aller Schulsperren.',
            tip: 'Eltern behalten zu jeder Sekunde die oberste Hoheit über das Gerät.',
          },
        ],
      },
      antibrick: {
        label: '4. Dualer Anti-Brick-Notausgang',
        sub: 'Remote-Cloud + 100% Offline 8-Stellen-Code',
        summary:
          'Garantierte Eltern-Entsperrung in jeder Situation — online per Klick oder komplett offline ohne WLAN und ohne SIM-Karte.',
        steps: [
          {
            title: 'Pfad 1 (Online): 1-Klick Remote-Freigabe (REMOTE_RELEASE)',
            desc: 'Klicken Sie in der Eltern-PWA unter „Hybrid-MDM & Anti-Brick“ auf „Remote-Kiosk-Freigabe auslösen“.',
            tip: 'Sobald das Gerät WLAN oder Mobilfunk hat, werden alle Kiosk-Sperren sofort aufgehoben.',
            codeBadge: 'mdmCommands/{cmdId} -> commandType: "REMOTE_RELEASE"',
          },
          {
            title: 'Pfad 2 (100% Offline): 5x Tippen auf das Kiosk-Schild',
            desc: 'Bei Flugmodus oder Funkloch: Tippen Sie am Kindergerät 5-mal rasch auf das Abzeichen „Kiosk-Sperre aktiv“.',
            tip: 'Es öffnet sich ein eigenes Offline-Ziffernfeld (unabhängig von gesperrten Tastatur-Apps).',
          },
          {
            title: '8-stelligen HMAC-SHA256 Mastercode eingeben (XXXX-XXXX)',
            desc: 'Lesen Sie den aktuellen 8-stelligen Code (z.B. 7977-7033) in Ihrer Eltern-PWA ab und tippen Sie ihn am Kindergerät ein.',
            tip: 'WICHTIG: Funktioniert komplett ohne Internet (+/- 1 UTC-Tag Toleranz, 60s Schutzpause nach 5 Fehlversuchen).',
            codeBadge: 'HMAC_SHA256(secret, "JUNEAR-UNLOCK-V1:" + utcEpochDay)',
          },
        ],
      },
    },
  },
  en: {
    metaTitle: 'JUNEAR Setup Guide — 6-Tap QR, Zero-Wipe WebUSB, Parent PWA & Anti-Brick | gabba',
    home: 'Home',
    backToJunear: 'Back to JUNEAR',
    badge: '100% GOOGLE PLAY COMPLIANT HYBRID PROVISIONING • EUR3',
    pageTitle: 'JUNEAR Setup & Provisioning Guide',
    pageSubtitle:
      'Choose the setup flow that fits your family: 6-Tap Factory QR for new phones, zero-wipe Browser WebUSB for existing phones, Multi-Adult & Classroom linking, or the Dual Anti-Brick Escape Hatch.',
    complianceCallout:
      'Native Android Enterprise DevicePolicyManager protection: JUNEAR never uses fragile AccessibilityService workarounds and ships with 0% AD_ID tracking.',
    stepWord: 'Step',
    markDoneBtn: 'Done, next step',
    resetBtn: 'Reset progress',
    progressSuffix: 'steps completed',
    completedTitle: 'All steps completed in this section!',
    completedBody: 'Continue to the next setup tab or return to the JUNEAR overview.',
    nextTabBtn: 'Continue to next tab',
    tabs: {
      qr: {
        label: '1. Factory QR (6-Tap)',
        sub: 'For brand-new / reset phones',
        summary:
          'Unremovable native Device Owner enrollment on a fresh or factory-reset Android phone — zero cables or desktop computer required.',
        steps: [
          {
            title: 'Open the Parent PWA & complete GDPR Art. 8 Consent',
            desc: 'Open the JUNEAR Parent Hub on your own phone or computer, pick your language (HU/DE/EN), and tick the unchecked-by-default GDPR Article 8 parental responsibility declaration.',
            tip: 'Works seamlessly on iOS (Safari -> Add to Home Screen), Android, and desktop browsers.',
          },
          {
            title: 'Tap 6 times on the child phone’s Welcome screen',
            desc: 'Power on the fresh (or factory-reset) Android phone. On the very first “Welcome / Hi there” screen, tap an empty spot 6 times rapidly.',
            tip: 'IMPORTANT: Do not sign in first! Tapping 6 times launches Android’s built-in Enterprise QR scanner.',
          },
          {
            title: 'Connect Wi-Fi & scan the JUNEAR QR payload',
            desc: 'Join your Wi-Fi network and scan the QR matrix generated inside the Parent Hub’s “6-Tap Factory QR” modal.',
            tip: 'Android verifies the SHA-256 APK checksum and grants full Device Owner privileges.',
            codeBadge: 'bond.gabba.junear/bond.gabba.junear.core.mdm.JunearDeviceAdminReceiver',
          },
          {
            title: 'Pair via JNR-XXXX & choose AgeTier + LiteracyMode',
            desc: 'Enter the short pairing code (e.g. JNR-9400) and select the child’s visual AgeTier (6–7 to 12–14) and decoupled LiteracyMode.',
            tip: 'Your per-child Offline 8-digit Anti-Brick secret is provisioned into EncryptedSharedPreferences automatically.',
          },
          {
            title: 'Enter Kiosk Mode & test E.164 whitelist calling',
            desc: 'Activate the colorful Bento Home screen and test a whitelisted family call (+36 / +43 / +49).',
            tip: 'Unknown and scam numbers are now silently blocked before ringing.',
          },
        ],
      },
      usb: {
        label: '2. Browser WebUSB',
        sub: 'Zero data wipe (/junear/usb-setup)',
        summary:
          'Enroll full Device Owner protection on an already-used phone without factory reset or installing command-line ADB tools, right from Chrome or Edge.',
        steps: [
          {
            title: 'Install JUNEAR on the child’s existing Android phone',
            desc: 'Install the JUNEAR app on the phone while keeping all existing family photos and files intact.',
            tip: 'Zero factory reset is performed in this workflow!',
          },
          {
            title: 'Temporarily enable Developer Options & USB Debugging',
            desc: 'Open Settings -> About phone -> tap “Build number” 7 times, then toggle “USB debugging” ON inside Developer Options.',
            tip: 'You will turn Developer Options back OFF right after the 60-second handshake.',
          },
          {
            title: 'Temporarily sign out Google accounts during enrollment',
            desc: 'Android requires zero active accounts on the device at the exact moment Device Owner is granted. Temporarily remove accounts under Settings -> Accounts.',
            tip: 'IMPORTANT: As soon as enrollment finishes (~10 seconds), accounts can be added back if needed.',
          },
          {
            title: 'Connect USB-C & run the WebUSB 1-Click Wizard',
            desc: 'Plug the phone into a laptop/PC running Chrome or Edge, open /junear/usb-setup in the Parent PWA, click Connect, and accept the RSA prompt on the phone.',
            tip: 'WebUSB executes the official DevicePolicyManager enrollment command directly:',
            codeBadge: 'dpm set-device-owner bond.gabba.junear/bond.gabba.junear.core.mdm.JunearDeviceAdminReceiver',
          },
          {
            title: 'Disable USB Debugging & pair with JNR-XXXX',
            desc: 'Unplug the USB cable, turn Developer Options OFF, and enter your JNR-XXXX pairing code.',
            tip: 'Your child’s phone now runs with full unremovable Device Owner protection!',
          },
        ],
      },
      parent: {
        label: '3. Parent PWA, Grandparents & School',
        sub: '2+ Co-Parents • Photo Wall • classCode',
        summary:
          'Connect equal Co-Parents, read-only Extended Family members, and GDPR-isolated Classroom Teachers.',
        steps: [
          {
            title: 'Invite your 2nd Equal Co-Parent Admin',
            desc: 'In the Parent PWA “Whitelist & Double Handshake” tab, add the other parent to coParentUids and enable 2x Urgent Call Breakthrough.',
            tip: 'Both Co-Parents enjoy 100% symmetric control across iOS, Android, and Web.',
          },
          {
            title: 'Invite Grandparents to the Read-Only Photo Wall',
            desc: 'Add grandparents to familyMemberUids so they receive the clean Family Photo Wall (<= 250 KB WebP) and Speed-Dial cards.',
            tip: 'Extended family members cannot accidentally alter MDM rules or view child GPS tracking.',
          },
          {
            title: 'Link Classroom Teacher classCode & allowedSchoolWindow',
            desc: 'Enter the teacher’s classCode (e.g. SOPRON-3A) and set the school window (e.g. Mon–Fri 07:45–15:30).',
            tip: 'Teachers have ZERO access to GPS, sharedPhotos (!isTeacherRole), contacts, call logs, or chats.',
          },
          {
            title: 'Configure Parent Blacklist & 1-Tap Vacation / Sick-Day Mode',
            desc: 'Add any globally blacklisted Android packages and use the 1-Tap Vacation / Sick-Day switch whenever your child stays home.',
            tip: 'Vacation / Sick-Day Mode immediately overrides all classroom focus locks.',
          },
        ],
      },
      antibrick: {
        label: '4. Dual Anti-Brick Escape Hatch',
        sub: 'Remote Cloud + 100% Offline 8-Digit Code',
        summary:
          'Two independent guaranteed parent recovery paths — online in 1 click or 100% offline with zero Wi-Fi and zero SIM card.',
        steps: [
          {
            title: 'Path 1 (Online): 1-Click Remote Cloud Release (REMOTE_RELEASE)',
            desc: 'Open the Parent PWA “5. Hybrid MDM & Anti-Brick” tab and dispatch REMOTE_RELEASE with confirmation.',
            tip: 'Clears LockTask, app suspensions, and Device Owner restrictions as soon as the phone has connectivity.',
            codeBadge: 'mdmCommands/{cmdId} -> commandType: "REMOTE_RELEASE"',
          },
          {
            title: 'Path 2 (100% Offline): Tap the Kiosk Shield badge 5 times',
            desc: 'With zero Wi-Fi, zero mobile data, and zero SIM card: rapidly tap the “Kiosk Lock Active” shield badge 5 times on the child phone.',
            tip: 'Opens JUNEAR’s built-in LockTask-safe numeric keypad (OfflineUnlockSheet).',
          },
          {
            title: 'Enter the 8-digit HMAC-SHA256 Master Unlock Code (XXXX-XXXX)',
            desc: 'Read the 8-digit RFC 4226 code (e.g. 7977-7033) from your Parent PWA and enter it on the child phone.',
            tip: 'IMPORTANT: Verifies in constant time across +/- 1 UTC day clock drift with a 60s cooldown after 5 attempts.',
            codeBadge: 'HMAC_SHA256(secret, "JUNEAR-UNLOCK-V1:" + utcEpochDay)',
          },
        ],
      },
    },
  },
};

const TAB_ORDER: JunearSetupTab[] = ['qr', 'usb', 'parent', 'antibrick'];

function detectSetupLangFromUrl(): Lang | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang')?.toLowerCase();
  if (langParam === 'hu' || langParam === 'de' || langParam === 'en') {
    return langParam;
  }
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith('/hu/') || path === '/hu') return 'hu';
  if (path.startsWith('/de/') || path === '/de') return 'de';
  if (path.startsWith('/en/') || path === '/en') return 'en';
  return null;
}

function resolveInitialSetupLang(contextLang: string): Lang {
  const fromUrl = detectSetupLangFromUrl();
  if (fromUrl) return fromUrl;
  if (contextLang === 'hu') return 'hu';
  if (contextLang === 'de') return 'de';
  return 'en';
}

export function JunearSetupGuidePage({
  onNavigate,
  initialTab = 'qr',
  onContactClick,
}: {
  onNavigate: (route: any) => void;
  initialTab?: JunearSetupTab;
  onContactClick?: () => void;
}) {
  const { language } = useLanguage();
  const [lang, setLang] = useState<Lang>(() => resolveInitialSetupLang(language));
  const c = SETUP_COPY[lang];

  useEffect(() => {
    if (!detectSetupLangFromUrl()) {
      setLang(language === 'hu' || language === 'de' ? language : 'en');
    }
  }, [language]);

  const handleSelectLang = (nextLang: Lang) => {
    setLang(nextLang);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', nextLang);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  };

  const [tab, setTab] = useState<JunearSetupTab>(initialTab);
  const [doneMap, setDoneMap] = useState<Record<JunearSetupTab, number[]>>({
    qr: [],
    usb: [],
    parent: [],
    antibrick: [],
  });
  const [openStep, setOpenStep] = useState<number>(0);

  useEffect(() => {
    setTab(initialTab);
    setOpenStep(0);
  }, [initialTab]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prev = document.title;
    const prevHtmlLang = document.documentElement.lang;
    document.title = c.metaTitle;
    document.documentElement.lang = lang;
    return () => {
      document.title = prev;
      if (prevHtmlLang) document.documentElement.lang = prevHtmlLang;
    };
  }, [lang, c.metaTitle]);

  const activeCopy = c.tabs[tab];
  const completedSteps = doneMap[tab];
  const allDone = completedSteps.length === activeCopy.steps.length;

  const handleSelectTab = (next: JunearSetupTab) => {
    setTab(next);
    setOpenStep(0);
    if (next === 'usb') {
      onNavigate('junear-usb-setup');
    } else if (tab === 'usb') {
      onNavigate('junear-setup');
    }
  };

  const handleMarkStepDone = (idx: number) => {
    setDoneMap((prev) => {
      const exists = prev[tab].includes(idx);
      const nextList = exists ? prev[tab] : [...prev[tab], idx];
      return { ...prev, [tab]: nextList };
    });
    setOpenStep(idx + 1 < activeCopy.steps.length ? idx + 1 : -1);
  };

  const handleResetTab = () => {
    setDoneMap((prev) => ({ ...prev, [tab]: [] }));
    setOpenStep(0);
  };

  const nextTabIdx = (TAB_ORDER.indexOf(tab) + 1) % TAB_ORDER.length;

  const renderTabIcon = (key: JunearSetupTab) => {
    switch (key) {
      case 'qr':
        return <QrCode className="w-5 h-5" />;
      case 'usb':
        return <Usb className="w-5 h-5" />;
      case 'parent':
        return <Users className="w-5 h-5" />;
      case 'antibrick':
        return <WifiOff className="w-5 h-5" />;
    }
  };

  const stepIcons = [Smartphone, ShieldCheck, Lock, HeartHandshake, GraduationCap, KeyRound];

  return (
    <div className="bg-[#FDFBF7] text-[#1F2421] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Breadcrumb + Local JUNEAR Language Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#6E573D]"
          >
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center min-h-[32px] px-2 py-1 rounded-lg hover:text-[#1F2421] hover:bg-[#EFE9DF] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6952]"
            >
              {c.home}
            </button>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <button
              type="button"
              onClick={() => onNavigate('junear')}
              className="inline-flex items-center min-h-[32px] px-2 py-1 rounded-lg hover:text-[#1F2421] hover:bg-[#EFE9DF] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6952]"
            >
              JUNEAR
            </button>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-[#0E6952] font-bold px-1">{activeCopy.label}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label={
                lang === 'hu'
                  ? 'JUNEAR nyelvválasztó'
                  : lang === 'de'
                    ? 'JUNEAR Sprachauswahl'
                    : 'JUNEAR language selector'
              }
              className="inline-flex items-center gap-1 rounded-xl bg-white border border-[#D8CEBE] p-1 shadow-2xs"
            >
              {(['hu', 'de', 'en'] as const).map((code) => {
                const active = lang === code;
                const fullLabel =
                  code === 'hu' ? 'Magyar (HU)' : code === 'de' ? 'Deutsch (DE)' : 'English (EN)';
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleSelectLang(code)}
                    aria-pressed={active}
                    aria-label={fullLabel}
                    className={`inline-flex items-center justify-center min-h-[32px] min-w-[36px] px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6952] ${
                      active
                        ? 'bg-[#0E6952] text-white shadow-2xs'
                        : 'bg-transparent text-[#2C2C2C] hover:bg-[#F5F0EB]'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('junear')}
              className="inline-flex items-center min-h-[36px] px-3 py-1.5 rounded-xl bg-white border border-[#D8CEBE] hover:border-[#0E6952] text-xs font-bold text-[#1F2421] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6952]"
            >
              {c.backToJunear}
            </button>
          </div>
        </div>

        {/* Header */}
        <header className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCEFEA] border border-[#9FD4C5] text-xs font-extrabold text-[#134236]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0E6952]" />
            {c.badge}
          </span>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-[#E8DFD4] p-2 flex items-center justify-center shrink-0">
              <img
                src="/logos/junear-logo.png"
                alt="JUNEAR logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1F2421]">
              {c.pageTitle}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed">{c.pageSubtitle}</p>

          <div className="rounded-2xl bg-[#F1FAF8] border border-[#9FD4C5] p-4 flex items-start gap-3 text-xs sm:text-sm text-[#134236] font-medium">
            <Info className="w-5 h-5 text-[#0E6952] shrink-0 mt-0.5" />
            <div>
              <span>{c.complianceCallout}</span>
              {onContactClick && (
                <button
                  type="button"
                  onClick={onContactClick}
                  className="ml-2 underline font-bold text-[#0E6952] cursor-pointer"
                >
                  info@gabba.bond
                </button>
              )}
            </div>
          </div>
        </header>

        {/* 4 Interactive Setup Mode Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TAB_ORDER.map((key) => {
            const active = tab === key;
            const meta = c.tabs[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectTab(key)}
                className={`p-4 rounded-2xl border-2 text-left flex flex-col justify-between gap-2.5 transition-all cursor-pointer ${
                  active
                    ? 'bg-white border-[#0E6952] shadow-md'
                    : 'bg-white/70 border-[#E8DFD4] hover:border-[#C5A880]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      active ? 'bg-[#0E6952] text-white' : 'bg-[#F5F0EB] text-[#0E6952]'
                    }`}
                  >
                    {renderTabIcon(key)}
                  </span>
                  {active && <Check className="w-4 h-4 text-[#0E6952]" strokeWidth={3} />}
                </div>
                <div>
                  <div className="font-heading font-extrabold text-sm text-[#1F2421]">
                    {meta.label}
                  </div>
                  <div className="text-[11px] font-semibold text-[#6E573D] mt-0.5">{meta.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tab Summary + Progress Bar */}
        <div className="rounded-3xl bg-white border-2 border-[#E8DFD4] p-5 sm:p-6 space-y-4">
          <p className="text-sm sm:text-base font-semibold text-[#2C2C2C]">{activeCopy.summary}</p>
          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex-1 h-2.5 rounded-full bg-[#EFE9DF] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#0E6952] transition-all duration-300"
                style={{
                  width: `${Math.round((completedSteps.length / activeCopy.steps.length) * 100)}%`,
                }}
              />
            </div>
            <span className="font-bold text-[#6E6B65] whitespace-nowrap">
              {completedSteps.length}/{activeCopy.steps.length} {c.progressSuffix}
            </span>
            <button
              type="button"
              onClick={handleResetTab}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#5C5A56] hover:text-[#1F2421] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{c.resetBtn}</span>
            </button>
          </div>
        </div>

        {/* Step-by-Step Accordion */}
        <ol className="space-y-3.5">
          {activeCopy.steps.map((step, i) => {
            const StepIcon = stepIcons[i % stepIcons.length];
            const isDone = completedSteps.includes(i);
            const isOpen = openStep === i;
            const isImportant = /^(FONTOS|IMPORTANT|WICHTIG)/.test(step.tip);

            return (
              <li
                key={`${tab}-${i}`}
                className={`rounded-3xl border-2 bg-white overflow-hidden transition-all ${
                  isOpen
                    ? 'border-[#0E6952] shadow-md'
                    : isDone
                      ? 'border-[#9FD4C5]'
                      : 'border-[#E8DFD4]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenStep(isOpen ? -1 : i)}
                  className="w-full p-5 flex items-center gap-4 text-left cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-extrabold text-sm ${
                      isDone
                        ? 'bg-[#0E6952] text-white'
                        : isOpen
                          ? 'bg-[#1F2421] text-white'
                          : 'bg-[#F0EAE1] text-[#5C5A56]'
                    }`}
                  >
                    {isDone ? <Check className="w-5 h-5" strokeWidth={3} /> : i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E6952]">
                      {c.stepWord} {i + 1}
                    </div>
                    <div className="font-heading font-bold text-base sm:text-lg text-[#1F2421]">
                      {step.title}
                    </div>
                  </div>
                  <StepIcon className="w-5 h-5 text-[#6E573D] shrink-0" />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:pl-19 space-y-3.5">
                    <p className="text-sm sm:text-base text-[#4D524F] leading-relaxed">
                      {step.desc}
                    </p>

                    {step.codeBadge && (
                      <div className="rounded-xl bg-[#1F2421] text-[#A7F3D0] px-4 py-2.5 font-mono text-xs overflow-x-auto">
                        {step.codeBadge}
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed flex items-start gap-2.5 ${
                        isImportant
                          ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
                          : 'bg-[#FAF7F2] border-[#D8CEBE] text-[#5C5A56]'
                      }`}
                    >
                      <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#0E6952]" />
                      <span>{step.tip}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleMarkStepDone(i)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E6952] hover:bg-[#0F6B53] text-white text-xs sm:text-sm font-extrabold transition-colors cursor-pointer"
                    >
                      <span>{c.markDoneBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* Completion Banner */}
        {allDone && (
          <div className="rounded-3xl bg-[#1F2421] text-white p-7 sm:p-8 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#0E6952]/30 border border-[#0E6952] flex items-center justify-center">
              <Check className="w-7 h-7 text-[#8CE6CE]" strokeWidth={3} />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-extrabold">{c.completedTitle}</h2>
            <p className="text-sm text-stone-300">{c.completedBody}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectTab(TAB_ORDER[nextTabIdx])}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0E6952] hover:bg-[#0F6B53] text-white text-xs sm:text-sm font-extrabold cursor-pointer"
              >
                <span>
                  {c.nextTabBtn}: {c.tabs[TAB_ORDER[nextTabIdx]].label}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('junear')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-bold cursor-pointer"
              >
                {c.backToJunear}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JunearSetupGuidePage;
