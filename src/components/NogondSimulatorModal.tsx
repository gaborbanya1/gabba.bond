import { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  PhoneCall, 
  AlertTriangle, 
  Pill, 
  ShieldCheck, 
  BatteryMedium, 
  Wifi, 
  Heart, 
  Lock, 
  UserCheck, 
  Check, 
  Volume2 
} from 'lucide-react';
import { SENEAR_SIMULATOR_DATA } from '../data/portfolioData';
import { useLanguage } from '../i18n/LanguageContext';

interface NogondSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIMULATOR_I18N = {
  hu: {
    modalTitle: 'SENEAR Interaktív Szimulátor',
    ecosystemTag: 'NEAR Ökoszisztéma',
    modalSubtitle: 'A SENEAR idős felületének tesztelése (a NEAR ökoszisztéma része a gyermekeknek készült JUNEAR mellett)',
    kioskLocked: 'Kioszk Zárolva',
    dateLabel: 'Kedd, szeptember 22.',
    connectedCaregiver: 'Kapcsolódva: Anna (Lánya)',
    familyCall: 'Család hívása',
    familyCallSub: '1 érintéses gyorstárcsázó',
    medications: 'Gyógyszerek',
    medicationsSub: '1 bevéve, 2 hátra van',
    sos: 'Vészhelyzeti SOS',
    sosSub: 'Hívja a családot & GPS-t küld',
    sosTap: 'MEGNYOMÁS',
    hardwareKeyNote: 'A fizikai bekapcsológomb háromszori megnyomása offline is azonnali SOS-t indít.',
    speedDialTitle: 'Gyorstárcsázó Lista',
    backToHome: 'Vissza a kezdőlapra',
    callingCaregiver: 'Gondozó hívása folyamatban',
    speakerEngaged: 'Kihangosító automatikusan bekapcsolva',
    endCall: 'Hívás befejezése',
    todaysMedicines: 'Mai Gyógyszerek',
    caregiverPillNote: 'A gondozók automatikus értesítést kapnak, amint a gyógyszer bevétele megjelölésre kerül.',
    sosSentTitle: 'SOS elküldve a családnak!',
    sosSentDesc: 'Élő GPS helyzet elküldve Annának és Péternek. A telefon most automatikusan, maximális hangerőn fogadja a család hívásait.',
    resetSosBtn: 'SOS Teszt Alaphelyzetbe',
    dispatchingHelp: 'Vészhelyzeti Segélykérés Folyamatban',
    dispatchingHelpNote: 'Riasztás küldése az elsődleges gondozónak: Dr. Bányai Anna.',
    cancelAlarm: 'Téves riasztás (Mégse)',
    returnMainScreen: 'Visszatérés a főképernyőre',
    protectedBadge: 'Védett',
    homeBtn: 'FŐOLDAL',
    spotlightTitle: 'Architektúra Fókusz',
    spotlightHeadline: 'Miért szünteti meg a SENEAR & JUNEAR a felhasználói bizonytalanságot?',
    spotlightDesc: 'A hagyományos Android és iOS felületek finommotorikus képességekkel rendelkező fiataloknak készültek. Ha egy idős vagy gyermek véletlenül repülőgépes módba kapcsolja a telefont, megszakad a kapcsolat a családdal. A NEAR ökoszisztéma ezt natív rendszerszintű zárolással szünteti meg.',
    arch1Title: 'Android Device Owner (DPC) Rendszerzár',
    arch1Desc: 'A SENEAR vállalati szintű Device Owner jogosultsággal fut. Fizikailag megakadályozza a hozzáférést a beállításokhoz, letiltja a lehúzható értesítési sávot és a véletlen alkalmazástörlést.',
    arch2Title: 'Offline-First SQLite / Room Szinkronizáció',
    arch2Desc: 'Az alapvető funkciók (tárcsázás, helyi ébresztések, gyógyszerrend, SMS SOS) nem igényelnek mobilnetet. Amikor a kapcsolat visszatér, a rendszer szinkronizál a felhőbe.',
    arch3Title: 'Távoli Gondozói Felügyeleti Portál',
    arch3Desc: 'A családtagok saját okostelefonjukról távolról felhangosíthatják a némított telefont, ellenőrizhetik az akkut, frissíthetik a kontaktokat és megerősítő csengetést indíthatnak.',
    footerDev: 'Natív Kotlin és Jetpack Compose nyelven fejlesztve',
    closeSimulator: 'Szimulátor bezárása',
    contactRoles: {
      'Daughter / Primary Caregiver': 'Lánya / Elsődleges Gondozó',
      'Son / Emergency Backup': 'Fia / Másodlagos Elérhetőség',
      'Family Physician': 'Háziorvos',
    } as Record<string, string>,
  },
  de: {
    modalTitle: 'Interaktiver SENEAR Simulator',
    ecosystemTag: 'NEAR Ökosystem',
    modalSubtitle: 'SENEAR für Senioren testen (Teil des NEAR Ökosystems neben JUNEAR für Kinder)',
    kioskLocked: 'Kiosk Gesperrt',
    dateLabel: 'Dienstag, 22. September',
    connectedCaregiver: 'Verbunden mit Anna (Tochter)',
    familyCall: 'Familie anrufen',
    familyCallSub: '1-Tipp Schnellwahl',
    medications: 'Medikamente',
    medicationsSub: '1 eingenommen, 2 übrig',
    sos: 'Notfall-SOS',
    sosSub: 'Ruft Familie an & sendet GPS',
    sosTap: 'ANTIPPEN',
    hardwareKeyNote: 'Dreimaliges Drücken der Power-Taste löst SOS auch offline aus.',
    speedDialTitle: 'Schnellwahlliste',
    backToHome: 'Zurück zur Startseite',
    callingCaregiver: 'Betreuer wird angerufen',
    speakerEngaged: 'Freisprecher automatisch aktiviert',
    endCall: 'Anruf beenden',
    todaysMedicines: 'Heutige Medikamente',
    caregiverPillNote: 'Angehörige erhalten eine automatische Bestätigung, sobald Tabletten abgehakt werden.',
    sosSentTitle: 'SOS an die Familie gesendet!',
    sosSentDesc: 'Live-GPS-Standort an Anna und Peter gesendet. Das Telefon nimmt Anrufe der Familie jetzt automatisch mit maximaler Lautstärke an.',
    resetSosBtn: 'SOS-Test zurücksetzen',
    dispatchingHelp: 'Notruf wird abgesetzt',
    dispatchingHelpNote: 'Benachrichtigung an Hauptbetreuerin Dr. Anna Banyai wird gesendet.',
    cancelAlarm: 'Fehlalarm (Abbrechen)',
    returnMainScreen: 'Zurück zum Hauptbildschirm',
    protectedBadge: 'Geschützt',
    homeBtn: 'START',
    spotlightTitle: 'Architektur-Einblick',
    spotlightHeadline: 'Warum SENEAR & JUNEAR Fehlbedienungen und Panik verhindern',
    spotlightDesc: 'Standard-Launcher sind für Digital Natives mit feiner Motorik konzipiert. Wenn ein Senior versehentlich den Flugmodus aktiviert, bricht der Kontakt ab. Das NEAR Ökosystem löst dies durch strikte Sperren auf Betriebssystemebene.',
    arch1Title: 'Android Device Owner (DPC) Kiosksperre',
    arch1Desc: 'SENEAR läuft als Enterprise Device Owner. Es verhindert physisch den Zugriff auf Systemeinstellungen, sperrt Statusleisten-Gesten und schließt App-Deinstallationen aus.',
    arch2Title: 'Offline-First SQLite / Room Synchronisation',
    arch2Desc: 'Kernfunktionen (Telefonie, Alarme, Medikamentenplan, SMS-SOS) benötigen keine mobilen Daten. Bei Verbindung werden Ereignisse synchronisiert.',
    arch3Title: 'Fernpflege-Portal für Angehörige',
    arch3Desc: 'Angehörige können das stummgeschaltete Telefon aus der Ferne lautstellen, den Akkustand prüfen und Schnellwahlnummern pflegen.',
    footerDev: 'Nativ in Kotlin + Jetpack Compose entwickelt',
    closeSimulator: 'Simulator schließen',
    contactRoles: {
      'Daughter / Primary Caregiver': 'Tochter / Hauptbetreuerin',
      'Son / Emergency Backup': 'Sohn / Notfallkontakt',
      'Family Physician': 'Hausarzt',
    } as Record<string, string>,
  },
  en: {
    modalTitle: 'SENEAR Interactive Simulator',
    ecosystemTag: 'NEAR Ecosystem',
    modalSubtitle: 'Testing SENEAR for seniors (part of the NEAR Ecosystem alongside JUNEAR for kids)',
    kioskLocked: 'Kiosk Locked',
    dateLabel: 'Tuesday, 22 September',
    connectedCaregiver: 'Connected to Anna (Daughter)',
    familyCall: 'Family Call',
    familyCallSub: '1-tap speed dials',
    medications: 'Medications',
    medicationsSub: '1 taken, 2 left',
    sos: 'Emergency SOS',
    sosSub: 'Calls family & sends GPS',
    sosTap: 'TAP',
    hardwareKeyNote: 'Triple-press physical power button triggers SOS offline.',
    speedDialTitle: 'Speed Dial List',
    backToHome: 'Back to Home',
    callingCaregiver: 'Calling Caregiver',
    speakerEngaged: 'Speakerphone auto-engaged',
    endCall: 'End Call',
    todaysMedicines: "Today's Medicines",
    caregiverPillNote: 'Caregivers receive automatic confirmation when pills are checked off.',
    sosSentTitle: 'SOS Sent to Family!',
    sosSentDesc: 'Live GPS location sent to Anna and Peter. Phone is now answering family calls automatically with max speaker volume.',
    resetSosBtn: 'Reset SOS Test',
    dispatchingHelp: 'Dispatching Emergency Help',
    dispatchingHelpNote: 'Sending alerts to primary caregiver Dr. Anna Banyai.',
    cancelAlarm: 'False Alarm (Cancel)',
    returnMainScreen: 'Return to Main Screen',
    protectedBadge: 'Protected',
    homeBtn: 'HOME',
    spotlightTitle: 'Architecture Spotlight',
    spotlightHeadline: 'Why SENEAR & JUNEAR Eliminate User Panic',
    spotlightDesc: 'Standard Android and iOS launchers are designed for digital natives with fine motor skills. When a senior or child accidentally taps airplane mode or dismisses a dialog, they lose contact with family. The NEAR Ecosystem solves this through native system-level lockdown.',
    arch1Title: 'Android Device Owner (DPC) Lockdown',
    arch1Desc: 'SENEAR runs as the enterprise device owner. It physically prevents access to standard settings, disables swipe-down notification shades, and disallows accidental app uninstallations.',
    arch2Title: 'Offline-First SQLite / Room Synchronization',
    arch2Desc: 'Core capabilities (phone dialing, local alarm chimes, medication schedules, SMS SOS) require zero cellular data. The system caches events and syncs to caregiver cloud when connectivity returns.',
    arch3Title: 'Remote Caregiver Guardian Portal',
    arch3Desc: 'Caregivers can remotely unmute the phone if silenced, inspect battery level, update speed dial photos, and trigger auditory reassurance rings from their own smartphone.',
    footerDev: 'Developed in native Kotlin + Jetpack Compose',
    closeSimulator: 'Close Simulator',
    contactRoles: {
      'Daughter / Primary Caregiver': 'Daughter / Primary Caregiver',
      'Son / Emergency Backup': 'Son / Emergency Backup',
      'Family Physician': 'Family Physician',
    } as Record<string, string>,
  },
};

