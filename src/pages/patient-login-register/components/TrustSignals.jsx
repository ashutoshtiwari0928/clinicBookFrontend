import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: 'HIPAA Compliant',
      description: 'Your health data is protected',
    },
    {
      icon: 'Lock',
      title: 'SSL Encrypted',
      description: 'Secure data transmission',
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Providers',
      description: 'Licensed healthcare professionals',
    },
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustBadges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="flex-shrink-0">
              <Icon name={badge.icon} size={20} className="text-success" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">{badge.title}</h4>
              <p className="text-xs text-text-secondary">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-text-secondary">
          By continuing, you agree to our commitment to patient privacy and data security.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;
