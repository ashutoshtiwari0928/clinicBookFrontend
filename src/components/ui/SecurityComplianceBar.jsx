import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const SecurityComplianceBar = ({ className = '' }) => {
  const [securityStatus, setSecurityStatus] = useState({
    ssl: true,
    hipaa: true,
    sessionActive: true,
    lastActivity: new Date(),
    sessionTimeout: 30, // minutes
  });

  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          // Handle session timeout
          handleSessionTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSessionTimeout = () => {
    console.log('Session timeout - redirect to login');
    // Handle session timeout logic
  };

  const extendSession = () => {
    setTimeRemaining(30 * 60); // Reset to 30 minutes
    console.log('Session extended');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSessionWarningLevel = () => {
    if (timeRemaining <= 300) return 'critical'; // 5 minutes
    if (timeRemaining <= 600) return 'warning'; // 10 minutes
    return 'normal';
  };

  const warningLevel = getSessionWarningLevel();

  return (
    <div className={`bg-surface border-t border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Security Indicators */}
          <div className="flex items-center space-x-4">
            {/* SSL Status */}
            <div className="flex items-center space-x-1">
              <Icon
                name={securityStatus.ssl ? 'Shield' : 'ShieldAlert'}
                size={14}
                className={securityStatus.ssl ? 'text-success' : 'text-error'}
              />
              <span className="text-xs text-text-secondary hidden sm:inline">
                {securityStatus.ssl ? 'Secure Connection' : 'Connection Error'}
              </span>
            </div>

            {/* HIPAA Compliance */}
            <div className="flex items-center space-x-1">
              <Icon
                name={securityStatus.hipaa ? 'CheckCircle' : 'AlertCircle'}
                size={14}
                className={securityStatus.hipaa ? 'text-success' : 'text-error'}
              />
              <span className="text-xs text-text-secondary hidden sm:inline">HIPAA Compliant</span>
            </div>

            {/* Data Encryption */}
            <div className="flex items-center space-x-1">
              <Icon name="Lock" size={14} className="text-success" />
              <span className="text-xs text-text-secondary hidden md:inline">
                End-to-End Encrypted
              </span>
            </div>
          </div>

          {/* Session Status */}
          <div className="flex items-center space-x-4">
            {/* Session Timer */}
            <div
              className={`flex items-center space-x-2 px-2 py-1 rounded-md ${
                warningLevel === 'critical'
                  ? 'bg-error-50 text-error'
                  : warningLevel === 'warning'
                    ? 'bg-warning-50 text-warning'
                    : 'text-text-secondary'
              }`}
            >
              <Icon
                name="Clock"
                size={14}
                className={
                  warningLevel === 'critical'
                    ? 'text-error'
                    : warningLevel === 'warning'
                      ? 'text-warning'
                      : 'text-text-secondary'
                }
              />
              <span className="text-xs font-data">Session: {formatTime(timeRemaining)}</span>
              {warningLevel !== 'normal' && (
                <button
                  onClick={extendSession}
                  className="text-xs underline hover:no-underline clinical-transition"
                >
                  Extend
                </button>
              )}
            </div>

            {/* Privacy Policy Link */}
            <button className="text-xs text-text-secondary hover:text-primary clinical-transition">
              Privacy Policy
            </button>

            {/* Audit Trail Indicator */}
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={14} className="text-text-muted" />
              <span className="text-xs text-text-secondary hidden lg:inline">Activity Logged</span>
            </div>
          </div>
        </div>

        {/* Session Warning Banner */}
        {warningLevel === 'critical' && (
          <div className="bg-error-50 border border-error-200 rounded-md p-3 mb-2 animate-pulse-subtle">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <span className="text-sm font-medium text-error">
                  Session expires in {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={extendSession}
                  className="px-3 py-1 bg-error text-white text-xs rounded-md hover:bg-error-600 clinical-transition"
                >
                  Extend Session
                </button>
                <button className="px-3 py-1 border border-error text-error text-xs rounded-md hover:bg-error-50 clinical-transition">
                  Save & Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityComplianceBar;
