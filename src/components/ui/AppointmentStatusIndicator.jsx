import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const AppointmentStatusIndicator = ({ className = '' }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'pending', message: 'Appointment confirmation needed', count: 2 },
    { id: 2, type: 'upcoming', message: 'Next appointment in 30 minutes', count: 1 },
    { id: 3, type: 'urgent', message: 'Emergency booking request', count: 1 },
  ]);

  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusConfig = (type) => {
    const configs = {
      pending: {
        icon: 'Clock',
        color: 'text-warning',
        bgColor: 'bg-warning-50',
        borderColor: 'border-warning-200',
      },
      upcoming: {
        icon: 'Calendar',
        color: 'text-primary',
        bgColor: 'bg-primary-50',
        borderColor: 'border-primary-200',
      },
      urgent: {
        icon: 'AlertCircle',
        color: 'text-error',
        bgColor: 'bg-error-50',
        borderColor: 'border-error-200',
      },
      confirmed: {
        icon: 'CheckCircle',
        color: 'text-success',
        bgColor: 'bg-success-50',
        borderColor: 'border-success-200',
      },
    };
    return configs[type] || configs.pending;
  };

  const totalNotifications = notifications.reduce(
    (sum, notification) => sum + notification.count,
    0
  );

  const handleNotificationClick = (notificationId) => {
    // Handle navigation to specific appointment or action
    console.log('Navigate to notification:', notificationId);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Status Indicator Button */}
      <button
        onClick={toggleExpanded}
        className="relative flex items-center space-x-2 px-3 py-2 rounded-md clinical-transition hover:bg-muted"
        aria-label="View appointment notifications"
      >
        <Icon name="Bell" size={20} className="text-text-secondary" />
        {totalNotifications > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-medium rounded-full flex items-center justify-center">
            {totalNotifications > 9 ? '9+' : totalNotifications}
          </span>
        )}
        <span className="hidden sm:inline text-sm font-medium text-text-secondary">
          Notifications
        </span>
      </button>

      {/* Expanded Notifications Panel */}
      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg clinical-shadow z-200 animate-fade-in">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Appointment Notifications</h3>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="p-2 space-y-1">
                {notifications.map((notification) => {
                  const config = getStatusConfig(notification.type);
                  return (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-md clinical-transition hover:bg-muted ${config.bgColor} ${config.borderColor} border`}
                    >
                      <Icon name={config.icon} size={16} className={config.color} />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-text-primary">
                          {notification.message}
                        </p>
                        <p className="text-xs text-text-secondary mt-1">
                          {notification.count} {notification.count === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                      <Icon name="ChevronRight" size={14} className="text-text-muted" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center">
                <Icon name="CheckCircle" size={32} className="text-success mx-auto mb-2" />
                <p className="text-sm text-text-secondary">All caught up!</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border">
            <button className="w-full text-sm text-primary hover:text-primary-700 clinical-transition font-medium">
              View All Appointments
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default AppointmentStatusIndicator;
