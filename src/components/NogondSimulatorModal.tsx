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
  RotateCcw,
  Check,
  Volume2
} from 'lucide-react';
import { SENEAR_SIMULATOR_DATA } from '../data/portfolioData';

interface NogondSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NogondSimulatorModal({ isOpen, onClose }: NogondSimulatorModalProps) {
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
                  SENEAR Interactive Simulator
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-[#FFFFFF] text-[#A38053] border border-[#C5A880]/40 rounded-full">
                  **NEAR Ecosystem
                </span>
              </div>
              <p className="text-xs text-[#5C5A56]">
                Testing SENEAR for seniors (part of the **NEAR Ecosystem alongside JUNEAR for kids)
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
                  <span>10:45 AM</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-emerald-700 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#A38053]" /> Kiosk Locked
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
                          Tuesday, 22 September
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium">
                          <UserCheck className="w-3 h-3" />
                          <span>Connected to Anna (Daughter)</span>
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
                            <p className="font-heading font-bold text-sm text-[#2C2C2C]">Family Call</p>
                            <p className="text-[10px] text-[#5C5A56]">1-tap speed dials</p>
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
                            <p className="font-heading font-bold text-sm text-[#2C2C2C]">Medications</p>
                            <p className="text-[10px] text-[#5C5A56]">1 taken, 2 left</p>
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
                              <p className="font-heading font-bold text-base text-red-900">Emergency SOS</p>
                              <p className="text-[10px] text-red-700">Calls family & sends GPS</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-1 bg-red-600 text-white rounded-md">
                            TAP
                          </span>
                        </button>

                      </div>

                      {/* Hardware Button Reminder */}
                      <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] text-center">
                        <p className="text-[10px] text-[#6E6B65]">
                          Triple-press physical power button triggers SOS offline.
                        </p>
                      </div>

