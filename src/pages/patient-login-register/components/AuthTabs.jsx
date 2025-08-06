import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In', icon: 'LogIn' },
    { id: 'register', label: 'Create Account', icon: 'UserPlus' },
    { id: 'doctor-login', label: 'Doctor Login', icon: 'Stethoscope' },
  ];

  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      {tabs.map((tab) => {
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium clinical-transition ${
              activeTab === tab.id
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AuthTabs;
