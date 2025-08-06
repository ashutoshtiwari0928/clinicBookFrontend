import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsSection = ({ onBookAppointment, onRefillPrescription, onMessageProvider }) => {
  const quickActions = [
    {
      id: 'book',
      title: 'Book Appointment',
      description: 'Schedule a new appointment with your healthcare provider',
      icon: 'Calendar',
      color: 'primary',
      onClick: onBookAppointment,
    },
    {
      id: 'refill',
      title: 'Refill Prescription',
      description: 'Request prescription refills from your doctor',
      icon: 'Pill',
      color: 'success',
      onClick: onRefillPrescription,
    },
    {
      id: 'message',
      title: 'Message Provider',
      description: 'Send a secure message to your healthcare team',
      icon: 'MessageSquare',
      color: 'warning',
      onClick: onMessageProvider,
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 border-primary-200 hover:bg-primary-100',
      success: 'bg-success-50 border-success-200 hover:bg-success-100',
      warning: 'bg-warning-50 border-warning-200 hover:bg-warning-100',
      error: 'bg-error-50 border-error-200 hover:bg-error-100',
    };
    return colorMap[color] || colorMap.primary;
  };

  const getIconColor = (color) => {
    const colorMap = {
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow mb-6">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Quick Actions</h2>
        <p className="text-sm text-text-secondary mt-1">
          Access frequently used features with one tap
        </p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`p-4 border rounded-lg clinical-transition text-left ${getColorClasses(action.color)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-white ${getIconColor(action.color)}`}>
                  <Icon name={action.icon} size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-text-primary mb-1">{action.title}</h3>
                  <p className="text-sm text-text-secondary">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Additional Quick Links */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button variant="ghost" size="sm" iconName="FileText" className="justify-start">
              Lab Results
            </Button>
            <Button variant="ghost" size="sm" iconName="CreditCard" className="justify-start">
              Billing
            </Button>
            <Button variant="ghost" size="sm" iconName="Shield" className="justify-start">
              Insurance
            </Button>
            <Button variant="ghost" size="sm" iconName="Settings" className="justify-start">
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsSection;
