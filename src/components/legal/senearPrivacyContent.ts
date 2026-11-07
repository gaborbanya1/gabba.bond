import {
  DeletionHeroData,
  LegalDocumentData,
  LegalLang,
  buildCoreEuSecuritySection,
  buildCoreSupervisoryAuthoritySection,
} from './legalCore';

export const SENEAR_DELETION_HERO: Record<LegalLang, DeletionHeroData> = {
  hu: {
    badge: 'GDPR 17. cikk · Google Play Adattörlési Irányelv',
    irreversibleBadge: 'Azonnali és Visszafordíthatatlan (0 napos megőrzés)',
    title: 'SENEAR Fiók- és Személyes Adatok Végleges Törlése',
    subtitle:
      'A SENEAR alkalmazásban tárolt gondozói és gondozotti (Senior) adataidat bármikor, azonnal és véglegesen törölheted egyetlen gombnyomással az alkalmazáson belül, vagy e-mailben az alkalmazás nélkül is.',
    method1Title: '1. lehetőség: Azonnali, egynyomásos törlés az alkalmazáson belül (Ajánlott)',
    method1Desc:
      'A SENEAR Android alkalmazásban (csomagazonosító: bond.gabba.senear) használd a beépített végleges adattörlés gombot:',
    method1Steps: [
      'Gondozó (Caregiver) módban: Nyisd meg a SENEAR alkalmazást → Saját adataim → nyomd meg a „Fiók és minden adat végleges törlése” gombot, majd erősítsd meg az „Igen, mindent törlök” gombbal.',
      'Gondozott (Senior) módban: Nyisd meg a SENEAR alkalmazást → Általános beállítások → nyomd meg a „Felhőprofil és adatok végleges törlése (GDPR)” gombot, majd erősítsd meg az „Igen, mindent törlök” gombbal.',
    ],
    method2Title: '2. lehetőség: Adattörlés kérése e-mailben (ha már törölted az alkalmazást)',
    method2Desc:
      'Ha már eltávolítottad az alkalmazást a készülékről, küldj egy rövid e-mailt az gabba@gabba.bond címre a regisztrált gondozói e-mail-címeddel, telefonszámoddal vagy a 6-jegyű Senior párosító kóddal. A kérést 72 órán belül végrehajtjuk.',
    method2Btn: 'Adattörlés kérése e-mailben (gabba@gabba.bond)',
    whatDeletedTitle: 'Milyen adatok törlődnek véglegesen:',
    whatDeletedItems: [
      'Gondozói profil (caregivers/{caregiverId}): Név, e-mail-cím, telefonszám, Firebase Auth UID, FCM push tokenek és értesítési beállítások.',
      'Gondozotti profil (seniors/{seniorId}): Név, 6-jegyű párosító kód, gyorstárcsázó névjegyek, Base64 fotók, napi rutinok/emlékeztetők, Otthoni Zóna GPS-koordináták és akkumulátor/állapot telemetria.',
      'Minden felhőbeli alkollekció és valós idejű csomópont: alerts, caregivers, logs, voip_stream, webrtc_signaling, RTDB /presence és /voip_stream, valamint a készülék helyi SharedPreferences tárolója.',
    ],
    irreversibleDesc:
      'A törlés az EU-s szervereken (europe-west1 – Belgium) azonnal (0 másodperces megőrzési idővel) végbemegy és 100%-ban visszafordíthatatlan. A törlés után semmilyen személyes adat nem marad vissza.',
  },
  de: {
    badge: 'Art. 17 DSGVO · Google Play Richtlinie zur Datenlöschung',
    irreversibleBadge: 'Sofortig & Unwiderruflich (0 Tage Speicherung)',
    title: 'SENEAR Konto- und Datenlöschung',
    subtitle:
      'Sie können Ihr SENEAR-Konto sowie alle zugehörigen Senior- und Betreuerdaten jederzeit dauerhaft und unwiderruflich löschen – entweder sofort per Fingertipp direkt in der App oder per E-Mail-Anfrage.',
    method1Title: 'Option 1: Sofortige In-App-Löschung per Fingertipp (Empfohlen)',
    method1Desc:
      'Nutzen Sie in der SENEAR Android-App (Paket-ID: bond.gabba.senear) die integrierte Löschfunktion:',
    method1Steps: [
      'Im Betreuer-Modus (Caregiver): Öffnen Sie die SENEAR-App → Mein Profil → tippen Sie auf „Konto und alle Daten endgültig löschen (DSGVO)“ und bestätigen Sie mit „Ja, alles löschen“.',
      'Im Senior-Modus: Öffnen Sie die SENEAR-App → Allgemeine Einstellungen → tippen Sie auf „Cloud-Profil und Daten endgültig löschen (DSGVO)“ und bestätigen Sie mit „Ja, alles löschen“.',
    ],
    method2Title: 'Option 2: Löschungsanfrage per E-Mail (ohne installierte App)',
    method2Desc:
      'Falls Sie die App bereits deinstalliert haben, senden Sie eine E-Mail an gabba@gabba.bond mit Ihrer registrierten E-Mail-Adresse, Telefonnummer oder dem 6-stelligen Kopplungscode. Anfragen werden innerhalb von 72 Stunden ausgeführt.',
    method2Btn: 'Datenlöschung per E-Mail anfordern (gabba@gabba.bond)',
    whatDeletedTitle: 'Welche Daten werden endgültig gelöscht:',
    whatDeletedItems: [
      'Betreuerprofil (caregivers/{caregiverId}): Name, E-Mail-Adresse, Telefonnummer, Firebase Auth UID, FCM-Token und Benachrichtigungseinstellungen.',
      'Seniorprofil (seniors/{seniorId}): Anzeigename, 6-stelliger Kopplungscode, Kurzwahlkontakte, Base64-Fotos, tägliche Routinen/Erinnerungen, Home-Safe-Zone-GPS-Koordinaten sowie Akku-/Gerätetelemetrie.',
      'Alle Cloud-Subkollektionen & Echtzeit-Knoten: alerts, caregivers, logs, voip_stream, webrtc_signaling, RTDB /presence & /voip_stream sowie lokale SharedPreferences.',
    ],
    irreversibleDesc:
      'Die Löschung erfolgt auf unseren EU-Servern (europe-west1 – Belgien) sofort (0 Sekunden Aufbewahrung) und ist zu 100 % unwiderruflich. Es verbleiben keinerlei personenbezogene Daten.',
  },
  en: {
    badge: 'GDPR Art. 17 · Google Play Data Deletion Policy',
    irreversibleBadge: 'Immediate & Irreversible (0-Day Retention)',
    title: 'SENEAR Account & Personal Data Deletion',
    subtitle:
      'You can permanently and irreversibly delete your SENEAR account and all associated Senior and Caregiver data at any time—either instantly inside the app with one tap, or by email request without the app installed.',
    method1Title: 'Option 1: Instant One-Tap In-App Deletion (Recommended)',
    method1Desc:
      'Inside the SENEAR Android app (package ID: bond.gabba.senear), use the built-in erasure button:',
    method1Steps: [
      'In Caregiver Mode: Open the SENEAR app → My Profile → tap "Permanently delete account and all data (GDPR)", then confirm with the "Yes, delete everything" button.',
      'In Senior Mode: Open the SENEAR app → General Settings → tap "Permanently delete cloud profile and data (GDPR)", then confirm with the "Yes, delete everything" button.',
    ],
    method2Title: 'Option 2: Deletion Request via Email (Without the App Installed)',
    method2Desc:
      'If you have already uninstalled the app, send a deletion request to our Data Controller at gabba@gabba.bond stating your Caregiver email address, registered phone number, or Senior Pairing ID. Requests are processed within 72 hours.',
    method2Btn: 'Request Data Deletion via Email (gabba@gabba.bond)',
    whatDeletedTitle: 'What Data Is Permanently Deleted:',
    whatDeletedItems: [
      'Caregiver profile (caregivers/{caregiverId}): Name, email address, phone number, Firebase Auth UID, FCM tokens, and notification preferences.',
      'Senior profile (seniors/{seniorId}): Display name, 6-digit pairing code, speed-dial contacts, Base64 photos, daily routines/reminders, Home Safe Zone GPS coordinates, and device/battery telemetry.',
      'All cloud subcollections & real-time nodes: alerts, caregivers, logs, voip_stream, webrtc_signaling, RTDB /presence & /voip_stream, and local device SharedPreferences.',
    ],
    irreversibleDesc:
      'Deletion is executed immediately (0 seconds retention) on our EU servers (europe-west1 – Belgium) and is 100% irreversible. Zero personal data is retained after deletion.',
  },
};

