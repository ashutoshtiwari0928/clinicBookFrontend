import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import LoginForm from './LoginForm';
import AuthTabs from './AuthTabs';
import { initializeApp } from 'firebase/app';

const RegisterForm = ({ onSuccessfulRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    role: 'PATIENT', // 'patient' or 'doctor'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // sending a post request using formData to store the data in database
    try {
      const response = null;
      if (formData.role === 'PATIENT') {
        response = await axios.post('http://localhost:8089/api/patients/register', formData);
      } else {
        response = await axios.post('http://localhost:8089/api/doctors/register', formData);
      }
      console.log('Response: ', response.data);
      setTimeout(() => {
        // Success - redirect to patient dashboard
        onSuccessfulRegister();
        setIsLoading(false);
      }, 1500);
    } catch (e) {
      console.log(e);
    }
    // Simulate API call
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role Selection */}
      <div className="flex items-center justify-center gap-6 mb-2">
        <label
          className={`flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg border ${formData.role === 'patient' ? 'border-primary bg-primary-50 text-primary' : 'border-border bg-surface text-text-secondary'} clinical-transition`}
        >
          <input
            type="radio"
            name="role"
            value="patient"
            checked={formData.role === 'PATIENT'}
            onChange={() => handleInputChange('role', 'PATIENT')}
            className="accent-primary"
          />
          <span>Register as Patient</span>
        </label>
        <label
          className={`flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg border ${formData.role === 'doctor' ? 'border-primary bg-primary-50 text-primary' : 'border-border bg-surface text-text-secondary'} clinical-transition`}
        >
          <input
            type="radio"
            name="role"
            value="doctor"
            checked={formData.role === 'DOCTOR'}
            onChange={() => handleInputChange('role', 'DOCTOR')}
            className="accent-primary"
          />
          <span>Register as Doctor</span>
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">First Name</label>
          <Input
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={errors.firstName ? 'border-error' : ''}
          />
          {errors.firstName && <p className="mt-1 text-sm text-error">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Last Name</label>
          <Input
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={errors.lastName ? 'border-error' : ''}
          />
          {errors.lastName && <p className="mt-1 text-sm text-error">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
        <Input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={errors.email ? 'border-error' : ''}
        />
        {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
        <Input
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={errors.phone ? 'border-error' : ''}
        />
        {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Date of Birth</label>
        <Input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className={errors.dateOfBirth ? 'border-error' : ''}
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.dateOfBirth && <p className="mt-1 text-sm text-error">{errors.dateOfBirth}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
        <Input
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className={errors.password ? 'border-error' : ''}
        />
        {errors.password && <p className="mt-1 text-sm text-error">{errors.password}</p>}
        <p className="mt-1 text-xs text-text-secondary">
          Password must be at least 8 characters long
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Confirm Password</label>
        <Input
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className={errors.confirmPassword ? 'border-error' : ''}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label className="flex items-start space-x-3">
          <Input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            className="w-4 h-4 mt-0.5"
          />
          <span className="text-sm text-text-secondary">
            I agree to the{' '}
            <button
              type="button"
              className="text-primary hover:text-primary-700 clinical-transition"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button
              type="button"
              className="text-primary hover:text-primary-700 clinical-transition"
            >
              Privacy Policy
            </button>
          </span>
        </label>
        {errors.agreeToTerms && <p className="mt-1 text-sm text-error">{errors.agreeToTerms}</p>}
      </div>

      <Button type="submit" variant="primary" fullWidth loading={isLoading} disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;