                    </div>
                  )}

                  {/* View 2: Speed-Dial Contacts */}
                  {activeTab === 'contacts' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]">
                        <h4 className="font-heading font-bold text-sm text-[#2C2C2C]">Speed Dial List</h4>
                        <button
                          onClick={() => {
                            setActiveTab('home');
                            setCallActiveContact(null);
                          }}
                          className="text-xs font-semibold text-[#8C7355] underline cursor-pointer"
                        >
                          Back to Home
                        </button>
                      </div>

                      {callActiveContact ? (
                        <div className="p-6 text-center space-y-4 bg-[#FFFFFF] rounded-2xl border-2 border-emerald-500 shadow-sm">
                          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 animate-bounce">
                            <PhoneCall className="w-7 h-7" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-[#6E6B65]">Calling Caregiver</p>
                            <h5 className="font-heading font-bold text-xl text-[#2C2C2C]">{callActiveContact}</h5>
                            <p className="text-xs text-emerald-700 mt-1">Speakerphone auto-engaged</p>
                          </div>
                          <button
                            onClick={() => setCallActiveContact(null)}
                            className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer shadow-xs"
                          >
                            End Call
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {SENEAR_SIMULATOR_DATA.speedDials.map((contact) => (
                            <button
                              key={contact.id}
                              onClick={() => setCallActiveContact(`${contact.name} (${contact.role})`)}
                              className="w-full p-3 rounded-xl bg-[#FFFFFF] border-2 border-[#C5A880]/60 hover:border-[#C5A880] text-left flex items-center justify-between cursor-pointer transition-all active:scale-95 shadow-2xs"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#F5F0EB] flex items-center justify-center font-bold text-[#A38053] text-sm">
                                  {contact.name[0]}
                                </div>
                                <div>
                                  <p className="font-heading font-bold text-sm text-[#2C2C2C]">{contact.name}</p>
                                  <p className="text-[10px] text-[#6E6B65]">{contact.role}</p>
                                </div>
                              </div>
                              <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                                <PhoneCall className="w-3.5 h-3.5" />
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* View 3: Medication Checklist */}
                  {activeTab === 'meds' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]">
                        <h4 className="font-heading font-bold text-sm text-[#2C2C2C]">Today's Medicines</h4>
                        <button
                          onClick={() => setActiveTab('home')}
                          className="text-xs font-semibold text-[#8C7355] underline cursor-pointer"
                        >
                          Back to Home
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
                        Caregivers receive automatic confirmation when pills are checked off.
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
                          <h5 className="font-heading font-bold text-base text-red-900">SOS Sent to Family!</h5>
                          <p className="text-[11px] text-red-800 leading-tight">
                            Live GPS location sent to Anna and Peter. Phone is now answering family calls automatically with max speaker volume.
                          </p>
                          <button
                            onClick={resetSos}
                            className="w-full py-2 bg-[#2C2C2C] text-white rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Reset SOS Test
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 bg-red-50 rounded-2xl border-2 border-red-400 space-y-3">
                          <h5 className="font-heading font-bold text-lg text-red-900">Dispatching Emergency Help</h5>
                          <div className="text-4xl font-bold font-mono text-red-600">
                            00:0{sosCountdown}
                          </div>
                          <p className="text-xs text-red-700">
                            Sending alerts to primary caregiver Dr. Anna Banyai.
                          </p>
                          <button
                            onClick={() => {
                              resetSos();
                              setActiveTab('home');
                            }}
                            className="w-full py-2.5 bg-gray-200 hover:bg-gray-300 text-[#2C2C2C] rounded-lg text-xs font-bold cursor-pointer"
                          >
                            False Alarm (Cancel)
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
                        Return to Main Screen
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
                    HOME
                  </button>
                  <span className="text-[10px] text-emerald-700 font-semibold">Protected</span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Architectural Explanation & Zero-Confusion Specs */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F0EB] text-[#8C7355] text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Architecture Spotlight</span>
              </div>
              <h4 className="font-heading text-2xl font-bold text-[#2C2C2C]">
                Why SENEAR & JUNEAR Eliminate User Panic
              </h4>
              <p className="text-sm text-[#5C5A56] leading-relaxed mt-2">
                Standard Android and iOS launchers are designed for digital natives with fine motor skills. When a senior or child accidentally taps airplane mode or dismisses a dialog, they lose contact with family. The **NEAR Ecosystem solves this through native system-level lockdown.
              </p>
            </div>

            {/* Architecture Highlights Checklist */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                <div className="flex items-center gap-2 font-heading font-semibold text-sm text-[#2C2C2C]">
                  <ShieldCheck className="w-4 h-4 text-[#A38053]" />
                  <span>Android Device Owner (DPC) Lockdown</span>
                </div>
                <p className="text-xs text-[#5C5A56] leading-relaxed pl-6">
                  SENEAR runs as the enterprise device owner. It physically prevents access to standard settings, disables swipe-down notification shades, and disallows accidental app uninstallations.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                <div className="flex items-center gap-2 font-heading font-semibold text-sm text-[#2C2C2C]">
                  <Wifi className="w-4 h-4 text-[#A38053]" />
                  <span>Offline-First SQLite / Room Synchronization</span>
                </div>
                <p className="text-xs text-[#5C5A56] leading-relaxed pl-6">
                  Core capabilities (phone dialing, local alarm chimes, medication schedules, SMS SOS) require zero cellular data. The system caches events and syncs to caregiver cloud when connectivity returns.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                <div className="flex items-center gap-2 font-heading font-semibold text-sm text-[#2C2C2C]">
                  <Volume2 className="w-4 h-4 text-[#A38053]" />
                  <span>Remote Caregiver Guardian Portal</span>
                </div>
                <p className="text-xs text-[#5C5A56] leading-relaxed pl-6">
                  Caregivers can remotely unmute the phone if silenced, inspect battery level, update speed dial photos, and trigger auditory reassurance rings from their own smartphone.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-[#F0EAE1]">
              <span className="text-xs text-[#6E6B65]">Developed in native Kotlin + Jetpack Compose</span>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#2C2C2C] text-[#FAFAFA] font-medium text-xs hover:bg-[#1A1A1A] cursor-pointer"
              >
                Close Simulator
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
