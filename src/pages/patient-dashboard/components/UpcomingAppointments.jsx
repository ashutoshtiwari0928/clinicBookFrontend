import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingAppointments = ({ appointments, onReschedule, onCancel, onViewAll }) => {
  const getAppointmentTypeColor = (type) => {
    const colors = {
      Consultation: 'text-primary bg-primary-50 border-primary-200',
      'Follow-up': 'text-success bg-success-50 border-success-200',
      'Check-up': 'text-warning bg-warning-50 border-warning-200',
      Emergency: 'text-error bg-error-50 border-error-200',
    };
    return colors[type] || 'text-secondary bg-secondary-50 border-secondary-200';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Upcoming Appointments</h2>
          <Button variant="ghost" size="sm" onClick={onViewAll} iconName="ArrowRight">
            View All
          </Button>
        </div>
      </div>

      <div className="p-4">
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-border rounded-lg p-4 clinical-transition hover:shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-data text-lg font-semibold text-text-primary">
                        {formatTime(appointment.time)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getAppointmentTypeColor(appointment.type)}`}
                      >
                        {appointment.type}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-1">
                      {formatDate(appointment.date)}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-text-primary">
                      <Icon name="User" size={16} />
                      <span className="font-medium">{appointment.doctor}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary mt-1">
                      <Icon name="MapPin" size={16} />
                      <span>{appointment.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReschedule(appointment.id)}
                      iconName="Calendar"
                    >
                      Reschedule
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCancel(appointment.id)}
                      iconName="X"
                      className="text-error hover:text-error hover:bg-error-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm text-text-secondary">{appointment.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary mb-4">No upcoming appointments</p>
            <Button variant="primary" iconName="Plus">
              Book Appointment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
