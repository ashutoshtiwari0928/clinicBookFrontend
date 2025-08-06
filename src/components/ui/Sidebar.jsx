import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const providerNavItems = [
    {
      label: 'Dashboard',
      path: '/provider-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview & Analytics',
    },
    {
      label: 'Appointments',
      path: '/provider-appointments',
      icon: 'Calendar',
      description: 'Schedule Management',
    },
    {
      label: 'Patients',
      path: '/provider-patients',
      icon: 'Users',
      description: 'Patient Records',
    },
    {
      label: 'Schedule',
      path: '/provider-schedule',
      icon: 'Clock',
      description: 'Availability Settings',
    },
    {
      label: 'Reports',
      path: '/provider-reports',
      icon: 'BarChart3',
      description: 'Analytics & Insights',
    },
    {
      label: 'Settings',
      path: '/provider-settings',
      icon: 'Settings',
      description: 'Account & Preferences',
    },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`bg-surface border-r border-border lg:fixed lg:inset-y-0 lg:left-0 lg:z-100 clinical-transition ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <Link
              to="/provider-dashboard"
              className="flex items-center space-x-2 clinical-transition hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} color="white" />
              </div>
              <span className="text-lg font-heading font-semibold text-text-primary">
                ClinicBook
              </span>
            </Link>
          )}

          <button
            onClick={toggleCollapse}
            className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted clinical-transition"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {providerNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md clinical-transition ${
                isActiveRoute(item.path)
                  ? 'text-primary bg-primary-50 border-r-2 border-primary'
                  : 'text-text-secondary hover:text-primary hover:bg-muted'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon
                name={item.icon}
                size={20}
                className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-text-muted mt-0.5">{item.description}</div>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="space-y-2">
              <Button variant="primary" fullWidth size="sm" iconName="Plus">
                New Appointment
              </Button>
              <Button variant="outline" fullWidth size="sm" iconName="MessageSquare">
                Messages
              </Button>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-10 h-10 bg-secondary-200 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={20} color="var(--color-text-secondary)" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">Dr. Sarah Smith</p>
                <p className="text-xs text-text-secondary truncate">Cardiologist</p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="mt-3 space-y-1">
              <Button variant="ghost" fullWidth size="sm" iconName="User">
                Profile
              </Button>
              <Button variant="ghost" fullWidth size="sm" iconName="LogOut">
                Sign Out
              </Button>
            </div>
          )}
        </div>

        {/* Today's Schedule Preview */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border bg-muted/30">
            <h4 className="text-sm font-medium text-text-primary mb-3">Today's Schedule</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Next Appointment</span>
                <span className="font-data text-primary">2:30 PM</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Total Today</span>
                <span className="font-data text-text-primary">12 patients</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Available Slots</span>
                <span className="font-data text-success">3 slots</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
