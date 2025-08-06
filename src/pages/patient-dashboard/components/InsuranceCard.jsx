import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsuranceCard = ({ insuranceInfo, onVerify, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      Active: 'text-success bg-success-50 border-success-200',
      Expired: 'text-error bg-error-50 border-error-200',
      Pending: 'text-warning bg-warning-50 border-warning-200',
      Inactive: 'text-secondary bg-secondary-50 border-secondary-200',
    };
    return colors[status] || colors.Inactive;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCoveragePercentage = (coverage) => {
    const percentage = (coverage.used / coverage.limit) * 100;
    return Math.min(percentage, 100);
  };

  const getCoverageColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow mb-6">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">Insurance Information</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          />
        </div>
      </div>

      <div className="p-4">
        {/* Primary Insurance Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="font-semibold text-text-primary">{insuranceInfo.provider}</h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(insuranceInfo.status)}`}
              >
                {insuranceInfo.status}
              </span>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-text-secondary">Policy Number:</span>
                <span className="font-data text-text-primary">{insuranceInfo.policyNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-text-secondary">Group Number:</span>
                <span className="font-data text-text-primary">{insuranceInfo.groupNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-text-secondary">Valid Until:</span>
                <span className="text-text-primary">{formatDate(insuranceInfo.validUntil)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 ml-4">
            <Button variant="outline" size="sm" onClick={onVerify} iconName="CheckCircle">
              Verify
            </Button>
            <Button variant="ghost" size="sm" onClick={onUpdate} iconName="Edit">
              Update
            </Button>
          </div>
        </div>

        {/* Coverage Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Deductible</span>
              <Icon name="DollarSign" size={16} className="text-text-muted" />
            </div>
            <div className="space-y-1">
              <div className="text-lg font-data font-semibold text-text-primary">
                ${insuranceInfo.deductible.used.toLocaleString()} / $
                {insuranceInfo.deductible.limit.toLocaleString()}
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getCoverageColor(getCoveragePercentage(insuranceInfo.deductible))}`}
                  style={{ width: `${getCoveragePercentage(insuranceInfo.deductible)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Out-of-Pocket</span>
              <Icon name="Wallet" size={16} className="text-text-muted" />
            </div>
            <div className="space-y-1">
              <div className="text-lg font-data font-semibold text-text-primary">
                ${insuranceInfo.outOfPocket.used.toLocaleString()} / $
                {insuranceInfo.outOfPocket.limit.toLocaleString()}
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getCoverageColor(getCoveragePercentage(insuranceInfo.outOfPocket))}`}
                  style={{ width: `${getCoveragePercentage(insuranceInfo.outOfPocket)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Copay</span>
              <Icon name="CreditCard" size={16} className="text-text-muted" />
            </div>
            <div className="text-lg font-data font-semibold text-text-primary">
              ${insuranceInfo.copay}
            </div>
            <div className="text-xs text-text-secondary">Per visit</div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coverage Details */}
              <div>
                <h4 className="font-medium text-text-primary mb-3">Coverage Details</h4>
                <div className="space-y-2 text-sm">
                  {insuranceInfo.coverage.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-text-secondary">{item.service}</span>
                      <span className="text-text-primary font-medium">{item.coverage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Claims */}
              <div>
                <h4 className="font-medium text-text-primary mb-3">Recent Claims</h4>
                <div className="space-y-2">
                  {insuranceInfo.recentClaims.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-text-primary">{claim.service}</p>
                        <p className="text-text-muted">{formatDate(claim.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-data text-text-primary">${claim.amount}</p>
                        <p
                          className={`text-xs ${claim.status === 'Approved' ? 'text-success' : claim.status === 'Denied' ? 'text-error' : 'text-warning'}`}
                        >
                          {claim.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceCard;
