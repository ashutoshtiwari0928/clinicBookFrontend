import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeSlotPicker = ({
  selectedDate,
  selectedTime,
  onTimeSelect,
  appointmentType = 'consultation',
  providerId = null,
  onProviderChange,
}) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [providers] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      avatar:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      availability: 'high',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Practice',
      avatar:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      availability: 'medium',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      avatar:
        'https://images.unsplash.com/photo-1594824475317-29bb4b8b2b8d?w=400&h=400&fit=crop&crop=face',
      availability: 'low',
    },
  ]);

  const appointmentTypes = [
    { id: 'consultation', name: 'Consultation', duration: 30, color: 'primary' },
    { id: 'follow-up', name: 'Follow-up', duration: 15, color: 'success' },
    { id: 'procedure', name: 'Procedure', duration: 60, color: 'warning' },
    { id: 'emergency', name: 'Emergency', duration: 45, color: 'error' },
  ];

  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots();
    }
  }, [selectedDate, appointmentType, providerId]);

  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 17;
    const interval = 15;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const timeStr = formatTime(time);

        // Mock availability logic
        const isAvailable = Math.random() > 0.3;
        const isWaitingList = Math.random() > 0.7;

        slots.push({
          time,
          timeStr,
          isAvailable,
          isWaitingList,
          provider: providers[Math.floor(Math.random() * providers.length)],
        });
      }
    }

    setTimeSlots(slots);
  };

  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getSlotClassName = (slot) => {
    let baseClass = 'flex items-center justify-between p-3 rounded-md border clinical-transition';

    if (slot.time === selectedTime) {
      baseClass += ' border-primary bg-primary-50 text-primary';
    } else if (slot.isAvailable) {
      baseClass += ' border-border hover:border-primary-200 hover:bg-primary-50 cursor-pointer';
    } else if (slot.isWaitingList) {
      baseClass += ' border-warning-200 bg-warning-50 cursor-pointer';
    } else {
      baseClass += ' border-border bg-muted cursor-not-allowed opacity-50';
    }

    return baseClass;
  };

  const handleSlotClick = (slot) => {
    if (slot.isAvailable || slot.isWaitingList) {
      onTimeSelect(slot.time);
    }
  };

  const currentType = appointmentTypes.find((type) => type.id === appointmentType);

  if (!selectedDate) {
    return (
      <div className="bg-surface border border-border rounded-lg clinical-shadow p-8 text-center">
        <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">Select a Date</h3>
        <p className="text-text-secondary">
          Choose a date from the calendar to view available time slots
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">
            Available Times -{' '}
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h3>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {currentType?.duration} min appointment
            </span>
          </div>
        </div>

        {/* Appointment Type Selector */}
        <div className="flex flex-wrap gap-2">
          {appointmentTypes.map((type) => (
            <Button
              key={type.id}
              variant={appointmentType === type.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onTimeSelect && onTimeSelect(null, type.id)}
            >
              {type.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Provider Filter */}
      {providers.length > 1 && (
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-medium text-text-primary mb-3">Filter by Provider</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button
              variant={!providerId ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onProviderChange && onProviderChange(null)}
              fullWidth
            >
              All Providers
            </Button>
            {providers.map((provider) => (
              <Button
                key={provider.id}
                variant={providerId === provider.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onProviderChange && onProviderChange(provider.id)}
                fullWidth
              >
                {provider.name.split(' ')[1]}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Time Slots */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={getSlotClassName(slot)}
              onClick={() => handleSlotClick(slot)}
            >
              <div className="flex items-center space-x-3">
                <div className="text-sm font-data font-medium text-text-primary">
                  {slot.timeStr}
                </div>
                {slot.isWaitingList && !slot.isAvailable && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} className="text-warning" />
                    <span className="text-xs text-warning">Waitlist</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {slot.isAvailable ? (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                ) : slot.isWaitingList ? (
                  <Icon name="Clock" size={16} className="text-warning" />
                ) : (
                  <Icon name="XCircle" size={16} className="text-error" />
                )}
              </div>
            </div>
          ))}
        </div>

        {timeSlots.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-text-primary mb-2">No Available Slots</h4>
            <p className="text-text-secondary mb-4">
              There are no available time slots for the selected date and appointment type.
            </p>
            <Button variant="outline" iconName="Bell">
              Join Waiting List
            </Button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} className="text-warning" />
              <span>Waitlist</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="XCircle" size={12} className="text-error" />
              <span>Booked</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotPicker;
