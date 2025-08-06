import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyBookingButton = ({ doctor, onBookNow, selectedSlot, appointmentType }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show sticky button after scrolling past the initial booking section
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getBookingStatus = () => {
    if (selectedSlot && appointmentType) {
      return {
        text: 'Complete Booking',
        icon: 'CheckCircle',
        variant: 'success',
      };
    } else if (selectedSlot) {
      return {
        text: 'Select Appointment Type',
        icon: 'Clock',
        variant: 'warning',
      };
    } else {
      return {
        text: 'Select Date & Time',
        icon: 'Calendar',
        variant: 'primary',
      };
    }
  };

  const bookingStatus = getBookingStatus();

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Sticky Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-300 bg-surface border-t border-border clinical-shadow-lg">
        {isExpanded && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={doctor.photo}
                  alt={`Dr. ${doctor.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">Dr. {doctor.name}</h4>
                <p className="text-sm text-text-secondary">{doctor.specialty}</p>
              </div>
              <button
                onClick={toggleExpanded}
                className="p-1 rounded-md text-text-secondary hover:text-text-primary clinical-transition"
              >
                <Icon name="ChevronDown" size={20} />
              </button>
            </div>

            {selectedSlot && (
              <div className="bg-primary-50 rounded-lg p-3 mb-3">
                <div className="flex items-center space-x-2 text-sm text-primary">
                  <Icon name="Calendar" size={14} />
                  <span>
                    {selectedSlot.date?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    at {selectedSlot.time}
                  </span>
                </div>
                {appointmentType && (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-primary-700">{appointmentType.name}</span>
                    <span className="font-data font-semibold text-primary">
                      ${appointmentType.price}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="p-4">
          <div className="flex items-center space-x-3">
            {!isExpanded && (
              <button
                onClick={toggleExpanded}
                className="flex items-center space-x-2 flex-1 text-left"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={doctor.photo}
                    alt={`Dr. ${doctor.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-text-primary text-sm">Dr. {doctor.name}</div>
                  <div className="text-xs text-text-secondary">{doctor.specialty}</div>
                </div>
                <Icon name="ChevronUp" size={16} className="text-text-muted" />
              </button>
            )}

            <Button
              variant={bookingStatus.variant}
              onClick={onBookNow}
              iconName={bookingStatus.icon}
              iconPosition="left"
              className={isExpanded ? 'w-full' : 'flex-shrink-0'}
            >
              {isExpanded ? bookingStatus.text : 'Book'}
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Sticky Button */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-300">
        <div className="bg-surface border border-border rounded-lg clinical-shadow-lg p-4 max-w-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={doctor.photo}
                alt={`Dr. ${doctor.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-text-primary">Dr. {doctor.name}</h4>
              <p className="text-sm text-text-secondary">{doctor.specialty}</p>
            </div>
          </div>

          {selectedSlot && (
            <div className="bg-primary-50 rounded-lg p-3 mb-3">
              <div className="flex items-center space-x-2 text-sm text-primary mb-1">
                <Icon name="Calendar" size={14} />
                <span>
                  {selectedSlot.date?.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  at {selectedSlot.time}
                </span>
              </div>
              {appointmentType && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-700">{appointmentType.name}</span>
                  <span className="font-data font-semibold text-primary">
                    ${appointmentType.price}
                  </span>
                </div>
              )}
            </div>
          )}

          <Button
            variant={bookingStatus.variant}
            fullWidth
            onClick={onBookNow}
            iconName={bookingStatus.icon}
            iconPosition="left"
          >
            {bookingStatus.text}
          </Button>
        </div>
      </div>
    </>
  );
};

export default StickyBookingButton;
