import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortControls = ({ onSortChange, onViewToggle, currentView, resultCount }) => {
  const [sortBy, setSortBy] = useState('relevance');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'distance', label: 'Distance', icon: 'MapPin' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'availability', label: 'Soonest Available', icon: 'Calendar' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'DollarSign' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'DollarSign' },
    { value: 'experience', label: 'Most Experienced', icon: 'Award' },
    { value: 'reviews', label: 'Most Reviews', icon: 'MessageSquare' },
  ];

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
    setIsDropdownOpen(false);
  };

  const currentSortOption = sortOptions.find((option) => option.value === sortBy);

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Results count and sort */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">{resultCount} doctors found</span>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 border border-border rounded-md hover:border-primary-200 clinical-transition"
              >
                <Icon name={currentSortOption.icon} size={16} className="text-text-muted" />
                <span className="text-sm font-medium text-text-primary">
                  Sort: {currentSortOption.label}
                </span>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`text-text-muted clinical-transition ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-surface border border-border rounded-md clinical-shadow z-50">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted clinical-transition ${
                          sortBy === option.value
                            ? 'text-primary bg-primary-50'
                            : 'text-text-secondary'
                        }`}
                      >
                        <Icon name={option.icon} size={16} />
                        <span>{option.label}</span>
                        {sortBy === option.value && (
                          <Icon name="Check" size={16} className="ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* View toggle and actions */}
          <div className="flex items-center space-x-3">
            {/* View toggle */}
            <div className="flex items-center border border-border rounded-md overflow-hidden">
              <button
                onClick={() => onViewToggle('list')}
                className={`px-3 py-2 text-sm clinical-transition ${
                  currentView === 'list'
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
                aria-label="List view"
              >
                <Icon name="List" size={16} />
              </button>
              <button
                onClick={() => onViewToggle('map')}
                className={`px-3 py-2 text-sm clinical-transition ${
                  currentView === 'map'
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
                aria-label="Map view"
              >
                <Icon name="Map" size={16} />
              </button>
            </div>

            {/* Save search */}
            <Button variant="ghost" size="sm" iconName="Bookmark">
              <span className="hidden sm:inline">Save Search</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
      )}
    </div>
  );
};

export default SortControls;
