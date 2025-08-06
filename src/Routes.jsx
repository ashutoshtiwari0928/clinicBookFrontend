import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
import ErrorBoundary from 'components/ErrorBoundary';
// Add your imports here
import PatientLoginRegister from 'pages/patient-login-register';
import DoctorProfileBooking from 'pages/doctor-profile-booking';
import DoctorSearchBrowse from 'pages/doctor-search-browse';
import PatientDashboard from 'pages/patient-dashboard';
import AppointmentBookingCalendar from 'pages/appointment-booking-calendar';
import ProviderDashboard from 'pages/provider-dashboard';
import NotFound from 'pages/NotFound';

const Routes = () => {
  const tab = 'login';
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<PatientLoginRegister />} />
          <Route path="/patient-login-register" element={<PatientLoginRegister />} />
          <Route path="/doctor-profile-booking" element={<DoctorProfileBooking />} />
          <Route path="/doctor-search-browse" element={<DoctorSearchBrowse />} />
          <Route path="/patient-dashboard/:email" element={<PatientDashboard />} />
          <Route path="/appointment-booking-calendar" element={<AppointmentBookingCalendar />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
