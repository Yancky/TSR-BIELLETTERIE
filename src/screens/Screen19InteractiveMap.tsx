import React, { useState } from 'react';
import { appStore } from '../services/store';
import { Agency } from '../types';
import { 
  MapPin, Phone, Clock, Bus, Navigation, 
  ExternalLink, ChevronRight, CheckCircle2 
} from 'lucide-react';

export const Screen19InteractiveMap: React.FC = () => {
  const state = appStore.getState();
  const agencies = state.agencies;
  const [selectedAgency, setSelectedAgency] = useState<Agency>(agencies[0]);

  const handleBookFromAgency = (agency: Agency) => {
    appStore.setSearchParams({ departureCity: agency.city });
    appStore.navigateTo('05_SEARCH_TRIP');
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-slate-50 justify-between space-y-3">
      {/* Map Header info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Gares &amp; Agences Nationales</h2>
          <span className="text-[11px] text-slate-500">
            {agencies.length} agences répertoriées au Burkina Faso
          </span>
        </div>
        <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
          Carte Interactive BF
        </span>
      </div>

      {/* Styled Interactive SVG Map of Burkina Faso */}
      <div className="relative bg-[#0F2C59] rounded-3xl p-4 shadow-md overflow-hidden min-h-[250px] flex flex-col justify-between border border-blue-900">
        <div className="flex justify-between items-start text-white text-[10px] font-mono z-10">
          <span className="bg-white/10 px-2 py-0.5 rounded">Afrique de l'Ouest • BF</span>
          <span className="text-amber-300 font-semibold">Africa/Ouagadougou</span>
        </div>

        {/* Map schematic points */}
        <div className="relative w-full h-44 my-auto flex items-center justify-center">
          {/* Stylized background contour of Burkina Faso */}
          <svg
            viewBox="0 0 400 240"
            className="w-full h-full opacity-30 pointer-events-none"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M 60 140 Q 110 90, 160 80 Q 220 50, 290 80 Q 350 120, 340 160 Q 300 190, 240 210 Q 150 220, 90 190 Z"
              fill="#1E3A8A"
              stroke="#60A5FA"
              strokeWidth="2"
            />
            {/* Road network Ouaga-Bobo */}
            <path
              d="M 190 125 L 105 165"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />
            {/* Road Ouaga-Koudougou */}
            <path
              d="M 190 125 L 140 135"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            {/* Road Ouaga-Ouahigouya */}
            <path
              d="M 190 125 L 160 65"
              stroke="#F59E0B"
              strokeWidth="2"
            />
          </svg>

          {/* Interactive Markers overlaid on map */}
          {/* Ouagadougou Marker */}
          <button
            onClick={() => setSelectedAgency(agencies[0])}
            className={`absolute top-[48%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform ${
              selectedAgency.city === 'Ouagadougou' ? 'scale-125 z-20' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className={`p-1.5 rounded-full shadow-lg border-2 ${
              selectedAgency.city === 'Ouagadougou'
                ? 'bg-amber-400 text-slate-900 border-white ring-4 ring-amber-400/40'
                : 'bg-blue-600 text-white border-blue-300'
            }`}>
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-extrabold text-white bg-slate-900/80 px-1.5 py-0.2 rounded mt-0.5 shadow">
              Ouaga
            </span>
          </button>

          {/* Bobo-Dioulasso Marker */}
          <button
            onClick={() => setSelectedAgency(agencies[2])}
            className={`absolute top-[68%] left-[26%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform ${
              selectedAgency.city === 'Bobo-Dioulasso' ? 'scale-125 z-20' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className={`p-1.5 rounded-full shadow-lg border-2 ${
              selectedAgency.city === 'Bobo-Dioulasso'
                ? 'bg-amber-400 text-slate-900 border-white ring-4 ring-amber-400/40'
                : 'bg-blue-600 text-white border-blue-300'
            }`}>
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-extrabold text-white bg-slate-900/80 px-1.5 py-0.2 rounded mt-0.5 shadow">
              Bobo
            </span>
          </button>

          {/* Koudougou Marker */}
          <button
            onClick={() => setSelectedAgency(agencies[3])}
            className={`absolute top-[55%] left-[36%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform ${
              selectedAgency.city === 'Koudougou' ? 'scale-125 z-20' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className={`p-1 rounded-full shadow-lg border ${
              selectedAgency.city === 'Koudougou'
                ? 'bg-amber-400 text-slate-900 border-white'
                : 'bg-blue-500 text-white border-blue-200'
            }`}>
              <MapPin className="w-3 h-3" />
            </div>
            <span className="text-[9px] font-bold text-white bg-slate-900/80 px-1 rounded mt-0.5">
              Koudougou
            </span>
          </button>

          {/* Ouahigouya Marker */}
          <button
            onClick={() => setSelectedAgency(agencies[4])}
            className={`absolute top-[26%] left-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform ${
              selectedAgency.city === 'Ouahigouya' ? 'scale-125 z-20' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className={`p-1 rounded-full shadow-lg border ${
              selectedAgency.city === 'Ouahigouya'
                ? 'bg-amber-400 text-slate-900 border-white'
                : 'bg-blue-500 text-white border-blue-200'
            }`}>
              <MapPin className="w-3 h-3" />
            </div>
            <span className="text-[9px] font-bold text-white bg-slate-900/80 px-1 rounded mt-0.5">
              Ouahigouya
            </span>
          </button>

          {/* Banfora Marker */}
          <button
            onClick={() => setSelectedAgency(agencies[5])}
            className={`absolute top-[82%] left-[18%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform ${
              selectedAgency.city === 'Banfora' ? 'scale-125 z-20' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className={`p-1 rounded-full shadow-lg border ${
              selectedAgency.city === 'Banfora'
                ? 'bg-amber-400 text-slate-900 border-white'
                : 'bg-blue-500 text-white border-blue-200'
            }`}>
              <MapPin className="w-3 h-3" />
            </div>
            <span className="text-[9px] font-bold text-white bg-slate-900/80 px-1 rounded mt-0.5">
              Banfora
            </span>
          </button>
        </div>

        <div className="text-[10px] text-blue-300 text-center font-medium">
          Cliquez sur une gare pour afficher sa fiche d'informations
        </div>
      </div>

      {/* Selected Agency Card Info */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">{selectedAgency.name}</h3>
            <span className="text-[11px] font-semibold text-blue-700">
              Ville : {selectedAgency.city}
            </span>
          </div>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
            Ouverte
          </span>
        </div>

        <div className="space-y-2 text-slate-600">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{selectedAgency.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-mono font-semibold text-slate-800">{selectedAgency.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Horaires de guichet : {selectedAgency.openingHours}</span>
          </div>
        </div>

        <button
          onClick={() => handleBookFromAgency(selectedAgency)}
          className="w-full py-2.5 bg-[#0F2C59] hover:bg-blue-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors mt-2"
        >
          <Bus className="w-4 h-4 text-amber-400" />
          <span>Réserver un voyage depuis {selectedAgency.city}</span>
          <ChevronRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      {/* Agency list quick scroll */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Toutes les Agences :
        </span>
        <div className="flex gap-2 overflow-x-auto py-1">
          {agencies.map(ag => (
            <button
              key={ag.id}
              onClick={() => setSelectedAgency(ag)}
              className={`p-2 rounded-xl text-left border shrink-0 transition-all text-xs ${
                selectedAgency.id === ag.id
                  ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
              }`}
            >
              <div className="font-bold">{ag.city}</div>
              <div className="text-[10px] text-slate-400 truncate max-w-[100px]">{ag.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
