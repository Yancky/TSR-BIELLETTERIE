/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { appStore, AppState } from './services/store';
import { ScreenNavDrawer, SCREENS_LIST } from './components/ScreenNavDrawer';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';

// 23 Screen Components
import { Screen01Splash } from './screens/Screen01Splash';
import { Screen02PublicHome } from './screens/Screen02PublicHome';
import { Screen03Login } from './screens/Screen03Login';
import { Screen04Register } from './screens/Screen04Register';
import { Screen05SearchTrip } from './screens/Screen05SearchTrip';
import { Screen06SearchResults } from './screens/Screen06SearchResults';
import { Screen07TripDetails } from './screens/Screen07TripDetails';
import { Screen08SeatSelection } from './screens/Screen08SeatSelection';
import { Screen09PaymentMobileMoney } from './screens/Screen09PaymentMobileMoney';
import { Screen10PaymentConfirmation } from './screens/Screen10PaymentConfirmation';
import { Screen11ElectronicTicket } from './screens/Screen11ElectronicTicket';
import { Screen12TravelHistory } from './screens/Screen12TravelHistory';
import { Screen13TravelerProfile } from './screens/Screen13TravelerProfile';
import { Screen14CompanyDashboard } from './screens/Screen14CompanyDashboard';
import { Screen15ManageTrips } from './screens/Screen15ManageTrips';
import { Screen16QRScanner } from './screens/Screen16QRScanner';
import { Screen17AdminDashboard } from './screens/Screen17AdminDashboard';
import { Screen18RegisterCompany } from './screens/Screen18RegisterCompany';
import { Screen19InteractiveMap } from './screens/Screen19InteractiveMap';
import { Screen20NotificationCenter } from './screens/Screen20NotificationCenter';
import { Screen21Settings } from './screens/Screen21Settings';
import { Screen22OfflineMode } from './screens/Screen22OfflineMode';
import { Screen23PromoEnd } from './screens/Screen23PromoEnd';

export default function App() {
  const [storeState, setStoreState] = useState<AppState>(appStore.getState());

  useEffect(() => {
    const unsubscribe = appStore.subscribe(() => {
      setStoreState({ ...appStore.getState() });
    });
    return () => unsubscribe();
  }, []);

  const { currentScreen, isMobileFrame, isOffline, currentUser } = storeState;
  const currentMeta = SCREENS_LIST.find(s => s.id === currentScreen) || SCREENS_LIST[0];

  // Render individual screen inside frame
  const renderScreen = () => {
    switch (currentScreen) {
      case '01_SPLASH':
        return <Screen01Splash />;
      case '02_PUBLIC_HOME':
        return <Screen02PublicHome />;
      case '03_LOGIN':
        return <Screen03Login />;
      case '04_REGISTER':
        return <Screen04Register />;
      case '05_SEARCH_TRIP':
        return <Screen05SearchTrip />;
      case '06_SEARCH_RESULTS':
        return <Screen06SearchResults />;
      case '07_TRIP_DETAILS':
        return <Screen07TripDetails />;
      case '08_SEAT_SELECTION':
        return <Screen08SeatSelection />;
      case '09_PAYMENT':
        return <Screen09PaymentMobileMoney />;
      case '10_PAYMENT_CONFIRMATION':
        return <Screen10PaymentConfirmation />;
      case '11_ELECTRONIC_TICKET':
        return <Screen11ElectronicTicket />;
      case '12_TRAVEL_HISTORY':
        return <Screen12TravelHistory />;
      case '13_TRAVELER_PROFILE':
        return <Screen13TravelerProfile />;
      case '14_COMPANY_DASHBOARD':
        return <Screen14CompanyDashboard />;
      case '15_MANAGE_TRIPS':
        return <Screen15ManageTrips />;
      case '16_QR_SCANNER':
        return <Screen16QRScanner />;
      case '17_ADMIN_DASHBOARD':
        return <Screen17AdminDashboard />;
      case '18_REGISTER_COMPANY':
        return <Screen18RegisterCompany />;
      case '19_INTERACTIVE_MAP':
        return <Screen19InteractiveMap />;
      case '20_NOTIFICATIONS':
        return <Screen20NotificationCenter />;
      case '21_SETTINGS':
        return <Screen21Settings />;
      case '22_OFFLINE_MODE':
        return <Screen22OfflineMode />;
      case '23_PROMO_END':
        return <Screen23PromoEnd />;
      default:
        return <Screen02PublicHome />;
    }
  };

  // Determine if back button and title should appear on screen header
  const isSplash = currentScreen === '01_SPLASH';
  const isPublicHome = currentScreen === '02_PUBLIC_HOME';

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 23 Screens Top Navigator & Quick Role Switcher */}
      <ScreenNavDrawer
        currentScreen={currentScreen}
        isMobileFrame={isMobileFrame}
        isOffline={isOffline}
        currentUserRole={currentUser?.role}
      />

      {/* Main Screen Content with Device Mockup Framing */}
      <MobileFrameWrapper
        isMobileFrame={isMobileFrame}
        screenTitle={!isSplash && !isPublicHome ? `Écran ${currentMeta.num} : ${currentMeta.label}` : undefined}
        showBack={!isSplash && !isPublicHome}
        showBell={!isSplash}
      >
        {renderScreen()}
      </MobileFrameWrapper>
    </div>
  );
}
