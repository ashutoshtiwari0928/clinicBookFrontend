import React, { act, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';
import HealthcareImagery from './components/HealthcareImagery';
import BiometricLogin from './components/BiometricLogin';
import DoctorLoginForm from './components/DoctorLoginForm';

const PatientLoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 clinical-transition hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                ClinicBook
              </span>
            </Link>

            {/* Help Contact */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Phone" size={16} />
                <span>Need help? Call (555) 123-4567</span>
              </div>
              <button className="sm:hidden p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted clinical-transition">
                <Icon name="Phone" size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="lg:grid lg:grid-cols-2 lg:min-h-[calc(100vh-4rem)]">
          {/* Left Column - Healthcare Imagery (Desktop Only) */}
          <div className="bg-primary-50">
            <HealthcareImagery />
          </div>

          {/* Right Column - Authentication Form */}
          <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md">
              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  {activeTab === 'login' ? 'Welcome Back' : 'Create Your Account'}
                </h1>
                <p className="text-text-secondary">
                  {activeTab === 'login'
                    ? 'Sign in to manage your appointments'
                    : 'Join thousands of patients who trust ClinicBook'}
                </p>
              </div>
              {/* Desktop Header */}
              <div className="hidden lg:block text-center mb-8">
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                </h1>
                <p className="text-text-secondary">
                  {activeTab === 'login'
                    ? 'Access your healthcare dashboard'
                    : 'Start your healthcare journey with us'}
                </p>
              </div>
              {/* Auth Tabs */}
              <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
              {/* Auth Forms */}
              <div className="bg-surface rounded-lg border border-border p-6 clinical-shadow">
                {activeTab === 'login' ? (
                  <LoginForm
                    successMessageShown={registrationSuccess}
                    onMessageShown={() => setRegistrationSuccess(false)}
                  />
                ) : activeTab === 'register' ? (
                  <RegisterForm onSuccessfulRegister={() => handleRegistrationSuccess()} />
                ) : activeTab === 'doctor-login' ? (
                  <DoctorLoginForm />
                ) : null}

                {/* Social Login */}
                <div className="mt-6">
                  <SocialLogin />
                </div>

                {/* Biometric Login (Login tab only) */}
                {activeTab === 'login' && <BiometricLogin />}
              </div>
              {/* Navigation Links */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <Link
                    to="/doctor-search-browse"
                    className="text-primary hover:text-primary-700 clinical-transition"
                  >
                    Browse Doctors
                  </Link>
                  <span className="text-text-muted">•</span>
                  <Link
                    to="/appointment-booking-calendar"
                    className="text-primary hover:text-primary-700 clinical-transition"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
              {/* Trust Signals */}
              <TrustSignals />
              {/* Footer Links */}
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
                  <button className="hover:text-primary clinical-transition">Privacy Policy</button>
                  <span>•</span>
                  <button className="hover:text-primary clinical-transition">
                    Terms of Service
                  </button>
                  <span>•</span>
                  <button className="hover:text-primary clinical-transition">Support</button>
                </div>
                <p className="mt-2 text-xs text-text-secondary">
                  © {new Date().getFullYear()} ClinicBook. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientLoginRegister;
