import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HealthcareImagery = () => {
  const features = [
    {
      icon: 'Calendar',
      title: 'Easy Scheduling',
      description: 'Book appointments with your preferred doctors in just a few clicks',
    },
    {
      icon: 'Clock',
      title: 'Real-time Availability',
      description: 'See live appointment slots and get instant confirmations',
    },
    {
      icon: 'Users',
      title: 'Trusted Network',
      description: 'Access to verified healthcare providers in your area',
    },
    {
      icon: 'Bell',
      title: 'Smart Reminders',
      description: 'Never miss an appointment with automated notifications',
    },
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-8 lg:py-12">
      <div className="max-w-md mx-auto">
        {/* Hero Image */}
        <div className="mb-8 overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Healthcare professional using digital tablet"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-3">
            Welcome to ClinicBook
          </h2>
          <p className="text-text-secondary">
            Your trusted platform for seamless healthcare appointment booking and management.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon name={feature.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">{feature.title}</h3>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {/* <div>
            <div className="text-2xl font-data font-bold text-primary">
              50K+
            </div>
            <div className="text-xs text-text-secondary">Happy Patients</div>
          </div>
          <div>
            <div className="text-2xl font-data font-bold text-primary">
              1,200+
            </div>
            <div className="text-xs text-text-secondary">Doctors</div>
          </div>
          <div>
            <div className="text-2xl font-data font-bold text-primary">98%</div>
            <div className="text-xs text-text-secondary">Satisfaction</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HealthcareImagery;
