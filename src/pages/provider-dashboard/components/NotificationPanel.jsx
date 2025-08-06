import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onNotificationAction, onMarkAllRead }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const notificationTypes = {
    booking: { icon: 'Calendar', color: 'text-primary', bgColor: 'bg-primary-50' },
    cancellation: { icon: 'XCircle', color: 'text-error', bgColor: 'bg-error-50' },
    message: { icon: 'MessageSquare', color: 'text-accent', bgColor: 'bg-accent-50' },
    reminder: { icon: 'Bell', color: 'text-warning', bgColor: 'bg-warning-50' },
    emergency: { icon: 'AlertTriangle', color: 'text-error', bgColor: 'bg-error-50' },
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      onNotificationAction('mark-read', notification.id);
    }
    onNotificationAction('view', notification.id);
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted clinical-transition"
        aria-label="View notifications"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-surface border border-border rounded-lg clinical-shadow-lg z-200 animate-fade-in">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-text-primary">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted clinical-transition"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-2">
              {['all', 'unread', 'booking', 'message'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-3 py-1 text-xs font-medium rounded-full clinical-transition ${
                    filter === filterType
                      ? 'bg-primary text-white'
                      : 'bg-muted text-text-secondary hover:bg-primary-50 hover:text-primary'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredNotifications.map((notification) => {
                  const config = notificationTypes[notification.type] || notificationTypes.reminder;
                  return (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full p-4 text-left hover:bg-muted/50 clinical-transition ${
                        !notification.read ? 'bg-primary-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${config.bgColor}`}>
                          <Icon name={config.icon} size={16} className={config.color} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p
                              className={`text-sm font-medium ${
                                !notification.read ? 'text-text-primary' : 'text-text-secondary'
                              }`}
                            >
                              {notification.title}
                            </p>
                            <span className="text-xs text-text-muted">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-secondary">No notifications</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="p-3 border-t border-border">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMarkAllRead}
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </Button>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-100" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
    </div>
  );
};

export default NotificationPanel;
