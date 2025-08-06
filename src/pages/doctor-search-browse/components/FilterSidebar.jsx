import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    specialty: currentFilters.specialty || '',
    location: currentFilters.location || '',
    availability: currentFilters.availability || '',
    insurance: currentFilters.insurance || [],
    rating: currentFilters.rating || 0,
    gender: currentFilters.gender || '',
    languages: currentFilters.languages || [],
    consultationFee: currentFilters.consultationFee || [0, 500],
    telemedicine: currentFilters.telemedicine || false,
    sameDay: currentFilters.sameDay || false,
    verified: currentFilters.verified || false,
  });

  const specialties = [
    'Cardiology',
    'Dermatology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Neurology',
    'Oncology',
    'Gynecology',
    'Ophthalmology',
    'ENT',
    'General Practice',
  ];

  const insuranceProviders = [
    'Blue Cross Blue Shield',
    'Aetna',
    'Cigna',
    'UnitedHealth',
    'Humana',
    'Kaiser Permanente',
    'Medicare',
    'Medicaid',
  ];

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Korean',
    'Arabic',
  ];

  const availabilityOptions = [
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-week', label: 'This Week' },
    { value: 'next-week', label: 'Next Week' },
    { value: 'this-month', label: 'This Month' },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleArrayFilterToggle = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({
      specialty: '',
      location: '',
      availability: '',
      insurance: [],
      rating: 0,
      gender: '',
      languages: [],
      consultationFee: [0, 500],
      telemedicine: false,
      sameDay: false,
      verified: false,
    });
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => handleFilterChange('rating', i)}
          className={`p-1 ${i <= filters.rating ? 'text-warning' : 'text-secondary-300'}`}
        >
          <Icon name="Star" size={16} className={i <= filters.rating ? 'fill-current' : ''} />
        </button>
      );
    }
    return stars;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-surface border-r border-border transform clinical-transition lg:relative lg:translate-x-0 lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted clinical-transition lg:hidden"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Filter content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Specialty</label>
              <select
                value={filters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Location</label>
              <Input
                type="text"
                placeholder="Enter city or zip code"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Availability
              </label>
              <div className="space-y-2">
                {availabilityOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="availability"
                      value={option.value}
                      checked={filters.availability === option.value}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-secondary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Minimum Rating
              </label>
              <div className="flex items-center space-x-1">
                {getRatingStars(filters.rating)}
                <span className="ml-2 text-sm text-text-secondary">
                  {filters.rating > 0 ? `${filters.rating}+ stars` : 'Any rating'}
                </span>
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Gender Preference
              </label>
              <div className="space-y-2">
                {['Any', 'Male', 'Female'].map((gender) => (
                  <label key={gender} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value={gender === 'Any' ? '' : gender.toLowerCase()}
                      checked={filters.gender === (gender === 'Any' ? '' : gender.toLowerCase())}
                      onChange={(e) => handleFilterChange('gender', e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-secondary">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Insurance */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Insurance Accepted
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {insuranceProviders.map((provider) => (
                  <label key={provider} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.insurance.includes(provider)}
                      onChange={() => handleArrayFilterToggle('insurance', provider)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-secondary">{provider}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Languages Spoken
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {languages.map((language) => (
                  <label key={language} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.languages.includes(language)}
                      onChange={() => handleArrayFilterToggle('languages', language)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-secondary">{language}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Consultation Fee Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Consultation Fee Range
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">$0</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="25"
                    value={filters.consultationFee[1]}
                    onChange={(e) =>
                      handleFilterChange('consultationFee', [0, parseInt(e.target.value)])
                    }
                    className="flex-1"
                  />
                  <span className="text-sm text-text-secondary">$500+</span>
                </div>
                <div className="text-center text-sm text-text-primary font-medium">
                  Up to ${filters.consultationFee[1]}
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Additional Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.telemedicine}
                    onChange={(e) => handleFilterChange('telemedicine', e.target.checked)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">Telemedicine Available</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.sameDay}
                    onChange={(e) => handleFilterChange('sameDay', e.target.checked)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">Same Day Appointments</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => handleFilterChange('verified', e.target.checked)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">Verified Doctors Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleClearFilters} className="flex-1">
                Clear All
              </Button>
              <Button variant="primary" onClick={handleApplyFilters} className="flex-1">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
