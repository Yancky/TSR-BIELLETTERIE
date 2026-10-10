import React, { useState } from 'react';
import { appStore } from '../services/store';
import { CompanyService, PublicCompanyView } from '../services/companyService';
import { BURKINA_CITIES } from '../services/mockData';
import { CompanyRegistrationModal } from '../components/CompanyRegistrationModal';
import { 
  Search, Building2, UserPlus, LogIn, MapPin, 
  ShieldCheck, Clock, Bus, CheckCircle2, FileText, 
  ChevronRight, ArrowUpDown, Phone, MessageSquare, AlertCircle 
} from 'lucide-react';

export const Screen02PublicHome: React.FC = () => {
  const [showRegModal, setShowRegModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'HOME' | 'COMPANIES' | 'CONTACT'>('HOME');

  // Search parameters in hero
  const [depCity, setDepCity] = useState('Ouagadougou');
  const [destCity, setDestCity] = useState('Bobo-Dioulasso');
  const [travelDate, setTravelDate] = useState('2026-10-11');
  const [passengers, setPassengers] = useState(1);
  const [searchError, setSearchError] = useState('');

  // Only ACTIVE companies are retrieved publicly
  const activeCompanies: PublicCompanyView[] = CompanyService.getPublicActiveCompanies();

  const handleSwapCities = () => {
    const temp = depCity;
    setDepCity(destCity);
    setDestCity(temp);
    setSearchError('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depCity.toLowerCase() === destCity.toLowerCase()) {
      setSearchError('La ville de départ et la destination doivent être différentes.');
      return;
    }

    appStore.setSearchParams({
      departureCity: depCity,
      destinationCity: destCity,
      date: travelDate,
      passengers
    });

    appStore.navigateTo('06_SEARCH_RESULTS');
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. En-tête Public Professionnel */}
      <header className="bg-[#0F2C59] text-white px-4 sm:px-6 py-3.5 border-b border-blue-950 sticky top-0 z-20 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('HOME')}>
            <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm">
              <img
                src="/src/assets/images/tsr_transit_badge_1791641501297.jpg"
                alt="Logo TSR TRANSIT"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold tracking-wider text-base sm:text-lg block leading-none">
                TSR <span className="text-amber-400">TRANSIT</span>
              </span>
              <span className="text-[10px] text-blue-200">Burkina Faso</span>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-blue-100">
            <button
              onClick={() => setActiveTab('HOME')}
              className={`hover:text-white transition-colors ${activeTab === 'HOME' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-0.5' : ''}`}
            >
              Accueil
            </button>
            <button
              onClick={() => appStore.navigateTo('05_SEARCH_TRIP')}
              className="hover:text-white transition-colors"
            >
              Rechercher un trajet
            </button>
            <button
              onClick={() => setActiveTab('COMPANIES')}
              className={`hover:text-white transition-colors ${activeTab === 'COMPANIES' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-0.5' : ''}`}
            >
              Nos compagnies agréées
            </button>
            <button
              onClick={() => setActiveTab('CONTACT')}
              className={`hover:text-white transition-colors ${activeTab === 'CONTACT' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-0.5' : ''}`}
            >
              Aide &amp; Contact
            </button>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => appStore.navigateTo('03_LOGIN')}
              className="px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Connexion</span>
            </button>
            <button
              onClick={() => appStore.navigateTo('04_REGISTER')}
              className="px-3 py-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">S'inscrire</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section Principale */}
      <div className="relative bg-gradient-to-b from-[#0F2C59] via-[#12366b] to-[#1E3A8A] text-white p-5 sm:p-8 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-5 relative z-10">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Plateforme Nationale Officielle de Billetterie</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Voyagez simplement à travers le Burkina Faso.
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Recherchez vos trajets interurbains, réservez vos sièges en car grand confort et recevez votre billet électronique sécurisé par QR Code avec règlement Mobile Money (Orange Money, Moov Money, Wave).
            </p>
          </div>

          {/* Formulaire de recherche de trajet Hero */}
          <div className="bg-white text-slate-900 p-4 sm:p-5 rounded-3xl shadow-xl border border-slate-100">
            {searchError && (
              <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                {/* Ville de départ */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-700" />
                    <span>Départ</span>
                  </label>
                  <select
                    value={depCity}
                    onChange={e => setDepCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {BURKINA_CITIES.map(c => (
                      <option key={`dep-${c}`} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>Destination</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleSwapCities}
                      className="text-[10px] text-blue-700 font-bold hover:underline flex items-center gap-0.5"
                      title="Inverser les villes"
                    >
                      <ArrowUpDown className="w-3 h-3" />
                      <span>Inverser</span>
                    </button>
                  </div>
                  <select
                    value={destCity}
                    onChange={e => setDestCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {BURKINA_CITIES.map(c => (
                      <option key={`dest-${c}`} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Date de voyage
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={e => setTravelDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                {/* Voyageurs */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Voyageurs
                  </label>
                  <select
                    value={passengers}
                    onChange={e => setPassengers(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value={1}>1 voyageur</option>
                    <option value={2}>2 voyageurs</option>
                    <option value={3}>3 voyageurs</option>
                    <option value={4}>4 voyageurs</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-1 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Départs vérifiés quotidiennement sur les axes nationaux.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto py-3 px-6 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <Search className="w-4 h-4 text-slate-900" />
                  <span>Rechercher un trajet</span>
                </button>
              </div>
            </form>
          </div>

          {/* Bouton d'enregistrement visible exigé par le cahier des charges */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setShowRegModal(true)}
              className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs border border-white/30 backdrop-blur-md flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>ENREGISTRER UNE SOCIÉTÉ DE TRANSPORT</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Section Compagnies Agréées (Seules les compagnies ACTIVE) */}
      <section className="p-5 sm:p-8 max-w-6xl mx-auto space-y-5 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Compagnies Partenaires Officielles ({activeCompanies.length})
            </h2>
            <p className="text-xs text-slate-500">
              Seules les compagnies titulaires d'une autorisation officielle et au statut ACTIVE sont référencées.
            </p>
          </div>

          <button
            onClick={() => setShowRegModal(true)}
            className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Rejoindre le réseau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeCompanies.map(comp => (
            <div
              key={comp.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 p-1.5 flex items-center justify-center border border-blue-100">
                    <img
                      src={comp.logoUrl || '/src/assets/images/tsr_transit_badge_1791641501297.jpg'}
                      alt={comp.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-slate-900">{comp.tradeName}</h3>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      Agrément Vérifié • ⭐ {comp.rating}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {comp.description || `Dessertes régulières et navettes express au départ de ${comp.headquarters}.`}
                </p>

                <div className="space-y-1 text-[11px] text-slate-500 border-t pt-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{comp.headquarters}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-mono text-slate-700">{comp.phone}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  appStore.setSearchParams({ departureCity: comp.city || 'Ouagadougou' });
                  appStore.navigateTo('06_SEARCH_RESULTS');
                }}
                className="w-full py-2 bg-slate-50 hover:bg-blue-50 text-blue-900 font-bold rounded-xl text-xs border border-slate-200 transition-colors flex items-center justify-center gap-1 mt-2"
              >
                <span>Voir les départs {comp.tradeName}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Footer & Mentions Légales */}
      <footer className="mt-auto bg-slate-900 text-slate-300 p-6 border-t border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-white text-sm">TSR TRANSIT</span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Plateforme officielle de réservation de transport interurbain au Burkina Faso.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setShowTermsModal(true)}
              className="hover:text-white underline text-[11px]"
            >
              Conditions d'Utilisation (CGU)
            </button>
            <button
              onClick={() => setShowRegModal(true)}
              className="hover:text-white underline text-[11px] text-amber-300"
            >
              Agrément Transporteur
            </button>
          </div>
        </div>
      </footer>

      {/* Modal officiel d'enregistrement de compagnie */}
      <CompanyRegistrationModal
        isOpen={showRegModal}
        onClose={() => setShowRegModal(false)}
      />

      {/* Modal CGU */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3 shadow-xl text-slate-900">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Conditions d'Agrément &amp; Billetterie</span>
              </h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                &times;
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2 max-h-60 overflow-y-auto pr-1">
              <p>
                <strong>1. Agrément des compagnies :</strong> Toute société candidate est enregistrée au statut initial PENDING. L'administration centrale vérifie le RCCM, l'IFU et la licence de transport avant toute publication de départs.
              </p>
              <p>
                <strong>2. Transactions financières :</strong> Les recettes sont exclusivement traitées via des comptes marchands validés (Orange Money, Moov Money, Wave).
              </p>
            </div>
            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
