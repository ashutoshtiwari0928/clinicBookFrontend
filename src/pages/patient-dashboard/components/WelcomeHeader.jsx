import React from 'react';

import Button from '../../../components/ui/Button';

const WelcomeHeader = ({ patientName, onEmergencyBooking, onNotifications }) => {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="bg-gradient-to-r from-primary to-primary-700 text-white p-6 rounded-lg mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-heading font-semibold mb-2">
            {greeting}, {patientName}!
          </h1>
          <p className="text-primary-100 text-sm">
            Welcome to your healthcare dashboard. Manage your appointments and health records
            easily.
          </p>
        </div>

        <div className="flex items-center space-x-3 ml-4">
          <Button
            variant="ghost"
            onClick={onNotifications}
            className="text-white hover:bg-white/20 border-white/30"
            iconName="Bell"
            size="sm"
          >
            <span className="hidden sm:inline">Notifications</span>
          </Button>

          <Button
            variant="secondary"
            onClick={onEmergencyBooking}
            iconName="AlertCircle"
            size="sm"
            className="bg-white text-primary hover:bg-primary-50"
          >
            <span className="hidden sm:inline">Emergency</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-data font-bold">3</div>
          <div className="text-xs text-primary-100">Upcoming</div>
        </div>
        <div>
          <div className="text-2xl font-data font-bold">12</div>
          <div className="text-xs text-primary-100">Completed</div>
        </div>
        <div>
          <div className="text-2xl font-data font-bold">2</div>
          <div className="text-xs text-primary-100">Pending</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
