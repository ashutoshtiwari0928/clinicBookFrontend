import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import DoctorHeader from './components/DoctorHeader';
import DoctorInfoTabs from './components/DoctorInfoTabs';
import BookingCalendar from './components/BookingCalendar';
import AppointmentTypeSelector from './components/AppointmentTypeSelector';
import InsuranceVerification from './components/InsuranceVerification';
import BookingForm from './components/BookingForm';
import StickyBookingButton from './components/StickyBookingButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DoctorProfileBooking = () => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointmentType, setAppointmentType] = useState(null);
  const [insuranceVerification, setInsuranceVerification] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  // Mock doctor data
  const doctor = {
    id: 1,
    name: 'Sarah Johnson',
    specialty: 'Cardiologist',
    photo:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 247,
    experience: 12,
    location: 'New York, NY',
    consultationFee: 150,
    patientsServed: 2500,
    successRate: 96,
    nextAvailable: 'Today',
    verifications: ['Board Certified', 'Hospital Verified', 'Insurance Accepted'],
    about: `Dr. Sarah Johnson is a highly experienced cardiologist with over 12 years of practice in cardiovascular medicine. She specializes in preventive cardiology, heart disease management, and cardiac rehabilitation.\n\nDr. Johnson completed her medical degree from Harvard Medical School and her cardiology fellowship at Johns Hopkins Hospital. She is passionate about providing comprehensive cardiac care and educating patients about heart health.`,
    languages: ['English', 'Spanish', 'French'],
    affiliations: ['Mount Sinai Hospital', 'NewYork-Presbyterian Hospital', 'Lenox Hill Hospital'],
    specializations: [
      {
        name: 'Preventive Cardiology',
        description:
          'Focus on preventing heart disease through lifestyle modifications and early intervention.',
        experience: 12,
        cases: 1500,
      },
      {
        name: 'Heart Failure Management',
        description:
          'Comprehensive treatment and management of patients with heart failure conditions.',
        experience: 10,
        cases: 800,
      },
      {
        name: 'Cardiac Rehabilitation',
        description: 'Post-cardiac event rehabilitation programs to improve patient outcomes.',
        experience: 8,
        cases: 600,
      },
    ],
    education: [
      {
        degree: 'MD - Doctor of Medicine',
        institution: 'Harvard Medical School',
        year: '2008',
      },
      {
        degree: 'Cardiology Fellowship',
        institution: 'Johns Hopkins Hospital',
        year: '2012',
      },
      {
        degree: 'Internal Medicine Residency',
        institution: 'Massachusetts General Hospital',
        year: '2011',
      },
    ],
    certifications: [
      { name: 'American Board of Cardiology', year: '2012' },
      { name: 'Advanced Cardiac Life Support (ACLS)', year: '2023' },
      { name: 'Echocardiography Certification', year: '2013' },
      { name: 'Nuclear Cardiology Certification', year: '2014' },
    ],
    reviews: [
      {
        patientName: 'Michael Chen',
        rating: 5,
        comment:
          'Dr. Johnson is exceptional! She took the time to explain my condition thoroughly and provided a comprehensive treatment plan. Her expertise in cardiology is evident, and I felt completely confident in her care.',
        date: '2 weeks ago',
        verified: true,
        treatmentFor: 'Hypertension Management',
      },
      {
        patientName: 'Lisa Rodriguez',
        rating: 5,
        comment:
          "Outstanding cardiologist! Dr. Johnson's preventive approach helped me avoid potential heart problems. She's knowledgeable, caring, and always available for questions.",
        date: '1 month ago',
        verified: true,
        treatmentFor: 'Preventive Cardiology',
      },
      {
        patientName: 'Robert Kim',
        rating: 4,
        comment:
          'Very professional and thorough examination. Dr. Johnson explained everything clearly and provided excellent follow-up care after my procedure.',
        date: '6 weeks ago',
        verified: true,
        treatmentFor: 'Cardiac Catheterization',
      },
    ],
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    if (appointmentType) {
      setShowBookingForm(true);
    }
  };

  const handleTypeSelect = (type) => {
    setAppointmentType(type);
    if (selectedSlot) {
      setShowBookingForm(true);
    }
  };

  const handleInsuranceVerification = (result) => {
    setInsuranceVerification(result);
  };

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking submitted:', bookingData);
    // Navigate to confirmation or payment page
    navigate('/appointment-booking-calendar');
  };

  const handleBookNow = () => {
    if (selectedSlot && appointmentType) {
      setShowBookingForm(true);
    } else {
      // Scroll to booking section
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const sections = [
    { id: 'profile', label: 'Doctor Profile', icon: 'User' },
    { id: 'booking', label: 'Book Appointment', icon: 'Calendar' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Doctor Header */}
      <DoctorHeader doctor={doctor} onBookNow={handleBookNow} />

      {/* Section Navigation (Mobile) */}
      <div className="lg:hidden bg-surface border-b border-border sticky top-16 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm clinical-transition whitespace-nowrap ${
                  activeSection === section.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={section.icon} size={16} />
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Doctor Information */}
          <div
            className={`lg:col-span-2 ${activeSection === 'profile' ? 'block' : 'hidden lg:block'}`}
          >
            <DoctorInfoTabs doctor={doctor} />
          </div>

          {/* Right Column - Booking Interface */}
          <div
            className={`lg:col-span-1 space-y-6 ${activeSection === 'booking' ? 'block' : 'hidden lg:block'}`}
            id="booking-section"
          >
            {/* Booking Calendar */}
            <BookingCalendar
              doctor={doctor}
              onSlotSelect={handleSlotSelect}
              selectedSlot={selectedSlot}
            />

            {/* Appointment Type Selector */}
            {selectedSlot && (
              <AppointmentTypeSelector
                selectedType={appointmentType}
                onTypeSelect={handleTypeSelect}
                doctor={doctor}
              />
            )}

            {/* Insurance Verification */}
            {selectedSlot && appointmentType && (
              <InsuranceVerification onVerificationComplete={handleInsuranceVerification} />
            )}

            {/* Booking Form */}
            {showBookingForm && selectedSlot && appointmentType && (
              <BookingForm
                selectedSlot={selectedSlot}
                appointmentType={appointmentType}
                onBookingSubmit={handleBookingSubmit}
              />
            )}

            {/* Quick Actions */}
            <div className="bg-surface border border-border rounded-lg clinical-shadow p-4">
              <h4 className="font-medium text-text-primary mb-3">Need Help?</h4>
              <div className="space-y-2">
                <Button variant="outline" fullWidth size="sm" iconName="MessageSquare">
                  Chat with Support
                </Button>
                <Button variant="outline" fullWidth size="sm" iconName="Phone">
                  Call Clinic
                </Button>
                <Button variant="ghost" fullWidth size="sm" iconName="HelpCircle">
                  Booking FAQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Booking Button */}
      <StickyBookingButton
        doctor={doctor}
        onBookNow={handleBookNow}
        selectedSlot={selectedSlot}
        appointmentType={appointmentType}
      />

      {/* Footer Spacer for Mobile Sticky Button */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default DoctorProfileBooking;
