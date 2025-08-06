import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import CalendarView from './components/CalendarView';
import TimeSlotPicker from './components/TimeSlotPicker';
import BookingForm from './components/BookingForm';
import ConfirmationModal from './components/ConfirmationModal';
import EmergencyBookingWidget from './components/EmergencyBookingWidget';

const AppointmentBookingCalendar = () => {
  const [currentStep, setCurrentStep] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [providerId, setProviderId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Mock available dates (in real app, this would come from API)
  const [availableDates] = useState([
    '2024-12-20',
    '2024-12-21',
    '2024-12-23',
    '2024-12-24',
    '2024-12-26',
    '2024-12-27',
    '2024-12-28',
    '2024-12-30',
    '2024-12-31',
    '2025-01-02',
    '2025-01-03',
    '2025-01-06',
    '2025-01-07',
    '2025-01-08',
    '2025-01-09',
    '2025-01-10',
  ]);

  const steps = [
    { id: 'calendar', name: 'Select Date', icon: 'Calendar' },
    { id: 'time', name: 'Choose Time', icon: 'Clock' },
    { id: 'details', name: 'Appointment Details', icon: 'FileText' },
    { id: 'confirmation', name: 'Confirm', icon: 'CheckCircle' },
  ];

  useEffect(() => {
    // Detect user timezone and update available slots accordingly
    console.log('User timezone:', userTimezone);
  }, [userTimezone]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setCurrentStep('time');
  };

  const handleTimeSelect = (time, type = null) => {
    if (type) {
      setAppointmentType(type);
    }
    if (time) {
      setSelectedTime(time);
      setCurrentStep('details');
    }
  };

  const handleProviderChange = (newProviderId) => {
    setProviderId(newProviderId);
  };

  const handleBookingSubmit = (formData) => {
    setAppointmentData(formData);
    setIsConfirmationOpen(true);
  };

  const handleConfirmAppointment = async (finalData) => {
    setIsLoading(true);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Appointment booked:', finalData);

      // Show success and redirect
      setIsConfirmationOpen(false);
      setCurrentStep('success');

      // Auto redirect after 3 seconds
      setTimeout(() => {
        window.location.href = '/patient-dashboard';
      }, 3000);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmergencyBook = (emergencyData) => {
    console.log('Emergency booking:', emergencyData);
    // Handle emergency booking logic
    alert('Emergency booking request submitted. You will be contacted within 15 minutes.');
  };

  const handleStepClick = (stepId) => {
    if (stepId === 'calendar') {
      setCurrentStep('calendar');
    } else if (stepId === 'time' && selectedDate) {
      setCurrentStep('time');
    } else if (stepId === 'details' && selectedDate && selectedTime) {
      setCurrentStep('details');
    }
  };

  const getStepStatus = (stepId) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    const currentIndex = steps.findIndex((step) => step.id === currentStep);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const canProceedToStep = (stepId) => {
    switch (stepId) {
      case 'calendar':
        return true;
      case 'time':
        return selectedDate;
      case 'details':
        return selectedDate && selectedTime;
      case 'confirmation':
        return selectedDate && selectedTime && appointmentData;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'calendar':
        return (
          <CalendarView
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            availableDates={availableDates}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        );

      case 'time':
        return (
          <TimeSlotPicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
            appointmentType={appointmentType}
            providerId={providerId}
            onProviderChange={handleProviderChange}
          />
        );

      case 'details':
        return (
          <BookingForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            appointmentType={appointmentType}
            onSubmit={handleBookingSubmit}
            onCancel={() => setCurrentStep('time')}
            isLoading={isLoading}
          />
        );

      case 'success':
        return (
          <div className="bg-surface border border-border rounded-lg clinical-shadow p-8 text-center">
            <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              Appointment Confirmed!
            </h2>
            <p className="text-text-secondary mb-6">
              Your appointment has been successfully booked. You will receive a confirmation email
              shortly.
            </p>
            <div className="space-y-3">
              <Link to="/patient-dashboard">
                <Button variant="primary" fullWidth iconName="LayoutDashboard">
                  Go to Dashboard
                </Button>
              </Link>
              <Button variant="outline" fullWidth iconName="Calendar">
                Book Another Appointment
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
            <Link to="/" className="hover:text-primary clinical-transition">
              Home
            </Link>
            <Icon name="ChevronRight" size={16} />
            <Link to="/doctor-search-browse" className="hover:text-primary clinical-transition">
              Find Doctors
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span>Book Appointment</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Book Your Appointment</h1>
          <p className="text-text-secondary mt-2">
            Schedule your appointment with our healthcare providers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const canProceed = canProceedToStep(step.id);

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => canProceed && handleStepClick(step.id)}
                    disabled={!canProceed}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md clinical-transition ${
                      status === 'completed'
                        ? 'bg-success-50 text-success cursor-pointer'
                        : status === 'current'
                          ? 'bg-primary-50 text-primary cursor-pointer'
                          : canProceed
                            ? 'text-text-secondary hover:text-primary cursor-pointer'
                            : 'text-text-muted cursor-not-allowed'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        status === 'completed'
                          ? 'bg-success text-white'
                          : status === 'current'
                            ? 'bg-primary text-white'
                            : 'bg-muted'
                      }`}
                    >
                      {status === 'completed' ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <Icon name={step.icon} size={16} />
                      )}
                    </div>
                    <span className="hidden sm:inline font-medium">{step.name}</span>
                  </button>

                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-2 ${
                        status === 'completed' ? 'bg-success' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">{renderStepContent()}</div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Appointment Summary */}
            <div className="bg-surface border border-border rounded-lg clinical-shadow p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Appointment Summary</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Date:</span>
                  <span className="text-text-primary font-medium">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Not selected'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Time:</span>
                  <span className="text-text-primary font-medium">
                    {selectedTime
                      ? (() => {
                          const [hours, minutes] = selectedTime.split(':');
                          const hour = parseInt(hours);
                          const ampm = hour >= 12 ? 'PM' : 'AM';
                          const displayHour = hour % 12 || 12;
                          return `${displayHour}:${minutes} ${ampm}`;
                        })()
                      : 'Not selected'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Type:</span>
                  <span className="text-text-primary font-medium capitalize">
                    {appointmentType}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Duration:</span>
                  <span className="text-text-primary font-medium">30 minutes</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Timezone:</span>
                  <span className="text-text-primary font-medium text-xs">{userTimezone}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface border border-border rounded-lg clinical-shadow p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <Link to="/doctor-search-browse">
                  <Button variant="outline" fullWidth iconName="Search">
                    Find Different Doctor
                  </Button>
                </Link>

                <Link to="/patient-dashboard">
                  <Button variant="outline" fullWidth iconName="Calendar">
                    View My Appointments
                  </Button>
                </Link>

                <Button variant="ghost" fullWidth iconName="HelpCircle">
                  Need Help?
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-surface border border-border rounded-lg clinical-shadow p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Need Assistance?</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">(555) 123-4567</p>
                    <p className="text-xs text-text-secondary">Mon-Fri 8AM-6PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">support@clinicbook.com</p>
                    <p className="text-xs text-text-secondary">24/7 Email Support</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Icon name="MessageCircle" size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Live Chat</p>
                    <p className="text-xs text-text-secondary">Available now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        appointmentData={appointmentData}
        onConfirm={handleConfirmAppointment}
        onCancel={() => setCurrentStep('details')}
        onClose={() => setIsConfirmationOpen(false)}
      />

      {/* Emergency Booking Widget */}
      <EmergencyBookingWidget onEmergencyBook={handleEmergencyBook} />
    </div>
  );
};

export default AppointmentBookingCalendar;
