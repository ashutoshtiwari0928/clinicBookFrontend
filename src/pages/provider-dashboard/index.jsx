import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/ui/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import ScheduleTab from './components/ScheduleTab';
import PatientsTab from './components/PatientsTab';
import AnalyticsTab from './components/AnalyticsTab';
import SettingsTab from './components/SettingsTab';
import NotificationPanel from './components/NotificationPanel';
import Icon from '../../components/AppIcon';

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data
  const [providerData] = useState({
    name: 'Dr. Sarah Smith',
    specialty: 'Cardiologist',
    todayStats: {
      total: 12,
      confirmed: 8,
      pending: 3,
      available: 4,
    },
  });

  const [appointments] = useState([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      patientName: 'John Smith',
      type: 'Consultation',
      status: 'confirmed',
      duration: 30,
      notes: 'Follow-up for chest pain',
    },
    {
      id: 2,
      date: new Date().toISOString().split('T')[0],
      time: '10:30',
      patientName: 'Sarah Johnson',
      type: 'Follow-up',
      status: 'pending',
      duration: 15,
      notes: 'Blood pressure check',
    },
    {
      id: 3,
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      patientName: 'Michael Brown',
      type: 'Check-up',
      status: 'confirmed',
      duration: 45,
      notes: 'Annual physical examination',
    },
    {
      id: 4,
      date: new Date().toISOString().split('T')[0],
      time: '15:30',
      patientName: 'Emily Davis',
      type: 'Emergency',
      status: 'confirmed',
      duration: 30,
      notes: 'Chest pain - urgent',
    },
  ]);

  const [patients] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      age: 45,
      status: 'upcoming',
      nextAppointment: 'Today 9:00 AM',
      lastVisit: '2024-01-15',
      totalVisits: 8,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      age: 32,
      status: 'pending',
      nextAppointment: 'Today 10:30 AM',
      lastVisit: '2024-01-10',
      totalVisits: 3,
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 345-6789',
      age: 58,
      status: 'completed',
      nextAppointment: 'No upcoming appointments',
      lastVisit: '2024-01-20',
      totalVisits: 12,
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      age: 28,
      status: 'upcoming',
      nextAppointment: 'Today 3:30 PM',
      lastVisit: '2023-12-15',
      totalVisits: 2,
    },
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'New Appointment Booked',
      message: 'John Smith has booked an appointment for tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
    {
      id: 2,
      type: 'cancellation',
      title: 'Appointment Cancelled',
      message: 'Mary Wilson cancelled her appointment scheduled for today at 11:00 AM',
      timestamp: new Date(Date.now() - 900000),
      read: false,
    },
    {
      id: 3,
      type: 'message',
      title: 'Patient Message',
      message: 'Sarah Johnson sent you a message about her prescription',
      timestamp: new Date(Date.now() - 1800000),
      read: true,
    },
    {
      id: 4,
      type: 'emergency',
      title: 'Emergency Booking Request',
      message: 'Robert Taylor is requesting an emergency appointment for chest pain',
      timestamp: new Date(Date.now() - 600000),
      read: false,
    },
  ]);

  const tabs = [
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'patients', label: 'Patients', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
  ];

  const handleEmergencySlot = () => {
    console.log('Creating emergency slot');
    // Handle emergency slot creation
  };

  const handleScheduleAdjustment = () => {
    console.log('Opening schedule adjustment');
    // Handle schedule adjustment
  };

  const handleAppointmentAction = (action, appointmentId, data = {}) => {
    console.log('Appointment action:', action, appointmentId, data);
    // Handle appointment actions (reschedule, cancel, complete, etc.)
  };

  const handlePatientAction = (action, patientId) => {
    console.log('Patient action:', action, patientId);
    // Handle patient actions (view, message, schedule, etc.)
  };

  const handleBulkAction = (action, patientIds) => {
    console.log('Bulk action:', action, patientIds);
    // Handle bulk actions (send reminder, confirm, reschedule)
  };

  const handleNotificationAction = (action, notificationId) => {
    console.log('Notification action:', action, notificationId);
    // Handle notification actions
  };

  const handleMarkAllRead = () => {
    console.log('Marking all notifications as read');
    // Handle mark all notifications as read
  };

  const handleSettingsUpdate = (settings) => {
    console.log('Settings updated:', settings);
    // Handle settings update
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'schedule':
        return (
          <ScheduleTab
            appointments={appointments}
            onAppointmentAction={handleAppointmentAction}
            onDateChange={setSelectedDate}
          />
        );
      case 'patients':
        return (
          <PatientsTab
            patients={patients}
            onPatientAction={handlePatientAction}
            onBulkAction={handleBulkAction}
          />
        );
      case 'analytics':
        return <AnalyticsTab analyticsData={{}} />;
      case 'settings':
        return <SettingsTab settings={{}} onSettingsUpdate={handleSettingsUpdate} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Provider Dashboard - ClinicBook</title>
        <meta
          name="description"
          content="Healthcare provider dashboard for managing appointments, patients, and practice operations"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="lg:ml-64">
          {/* Dashboard Header */}
          <DashboardHeader
            providerName={providerData.name}
            todayStats={providerData.todayStats}
            onEmergencySlot={handleEmergencySlot}
            onScheduleAdjustment={handleScheduleAdjustment}
          />

          {/* Tab Navigation */}
          <div className="bg-surface border-b border-border">
            <div className="px-6">
              <div className="flex items-center justify-between">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-1 py-4 border-b-2 font-medium text-sm clinical-transition ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Notifications */}
                <NotificationPanel
                  notifications={notifications}
                  onNotificationAction={handleNotificationAction}
                  onMarkAllRead={handleMarkAllRead}
                />
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-100">
          <div className="grid grid-cols-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 py-3 clinical-transition ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon} size={20} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderDashboard;
