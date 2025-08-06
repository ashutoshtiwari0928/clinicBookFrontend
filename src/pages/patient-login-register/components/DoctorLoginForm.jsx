import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DoctorLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    // Mock login logic
    setTimeout(() => {
      setIsLoading(false);
      navigate('/provider-dashboard');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Doctor Email</label>
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
      <Button type="submit" variant="primary" fullWidth loading={isLoading} disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In as Doctor'}
      </Button>
    </form>
  );
};

export default DoctorLoginForm;
