import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ onSearch, onLocationToggle, currentLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState(currentLocation || '');

  const handleSearch = () => {
    onSearch({
      query: searchQuery,
      location: locationQuery,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationQuery('Current Location');
          onLocationToggle(position.coords);
        },
        (error) => {
          console.error('Location detection failed:', error);
        }
      );
    }
  };

  return (
    <div className="bg-surface border-b border-border sticky top-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={20} className="text-text-muted" />
            </div>
            <Input
              type="text"
              placeholder="Search doctors, specialties, or conditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4"
            />
          </div>

          {/* Location Input */}
          <div className="flex-1 sm:flex-none sm:w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="MapPin" size={20} className="text-text-muted" />
            </div>
            <Input
              type="text"
              placeholder="Enter location or zip code"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-10"
            />
            <button
              onClick={detectLocation}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary hover:text-primary-700 clinical-transition"
              aria-label="Detect current location"
            >
              <Icon name="Crosshair" size={16} />
            </button>
          </div>

          {/* Search Button */}
          <Button variant="primary" onClick={handleSearch} iconName="Search" className="sm:w-auto">
            <span className="sm:hidden">Search</span>
            <span className="hidden sm:inline">Find Doctors</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