export function NogondSimulatorModal({ isOpen, onClose }: NogondSimulatorModalProps) {
  const { language } = useLanguage();
  const sim = SIMULATOR_I18N[language as keyof typeof SIMULATOR_I18N] || SIMULATOR_I18N.en;

  const [activeTab, setActiveTab] = useState<'home' | 'contacts' | 'meds' | 'sos' | 'compare'>('home');
  const [callActiveContact, setCallActiveContact] = useState<string | null>(null);
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);
  const [sosDispatched, setSosDispatched] = useState(false);
  const [takenMeds, setTakenMeds] = useState<Record<number, boolean>>({ 0: true });

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // SOS Countdown handler
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosActive && sosCountdown > 0 && !sosDispatched) {
      timer = setTimeout(() => setSosCountdown((prev) => prev - 1), 1000);
    } else if (sosActive && sosCountdown === 0 && !sosDispatched) {
      setSosDispatched(true);
    }
    return () => clearTimeout(timer);
  }, [sosActive, sosCountdown, sosDispatched]);

  if (!isOpen) return null;

  const toggleMed = (index: number) => {
    setTakenMeds((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const resetSos = () => {
    setSosActive(false);
    setSosCountdown(5);
    setSosDispatched(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#2C2C2C]/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-2xl border border-[#C5A880]/50 shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nogond-modal-title"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F5F0EB] border-b border-[#C5A880]/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#C5A880]/40 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-[#A38053]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="nogond-modal-title" className="font-heading font-bold text-lg text-[#2C2C2C]">
                  {sim.modalTitle}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-[#FFFFFF] text-[#A38053] border border-[#C5A880]/40 rounded-full">
                  {sim.ecosystemTag}
                </span>
              </div>
              <p className="text-xs text-[#5C5A56]">
                {sim.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#5C5A56] hover:text-[#2C2C2C] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Phone Device Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[320px] bg-[#1A1A1A] rounded-[40px] p-3 shadow-xl border-4 border-[#333333] relative">
              
              {/* Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-[#000000] rounded-full flex items-center justify-center z-20">
                <div className="w-8 h-1 bg-[#333333] rounded-full" />
              </div>

              {/* Phone Screen Canvas */}
              <div className="w-full h-[540px] bg-[#FDFBF7] rounded-[32px] overflow-hidden flex flex-col justify-between border border-[#E8DFD3] text-[#2C2C2C] select-none pt-7 relative">
                
                {/* Phone Status Bar (Protected by Device Owner) */}
                <div className="px-4 py-1.5 flex items-center justify-between text-[11px] font-semibold text-[#5C5A56] border-b border-[#EAE0D3]/60 bg-[#F5F0EB]/50">
                  <span>10:45</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-emerald-700 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#A38053]" /> {sim.kioskLocked}
                    </span>
                    <Wifi className="w-3 h-3 text-[#5C5A56]" />
                    <BatteryMedium className="w-3.5 h-3.5 text-[#5C5A56]" />
                  </div>
                </div>

                {/* Main Screen Content Switching */}
                <div className="flex-1 p-4 overflow-y-auto">
                  
                  {/* View 1: Main Home Screen */}
                  {activeTab === 'home' && (
                    <div className="space-y-4">
                      {/* Big Readable Clock & Date */}
                      <div className="text-center pt-2 pb-1 bg-[#FFFFFF] rounded-2xl border border-[#C5A880]/30 p-3 shadow-2xs">
                        <div className="text-4xl font-bold font-heading text-[#2C2C2C] tracking-tight">
                          10:45
                        </div>
                        <div className="text-xs font-semibold text-[#A38053] uppercase tracking-wider mt-0.5">
                          {sim.dateLabel}
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium">
                          <UserCheck className="w-3 h-3" />
                          <span>{sim.connectedCaregiver}</span>
                        </div>
                      </div>

                      {/* 4 Oversized High-Contrast Tactile Cards */}
                      <div className="grid grid-cols-2 gap-2.5">
                        
                        {/* 1. Quick Call Card */}
                        <button
                          onClick={() => setActiveTab('contacts')}
                          className="p-3.5 rounded-xl bg-[#FFFFFF] border-2 border-[#C5A880] hover:bg-[#F5F0EB] text-left shadow-2xs flex flex-col justify-between h-28 cursor-pointer transition-all active:scale-95"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 flex items-center justify-center text-[#8C7355]">
                            <PhoneCall className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-heading font-bold text-sm text-[#2C2C2C]">{sim.familyCall}</p>
                            <p className="text-[10px] text-[#5C5A56]">{sim.familyCallSub}</p>
                          </div>
                        </button>

                        {/* 2. Medication Card */}
                        <button
                          onClick={() => setActiveTab('meds')}
                          className="p-3.5 rounded-xl bg-[#FFFFFF] border-2 border-[#D4AF37]/70 hover:bg-[#F5F0EB] text-left shadow-2xs flex flex-col justify-between h-28 cursor-pointer transition-all active:scale-95"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] flex items-center justify-center text-[#A38053]">
                            <Pill className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-heading font-bold text-sm text-[#2C2C2C]">{sim.medications}</p>
                            <p className="text-[10px] text-[#5C5A56]">{sim.medicationsSub}</p>
                          </div>
                        </button>

                        {/* 3. Emergency SOS Card */}
                        <button
                          onClick={() => {
                            setActiveTab('sos');
                            setSosActive(true);
                          }}
                          className="col-span-2 p-3.5 rounded-xl bg-[#FFF5F5] border-2 border-red-400 hover:bg-red-50 text-left shadow-2xs flex items-center justify-between cursor-pointer transition-all active:scale-95"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                              <AlertTriangle className="w-5 h-5 animate-pulse" />
                            </div>
                            <div>
                              <p className="font-heading font-bold text-base text-red-900">{sim.sos}</p>
                              <p className="text-[10px] text-red-700">{sim.sosSub}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-1 bg-red-600 text-white rounded-md">
                            {sim.sosTap}
                          </span>
                        </button>

                      </div>

                      {/* Hardware Button Reminder */}
                      <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] text-center">
                        <p className="text-[10px] text-[#6E6B65]">
                          {sim.hardwareKeyNote}
                        </p>
                      </div>

                    </div>
                  )}

                  {/* View 2: Speed-Dial Contacts */}
                  {activeTab === 'contacts' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]">
                        <h4 className="font-heading font-bold text-sm text-[#2C2C2C]">{sim.speedDialTitle}</h4>
                        <button
                          onClick={() => {
                            setActiveTab('home');
                            setCallActiveContact(null);
                          }}
                          className="text-xs font-semibold text-[#8C7355] underline cursor-pointer"
                        >
                          {sim.backToHome}
                        </button>
                      </div>

                      {callActiveContact ? (
                        <div className="p-6 text-center space-y-4 bg-[#FFFFFF] rounded-2xl border-2 border-emerald-500 shadow-sm">
                          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 animate-bounce">
                            <PhoneCall className="w-7 h-7" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-[#6E6B65]">{sim.callingCaregiver}</p>
                            <h5 className="font-heading font-bold text-xl text-[#2C2C2C]">{callActiveContact}</h5>
                            <p className="text-xs text-emerald-700 mt-1">{sim.speakerEngaged}</p>
                          </div>
                          <button
                            onClick={() => setCallActiveContact(null)}
                            className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer shadow-xs"
                          >
                            {sim.endCall}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {SENEAR_SIMULATOR_DATA.speedDials.map((contact) => {
                            const localizedRole = sim.contactRoles[contact.role] || contact.role;
                            return (
                              <button
                                key={contact.id}
                                onClick={() => setCallActiveContact(`${contact.name} (${localizedRole})`)}
                                className="w-full p-3 rounded-xl bg-[#FFFFFF] border-2 border-[#C5A880]/60 hover:border-[#C5A880] text-left flex items-center justify-between cursor-pointer transition-all active:scale-95 shadow-2xs"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-[#F5F0EB] flex items-center justify-center font-bold text-[#A38053] text-sm">
                                    {contact.name[0]}
                                  </div>
                                  <div>
                                    <p className="font-heading font-bold text-sm text-[#2C2C2C]">{contact.name}</p>
                                    <p className="text-[10px] text-[#6E6B65]">{localizedRole}</p>
                                  </div>
                                </div>
                                <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                                  <PhoneCall className="w-3.5 h-3.5" />
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* View 3: Medication Checklist */}
                  {activeTab === 'meds' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]">
                        <h4 className="font-heading font-bold text-sm text-[#2C2C2C]">{sim.todaysMedicines}</h4>
                        <button
                          onClick={() => setActiveTab('home')}
                          className="text-xs font-semibold text-[#8C7355] underline cursor-pointer"
                        >
                          {sim.backToHome}
                        </button>
                      </div>

                      <div className="space-y-2">
                        {SENEAR_SIMULATOR_DATA.medications.map((med, idx) => {
                          const isDone = !!takenMeds[idx];
                          return (
                            <button
                              key={idx}
                              onClick={() => toggleMed(idx)}
                              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                                isDone 
                                  ? 'bg-emerald-50 border-emerald-300' 
                                  : 'bg-[#FFFFFF] border-[#C5A880]/50'
                              }`}
                            >
                              <div>
                                <span className="text-[10px] font-semibold text-[#8C7355] block">{med.time}</span>
                                <span className={`text-xs font-bold ${isDone ? 'line-through text-emerald-900' : 'text-[#2C2C2C]'}`}>
                                  {med.name}
                                </span>
                              </div>
                              <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${
                                isDone ? 'bg-emerald-600 text-white' : 'border border-[#C5A880] text-transparent'
                              }`}>
                                <Check className="w-4 h-4" />
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <p className="text-[10px] text-center text-[#6E6B65] pt-2">
                        {sim.caregiverPillNote}
                      </p>
                    </div>
                  )}

                  {/* View 4: SOS Screen */}
                  {activeTab === 'sos' && (
                    <div className="space-y-4 text-center py-4">
                      {sosDispatched ? (
                        <div className="p-4 bg-red-50 rounded-2xl border-2 border-red-500 space-y-3">
                          <div className="w-12 h-12 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center animate-pulse">
                            <Heart className="w-6 h-6" />
                          </div>
                          <h5 className="font-heading font-bold text-base text-red-900">{sim.sosSentTitle}</h5>
                          <p className="text-[11px] text-red-800 leading-tight">
                            {sim.sosSentDesc}
                          </p>
                          <button
                            onClick={resetSos}
                            className="w-full py-2 bg-[#2C2C2C] text-white rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            {sim.resetSosBtn}
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 bg-red-50 rounded-2xl border-2 border-red-400 space-y-3">
                          <h5 className="font-heading font-bold text-lg text-red-900">{sim.dispatchingHelp}</h5>
                          <div className="text-4xl font-bold font-mono text-red-600">
                            00:0{sosCountdown}
                          </div>
                          <p className="text-xs text-red-700">
                            {sim.dispatchingHelpNote}
                          </p>
                          <button
                            onClick={() => {
                              resetSos();
                              setActiveTab('home');
                            }}
                            className="w-full py-2.5 bg-gray-200 hover:bg-gray-300 text-[#2C2C2C] rounded-lg text-xs font-bold cursor-pointer"
                          >
                            {sim.cancelAlarm}
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          resetSos();
                          setActiveTab('home');
                        }}
                        className="text-xs font-medium text-[#5C5A56] underline cursor-pointer"
                      >
                        {sim.returnMainScreen}
                      </button>
                    </div>
                  )}

                </div>

                {/* Phone Bottom Kiosk Bar: Non-navigable, Fail-Safe */}
                <div className="px-4 py-2 bg-[#F5F0EB] border-t border-[#E8DFD3] flex items-center justify-between text-[11px] text-[#5C5A56]">
                  <span className="font-medium text-[10px]">SENEAR Kiosk v2.4</span>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="px-3 py-1 rounded-md bg-[#FFFFFF] border border-[#C5A880]/40 font-bold text-[10px] text-[#2C2C2C] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    {sim.homeBtn}
                  </button>
                  <span className="text-[10px] text-emerald-700 font-semibold">{sim.protectedBadge}</span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Architectural Explanation & Zero-Confusion Specs */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F0EB] text-[#8C7355] text-xs font-semibold uppercase tracking-wider mb-2">
                <span>{sim.spotlightTitle}</span>
              </div>
              <h4 className="font-heading text-2xl font-bold text-[#2C2C2C]">
                {sim.spotlightHeadline}
              </h4>
              <p className="text-sm text-[#5C5A56] leading-relaxed mt-2">
                {sim.spotlightDesc}
              </p>
            </div>

            {/* Architecture Highlights Checklist */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                <div className="flex items-center gap-2 font-heading font-semibold text-sm text-[#2C2C2C]">
                  <ShieldCheck className="w-4 h-4 text-[#A38053]" />
                  <span>{sim.arch1Title}</span>
                </div>
                <p className="text-xs text-[#5C5A56] leading-relaxed pl-6">
                  {sim.arch1Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                <div className="flex items-center gap-2 font-heading font-semibold text-sm text-[#2C2C2C]">
                  <Wifi className="w-4 h-4 text-[#A38053]" />
                  <span>{sim.arch2Title}</span>
                </div>
                <p className="text-xs text-[#5C5A56] leading-relaxed pl-6">
                  {sim.arch2Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                <div className="flex items-center gap-2 font-heading font-semibold text-sm text-[#2C2C2C]">
                  <Volume2 className="w-4 h-4 text-[#A38053]" />
                  <span>{sim.arch3Title}</span>
                </div>
                <p className="text-xs text-[#5C5A56] leading-relaxed pl-6">
                  {sim.arch3Desc}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-[#F0EAE1]">
              <span className="text-xs text-[#6E6B65]">{sim.footerDev}</span>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#2C2C2C] text-[#FAFAFA] font-medium text-xs hover:bg-[#1A1A1A] cursor-pointer"
              >
                {sim.closeSimulator}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
