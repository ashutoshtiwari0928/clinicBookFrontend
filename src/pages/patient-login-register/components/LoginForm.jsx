import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import axios from 'axios';

const LoginForm = ({ successMessageShown, onMessageShown }) => {
  useEffect(() => {
    if (successMessageShown) {
      const timer = setTimeout(() => {
        onMessageShown();
      }, 3000);
      return () => clearTimeout(timer);
    }
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
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

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);
    const basicAuth = 'Basic ' + btoa(formData.emailOrPhone + ':' + formData.password);

    // Simulate API call
    const headers = new Headers();
    headers.append('Authorization', basicAuth);
    const requestBody = {
      email: formData.emailOrPhone,
      password: formData.password,
    };
    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:8089/login/verifyEmail', requestBody);
        console.log(response.data);
        localStorage.setItem('token', response.data);
        if (response.status === 200) {
          // Success - redirect to patient dashboard
          navigate(`/patient-dashboard/${requestBody.email}`);
        } else {
          setErrors({
            general: 'Invalid credentials. Try forgot password.',
          });
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Handle forgot password logic
  };

  return (
    <div>
      {successMessageShown && (
        <div className="success-nessage">Account created successfully! You can now login.</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="bg-error-50 border border-error-200 rounded-md p-3">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{errors.general}</span>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email or Phone Number
          </label>
          <Input
            type="text"
            placeholder="Enter your email or phone"
            value={formData.emailOrPhone}
            onChange={(e) => handleInputChange('emailOrPhone', e.target.value)}
            className={errors.emailOrPhone ? 'border-error' : ''}
          />
          {errors.emailOrPhone && <p className="mt-1 text-sm text-error">{errors.emailOrPhone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={errors.password ? 'border-error' : ''}
          />
          {errors.password && <p className="mt-1 text-sm text-error">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-secondary">Remember me</span>
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary-700 clinical-transition"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" variant="primary" fullWidth loading={isLoading} disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
