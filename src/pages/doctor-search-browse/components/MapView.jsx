import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ doctors, onDoctorSelect, selectedDoctor }) => {
  const [mapCenter] = useState({ lat: 40.7128, lng: -74.006 }); // New York City
  const [zoom] = useState(12);

  const handleMarkerClick = (doctor) => {
    onDoctorSelect(doctor);
  };

  // Mock map markers based on doctor locations
  const getMarkerPosition = (index) => {
    const baseLatLng = { lat: 40.7128, lng: -74.006 };
    const offset = 0.01;
    return {
      lat: baseLatLng.lat + (Math.random() - 0.5) * offset * 2,
      lng: baseLatLng.lng + (Math.random() - 0.5) * offset * 2,
    };
  };

  return (
    <div className="relative h-96 lg:h-full bg-secondary-100 rounded-lg overflow-hidden">
      {/* Google Maps iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Doctors Map View"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=${zoom}&output=embed`}
        className="border-0"
      />

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-surface border border-border rounded-md flex items-center justify-center clinical-shadow hover:shadow-md clinical-transition">
          <Icon name="Plus" size={16} />
        </button>
        <button className="w-10 h-10 bg-surface border border-border rounded-md flex items-center justify-center clinical-shadow hover:shadow-md clinical-transition">
          <Icon name="Minus" size={16} />
        </button>
        <button className="w-10 h-10 bg-surface border border-border rounded-md flex items-center justify-center clinical-shadow hover:shadow-md clinical-transition">
          <Icon name="Crosshair" size={16} />
        </button>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-surface border border-border rounded-md p-3 clinical-shadow">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-text-secondary">Available Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-text-secondary">Limited Availability</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary-400 rounded-full"></div>
            <span className="text-xs text-text-secondary">Fully Booked</span>
          </div>
        </div>
      </div>

      {/* Selected doctor info card */}
      {selectedDoctor && (
        <div className="absolute bottom-4 right-4 w-80 bg-surface border border-border rounded-lg clinical-shadow p-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-text-primary truncate">
                Dr. {selectedDoctor.name}
              </h4>
              <p className="text-sm text-text-secondary">{selectedDoctor.specialty}</p>
              <p className="text-sm text-text-muted">{selectedDoctor.location}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-sm font-medium">{selectedDoctor.rating}</span>
                <span className="text-sm text-text-secondary">
                  ({selectedDoctor.reviewCount} reviews)
                </span>
              </div>
              <div className="flex space-x-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  Book Now
                </Button>
              </div>
            </div>
            <button
              onClick={() => onDoctorSelect(null)}
              className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-muted clinical-transition"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Mock markers overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {doctors.slice(0, 10).map((doctor, index) => {
          const position = getMarkerPosition(index);
          const isSelected = selectedDoctor?.id === doctor.id;

          return (
            <button
              key={doctor.id}
              onClick={() => handleMarkerClick(doctor)}
              className={`absolute w-8 h-8 rounded-full border-2 border-white clinical-shadow pointer-events-auto clinical-transition hover:scale-110 ${
                isSelected ? 'bg-primary z-10' : 'bg-success'
              }`}
              style={{
                left: `${(position.lng + 74.006) * 1000}px`,
                top: `${(40.7128 - position.lat) * 1000}px`,
                transform: 'translate(-50%, -50%)',
              }}
              aria-label={`Dr. ${doctor.name} location`}
            >
              <Icon name="MapPin" size={16} className={isSelected ? 'text-white' : 'text-white'} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MapView;
