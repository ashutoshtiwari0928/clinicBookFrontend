import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SettingsTab = ({ settings, onSettingsUpdate }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    profile: {
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      email: 'sarah.smith@clinic.com',
      phone: '+1 (555) 123-4567',
      bio: 'Experienced cardiologist with over 15 years of practice...',
      qualifications: 'MD, FACC, Board Certified in Cardiology',
    },
    availability: {
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      startTime: '09:00',
      endTime: '17:00',
      breakStart: '12:00',
      breakEnd: '13:00',
      appointmentDuration: 30,
      bufferTime: 15,
    },
    notifications: {
      emailReminders: true,
      smsReminders: true,
      newBookings: true,
      cancellations: true,
      patientMessages: true,
      dailySchedule: true,
    },
    preferences: {
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12',
      language: 'en',
      autoConfirm: false,
      allowOnlineBooking: true,
    },
  });

  const sections = [
    { id: 'profile', label: 'Profile Information', icon: 'User' },
    { id: 'availability', label: 'Availability & Schedule', icon: 'Calendar' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' },
  ];

  const weekDays = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' },
  ];

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayToggle = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].includes(value)
          ? prev[section][field].filter((item) => item !== value)
          : [...prev[section][field], value],
      },
    }));
  };

  const handleSave = () => {
    onSettingsUpdate(formData);
    console.log('Settings saved:', formData);
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
          <Input
            type="text"
            value={formData.profile.name}
            onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Specialty</label>
          <Input
            type="text"
            value={formData.profile.specialty}
            onChange={(e) => handleInputChange('profile', 'specialty', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
          <Input
            type="email"
            value={formData.profile.email}
            onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
          <Input
            type="tel"
            value={formData.profile.phone}
            onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Professional Bio</label>
        <textarea
          value={formData.profile.bio}
          onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Qualifications</label>
        <Input
          type="text"
          value={formData.profile.qualifications}
          onChange={(e) => handleInputChange('profile', 'qualifications', e.target.value)}
        />
      </div>
    </div>
  );

  const renderAvailabilitySection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">Working Days</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {weekDays.map((day) => (
            <label key={day.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.availability.workingDays.includes(day.id)}
                onChange={() => handleArrayToggle('availability', 'workingDays', day.id)}
                className="rounded border-border focus:ring-primary"
              />
              <span className="text-sm text-text-primary">{day.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Start Time</label>
          <Input
            type="time"
            value={formData.availability.startTime}
            onChange={(e) => handleInputChange('availability', 'startTime', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">End Time</label>
          <Input
            type="time"
            value={formData.availability.endTime}
            onChange={(e) => handleInputChange('availability', 'endTime', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Break Start</label>
          <Input
            type="time"
            value={formData.availability.breakStart}
            onChange={(e) => handleInputChange('availability', 'breakStart', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Break End</label>
          <Input
            type="time"
            value={formData.availability.breakEnd}
            onChange={(e) => handleInputChange('availability', 'breakEnd', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Default Appointment Duration (minutes)
          </label>
          <select
            value={formData.availability.appointmentDuration}
            onChange={(e) =>
              handleInputChange('availability', 'appointmentDuration', parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Buffer Time Between Appointments (minutes)
          </label>
          <select
            value={formData.availability.bufferTime}
            onChange={(e) =>
              handleInputChange('availability', 'bufferTime', parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value={0}>No buffer</option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(formData.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="text-sm text-text-secondary">{getNotificationDescription(key)}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Timezone</label>
          <select
            value={formData.preferences.timezone}
            onChange={(e) => handleInputChange('preferences', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Date Format</label>
          <select
            value={formData.preferences.dateFormat}
            onChange={(e) => handleInputChange('preferences', 'dateFormat', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Time Format</label>
          <select
            value={formData.preferences.timeFormat}
            onChange={(e) => handleInputChange('preferences', 'timeFormat', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="12">12-hour (AM/PM)</option>
            <option value="24">24-hour</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Language</label>
          <select
            value={formData.preferences.language}
            onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <h4 className="font-medium text-text-primary">Auto-confirm Appointments</h4>
            <p className="text-sm text-text-secondary">
              Automatically confirm new appointments without manual review
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.preferences.autoConfirm}
              onChange={(e) => handleInputChange('preferences', 'autoConfirm', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <h4 className="font-medium text-text-primary">Allow Online Booking</h4>
            <p className="text-sm text-text-secondary">
              Enable patients to book appointments online through the patient portal
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.preferences.allowOnlineBooking}
              onChange={(e) =>
                handleInputChange('preferences', 'allowOnlineBooking', e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const getNotificationDescription = (key) => {
    const descriptions = {
      emailReminders: 'Send email reminders to patients before appointments',
      smsReminders: 'Send SMS reminders to patients before appointments',
      newBookings: 'Notify when new appointments are booked',
      cancellations: 'Notify when appointments are cancelled',
      patientMessages: 'Notify when patients send messages',
      dailySchedule: 'Receive daily schedule summary emails',
    };
    return descriptions[key] || '';
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'availability':
        return renderAvailabilitySection();
      case 'notifications':
        return renderNotificationsSection();
      case 'preferences':
        return renderPreferencesSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Settings Navigation */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="font-semibold text-text-primary mb-4">Settings</h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left clinical-transition ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary border-r-2 border-primary'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={section.icon} size={16} />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1">
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">
              {sections.find((s) => s.id === activeSection)?.label}
            </h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Reset
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>

          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
