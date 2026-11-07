import {
  LegalDocumentData,
  LegalLang,
  buildCoreTermsDisputeSection,
} from './legalCore';

export const SENEAR_TERMS_DOC: Record<LegalLang, LegalDocumentData> = {
  // ===========================================================================
  // HUNGARIAN (HU) — ÁSZF
  // ===========================================================================
  hu: {
    kind: 'terms',
    shortTabLabel: 'Általános Szerződési Feltételek (ÁSZF)',
    breadcrumbCurrent: 'Általános Szerződési Feltételek (ÁSZF)',
    badges: [
      'EU Fogyasztóvédelmi Megfelelőség (2019/770/EU)',
      '14 Napos Elállási Jog & Próbaidőszak',
      'Nem Orvostechnikai Eszköz (MDR 2017/745)',
    ],
    title: 'ÁLTALÁNOS SZERZŐDÉSI FELTÉTELEK (ÁSZF) – SENEAR',
    subtitle:
      'Jelen Általános Szerződési Feltételek (ÁSZF) szabályozzák Bányai Gábor (gabba.bond) által fejlesztett és üzemeltetett SENEAR Android-alkalmazás (bond.gabba.senear) és a hozzá kapcsolódó webes szolgáltatások (gabba.bond/senear) igénybevételének jogi, pénzügyi és felelősségi feltételeit.',
    effectiveDateValue: '2026. november 7.',
    quickSummaryTitle: 'A SENEAR ÁSZF Legfontosabb Pontjai Röviden',
    quickSummaryItems: [
      {
        title: 'Örökké Ingyenes Alapmód',
        desc: 'Az idős szülő telefonján futó önálló SENEAR kezdőképernyő, gyorstárcsázó, SOS gomb és csalószűrő 0 € és reklámmentes.',
      },
      {
        title: 'Átlátható Google Play Előfizetés',
        desc: 'Családi távoli felügyelet 14 napos ingyenes próbaidőszakkal, Google Playen keresztül egy érintéssel bármikor lemondható.',
      },
      {
        title: 'Tisztázott „Örökös” Csomag',
        desc: 'Az egyszeri díjas Örökös (Duo) licenc a SENEAR támogatott kereskedelmi termék-életciklusára szól (min. 6 hónapos előzetes értesítéssel).',
      },
      {
        title: 'Kétoldalú Jogszerű Használat',
        desc: 'A távoli összekapcsolás kizárólag a Gondozott kifejezett hozzájárulásával vagy törvényes képviselet mellett engedélyezett.',
      },
    ],
    operatorSectionTitle: '1. A Szolgáltató (Üzemeltető) adatai és a szerződés hatálya',
    sections: [
      {
        id: 'scope-contract',
        number: '2',
        icon: 'file-check',
        title: 'A szerződés tárgya, létrejötte és korhatári feltételek',
        intro:
          'A SENEAR alkalmazás letöltésével, telepítésével, az alkalmazáson belüli jóváhagyó jelölőnégyzet elfogadásával vagy előfizetés indításával a Felhasználó és a Szolgáltató között elektronikus úton kötött, írásbelinek nem minősülő szolgáltatási szerződés jön létre:',
        bullets: [
          {
            label: 'Szerződés nyelve és hozzáférhetősége:',
            text: 'A szerződés magyar, német vagy angol nyelven érhető el a https://gabba.bond/senear/terms címen, ahonnan bármikor letölthető és PDF formátumban kinyomtatható.',
          },
          {
            label: 'Jogképesség és életkori előírás:',
            text: 'Gondozói (Caregiver) fiókot és fizetős előfizetést kizárólag 18. életévét betöltött, cselekvőképes természetes személy hozhat létre fogyasztóként, családi/magáncélú használatra.',
          },
          {
            label: 'Technikai minimumkövetelmények:',
            text: 'A Gondozott készülékén legalább Android 8.0 (API 26) vagy újabb operációs rendszer, hanghívásokhoz és SMS-hez aktív SIM-kártya, a felhőalapú távoli funkciókhoz pedig működő mobilinternet- vagy Wi-Fi-kapcsolat szükséges.',
          },
        ],
      },
      {
        id: 'service-modes',
        number: '3',
        icon: 'smartphone',
        title: 'A SENEAR szolgáltatási csomagok tartalma (Ingyenes vs. Családi összeköttetés)',
        intro:
          'A SENEAR két, funkcionálisan jól elkülönített szintet kínál:',
        subsections: [
          {
            subtitle: 'A) Alap (Önálló Senior) csomag — 0 € (Örökké ingyenes)',
            badge: 'Reklámmentes & Offline',
            paragraphs: [
              'Tartalmazza a zárolt, elállíthatatlan nagybetűs SENEAR kezdőképernyőt (Kioszk mód), a nagy fotós gyorstárcsázó csempéket, a helyi SOS segélyhívó gombot és az ismeretlen hívókat kiszűrő helyi Anti-Scam Whitelist védelmet.',
              'Előfizetés és felhőregisztráció nélkül, időkorlát nélkül használható egy készüléken.',
            ],
          },
          {
            subtitle: 'B) Családi / Örökös (Párosított Gondozói) csomagok',
            badge: 'Valós Idejű EU Felhőszinkron',
            paragraphs: [
              'Lehetővé teszi 1 idős készülék és legfeljebb 4 családtag (Örökös Duo csomagban 2 idős készülék + 4 családtag) biztonságos összekapcsolását 6-jegyű kétoldalú párosító kóddal.',
              'Tartalmazza a távoli fotós névjegy- és hangerőkezelést, a távoli napi emlékeztetőket visszaigazolással, az akkumulátor- és GPS Otthoni Biztonsági Zóna felügyeletet, a titkosított WebRTC hang-/videóhívást és az azonnali SOS/zuhanás push-riasztásokat.',
            ],
          },
        ],
      },
      {
        id: 'subscriptions-pricing',
        number: '4',
        icon: 'credit-card',
        title: 'Díjszabás, Google Play számlázás és az „Örökös” licenc meghatározása',
        intro:
          'A fizetős csomagok vásárlása és számlázása a hivatalos Google Play Billing rendszeren keresztül történik, bruttó (minden alkalmazandó adót tartalmazó) árakon:',
        bullets: [
          {
            label: 'Családi előfizetés és 14 napos ingyenes próbaidőszak:',
            text: 'Irányadó díj: havi 7,99 € (kb. 2 990 Ft/hó) vagy éves 59,99 € (kb. 23 990 Ft/év; a pontos összeget a Google Play pénztár jeleníti meg a felhasználó helyi pénznemében). Az első alkalommal igénybe vett 14 napos ingyenes próbaidőszak alatt díjterhelés nem történik; ha a próbaidőszak lejárta előtt legalább 24 órával lemondja az előfizetést a Google Play → Előfizetések menüben, semmilyen díjat nem számítunk fel.',
          },
          {
            label: 'Automatikus megújítás és lemondás:',
            text: 'A havi vagy éves előfizetés automatikusan megújul, amíg a Felhasználó azt a Google Play Áruház „Előfizetések” felületén le nem mondja. Lemondás esetén a fizetős funkciók az adott kifizetett számlázási időszak végéig maradéktalanul elérhetők maradnak, ezt követően az idős készülék adatvesztés nélkül visszavált az ingyenes Alap módba.',
          },
          {
            label: 'Az egyszeri díjas „Örökös” (Lifetime / Duo – 149,00 €) csomag pontos jogi tartalma:',
            text: 'Az „Örökös” (angolul „Lifetime”, németül „Lifetime-Paket”) megjelölésű egyszeri díjas licenc a SENEAR szoftverszolgáltatás és a hozzá tartozó felhőinfrastruktúra aktív, támogatott kereskedelmi termék-életciklusának (Commercial Product Lifecycle) teljes időtartamára biztosít ismétlődő havidíj nélküli hozzáférést legfeljebb 2 idős készülék és 4 családtag részére — nem pedig egy adott természetes személy élettartamára. Amennyiben a Szolgáltató a jövőben a SENEAR felhőszolgáltatás végleges kivezetéséről döntene, erről a felhasználókat legalább 6 (hat) hónappal korábban előzetesen értesíti.',
          },
        ],
      },
      {
        id: 'withdrawal-right',
        number: '5',
        icon: 'scale',
        title: '14 napos fogyasztói elállási jog (45/2014. Korm. rendelet & 2011/83/EU irányelv)',
        intro:
          'Az Európai Unióban élő fogyasztót megilleti a 14 napon belüli indokolás nélküli elállási/felmondási jog a digitális szolgáltatásokra vonatkozó szabályok szerint:',
        bullets: [
          {
            label: 'Elállás gyakorlása Google Playen vagy e-mailben:',
            text: 'A szerződéskötéstől (vagy próbaidőszak utáni első terheléstől) számított 14 napon belül a Fogyasztó kérheti a visszatérítést közvetlenül a Google Play visszatérítési felületén, vagy egyértelmű elállási nyilatkozat küldésével az gabba@gabba.bond e-mail-címre (a Google Play rendelésazonosító, pl. GPA.xxxx megjelölésével).',
          },
          {
            label: '14 napos ingyenes próbaidőszak mint teljes kockázatmentesség:',
            text: 'Mivel a Családi csomag 14 napos ingyenes próbaidőszakkal indul, a Fogyasztó fizetési kötelezettség keletkezése előtt teljes körűen kipróbálhatja a rendszert saját és hozzátartozója készülékén.',
          },
        ],
      },
      {
        id: 'caregiver-obligations',
        number: '6',
        icon: 'users',
        title: 'A Gondozó felelőssége, kétoldalú hozzájárulás és tiltott magatartások',
        intro:
          'A SENEAR a családi gondoskodás és biztonság eszköze; rejtett megfigyelésre történő felhasználása szigorúan tilos:',
        bullets: [
          {
            label: 'Kifejezett felhatalmazási kötelezettség:',
            text: 'A Gondozó büntetőjogi és polgári jogi felelőssége tudatában vállalja, hogy másik személy telefonját kizárólag az érintett személy előzetes, tájékozott és önkéntes hozzájárulásával (vagy igazolt törvényes képviselői/gondnoki minőségben) párosítja a SENEAR rendszerrel.',
          },
          {
            label: 'Titkos megfigyelés és zaklatás tilalma:',
            text: 'Szigorúan tilos az alkalmazást más személy tudta nélküli nyomkövetésre (stalking), jogosulatlan lehallgatásra vagy személyiségi jogok megsértésére használni. Jogellenes használat észlelésekor a Szolgáltató jogosult a felhőkapcsolatot haladéktalanul felfüggeszteni.',
          },
          {
            label: 'Készülékbeállítások gondos fenntartása:',
            text: 'A Felhasználó feladata gondoskodni arról, hogy a Gondozott készülékén az Android rendszerengedélyek, a gyártói akkumulátor-kivételek (lásd a /senear/setup útmutatót) és a SIM/hálózati egyenleg aktívak maradjanak.',
          },
        ],
      },
      {
        id: 'medical-emergency-disclaimer',
        number: '7',
        icon: 'warning',
        isWarningBox: true,
        title: 'Kiemelt orvostechnikai és segélyhívási felelősségkizárás (EU MDR 2017/745)',
        intro:
          'A Felhasználó a szolgáltatás igénybevételével kifejezetten tudomásul veszi az alábbi alapvető korlátokat:',
        bullets: [
          {
            label: 'NEM orvostechnikai eszköz és NEM 112-es segélyhívó / távfelügyelet:',
            text: 'A SENEAR NEM minősül az (EU) 2017/745 rendelet (MDR) hatálya alá tartozó orvostechnikai eszköznek, klinikai monitorozó rendszernek, sem hivatalos állami segélyhívó szolgálatnak (112 / mentők / rendőrség) vagy minősített 24 órás egészségügyi diszpécserszolgálatnak (Hausnotruf). Akut életveszély esetén mindig közvetlenül a 112-es segélyhívót kell hívni!',
          },
          {
            label: 'Szenzoros és távközlési korlátok:',
            text: 'A gyorsulásmérőre épülő esésérzékelés nem képes minden típusú rosszullétet vagy lassú lecsúszást felismerni, illetve téves riasztást is adhat. Az SOS hívások/SMS-ek, GPS-zónajelzések és napi emlékeztetők célba érése külső hálózati tényezőktől (térerő, internet, GPS-műholdak, készülék töltöttsége, Android OS korlátozások) függ, amelyekért a Szolgáltató nem tud garantált felelősséget vállalni.',
          },
        ],
      },
      {
        id: 'warranty-liability',
        number: '8',
        icon: 'shield',
        title: 'Hibás teljesítés, szoftverfrissítések és a felelősség korlátozása',
        intro:
          'A Szolgáltató a digitális szolgáltatások nyújtására vonatkozó uniós irányelvnek (2019/770/EU) megfelelően biztosítja a SENEAR folyamatos biztonsági és kompatibilitási frissítéseit:',
        bullets: [
          {
            label: 'Felelősségkorlátozás mértéke:',
            text: 'A jogszabályok által megengedett legteljesebb mértékben a Szolgáltató kizárja felelősségét a közvetett károkért, hálózati kimaradásokból vagy külső távközlési szolgáltatók hibájából eredő károkért; a Szolgáltató összesített kártérítési felelőssége legfeljebb a Felhasználó által a megelőző 12 hónapban ténylegesen megfizetett előfizetési díj (illetve egyszeri licencdíj) összegéig terjed.',
          },
          {
            label: 'Kötelező törvényi kivételek (Ptk. 6:152. §):',
            text: 'A fenti korlátozás NEM érinti és nem zárja ki a Szolgáltató felelősségét a szándékosan okozott, továbbá az emberi életet, testi épséget vagy egészséget megkárosító szerződésszegésért, illetve olyan esetekben, ahol a felelősség korlátozását kötelező fogyasztóvédelmi jogszabály tiltja.',
          },
        ],
      },
      {
        id: 'ip-termination',
        number: '9',
        icon: 'lock',
        title: 'Szellemi tulajdonjogok és a szerződés megszüntetése',
        intro:
          'A SENEAR szoftverkódja, arculata, logója és dokumentációja Bányai Gábor (gabba) kizárólagos szellemi tulajdona:',
        bullets: [
          {
            label: 'Felhasználási engedély (Licenc) és saját tartalmak:',
            text: 'A Felhasználó személyes, nem kizárólagos, át nem ruházható használati jogot kap a SENEAR alkalmazásra. A felhasználók által feltöltött családi fotók és névjegyek tulajdonjoga 100%-ban a Felhasználónál marad.',
          },
          {
            label: 'Megszüntetés bármikor:',
            text: 'A Felhasználó a szerződést bármikor megszüntetheti az előfizetés Google Playen történő lemondásával és/vagy az alkalmazáson belüli „Minden adat törlése” gomb megnyomásával.',
          },
        ],
      },
      buildCoreTermsDisputeSection('hu', '10'),
    ],
  },

  // ===========================================================================
  // GERMAN (DE) — AGB
  // ===========================================================================
  de: {
    kind: 'terms',
    shortTabLabel: 'AGB (Nutzungsbedingungen)',
    breadcrumbCurrent: 'Allgemeine Geschäftsbedingungen (AGB)',
    badges: [
      'EU-Richtlinie Digitale Dienste (2019/770/EU)',
      '14 Tage Widerrufsrecht & Testphase',
      'Kein Medizinprodukt (EU-MDR 2017/745)',
    ],
    title: 'ALLGEMEINE GESCHÄFTSBEDINGUNGEN (AGB) – SENEAR',
    subtitle:
      'Diese Allgemeinen Geschäftsbedingungen (AGB) regeln das Vertragsverhältnis zwischen dem Betreiber Bányai Gábor und den Nutzern der Android-Anwendung SENEAR (Paket-ID: bond.gabba.senear) sowie der zugehörigen Webdienste (gabba.bond/senear).',
    effectiveDateValue: '7. November 2026',
    quickSummaryTitle: 'Das Wichtigste der SENEAR-AGB auf einen Blick',
    quickSummaryItems: [
      {
        title: 'Dauerhaft kostenloser Basismodus',
        desc: 'Der eigenständige Senioren-Startbildschirm inkl. Fotokacheln, lokaler SOS-Taste und Anruffilter bleibt dauerhaft für 0 € und werbefrei nutzbar.',
      },
      {
        title: 'Faires Google Play-Abo',
        desc: '14 Tage kostenlos testen; danach monatlich oder jährlich über Google Play – jederzeit mit einem Klick in Google Play kündbar.',
      },
      {
        title: 'Klares „Lifetime“-Modell',
        desc: 'Das Einmal-Paket (149,00 €) gilt für den gesamten unterstützten kommerziellen Produktlebenszyklus von SENEAR (mind. 6 Monate Vorankündigung).',
      },
      {
        title: 'Rechtmäßige Familiennutzung',
        desc: 'Eine Gerätekopplung ist ausschließlich mit ausdrücklicher Einwilligung des Seniors oder als gesetzlicher Vertreter zulässig.',
      },
    ],
    operatorSectionTitle: '1. Anbieterkennzeichnung & Geltungsbereich',
    sections: [
      {
        id: 'scope-contract',
        number: '2',
        icon: 'file-check',
        title: 'Vertragsgegenstand, Vertragsschluss & Teilnahmevoraussetzungen',
        intro:
          'Mit dem Herunterladen, der Installation, dem Bestätigen der Einwilligungs-Checkbox in der App oder dem Abschluss eines Abonnements kommt ein Nutzungsvertrag zwischen Ihnen und dem Betreiber zustande:',
        bullets: [
          {
            label: 'Vertragssprache & Speicherung:',
            text: 'Der Vertragstext steht in deutscher, ungarischer und englischer Sprache unter https://gabba.bond/senear/terms jederzeit zum Abruf und Ausdruck (PDF) bereit.',
          },
          {
            label: 'Mindestalter für Betreuerkonten:',
            text: 'Die Registrierung eines Betreuerkontos (Caregiver) sowie der Abschluss kostenpflichtiger Pakete setzen Volljährigkeit (mindestens 18 Jahre) und volle Geschäftsfähigkeit für private, familiäre Zwecke voraus.',
          },
          {
            label: 'Technische Voraussetzungen:',
            text: 'Auf dem Seniorengerät wird mindestens Android 8.0 (API 26) benötigt, für Mobilfunkanrufe/SMS eine aktive SIM-Karte und für die Cloud-Fernunterstützung eine aktive WLAN- oder Mobilfunkdatenverbindung.',
          },
        ],
      },
      {
        id: 'service-modes',
        number: '3',
        icon: 'smartphone',
        title: 'Leistungsumfang: Kostenloser Basismodus vs. Familien-Fernunterstützung',
        intro:
          'SENEAR stellt zwei klar abgegrenzte Leistungsstufen bereit:',
        subsections: [
          {
            subtitle: 'A) Basis-Paket (Eigenständiger Senioren-Modus) — 0 €',
            badge: 'Dauerhaft kostenlos & werbefrei',
            paragraphs: [
              'Umfasst den geschützten Senioren-Startbildschirm (Kiosk-Modus), große Foto-Kurzwahltasten, die lokale SOS-Notruftaste sowie den lokalen Anti-Scam-Anruffilter (Whitelist).',
              'Unbegrenzt ohne Cloud-Konto und ohne Abonnement auf einem Seniorengerät nutzbar.',
            ],
          },
          {
            subtitle: 'B) Familien-Paket / Lifetime-Duo-Paket (Gekoppelter Modus)',
            badge: 'EU-Cloud-Echtzeitsynchronisation',
            paragraphs: [
              'Verbindet 1 Seniorengerät mit bis zu 4 Angehörigen (im Lifetime-Duo-Paket bis zu 2 Seniorengeräte + 4 Angehörige) über einen sicheren 6-stelligen Kopplungscode.',
              'Beinhaltet Fernverwaltung von Fotokontakten und Klingellautstärke, Tagesroutinen mit Bestätigung, Akku- und Heimzonen-Schutz (Geofencing), verschlüsselte WebRTC-Sprach-/Videoanrufe und sofortige SOS-/Sturz-Push-Warnungen.',
            ],
          },
        ],
      },
      {
        id: 'subscriptions-pricing',
        number: '4',
        icon: 'credit-card',
        title: 'Preise, Abrechnung über Google Play & Definition des „Lifetime“-Pakets',
        intro:
          'Alle kostenpflichtigen Tarife werden sicher über Google Play Billing zu Bruttopreisen (inkl. gesetzlicher Steuern) abgewickelt:',
        bullets: [
          {
            label: 'Familien-Abonnement & 14-tägige kostenlose Testphase:',
            text: 'Richtpreis: 7,99 € / Monat oder 59,99 € / Jahr (maßgeblich ist der im Google Play-Checkout angezeigte Preis in Ihrer Landeswährung). Neukunden erhalten eine 14-tägige kostenlose Testphase; bei Kündigung mindestens 24 Stunden vor Ablauf des Testzeitraums über Google Play → Abonnements erfolgt keinerlei Belastung.',
          },
          {
            label: 'Automatische Verlängerung & jederzeitige Kündigung:',
            text: 'Laufende Abonnements verlängern sich automatisch um den gewählten Abrechnungszeitraum, sofern sie nicht vor Ablauf über Google Play gekündigt werden. Nach Kündigung bleiben alle Funktionen bis zum Ende der bezahlten Periode aktiv; danach wechselt das Seniorengerät ohne Datenverlust in den kostenlosen Basismodus.',
          },
          {
            label: 'Rechtliche Definition des Einmal-Tarifs „Lifetime / Für immer“ (149,00 €):',
            text: 'Die Einmalzahlung für das „Lifetime“-Paket gewährt das Nutzungsrecht ohne wiederkehrende Monats- oder Jahresgebühren für die gesamte Dauer des aktiven, kommerziell unterstützten Produktlebenszyklus (Commercial Product Lifecycle) des SENEAR-Softwaredienstes und seiner Cloud-Infrastruktur (für bis zu 2 Seniorengeräte und 4 Angehörige) – nicht bezogen auf die biologische Lebensdauer einer natürlichen Person. Sollte der Cloud-Dienst zukünftig eingestellt werden, informiert der Betreiber betroffene Nutzer mindestens 6 (sechs) Monate im Voraus.',
          },
        ],
      },
      {
        id: 'withdrawal-right',
        number: '5',
        icon: 'scale',
        title: 'Gesetzliches 14-tägiges Widerrufsrecht für Verbraucher (EU-Verbraucherrechterichtlinie)',
        intro:
          'Verbrauchern innerhalb der Europäischen Union steht bei Fernabsatzverträgen über digitale Dienstleistungen ein gesetzliches 14-tägiges Widerrufsrecht zu:',
        bullets: [
          {
            label: 'Ausübung des Widerrufs:',
            text: 'Sie können Ihre Vertragserklärung innerhalb von 14 Tagen ab Vertragsschluss ohne Angabe von Gründen widerrufen – entweder direkt über die Google Play-Rückerstattungsfunktion oder durch eine eindeutige Erklärung per E-Mail an gabba@gabba.bond (bitte Google Play-Bestellnummer, z. B. GPA.xxxx, angeben).',
          },
          {
            label: 'Risikofreier Testzeitraum:',
            text: 'Durch die vorgeschaltete 14-tägige kostenlose Testphase des Familien-Abonnements können Sie sämtliche Funktionen vor einer erstmaligen Zahlungsbelastung unverbindlich prüfen.',
          },
        ],
      },
      {
        id: 'caregiver-obligations',
        number: '6',
        icon: 'users',
        title: 'Pflichten der Betreuungsperson, beidseitige Einwilligung & Missbrauchsverbot',
        intro:
          'SENEAR dient ausschließlich der einvernehmlichen familiären Unterstützung; jede Form heimlicher Überwachung ist streng untersagt:',
        bullets: [
          {
            label: 'Ausdrückliche Einwilligung oder gesetzliche Vertretung:',
            text: 'Die Betreuungsperson sichert verbindlich zu, ein Seniorengerät ausschließlich mit ausdrücklicher, informierter Einwilligung der betreuten Person oder im Rahmen einer wirksamen gesetzlichen Vertretungs-/Vorsorgevollmacht zu koppeln.',
          },
          {
            label: 'Verbot unbefugter Überwachung (Anti-Stalking):',
            text: 'Es ist strengstens untersagt, SENEAR zur verdeckten Ortung, zum Ausspähen oder gegen den Willen einer Person einzusetzen. Bei Verstößen ist der Betreiber zur sofortigen Sperrung der Cloud-Verbindung berechtigt.',
          },
          {
            label: 'Sorgfaltspflicht bei Geräteeinstellungen:',
            text: 'Die Nutzer tragen dafür Sorge, dass auf dem Seniorengerät die erforderlichen Android-Berechtigungen, OEM-Akku-Ausnahmen (siehe /senear/setup) sowie SIM-/Netzwerkverbindungen ordnungsgemäß eingerichtet bleiben.',
          },
        ],
      },
      {
        id: 'medical-emergency-disclaimer',
        number: '7',
        icon: 'warning',
        isWarningBox: true,
        title: 'Wichtiger Medizinprodukt- & Notruf-Haftungsausschluss (EU-MDR 2017/745)',
        intro:
          'Mit der Nutzung von SENEAR erkennen Sie folgenden zwingenden Sicherheitshinweis ausdrücklich an:',
        bullets: [
          {
            label: 'KEIN Medizinprodukt und KEIN Ersatz für 112 oder zertifizierten Hausnotruf:',
            text: 'SENEAR ist KEIN zertifiziertes Medizinprodukt im Sinne der Verordnung (EU) 2017/745 (MDR), kein klinisches Überwachungssystem und KEIN Ersatz für öffentliche Notrufdienste (112) oder einen nach DIN EN 50134 zertifizierten 24/7-Hausnotrufdienst. In akuten medizinischen Notfällen wählen Sie stets direkt den Notruf 112!',
          },
          {
            label: 'Technische Grenzen von Sensorik & Telekommunikation:',
            text: 'Die sensorbasierte Sturzerkennung kann bauartbedingt nicht jede Art von Sturz oder Ohnmacht erkennen und kann Fehlalarme auslösen. Die Zustellung von SOS-Rufen, SMS, Geofencing-Meldungen und Erinnerungen hängt von externen Faktoren (Mobilfunknetz, WLAN, GPS-Empfang, Akkuladung, Android-Energiesparfunktionen) ab, die außerhalb des Einflussbereichs des Betreibers liegen.',
          },
        ],
      },
      {
        id: 'warranty-liability',
        number: '8',
        icon: 'shield',
        title: 'Gewährleistung, Updates & Haftungsbegrenzung',
        intro:
          'Der Betreiber stellt gemäß Richtlinie (EU) 2019/770 erforderliche Sicherheits- und Funktionsupdates bereit:',
        bullets: [
          {
            label: 'Haftungsumfang bei leichter Fahrlässigkeit:',
            text: 'Soweit gesetzlich zulässig, ist die Haftung des Betreibers für mittelbare Schäden oder Ausfälle externer Telekommunikationsnetze ausgeschlossen und der Höhe nach auf die vom Nutzer in den vorangegangenen 12 Monaten gezahlten Entgelte begrenzt.',
          },
          {
            label: 'Zwingende gesetzliche Ausnahmen (§ 309 Nr. 7 BGB / Ptk. 6:152. §):',
            text: 'Die vorstehende Haftungsbeschränkung gilt NICHT bei Vorsatz, grober Fahrlässigkeit sowie NICHT für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit oder nach zwingenden Vorschriften des Produkthaftungs- und Verbraucherschutzrechts.',
          },
        ],
      },
      {
        id: 'ip-termination',
        number: '9',
        icon: 'lock',
        title: 'Urheberrecht, Nutzungsrechte & Vertragsbeendigung',
        intro:
          'Sämtliche Rechte an Softwarecode, Design, Marken und Dokumentation von SENEAR verbleiben bei Bányai Gábor (gabba):',
        bullets: [
          {
            label: 'Persönliche Nutzungslizenz & Eigene Inhalte:',
            text: 'Sie erhalten ein einfaches, nicht übertragbares Recht zur privaten Nutzung der App. Alle von Ihnen hinterlegten Familienfotos und Kontaktdaten verbleiben vollständig in Ihrem Eigentum.',
          },
          {
            label: 'Beendigung jederzeit möglich:',
            text: 'Sie können den Vertrag jederzeit beenden, indem Sie ein etwaiges Abonnement in Google Play kündigen und/oder in der App die Funktion „Alle Daten löschen / Entkoppeln“ ausführen.',
          },
        ],
      },
      buildCoreTermsDisputeSection('de', '10'),
    ],
  },

  // ===========================================================================
  // ENGLISH (EN) — TERMS OF SERVICE
  // ===========================================================================
  en: {
    kind: 'terms',
    shortTabLabel: 'Terms of Service (ToS)',
    breadcrumbCurrent: 'Terms of Service (ToS)',
    badges: [
      'EU Digital Services Directive (2019/770)',
      '14-Day Withdrawal & Free Trial',
      'Non-Medical Device Notice (MDR 2017/745)',
    ],
    title: 'TERMS OF SERVICE (ToS) – SENEAR',
    subtitle:
      'These Terms of Service ("Terms") govern your access to and use of the SENEAR Android application (package ID: bond.gabba.senear) and associated web services (gabba.bond/senear), operated by Bányai Gábor.',
    effectiveDateValue: 'November 7, 2026',
    quickSummaryTitle: 'Key Terms of Service Highlights at a Glance',
    quickSummaryItems: [
      {
        title: 'Forever-Free Core Mode',
        desc: 'The standalone Senior home screen, photo speed-dial tiles, local SOS button, and scam call filter remain €0 and 100% ad-free.',
      },
      {
        title: 'Transparent Google Play Billing',
        desc: 'Connected Family plans start with a 14-day free trial and can be canceled anytime with one tap inside Google Play Subscriptions.',
      },
      {
        title: 'Clear "Lifetime" Definition',
        desc: 'The €149.00 One-Time Duo license covers the active supported commercial lifecycle of SENEAR (with min. 6 months prior notice).',
      },
      {
        title: 'Lawful Bilateral Consent',
        desc: 'Pairing a Senior phone is strictly permitted only with the Senior’s explicit consent or authorized legal representation.',
      },
    ],
    operatorSectionTitle: '1. Service Provider (Operator) & Scope of Terms',
    sections: [
      {
        id: 'scope-contract',
        number: '2',
        icon: 'file-check',
        title: 'Contract Formation, Eligibility & Technical Requirements',
        intro:
          'By downloading, installing, accepting the in-app legal checkbox, or subscribing to SENEAR, you enter into a binding electronic service agreement with the Operator:',
        bullets: [
          {
            label: 'Available Languages & Archiving:',
            text: 'These Terms are published in Hungarian, German, and English at https://gabba.bond/senear/terms and can be printed or saved as PDF at any time.',
          },
          {
            label: 'Age & Consumer Eligibility:',
            text: 'Creating a Caregiver account or purchasing a paid plan requires you to be at least 18 years old with full legal capacity, using SENEAR for personal, non-commercial family care.',
          },
          {
            label: 'Minimum Device & Network Requirements:',
            text: 'The Senior phone requires Android 8.0 (API 26) or newer, an active SIM card for cellular calls/SMS, and Wi-Fi or mobile data connectivity for Paired Cloud features.',
          },
        ],
      },
      {
        id: 'service-modes',
        number: '3',
        icon: 'smartphone',
        title: 'Service Tiers: Forever-Free Standalone Mode vs. Connected Family Plans',
        intro:
          'SENEAR provides two clearly defined functional tiers:',
        subsections: [
          {
            subtitle: 'A) Basic Tier (Standalone Senior Mode) — €0 Forever',
            badge: 'Ad-Free & Offline-First',
            paragraphs: [
              'Includes the locked high-contrast SENEAR Kiosk home screen, oversized photo speed-dial tiles, dedicated local SOS button, and local Anti-Scam Whitelist call screening.',
              'Usable indefinitely on one Senior phone with zero cloud registration and zero subscription fees.',
            ],
          },
          {
            subtitle: 'B) Family & Lifetime Duo Tiers (Connected Caregiver Mode)',
            badge: 'Real-Time EU Cloud Sync',
            paragraphs: [
              'Connects 1 Senior phone with up to 4 family Caregivers (or up to 2 Senior phones + 4 Caregivers on the Lifetime Duo tier) via a bilateral 6-digit pairing code.',
              'Unlocks remote photo contact & volume administration, daily routine alarms with confirmation, battery & Home Safe Zone geofencing, encrypted WebRTC audio/video calls, and instant SOS/fall push alerts.',
            ],
          },
        ],
      },
      {
        id: 'subscriptions-pricing',
        number: '4',
        icon: 'credit-card',
        title: 'Pricing, Google Play Billing & Commercial Lifecycle of the "Lifetime" Plan',
        intro:
          'All paid plans are processed securely via Google Play Billing at gross consumer prices (inclusive of applicable taxes):',
        bullets: [
          {
            label: 'Family Subscription & 14-Day Free Trial:',
            text: 'Reference pricing: €7.99/month or €59.99/year (exact local currency pricing is displayed at Google Play checkout). Eligible new subscribers receive a 14-day free trial; canceling at least 24 hours before trial expiration in Google Play → Subscriptions incurs zero charges.',
          },
          {
            label: 'Auto-Renewal & Cancellation:',
            text: 'Monthly and annual subscriptions renew automatically unless canceled in Google Play Subscriptions. Upon cancellation, connected features remain active through the end of the current paid period, after which the Senior phone reverts seamlessly to the Forever-Free Basic mode without losing local contacts.',
          },
          {
            label: 'Legal Scope of the One-Time "Lifetime" Duo Plan (€149.00):',
            text: 'The one-time "Lifetime" ("Örökös" / "Lifetime-Paket") license grants recurring-fee-free access for up to 2 Senior phones and 4 Caregivers for the entire supported commercial product lifecycle of the SENEAR software service and its cloud backend—not the biological lifetime of any individual person. Should the Operator ever discontinue the SENEAR cloud service, active users will receive at least six (6) months’ advance written notice.',
          },
        ],
      },
      {
        id: 'withdrawal-right',
        number: '5',
        icon: 'scale',
        title: 'EU 14-Day Statutory Right of Withdrawal (Directive 2011/83/EU)',
        intro:
          'Consumers residing in the European Union / EEA have a statutory 14-day right to withdraw from distance contracts for digital services without giving any reason:',
        bullets: [
          {
            label: 'How to Exercise Withdrawal:',
            text: 'Within 14 calendar days of purchase, you may request a full refund either directly through Google Play’s refund portal or by sending an unequivocal withdrawal email to gabba@gabba.bond quoting your Google Play order ID (e.g., GPA.xxxx).',
          },
          {
            label: 'Risk-Free 14-Day Trial:',
            text: 'Because the Family subscription includes a 14-day free trial prior to initial billing, families can evaluate all remote features completely risk-free before any payment is captured.',
          },
        ],
      },
      {
        id: 'caregiver-obligations',
        number: '6',
        icon: 'users',
        title: 'Caregiver Obligations, Bilateral Consent & Prohibited Conduct',
        intro:
          'SENEAR is strictly an ethical family care tool; covert monitoring is strictly forbidden:',
        bullets: [
          {
            label: 'Mandatory Express Consent or Legal Guardianship:',
            text: 'You warrant that you will pair a Senior’s smartphone strictly with that person’s explicit, informed consent, or under valid legal guardianship / power of attorney.',
          },
          {
            label: 'Strict Prohibition of Covert Tracking or Stalking:',
            text: 'Using SENEAR for non-consensual surveillance, stalking, eavesdropping, or unlawful monitoring is strictly prohibited and grounds for immediate termination of cloud access.',
          },
          {
            label: 'Maintaining Device Permissions & Connectivity:',
            text: 'Users are responsible for keeping required Android permissions, OEM battery exemptions (detailed at /senear/setup), and active cellular/internet service enabled on the Senior phone.',
          },
        ],
      },
      {
        id: 'medical-emergency-disclaimer',
        number: '7',
        icon: 'warning',
        isWarningBox: true,
        title: 'Mandatory Medical Device & Emergency Dispatch Disclaimer (EU MDR 2017/745)',
        intro:
          'By using SENEAR, you expressly acknowledge and agree to the following critical safety boundaries:',
        bullets: [
          {
            label: 'NOT a Certified Medical Device & NOT a 112 / 911 Replacement:',
            text: 'SENEAR is NOT a certified medical device under EU Regulation (EU) 2017/745 (MDR), is not a clinical monitoring system, and is NOT a 24/7 emergency dispatch center (such as 112, 911, or certified European "Hausnotruf" services). In any life-threatening emergency, always dial 112 (or local emergency services) directly!',
          },
          {
            label: 'Sensor & Telecommunications Limitations:',
            text: 'Smartphone accelerometer fall detection cannot detect every type of fall or gradual collapse and may trigger false positives. Delivery of SOS calls/SMS, Safe Zone alerts, WebRTC calls, and routine alarms depends on cellular signal, Wi-Fi, GPS satellites, battery charge, and Android OS power policies outside the Operator’s control.',
          },
        ],
      },
      {
        id: 'warranty-liability',
        number: '8',
        icon: 'shield',
        title: 'Digital Service Conformity, Updates & Limitation of Liability',
        intro:
          'In accordance with EU Directive (EU) 2019/770, the Operator provides ongoing security and compatibility updates for SENEAR:',
        bullets: [
          {
            label: 'Liability Cap:',
            text: 'To the fullest extent permitted by applicable law, the Operator shall not be liable for indirect or consequential damages or third-party telecom/network outages, and total aggregate liability shall not exceed the total fees paid by the user in the preceding 12 months.',
          },
          {
            label: 'Mandatory Statutory Carve-Outs (Hungarian Ptk. 6:152. § / German BGB § 309 Nr. 7):',
            text: 'Nothing in these Terms excludes or limits the Operator’s liability for intent, gross negligence, injury to life, body, or health, or any other liability that cannot be excluded under mandatory EU consumer law.',
          },
        ],
      },
      {
        id: 'ip-termination',
        number: '9',
        icon: 'lock',
        title: 'Intellectual Property, Personal License & Termination',
        intro:
          'All software code, UI designs, trademarks, and documentation of SENEAR belong exclusively to Bányai Gábor (gabba):',
        bullets: [
          {
            label: 'Personal License & Ownership of Family Content:',
            text: 'You receive a personal, non-exclusive, revocable license to use SENEAR. You retain 100% ownership of all family contact details and photos you configure.',
          },
          {
            label: 'Termination at Any Time:',
            text: 'You may terminate this agreement at any time by canceling any active subscription in Google Play and/or triggering instant "Delete All Data / Unpair" inside the SENEAR app.',
          },
        ],
      },
      buildCoreTermsDisputeSection('en', '10'),
    ],
  },
};
