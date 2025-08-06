import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PatientsTab = ({ patients, onPatientAction, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  const statusOptions = [
    { value: 'all', label: 'All Patients' },
    { value: 'upcoming', label: 'Upcoming Appointments' },
    { value: 'pending', label: 'Pending Confirmation' },
    { value: 'completed', label: 'Completed Visits' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectPatient = (patientId) => {
    setSelectedPatients((prev) =>
      prev.includes(patientId) ? prev.filter((id) => id !== patientId) : [...prev, patientId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPatients(
      selectedPatients.length === filteredPatients.length ? [] : filteredPatients.map((p) => p.id)
    );
  };

  const getStatusBadge = (status) => {
    const configs = {
      upcoming: { color: 'bg-primary-100 text-primary-800', icon: 'Calendar' },
      pending: { color: 'bg-warning-100 text-warning-800', icon: 'Clock' },
      completed: { color: 'bg-success-100 text-success-800', icon: 'CheckCircle' },
      cancelled: { color: 'bg-error-100 text-error-800', icon: 'XCircle' },
    };
    const config = configs[status] || configs.pending;

    return (
      <span
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon name={config.icon} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            />
            <Input
              type="search"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="primary" size="sm" iconName="Plus">
            Add Patient
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPatients.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {selectedPatients.length} patient{selectedPatients.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Mail"
                onClick={() => onBulkAction('send-reminder', selectedPatients)}
              >
                Send Reminder
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="CheckCircle"
                onClick={() => onBulkAction('confirm', selectedPatients)}
              >
                Confirm All
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                onClick={() => onBulkAction('reschedule', selectedPatients)}
              >
                Reschedule
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Patients List */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border bg-muted">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">
              Patients ({filteredPatients.length})
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={
                  selectedPatients.length === filteredPatients.length && filteredPatients.length > 0
                }
                onChange={handleSelectAll}
                className="rounded border-border focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">Select All</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border max-h-96 overflow-y-auto">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="p-4 hover:bg-muted/50 clinical-transition">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedPatients.includes(patient.id)}
                  onChange={() => handleSelectPatient(patient.id)}
                  className="rounded border-border focus:ring-primary"
                />

                <div className="w-10 h-10 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-text-secondary" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">{patient.name}</h4>
                      <p className="text-sm text-text-secondary">{patient.email}</p>
                      <p className="text-sm text-text-secondary">{patient.phone}</p>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">{getStatusBadge(patient.status)}</div>
                      <p className="text-sm text-text-secondary">
                        Next: {patient.nextAppointment || 'No upcoming appointments'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>Age: {patient.age}</span>
                      <span>Last Visit: {patient.lastVisit}</span>
                      <span>Total Visits: {patient.totalVisits}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onPatientAction('view', patient.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MessageSquare"
                        onClick={() => onPatientAction('message', patient.id)}
                      >
                        Message
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Calendar"
                        onClick={() => onPatientAction('schedule', patient.id)}
                      >
                        Schedule
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreVertical"
                        onClick={() => onPatientAction('menu', patient.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsTab;
