import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ProviderScheduleOverview = ({ className = '' }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments] = useState([
    {
      id: 1,
      time: '09:00 AM',
      patient: 'John Smith',
      type: 'Consultation',
      status: 'confirmed',
      duration: 30,
    },
    {
      id: 2,
      time: '10:30 AM',
      patient: 'Sarah Johnson',
      type: 'Follow-up',
      status: 'pending',
      duration: 15,
    },
    {
      id: 3,
      time: '02:00 PM',
      patient: 'Michael Brown',
      type: 'Check-up',
      status: 'confirmed',
      duration: 45,
    },
    {
      id: 4,
      time: '03:30 PM',
      patient: 'Available Slot',
      type: 'open',
      status: 'available',
      duration: 30,
    },
  ]);

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: {
        color: 'text-success',
        bgColor: 'bg-success-50',
        borderColor: 'border-success-200',
        icon: 'CheckCircle',
      },
      pending: {
        color: 'text-warning',
        bgColor: 'bg-warning-50',
        borderColor: 'border-warning-200',
        icon: 'Clock',
      },
      available: {
        color: 'text-text-muted',
        bgColor: 'bg-muted',
        borderColor: 'border-border',
        icon: 'Plus',
      },
      cancelled: {
        color: 'text-error',
        bgColor: 'bg-error-50',
        borderColor: 'border-error-200',
        icon: 'XCircle',
      },
    };
    return configs[status] || configs.pending;
  };

  const handleAppointmentClick = (appointment) => {
    if (appointment.status === 'available') {
      // Handle booking new appointment
      console.log('Book new appointment at:', appointment.time);
    } else {
      // Handle viewing/editing existing appointment
      console.log('View appointment:', appointment.id);
    }
  };

  const handleReschedule = (appointmentId, e) => {
    e.stopPropagation();
    console.log('Reschedule appointment:', appointmentId);
  };

  const todayStats = {
    total: appointments.filter((apt) => apt.status !== 'available').length,
    confirmed: appointments.filter((apt) => apt.status === 'confirmed').length,
    pending: appointments.filter((apt) => apt.status === 'pending').length,
    available: appointments.filter((apt) => apt.status === 'available').length,
  };

  return (
    <div className={`bg-surface border border-border rounded-lg clinical-shadow ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">Today's Schedule</h3>
          <Button variant="ghost" size="sm" iconName="Calendar">
            View Full Calendar
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-lg font-data font-semibold text-text-primary">
              {todayStats.total}
            </div>
            <div className="text-xs text-text-secondary">Total</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-data font-semibold text-success">
              {todayStats.confirmed}
            </div>
            <div className="text-xs text-text-secondary">Confirmed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-data font-semibold text-warning">{todayStats.pending}</div>
            <div className="text-xs text-text-secondary">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-data font-semibold text-text-muted">
              {todayStats.available}
            </div>
            <div className="text-xs text-text-secondary">Available</div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="p-4">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {appointments.map((appointment) => {
            const config = getStatusConfig(appointment.status);
            return (
              <button
                key={appointment.id}
                onClick={() => handleAppointmentClick(appointment)}
                className={`w-full flex items-center space-x-3 p-3 rounded-md border clinical-transition hover:shadow-sm ${config.bgColor} ${config.borderColor}`}
              >
                <div className="flex-shrink-0">
                  <Icon name={config.icon} size={16} className={config.color} />
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-data text-sm font-medium text-text-primary">
                      {appointment.time}
                    </span>
                    <span className="text-xs text-text-secondary">{appointment.duration}min</span>
                  </div>
                  <div className="text-sm text-text-primary font-medium">{appointment.patient}</div>
                  <div className="text-xs text-text-secondary">{appointment.type}</div>
                </div>

                {appointment.status !== 'available' && (
                  <div className="flex-shrink-0">
                    <button
                      onClick={(e) => handleReschedule(appointment.id, e)}
                      className="p-1 rounded-md text-text-muted hover:text-primary hover:bg-primary-50 clinical-transition"
                      aria-label="Reschedule appointment"
                    >
                      <Icon name="Edit" size={14} />
                    </button>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" iconName="Plus" fullWidth>
            Add Slot
          </Button>
          <Button variant="outline" size="sm" iconName="Clock" fullWidth>
            Break Time
          </Button>
        </div>
      </div>

      {/* Next Appointment Alert */}
      <div className="p-4 border-t border-border bg-primary-50">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={16} className="text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium text-primary">Next appointment in 15 minutes</p>
            <p className="text-xs text-primary-700">John Smith - Room 3</p>
          </div>
          <Button variant="primary" size="sm">
            Notify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderScheduleOverview;