export const SENEAR_PRIVACY_DOC: Record<LegalLang, LegalDocumentData> = {
  // ===========================================================================
  // HUNGARIAN (HU)
  // ===========================================================================
  hu: {
    kind: 'privacy',
    shortTabLabel: 'Adatvédelmi Tájékoztató (GDPR)',
    breadcrumbCurrent: 'GDPR Adatvédelmi Tájékoztató',
    badges: [
      'GDPR (EU) 2016/679 (13–14. cikk)',
      'EU Adattárolás: europe-west1 (Belgium)',
      'Google Play Data Safety Auditált',
    ],
    title: 'GDPR ADATVÉDELMI TÁJÉKOZTATÓ – SENEAR',
    subtitle:
      'Jelen Adatvédelmi Tájékoztató részletesen ismerteti, hogyan gyűjti, kezeli, minimalizálja és védi a SENEAR mobilalkalmazás (csomagazonosító: bond.gabba.senear) és a hivatalos webes felület (gabba.bond/senear) a felhasználók személyes adatait az Európai Unió Általános Adatvédelmi Rendelete (GDPR – 2016/679/EU rendelet 13. és 14. cikk), a magyar Infotv., valamint a Google Play User Data irányelvei szerint.',
    effectiveDateValue: '2026. november 7.',
    quickSummaryTitle: 'A SENEAR GDPR- és Technikai Garanciái Röviden',
    quickSummaryItems: [
      {
        title: '100% EU-s Adattárolás',
        desc: 'Minden Firestore, Realtime Database és Cloud Function kizárólag az EU-ban (europe-west1 – Belgium) fut.',
      },
      {
        title: 'Zero-Storage Base64 Fotók',
        desc: 'A névjegy- és rutin-fotók helyben tömörítve (300×300px), titkosított Base64 szövegként tárolódnak az EU-s adatbázisban — soha nem kerülnek nyilvános képszerverre.',
      },
      {
        title: 'Titkosított WebRTC & GPS Minimalizálás',
        desc: 'A P2P DTLS-SRTP hívásokat nem rögzítjük; a jelzések hívás végén törlődnek. Nem épül folyamatos GPS útvonal-történet.',
      },
      {
        title: 'Egynyomásos Törlés (GDPR 17. cikk)',
        desc: 'Kétoldalú hozzájárulás és azonnali „Minden adat törlése / Párosítás bontása” gomb mind a Gondozott, mind a Gondozó készülékén.',
      },
    ],
    operatorSectionTitle: '1. Az Adatkezelő és Üzemeltető adatai (GDPR 13. cikk (1) a))',
    sections: [
      {
        id: 'modes',
        number: '2',
        icon: 'smartphone',
        title: 'Működési módok és beépített adatvédelem (Privacy by Design & Default – GDPR 25. cikk)',
        intro:
          'A SENEAR a „Privacy by Design és Privacy by Default” elv mentén készült, és két, egymástól szigorúan elkülönülő üzemmódban használható:',
        subsections: [
          {
            subtitle: 'A) Önálló (Összeköttetésmentes) Gondozott mód',
            badge: '0% Felhő Adatforgalom',
            paragraphs: [
              'Amennyiben az alkalmazást gondozói párosítás nélkül, önállóan használják az idős hozzátartozó („Gondozott”) telefonján, az alkalmazás kizárólag helyben, a készülék belső memóriájában (Android SharedPreferences / ContactPreferences) tárolja a beállításokat (engedélyezett gyorstárcsázó telefonszámok, helyi napi emlékeztetők, szövegméret, csengetési profil, védett Kioszk felület állapota).',
              'Ebben az üzemmódban semmilyen személyes adat nem kerül továbbításra külső szerverre vagy felhőbe, és az alkalmazás nem létesít Firebase adatbázis-kapcsolatot.',
            ],
          },
          {
            subtitle: 'B) Gondozói összeköttetés (Párosított) mód',
            badge: 'Kétoldalú Kifejezett Hozzájárulási Kapu',
            paragraphs: [
              'A felhőalapú szinkronizáció és távoli gondozói segítségnyújtás kizárólag akkor lép működésbe, ha a 6-jegyű párosító kód használata előtt mindkét készüléken kifejezetten elfogadják az adatmegosztási és felelősségi nyilatkozatot (Bilateral GDPR Consent Gate):',
            ],
            bullets: [
              {
                label: 'Gondozotti hozzájárulási kapu (Senior Consent Gate):',
                text: 'A Gondozott telefonján a párosítási képernyő megnyitásakor a 6-jegyű kód alapértelmezetten rejtett (nem is generálódik le). Először egy jól olvasható, nagy kontrasztú nyilatkozat jelenik meg a megosztott adatokról (akkumulátor, GPS-helyzet, távoli névjegykezelés, Wi-Fi hívás). A párosító kód csak az „Elfogadom” gomb megnyomása után jelenik meg, rögzítve a seniorConsentAccepted: true jelzést és az UTC időbélyeget.',
              },
              {
                label: 'Gondozói jognyilatkozat kapu (Caregiver Declaration Gate):',
                text: 'A Gondozó telefonján a 6-jegyű kód beviteli mezője mindaddig rejtett, amíg a Gondozó jóvá nem hagyja a nyilatkozatot, miszerint a Gondozott kifejezett hozzájárulásával vagy törvényes képviselőjeként köti össze a készülékeket (caregiverConsentAccepted: true + UTC időbélyeg).',
              },
            ],
          },
        ],
      },
      {
        id: 'legal-basis',
        number: '3',
        icon: 'scale',
        title: 'Az adatkezelés jogalapjai (GDPR 6. cikk és 9. cikk)',
        intro:
          'A GDPR előírásainak megfelelően a SENEAR az alábbi pontosan meghatározott jogalapokon kezeli a személyes adatokat:',
        bullets: [
          {
            label: 'Kifejezett hozzájárulás (GDPR 6. cikk (1) a) és 9. cikk (2) a)):',
            text: 'Párosított módban a földrajzi helyzet (Otthoni Biztonsági Zóna és SOS GPS), az akkumulátor- és gyártói (OEM) eszközállapot-telemetria, a távoli fényképes névjegykezelés, a felhasználó által megadott napi rutinok/emlékeztetők, valamint a WebRTC hang- és videóhívások kezelése a Gondozott és a Gondozó előzetes, kifejezett, kétoldalú hozzájárulásán alapul. A hozzájárulás bármikor, azonnali hatállyal visszavonható.',
          },
          {
            label: 'Szerződés teljesítése / Alkalmazás-funkcionalitás (GDPR 6. cikk (1) b)):',
            text: 'A Gondozó regisztrációs adatainak (Név, E-mail-cím, Telefonszám és Firebase UID), a párosítási kapcsolatnak, a szinkronizált névjegyeknek és emlékeztetőknek a kezelése a szolgáltatás működtetéséhez szükséges — ideértve azt is, hogy párosításkor a Gondozó neve és telefonszáma automatikusan bekerül a Gondozott első szabad gyorstárcsázó csempéjébe (1–4. hely) az azonnali hívásindításhoz.',
          },
          {
            label: 'Létfontosságú érdekek védelme (GDPR 6. cikk (1) d) és 9. cikk (2) c)):',
            text: 'Az SOS segélyhívások, a fizikai zuhanásérzékelési riasztások és az Otthoni Biztonsági Zóna elhagyási értesítések továbbítása a Gondozott életének és testi épségének közvetlen védelmét szolgálja.',
          },
          {
            label: 'Jogos érdek és IT-biztonság (GDPR 6. cikk (1) f)):',
            text: 'Firebase hitelesítési tokenek ellenőrzése (request.auth != null), a párosító kódok védelme az illetéktelen hozzáféréssel szemben, valamint az ismeretlen/csaló hívószámok helyi szűrése.',
          },
        ],
      },
      {
        id: 'data-collected',
        number: '4',
        icon: 'database',
        title: 'Kezelt adatkategóriák, célok és adattakarékosság (GDPR 5. cikk (1) c), 13. és 14. cikk)',
        intro:
          'Az adattakarékosság elvével összhangban a SENEAR kizárólag a családi biztonsági ökoszisztéma működéséhez elengedhetetlen adatokat kezeli:',
        bullets: [
          {
            label: 'A) Távoli gyorstárcsázó névjegyek és Zero-Storage Base64 fotók:',
            text: 'Párosított módban a gyorstárcsázó nevek, telefonszámok és opcionális portréfotók szinkronizálódnak. Minden kontaktfotót az alkalmazás helyben a készüléken kicsinyít (300×300px) és titkosított Base64 szövegként tárol közvetlenül az EU-s adatbázisban (europe-west1) — a fotók SOHA nem kerülnek nyilvános képszerverre vagy CDN-re.',
          },
          {
            label: 'B) Napi rutinok, emlékeztetők és visszaigazolások (Zéró egészségügyi profilalkotás):',
            text: 'Az emlékeztető címe, időpontja, rövid szöveges instrukciója (pl. vízivás vagy gyógyszerbevétel ideje), opcionális Base64 tárgyfotója és a visszaigazolás időbélyege szinkronizálódik. A SENEAR ezeket kizárólag felhasználói általános napi emlékeztetőként kezeli: NEM végez klinikai profilalkotást, orvosi elemzést vagy egészségügyi adatértékesítést.',
          },
          {
            label: 'C) Eszközállapot és OEM akkumulátor-telemetria:',
            text: 'A párosított Senior készülék eseményvezérelt Delta-Sync útján továbbítja a töltöttségi szintet (batteryLevel), a töltési állapotot (isCharging), az utolsó elérhetőséget (lastSeen / RTDB /presence), a készülék márkáját (Build.MANUFACTURER) és az akkumulátor-optimalizálási engedély állapotát a lemerülési riasztások és a gyártóspecifikus beállítási segédletek megjelenítéséhez.',
          },
          {
            label: 'D) Titkosított WebRTC hang- és videóhívások:',
            text: 'Az alkalmazáson belüli hívások végpontok közötti titkosítású WebRTC (DTLS-SRTP) kapcsolatot használnak. A jelzésadatok (SDP/ICE) hívásbontáskor 0 másodperc alatt törlődnek; a hang- és videófolyamokat SOHA nem rögzítjük. A Senior készüléken hangjelzés és teljes képernyős élő kijelzés jelzi az aktív hívást.',
          },
          {
            label: 'E) Otthoni Biztonsági Zóna (Geofencing) és SOS riasztások:',
            text: 'A háttérbeli GPS-pozíció kizárólag az Otthoni Biztonsági Zóna elhagyásának/belépésének érzékelésére és SOS segélykéréskor kerül feldolgozásra. Folyamatos mozgástörténet (breadcrumb-napló) NEM épül; az új koordináta felülírja a korábbit.',
          },
          {
            label: 'F) Gondozói regisztrációs adatok és hibadiagnosztika:',
            text: 'Gondozói regisztrációkor a Név, E-mail-cím, Telefonszám, Firebase UID, FCM tokenek és a kétoldalú hozzájárulási időbélyegek kerülnek rögzítésre. Váratlan szoftverhiba esetén technikai hibakivonat (system_crashes), eltávolításkor pedig személyes azonosítók nélküli beállítási telemetria (uninstall_analytics) segíti a hibajavítást.',
          },
        ],
      },
      {
        id: 'permissions',
        number: '5',
        icon: 'eye',
        title: 'Android rendszerengedélyek és Accessibility API nyilatkozat (Google Play megfelelőség)',
        intro:
          'A SENEAR az érzékeny Android-engedélyeket kizárólag átlátható, felhasználó által kezdeményezett biztonsági és akadálymentesítési funkciókhoz kéri:',
        bullets: [
          {
            label: 'AccessibilityService API (android.permission.BIND_ACCESSIBILITY_SERVICE):',
            text: 'Kizárólag a Gondozott készülékén aktív Kioszk módban akadályozza meg a védett kezdőképernyő véletlen elhagyását (Home/Vissza/Előzmények védelme). A SENEAR NEM olvassa ki más alkalmazások képernyőtartalmát, NEM rögzít billentyűleütéseket vagy jelszavakat, és NEM tesz lehetővé távoli kattintás-injektálást.',
          },
          {
            label: 'Pontos ébresztések és akkumulátor-kivétel (SCHEDULE_EXACT_ALARM / REQUEST_IGNORE_BATTERY_OPTIMIZATIONS):',
            text: 'A percre pontos napi emlékeztetők, a teljes képernyős bejövő Wi-Fi hívások, valamint az agresszív gyártói (Xiaomi, Samsung, Huawei) háttérfolyamat-leállítás elleni védelem biztosítására szolgál.',
          },
          {
            label: 'Telefon, Hívásszűrés és SMS (CallScreeningService / NotificationListenerService / SEND_SMS / CALL_PHONE):',
            text: 'Kizárólag az egyérintéses gyorstárcsázáshoz, a dedikált SOS segélyhíváshoz és vészhelyzeti SMS-hez, a helyi Anti-Scam Whitelist hívásszűrőhöz (NogondCallScreeningService – ismeretlen csaló számok némítása), a nagybetűs Kioszk SMS-megjelenítéshez és az engedélyezett gondozói kihangosított hívásfogadáshoz használatos. Hívás- és SMS-adatokat soha nem adunk át harmadik félnek.',
          },
          {
            label: 'Helyadatok, Kamera/Mikrofon és Mozgásérzékelő:',
            text: 'A GPS-hozzáférés kizárólag párosított módban az Otthoni Zóna és SOS funkciót szolgálja; a kamera és mikrofon csak aktív WebRTC hívás közben működik. A gyorsulásmérő zuhanásérzékelése 100%-ban helyben, a készülék memóriájában fut (30 másodperces hangjelzéses visszaszámlálással).',
          },
        ],
      },
      buildCoreEuSecuritySection('hu', '6', {
        label: 'Szigorú Firebase hozzáférés-szabályozás (Security Rules):',
        text: 'A Firestore (firestore.rules), a Realtime Database (database.rules.json) és minden meghívható Cloud Function hitelesített tokent (request.auth != null) követel meg; nyilvános olvasási vagy írási hozzáférés teljes körűen tiltott.',
      }),
      {
        id: 'retention',
        number: '7',
        icon: 'database',
        title: 'Adatmegőrzési időtartamok (GDPR 5. cikk (1) e) és 13. cikk (2) a))',
        intro:
          'A személyes adatokat kizárólag a biztonsági funkciók teljesítéséhez szükséges legrövidebb ideig őrizzük meg:',
        bullets: [
          {
            label: 'WebRTC VoIP hívásjelzési pufferek (webrtc_signaling & /voip_stream):',
            text: '0 másodperc a hívás befejezése után — a kapcsolat bontásakor azonnal és véglegesen törlődnek.',
          },
          {
            label: 'Aktuális GPS-pozíció és eszköz-telemetria (seniors/{seniorId}):',
            text: 'Minden új frissítés felülírja az előző állapotot (nem képződik mozgástörténet); párosítás bontásakor azonnal törlődik.',
          },
          {
            label: 'Szinkronizált névjegyek, Base64 fotók, napi rutinok és riasztási naplók:',
            text: 'Kizárólag az aktív párosítás fennállásáig tárolódnak; a „Minden adat törlése / Párosítás bontása” megnyomásakor azonnal megsemmisülnek.',
          },
          {
            label: 'Törölt fiókok és profilok:',
            text: 'Alkalmazáson belüli törléskor 0 nap (azonnali rekurzív adattörlés); e-mailes törlési kérelem esetén legfeljebb 72 órán belül végrehajtva.',
          },
        ],
      },
      {
        id: 'user-rights',
        number: '8',
        icon: 'trash',
        title: 'Egynyomásos végleges adattörlés (GDPR 17. cikk) és érintetti jogok (GDPR 15–22. cikk)',
        intro:
          'A GDPR 15–22. cikkei alapján mind a Gondozottat, mind a Gondozót díjmentesen megilletik az alábbi jogok:',
        bullets: [
          {
            label: 'Azonnali, egynyomásos törlés az alkalmazáson belül:',
            text: 'Bármikor kezdeményezhető Gondozó módban (SENEAR → Saját adataim → „Fiók és minden adat végleges törlése”) vagy Gondozott módban (SENEAR → Általános beállítások → „Felhőprofil és adatok végleges törlése (GDPR)”). Ez azonnal és véglegesen törli az összes felhőbeli (europe-west1) és helyi adatot.',
          },
          {
            label: 'Teljes körű érintetti jogok (GDPR 15–22. cikk és 7. cikk (3)):',
            text: 'Hozzáféréshez való jog (15. cikk), helyesbítéshez való jog (16. cikk), törléshez való jog (17. cikk), adatkezelés korlátozásához való jog (18. cikk), adathordozhatósághoz való jog (20. cikk – JSON adatexport az appban), tiltakozáshoz való jog (21. cikk) és a hozzájárulás bármikori visszavonása.',
          },
          {
            label: 'Joggyakorlás és adattörlés e-mailben (az alkalmazás nélkül is):',
            text: 'Kérelmét bármikor elküldheti az gabba@gabba.bond címre (regisztrált e-mail-címe vagy 6-jegyű párosító kódja megjelölésével); minden megkeresést 72 órán belül teljesítünk és visszaigazolunk.',
          },
        ],
      },
      {
        id: 'medical-disclaimer',
        number: '9',
        icon: 'warning',
        isWarningBox: true,
        title: 'Orvostechnikai és segélyhívási felelősségkizáró nyilatkozat (EU MDR 2017/745)',
        intro:
          'Kérjük, a SENEAR igénybevétele előtt figyelmesen olvassa el ezt a kötelező jogi tájékoztatást:',
        bullets: [
          {
            label: 'Nem minősül orvostechnikai eszköznek vagy 112-es segélyhívó központnak:',
            text: 'A SENEAR családi kommunikációs és napi rutintámogató szoftver. NEM minősül az (EU) 2017/745 rendelet (MDR) szerinti tanúsított orvostechnikai eszköznek, és NEM helyettesíti a hivatalos segélyhívó szolgálatokat (112) vagy a minősített 24/7 távfelügyeleti rendszereket (Hausnotruf).',
          },
          {
            label: 'Technikai és hálózati függőségek:',
            text: 'Az SOS riasztások, zónaértesítések, WebRTC hívások és napi emlékeztetők működése függ a mobilhálózati lefedettségtől, az aktív SIM-kártyától, az internetkapcsolattól, a GPS-vételtől, az akkumulátor töltöttségétől és az okostelefon energiagazdálkodási beállításaitól.',
          },
        ],
      },
      buildCoreSupervisoryAuthoritySection('hu', '10'),
    ],
  },

  // ===========================================================================
  // GERMAN (DE)
  // ===========================================================================
  de: {
    kind: 'privacy',
    shortTabLabel: 'Datenschutz (DSGVO)',
    breadcrumbCurrent: 'DSGVO-Datenschutzerklärung',
    badges: [
      'DSGVO (EU) 2016/679 (Art. 13 & 14)',
      'EU-Serverstandort: europe-west1 (Belgien)',
      'Google Play Data Safety Geprüft',
    ],
    title: 'DSGVO-DATENSCHUTZERKLÄRUNG – SENEAR',
    subtitle:
      'Diese Datenschutzerklärung erläutert detailliert, wie die mobile Anwendung SENEAR (Paket-ID: bond.gabba.senear) und die Webplattform (gabba.bond/senear) personenbezogene Daten gemäß der Europäischen Datenschutz-Grundverordnung (DSGVO – Art. 13 und 14), dem TDDDG sowie den Google Play User Data-Richtlinien erheben, minimieren und schützen.',
    effectiveDateValue: '7. November 2026',
    quickSummaryTitle: 'Wichtigste DSGVO- & Technische Garantien im Überblick',
    quickSummaryItems: [
      {
        title: '100 % EU-Serverstandort',
        desc: 'Alle Cloud Firestore-, Realtime Database- und Cloud Functions-Instanzen werden ausschließlich in europe-west1 (Belgien, EU) betrieben.',
      },
      {
        title: 'Zero-Storage Base64-Fotos',
        desc: 'Kontakt- & Routinefotos werden lokal komprimiert (300×300px) und als verschlüsselte Base64-Strings in unserer EU-Datenbank gespeichert – nie auf öffentlichen Bildservern.',
      },
      {
        title: 'Verschlüsseltes WebRTC & GPS-Schutz',
        desc: 'P2P-verschlüsselte Anrufe (DTLS-SRTP) werden nie aufgezeichnet. Keine fortlaufende GPS-Bewegungshistorie.',
      },
      {
        title: 'Sofort-Löschung (Art. 17 DSGVO)',
        desc: 'Beidseitige Einwilligung & Ein-Klick-Funktion „Alle Daten löschen / Entkoppeln“ löscht sofort alle Cloud- und Lokaldaten.',
      },
    ],
    operatorSectionTitle: '1. Verantwortlicher & Betreiber (Art. 13 Abs. 1 lit. a DSGVO)',
    sections: [
      {
        id: 'modes',
        number: '2',
        icon: 'smartphone',
        title: 'Betriebsmodi & Datenschutz durch Technikgestaltung (Art. 25 DSGVO)',
        intro:
          'SENEAR wurde streng nach dem Grundsatz „Privacy by Design & by Default“ entwickelt und arbeitet in zwei klar getrennten Betriebsmodi:',
        subsections: [
          {
            subtitle: 'A) Eigenständiger Senioren-Modus (Ungekoppelt / Offline-First)',
            badge: 'Keine Cloud-Datenübertragung',
            paragraphs: [
              'Wird die App ohne Kopplung mit einer Betreuungsperson auf dem Smartphone des Seniors genutzt, werden sämtliche Konfigurationsdaten (Kurzwahlkontakte, lokale Tagesroutinen, Schriftgrößen, Lautstärkeprofile, Kiosk-Status) ausschließlich lokal auf dem Gerät (Android SharedPreferences) gespeichert.',
              'Im eigenständigen Modus werden keinerlei personenbezogene Daten an externe Server oder die Cloud übertragen.',
            ],
          },
          {
            subtitle: 'B) Verbundener Betreuer-Modus (Gekoppelt)',
            badge: 'Beidseitige ausdrückliche Einwilligung',
            paragraphs: [
              'Cloud-Synchronisation und Fernunterstützung werden erst aktiviert, nachdem auf beiden Geräten vor Verwendung des 6-stelligen Kopplungscodes eine ausdrückliche Einwilligungserklärung (Bilateral GDPR Consent Gate) bestätigt wurde:',
            ],
            bullets: [
              {
                label: 'Einwilligung auf dem Seniorengerät (Senior Consent Gate):',
                text: 'Der 6-stellige Code ist standardmäßig ausgeblendet und wird erst generiert, nachdem der Senior den kontrastreichen Hinweis zu Akkustand, GPS, Kontaktverwaltung und WLAN-Anrufen ausdrücklich bestätigt hat (seniorConsentAccepted: true + UTC-Zeitstempel).',
              },
              {
                label: 'Rechtserklärung auf dem Betreuergerät (Caregiver Declaration Gate):',
                text: 'Das Eingabefeld bleibt gesperrt, bis die Betreuungsperson verbindlich erklärt, das Gerät mit ausdrücklicher Einwilligung des Seniors oder als gesetzlicher Vertreter zu koppeln (caregiverConsentAccepted: true + UTC-Zeitstempel).',
              },
            ],
          },
        ],
      },
      {
        id: 'legal-basis',
        number: '3',
        icon: 'scale',
        title: 'Rechtsgrundlagen der Verarbeitung (Art. 6 und Art. 9 DSGVO)',
        intro:
          'Die Verarbeitung personenbezogener Daten innerhalb von SENEAR stützt sich ausschließlich auf folgende Rechtsgrundlagen:',
        bullets: [
          {
            label: 'Ausdrückliche Einwilligung (Art. 6 Abs. 1 lit. a & Art. 9 Abs. 2 lit. a DSGVO):',
            text: 'Verarbeitung von GPS-Standortdaten (Heimzone und SOS), Akku-/Gerätetelemetrie, ferngesteuerten Kurzwahlkontakten, nutzerdefinierten Tagesroutinen sowie WebRTC-Anrufen im gekoppelten Modus. Jederzeit mit sofortiger Wirkung widerrufbar (Art. 7 Abs. 3 DSGVO).',
          },
          {
            label: 'Vertragserfüllung / App-Funktionalität (Art. 6 Abs. 1 lit. b DSGVO):',
            text: 'Verarbeitung der Betreuer-Registrierungsdaten (Name, E-Mail, Telefonnummer, Firebase-UID), Kopplungscodes und Synchronisationsdaten – einschließlich des automatischen Eintragens von Name und Telefonnummer der Betreuungsperson in die erste freie Kurzwahlkachel (Platz 1–4) des Seniors.',
          },
          {
            label: 'Schutz lebenswichtiger Interessen (Art. 6 Abs. 1 lit. d & Art. 9 Abs. 2 lit. c DSGVO):',
            text: 'Übermittlung von SOS-Notrufen, Sturzerkennungsalarmen und Sicherheitszonen-Warnungen zum unmittelbaren Schutz von Leben und körperlicher Unversehrtheit.',
          },
          {
            label: 'Berechtigte Interessen & IT-Sicherheit (Art. 6 Abs. 1 lit. f DSGVO):',
            text: 'Durchsetzung kryptografischer Authentifizierungsprüfungen (request.auth != null), Schutz der Kopplungscodes und lokale Anti-Scam-Anruffilterung.',
          },
        ],
      },
      {
        id: 'data-collected',
        number: '4',
        icon: 'database',
        title: 'Datenkategorien, Zwecke & Datenminimierung (Art. 5 Abs. 1 lit. c, Art. 13 & 14 DSGVO)',
        intro:
          'Gemäß dem Grundsatz der Datenminimierung verarbeitet SENEAR ausschließlich die für das Sicherheits-Ökosystem erforderlichen Datenkategorien:',
        bullets: [
          {
            label: 'A) Ferngesteuerte Kurzwahlkontakte & „Zero-Storage Base64“-Fotos:',
            text: 'Kontaktfotos werden lokal auf dem Gerät auf 300×300 Pixel komprimiert und als verschlüsselte Base64-Strings direkt in unserer EU-Datenbank (europe-west1) gespeichert – niemals auf öffentlichen Bildservern oder CDNs.',
          },
          {
            label: 'B) Tagesroutinen, Erinnerungen & Bestätigungen (Kein Gesundheits-Profiling):',
            text: 'Routinetitel, Uhrzeiten, kurze Hinweise, optionale Base64-Fotos und Bestätigungszeitstempel werden synchronisiert. SENEAR führt KEIN klinisches Profiling, KEINE medizinische Auswertung und KEINE Monetarisierung von Gesundheitsdaten durch.',
          },
          {
            label: 'C) Gerätestatus & OEM-Akku-Telemetrie:',
            text: 'Übertragung von Akkustand (batteryLevel), Ladestatus (isCharging), Online-Heartbeat (lastSeen), Herstellermarke (Build.MANUFACTURER) und Akku-Optimierungsstatus zur Warnung bei niedrigem Akku sowie für herstellerspezifische Hintergrund-Hilfestellungen.',
          },
          {
            label: 'D) Verschlüsselte WebRTC-Sprach- und Videoanrufe:',
            text: 'Ende-zu-Ende-verschlüsseltes Peer-to-Peer-WebRTC (DTLS-SRTP). Signalisierungsdaten (SDP/ICE) werden bei Gesprächsende sofort gelöscht; Audio- und Videostreams werden NIEMALS aufgezeichnet. Akustische Signale und Vollbildanzeigen informieren den Senior über aktive Gespräche.',
          },
          {
            label: 'E) Sichere Heimzone (Geofencing) & SOS-Alarme:',
            text: 'Standortdaten dienen ausschließlich der Heimzonen-Erkennung und SOS-Notrufen – ohne kontinuierliche Bewegungsprofile (Breadcrumb-Tracking). Jede neue Koordinate überschreibt den vorherigen Wert.',
          },
          {
            label: 'F) Betreuerkonto & Fehlerdiagnose:',
            text: 'Speicherung von Name, E-Mail, Telefonnummer, Firebase-UID, FCM-Tokens und Einwilligungszeitstempeln. Technische Absturzberichte (system_crashes) und anonyme Deinstallations-Telemetrie (uninstall_analytics ohne Klarnamen/E-Mail/Telefon) dienen ausschließlich der Systemstabilität.',
          },
        ],
      },
      {
        id: 'permissions',
        number: '5',
        icon: 'eye',
        title: 'Offenlegung der Android-Berechtigungen & Accessibility API (Google Play Compliance)',
        intro:
          'SENEAR fordert Systemberechtigungen ausschließlich für transparente Sicherheits- und Barrierefreiheitsfunktionen an:',
        bullets: [
          {
            label: 'AccessibilityService API (android.permission.BIND_ACCESSIBILITY_SERVICE):',
            text: 'Wird ausschließlich auf dem Seniorengerät bei aktivem Kiosk-Modus genutzt, um ein versehentliches Verlassen des geschützten Startbildschirms zu verhindern. SENEAR liest KEINE fremden Bildschirminhalte, erfasst KEINE Passwörter/Tastatureingaben und erlaubt KEINE Klick-Injektion.',
          },
          {
            label: 'Exakte Alarme & Akku-Ausnahme (SCHEDULE_EXACT_ALARM / REQUEST_IGNORE_BATTERY_OPTIMIZATIONS):',
            text: 'Erforderlich für minutengenaue Tagesroutinen, eingehende Vollbild-WLAN-Anrufe und den zuverlässigen Schutz vor aggressiven OEM-Energiesparmechanismen (Xiaomi, Samsung, Huawei).',
          },
          {
            label: 'Telefon, Anruffilter & SMS (CallScreeningService / NotificationListenerService / SEND_SMS / CALL_PHONE):',
            text: 'Ausschließlich genutzt für Ein-Klick-Kurzwahl, dedizierte SOS-Notruftaste/Notfall-SMS, lokalen Anti-Scam-Anruffilter (Whitelist), großformatige Kiosk-SMS-Anzeige und optionale Freisprech-Annahme für autorisierte Betreuer. Keinerlei Weitergabe an Dritte.',
          },
          {
            label: 'Standort, Kamera/Mikrofon & Bewegungssensoren:',
            text: 'Standort nur im gekoppelten Modus für Heimzone und SOS; Kamera/Mikrofon nur während aktiver WebRTC-Anrufe. Die Sturzerkennung über Beschleunigungssensoren erfolgt zu 100 % lokal im Arbeitsspeicher (mit 30-Sekunden-Abbruch-Countdown).',
          },
        ],
      },
      buildCoreEuSecuritySection('de', '6', {
        label: 'Strenge Datenbank-Zugriffskontrolle (Firebase Security Rules):',
        text: 'Firestore-Regeln (firestore.rules), Realtime Database-Regeln (database.rules.json) und sämtliche Cloud Functions erzwingen authentifizierte Sitzungen (request.auth != null). Öffentlicher Lese-/Schreibzugriff ist vollständig gesperrt.',
      }),
      {
        id: 'retention',
        number: '7',
        icon: 'database',
        title: 'Speicherdauer & Löschfristen (Art. 5 Abs. 1 lit. e & Art. 13 Abs. 2 lit. a DSGVO)',
        intro:
          'Personenbezogene Daten werden nur für die unbedingt erforderliche Mindestdauer gespeichert:',
        bullets: [
          {
            label: 'WebRTC-Signalisierungsdaten (webrtc_signaling & /voip_stream):',
            text: '0 Sekunden nach Gesprächsende – sofortige automatische Löschung bei Gesprächsende oder Abbruch.',
          },
          {
            label: 'Aktuelle GPS-Position & Gerätetelemetrie (seniors/{seniorId}):',
            text: 'Überschreiben an Ort und Stelle bei jedem Delta-Update (keine Bewegungshistorie); sofortige Entfernung beim Entkoppeln.',
          },
          {
            label: 'Synchronisierte Kontakte, Base64-Fotos, Tagesroutinen & Alarmprotokolle:',
            text: 'Speicherung ausschließlich während der aktiven Kopplung; restlose Löschung bei „Alle Daten löschen / Entkoppeln“.',
          },
          {
            label: 'Gelöschte Konten & Profile:',
            text: '0 Tage bei In-App-Löschung (sofortige rekursive Löschung); E-Mail-Löschungsanfragen werden innerhalb von maximal 72 Stunden ausgeführt.',
          },
        ],
      },
      {
        id: 'user-rights',
        number: '8',
        icon: 'trash',
        title: 'Sofortige Ein-Klick-Datenlöschung (Art. 17 DSGVO) & Betroffenenrechte (Art. 15–22 DSGVO)',
        intro:
          'Sowohl Senioren als auch Betreuungspersonen stehen jederzeit folgende unentgeltliche Rechte nach Art. 15–22 DSGVO zu:',
        bullets: [
          {
            label: 'Sofortige In-App-Löschung per Fingertipp:',
            text: 'Jederzeit im Betreuer-Modus (SENEAR → Mein Profil → „Konto und alle Daten endgültig löschen“) oder im Senior-Modus (SENEAR → Allgemeine Einstellungen → „Cloud-Profil und Daten endgültig löschen“) ausführbar. Löscht sofort alle Cloud-Daten (europe-west1) und lokalen Speicher.',
          },
          {
            label: 'Umfassende Betroffenenrechte (Art. 15–22 & Art. 7 Abs. 3 DSGVO):',
            text: 'Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20 – JSON-Export in der App), Widerspruch (Art. 21) sowie jederzeitigen Widerruf einer Einwilligung.',
          },
          {
            label: 'Anfragen & Löschung per E-Mail (ohne installierte App):',
            text: 'Richten Sie Ihr Anliegen jederzeit an gabba@gabba.bond (unter Angabe Ihrer E-Mail-Adresse oder des 6-stelligen Kopplungscodes). Bearbeitung und Bestätigung erfolgen innerhalb von 72 Stunden.',
          },
        ],
      },
      {
        id: 'medical-disclaimer',
        number: '9',
        icon: 'warning',
        isWarningBox: true,
        title: 'Medizinischer & Notruf-Haftungsausschluss (EU-MDR 2017/745)',
        intro:
          'Bitte beachten Sie diesen verbindlichen rechtlichen und technischen Hinweis vor Nutzung der App:',
        bullets: [
          {
            label: 'Kein zertifiziertes Medizinprodukt und kein 112-Notrufdienst / Hausnotruf:',
            text: 'SENEAR ist eine Anwendung zur Familienkommunikation und Alltagsunterstützung. Sie ist KEIN zertifiziertes Medizinprodukt gemäß Verordnung (EU) 2017/745 (MDR) und KEIN zertifizierter 24/7-Notruf- oder Rettungsdienst (wie 112 oder ein zertifizierter Hausnotruf).',
          },
          {
            label: 'Technische & netzwerkseitige Abhängigkeiten:',
            text: 'SOS-Anrufe/SMS, Heimzonen-Warnungen, WebRTC-Gespräche und Tagesroutinen hängen von Mobilfunkempfang, aktivem SIM-Guthaben, Internetverbindung, GPS-Signal, Akkustand und den Energiespareinstellungen des Smartphones ab.',
          },
        ],
      },
      buildCoreSupervisoryAuthoritySection('de', '10'),
    ],
  },

  // ===========================================================================
  // ENGLISH (EN)
  // ===========================================================================
  en: {
    kind: 'privacy',
    shortTabLabel: 'Privacy Notice (GDPR)',
    breadcrumbCurrent: 'GDPR Privacy Notice',
    badges: [
      'GDPR (EU) 2016/679 (Art. 13 & 14)',
      'EU Data Residency: europe-west1 (Belgium)',
      'Google Play Data Safety Verified',
    ],
    title: 'GDPR PRIVACY NOTICE – SENEAR',
    subtitle:
      'This Privacy Notice explains how the SENEAR mobile application (package ID: bond.gabba.senear) and web platform (gabba.bond/senear) collect, process, minimize, and protect personal data in strict compliance with the EU General Data Protection Regulation (GDPR Articles 13 & 14), the ePrivacy framework, and Google Play User Data policies.',
    effectiveDateValue: 'November 7, 2026',
    quickSummaryTitle: 'Key GDPR & Technical Safeguards at a Glance',
    quickSummaryItems: [
      {
        title: '100% EU Data Residency',
        desc: 'All Cloud Firestore, Realtime Database, and Cloud Functions are strictly pinned to europe-west1 (Belgium, EU).',
      },
      {
        title: 'Zero-Storage Base64 Photos',
        desc: 'Contact & routine photos are locally compressed (300×300px) and stored as encrypted Base64 strings inside our EU database—never on public image servers.',
      },
      {
        title: 'Encrypted P2P WebRTC & GPS Minimization',
        desc: 'DTLS-SRTP calls are never recorded; signaling data is wiped on call end. No continuous GPS breadcrumb history is stored.',
      },
      {
        title: 'One-Tap Art. 17 Erasure',
        desc: 'Bilateral Consent & One-Tap "Delete All Data / Unpair" instantly wipes all cloud and local records on both Senior and Caregiver devices.',
      },
    ],
    operatorSectionTitle: '1. Data Controller & Operator Information (GDPR Art. 13(1)(a))',
    sections: [
      {
        id: 'modes',
        number: '2',
        icon: 'smartphone',
        title: 'Operating Modes & Privacy by Design (GDPR Art. 25)',
        intro:
          'SENEAR is engineered around Data Protection by Design and by Default and operates in two strictly separated modes:',
        subsections: [
          {
            subtitle: 'A) Standalone Senior Mode (Unpaired / Offline-First)',
            badge: 'Zero Cloud Transmission',
            paragraphs: [
              'When used without Caregiver pairing on the Senior’s phone, all configuration data (approved speed-dial contacts, local daily routine alarms, font sizes, audio settings, and locked Kiosk state) is stored exclusively locally inside Android SharedPreferences.',
              'In Standalone mode, zero personal data is transmitted to external servers or the cloud, and no Firebase network connections are initiated.',
            ],
          },
          {
            subtitle: 'B) Connected Caregiver Mode (Paired)',
            badge: 'Bilateral Explicit Consent Gate',
            paragraphs: [
              'Cloud synchronization and remote family assistance are activated strictly after a bilateral GDPR consent gate is completed on both devices:',
            ],
            bullets: [
              {
                label: 'Senior Consent Gate:',
                text: 'On the Senior device, the 6-digit pairing code is hidden by default and generated only after the Senior accepts a high-contrast disclosure explaining battery telemetry, GPS Safe Zone, remote contact/routine management, and Wi-Fi calling (recording seniorConsentAccepted: true + UTC timestamp).',
              },
              {
                label: 'Caregiver Legal Declaration Gate:',
                text: 'On the Caregiver device, the pairing code input field remains locked until the Caregiver confirms they are linking the phone with the Senior’s express consent or as their authorized legal representative (caregiverConsentAccepted: true + UTC timestamp).',
              },
            ],
          },
        ],
      },
      {
        id: 'legal-basis',
        number: '3',
        icon: 'scale',
        title: 'Legal Basis for Processing Personal Data (GDPR Art. 6 & Art. 9)',
        intro:
          'Under the EU GDPR, SENEAR processes personal data exclusively on the following lawful bases:',
        bullets: [
          {
            label: 'Explicit Consent (GDPR Art. 6(1)(a) & Art. 9(2)(a)):',
            text: 'Processing of geolocation coordinates (Home Safe Zone and SOS), OEM battery telemetry, remote speed-dial contacts, user-defined daily routines, and WebRTC audio/video calls in Paired Mode. Consent may be withdrawn at any time with immediate effect.',
          },
          {
            label: 'Performance of a Service / Contract (GDPR Art. 6(1)(b)):',
            text: 'Processing Caregiver registration data (Name, Email, Phone number, Firebase UID), pairing codes, and synchronized settings—including automatically populating the paired Caregiver’s name and phone number into the Senior’s first available speed-dial tile (Slots 1–4) for one-tap calling.',
          },
          {
            label: 'Protection of Vital Interests (GDPR Art. 6(1)(d) & Art. 9(2)(c)):',
            text: 'Dispatches of emergency SOS alerts, physical fall-detection alarms, and Safe Zone entry/exit notifications to protect the life and physical safety of the Senior.',
          },
          {
            label: 'Legitimate Interests & IT Security (GDPR Art. 6(1)(f)):',
            text: 'Enforcing cryptographic authentication checks (request.auth != null), protecting pairing codes against brute-force access, and filtering unknown scam calls locally on the device.',
          },
        ],
      },
      {
        id: 'data-collected',
        number: '4',
        icon: 'database',
        title: 'Data Categories, Purposes & Data Minimization (GDPR Art. 5(1)(c), Art. 13 & 14)',
        intro:
          'In strict compliance with GDPR Data Minimization, SENEAR processes only essential data categories required for family safety:',
        bullets: [
          {
            label: 'A) Remote Speed-Dial Contacts & Zero-Storage Base64 Photos:',
            text: 'All contact photos are cropped and compressed locally on the device (300×300px) and stored as encrypted Base64 text strings directly inside our EU Firebase database (europe-west1)—never uploaded to public image servers or external CDNs.',
          },
          {
            label: 'B) Daily Routines, Reminders & Acknowledgments (Non-Profiling Guarantee):',
            text: 'Routine titles, alarm times, text notes, optional Base64 photos, and confirmation timestamps are synced across paired devices. SENEAR treats these strictly as user-defined daily reminders and performs NO clinical profiling, medical analysis, or health data monetization.',
          },
          {
            label: 'C) Device Status & OEM Battery Telemetry:',
            text: 'Event-driven Delta-Sync transmits battery percentage (batteryLevel), charging state (isCharging), online heartbeat (lastSeen / RTDB /presence), device brand (Build.MANUFACTURER), and battery-optimization state solely for low-battery alerts and OEM setup guides.',
          },
          {
            label: 'D) Encrypted WebRTC Audio & Video Calls:',
            text: 'Peer-to-peer WebRTC calls use mandatory DTLS-SRTP encryption. Ephemeral signaling metadata (SDP/ICE) is deleted immediately upon call end; audio and video streams are NEVER recorded. Audible tones and full-screen live indicators notify the Senior of active calls.',
          },
          {
            label: 'E) Home Safe Zone (Geofencing) & SOS Alerts:',
            text: 'Background location is processed strictly for Caregiver-defined Home Safe Zone entry/exit and SOS emergencies. SENEAR stores NO continuous GPS breadcrumb trails; each update overwrites the previous state.',
          },
          {
            label: 'F) Caregiver Registration Data & Crash/Setup Diagnostics:',
            text: 'Stores Caregiver Name, Email, Phone number, Firebase UID, FCM tokens, and bilateral consent timestamps. Runtime crash stack traces (system_crashes) and non-identifying setup/uninstall telemetry (uninstall_analytics without names, emails, or phone numbers) are logged strictly for life-safety reliability.',
          },
        ],
      },
      {
        id: 'permissions',
        number: '5',
        icon: 'eye',
        title: 'Android Permissions & Accessibility API Disclosure (Google Play Compliance)',
        intro:
          'SENEAR requests sensitive Android permissions strictly for transparent safety and accessibility features after prominent in-app disclosures:',
        bullets: [
          {
            label: 'AccessibilityService API (android.permission.BIND_ACCESSIBILITY_SERVICE):',
            text: 'Used exclusively on the Senior device when Kiosk Mode is active to prevent accidental navigation away from the protected home screen. SENEAR does NOT read third-party screen content, capture passwords/keystrokes, or perform remote click injection.',
          },
          {
            label: 'Exact Alarms & Battery Exemption (SCHEDULE_EXACT_ALARM / REQUEST_IGNORE_BATTERY_OPTIMIZATIONS):',
            text: 'Ensures minute-accurate daily routine alarms, full-screen incoming Wi-Fi calls, and protection against aggressive OEM background task killers (Xiaomi, Samsung, Huawei).',
          },
          {
            label: 'Phone, Call Screening & SMS (CallScreeningService / NotificationListenerService / SEND_SMS / CALL_PHONE):',
            text: 'Used exclusively for one-tap speed-dial calls, the SOS emergency button/SMS, local Anti-Scam Whitelist call screening (NogondCallScreeningService), large-print Kiosk SMS display, and optional speakerphone auto-answer for paired Caregivers. Call/SMS data is never sold or shared.',
          },
          {
            label: 'Location, Camera/Microphone & Motion Sensors:',
            text: 'Location is used strictly in Paired Mode for Home Safe Zone and SOS; Camera/Microphone operate only during active WebRTC calls. Accelerometer fall detection runs 100% locally in memory with a 30-second audible cancellation countdown.',
          },
        ],
      },
      buildCoreEuSecuritySection('en', '6', {
        label: 'Strict Access Control & Firebase Security Rules:',
        text: 'Firestore Security Rules (firestore.rules), Realtime Database Rules (database.rules.json), and all callable Cloud Functions enforce authenticated tokens (request.auth != null). Unauthenticated public access is completely blocked.',
      }),
      {
        id: 'retention',
        number: '7',
        icon: 'database',
        title: 'Data Retention Schedule (GDPR Art. 5(1)(e) & Art. 13(2)(a))',
        intro:
          'Personal data is retained strictly for the minimum duration necessary to fulfill its safety purpose:',
        bullets: [
          {
            label: 'WebRTC Signaling & Relay Buffers (webrtc_signaling & /voip_stream):',
            text: '0 seconds after call completion—automatically and permanently purged when a call ends or times out.',
          },
          {
            label: 'Current GPS Location & OEM Telemetry (seniors/{seniorId}):',
            text: 'Overwritten in place upon each delta update (zero historical movement trails); wiped immediately upon unpairing.',
          },
          {
            label: 'Synced Contacts, Base64 Photos, Daily Routines & Alert Logs:',
            text: 'Retained strictly for the duration of the active pairing; purged the instant either party triggers "Delete All Data / Unpair".',
          },
          {
            label: 'Deleted Accounts & Profiles:',
            text: '0 days in active databases upon in-app deletion (instant recursive wipe). Email deletion requests are fulfilled within 72 hours.',
          },
        ],
      },
      {
        id: 'user-rights',
        number: '8',
        icon: 'trash',
        title: 'One-Tap Permanent Erasure (GDPR Art. 17) & Data Subject Rights (Art. 15–22)',
        intro:
          'Under GDPR Articles 15–22, both Seniors and Caregivers enjoy free, enforceable data protection rights:',
        bullets: [
          {
            label: 'Instant One-Tap In-App Deletion:',
            text: 'Trigger immediate deletion inside Caregiver Mode (My Profile → "Permanently delete account and all data (GDPR)") or Senior Mode (General Settings → "Permanently delete cloud profile and data (GDPR)"). Instantly wipes all EU cloud records (europe-west1) and local device storage.',
          },
          {
            label: 'Comprehensive GDPR Rights (Art. 15–22 & Art. 7(3)):',
            text: 'Right of Access (Art. 15), Rectification (Art. 16), Erasure (Art. 17), Restriction (Art. 18), Data Portability (Art. 20 — built-in JSON export), Objection (Art. 21), and immediate Withdrawal of Consent.',
          },
          {
            label: 'Email Requests (Without the App Installed):',
            text: 'Email gabba@gabba.bond stating your registered email address or 6-digit pairing code to request erasure or data export. Processed and confirmed within 72 hours.',
          },
        ],
      },
      {
        id: 'medical-disclaimer',
        number: '9',
        icon: 'warning',
        isWarningBox: true,
        title: 'Medical & Emergency Liability Disclaimer (EU MDR 2017/745)',
        intro:
          'Please read this mandatory legal and operational notice carefully before relying on SENEAR:',
        bullets: [
          {
            label: 'Not a Certified Medical Device or 112/911 Emergency Dispatch Service:',
            text: 'SENEAR is a family communication and daily routine helper app. It is NOT a certified medical device under Regulation (EU) 2017/745 (MDR) and NOT a certified 24/7 emergency dispatch service (such as 112, 911, or certified "Hausnotruf" services).',
          },
          {
            label: 'Technical & Network Dependencies:',
            text: 'SOS calls/SMS, Safe Zone notifications, WebRTC calls, and routine alarms depend on cellular coverage, active SIM balance, internet connectivity, GPS reception, battery charge, and OS background power settings.',
          },
        ],
      },
      buildCoreSupervisoryAuthoritySection('en', '10'),
    ],
  },
};
