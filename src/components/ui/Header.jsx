import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const patientNavItems = [
    { label: 'Find Doctors', path: '/doctor-search-browse', icon: 'Search' },
    { label: 'My Appointments', path: '/patient-dashboard', icon: 'Calendar' },
    { label: 'Book Appointment', path: '/appointment-booking-calendar', icon: 'Plus' },
  ];

  const providerNavItems = [
    { label: 'Dashboard', path: '/provider-dashboard', icon: 'LayoutDashboard' },
  ];

  const isProviderRoute = location.pathname.includes('/provider');
  const navItems = isProviderRoute ? providerNavItems : patientNavItems;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 clinical-transition hover:opacity-80">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-text-primary">ClinicBook</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium clinical-transition ${
                  isActiveRoute(item.path)
                    ? 'text-primary bg-primary-50'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isProviderRoute && (
              <>
                <Link to="/patient-login-register">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/patient-login-register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
            {isProviderRoute && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-text-secondary)" />
                </div>
                <span className="text-sm font-medium text-text-primary">Dr. Smith</span>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted clinical-transition"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium clinical-transition ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-primary-50'
                      : 'text-text-secondary hover:text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-border mt-4">
                {!isProviderRoute && (
                  <div className="space-y-2">
                    <Link to="/patient-login-register" onClick={closeMobileMenu}>
                      <Button variant="ghost" fullWidth>
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/patient-login-register" onClick={closeMobileMenu}>
                      <Button variant="primary" fullWidth>
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
                {isProviderRoute && (
                  <div className="flex items-center space-x-3 px-3 py-3">
                    <div className="w-10 h-10 bg-secondary-200 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="var(--color-text-secondary)" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-text-primary">Dr. Smith</p>
                      <p className="text-sm text-text-secondary">Provider Account</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
