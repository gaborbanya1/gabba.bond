import {
  LegalDocumentData,
  LegalLang,
  buildCoreEuSecuritySection,
} from './legalCore';

export const SENEAR_OPERATIONS_DOC: Record<LegalLang, LegalDocumentData> = {
  // ===========================================================================
  // HUNGARIAN (HU) — MŰKÖDÉSI ÉS ADATKEZELÉSI SZABÁLYZAT
  // ===========================================================================
  hu: {
    kind: 'operations',
    shortTabLabel: 'Működési Szabályzat',
    breadcrumbCurrent: 'Működési és Adatkezelési Szabályzat',
    badges: [
      'Kétoldalú Etikus Architektúra',
      'EU Felhőrégió: europe-west1',
      'Transzparens Műszaki Szabályzat',
    ],
    title: 'MŰKÖDÉSI ÉS ADATKEZELÉSI SZABÁLYZAT – SENEAR',
    subtitle:
      'Jelen Működési és Adatkezelési Szabályzat (Operational & Transparency Policy) átláthatóan, műszaki és folyamatbeli szinten rögzíti, hogyan működik a SENEAR kétkészülékes ökoszisztémája, a kétoldalú hozzájárulási kapu, a csalóhívás-szűrő, az SOS és zuhanásérzékelő protokoll, valamint az azonnali adattörlési és incidenskezelési mechanizmus.',
    effectiveDateValue: '2026. november 7.',
    quickSummaryTitle: 'A SENEAR Működési Alapelvei 4 Pontban',
    quickSummaryItems: [
      {
        title: 'Kettős Szerepkörű Felépítés',
        desc: 'Egyetlen Android app két szerepkörrel: zárolt Senior Kioszk kezdőképernyő a szülőnek, és távfelügyeleti Gondozói felület a családnak.',
      },
      {
        title: 'Helyi Csalószűrés (Whitelist)',
        desc: 'Az Android CallScreeningService közvetlenül a telefonon szűri ki az ismeretlen számokat — híváslisták felhőbe töltése nélkül.',
      },
      {
        title: '30 mp-es Téves Riasztás Védelem',
        desc: 'Zuhanás gyanújakor 30 másodperces hangos visszaszámlálás indul helyben, mielőtt bármilyen riasztás elhagyná a készüléket.',
      },
      {
        title: 'Delta-Sync & 0 mp Törlés',
        desc: 'Akkukímélő eseményvezérelt szinkronizáció és egynyomásos rekurzív adattörlés (0 másodperces felhőbeli megőrzéssel).',
      },
    ],
    operatorSectionTitle: '1. Üzemeltetői felelősség és rendszerszintű hatály',
    sections: [
      {
        id: 'system-architecture',
        number: '2',
        icon: 'smartphone',
        title: 'Kettős szerepkörű rendszerarchitektúra (Senior Kioszk vs. Gondozói vezérlőpult)',
        intro:
          'A SENEAR (bond.gabba.senear) egységes szoftvercsomagként települ, amely az első indításkor választott szerepkör szerint két eltérő biztonsági profilt aktivál:',
        subsections: [
          {
            subtitle: 'Senior (Gondozott) Kioszk profil',
            badge: 'Elállíthatatlan Kezdőképernyő',
            paragraphs: [
              'Alapértelmezett Android kezdőképernyőként (HOME Launcher) működik extra nagy kontraszttal, 4 (nagy kijelzőn opcionálisan 6) fényképes hívógombbal és dedikált piros SOS sávval.',
              'Megakadályozza a véletlen átállítást, a hangerő lenémítását és az ismeretlen menükbe való eltévedést; az adminisztrációs beállítások PIN/hosszú érintés védelemmel zároltak.',
            ],
          },
          {
            subtitle: 'Caregiver (Gondozó) családi profil',
            badge: 'Távoli Segítségnyújtás',
            paragraphs: [
              'Hitelesített Firebase-fiókkal rendelkező családtagok számára biztosít távoli gyorstárcsázó-szerkesztést, hangerő-visszaállítást, napi rutinok beállítását, töltöttség- és Otthoni Zóna visszajelzést.',
              'Egy Senior készülékhez legfeljebb 4 meghatalmazott családtag csatlakozhat párhuzamosan.',
            ],
          },
        ],
      },
      {
        id: 'bilateral-pairing-protocol',
        number: '3',
        icon: 'users',
        title: 'Kétoldalú 6-jegyű párosítási és hozzájárulás-naplózási protokoll',
        intro:
          'A SENEAR kizárja a tudtán kívüli távoli csatlakozást egy többlépcsős kriptográfiai és jogi jóváhagyási folyamattal:',
        bullets: [
          {
            label: '1. lépés – Gondozotti jóváhagyás és kódgenerálás:',
            text: 'A 6-jegyű ideiglenes párosító kód mindaddig nem jön létre, amíg a Gondozott készülékén az „Elfogadom” gombbal jóvá nem hagyják az adatmegosztási tájékoztatót. Ekkor rögzül a seniorConsentAccepted: true állapot és az UTC időbélyeg.',
          },
          {
            label: '2. lépés – Gondozói jognyilatkozat és összekapcsolás:',
            text: 'A Gondozó készülékén a kódbeviteli mező csak a felelősségi nyilatkozat elfogadása (caregiverConsentAccepted: true + UTC időbélyeg) után válik aktívvá. A lejárati idővel védett 6-jegyű kód sikeres beváltása után épül fel a titkosított kapcsolat.',
          },
          {
            label: '3. lépés – Automatikus elsődleges hívógomb-feltöltés:',
            text: 'Sikeres párosításkor a Gondozó neve és telefonszáma automatikusan bekerül a Senior készülék első szabad gyorstárcsázó csempéjébe (1–4. csempe), így az idős hozzátartozó azonnal egyetlen érintéssel elérheti gondozóját.',
          },
        ],
      },
      {
        id: 'anti-scam-call-shield',
        number: '4',
        icon: 'phone-call',
        title: 'Telefonos csalásvédelem (Anti-Scam Whitelist) és Kioszk SMS működése',
        intro:
          'Az időseket célzó telefonos csalások (unokázós és banki adathalász hívások) kivédésére a SENEAR helyi szűrést alkalmaz:',
        bullets: [
          {
            label: 'Helyi CallScreeningService fehérlista (Whitelist):',
            text: 'Bekapcsolt védelemnél az Android hivatalos CallScreeningService felülete helyben, a készüléken veti össze a bejövő hívószámot a jóváhagyott névjegyek listájával. Az ismeretlen hívószámokat a telefon kicsörgés nélkül elutasítja vagy némítja, miközben a hívásnapló nem kerül fel külső szerverre.',
          },
          {
            label: 'Nagybetűs SMS-megjelenítés és védett kihangosítás:',
            text: 'A bejövő üzenetek olvasható, nagybetűs kártyaként jeleníthetők meg a Kioszk képernyőn, a párosított gondozók hívásaihoz pedig opcionálisan bekapcsolható a kihangosított automatikus hívásfogadás arra az esetre, ha az idős fél nem éri el időben a telefont.',
          },
        ],
      },
      {
        id: 'sos-fall-geofence-ops',
        number: '5',
        icon: 'activity',
        title: 'SOS riasztási lánc, helyi zuhanásérzékelés és Otthoni Biztonsági Zóna',
        intro:
          'A vészhelyzeti funkciók a gyors családi értesítést és a szigorú adattakarékosságot ötvözik:',
        bullets: [
          {
            label: 'Többcsatornás SOS riasztás:',
            text: 'A piros SOS gomb megnyomásakor a készülék párhuzamosan magas prioritású felhő-riasztást (FCM push + aktuális GPS-koordináta), opcionális vészhelyzeti SMS-t és közvetlen telefonhívást indít a kijelölt gondozó(k) felé.',
          },
          {
            label: '100%-ban készüléken belüli zuhanásérzékelés (30 mp-es visszaszámlálással):',
            text: 'A gyorsulásmérő szenzoradatok kiértékelése kizárólag a telefon memóriájában történik (nyers szenzoradat soha nem hagyja el a telefont). Hirtelen becsapódás/esés mintázat esetén a telefon 30 másodpercig jól hallható hangjelzést és teljes képernyős „Jól vagyok – Mégse” gombot jelenít meg; riasztás csak akkor megy ki, ha a visszaszámlálás megszakítás nélkül lejár.',
          },
          {
            label: 'Felülírásos (Overwrite-in-Place) Otthoni Biztonsági Zóna:',
            text: 'A Gondozó által kijelölt Otthoni Zóna elhagyásakor vagy oda történő visszatéréskor értesítés képződik. A SENEAR nem tárol folyamatos útvonal-előzményt: az aktuális pozíció mindig felülírja a korábbi koordinátát.',
          },
        ],
      },
      {
        id: 'webrtc-photo-pipeline',
        number: '6',
        icon: 'lock',
        title: 'Titkosított P2P WebRTC hívások és Zero-Storage Base64 fotókezelés',
        intro:
          'A családi kommunikáció és a fényképes felület külső médiatárolók bevonása nélkül működik:',
        bullets: [
          {
            label: 'Végpontok közötti DTLS-SRTP WebRTC kapcsolat:',
            text: 'Az alkalmazáson belüli Wi-Fi/mobilnet hang- és videóhívások közvetlen P2P titkosítást használnak (tűzfal esetén titkosított TURN átjátszóval). A hívásjelzési metaadatok a beszélgetés végén azonnal törlődnek, hang- vagy képfelvétel soha nem készül. Aktív híváskor a Senior telefon hangjelzést ad és teljes képernyős élő visszajelzést mutat nagy piros bontógombbal.',
          },
          {
            label: 'Helyi 300×300px Base64 képtömörítés:',
            text: 'A gyorstárcsázó csempék és emlékeztetők fotóit az alkalmazás feltöltés előtt helyben 300×300 pixelre vágja és tömöríti, majd titkosított Base64 karakterláncként tárolja az EU-s Firestore dokumentumban — nyilvános képlinkek (URL) létrehozása nélkül.',
          },
        ],
      },
      {
        id: 'oem-battery-resilience',
        number: '7',
        icon: 'smartphone',
        title: 'Üzemeltetési rendelkezésre állás, Delta-Sync és OEM akkumulátorvédelem',
        intro:
          'Az okostelefon-gyártók (Xiaomi HyperOS/MIUI, Samsung One UI, Huawei, OPPO) eltérő háttérkorlátozásai miatt a SENEAR proaktív diagnosztikát alkalmaz:',
        bullets: [
          {
            label: 'Eseményvezérelt Delta-Sync telemetria:',
            text: 'A folyamatos akkumulátormerítés helyett a Senior készülék csak érdemi állapotváltozáskor (töltöttségi küszöb, töltőre csatlakoztatás, időszakos életjel) küld kis méretű állapotfrissítést.',
          },
          {
            label: 'Gyártóspecifikus öndiagnosztika és beállítási segédlet:',
            text: 'Ha az operációs rendszer korlátozza a háttérfolyamatokat, az alkalmazás és a https://gabba.bond/senear/setup videós útmutató lépésről lépésre megmutatja a szükséges akkumulátor-kivétel bekapcsolását.',
          },
        ],
      },
      buildCoreEuSecuritySection('hu', '8'),
      {
        id: 'deletion-incident-response',
        number: '9',
        icon: 'trash',
        title: 'Rekurzív adattörlési folyamat és 72 órás incidenskezelési protokoll',
        intro:
          'Az adatéletciklus lezárását és az esetleges biztonsági események kezelését automatizált és szigorú eljárásrend védi:',
        bullets: [
          {
            label: 'Azonnali rekurzív adattörlés (0 másodperces megőrzés):',
            text: 'Amikor a Gondozó vagy a Gondozott megnyomja a végleges GDPR adattörlés gombot, a szerveroldali folyamat atomi művelettel törli a profilokat, névjegyeket, Base64 fotókat, rutinokat, riasztási naplókat, párosító kódokat és valós idejű jelenléti csomópontokat, majd alaphelyzetbe állítja a helyi tárhelyet.',
          },
          {
            label: 'GDPR 33–34. cikk szerinti 72 órás incidenskezelés:',
            text: 'Személyes adatokat érintő biztonsági incidens észlelése esetén az Üzemeltető haladéktalanul megkezdi a technikai elhárítást, és amennyiben az incidens kockázattal jár az érintettek jogaira nézve, 72 órán belül bejelentést tesz az illetékes felügyeleti hatóságnál (NAIH), magas kockázat esetén pedig közvetlenül tájékoztatja az érintett felhasználókat is.',
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // GERMAN (DE) — BETRIEBS- & TRANSPARENZRICHTLINIE
  // ===========================================================================
  de: {
    kind: 'operations',
    shortTabLabel: 'Betriebsrichtlinie',
    breadcrumbCurrent: 'Betriebs- & Transparenzrichtlinie',
    badges: [
      'Beidseitige Ethische Architektur',
      'EU-Cloud-Region: europe-west1',
      'Technische Transparenzrichtlinie',
    ],
    title: 'BETRIEBS- & TRANSPARENZRICHTLINIE – SENEAR',
    subtitle:
      'Diese Betriebs- und Transparenzrichtlinie beschreibt transparent die technische Funktionsweise des SENEAR-Zweigeräte-Ökosystems, das beidseitige Kopplungsverfahren, den lokalen Anti-Scam-Anruffilter, die SOS- und Sturzerkennungsabläufe sowie das Lösch- und Sicherheitsvorfall-Protokoll.',
    effectiveDateValue: '7. November 2026',
    quickSummaryTitle: 'Die 4 technischen Grundprinzipien von SENEAR',
    quickSummaryItems: [
      {
        title: 'Duale Rollenarchitektur',
        desc: 'Eine Android-App mit zwei klaren Rollen: geschützter Senioren-Kiosk-Startbildschirm und Fernunterstützungs-Cockpit für Angehörige.',
      },
      {
        title: 'Lokaler Anti-Scam-Schutz',
        desc: 'Der Android CallScreeningService blockiert unbekannte Anrufer direkt auf dem Telefon – ohne Cloud-Upload von Anruflisten.',
      },
      {
        title: '30-Sek.-Fehlalarmschutz',
        desc: 'Bei erkanntem Sturz startet lokal ein 30-sekündiger akustischer Countdown mit Abbruchtaste, bevor ein Alarm gesendet wird.',
      },
      {
        title: 'Delta-Sync & 0-Sek.-Wipe',
        desc: 'Akkuschonende ereignisbasierte Synchronisation und sofortige rekursive Datenlöschung (0 Sekunden Cloud-Aufbewahrung).',
      },
    ],
    operatorSectionTitle: '1. Betreiberverantwortung & Systemgeltungsbereich',
    sections: [
      {
        id: 'system-architecture',
        number: '2',
        icon: 'smartphone',
        title: 'Duale Systemarchitektur (Senioren-Kiosk vs. Betreuer-Cockpit)',
        intro:
          'SENEAR (bond.gabba.senear) wird als einheitliches Anwendungspaket installiert, das je nach gewählter Rolle zwei getrennte Sicherheitsprofile bereitstellt:',
        subsections: [
          {
            subtitle: 'Senior-Kiosk-Profil (Elternteil)',
            badge: 'Verstellgeschützter Launcher',
            paragraphs: [
              'Arbeitet als geschützter Android-Startbildschirm (HOME Launcher) mit maximalem Kontrast, 4 (optional 6) großen Foto-Kurzwahlkacheln und einer festen roten SOS-Leiste.',
              'Schützt zuverlässig vor versehentlichem Stummschalten oder Verstellen; Verwaltungsmenüs sind gegen unbeabsichtigte Berührungen gesichert.',
            ],
          },
          {
            subtitle: 'Caregiver-Profil (Familienangehörige)',
            badge: 'Sichere Fernverwaltung',
            paragraphs: [
              'Ermöglicht authentifizierten Angehörigen die Fernpflege von Fotokontakten, Klingellautstärke, Tagesroutinen sowie die Einsicht in Akkustand und Sichere Heimzone.',
              'Bis zu 4 autorisierte Angehörige können gleichzeitig mit einem Seniorengerät verbunden werden.',
            ],
          },
        ],
      },
      {
        id: 'bilateral-pairing-protocol',
        number: '3',
        icon: 'users',
        title: 'Beidseitiges 6-stelliges Kopplungs- & Einwilligungsprotokoll',
        intro:
          'SENEAR verhindert technisch jede unbemerkte Fernkopplung durch einen mehrstufigen Freigabeprozess:',
        bullets: [
          {
            label: 'Schritt 1 – Freigabe auf dem Seniorengerät:',
            text: 'Der temporäre 6-stellige Kopplungscode wird erst erzeugt, nachdem auf dem Seniorengerät der Hinweis zur Datenfreigabe aktiv bestätigt wurde (Protokollierung von seniorConsentAccepted: true mit UTC-Zeitstempel).',
          },
          {
            label: 'Schritt 2 – Rechtserklärung der Betreuungsperson:',
            text: 'Auf dem Betreuergerät wird die Codeeingabe erst freigeschaltet, nachdem die Betreuungsperson ihre Berechtigung verbindlich bestätigt hat (caregiverConsentAccepted: true mit UTC-Zeitstempel).',
          },
          {
            label: 'Schritt 3 – Automatische Kurzwahl-Belegung:',
            text: 'Nach erfolgreicher Kopplung werden Name und Telefonnummer der Betreuungsperson automatisch auf die erste freie Kurzwahlkachel (Platz 1–4) des Seniors gelegt.',
          },
        ],
      },
      {
        id: 'anti-scam-call-shield',
        number: '4',
        icon: 'phone-call',
        title: 'Anti-Scam-Anrufschutz (Whitelist) & Großschrift-SMS im Kiosk-Modus',
        intro:
          'Zum Schutz vor Telefonbetrug (z. B. Enkeltrick oder Schockanrufe) arbeitet die Anrufprüfung vollständig lokal:',
        bullets: [
          {
            label: 'Lokale Whitelist-Prüfung via Android CallScreeningService:',
            text: 'Bei aktiviertem Anrufschutz gleicht das Seniorengerät eingehende Rufnummern lokal mit den freigegebenen Kontakten ab. Unbekannte Nummern werden lautlos abgewiesen, ohne dass das Telefon klingelt und ohne dass Anrufprotokolle in die Cloud hochgeladen werden.',
          },
          {
            label: 'Großformatige SMS-Anzeige & Freisprech-Option:',
            text: 'Eingehende SMS können übersichtlich in Großschrift auf dem Kiosk-Bildschirm gelesen werden; für autorisierte Betreuer lässt sich optional eine automatische Freisprech-Annahme aktivieren.',
          },
        ],
      },
      {
        id: 'sos-fall-geofence-ops',
        number: '5',
        icon: 'activity',
        title: 'SOS-Alarmkette, lokale Sturzerkennung & Sichere Heimzone (Geofencing)',
        intro:
          'Alle Notfall- und Schutzmechanismen verbinden rasche Familienbenachrichtigung mit strikter Datensparsamkeit:',
        bullets: [
          {
            label: 'Mehrkanalige SOS-Eskalation:',
            text: 'Beim Auslösen der roten SOS-Taste sendet SENEAR parallel einen hochpriorisierten Cloud-Push-Alarm (inkl. aktuellem GPS-Standort), optional eine Notfall-SMS und startet den direkten Telefonanruf an die hinterlegten Betreuungspersonen.',
          },
          {
            label: '100 % lokale Sturzerkennung mit 30-Sekunden-Countdown:',
            text: 'Beschleunigungssensoren werden ausschließlich lokal im Arbeitsspeicher ausgewertet (Rohdaten verlassen nie das Gerät). Bei erkanntem Sturz ertönt 30 Sekunden lang ein deutliches Warnsignal mit großem „Mir geht es gut – Abbrechen“-Button, bevor eine Meldung versendet wird.',
          },
          {
            label: 'Überschreibendes Geofencing ohne Bewegungsprofil:',
            text: 'Beim Verlassen oder Betreten der definierten Heimzone wird eine Benachrichtigung ausgelöst. Es wird keine historische Routenaufzeichnung gespeichert; jede neue Koordinate überschreibt den vorherigen Statuswert.',
          },
        ],
      },
      {
        id: 'webrtc-photo-pipeline',
        number: '6',
        icon: 'lock',
        title: 'Verschlüsselte P2P-WebRTC-Anrufe & Zero-Storage Base64-Fotopipeline',
        intro:
          'Sprach-/Videoverbindungen und Kontaktbilder kommen vollständig ohne öffentliche Medienserver aus:',
        bullets: [
          {
            label: 'Ende-zu-Ende-verschlüsseltes WebRTC (DTLS-SRTP):',
            text: 'App-interne Anrufe sind durchgehend verschlüsselt; Signalisierungsdaten werden unmittelbar nach Gesprächsende gelöscht und Gespräche niemals aufgezeichnet. Auf dem Seniorengerät signalisieren Ton und Vollbildanzeige jedes aktive Gespräch.',
          },
          {
            label: 'Lokale 300×300px Base64-Bildkomprimierung:',
            text: 'Kontakt- und Erinnerungsfotos werden lokal auf 300×300 Pixel skaliert und als verschlüsselte Base64-Zeichenkette direkt im geschützten EU-Firestore-Dokument abgelegt – ohne öffentliche Bild-URLs.',
          },
        ],
      },
      {
        id: 'oem-battery-resilience',
        number: '7',
        icon: 'smartphone',
        title: 'Systemverfügbarkeit, Delta-Sync & OEM-Energiemanagement',
        intro:
          'Da Smartphone-Hersteller (Xiaomi, Samsung, Huawei u. a.) Hintergrunddienste unterschiedlich behandeln, nutzt SENEAR ressourcenschonende Mechanismen:',
        bullets: [
          {
            label: 'Akkuschonender Event-Delta-Sync:',
            text: 'Das Seniorengerät überträgt Statusänderungen ereignisgesteuert statt in dauerhaften Hochfrequenz-Schleifen, um die Akkulaufzeit alter Zweitgeräte zu schonen.',
          },
          {
            label: 'Transparente Hersteller-Einrichtungshilfe:',
            text: 'Erkennt die App aktive Hintergrundbeschränkungen, verweist sie direkt auf die bebilderte und videogestützte Anleitung unter https://gabba.bond/senear/setup.',
          },
        ],
      },
      buildCoreEuSecuritySection('de', '8'),
      {
        id: 'deletion-incident-response',
        number: '9',
        icon: 'trash',
        title: 'Rekursives Löschverfahren & 72-Stunden-Sicherheitsvorfallprotokoll',
        intro:
          'Datenlöschung und Vorfallreaktion folgen verbindlichen technischen Abläufen:',
        bullets: [
          {
            label: 'Sofortige rekursive Komplettlöschung (0 Sekunden Aufbewahrung):',
            text: 'Wird in der App die DSGVO-Löschung ausgelöst, entfernt der Serverprozess sofort sämtliche Profile, Kontakte, Base64-Fotos, Tagesroutinen, Alarmprotokolle, Kopplungscodes und Echtzeitknoten und leert den lokalen App-Speicher.',
          },
          {
            label: '72-Stunden-Meldeprotokoll nach Art. 33 & 34 DSGVO:',
            text: 'Bei Bekanntwerden einer Verletzung des Schutzes personenbezogener Daten leitet der Betreiber unverzüglich Gegenmaßnahmen ein, meldet meldepflichtige Vorfälle binnen 72 Stunden an die zuständige Aufsichtsbehörde (NAIH) und benachrichtigt bei hohem Risiko unverzüglich die betroffenen Nutzer.',
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // ENGLISH (EN) — OPERATIONAL & TRANSPARENCY POLICY
  // ===========================================================================
  en: {
    kind: 'operations',
    shortTabLabel: 'Operational Policy',
    breadcrumbCurrent: 'Operational & Transparency Policy',
    badges: [
      'Bilateral Ethical Architecture',
      'EU Cloud Region: europe-west1',
      'Technical Transparency Policy',
    ],
    title: 'OPERATIONAL & TRANSPARENCY POLICY – SENEAR',
    subtitle:
      'This Operational & Transparency Policy documents the real-world technical architecture, bilateral pairing workflow, local anti-scam call shield, SOS and fall-detection protocols, OEM battery resilience, and instant data-erasure & security incident procedures of SENEAR.',
    effectiveDateValue: 'November 7, 2026',
    quickSummaryTitle: '4 Core Operational Principles of SENEAR',
    quickSummaryItems: [
      {
        title: 'Dual-Role Architecture',
        desc: 'One unified Android package with two roles: a locked Senior Kiosk Launcher for parents and a Remote Caregiver Dashboard for family.',
      },
      {
        title: 'On-Device Scam Shield',
        desc: 'Android CallScreeningService filters unknown callers 100% locally on the Senior phone—without uploading call logs to the cloud.',
      },
      {
        title: '30s False-Alarm Guard',
        desc: 'Accelerometer fall detection runs in local RAM and plays a 30-second audible cancellation countdown before dispatching any alert.',
      },
      {
        title: 'Delta-Sync & 0s Wipe',
        desc: 'Battery-friendly event-driven synchronization paired with instant recursive cloud & local deletion (0-second retention).',
      },
    ],
    operatorSectionTitle: '1. Operational Governance & System Scope',
    sections: [
      {
        id: 'system-architecture',
        number: '2',
        icon: 'smartphone',
        title: 'Dual-Role System Architecture (Senior Kiosk vs. Caregiver Dashboard)',
        intro:
          'SENEAR (bond.gabba.senear) ships as a single verified Android build that activates one of two isolated operational profiles during initial setup:',
        subsections: [
          {
            subtitle: 'Senior Kiosk Launcher Profile',
            badge: 'Tamper-Proof Home Screen',
            paragraphs: [
              'Operates as the default Android HOME Launcher featuring maximum-contrast typography, 4 (or optionally 6 on large screens) oversized photo speed-dial tiles, and a dedicated red SOS bar.',
              'Prevents accidental muting, settings changes, or getting lost in system menus; administrative settings remain protected behind an intentional caregiver gesture/PIN.',
            ],
          },
          {
            subtitle: 'Family Caregiver Remote Profile',
            badge: 'Authenticated Assistance',
            paragraphs: [
              'Provides authenticated family members with remote photo contact management, ringer volume restoration, daily routine scheduling, battery monitoring, and Home Safe Zone alerts.',
              'Up to 4 authorized family Caregivers can connect concurrently to a Senior device.',
            ],
          },
        ],
      },
      {
        id: 'bilateral-pairing-protocol',
        number: '3',
        icon: 'users',
        title: 'Bilateral 6-Digit Pairing & Consent Audit Protocol',
        intro:
          'SENEAR prevents covert or unauthorized device linking through a mandatory two-sided handshake:',
        bullets: [
          {
            label: 'Step 1 – Senior Disclosure & Temporary Code Generation:',
            text: 'The time-limited 6-digit pairing code is hidden by default and generated only after the Senior taps "Accept" on a clear, high-contrast data-sharing disclosure (recording seniorConsentAccepted: true + UTC timestamp).',
          },
          {
            label: 'Step 2 – Caregiver Legal Declaration & Handshake:',
            text: 'On the Caregiver phone, the code entry input unlocks only after the Caregiver confirms explicit authorization (caregiverConsentAccepted: true + UTC timestamp).',
          },
          {
            label: 'Step 3 – Automatic Caregiver Speed-Dial Population:',
            text: 'Upon pairing, the Caregiver’s name and phone number automatically populate the Senior’s first available speed-dial tile (Slots 1–4) for immediate one-tap calling.',
          },
        ],
      },
      {
        id: 'anti-scam-call-shield',
        number: '4',
        icon: 'phone-call',
        title: 'On-Device Anti-Scam Whitelist Call Shield & Kiosk SMS',
        intro:
          'To protect older adults against phone fraud and impersonation scams, call filtering runs strictly on-device:',
        bullets: [
          {
            label: 'Local Whitelist Verification via CallScreeningService:',
            text: 'When enabled, Android’s CallScreeningService checks incoming caller IDs locally against approved SENEAR contacts. Unknown numbers are silently rejected before the phone ever rings—without uploading call logs to external servers.',
          },
          {
            label: 'Large-Print Kiosk SMS & Trusted Speakerphone Auto-Answer:',
            text: 'Incoming SMS messages can be displayed in a clean, large-print Kiosk card, and families can optionally enable speakerphone auto-answer exclusively for paired Caregivers.',
          },
        ],
      },
      {
        id: 'sos-fall-geofence-ops',
        number: '5',
        icon: 'activity',
        title: 'SOS Escalation Chain, Local Fall Detection & Overwrite-in-Place Geofencing',
        intro:
          'Safety workflows combine rapid multi-channel family notification with strict data minimization:',
        bullets: [
          {
            label: 'Multi-Channel SOS Dispatch:',
            text: 'Pressing the red SOS button simultaneously dispatches a high-priority FCM push alert (with current GPS location), an optional emergency SMS, and a direct voice call to designated Caregivers.',
          },
          {
            label: '100% On-Device Fall Detection with 30-Second Cancellation Window:',
            text: 'Accelerometer evaluation runs entirely in local RAM (raw motion data never leaves the phone). If a severe impact/fall pattern is detected, a loud 30-second countdown with a full-screen "I’m OK – Cancel" button appears before any alert is transmitted.',
          },
          {
            label: 'Overwrite-in-Place Home Safe Zone (Zero Breadcrumb Trails):',
            text: 'Entry/exit transitions across the Caregiver-defined Home Safe Zone trigger alerts without storing historical movement routes; each location update overwrites the prior state.',
          },
        ],
      },
      {
        id: 'webrtc-photo-pipeline',
        number: '6',
        icon: 'lock',
        title: 'Encrypted P2P WebRTC Calling & Zero-Storage Base64 Photo Pipeline',
        intro:
          'Both live family calls and contact portraits avoid third-party media hosting:',
        bullets: [
          {
            label: 'End-to-End Encrypted DTLS-SRTP WebRTC Calls:',
            text: 'In-app Wi-Fi/mobile calls use encrypted peer-to-peer WebRTC (with encrypted TURN fallback behind strict NATs). Signaling metadata is purged in 0 seconds upon call end, calls are never recorded, and the Senior phone always plays audible tones and displays a full-screen live banner.',
          },
          {
            label: 'Local 300×300px Base64 Image Compression:',
            text: 'Contact and reminder photos are cropped and compressed locally (300×300px) prior to sync and stored as encrypted Base64 strings inside our EU Firestore database—never exposed on public CDN URLs.',
          },
        ],
      },
      {
        id: 'oem-battery-resilience',
        number: '7',
        icon: 'smartphone',
        title: 'Service Availability, Delta-Sync Telemetry & OEM Battery Saver Handling',
        intro:
          'Because Android OEMs (Xiaomi, Samsung, Huawei, OPPO) enforce aggressive background task killers, SENEAR includes built-in resilience:',
        bullets: [
          {
            label: 'Battery-Friendly Event Delta-Sync:',
            text: 'Instead of constant high-frequency polling, the Senior phone transmits compact delta updates on meaningful state changes (battery thresholds, charger plug/unplug, periodic heartbeat) to preserve battery life on older phones.',
          },
          {
            label: 'OEM Diagnostics & Step-by-Step Video Guides:',
            text: 'If OS battery optimization restricts background protection, SENEAR alerts the Caregiver and links to brand-specific setup instructions at https://gabba.bond/senear/setup.',
          },
        ],
      },
      buildCoreEuSecuritySection('en', '8'),
      {
        id: 'deletion-incident-response',
        number: '9',
        icon: 'trash',
        title: 'Recursive Data Erasure Workflow & 72-Hour Security Incident Protocol',
        intro:
          'Data lifecycle termination and security incident handling follow deterministic procedures:',
        bullets: [
          {
            label: 'Instant Recursive One-Tap Wipe (0-Second Cloud Retention):',
            text: 'Triggering GDPR deletion inside either Senior or Caregiver mode atomically purges profiles, contacts, Base64 photos, routines, alert logs, pairing codes, and realtime presence nodes in europe-west1 while clearing local SharedPreferences.',
          },
          {
            label: 'GDPR Art. 33 & 34 72-Hour Incident Response:',
            text: 'In the event of any personal data breach, the Operator immediately initiates containment and remediation, notifies the competent supervisory authority (NAIH) within 72 hours where required by GDPR Art. 33, and directly informs affected users without undue delay whenever high risk arises.',
          },
        ],
      },
    ],
  },
};
