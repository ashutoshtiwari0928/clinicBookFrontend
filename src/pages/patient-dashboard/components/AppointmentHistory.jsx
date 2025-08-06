import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AppointmentHistory = ({ appointments, onLoadMore, hasMore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const appointmentTypes = ['all', 'Consultation', 'Follow-up', 'Check-up', 'Emergency'];
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' },
    { value: '3months', label: 'Past 3 Months' },
    { value: 'year', label: 'Past Year' },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || appointment.type === filterType;

    // Simple date filtering (in real app, would use proper date logic)
    const matchesDate = dateRange === 'all' || true; // Simplified for demo

    return matchesSearch && matchesType && matchesDate;
  });

  const getStatusColor = (status) => {
    const colors = {
      Completed: 'text-success bg-success-50 border-success-200',
      Cancelled: 'text-error bg-error-50 border-error-200',
      'No-show': 'text-warning bg-warning-50 border-warning-200',
      Rescheduled: 'text-primary bg-primary-50 border-primary-200',
    };
    return colors[status] || 'text-secondary bg-secondary-50 border-secondary-200';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
        <h2 className="text-lg font-semibold text-text-primary mb-4">Appointment History</h2>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            />
            <Input
              type="search"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition"
            >
              {appointmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-4">
        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-border rounded-lg p-4 clinical-transition hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-data text-sm font-medium text-text-primary">
                        {formatDate(appointment.date)} at {formatTime(appointment.time)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(appointment.status)}`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="User" size={16} className="text-text-muted" />
                        <span className="font-medium text-text-primary">{appointment.doctor}</span>
                        <span className="text-text-secondary">• {appointment.type}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="MapPin" size={16} className="text-text-muted" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-2 p-2 bg-muted rounded-md">
                        <p className="text-sm text-text-secondary">{appointment.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="text-center pt-4">
                <Button variant="outline" onClick={onLoadMore} iconName="ChevronDown">
                  Load More Appointments
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary mb-2">No appointments found</p>
            <p className="text-sm text-text-muted">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
