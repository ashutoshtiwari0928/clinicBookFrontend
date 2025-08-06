import React, { useRef } from 'react';
import Icon from '../../../components/AppIcon';

const SpecialtyCategories = ({ onSpecialtySelect, selectedSpecialty }) => {
  const scrollRef = useRef(null);

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: 'Stethoscope' },
    { id: 'cardiology', name: 'Cardiology', icon: 'Heart' },
    { id: 'dermatology', name: 'Dermatology', icon: 'Sparkles' },
    { id: 'orthopedics', name: 'Orthopedics', icon: 'Bone' },
    { id: 'pediatrics', name: 'Pediatrics', icon: 'Baby' },
    { id: 'psychiatry', name: 'Psychiatry', icon: 'Brain' },
    { id: 'neurology', name: 'Neurology', icon: 'Zap' },
    { id: 'oncology', name: 'Oncology', icon: 'Shield' },
    { id: 'gynecology', name: 'Gynecology', icon: 'User' },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: 'Eye' },
    { id: 'ent', name: 'ENT', icon: 'Ear' },
    { id: 'general', name: 'General Practice', icon: 'UserCheck' },
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 200;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow-md clinical-transition"
            aria-label="Scroll left"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow-md clinical-transition"
            aria-label="Scroll right"
          >
            <Icon name="ChevronRight" size={16} />
          </button>

          {/* Scrollable categories */}
          <div
            ref={scrollRef}
            className="flex space-x-3 overflow-x-auto scrollbar-hide px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => onSpecialtySelect(specialty.id)}
                className={`flex-shrink-0 flex flex-col items-center space-y-2 p-3 rounded-lg border clinical-transition ${
                  selectedSpecialty === specialty.id
                    ? 'border-primary bg-primary-50 text-primary'
                    : 'border-border hover:border-primary-200 hover:bg-muted'
                }`}
              >
                <Icon name={specialty.icon} size={24} />
                <span className="text-xs font-medium whitespace-nowrap">{specialty.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialtyCategories;
