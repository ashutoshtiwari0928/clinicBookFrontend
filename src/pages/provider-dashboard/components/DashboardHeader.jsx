import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardHeader = ({ providerName, todayStats, onEmergencySlot, onScheduleAdjustment }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-surface border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Provider Info & Time */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-semibold text-text-primary">
              Welcome back, {providerName}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>{formatDate(currentTime)}</span>
              <span className="font-data">{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-data font-bold text-primary">{todayStats.total}</div>
            <div className="text-xs text-primary-700">Total Appointments</div>
          </div>
          <div className="bg-success-50 border border-success-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-data font-bold text-success">{todayStats.confirmed}</div>
            <div className="text-xs text-success-700">Confirmed</div>
          </div>
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-data font-bold text-warning">{todayStats.pending}</div>
            <div className="text-xs text-warning-700">Pending</div>
          </div>
          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-data font-bold text-secondary">
              {todayStats.available}
            </div>
            <div className="text-xs text-secondary-700">Available Slots</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="danger" size="sm" iconName="AlertCircle" onClick={onEmergencySlot}>
            Emergency Slot
          </Button>
          <Button variant="outline" size="sm" iconName="Settings" onClick={onScheduleAdjustment}>
            Adjust Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
