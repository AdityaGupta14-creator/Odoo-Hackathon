import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ToastViewport } from '@/components/ui/Toast';
import { TripsProvider } from '@/context/TripsContext';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute, PublicOnlyRoute } from '@/components/auth/ProtectedRoute';

// Pages
import { DashboardPage } from '@/pages/DashboardPage';
import { AICopilotPage } from '@/pages/AICopilotPage';
import { TripOverviewPage } from '@/pages/TripOverviewPage';
import { ItineraryPage } from '@/pages/ItineraryPage';
import { BudgetPage } from '@/pages/BudgetPage';
import { ExplorePage } from '@/pages/ExplorePage';
import { MyTripsPage } from '@/pages/MyTripsPage';
import { CalendarPage } from '@/pages/CalendarPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <TripsProvider>
          <BrowserRouter>
            <Routes>
              {/* ── Root: redirect to dashboard (ProtectedRoute will redirect to /login if needed) */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* ── Public-only Auth Routes (redirect to /dashboard if already signed in) */}
              <Route
                path="/login"
                element={
                  <PublicOnlyRoute>
                    <LoginPage />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicOnlyRoute>
                    <SignupPage />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicOnlyRoute>
                    <ForgotPasswordPage />
                  </PublicOnlyRoute>
                }
              />

              {/* ── Protected App Routes ──────────────────────────────────── */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <DashboardPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AICopilotPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trips"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <MyTripsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trips/:id"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <TripOverviewPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trips/:id/itinerary"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ItineraryPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trips/:id/budget"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <BudgetPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ExplorePage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CalendarPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/budget"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <MyTripsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* ── Catch-all ─────────────────────────────────────────────── */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <ToastViewport />
          </BrowserRouter>
        </TripsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
