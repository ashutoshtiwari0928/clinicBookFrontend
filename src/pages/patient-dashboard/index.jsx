import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WelcomeHeader from './components/WelcomeHeader';
import UpcomingAppointments from './components/UpcomingAppointments';
import MedicalSummaryCards from './components/MedicalSummaryCards';
import QuickActionsSection from './components/QuickActionsSection';
import AppointmentHistory from './components/AppointmentHistory';
import HealthRecordsSection from './components/HealthRecordsSection';
import InsuranceCard from './components/InsuranceCard';
import CalendarWidget from './components/CalendarWidget';
import RecentActivityFeed from './components/RecentActivityFeed';
import axios from 'axios';
const PatientDashboard = (id) => {
  const navigate = useNavigate();
  const [hasMoreHistory, setHasMoreHistory] = useState(true);
  // Mock data
  const [patientData, setPatientData] = useState(null);
  const { email } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8089/api/patients/appointments/${email}`);
        console.log(res);
        setPatientData(res.data);
      } catch (e) {
        console.log('error fetching patient data: error');
      }
    };
    fetchData();
  }, [email]);
  console.log(patientData);
  const patientName = 'John Smith';

  const upcomingAppointments = [
    {
      id: 1,
      date: '2024-01-15',
      time: '10:30:00',
      doctor: 'Dr. Sarah Johnson',
      type: 'Consultation',
      location: 'Main Clinic - Room 205',
      notes: 'Annual physical examination and health screening',
    },
    {
      id: 2,
      date: '2024-01-18',
      time: '14:00:00',
      doctor: 'Dr. Michael Chen',
      type: 'Follow-up',
      location: 'Cardiology Center - Room 102',
      notes: 'Follow-up for blood pressure monitoring',
    },
    {
      id: 3,
      date: '2024-01-22',
      time: '09:15:00',
      doctor: 'Dr. Emily Davis',
      type: 'Check-up',
      location: 'Wellness Center - Room 301',
      notes: 'Routine wellness check and lab review',
    },
  ];

  const prescriptions = [
    {
      id: 1,
      medication: 'Lisinopril 10mg',
      dosage: 'Once daily',
      date: '2024-01-10',
      status: 'Active',
    },
    {
      id: 2,
      medication: 'Metformin 500mg',
      dosage: 'Twice daily with meals',
      date: '2024-01-08',
      status: 'Active',
    },
    {
      id: 3,
      medication: 'Vitamin D3 1000IU',
      dosage: 'Once daily',
      date: '2024-01-05',
      status: 'Completed',
    },
  ];

  const testResults = [
    {
      id: 1,
      testName: 'Complete Blood Count',
      value: 'Within normal limits',
      date: '2024-01-12',
      status: 'Normal',
    },
    {
      id: 2,
      testName: 'Lipid Panel',
      value: 'Total Cholesterol: 195 mg/dL',
      date: '2024-01-10',
      status: 'Normal',
    },
    {
      id: 3,
      testName: 'HbA1c',
      value: '6.8%',
      date: '2024-01-08',
      status: 'Abnormal',
    },
  ];

  const healthReminders = [
    {
      id: 1,
      title: 'Annual Physical Due',
      description: 'Schedule your yearly physical examination',
      dueDate: '2024-02-01',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Flu Vaccination',
      description: 'Get your annual flu shot',
      dueDate: '2024-01-30',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Prescription Refill',
      description: 'Lisinopril prescription expires soon',
      dueDate: '2024-01-25',
      priority: 'High',
    },
  ];

  const appointmentHistory = [
    {
      id: 1,
      date: '2024-01-05',
      time: '11:00:00',
      doctor: 'Dr. Sarah Johnson',
      type: 'Consultation',
      location: 'Main Clinic - Room 205',
      status: 'Completed',
      notes: 'Discussed test results and treatment plan',
    },
    {
      id: 2,
      date: '2023-12-20',
      time: '15:30:00',
      doctor: 'Dr. Michael Chen',
      type: 'Follow-up',
      location: 'Cardiology Center - Room 102',
      status: 'Completed',
      notes: 'Blood pressure monitoring and medication adjustment',
    },
    {
      id: 3,
      date: '2023-12-15',
      time: '09:45:00',
      doctor: 'Dr. Emily Davis',
      type: 'Check-up',
      location: 'Wellness Center - Room 301',
      status: 'Cancelled',
      notes: 'Patient requested cancellation due to scheduling conflict',
    },
    {
      id: 4,
      date: '2023-11-28',
      time: '14:15:00',
      doctor: 'Dr. Robert Wilson',
      type: 'Emergency',
      location: 'Emergency Department',
      status: 'Completed',
      notes: 'Treated for minor injury, full recovery',
    },
  ];

  const healthDocuments = [
    {
      id: 1,
      name: 'Lab Results - January 2024.pdf',
      type: 'pdf',
      size: 245760,
      date: '2024-01-12',
    },
    {
      id: 2,
      name: 'Prescription History.pdf',
      type: 'pdf',
      size: 189440,
      date: '2024-01-10',
    },
    {
      id: 3,
      name: 'Insurance Card.jpg',
      type: 'jpg',
      size: 102400,
      date: '2024-01-08',
    },
  ];

  const labResults = [
    {
      id: 1,
      testName: 'Complete Blood Count',
      date: '2024-01-12',
      status: 'Normal',
    },
    {
      id: 2,
      testName: 'Lipid Panel',
      date: '2024-01-10',
      status: 'Normal',
    },
    {
      id: 3,
      testName: 'HbA1c',
      date: '2024-01-08',
      status: 'Abnormal',
    },
  ];

  const healthImages = [
    {
      id: 1,
      name: 'X-Ray Chest.jpg',
      date: '2024-01-05',
    },
    {
      id: 2,
      name: 'MRI Scan.jpg',
      date: '2023-12-20',
    },
  ];

  const insuranceInfo = {
    provider: 'Blue Cross Blue Shield',
    policyNumber: 'BC123456789',
    groupNumber: 'GRP001234',
    status: 'Active',
    validUntil: '2024-12-31',
    copay: 25,
    deductible: {
      used: 750,
      limit: 2000,
    },
    outOfPocket: {
      used: 1200,
      limit: 5000,
    },
    coverage: [
      { service: 'Primary Care', coverage: '100%' },
      { service: 'Specialist', coverage: '80%' },
      { service: 'Emergency', coverage: '90%' },
      { service: 'Prescription', coverage: '75%' },
    ],
    recentClaims: [
      {
        id: 1,
        service: 'Office Visit',
        date: '2024-01-05',
        amount: 150,
        status: 'Approved',
      },
      {
        id: 2,
        service: 'Lab Work',
        date: '2024-01-12',
        amount: 85,
        status: 'Pending',
      },
    ],
  };

  const recentActivities = [
    {
      id: 1,
      type: 'appointment_confirmed',
      title: 'Appointment Confirmed',
      description: 'Your appointment with Dr. Sarah Johnson has been confirmed for Jan 15, 2024',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      actionRequired: false,
    },
    {
      id: 2,
      type: 'test_result',
      title: 'Lab Results Available',
      description: 'Your Complete Blood Count results are now available',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      actionRequired: true,
    },
    {
      id: 3,
      type: 'prescription_updated',
      title: 'Prescription Updated',
      description: 'Dr. Chen updated your Lisinopril prescription',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      actionRequired: false,
    },
    {
      id: 4,
      type: 'message_received',
      title: 'Message from Provider',
      description: 'Dr. Johnson sent you a message about your upcoming appointment',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      actionRequired: true,
    },
  ];

  // Event handlers
  const handleEmergencyBooking = () => {
    navigate('/appointment-booking-calendar', { state: { emergency: true } });
  };

  const handleNotifications = () => {
    console.log('Show notifications');
  };

  const handleReschedule = (appointmentId) => {
    navigate('/appointment-booking-calendar', {
      state: { reschedule: appointmentId },
    });
  };

  const handleCancel = (appointmentId) => {
    console.log('Cancel appointment:', appointmentId);
  };

  const handleViewAllAppointments = () => {
    console.log('View all appointments');
  };

  const handleBookAppointment = () => {
    navigate('/appointment-booking-calendar');
  };

  const handleRefillPrescription = () => {
    console.log('Refill prescription');
  };

  const handleMessageProvider = () => {
    console.log('Message provider');
  };

  const handleLoadMoreHistory = () => {
    console.log('Load more history');
    setHasMoreHistory(false);
  };

  const handleDownload = (fileId) => {
    console.log('Download file:', fileId);
  };

  const handleUpload = () => {
    console.log('Upload file');
  };

  const handleInsuranceVerify = () => {
    console.log('Verify insurance');
  };

  const handleInsuranceUpdate = () => {
    console.log('Update insurance');
  };

  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
  };

  const handleViewMonth = () => {
    console.log('View full calendar');
  };

  const handleViewAllActivity = () => {
    console.log('View all activity');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Header */}
        <WelcomeHeader
          patientName={patientName}
          onEmergencyBooking={handleEmergencyBooking}
          onNotifications={handleNotifications}
        />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <UpcomingAppointments
              appointments={upcomingAppointments}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
              onViewAll={handleViewAllAppointments}
            />

            {/* Medical Summary Cards */}
            <MedicalSummaryCards
              prescriptions={prescriptions}
              testResults={testResults}
              healthReminders={healthReminders}
            />

            {/* Quick Actions */}
            <QuickActionsSection
              onBookAppointment={handleBookAppointment}
              onRefillPrescription={handleRefillPrescription}
              onMessageProvider={handleMessageProvider}
            />

            {/* Appointment History */}
            <AppointmentHistory
              appointments={appointmentHistory}
              onLoadMore={handleLoadMoreHistory}
              hasMore={hasMoreHistory}
            />

            {/* Health Records */}
            <HealthRecordsSection
              documents={healthDocuments}
              labResults={labResults}
              images={healthImages}
              onDownload={handleDownload}
              onUpload={handleUpload}
            />

            {/* Insurance Information */}
            <InsuranceCard
              insuranceInfo={insuranceInfo}
              onVerify={handleInsuranceVerify}
              onUpdate={handleInsuranceUpdate}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Calendar Widget */}
            <CalendarWidget
              appointments={upcomingAppointments}
              onDateSelect={handleDateSelect}
              onViewMonth={handleViewMonth}
            />

            {/* Recent Activity Feed */}
            <RecentActivityFeed activities={recentActivities} onViewAll={handleViewAllActivity} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
