import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicalSummaryCards = ({ prescriptions, testResults, healthReminders }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (cardType) => {
    setExpandedCard(expandedCard === cardType ? null : cardType);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: 'text-error bg-error-50 border-error-200',
      Medium: 'text-warning bg-warning-50 border-warning-200',
      Low: 'text-success bg-success-50 border-success-200',
    };
    return colors[priority] || 'text-secondary bg-secondary-50 border-secondary-200';
  };

  const getStatusColor = (status) => {
    const colors = {
      Normal: 'text-success',
      Abnormal: 'text-error',
      Pending: 'text-warning',
      Active: 'text-primary',
      Completed: 'text-success',
    };
    return colors[status] || 'text-secondary';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Recent Prescriptions */}
      <div className="bg-surface border border-border rounded-lg clinical-shadow">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Pill" size={20} className="text-primary" />
              <h3 className="font-semibold text-text-primary">Prescriptions</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCard('prescriptions')}
              iconName={expandedCard === 'prescriptions' ? 'ChevronUp' : 'ChevronDown'}
            />
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {prescriptions
              .slice(0, expandedCard === 'prescriptions' ? prescriptions.length : 2)
              .map((prescription) => (
                <div key={prescription.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-text-primary text-sm">
                      {prescription.medication}
                    </p>
                    <p className="text-xs text-text-secondary">{prescription.dosage}</p>
                    <p className="text-xs text-text-muted">
                      Prescribed: {formatDate(prescription.date)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(prescription.status)}`}
                  >
                    {prescription.status}
                  </span>
                </div>
              ))}
          </div>

          {prescriptions.length > 2 && expandedCard !== 'prescriptions' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCard('prescriptions')}
              className="w-full mt-3"
            >
              View {prescriptions.length - 2} more
            </Button>
          )}
        </div>
      </div>

      {/* Test Results */}
      <div className="bg-surface border border-border rounded-lg clinical-shadow">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={20} className="text-success" />
              <h3 className="font-semibold text-text-primary">Test Results</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCard('testResults')}
              iconName={expandedCard === 'testResults' ? 'ChevronUp' : 'ChevronDown'}
            />
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {testResults
              .slice(0, expandedCard === 'testResults' ? testResults.length : 2)
              .map((result) => (
                <div key={result.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-text-primary text-sm">{result.testName}</p>
                    <p className="text-xs text-text-secondary">{result.value}</p>
                    <p className="text-xs text-text-muted">Date: {formatDate(result.date)}</p>
                  </div>
                  <span className={`text-xs font-medium ${getStatusColor(result.status)}`}>
                    {result.status}
                  </span>
                </div>
              ))}
          </div>

          {testResults.length > 2 && expandedCard !== 'testResults' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCard('testResults')}
              className="w-full mt-3"
            >
              View {testResults.length - 2} more
            </Button>
          )}
        </div>
      </div>

      {/* Health Reminders */}
      <div className="bg-surface border border-border rounded-lg clinical-shadow">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={20} className="text-warning" />
              <h3 className="font-semibold text-text-primary">Health Reminders</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCard('healthReminders')}
              iconName={expandedCard === 'healthReminders' ? 'ChevronUp' : 'ChevronDown'}
            />
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {healthReminders
              .slice(0, expandedCard === 'healthReminders' ? healthReminders.length : 2)
              .map((reminder) => (
                <div key={reminder.id} className="flex items-start space-x-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(reminder.priority)}`}
                  >
                    {reminder.priority}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary text-sm">{reminder.title}</p>
                    <p className="text-xs text-text-secondary">{reminder.description}</p>
                    <p className="text-xs text-text-muted">Due: {formatDate(reminder.dueDate)}</p>
                  </div>
                </div>
              ))}
          </div>

          {healthReminders.length > 2 && expandedCard !== 'healthReminders' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCard('healthReminders')}
              className="w-full mt-3"
            >
              View {healthReminders.length - 2} more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalSummaryCards;
