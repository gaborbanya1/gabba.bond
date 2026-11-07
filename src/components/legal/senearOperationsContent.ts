import {
  LegalDocumentData,
  LegalLang,
  buildCoreEuSecuritySection,
} from './legalCore';

export const SENEAR_OPERATIONS_DOC: Record<LegalLang, LegalDocumentData> = {
  // ===========================================================================
  // HUNGARIAN (HU) — MŰKÖDÉSI, GDPR ÉS GOOGLE PLAY ÁTLÁTHATÓSÁGI SZABÁLYZAT
  // ===========================================================================
  hu: {
    kind: 'operations',
    shortTabLabel: 'Működési Szabályzat',
    breadcrumbCurrent: 'Működési, GDPR és Google Play Átláthatósági Szabályzat',
    badges: [
      'Teljes GDPR & Google Play Transzparencia',
      'EU Felhőrégió: europe-west1',
      'Tételes Adat- és Engedélymátrix',
    ],
    title: 'MŰKÖDÉSI ÉS ADATÁTLÁTHATÓSÁGI SZABÁLYZAT – SENEAR',
    subtitle:
      'Jelen Működési és Adatátláthatósági Szabályzat (Operational, GDPR & Google Play Transparency Policy) fejezetenkénti GDPR-jogalapokkal és tételes táblázatokkal mutatja be, hogy pontosan milyen adatok érkeznek be a Gondozottól, a Gondozótól és a Google Play rendszerétől, meddig tárolódnak, mihez fér hozzá (és mihez nem fér hozzá soha) az Üzemeltető, valamint miért kér el az alkalmazás egyes érzékeny Android-jogosultságokat.',
    effectiveDateValue: '2026. november 7.',
    quickSummaryTitle: 'Teljes Átláthatóság 4 Alapelvben',
    quickSummaryItems: [
      {
        title: '3 Forrás, Tiszta Határok',
        desc: 'Tételes táblázat mutatja a Gondozott, a Gondozó és a Google Play által küldött adatokat, azok megőrzési idejét és láthatóságát.',
      },
      {
        title: 'Önálló Mód = 0% Felhő',
        desc: 'Családi párosítás nélkül a Senior Kioszk 100%-ban helyben, a telefon memóriájában fut — szerverre egyetlen bájt sem kerül.',
      },
      {
        title: 'Google Play Engedély-indoklás',
        desc: 'Minden Android engedély (Accessibility, CallScreening, NotificationListener, GPS) szigorú, egyetlen célra korlátozott védelmet lát el.',
      },
      {
        title: 'Delta-Sync & 0 mp Törlés',
        desc: 'Felülírásos állapotfrissítés útvonaltörténet nélkül, és egynyomásos rekurzív adattörlés 0 másodperces felhőmegőrzéssel.',
      },
    ],
    operatorSectionTitle: '1. Üzemeltetői felelősség, adatkezelői azonosítás és rendszerszintű hatály',
    operatorSectionGdprBadge: 'GDPR 4. cikk (7), 13. cikk (1) a) & 24. cikk',
    sections: [
      {
        id: 'system-architecture',
        number: '2',
        gdprBadge: 'GDPR 25. cikk (Beépített és alapértelmezett adatvédelem)',
        icon: 'smartphone',
        title: 'Kettős szerepkörű architektúra: Önálló (0% felhő) vs. Párosított üzemmód',
        intro:
          'A SENEAR (bond.gabba.senear) egységes Android csomagként települ, amely a választott szerepkörtől és a családi párosítás meglététől függően szigorúan elkülönített adatkezelési szinten működik:',
        subsections: [
          {
            subtitle: 'Senior Kioszk – Önálló (Standalone) mód',
            badge: '0% Felhőforgalom',
            paragraphs: [
              'Alapértelmezett Android kezdőképernyőként (HOME Launcher) működik extra nagy kontraszttal, 4 (nagy kijelzőn opcionálisan 6) fényképes hívógombbal, helyi csalóhívás-szűrővel és dedikált piros SOS sávval.',
              'Amíg a készüléket nem párosítják családi Gondozóval, az összes névjegy, fotó, napi rutin és beállítás 100%-ban helyben, a telefon belső memóriájában marad — külső szerverrel nem épül fel kapcsolat.',
            ],
          },
          {
            subtitle: 'Párosított Senior + Gondozói (Caregiver) ökoszisztéma',
            badge: 'EU europe-west1 Szinkron',
            paragraphs: [
              'Kétoldalú, 6-jegyű kódos jóváhagyás után a meghatalmazott családtagok (legfeljebb 4 Gondozó) saját telefonjukról segíthetnek a fotós hívógombok, a csengetési hangerő, a napi rutinok és az Otthoni Biztonsági Zóna kezelésében.',
              'A két készülék közötti adatcsere kizárólag az Európai Unión belüli (St. Ghislain, Belgium – europe-west1) Google Cloud / Firebase infrastruktúrán keresztül zajlik.',
            ],
          },
        ],
      },
      {
        id: 'incoming-data-retention-matrix',
        number: '3',
        gdprBadge: 'GDPR 5. cikk (1) c)–e), 13., 14. & 30. cikk',
        icon: 'database',
        title: 'Beérkező adatok 3 forrásból, megőrzési idők és Üzemeltetői hozzáférés (Teljes Adatmátrix)',
        intro:
          'Az alábbi átláthatósági táblázat tételesen rögzíti, hogy milyen adatok érkeznek be a SENEAR rendszerébe a Gondozott telefonjáról, a Gondozó felületéről és a Google Play fizetési rendszeréből, meddig tárolódnak, és mit lát (illetve mit nem ér el soha) az Üzemeltető:',
        table: {
          caption:
            'SENEAR beérkező adatok, megőrzési idők, üzemeltetői hozzáférés és GDPR jogalapok 3 adatforrás szerint',
          headers: [
            'Adatforrás',
            'Beérkező adatok (Konkrét mezők)',
            'Hol és meddig tárolódik? (Megőrzési idő)',
            'Üzemeltetői láthatóság és hozzáférési korlát',
            'GDPR jogalap és cikkely',
          ],
          rows: [
            [
              {
                badge: '1. FORRÁS · OFFLINE',
                title: 'Gondozott (Idős szülő telefonja – Önálló mód)',
                lines: ['Párosítás nélküli Senior Kioszk használat'],
              },
              {
                title: '0 bájt felhőbe küldött adat',
                lines: [
                  'A gyorstárcsázó névjegyek, fotók, napi rutinok és Kioszk-beállítások kizárólag a telefon belső tárhelyén jönnek létre.',
                ],
              },
              {
                lines: [
                  'Helyben a telefonon (az alkalmazás eltávolításáig).',
                  'Felhőszerveren: 0 másodperc (soha nem kerül feltöltésre).',
                ],
              },
              {
                title: 'Technikailag sem érhető el',
                lines: [
                  'Mivel felhőkapcsolat egyáltalán nem jön létre, az Üzemeltető semmilyen adatot nem kap meg és nem láthat.',
                ],
              },
              {
                badge: 'GDPR 25. cikk',
                lines: [
                  'Beépített és alapértelmezett adatvédelem (Privacy by Default – 100% helyi adatkezelés).',
                ],
              },
            ],
            [
              {
                badge: '1. FORRÁS · PÁROSÍTOTT',
                title: 'Gondozott (Profil, fotós kontaktok és napi rutinok)',
                lines: ['Aktív családi párosítás esetén'],
              },
              {
                lines: [
                  'Megjelenített név, telefonszám, ideiglenes 6-jegyű párosító kód.',
                  'Jogi és kétoldalú hozzájárulás UTC időbélyege (legalAcceptedAt, seniorConsentAccepted).',
                  'Gyorstárcsázó névjegyek (1–6. hely) és helyben 300×300 px-re tömörített Base64 fotók.',
                  'Napi rutinok szövege, opcionális emlékeztető fotója és a „Rendben” visszajelzés időpontja.',
                ],
              },
              {
                lines: [
                  'EU europe-west1 (Belgium) Firestore adatbázis.',
                  'Aktív párosítás alatt él; leválasztáskor a Base64 fotók azonnal törlődnek.',
                  'Appbeli GDPR törlés gombra: 0 másodperc alatt véglegesen megsemmisül (e-mailes kérésre max. 72 óra; elhagyott inaktív profilnál 90 nap).',
                ],
              },
              {
                title: 'Kliensoldali E2EE (Üzemeltetőnek technikailag sem elérhető)',
                lines: [
                  'A gyorstárcsázó névjegyek, a 300×300 px Base64 fotók, a napi rutinok, a fehérlistás számok és az SOS címzettek még a telefon elhagyása előtt kliensoldali végpontok közötti titkosítást (AES-256-GCM + ECDH P-256 családi kulcs) kapnak.',
                  'A visszafejtési kulcs kizárólag a párosított családi készülékeken létezik — így ezeket az adatokat az Üzemeltető még a nyers felhő-adatbázisban sem tudja visszafejteni és technikailag sem éri el.',
                ],
              },
              {
                badge: 'GDPR 6(1)(a)–(b), 7(1), 9(2)(a), 14. cikk',
                lines: [
                  'Szerződés teljesítése (6(1)(b)), kifejezett kétoldalú hozzájárulás (6(1)(a), 9(2)(a)), hozzájárulás igazolhatósága (7(1)) és közvetett adattájékoztatás (14. cikk).',
                ],
              },
            ],
            [
              {
                badge: '1. FORRÁS · TELEMETRIA',
                title: 'Gondozott (Helyzet, akku, WebRTC jelzés és hibajelentés)',
                lines: ['Csak párosított védelmi funkcióknál'],
              },
              {
                lines: [
                  'Aktuális GPS-koordináta és Otthoni Zóna sugár (kizárólag aktív zónafigyelésnél vagy SOS riasztáskor).',
                  'Akkumulátor %, töltési állapot, utolsó életjel (lastSeen), Kioszk/engedély-állapot és készüléktípus (OEM).',
                  'Ideiglenes WebRTC hívásjelzési csomag (SDP/ICE).',
                  'Riasztási események (alerts) és esetleges programhiba-kivonat (system_crashes).',
                ],
              },
              {
                lines: [
                  'WebRTC hívásjelzés: 0 másodperc a hívás bontása után (azonnal törlődik).',
                  'GPS és akku állapot: felülírásos (az új érték felülírja az előzőt, nincs útvonaltörténet).',
                  'Riasztási napló (alerts): 7 nap után automatikusan törlődik.',
                  'Műszaki hibakivonat: legfeljebb 30–90 nap.',
                ],
              },
              {
                title: 'Híváshang és SMS technikailag sem elérhető',
                lines: [
                  'A WebRTC hang- és videóhívások tartalma (DTLS-SRTP P2P titkosítás), az SMS-ek szövege és a telefonos hívásnapló technikailag sem érhető el az Üzemeltető számára.',
                  'Az adminfelületen csak műszaki állapotjelzők és hibakeresési kivonatok (stackTrace) láthatók szoftverjavítás céljából.',
                ],
              },
              {
                badge: 'GDPR 5(1)(e), 6(1)(a), (d), (f)',
                lines: [
                  'Korlátozott tárolhatóság (5(1)(e)), kifejezett hozzájárulás GPS-hez (6(1)(a)), létfontosságú érdek védelme SOS esetén (6(1)(d)) és jogos érdek a szoftverstabilitáshoz (6(1)(f)).',
                ],
              },
            ],
            [
              {
                badge: '2. FORRÁS · GONDOZÓ',
                title: 'Gondozó (Családtag Android app / Web PWA)',
                lines: ['Regisztrált családi segítő'],
              },
              {
                lines: [
                  'Megjelenített név, telefonszám (E.164) és/vagy e-mail-cím.',
                  'Technikai Firebase UID (authUid), FCM push token és a 6 értesítési csatorna kapcsolóállása.',
                  'Jogi és felelősségi nyilatkozat időbélyege (legalAcceptedAt, caregiverConsentAccepted).',
                  'A Gondozott javára távolról felvitt névjegyek, Hívási Fehérlista számok és rutinok.',
                ],
              },
              {
                lines: [
                  'EU europe-west1 Firestore (caregivers/{id}).',
                  'Aktív fiók fennállásáig; appbeli GDPR törlés gombra 0 másodperc alatt véglegesen törlődik (e-mailes kérésre max. 72 óra).',
                  'A Gondozó törlése nem teszi tönkre az idős szülő telefonjának helyi hívógombjait, csak tisztán bontja a felhőkapcsolatot.',
                ],
              },
              {
                title: 'Csak ügyfélszolgálati fiókstátusz',
                lines: [
                  'Az Üzemeltető kizárólag hibaelhárítási vagy adattörlési megkeresés teljesítésekor ellenőriz technikai fiók- és párosítási státuszt.',
                  'Jelszavakat nem tárolunk, reklámcélú profilalkotást nem végzünk.',
                ],
              },
              {
                badge: 'GDPR 6(1)(b)–(c), 7(1), 13. & 17. cikk',
                lines: [
                  'Szerződés teljesítése (6(1)(b)), jogi kötelezettség és hozzájárulás igazolása (6(1)(c), 7(1)), közvetlen tájékoztatás (13. cikk) és törléshez való jog (17. cikk).',
                ],
              },
            ],
            [
              {
                badge: '3. FORRÁS · GOOGLE PLAY',
                title: 'Google Play Billing (Google Ireland Limited)',
                lines: ['Családi Gondozói előfizetés esetén'],
              },
              {
                lines: [
                  'Előfizetési jogosultság állapota (próbaidőszak, aktív, lemondott, lejárt).',
                  'Csomagazonosító (SKU / plan ID), kriptográfiai purchaseToken, Google rendelésszám (GPA.xxxx), megújulási/lejárati időpont és pénznem-kód.',
                ],
              },
              {
                lines: [
                  'Aktív jogosultsági jelző: a fiók törléséig.',
                  'Jogszabály szerint kötelező számviteli és adózási elszámolási bizonylat-metaadat: 8 év (2000. évi C. törvény 169. § (2) bek.).',
                ],
              },
              {
                title: 'Bankkártyaadat technikailag sem elérhető',
                lines: [
                  'Az Üzemeltető soha nem kapja meg és technikailag sem éri el a bankkártyaszámot, CVC/CVV kódot, IBAN számlaszámot vagy Google-fiók jelszót.',
                  'Minden fizetési hitelesítő adatot kizárólag a Google Play (Merchant of Record) kezel saját PCI-DSS rendszerében.',
                ],
              },
              {
                badge: 'GDPR 6(1)(b), 6(1)(c) & 14. cikk',
                lines: [
                  'Prémium gondozói jogosultság aktiválása (6(1)(b)), kötelező számviteli megőrzés (6(1)(c)) és harmadik féltől kapott adat átláthatósága (14. cikk).',
                ],
              },
            ],
          ],
        },
        neverCollectedBox: {
          badge: 'Zéró Megfigyelési Garancia · GDPR 5. cikk (1) c)',
          title: 'Mit NEM gyűjt soha a SENEAR?',
          subtitle:
            'A SENEAR adattakarékossági architektúrája rendszerszinten zárja ki az alábbi 6 adatkategória gyűjtését, feltöltését vagy megtekintését:',
          items: [
            {
              label: '1. Nincs bankkártya- és számlaadat',
              text: 'Soha nem kérünk, nem kapunk és nem tárolunk bankkártyaszámot, CVC-kódot vagy netbanki belépési adatot.',
            },
            {
              label: '2. Nincs hívásrögzítés vagy lehallgatás',
              text: 'Sem a hagyományos GSM telefonhívásokba, sem a titkosított P2P WebRTC családi hívásokba nem látunk és nem hallgatunk bele.',
            },
            {
              label: '3. Nincs privát SMS-feltöltés (READ_SMS sincs)',
              text: 'Az alkalmazás nem kéri el az Android READ_SMS vagy RECEIVE_SMS engedélyt, és soha nem küld üzenetszöveget felhőszerverre.',
            },
            {
              label: '4. Nincs hívásnapló-feltöltés (READ_CALL_LOG sincs)',
              text: 'A telefonos csalók blokkolása 100%-ban helyben zajlik a készüléken, híváslisták külső szerverre másolása nélkül.',
            },
            {
              label: '5. Nincs GPS útvonal-történet (mozgásprofil)',
              text: 'Nem építünk napi térképes nyomvonalat; Otthoni Zóna figyeléskor az új pozíció mindig felülírja a korábbit.',
            },
            {
              label: '6. Nincs képernyőolvasás és nincs reklám-SDK',
              text: 'Az AccessibilityService nem olvas jelszavakat vagy más appokat, és 0 hirdetési/viselkedéskövető SDK működik a szoftverben.',
            },
          ],
        },
      },
      {
        id: 'bilateral-pairing-protocol',
        number: '4',
        gdprBadge: 'GDPR 6. cikk (1) a)–b), 7. cikk (1) & 9. cikk (2) a)',
        icon: 'users',
        title: 'Kétoldalú 6-jegyű párosítási és hozzájárulás-naplózási protokoll',
        intro:
          'A SENEAR kizárja a tudtán kívüli távoli csatlakozást egy többlépcsős kriptográfiai és jogi jóváhagyási folyamattal:',
        bullets: [
          {
            label: '0. lépés – Kötelező előzetes jogi hozzájárulás (Onboarding kapu):',
            text: 'Friss telepítéskor sem a Gondozott, sem a Gondozó szerepkör nem indítható el mindaddig, amíg a felhasználó tevőlegesen be nem jelöli az ÁSZF, az Adatkezelési Tájékoztató (GDPR 13–14. cikk) és jelen Működési Szabályzat elfogadását (alapértelmezetten üres jelölőnégyzet, legalAcceptedAt időbélyeggel).',
          },
          {
            label: '1. lépés – Gondozotti jóváhagyás és kódgenerálás:',
            text: 'A 6-jegyű ideiglenes párosító kód mindaddig nem jön létre, amíg a Gondozott készülékén jóvá nem hagyják az adatmegosztási tájékoztatót. Ekkor rögzül a seniorConsentAccepted: true állapot és az UTC időbélyeg.',
          },
          {
            label: '2. lépés – Gondozói jognyilatkozat és összekapcsolás:',
            text: 'A Gondozó készülékén a kódbeviteli mező csak a felelősségi és családi meghatalmazási nyilatkozat elfogadása (caregiverConsentAccepted: true + UTC időbélyeg) után válik aktívvá. A lejárati idővel védett 6-jegyű kód sikeres beváltása után épül fel a titkosított kapcsolat.',
          },
          {
            label: '3. lépés – Automatikus elsődleges hívógomb-feltöltés:',
            text: 'Sikeres párosításkor a Gondozó neve és telefonszáma automatikusan bekerül a Senior készülék első szabad gyorstárcsázó csempéjébe (1–4. csempe), így az idős hozzátartozó azonnal egyetlen érintéssel elérheti gondozóját.',
          },
        ],
      },
      {
        id: 'google-play-permissions',
        number: '5',
        gdprBadge: 'Google Play User Data Policy & GDPR 5. cikk (1) b)–c)',
        icon: 'shield',
        title: 'Google Play Megfelelőség — Érzékeny Android API-k és rendszerengedélyek tételes indoklása',
        intro:
          'A Google Play Áruház felhasználói adatokra és kiemelt jogosultságokra vonatkozó irányelveivel (Google Play Developer Program Policies) összhangban az alábbi táblázat tételesen bemutatja az AndroidManifest.xml-ben szereplő összes érzékeny API-t és engedélyt, azok kizárólagos célját és visszaélés-kizárási garanciáját:',
        table: {
          caption:
            'Google Play megfelelőségi mátrix: a SENEAR Android engedélyeinek és rendszerszolgáltatásainak tételes indoklása',
          headers: [
            'Android API / Engedély',
            'Érintett szerepkör',
            'Miért része az appnak? (Funkcionális indoklás)',
            'Szigorú adatvédelmi korlát (Mit NEM tesz soha + GDPR)',
          ],
          rows: [
            [
              {
                badge: 'LAUNCHER · KIOSZK',
                title: 'HOME Kezdőképernyő & REORDER_TASKS',
                lines: ['android.intent.category.HOME'],
              },
              'Csak Gondozott (Senior Kioszk)',
              {
                lines: [
                  'Az idős szülő meglévő telefonját átlátható, nagy fotós hívógombos alapértelmezett kezdőképernyővé alakítja, hogy ne tévedjen el bonyolult rendszermenükben.',
                ],
              },
              {
                badge: 'GDPR 25. cikk',
                lines: [
                  'A PIN-védett adminmenüben bármikor kikapcsolható; nem töröl, nem módosít és nem elemez más telepített alkalmazásokat.',
                ],
              },
            ],
            [
              {
                badge: 'ACCESSIBILITY API',
                title: 'BIND_ACCESSIBILITY_SERVICE',
                lines: ['PinningAutoClickerService (isAccessibilityTool="false")'],
              },
              'Csak Gondozott (Senior Kioszk)',
              {
                lines: [
                  'Aktív Kioszk módban segíti a képernyőrögzítés (Screen Pinning) stabilitását és megakadályozza a védett kezdőképernyő véletlen elhagyását.',
                ],
              },
              {
                badge: 'GDPR 5(1)(c) & 25. cikk',
                lines: [
                  'Szigorú Google Play korlát: NEM olvassa ki más appok képernyőtartalmát, NEM rögzít billentyűleütéseket vagy jelszavakat, és soha nem végez rejtett távoli kattintást.',
                ],
              },
            ],
            [
              {
                badge: 'CALL SCREENING API',
                title: 'BIND_SCREENING_SERVICE',
                lines: ['NogondCallScreeningService (CallScreeningService)'],
              },
              'Csak Gondozott (Senior Kioszk)',
              {
                lines: [
                  'Anti-Scam Hívásszűrő (Fehérlista): az ismeretlen hívószámokat és telefonos csalókat kicsörgés nélkül elutasítja a jóváhagyott családi névjegyzék alapján.',
                ],
              },
              {
                badge: 'GDPR 25. & 32. cikk',
                lines: [
                  '100%-ban helyben, a készüléken fut; bejövő vagy blokkolt híváslistát soha nem tölt fel felhőszerverre.',
                ],
              },
            ],
            [
              {
                badge: 'NOTIFICATION LISTENER',
                title: 'BIND_NOTIFICATION_LISTENER_SERVICE',
                lines: ['SenearSmsNotificationService'],
              },
              'Csak Gondozott (Senior Kioszk)',
              {
                lines: [
                  'A jóváhagyott családtagoktól érkező SMS-eket nagybetűs, kontrasztos Kioszk-kártyán jeleníti meg az idős félnek anélkül, hogy az app invazív READ_SMS vagy RECEIVE_SMS engedélyt kérne.',
                ],
              },
              {
                badge: 'GDPR 5(1)(c) & 25. cikk',
                lines: [
                  'Az ismeretlen feladójú üzeneteket figyelmen kívül hagyja; az értesítések és SMS-ek szövegét soha nem továbbítja szerverre vagy harmadik félnek.',
                ],
              },
            ],
            [
              {
                badge: 'TELEFÓNIA & SOS',
                title: 'CALL_PHONE, ANSWER_PHONE_CALLS, READ_PHONE_STATE, READ_CONTACTS, SEND_SMS',
                lines: ['Közvetlen hívás és SOS vészjelzés'],
              },
              'Gondozott & Gondozó (funkciófüggő)',
              {
                lines: [
                  'Egyérintéses fotós gyorstárcsázás, dedikált piros SOS hívás + opcionális vészhelyzeti GPS SMS küldése, névjegyválasztás a telefonkönyvből, valamint opcionális kihangosított hívásfogadás kizárólag párosított Gondozó hívásakor.',
                ],
              },
              {
                badge: 'GDPR 6(1)(a)–(b), (d)',
                lines: [
                  'Háttérben titkos hívást vagy fizetős SMS-t soha nem indít; a teljes telefonkönyvet nem tölti fel (kizárólag a kifejezetten kijelölt 1–6 gyorstárcsázót és fehérlistás számokat kezeli).',
                ],
              },
            ],
            [
              {
                badge: 'HÁTTÉRVÉDELEM',
                title: 'FOREGROUND_SERVICE_SPECIAL_USE, RECEIVE_BOOT_COMPLETED, REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
                lines: ['KioskPowerService & BootReceiver'],
              },
              'Csak Gondozott (Senior Kioszk)',
              {
                lines: [
                  'Biztosítja, hogy újraindítás után és agresszív gyártói akkukímélők (Xiaomi, Samsung, Huawei) mellett is működjön az SOS, az alacsony akku (<20%) riasztás és a rutin-ébresztés.',
                ],
              },
              {
                badge: 'GDPR 6(1)(b) & (d)',
                lines: [
                  'Kizárólag alacsony fogyasztású, eseményvezérelt Delta-Sync állapotjeleket küld; folyamatos háttérbeli szenzor- vagy hangmegfigyelést nem végez.',
                ],
              },
            ],
            [
              {
                badge: 'HELYMEGHATÁROZÁS',
                title: 'ACCESS_FINE_LOCATION & ACCESS_COARSE_LOCATION',
                lines: ['Otthoni Zóna (Geofence) és SOS koordináta'],
              },
              'Csak Gondozott (Párosított módban)',
              {
                lines: [
                  'Kizárólag az Otthoni Biztonsági Zóna elhagyásának/belépésének érzékelésére és SOS segélyhíváskor az aktuális tartózkodási hely elküldésére szolgál.',
                ],
              },
              {
                badge: 'GDPR 6(1)(a) & 5(1)(c)',
                lines: [
                  'Önálló módban teljesen inaktív; párosított módban is felülírásos (nem épít útvonaltörténetet), és soha nem használatos hirdetési célra.',
                ],
              },
            ],
            [
              {
                badge: 'MÉDIA & FOTÓ',
                title: 'CAMERA & RECORD_AUDIO',
                lines: ['WebRTC hívás és profilfotó-készítés'],
              },
              'Gondozott & Gondozó',
              {
                lines: [
                  'Kizárólag aktív, kétirányú WebRTC családi hang-/videóhívás közben, QR-kód beolvasásakor, illetve kontakt- vagy emlékeztető fotó készítésekor használatos.',
                ],
              },
              {
                badge: 'GDPR 32. cikk',
                lines: [
                  'Háttérben néma lehallgatást vagy felvételt soha nem végez; aktív híváskor a Senior kijelzőn teljes képernyős visszajelzés és hangjelzés él, a médiakapcsolat pedig DTLS-SRTP titkosítású (0 mp szervermegőrzés).',
                ],
              },
            ],
            [
              {
                badge: 'ÉBRESZTÉS & JELZÉS',
                title: 'SCHEDULE_EXACT_ALARM, USE_FULL_SCREEN_INTENT, SYSTEM_ALERT_WINDOW, POST_NOTIFICATIONS',
                lines: ['RoutineAlarmReceiver & SOS felugró ablak'],
              },
              'Gondozott & Gondozó',
              {
                lines: [
                  'Percre pontos napi rutin- és gyógyszeremlékeztetők megjelenítése, valamint bejövő családi hívás és SOS vészriasztás teljes képernyős felébresztése zárolt kijelzőn is.',
                ],
              },
              {
                badge: 'GDPR 6(1)(b)',
                lines: [
                  'Kizárólag a család által beállított emlékeztetőket és vészjelzéseket jeleníti meg; reklámok vagy kéretlen ablakok megjelenítésére soha nem használatos.',
                ],
              },
            ],
            [
              {
                badge: 'KIOSZK HANGERŐ & ZÁR',
                title: 'MODIFY_AUDIO_SETTINGS, ACCESS_NOTIFICATION_POLICY, WRITE_SETTINGS, BIND_DEVICE_ADMIN',
                lines: ['NogondDeviceAdminReceiver & Hangerő-helyreállítás'],
              },
              'Csak Gondozott (Senior Kioszk)',
              {
                lines: [
                  'Lehetővé teszi a véletlenül lenémított csengetési hangerő távoli visszaállítását családi vészhelyzetben, a kontrasztos Kioszk-háttér beállítását és a helyi képernyőzár stabilitását.',
                ],
              },
              {
                badge: 'GDPR 6(1)(b) & 25. cikk',
                lines: [
                  'Soha nem végez távoli gyári visszaállítást (factory reset / személyes adattörlést a telefon más mappáiban), és bármikor visszavonható a rendszerbeállításokban.',
                ],
              },
            ],
          ],
        },
        footerNote:
          'Műszaki ellenőrzési megjegyzés (AndroidManifest.xml): a SENEAR szándékosan NEM kéri el a READ_SMS, RECEIVE_SMS és READ_CALL_LOG engedélyeket, valamint android:allowBackup="false" beállítással akadályozza meg a helyi Kioszk-adatok automatikus harmadik feles felhőmentését.',
      },
      {
        id: 'anti-scam-sos-geofence',
        number: '6',
        gdprBadge: 'GDPR 6. cikk (1) a), d), 25. & 32. cikk',
        icon: 'phone-call',
        title: 'Telefonos csalásvédelem (Helyi Whitelist), Kioszk SMS, SOS lánc és Otthoni Zóna',
        intro:
          'Az időseket célzó telefonos csalások kivédése és a vészhelyzeti riasztás az adattakarékosság elvére épül:',
        bullets: [
          {
            label: 'Helyi CallScreeningService fehérlista (Anti-Scam Whitelist):',
            text: 'Bekapcsolt védelemnél az Android hivatalos CallScreeningService felülete helyben, a készüléken veti össze a bejövő hívószámot a jóváhagyott névjegyekkel. Az ismeretlen hívószámokat a telefon kicsörgés nélkül elutasítja, miközben a hívásnapló nem kerül fel külső szerverre.',
          },
          {
            label: 'Nagybetűs Kioszk SMS és védett kihangosítás:',
            text: 'A jóváhagyott családtagoktól érkező üzenetek nagybetűs, kontrasztos kártyán olvashatók a Kioszk képernyőn, a párosított gondozók hívásaihoz pedig opcionálisan engedélyezhető a kihangosított automatikus hívásfogadás.',
          },
          {
            label: 'Megerősített, többcsatornás SOS riasztási lánc:',
            text: 'A piros SOS gomb megnyomásakor (véletlen érintés elleni védelemmel) a készülék párhuzamosan magas prioritású felhő-riasztást (FCM push + aktuális GPS-koordináta), opcionális vészhelyzeti SMS-t és közvetlen telefonhívást indít a kijelölt gondozó(k) felé.',
          },
          {
            label: 'Felülírásos (Overwrite-in-Place) Otthoni Biztonsági Zóna:',
            text: 'A Gondozó által kijelölt Otthoni Zóna elhagyásakor vagy oda való visszatéréskor értesítés képződik. Folyamatos mozgásprofil vagy útvonaltörténet nem készül: az új koordináta mindig felülírja a korábbi állapotértéket.',
          },
        ],
      },
      {
        id: 'webrtc-photo-pipeline',
        number: '7',
        gdprBadge: 'GDPR 25. cikk & 32. cikk (1) a) (Titkosítás)',
        icon: 'lock',
        title: 'Titkosított P2P WebRTC hívások és nyilvános URL nélküli Base64 fotókezelés',
        intro:
          'A családi hang-/videókapcsolat és a fényképes felület nyilvános fájltárhelyek (CDN linkek) nélkül működik:',
        bullets: [
          {
            label: 'Végpontok közötti DTLS-SRTP WebRTC hívások:',
            text: 'Az alkalmazáson belüli Wi-Fi/mobilnet hang- és videóhívások közvetlen P2P titkosítást használnak (szigorú tűzfal esetén titkosított TURN átjátszóval). A hívásjelzési metaadatok a beszélgetés bontásakor 0 másodperc alatt törlődnek, felvétel soha nem készül, a Senior telefon pedig mindig hangjelzéssel és teljes képernyős élő sávval jelzi az aktív kapcsolatot.',
          },
          {
            label: 'Kliensoldali E2EE (AES-256-GCM + ECDH P-256) Base64 fotók és rutinok (Zero-Knowledge):',
            text: 'A gyorstárcsázó csempék és napi rutinok fotóit az alkalmazás feltöltés előtt helyben 300×300 pixelre tömöríti, majd a névjegyekkel és rutinokkal együtt a családi készülékek közös kulcsával (AES-256-GCM + ECDH P-256) kliensoldalon titkosítja. Nem jönnek létre nyilvános képlinkek, és a titkosított tartalmat az Üzemeltető technikailag sem tudja visszafejteni.',
          },
        ],
      },
      buildCoreEuSecuritySection('hu', '8', {
        label: 'Eseményvezérelt Delta-Sync és OEM akkumulátor-diagnosztika:',
        text: 'A folyamatos akkumulátormerítés helyett a Senior készülék csak érdemi állapotváltozáskor (töltöttségi küszöb, töltő csatlakoztatása, ritka életjel) küld kis méretű frissítést. Ha a gyártói rendszer (Xiaomi, Samsung, Huawei, OPPO) korlátozza a háttérvédelmet, az app és a https://gabba.bond/senear/setup útmutató lépésről lépésre segít a beállításban.',
      }),
      {
        id: 'deletion-incident-response',
        number: '9',
        gdprBadge: 'GDPR 17. cikk (Törlés) & 33–34. cikk (72 órás NAIH)',
        icon: 'trash',
        title: 'Azonnali rekurzív adattörlés (0 mp) és 72 órás incidenskezelési protokoll',
        intro:
          'Az adatéletciklus lezárását és az esetleges biztonsági események kezelését determinisztikus eljárásrend védi:',
        bullets: [
          {
            label: 'Egynyomásos rekurzív adattörlés (0 másodperces felhőmegőrzés):',
            text: 'Amikor a Gondozó vagy a Gondozott megnyomja a végleges GDPR adattörlés gombot, az europe-west1 szerverfolyamat atomi művelettel törli a profilokat, szinkronizált névjegyeket, Base64 fotókat, rutinokat, riasztási naplókat, párosító kódokat és valós idejű jelenléti csomópontokat, majd alaphelyzetbe állítja a helyi alkalmazástárhelyet. E-mailben (gabba@gabba.bond) kért törlést legfeljebb 72 órán belül végrehajtunk.',
          },
          {
            label: 'GDPR 33–34. cikk szerinti 72 órás incidenskezelés:',
            text: 'Személyes adatokat érintő biztonsági incidens észlelésekor az Üzemeltető haladéktalanul megkezdi a műszaki elszigetelést és elhárítást, kockázat esetén 72 órán belül bejelentést tesz a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH), magas kockázat fennállásakor pedig közvetlenül és késedelem nélkül értesíti az érintett felhasználókat.',
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // GERMAN (DE) — BETRIEBS-, DSGVO- & GOOGLE-PLAY-TRANSPARENZRICHTLINIE
  // ===========================================================================
  de: {
    kind: 'operations',
    shortTabLabel: 'Betriebsrichtlinie',
    breadcrumbCurrent: 'Betriebs-, DSGVO- & Google-Play-Transparenzrichtlinie',
    badges: [
      'Volle DSGVO- & Google-Play-Transparenz',
      'EU-Cloud-Region: europe-west1',
      'Daten- & Berechtigungsmatrix',
    ],
    title: 'BETRIEBS- & DATENTRANSPARENZRICHTLINIE – SENEAR',
    subtitle:
      'Diese Betriebs- und Datentransparenzrichtlinie legt für jeden Abschnitt die exakte DSGVO-Rechtsgrundlage offen und zeigt in übersichtlichen Tabellen, welche Daten vom betreuten Elternteil (Senior), von der Betreuungsperson und von Google Play eingehen, wie lange sie gespeichert werden, worauf der Betreiber zugreifen kann (und worauf technisch niemals) und warum bestimmte Android-Berechtigungen erforderlich sind.',
    effectiveDateValue: '7. November 2026',
    quickSummaryTitle: 'Vollständige Transparenz in 4 Grundprinzipien',
    quickSummaryItems: [
      {
        title: '3 Datenquellen im Klartext',
        desc: 'Eine zentrale Matrix zeigt alle Daten von Senior, Betreuungsperson und Google Play inklusive Speicherdauer und Sichtbarkeitsgrenzen.',
      },
      {
        title: 'Einzelmodus = 0 % Cloud',
        desc: 'Ohne Familienkopplung arbeitet der Senioren-Kiosk zu 100 % lokal auf dem Handy – es wird kein einziges Byte an Server übertragen.',
      },
      {
        title: 'Google-Play-Konformität',
        desc: 'Jede sensible Android-Schnittstelle (Accessibility, CallScreening, NotificationListener, GPS) ist streng zweckgebunden dokumentiert.',
      },
      {
        title: 'Delta-Sync & 0-Sek.-Löschung',
        desc: 'Überschreibende Statuswerte ohne Bewegungsprofil und sofortige rekursive Komplettlöschung mit 0 Sekunden Cloud-Nachhaltung.',
      },
    ],
    operatorSectionTitle: '1. Betreiberverantwortung, Verantwortlicher & Systemgeltungsbereich',
    operatorSectionGdprBadge: 'Art. 4 Nr. 7, Art. 13 Abs. 1 lit. a & Art. 24 DSGVO',
    sections: [
      {
        id: 'system-architecture',
        number: '2',
        gdprBadge: 'Art. 25 DSGVO (Datenschutz durch Technikgestaltung & Voreinstellung)',
        icon: 'smartphone',
        title: 'Duale Systemarchitektur: Eigenständiger Modus (0 % Cloud) vs. Gekoppelter Modus',
        intro:
          'SENEAR (bond.gabba.senear) wird als einheitliches Android-Paket installiert und trennt die Datenverarbeitung strikt nach gewählter Rolle und Kopplungsstatus:',
        subsections: [
          {
            subtitle: 'Senioren-Kiosk – Eigenständiger Modus (Standalone)',
            badge: '0 % Cloud-Datenverkehr',
            paragraphs: [
              'Arbeitet als geschützter Android-Startbildschirm (HOME Launcher) mit hohem Kontrast, 4 (optional 6) großen Foto-Kurzwahltasten, lokalem Anruffilter und fester roter SOS-Leiste.',
              'Solange keine Kopplung mit einem Angehörigen erfolgt, verbleiben sämtliche Kontakte, Fotos, Tagesroutinen und Einstellungen zu 100 % lokal im Gerätespeicher – ohne jede Serververbindung.',
            ],
          },
          {
            subtitle: 'Gekoppeltes Senioren- & Betreuer-Ökosystem (Caregiver)',
            badge: 'EU europe-west1 Synchronisation',
            paragraphs: [
              'Nach beidseitiger Freigabe über einen 6-stelligen Kopplungscode können bis zu 4 autorisierte Angehörige vom eigenen Handy aus Fotokontakte, Klingellautstärke, Tagesroutinen und die Sichere Heimzone verwalten.',
              'Der Datenaustausch erfolgt ausschließlich über die europäische Google-Cloud-/Firebase-Region europe-west1 (St. Ghislain, Belgien).',
            ],
          },
        ],
      },
      {
        id: 'incoming-data-retention-matrix',
        number: '3',
        gdprBadge: 'Art. 5 Abs. 1 lit. c–e, Art. 13, 14 & 30 DSGVO',
        icon: 'database',
        title: 'Eingehende Daten aus 3 Quellen, Speicherdauer & Betreiber-Zugriffsgrenzen (Datenmatrix)',
        intro:
          'Die folgende Transparenztabelle zeigt lückenlos, welche Daten vom Handy des Seniors, vom Gerät der Betreuungsperson und von Google Play übermittelt werden, wie lange diese gespeichert bleiben und was für den Betreiber einsehbar bzw. technisch unzugänglich ist:',
        table: {
          caption:
            'SENEAR Datenmatrix: Eingehende Daten aus 3 Quellen, Aufbewahrungsfristen, Betreiber-Sichtbarkeit und DSGVO-Rechtsgrundlagen',
          headers: [
            'Datenquelle',
            'Eingehende Daten (Konkrete Felder)',
            'Speicherort & Speicherdauer',
            'Sichtbarkeit & Zugriffsgrenzen des Betreibers',
            'DSGVO-Rechtsgrundlage',
          ],
          rows: [
            [
              {
                badge: 'QUELLE 1 · OFFLINE',
                title: 'Betreute Person / Senior (Eigenständiger Modus)',
                lines: ['Nutzung ohne Familienkopplung'],
              },
              {
                title: '0 Byte Cloud-Übertragung',
                lines: [
                  'Kurzwahlkontakte, Fotos, Tagesroutinen und Kiosk-Einstellungen werden ausschließlich lokal auf dem Handy gespeichert.',
                ],
              },
              {
                lines: [
                  'Ausschließlich lokal auf dem Telefon (bis zur Deinstallation der App).',
                  'Cloud-Server: 0 Sekunden (keine Übertragung).',
                ],
              },
              {
                title: 'Technisch unzugänglich',
                lines: [
                  'Da keinerlei Serververbindung besteht, erhält und sieht der Betreiber keinerlei Daten.',
                ],
              },
              {
                badge: 'Art. 25 DSGVO',
                lines: [
                  'Datenschutz durch datenschutzfreundliche Voreinstellungen (Privacy by Default – 100 % lokale Verarbeitung).',
                ],
              },
            ],
            [
              {
                badge: 'QUELLE 1 · GEKOPPELT',
                title: 'Betreute Person / Senior (Profil, Fotokontakte & Routinen)',
                lines: ['Bei aktiver Familienkopplung'],
              },
              {
                lines: [
                  'Anzeigename, Rufnummer, temporärer 6-stelliger Kopplungscode.',
                  'UTC-Zeitstempel der Rechts- und Kopplungsfreigabe (legalAcceptedAt, seniorConsentAccepted).',
                  'Synchronisierte Kurzwahlkontakte (Platz 1–6) sowie lokal auf 300×300 px komprimierte Base64-Fotos.',
                  'Tagesroutinen inkl. optionalem Erinnerungsfoto und Bestätigungszeitpunkt („Alles in Ordnung“).',
                ],
              },
              {
                lines: [
                  'EU europe-west1 (Belgien) Firestore.',
                  'Nur während aktiver Kopplung; beim Entkoppeln werden Base64-Fotos sofort geleert.',
                  'Bei In-App-DSGVO-Löschung: 0 Sekunden (sofortige endgültige Vernichtung; per E-Mail max. 72 Std.; verwaiste inaktive Profile nach 90 Tagen).',
                ],
              },
              {
                title: 'Clientseitige E2EE (Für Betreiber technisch unzugänglich)',
                lines: [
                  'Kurzwahlkontakte, 300×300 px Base64-Fotos, Tagesroutinen, Whitelist-Rufnummern und SOS-Empfänger werden bereits auf dem Endgerät vor der Übertragung Ende-zu-Ende verschlüsselt (AES-256-GCM + ECDH P-256 Familienschlüssel).',
                  'Der Entschlüsselungsschlüssel verbleibt ausschließlich auf den gekoppelten Familiengeräten – der Betreiber kann diese Inhalte selbst in der Cloud-Datenbank technisch nicht entschlüsseln oder einsehen.',
                ],
              },
              {
                badge: 'Art. 6(1)(a)–(b), 7(1), 9(2)(a), 14 DSGVO',
                lines: [
                  'Vertragserfüllung (Art. 6 Abs. 1 lit. b), ausdrückliche Einwilligung (Art. 6 Abs. 1 lit. a, Art. 9 Abs. 2 lit. a), Nachweispflicht (Art. 7 Abs. 1) & Art. 14 DSGVO.',
                ],
              },
            ],
            [
              {
                badge: 'QUELLE 1 · TELEMETRIE',
                title: 'Betreute Person / Senior (Standort, Akku, WebRTC-Signal & Fehlerdiagnose)',
                lines: ['Nur bei aktivierten Schutzfunktionen'],
              },
              {
                lines: [
                  'Aktuelle GPS-Koordinate und Heimzonen-Radius (ausschließlich bei aktiver Heimzone oder SOS-Notruf).',
                  'Akkustand in %, Ladestatus, letztes Lebenszeichen (lastSeen), Kiosk-/Berechtigungsstatus & Gerätemodell (OEM).',
                  'Kurzlebiges WebRTC-Signalisierungspaket (SDP/ICE).',
                  'Alarmereignisse (alerts) sowie technische Absturzberichte (system_crashes).',
                ],
              },
              {
                lines: [
                  'WebRTC-Signalisierung: 0 Sekunden nach Gesprächsende (sofortige Löschung).',
                  'GPS & Akkustatus: überschreibend (jeder neue Wert überschreibt den alten – keine Routenhistorie).',
                  'Alarmprotokolle (alerts): automatische Löschung nach 7 Tagen.',
                  'Technische Fehlerprotokolle: max. 30–90 Tage.',
                ],
              },
              {
                title: 'Gesprächsinhalte & SMS technisch unzugänglich',
                lines: [
                  'Sprach-/Videoströme (P2P DTLS-SRTP-Verschlüsselung), private SMS-Inhalte und Telefon-Anruflisten sind für den Betreiber technisch unzugänglich.',
                  'Im Admin-System sind lediglich technische Statuswerte und Fehler-Stacktraces zur Fehlerbehebung sichtbar.',
                ],
              },
              {
                badge: 'Art. 5(1)(e), 6(1)(a), (d), (f) DSGVO',
                lines: [
                  'Speicherbegrenzung (Art. 5 Abs. 1 lit. e), Einwilligung für Standort (Art. 6 Abs. 1 lit. a), lebenswichtige Interessen bei SOS (Art. 6 Abs. 1 lit. d) & IT-Stabilität (Art. 6 Abs. 1 lit. f).',
                ],
              },
            ],
            [
              {
                badge: 'QUELLE 2 · BETREUER',
                title: 'Betreuungsperson / Angehörige (Android-App / Web-PWA)',
                lines: ['Registrierte Familienangehörige'],
              },
              {
                lines: [
                  'Anzeigename, Telefonnummer (E.164) und/oder E-Mail-Adresse.',
                  'Technische Firebase-UID (authUid), FCM-Push-Token und Einstellungen der 6 Benachrichtigungskanäle.',
                  'Zeitstempel der Rechts- und Berechtigungserklärung (legalAcceptedAt, caregiverConsentAccepted).',
                  'Für das Seniorengerät hinterlegte Kurzwahlkontakte, Whitelist-Rufnummern und Tagesroutinen.',
                ],
              },
              {
                lines: [
                  'EU europe-west1 Firestore (caregivers/{id}).',
                  'Für die Dauer des aktiven Kontos; bei In-App-DSGVO-Löschung in 0 Sekunden endgültig gelöscht (per E-Mail max. 72 Std.).',
                  'Die Kontolöschung zerstört nicht die lokalen Kurzwahltasten auf dem Handy des Seniors, sondern trennt sauber die Cloud-Verbindung.',
                ],
              },
              {
                title: 'Nur technischer Kontostatus bei Support',
                lines: [
                  'Der Betreiber prüft technische Konto- oder Kopplungskennungen ausschließlich zur Bearbeitung von Support- oder Löschanfragen.',
                  'Es werden keine Passwörter gespeichert und kein Marketing-Profiling durchgeführt.',
                ],
              },
              {
                badge: 'Art. 6(1)(b)–(c), 7(1), 13 & 17 DSGVO',
                lines: [
                  'Vertragserfüllung (Art. 6 Abs. 1 lit. b), Nachweis- und Rechtspflicht (Art. 6 Abs. 1 lit. c, Art. 7 Abs. 1), Informationspflicht (Art. 13) & Recht auf Löschung (Art. 17).',
                ],
              },
            ],
            [
              {
                badge: 'QUELLE 3 · GOOGLE PLAY',
                title: 'Google Play Billing (Google Ireland Limited)',
                lines: ['Bei Abschluss eines Betreuer-Abos'],
              },
              {
                lines: [
                  'Abonnement-Berechtigungsstatus (Testphase, aktiv, gekündigt, abgelaufen).',
                  'Tarif-ID (SKU / plan ID), kryptografisches purchaseToken, Google-Bestellnummer (GPA.xxxx), Verlängerungs-/Ablaufzeitpunkt und Währungscode.',
                ],
              },
              {
                lines: [
                  'Aktives Berechtigungs-Flag: bis zur Kontolöschung.',
                  'Gesetzlich vorgeschriebene buchhalterische und steuerliche Abrechnungsmetadaten: 8 Jahre (§ 169 Abs. 2 des ungarischen Rechnungslegungsgesetzes C/2000).',
                ],
              },
              {
                title: 'Zahlungsdaten technisch unzugänglich',
                lines: [
                  'Der Betreiber erhält niemals und hat technisch keinerlei Zugriff auf Kreditkartennummern, CVC/CVV-Prüfziffern, IBAN-Bankdaten oder Google-Kontopasswörter.',
                  'Sämtliche Zahlungsdaten verbleiben ausschließlich bei Google Play (Merchant of Record).',
                ],
              },
              {
                badge: 'Art. 6(1)(b), 6(1)(c) & 14 DSGVO',
                lines: [
                  'Freischaltung des Abonnements (Art. 6 Abs. 1 lit. b), gesetzliche Aufbewahrungspflicht (Art. 6 Abs. 1 lit. c) & Drittquellen-Transparenz (Art. 14 DSGVO).',
                ],
              },
            ],
          ],
        },
        neverCollectedBox: {
          badge: 'Null-Überwachungs-Garantie · Art. 5 Abs. 1 lit. c DSGVO',
          title: 'Was SENEAR NIEMALS erhebt',
          subtitle:
            'Unsere Architektur schließt die Erhebung, Übertragung oder Einsichtnahme in die folgenden 6 Datenkategorien technisch und organisatorisch aus:',
          items: [
            {
              label: '1. Keine Bank- oder Kreditkartendaten',
              text: 'Wir fragen, empfangen oder speichern niemals Kartennummern, CVC-Codes oder Online-Banking-Zugangsdaten.',
            },
            {
              label: '2. Keine Gesprächsaufzeichnung oder Mithören',
              text: 'Weder reguläre Telefonate noch verschlüsselte P2P-WebRTC-Familienanrufe werden aufgezeichnet oder abgehört.',
            },
            {
              label: '3. Kein SMS-Cloud-Upload (kein READ_SMS)',
              text: 'Die App fordert weder READ_SMS noch RECEIVE_SMS an und lädt niemals private SMS-Texte auf Server hoch.',
            },
            {
              label: '4. Kein Upload von Anrufprotokollen (kein READ_CALL_LOG)',
              text: 'Die Anti-Scam-Anruffilterung erfolgt zu 100 % lokal auf dem Gerät ohne Kopie von Anruflisten in die Cloud.',
            },
            {
              label: '5. Keine GPS-Routenhistorie (kein Bewegungsprofil)',
              text: 'Es werden keine täglichen Wegstrecken gespeichert; jeder neue Standortwert überschreibt den vorherigen.',
            },
            {
              label: '6. Kein Auslesen fremder Apps & keine Werbe-SDKs',
              text: 'Der AccessibilityService liest weder Passwörter noch fremde Bildschirminhalte, und die App enthält 0 Werbe-Tracker.',
            },
          ],
        },
      },
      {
        id: 'bilateral-pairing-protocol',
        number: '4',
        gdprBadge: 'Art. 6 Abs. 1 lit. a–b, Art. 7 Abs. 1 & Art. 9 Abs. 2 lit. a DSGVO',
        icon: 'users',
        title: 'Beidseitiges 6-stelliges Kopplungs- & Einwilligungsprotokoll',
        intro:
          'SENEAR verhindert technisch jede unbemerkte Fernkopplung durch einen mehrstufigen Freigabe- und Nachweisprozess:',
        bullets: [
          {
            label: 'Schritt 0 – Verpflichtende Rechtseinwilligung beim Erststart (Onboarding-Sperre):',
            text: 'Bei einer Neuinstallation sind sowohl der Senioren- als auch der Betreuermodus gesperrt, bis das Kontrollkästchen für AGB, Datenschutzerklärung (Art. 13 & 14 DSGVO) und diese Betriebsrichtlinie aktiv angehakt wird (standardmäßig deaktiviert, protokolliert mit legalAcceptedAt).',
          },
          {
            label: 'Schritt 1 – Freigabe auf dem Seniorengerät:',
            text: 'Der zeitlich begrenzte 6-stellige Kopplungscode wird erst erzeugt, nachdem auf dem Handy des Seniors der Hinweis zur Datenfreigabe aktiv bestätigt wurde (seniorConsentAccepted: true inkl. UTC-Zeitstempel).',
          },
          {
            label: 'Schritt 2 – Rechtserklärung der Betreuungsperson:',
            text: 'Auf dem Betreuergerät wird die Codeeingabe erst freigeschaltet, nachdem die Betreuungsperson ihre familiäre/rechtliche Befugnis verbindlich bestätigt hat (caregiverConsentAccepted: true inkl. UTC-Zeitstempel).',
          },
          {
            label: 'Schritt 3 – Automatische Kurzwahl-Belegung:',
            text: 'Nach erfolgreicher Kopplung werden Name und Rufnummer der Betreuungsperson automatisch auf die erste freie Kurzwahlkachel (Platz 1–4) des Seniors gelegt.',
          },
        ],
      },
      {
        id: 'google-play-permissions',
        number: '5',
        gdprBadge: 'Google Play Nutzerdaten-Richtlinie & Art. 5 Abs. 1 lit. b–c DSGVO',
        icon: 'shield',
        title: 'Google-Play-Konformität — Technische Begründung sensibler Android-APIs & Berechtigungen',
        intro:
          'Im Einklang mit den Google-Play-Entwicklerrichtlinien dokumentiert die folgende Tabelle sämtliche in der Datei AndroidManifest.xml deklarierten Systemberechtigungen, ihren exakten Funktionszweck und ihre technischen Datenschutzgrenzen:',
        table: {
          caption:
            'Google-Play-Konformitätsmatrix: Technische Begründung aller Android-Berechtigungen und Systemdienste von SENEAR',
          headers: [
            'Android-API / Berechtigung',
            'Betroffene Rolle',
            'Warum Teil der App? (Funktionale Begründung)',
            'Strikte Datenschutzgrenze (Was NIEMALS geschieht + DSGVO)',
          ],
          rows: [
            [
              {
                badge: 'LAUNCHER · KIOSK',
                title: 'HOME-Startbildschirm & REORDER_TASKS',
                lines: ['android.intent.category.HOME'],
              },
              'Nur Senior (Senioren-Kiosk)',
              {
                lines: [
                  'Verwandelt das vorhandene Handy der Eltern in einen übersichtlichen Startbildschirm mit großen Fototasten und schützt vor versehentlichem Verirren in Systemmenüs.',
                ],
              },
              {
                badge: 'Art. 25 DSGVO',
                lines: [
                  'Jederzeit im PIN-geschützten Verwaltungsmenü abschaltbar; verändert oder löscht keinerlei andere installierte Apps.',
                ],
              },
            ],
            [
              {
                badge: 'ACCESSIBILITY API',
                title: 'BIND_ACCESSIBILITY_SERVICE',
                lines: ['PinningAutoClickerService (isAccessibilityTool="false")'],
              },
              'Nur Senior (Senioren-Kiosk)',
              {
                lines: [
                  'Unterstützt im aktiven Kiosk-Modus die Bildschirmfixierung (Screen Pinning) und verhindert ein unbeabsichtigtes Verlassen der geschützten Oberfläche.',
                ],
              },
              {
                badge: 'Art. 5(1)(c) & 25 DSGVO',
                lines: [
                  'Strikte Google-Play-Garantie: Liest KEINE Bildschirminhalte fremder Apps, zeichnet KEINE Tastatureingaben oder Passwörter auf und führt keine verdeckten Fernklicks aus.',
                ],
              },
            ],
            [
              {
                badge: 'CALL SCREENING API',
                title: 'BIND_SCREENING_SERVICE',
                lines: ['NogondCallScreeningService (CallScreeningService)'],
              },
              'Nur Senior (Senioren-Kiosk)',
              {
                lines: [
                  'Anti-Scam-Anruffilter (Whitelist): Blockiert unbekannte Rufnummern und Telefonbetrüger lautlos vor dem ersten Klingeln anhand der freigegebenen Familienkontakte.',
                ],
              },
              {
                badge: 'Art. 25 & 32 DSGVO',
                lines: [
                  'Arbeitet zu 100 % lokal auf dem Gerät; eingehende oder blockierte Anruflisten werden niemals auf Cloud-Server hochgeladen.',
                ],
              },
            ],
            [
              {
                badge: 'NOTIFICATION LISTENER',
                title: 'BIND_NOTIFICATION_LISTENER_SERVICE',
                lines: ['SenearSmsNotificationService'],
              },
              'Nur Senior (Senioren-Kiosk)',
              {
                lines: [
                  'Zeigt eingehende SMS von freigegebenen Familienmitgliedern als kontrastreiche Großschrift-Karte auf dem Kiosk-Bildschirm an – ganz ohne invasive READ_SMS- oder RECEIVE_SMS-Berechtigung.',
                ],
              },
              {
                badge: 'Art. 5(1)(c) & 25 DSGVO',
                lines: [
                  'Nachrichten unbekannter Absender werden ignoriert; Benachrichtigungs- und SMS-Texte verlassen niemals das Gerät.',
                ],
              },
            ],
            [
              {
                badge: 'TELEFONIE & SOS',
                title: 'CALL_PHONE, ANSWER_PHONE_CALLS, READ_PHONE_STATE, READ_CONTACTS, SEND_SMS',
                lines: ['Direktwahl & SOS-Notruf'],
              },
              'Senior & Betreuungsperson (funktionsabhängig)',
              {
                lines: [
                  'Ein-Tipp-Fotokurzwahl, roter SOS-Notruf inkl. optionaler Notfall-GPS-SMS, Kontaktauswahl aus dem Telefonbuch sowie optionale Freisprech-Annahme ausschließlich für gekoppelte Betreuer.',
                ],
              },
              {
                badge: 'Art. 6(1)(a)–(b), (d) DSGVO',
                lines: [
                  'Startet niemals heimliche Anrufe oder SMS im Hintergrund; lädt niemals das gesamte Adressbuch hoch (nur die aktiv gewählten 1–6 Kontakte bzw. Whitelist-Nummern).',
                ],
              },
            ],
            [
              {
                badge: 'HINTERGRUNDSCHUTZ',
                title: 'FOREGROUND_SERVICE_SPECIAL_USE, RECEIVE_BOOT_COMPLETED, REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
                lines: ['KioskPowerService & BootReceiver'],
              },
              'Nur Senior (Senioren-Kiosk)',
              {
                lines: [
                  'Gewährleistet, dass SOS-Bereitschaft, Akkuwarnung (< 20 %) und Tagesroutinen auch nach einem Geräteneustart sowie unter strengen Hersteller-Akkusparmodi zuverlässig aktiv bleiben.',
                ],
              },
              {
                badge: 'Art. 6(1)(b) & (d) DSGVO',
                lines: [
                  'Sendet ausschließlich sparsame ereignisbasierte Delta-Sync-Updates; keinerlei dauerhafte Sensor- oder Audioüberwachung im Hintergrund.',
                ],
              },
            ],
            [
              {
                badge: 'STANDORT',
                title: 'ACCESS_FINE_LOCATION & ACCESS_COARSE_LOCATION',
                lines: ['Sichere Heimzone (Geofence) & SOS-Position'],
              },
              'Nur Senior (im gekoppelten Modus)',
              {
                lines: [
                  'Dient ausschließlich der Erkennung des Verlassens/Betretens der definierten Heimzone sowie der Übermittlung des aktuellen Standorts im SOS-Notfall.',
                ],
              },
              {
                badge: 'Art. 6(1)(a) & 5(1)(c) DSGVO',
                lines: [
                  'Im eigenständigen Modus vollständig inaktiv; im gekoppelten Modus überschreibend ohne Bewegungsprofil und niemals für Werbezwecke genutzt.',
                ],
              },
            ],
            [
              {
                badge: 'MEDIEN & KAMERA',
                title: 'CAMERA & RECORD_AUDIO',
                lines: ['WebRTC-Gespräche, QR-Scanner & Kontaktfotos'],
              },
              'Senior & Betreuungsperson',
              {
                lines: [
                  'Wird ausschließlich während aktiver zweiseitiger WebRTC-Familiengespräche, beim Scannen des Kopplungs-QR-Codes sowie beim Aufnehmen von Kontakt-/Erinnerungsfotos genutzt.',
                ],
              },
              {
                badge: 'Art. 32 DSGVO',
                lines: [
                  'Keinerlei verdeckte Ton- oder Bildaufnahme im Hintergrund; aktive Anrufe werden auf dem Seniorengerät akustisch und im Vollbild signalisiert und Ende-zu-Ende (DTLS-SRTP) mit 0 Sek. Speicherung übertragen.',
                ],
              },
            ],
            [
              {
                badge: 'ALARME & VOLLBILD',
                title: 'SCHEDULE_EXACT_ALARM, USE_FULL_SCREEN_INTENT, SYSTEM_ALERT_WINDOW, POST_NOTIFICATIONS',
                lines: ['RoutineAlarmReceiver & SOS-Vollbildanzeige'],
              },
              'Senior & Betreuungsperson',
              {
                lines: [
                  'Minutengenaue Anzeige von Tagesroutinen und Medikamentenerinnerungen sowie sofortiges Aufwecken des Sperrbildschirms bei eingehenden Familienanrufen oder SOS-Alarmen.',
                ],
              },
              {
                badge: 'Art. 6(1)(b) DSGVO',
                lines: [
                  'Zeigt ausschließlich familiäre Erinnerungen und Notrufe an – niemals Werbung oder unerwünschte Einblendungen.',
                ],
              },
            ],
            [
              {
                badge: 'LAUTSTÄRKE & KIOSK-SCHUTZ',
                title: 'MODIFY_AUDIO_SETTINGS, ACCESS_NOTIFICATION_POLICY, WRITE_SETTINGS, BIND_DEVICE_ADMIN',
                lines: ['NogondDeviceAdminReceiver & Klingelton-Wiederherstellung'],
              },
              'Nur Senior (Senioren-Kiosk)',
              {
                lines: [
                  'Ermöglicht das Wiederherstellen eines versehentlich stummgeschalteten Klingeltons im Notfall, das Setzen des kontrastreichen Kiosk-Hintergrunds und die lokale Bildschirmsperre.',
                ],
              },
              {
                badge: 'Art. 6(1)(b) & 25 DSGVO',
                lines: [
                  'Führt niemals ein Zurücksetzen auf Werkseinstellungen (Factory Wipe) durch und kann jederzeit in den Android-Systemeinstellungen deaktiviert werden.',
                ],
              },
            ],
          ],
        },
        footerNote:
          'Technischer Prüfvermerk (AndroidManifest.xml): SENEAR verzichtet bewusst auf die Berechtigungen READ_SMS, RECEIVE_SMS und READ_CALL_LOG und setzt android:allowBackup="false", um unkontrollierte Drittanbieter-Cloud-Backups lokaler Kiosk-Daten auszuschließen.',
      },
      {
        id: 'anti-scam-sos-geofence',
        number: '6',
        gdprBadge: 'Art. 6 Abs. 1 lit. a, d, Art. 25 & 32 DSGVO',
        icon: 'phone-call',
        title: 'Anti-Scam-Anrufschutz (Lokale Whitelist), Großschrift-SMS, SOS-Kette & Heimzone',
        intro:
          'Betrugsschutz und Notfallabläufe verbinden zuverlässige Familienhilfe mit strikter Datensparsamkeit:',
        bullets: [
          {
            label: 'Lokale Whitelist-Prüfung via Android CallScreeningService:',
            text: 'Bei aktiviertem Anrufschutz gleicht das Handy des Seniors eingehende Rufnummern lokal mit den freigegebenen Kontakten ab. Unbekannte Nummern (z. B. Enkeltrick- oder Schockanrufe) werden lautlos abgewiesen, ohne dass Anrufprotokolle in die Cloud gelangen.',
          },
          {
            label: 'Großformatige Kiosk-SMS & geschützte Freisprech-Option:',
            text: 'Nachrichten freigegebener Familienmitglieder erscheinen übersichtlich in Großschrift auf dem Kiosk-Bildschirm; für gekoppelte Betreuungspersonen kann optional eine automatische Freisprech-Annahme aktiviert werden.',
          },
          {
            label: 'Mehrkanalige SOS-Eskalationskette:',
            text: 'Beim Auslösen der gegen Fehlberührung geschützten roten SOS-Taste sendet SENEAR parallel einen hochpriorisierten FCM-Push-Alarm (inkl. aktuellem GPS-Standort), optional eine Notfall-SMS und startet den direkten Telefonanruf an die hinterlegten Betreuungspersonen.',
          },
          {
            label: 'Überschreibendes Geofencing ohne Bewegungsprofil:',
            text: 'Beim Verlassen oder Betreten der definierten Heimzone wird eine Benachrichtigung ausgelöst. Es entsteht keine historische Routenaufzeichnung; jede neue Koordinate überschreibt den vorherigen Statuswert.',
          },
        ],
      },
      {
        id: 'webrtc-photo-pipeline',
        number: '7',
        gdprBadge: 'Art. 25 & Art. 32 Abs. 1 lit. a DSGVO (Verschlüsselung)',
        icon: 'lock',
        title: 'Verschlüsselte P2P-WebRTC-Anrufe & Base64-Fotopipeline ohne öffentliche URLs',
        intro:
          'Sprach-/Videoverbindungen und Kontaktbilder kommen vollständig ohne öffentliche Medienserver aus:',
        bullets: [
          {
            label: 'Ende-zu-Ende-verschlüsseltes WebRTC (DTLS-SRTP):',
            text: 'App-interne WLAN-/Mobilfunkanrufe nutzen direkte Peer-to-Peer-Verschlüsselung (mit verschlüsseltem TURN-Relay hinter strikten Firewalls). Signalisierungsdaten werden in 0 Sekunden nach Gesprächsende gelöscht, Gespräche niemals aufgezeichnet, und das Seniorengerät zeigt jedes aktive Gespräch akustisch und im Vollbild an.',
          },
          {
            label: 'Clientseitige E2EE (AES-256-GCM + ECDH P-256) für Base64-Fotos & Routinen (Zero-Knowledge):',
            text: 'Kontakt- und Erinnerungsfotos werden lokal auf 300×300 Pixel komprimiert und zusammen mit Kontakten und Tagesroutinen clientseitig über den gemeinsamen Familienschlüssel (AES-256-GCM + ECDH P-256) Ende-zu-Ende verschlüsselt. Es existieren keine öffentlichen Bild-URLs, und der Betreiber hat technisch keinen Zugriff auf den Klartext.',
          },
        ],
      },
      buildCoreEuSecuritySection('de', '8', {
        label: 'Akkuschonender Event-Delta-Sync & Hersteller-Einrichtungshilfe:',
        text: 'Statt energieintensiver Dauerschleifen überträgt das Seniorengerät Statusänderungen ereignisgesteuert. Erkennt die App restriktive Hintergrundsperren (Xiaomi, Samsung, Huawei, OPPO), verweist sie transparent auf die Schritt-für-Schritt-Videoanleitung unter https://gabba.bond/senear/setup.',
      }),
      {
        id: 'deletion-incident-response',
        number: '9',
        gdprBadge: 'Art. 17 DSGVO (Löschung) & Art. 33–34 DSGVO (72-Std.-Meldung)',
        icon: 'trash',
        title: 'Sofortige rekursive Löschung (0 Sek.) & 72-Stunden-Sicherheitsvorfallprotokoll',
        intro:
          'Datenlöschung und die Reaktion auf Sicherheitsvorfälle folgen verbindlichen technischen Prozessen:',
        bullets: [
          {
            label: 'Sofortige rekursive Komplettlöschung (0 Sekunden Cloud-Aufbewahrung):',
            text: 'Wird in der App die DSGVO-Löschung ausgelöst, entfernt der Serverprozess in europe-west1 atomar sämtliche Profile, synchronisierten Kontakte, Base64-Fotos, Tagesroutinen, Alarmprotokolle, Kopplungscodes und Echtzeit-Präsenzknoten und leert den lokalen App-Speicher. Per E-Mail (gabba@gabba.bond) eingereichte Löschanfragen werden innerhalb von maximal 72 Stunden ausgeführt.',
          },
          {
            label: '72-Stunden-Meldeprotokoll nach Art. 33 & 34 DSGVO:',
            text: 'Bei einer Verletzung des Schutzes personenbezogener Daten leitet der Betreiber unverzüglich technische Eindämmungsmaßnahmen ein, meldet meldepflichtige Vorfälle binnen 72 Stunden an die zuständige Aufsichtsbehörde (NAIH) und benachrichtigt bei hohem Risiko unverzüglich die betroffenen Nutzer.',
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // ENGLISH (EN) — OPERATIONAL, GDPR & GOOGLE PLAY TRANSPARENCY POLICY
  // ===========================================================================
  en: {
    kind: 'operations',
    shortTabLabel: 'Operational Policy',
    breadcrumbCurrent: 'Operational, GDPR & Google Play Transparency Policy',
    badges: [
      'Full GDPR & Google Play Transparency',
      'EU Cloud Region: europe-west1',
      'Data & Permission Justification Matrix',
    ],
    title: 'OPERATIONAL & DATA TRANSPARENCY POLICY – SENEAR',
    subtitle:
      'This Operational, GDPR & Google Play Transparency Policy maps every section to its exact GDPR articles and provides complete reference tables detailing what data arrives from the Senior device, the Caregiver app/PWA, and Google Play, how long each item is retained, what the Operator can (and technically can never) access, and why each sensitive Android permission exists.',
    effectiveDateValue: 'November 7, 2026',
    quickSummaryTitle: 'Complete Transparency Across 4 Core Pillars',
    quickSummaryItems: [
      {
        title: '3 Data Sources Mapped',
        desc: 'A master matrix details every field arriving from Senior, Caregiver, and Google Play alongside exact retention and visibility rules.',
      },
      {
        title: 'Standalone Mode = 0% Cloud',
        desc: 'Without family pairing, the Senior Kiosk operates 100% locally on the phone—transmitting zero bytes to external servers.',
      },
      {
        title: 'Google Play API Justification',
        desc: 'Every sensitive Android API (Accessibility, CallScreening, NotificationListener, Location) is strictly single-purpose and audited.',
      },
      {
        title: 'Delta-Sync & 0s Wipe',
        desc: 'Overwrite-in-place status updates without movement trails, plus one-tap recursive erasure with 0-second cloud retention.',
      },
    ],
    operatorSectionTitle: '1. Operational Governance, Controller Identity & System Scope',
    operatorSectionGdprBadge: 'GDPR Art. 4(7), Art. 13(1)(a) & Art. 24',
    sections: [
      {
        id: 'system-architecture',
        number: '2',
        gdprBadge: 'GDPR Art. 25 (Privacy by Design & Default)',
        icon: 'smartphone',
        title: 'Dual-Role System Architecture: Standalone Mode (0% Cloud) vs. Paired Ecosystem',
        intro:
          'SENEAR (bond.gabba.senear) ships as a single verified Android build that enforces strict architectural separation based on the selected role and pairing state:',
        subsections: [
          {
            subtitle: 'Senior Kiosk – Standalone Mode',
            badge: '0% Cloud Traffic',
            paragraphs: [
              'Operates as the default Android HOME Launcher featuring maximum-contrast typography, 4 (or optionally 6) oversized photo speed-dial tiles, on-device scam call blocking, and a dedicated red SOS bar.',
              'Until paired with a family Caregiver, 100% of contacts, photos, daily routines, and Kiosk settings remain exclusively in local device storage—zero cloud connections are established.',
            ],
          },
          {
            subtitle: 'Paired Senior + Family Caregiver Ecosystem',
            badge: 'EU europe-west1 Sync',
            paragraphs: [
              'Following a bilateral 6-digit pairing handshake, up to 4 authorized family Caregivers can remotely assist with photo speed-dial tiles, ringer volume restoration, daily routines, and Home Safe Zone alerts.',
              'All cloud synchronization runs exclusively within the European Union (Google Cloud / Firebase region europe-west1 in St. Ghislain, Belgium).',
            ],
          },
        ],
      },
      {
        id: 'incoming-data-retention-matrix',
        number: '3',
        gdprBadge: 'GDPR Art. 5(1)(c)–(e), Art. 13, 14 & 30',
        icon: 'database',
        title: 'Incoming Data from 3 Sources, Retention Periods & Operator Access Boundaries (Master Matrix)',
        intro:
          'The transparency matrix below discloses every data field arriving from the Senior phone, the Caregiver app/PWA, and Google Play Billing, exact storage durations, and what the Operator can see versus what is technically inaccessible:',
        table: {
          caption:
            'SENEAR Master Transparency Matrix: Incoming data from 3 sources, retention periods, Operator access boundaries, and GDPR legal bases',
          headers: [
            'Data Source',
            'Incoming Data (Specific Fields)',
            'Where & How Long Stored (Retention)',
            'Operator Visibility & Access Boundaries',
            'GDPR Legal Basis & Article',
          ],
          rows: [
            [
              {
                badge: 'SOURCE 1 · OFFLINE',
                title: 'Senior (Parent’s Phone – Standalone Mode)',
                lines: ['Unpaired Senior Kiosk operation'],
              },
              {
                title: '0 Bytes Sent to Cloud',
                lines: [
                  'Speed-dial contacts, portraits, daily routines, and Kiosk preferences exist exclusively inside local on-device storage.',
                ],
              },
              {
                lines: [
                  'Locally on the phone only (until app uninstallation).',
                  'Cloud servers: 0 seconds (never uploaded).',
                ],
              },
              {
                title: 'Technically Inaccessible',
                lines: [
                  'Because no cloud connection is established, the Operator receives and sees zero data.',
                ],
              },
              {
                badge: 'GDPR Art. 25',
                lines: [
                  'Data protection by design and by default (100% local processing).',
                ],
              },
            ],
            [
              {
                badge: 'SOURCE 1 · PAIRED',
                title: 'Senior (Profile, Photo Contacts & Daily Routines)',
                lines: ['When paired with family Caregiver(s)'],
              },
              {
                lines: [
                  'Display name, phone number, temporary 6-digit pairing code.',
                  'UTC timestamps of legal and bilateral consent (legalAcceptedAt, seniorConsentAccepted).',
                  'Synchronized speed-dial contacts (Slots 1–6) and locally compressed 300×300 px Base64 portraits.',
                  'Daily routine schedules, optional reminder photo, and "OK" confirmation timestamp.',
                ],
              },
              {
                lines: [
                  'EU europe-west1 (Belgium) Cloud Firestore.',
                  'Retained only during active pairing; Base64 photos are cleared immediately upon unpairing.',
                  'In-app GDPR Delete button: 0-second permanent erasure (email requests within max. 72 hours; orphaned inactive profiles after 90 days).',
                ],
              },
              {
                title: 'Client-Side E2EE (Technically Inaccessible to Operator)',
                lines: [
                  'Speed-dial contacts, 300×300 px Base64 portraits, daily routines, Call Whitelist numbers, and SOS recipients are encrypted end-to-end on the client device (AES-256-GCM + ECDH P-256 family vault key) before ever leaving the phone.',
                  'Because the decryption key exists exclusively on the paired family devices, the Operator technically cannot decrypt, view, or access these fields even inside the raw cloud database.',
                ],
              },
              {
                badge: 'GDPR Art. 6(1)(a)–(b), 7(1), 9(2)(a), 14',
                lines: [
                  'Contract performance (Art. 6(1)(b)), explicit bilateral consent (Art. 6(1)(a), Art. 9(2)(a)), demonstrable consent audit (Art. 7(1)), and indirect data transparency (Art. 14).',
                ],
              },
            ],
            [
              {
                badge: 'SOURCE 1 · TELEMETRY',
                title: 'Senior (Location, Battery, WebRTC Signaling & Crash Logs)',
                lines: ['Active paired safety features only'],
              },
              {
                lines: [
                  'Current GPS coordinates and Home Safe Zone radius (strictly when Safe Zone monitoring is enabled or SOS is triggered).',
                  'Battery %, charging state, last online heartbeat (lastSeen), Kiosk/permission health flags, and device model (OEM).',
                  'Ephemeral WebRTC call signaling packet (SDP/ICE).',
                  'Safety alert events (alerts) and technical crash stack traces (system_crashes).',
                ],
              },
              {
                lines: [
                  'WebRTC signaling: 0 seconds after call hang-up (purged immediately).',
                  'GPS & battery state: overwrite-in-place (each update overwrites the previous value—no movement history).',
                  'Alert event logs (alerts): auto-deleted after 7 days.',
                  'Technical crash diagnostics: max. 30–90 days.',
                ],
              },
              {
                title: 'Call Audio & SMS Technically Inaccessible',
                lines: [
                  'Live WebRTC voice/video streams (end-to-end DTLS-SRTP), private SMS messages, and phone call logs are technically inaccessible to the Operator.',
                  'The admin console displays only technical health indicators and crash stack traces strictly for bug fixing.',
                ],
              },
              {
                badge: 'GDPR Art. 5(1)(e), 6(1)(a), (d), (f)',
                lines: [
                  'Storage limitation (Art. 5(1)(e)), explicit consent for GPS (Art. 6(1)(a)), vital interests during SOS emergencies (Art. 6(1)(d)), and legitimate interest in software stability (Art. 6(1)(f)).',
                ],
              },
            ],
            [
              {
                badge: 'SOURCE 2 · CAREGIVER',
                title: 'Caregiver (Family Member Android App / Web PWA)',
                lines: ['Authenticated family helper'],
              },
              {
                lines: [
                  'Display name, phone number (E.164), and/or email address.',
                  'Technical Firebase UID (authUid), FCM push token, and 6 alert toggle preferences.',
                  'Legal and authorization declaration timestamps (legalAcceptedAt, caregiverConsentAccepted).',
                  'Remote speed-dial entries, Call Whitelist numbers, and daily routines configured for the Senior.',
                ],
              },
              {
                lines: [
                  'EU europe-west1 Firestore (caregivers/{id}).',
                  'Retained while the account is active; permanently purged in 0 seconds via the in-app GDPR Delete button (max. 72 hours via email).',
                  'Deleting a Caregiver account cleanly unlinks cloud sync without wiping the Senior parent’s local speed-dial buttons.',
                ],
              },
              {
                title: 'Support-Only Account Metadata',
                lines: [
                  'The Operator checks technical account or pairing status solely when fulfilling direct user support or erasure requests.',
                  'Zero passwords are stored by SENEAR and zero behavioral or marketing profiling occurs.',
                ],
              },
              {
                badge: 'GDPR Art. 6(1)(b)–(c), 7(1), 13 & 17',
                lines: [
                  'Contract performance (Art. 6(1)(b)), statutory consent accountability (Art. 6(1)(c), Art. 7(1)), direct notice (Art. 13), and right to erasure (Art. 17).',
                ],
              },
            ],
            [
              {
                badge: 'SOURCE 3 · GOOGLE PLAY',
                title: 'Google Play Billing (Google Ireland Limited)',
                lines: ['Family Caregiver subscriptions'],
              },
              {
                lines: [
                  'Subscription entitlement state (trialing, active, canceled, expired).',
                  'Plan / SKU identifier, cryptographic purchaseToken, Google order ID (GPA.xxxx), renewal/expiry timestamp, and currency code.',
                ],
              },
              {
                lines: [
                  'Active entitlement flag: until account deletion.',
                  'Mandatory statutory accounting and tax reconciliation metadata: 8 years (Section 169(2) of Hungarian Act C of 2000 on Accounting).',
                ],
              },
              {
                title: 'Payment Credentials Technically Inaccessible',
                lines: [
                  'The Operator never receives and technically cannot access bank card numbers, CVC/CVV security codes, IBAN bank accounts, or Google account passwords.',
                  'All payment credentials remain exclusively inside Google Play’s PCI-DSS environment (Merchant of Record).',
                ],
              },
              {
                badge: 'GDPR Art. 6(1)(b), 6(1)(c) & 14',
                lines: [
                  'Subscription entitlement provisioning (Art. 6(1)(b)), statutory tax/accounting retention (Art. 6(1)(c)), and indirect source disclosure (Art. 14).',
                ],
              },
            ],
          ],
        },
        neverCollectedBox: {
          badge: 'Zero-Surveillance Guarantee · GDPR Art. 5(1)(c)',
          title: 'What SENEAR NEVER Collects',
          subtitle:
            'SENEAR’s data-minimization architecture structurally excludes collecting, uploading, or viewing the following 6 categories of personal data:',
          items: [
            {
              label: '1. Zero Bank Card or Financial Credentials',
              text: 'We never request, receive, or store credit/debit card numbers, CVC codes, or banking credentials.',
            },
            {
              label: '2. Zero Call Recording or Wiretapping',
              text: 'Neither cellular GSM calls nor end-to-end encrypted WebRTC family calls are ever recorded or listened to.',
            },
            {
              label: '3. Zero Cloud Upload of Private SMS (No READ_SMS)',
              text: 'SENEAR requests neither READ_SMS nor RECEIVE_SMS and never uploads SMS message bodies to any server.',
            },
            {
              label: '4. Zero Call Log Uploads (No READ_CALL_LOG)',
              text: 'Anti-scam whitelist screening runs 100% locally on the phone without copying call histories to the cloud.',
            },
            {
              label: '5. Zero Historical GPS Breadcrumb Trails',
              text: 'We never build continuous daily movement timelines; each Safe Zone location check overwrites the prior coordinate.',
            },
            {
              label: '6. Zero Screen Scraping & Zero Ad SDKs',
              text: 'Our AccessibilityService never reads third-party app screens or passwords, and 0 advertising SDKs exist in the app.',
            },
          ],
        },
      },
      {
        id: 'bilateral-pairing-protocol',
        number: '4',
        gdprBadge: 'GDPR Art. 6(1)(a)–(b), Art. 7(1) & Art. 9(2)(a)',
        icon: 'users',
        title: 'Bilateral 6-Digit Pairing & Consent Audit Protocol',
        intro:
          'SENEAR prevents covert or unauthorized remote linking through a mandatory multi-step cryptographic and legal handshake:',
        bullets: [
          {
            label: 'Step 0 – Mandatory Pre-Setup Legal Consent Gate (Onboarding Lock):',
            text: 'On fresh installs, neither Senior Mode nor Caregiver Mode can be entered until the user actively ticks an unchecked-by-default consent checkbox accepting the Terms of Service, GDPR Privacy Notice (Art. 13 & 14), and this Operational Policy (logged via legalAcceptedAt).',
          },
          {
            label: 'Step 1 – Senior Disclosure & Temporary Code Generation:',
            text: 'The time-limited 6-digit pairing code remains hidden until the Senior taps "Accept" on a clear, high-contrast data-sharing disclosure (recording seniorConsentAccepted: true + UTC timestamp).',
          },
          {
            label: 'Step 2 – Caregiver Authorization Declaration & Handshake:',
            text: 'On the Caregiver device, code entry unlocks only after the Caregiver confirms explicit family/legal authorization (caregiverConsentAccepted: true + UTC timestamp).',
          },
          {
            label: 'Step 3 – Automatic Caregiver Speed-Dial Population:',
            text: 'Upon pairing, the Caregiver’s name and phone number automatically populate the Senior’s first open speed-dial tile (Slots 1–4) for immediate one-tap calling.',
          },
        ],
      },
      {
        id: 'google-play-permissions',
        number: '5',
        gdprBadge: 'Google Play User Data Policy & GDPR Art. 5(1)(b)–(c)',
        icon: 'shield',
        title: 'Google Play Compliance — Technical Justification of Sensitive Android APIs & System Permissions',
        intro:
          'In full compliance with Google Play Developer Program Policies on User Data and Restricted Permissions, the matrix below documents every sensitive Android API and permission declared in AndroidManifest.xml, its single operational purpose, and strict abuse-prevention boundaries:',
        table: {
          caption:
            'Google Play Compliance Matrix: Technical justification and privacy boundaries for all Android permissions and services in SENEAR',
          headers: [
            'Android API / Permission',
            'Applicable Role',
            'Why It Is Part of SENEAR (Functional Justification)',
            'Strict Privacy Boundary (What It NEVER Does + GDPR)',
          ],
          rows: [
            [
              {
                badge: 'LAUNCHER · KIOSK',
                title: 'HOME Launcher & REORDER_TASKS',
                lines: ['android.intent.category.HOME'],
              },
              'Senior Only (Senior Kiosk)',
              {
                lines: [
                  'Transforms the parent’s existing phone into a high-contrast, large-photo default home screen so older adults never get lost in complex system menus.',
                ],
              },
              {
                badge: 'GDPR Art. 25',
                lines: [
                  'Can be exited or disabled anytime via the PIN-guarded admin settings; never deletes, modifies, or inspects other installed apps.',
                ],
              },
            ],
            [
              {
                badge: 'ACCESSIBILITY API',
                title: 'BIND_ACCESSIBILITY_SERVICE',
                lines: ['PinningAutoClickerService (isAccessibilityTool="false")'],
              },
              'Senior Only (Senior Kiosk)',
              {
                lines: [
                  'Stabilizes Android Screen Pinning in active Kiosk mode and prevents accidental navigation away from the protected Senior home screen.',
                ],
              },
              {
                badge: 'GDPR Art. 5(1)(c) & 25',
                lines: [
                  'Strict Google Play safeguard: NEVER reads third-party app screen text, NEVER logs keystrokes or passwords, and never performs covert remote clicks.',
                ],
              },
            ],
            [
              {
                badge: 'CALL SCREENING API',
                title: 'BIND_SCREENING_SERVICE',
                lines: ['NogondCallScreeningService (CallScreeningService)'],
              },
              'Senior Only (Senior Kiosk)',
              {
                lines: [
                  'Anti-Scam Call Shield (Whitelist): silently blocks unknown callers and phone scammers before the phone ever rings by checking approved family contacts.',
                ],
              },
              {
                badge: 'GDPR Art. 25 & 32',
                lines: [
                  'Executes 100% locally on-device; incoming or blocked call logs are never uploaded to cloud servers.',
                ],
              },
            ],
            [
              {
                badge: 'NOTIFICATION LISTENER',
                title: 'BIND_NOTIFICATION_LISTENER_SERVICE',
                lines: ['SenearSmsNotificationService'],
              },
              'Senior Only (Senior Kiosk)',
              {
                lines: [
                  'Renders incoming SMS messages from approved family contacts as a clean, large-print Kiosk card—without requesting invasive READ_SMS or RECEIVE_SMS permissions.',
                ],
              },
              {
                badge: 'GDPR Art. 5(1)(c) & 25',
                lines: [
                  'Ignores unknown senders; notification and SMS text content never leaves the device or touches any server.',
                ],
              },
            ],
            [
              {
                badge: 'TELEPHONY & SOS',
                title: 'CALL_PHONE, ANSWER_PHONE_CALLS, READ_PHONE_STATE, READ_CONTACTS, SEND_SMS',
                lines: ['One-tap dialing & SOS emergency dispatch'],
              },
              'Senior & Caregiver (feature-dependent)',
              {
                lines: [
                  'Powers one-tap photo speed dialing, dedicated red SOS calls + optional emergency GPS SMS dispatch, contact picker import, and optional speakerphone auto-answer exclusively for paired Caregivers.',
                ],
              },
              {
                badge: 'GDPR Art. 6(1)(a)–(b), (d)',
                lines: [
                  'Never places covert background calls or SMS; never bulk-uploads the address book (processes only the explicitly chosen 1–6 speed-dial / whitelist contacts).',
                ],
              },
            ],
            [
              {
                badge: 'BACKGROUND SAFETY',
                title: 'FOREGROUND_SERVICE_SPECIAL_USE, RECEIVE_BOOT_COMPLETED, REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
                lines: ['KioskPowerService & BootReceiver'],
              },
              'Senior Only (Senior Kiosk)',
              {
                lines: [
                  'Ensures SOS readiness, low-battery (<20%) warnings, and daily routine alarms survive device reboots and aggressive OEM battery killers (Xiaomi, Samsung, Huawei).',
                ],
              },
              {
                badge: 'GDPR Art. 6(1)(b) & (d)',
                lines: [
                  'Transmits only low-power, event-driven Delta-Sync status flags; performs zero continuous background sensor or audio surveillance.',
                ],
              },
            ],
            [
              {
                badge: 'GEOLOCATION',
                title: 'ACCESS_FINE_LOCATION & ACCESS_COARSE_LOCATION',
                lines: ['Home Safe Zone (Geofence) & SOS coordinates'],
              },
              'Senior Only (Paired Mode)',
              {
                lines: [
                  'Used strictly to detect Home Safe Zone entry/exit transitions and to attach current coordinates when the Senior triggers an SOS emergency alert.',
                ],
              },
              {
                badge: 'GDPR Art. 6(1)(a) & 5(1)(c)',
                lines: [
                  'Completely inactive in Standalone Mode; overwrite-in-place in Paired Mode (zero route history) and never used for advertising.',
                ],
              },
            ],
            [
              {
                badge: 'MEDIA & PORTRAITS',
                title: 'CAMERA & RECORD_AUDIO',
                lines: ['WebRTC calls, QR scanner & contact portraits'],
              },
              'Senior & Caregiver',
              {
                lines: [
                  'Used strictly during active two-way WebRTC family voice/video calls, QR pairing code scanning, and capturing contact or routine reminder portraits.',
                ],
              },
              {
                badge: 'GDPR Art. 32',
                lines: [
                  'Zero covert background audio or camera capture; active calls play audible tones and show a full-screen live banner on the Senior phone, encrypted end-to-end via DTLS-SRTP (0s retention).',
                ],
              },
            ],
            [
              {
                badge: 'ALARMS & OVERLAY',
                title: 'SCHEDULE_EXACT_ALARM, USE_FULL_SCREEN_INTENT, SYSTEM_ALERT_WINDOW, POST_NOTIFICATIONS',
                lines: ['RoutineAlarmReceiver & SOS full-screen wake'],
              },
              'Senior & Caregiver',
              {
                lines: [
                  'Delivers minute-accurate daily routine and medication reminders and wakes locked screens for incoming family calls and high-priority SOS alerts.',
                ],
              },
              {
                badge: 'GDPR Art. 6(1)(b)',
                lines: [
                  'Displays exclusively family-configured reminders and emergency alerts—never advertisements or unsolicited overlays.',
                ],
              },
            ],
            [
              {
                badge: 'VOLUME & KIOSK LOCK',
                title: 'MODIFY_AUDIO_SETTINGS, ACCESS_NOTIFICATION_POLICY, WRITE_SETTINGS, BIND_DEVICE_ADMIN',
                lines: ['NogondDeviceAdminReceiver & Remote ringer restore'],
              },
              'Senior Only (Senior Kiosk)',
              {
                lines: [
                  'Allows paired Caregivers to unmute an accidentally silenced ringer in urgent situations, sets high-contrast Kiosk wallpaper, and stabilizes local Kiosk screen lock.',
                ],
              },
              {
                badge: 'GDPR Art. 6(1)(b) & 25',
                lines: [
                  'Never performs remote factory resets (device wipe) and can be revoked anytime in Android system settings.',
                ],
              },
            ],
          ],
        },
        footerNote:
          'Technical Audit Note (AndroidManifest.xml): SENEAR intentionally omits READ_SMS, RECEIVE_SMS, and READ_CALL_LOG, and enforces android:allowBackup="false" to prevent automatic third-party cloud backups of local Kiosk data.',
      },
      {
        id: 'anti-scam-sos-geofence',
        number: '6',
        gdprBadge: 'GDPR Art. 6(1)(a), (d), Art. 25 & 32',
        icon: 'phone-call',
        title: 'On-Device Anti-Scam Whitelist Call Shield, Kiosk SMS, SOS Chain & Home Safe Zone',
        intro:
          'Fraud prevention and emergency escalation combine rapid family response with strict data minimization:',
        bullets: [
          {
            label: 'Local Whitelist Verification via CallScreeningService:',
            text: 'When enabled, Android’s CallScreeningService checks incoming caller IDs locally against approved SENEAR contacts. Unknown numbers and scam calls are silently rejected before the phone ever rings—without uploading call logs to external servers.',
          },
          {
            label: 'Large-Print Kiosk SMS & Trusted Speakerphone Auto-Answer:',
            text: 'Messages from approved family contacts appear in a high-contrast large-print Kiosk card, and families can optionally enable speakerphone auto-answer exclusively for paired Caregivers.',
          },
          {
            label: 'Confirmation-Guarded Multi-Channel SOS Dispatch:',
            text: 'Triggering the red SOS button simultaneously dispatches a high-priority FCM push alert (with current GPS location), an optional emergency SMS, and a direct voice call to designated Caregivers.',
          },
          {
            label: 'Overwrite-in-Place Home Safe Zone (Zero Breadcrumb Trails):',
            text: 'Entry/exit transitions across the Caregiver-defined Home Safe Zone generate notifications without storing historical movement routes; each location update overwrites the prior coordinate.',
          },
        ],
      },
      {
        id: 'webrtc-photo-pipeline',
        number: '7',
        gdprBadge: 'GDPR Art. 25 & Art. 32(1)(a) (Encryption)',
        icon: 'lock',
        title: 'Encrypted P2P WebRTC Calling & Zero-Public-URL Base64 Photo Pipeline',
        intro:
          'Both live family calls and speed-dial portraits avoid public third-party media buckets:',
        bullets: [
          {
            label: 'End-to-End Encrypted DTLS-SRTP WebRTC Calls:',
            text: 'In-app Wi-Fi/mobile calls use encrypted peer-to-peer WebRTC (with encrypted TURN fallback behind strict NATs). Signaling metadata is purged in 0 seconds upon call end, calls are never recorded, and the Senior phone always plays audible tones and displays a full-screen live banner.',
          },
          {
            label: 'Client-Side E2EE (AES-256-GCM + ECDH P-256) Base64 Portraits & Routines (Zero-Knowledge):',
            text: 'Contact and reminder portraits are compressed locally (300×300 px) and encrypted end-to-end on the client device alongside contacts and daily routines using the family vault key (AES-256-GCM + ECDH P-256)—never exposed on public CDN URLs and technically unreadable by the Operator.',
          },
        ],
      },
      buildCoreEuSecuritySection('en', '8', {
        label: 'Battery-Friendly Event Delta-Sync & OEM Battery Saver Diagnostics:',
        text: 'Instead of constant high-frequency polling, the Senior phone transmits compact delta updates only on meaningful state changes. If OS battery optimization (Xiaomi, Samsung, Huawei, OPPO) restricts background safety, SENEAR alerts the Caregiver and links to step-by-step video instructions at https://gabba.bond/senear/setup.',
      }),
      {
        id: 'deletion-incident-response',
        number: '9',
        gdprBadge: 'GDPR Art. 17 (Erasure) & Art. 33–34 (72h Breach Protocol)',
        icon: 'trash',
        title: 'Instant Recursive Data Erasure (0s Retention) & 72-Hour Security Incident Protocol',
        intro:
          'Data lifecycle termination and security incident handling follow deterministic, auditable procedures:',
        bullets: [
          {
            label: 'Instant Recursive One-Tap Wipe (0-Second Cloud Retention):',
            text: 'Triggering GDPR deletion inside either Senior or Caregiver mode atomically purges profiles, synced contacts, Base64 portraits, routines, alert logs, pairing codes, and realtime presence nodes in europe-west1 while resetting local app storage. Email deletion requests sent to gabba@gabba.bond are completed within a maximum of 72 hours.',
          },
          {
            label: 'GDPR Art. 33 & 34 72-Hour Incident Response:',
            text: 'Upon detecting any personal data breach, the Operator immediately initiates technical containment and remediation, notifies the competent supervisory authority (NAIH) within 72 hours where required under GDPR Art. 33, and informs affected users directly without undue delay whenever high risk arises.',
          },
        ],
      },
    ],
  },
};
