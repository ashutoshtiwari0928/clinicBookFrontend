import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InsuranceVerification = ({ onVerificationComplete }) => {
  const [insuranceData, setInsuranceData] = useState({
    provider: '',
    policyNumber: '',
    groupNumber: '',
    memberName: '',
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const insuranceProviders = [
    'Blue Cross Blue Shield',
    'Aetna',
    'Cigna',
    'UnitedHealthcare',
    'Humana',
    'Kaiser Permanente',
    'Anthem',
    'Other',
  ];

  const handleInputChange = (field, value) => {
    setInsuranceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVerification = async () => {
    setIsVerifying(true);

    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        isValid: true,
        coverage: 'Active',
        copay: 25,
        deductible: 500,
        deductibleMet: 200,
        coveragePercentage: 80,
        benefits: [
          'Preventive care covered 100%',
          'Specialist visits covered 80%',
          'Prescription drugs covered 70%',
          'Diagnostic tests covered 90%',
        ],
      };

      setVerificationResult(mockResult);
      setIsVerifying(false);
      onVerificationComplete(mockResult);
    }, 2000);
  };

  const isFormValid =
    insuranceData.provider && insuranceData.policyNumber && insuranceData.memberName;

  if (verificationResult) {
    return (
      <div className="bg-surface border border-border rounded-lg clinical-shadow">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-success" />
            <h3 className="text-lg font-semibold text-text-primary">Insurance Verified</h3>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Coverage Status */}
          <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="font-medium text-success">Coverage Active</span>
            </div>
            <span className="text-sm text-success">{insuranceData.provider}</span>
          </div>

          {/* Cost Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-data text-lg font-semibold text-text-primary">
                ${verificationResult.copay}
              </div>
              <div className="text-xs text-text-secondary">Your Copay</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-data text-lg font-semibold text-text-primary">
                {verificationResult.coveragePercentage}%
              </div>
              <div className="text-xs text-text-secondary">Coverage</div>
            </div>
          </div>

          {/* Deductible Information */}
          <div className="p-3 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Annual Deductible</span>
              <span className="text-sm text-text-secondary">
                ${verificationResult.deductibleMet} / ${verificationResult.deductible}
              </span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{
                  width: `${(verificationResult.deductibleMet / verificationResult.deductible) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-medium text-text-primary mb-2">Covered Benefits</h4>
            <div className="space-y-1">
              {verificationResult.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setVerificationResult(null);
                setShowForm(true);
              }}
              iconName="Edit"
            >
              Edit Insurance
            </Button>
            <Button variant="ghost" size="sm" iconName="Download">
              Download Summary
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Insurance Verification</h3>
          </div>
          {!showForm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowForm(!showForm)}
              iconName={showForm ? 'X' : 'Plus'}
            >
              {showForm ? 'Cancel' : 'Add Insurance'}
            </Button>
          )}
        </div>
      </div>

      <div className="p-4">
        {!showForm ? (
          <div className="text-center py-6">
            <Icon name="Shield" size={48} className="text-text-muted mx-auto mb-3" />
            <h4 className="font-medium text-text-primary mb-2">Verify Your Insurance</h4>
            <p className="text-sm text-text-secondary mb-4">
              Check your coverage and get accurate cost estimates for your appointment.
            </p>
            <Button variant="primary" onClick={() => setShowForm(true)} iconName="Shield">
              Verify Insurance
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Insurance Provider */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Insurance Provider
              </label>
              <select
                value={insuranceData.provider}
                onChange={(e) => handleInputChange('provider', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition"
              >
                <option value="">Select your insurance provider</option>
                {insuranceProviders.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
            </div>

            {/* Policy Number */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Policy Number
              </label>
              <Input
                type="text"
                placeholder="Enter your policy number"
                value={insuranceData.policyNumber}
                onChange={(e) => handleInputChange('policyNumber', e.target.value)}
              />
            </div>

            {/* Group Number */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Group Number (Optional)
              </label>
              <Input
                type="text"
                placeholder="Enter group number if applicable"
                value={insuranceData.groupNumber}
                onChange={(e) => handleInputChange('groupNumber', e.target.value)}
              />
            </div>

            {/* Member Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Member Name
              </label>
              <Input
                type="text"
                placeholder="Name as it appears on insurance card"
                value={insuranceData.memberName}
                onChange={(e) => handleInputChange('memberName', e.target.value)}
              />
            </div>

            {/* Verification Button */}
            <Button
              variant="primary"
              fullWidth
              onClick={handleVerification}
              disabled={!isFormValid || isVerifying}
              loading={isVerifying}
              iconName="Shield"
            >
              {isVerifying ? 'Verifying Coverage...' : 'Verify Insurance'}
            </Button>

            {/* Disclaimer */}
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-text-muted flex-shrink-0 mt-0.5" />
                <div className="text-xs text-text-secondary">
                  <p className="mb-1">
                    Insurance verification is provided for estimation purposes only.
                  </p>
                  <p>
                    Final coverage and costs may vary based on your specific plan details and
                    provider network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceVerification;
