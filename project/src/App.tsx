import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ToastViewport } from '@/components/ui/Toast';
import { TripsProvider } from '@/context/TripsContext';
import { ToastProvider } from '@/context/ToastContext';
import { DashboardPage } from '@/pages/DashboardPage';
import { AICopilotPage } from '@/pages/AICopilotPage';
import { TripOverviewPage } from '@/pages/TripOverviewPage';
import { ItineraryPage } from '@/pages/ItineraryPage';
import { BudgetPage } from '@/pages/BudgetPage';
import { ExplorePage } from '@/pages/ExplorePage';
import { MyTripsPage } from '@/pages/MyTripsPage';
import { CalendarPage } from '@/pages/CalendarPage';

function App() {
  return (
    <ToastProvider>
      <TripsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <DashboardPage />
                </Layout>
              }
            />
            <Route
              path="/ai"
              element={
                <Layout>
                  <AICopilotPage />
                </Layout>
              }
            />
            <Route
              path="/trips"
              element={
                <Layout>
                  <MyTripsPage />
                </Layout>
              }
            />
            <Route
              path="/trips/:id"
              element={
                <Layout>
                  <TripOverviewPage />
                </Layout>
              }
            />
            <Route
              path="/trips/:id/itinerary"
              element={
                <Layout>
                  <ItineraryPage />
                </Layout>
              }
            />
            <Route
              path="/trips/:id/budget"
              element={
                <Layout>
                  <BudgetPage />
                </Layout>
              }
            />
            <Route
              path="/explore"
              element={
                <Layout>
                  <ExplorePage />
                </Layout>
              }
            />
            <Route
              path="/calendar"
              element={
                <Layout>
                  <CalendarPage />
                </Layout>
              }
            />
            <Route
              path="/budget"
              element={
                <Layout>
                  <MyTripsPage />
                </Layout>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <ToastViewport />
        </BrowserRouter>
      </TripsProvider>
    </ToastProvider>
  );
}

export default App;
