import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, resultCount }) => {
  const filterTypes = {
    specialty: { icon: 'Stethoscope', label: 'Specialty' },
    location: { icon: 'MapPin', label: 'Location' },
    availability: { icon: 'Calendar', label: 'Availability' },
    insurance: { icon: 'Shield', label: 'Insurance' },
    rating: { icon: 'Star', label: 'Rating' },
    gender: { icon: 'User', label: 'Gender' },
    language: { icon: 'Globe', label: 'Language' },
  };

  if (activeFilters.length === 0) return null;

  return (
    <div className="bg-muted border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-text-secondary">
            {resultCount} doctors found
          </span>
          <div className="w-px h-4 bg-border mx-2" />

          {activeFilters.map((filter, index) => {
            const filterConfig = filterTypes[filter.type] || { icon: 'Filter', label: filter.type };
            return (
              <div
                key={index}
                className="inline-flex items-center space-x-2 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm"
              >
                <Icon name={filterConfig.icon} size={14} />
                <span className="font-medium">{filterConfig.label}:</span>
                <span>{filter.value}</span>
                <button
                  onClick={() => onRemoveFilter(filter)}
                  className="ml-1 hover:bg-primary-100 rounded-full p-0.5 clinical-transition"
                  aria-label={`Remove ${filter.value} filter`}
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            );
          })}

          {activeFilters.length > 1 && (
            <button
              onClick={() => onRemoveFilter('all')}
              className="text-sm text-text-secondary hover:text-primary clinical-transition underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
