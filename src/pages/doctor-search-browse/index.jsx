import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchHeader from './components/SearchHeader';
import FilterChips from './components/FilterChips';
import SpecialtyCategories from './components/SpecialtyCategories';
import SortControls from './components/SortControls';
import FilterSidebar from './components/FilterSidebar';
import DoctorCard from './components/DoctorCard';
import MapView from './components/MapView';
import QuickBookModal from './components/QuickBookModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const DoctorSearchBrowse = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('New York, NY');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentView, setCurrentView] = useState('list');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isQuickBookModalOpen, setIsQuickBookModalOpen] = useState(false);
  const [quickBookDoctor, setQuickBookDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock doctors data
  const [doctors] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Cardiology',
      photo:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 127,
      experience: 15,
      location: 'Manhattan Medical Center',
      distance: '0.8 miles',
      nextAvailable: 'Today 2:30 PM',
      consultationFee: 250,
      acceptsInsurance: true,
      languages: ['English', 'Spanish'],
      hospitals: ['Manhattan Medical Center', 'NYU Langone'],
      isVerified: true,
      telemedicine: true,
      sameDay: true,
      isOnline: true,
      isFavorited: false,
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Dermatology',
      photo:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 203,
      experience: 12,
      location: 'Skin Health Clinic',
      distance: '1.2 miles',
      nextAvailable: 'Tomorrow 10:00 AM',
      consultationFee: 200,
      acceptsInsurance: true,
      languages: ['English', 'Chinese'],
      hospitals: ['Skin Health Clinic'],
      isVerified: true,
      telemedicine: false,
      sameDay: false,
      isOnline: false,
      isFavorited: true,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      specialty: 'Pediatrics',
      photo:
        'https://images.unsplash.com/photo-1594824475317-29bb4b8b2b8e?w=400&h=400&fit=crop&crop=face',
      rating: 4.7,
      reviewCount: 89,
      experience: 8,
      location: "Children's Health Center",
      distance: '2.1 miles',
      nextAvailable: 'Jan 18, 9:00 AM',
      consultationFee: 180,
      acceptsInsurance: true,
      languages: ['English', 'Spanish'],
      hospitals: ["Children's Health Center", 'Mount Sinai'],
      isVerified: true,
      telemedicine: true,
      sameDay: true,
      isOnline: true,
      isFavorited: false,
    },
    {
      id: 4,
      name: 'David Thompson',
      specialty: 'Orthopedics',
      photo:
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
      rating: 4.6,
      reviewCount: 156,
      experience: 20,
      location: 'Orthopedic Specialists',
      distance: '1.8 miles',
      nextAvailable: 'Jan 19, 11:30 AM',
      consultationFee: 300,
      acceptsInsurance: false,
      languages: ['English'],
      hospitals: ['Orthopedic Specialists', 'Hospital for Special Surgery'],
      isVerified: true,
      telemedicine: false,
      sameDay: false,
      isOnline: false,
      isFavorited: false,
    },
    {
      id: 5,
      name: 'Lisa Park',
      specialty: 'Psychiatry',
      photo:
        'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 94,
      experience: 10,
      location: 'Mental Health Associates',
      distance: '0.5 miles',
      nextAvailable: 'Today 4:00 PM',
      consultationFee: 220,
      acceptsInsurance: true,
      languages: ['English', 'Korean'],
      hospitals: ['Mental Health Associates'],
      isVerified: true,
      telemedicine: true,
      sameDay: true,
      isOnline: true,
      isFavorited: true,
    },
    {
      id: 6,
      name: 'Robert Wilson',
      specialty: 'Neurology',
      photo:
        'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 178,
      experience: 18,
      location: 'Neurological Institute',
      distance: '3.2 miles',
      nextAvailable: 'Jan 20, 2:00 PM',
      consultationFee: 350,
      acceptsInsurance: true,
      languages: ['English', 'French'],
      hospitals: ['Neurological Institute', 'Columbia Presbyterian'],
      isVerified: true,
      telemedicine: false,
      sameDay: false,
      isOnline: false,
      isFavorited: true,
    },
  ]);

  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  // Handle search
  const handleSearch = ({ query, location }) => {
    setSearchQuery(query);
    setCurrentLocation(location);
    // Implement search logic here
    console.log('Searching for:', query, 'in', location);
  };

  // Handle location detection
  const handleLocationToggle = (coords) => {
    setCurrentLocation('Current Location');
    console.log('Location detected:', coords);
  };

  // Handle specialty selection
  const handleSpecialtySelect = (specialtyId) => {
    setSelectedSpecialty(specialtyId);

    if (specialtyId === 'all') {
      setFilteredDoctors(doctors);
      setActiveFilters((prev) => prev.filter((filter) => filter.type !== 'specialty'));
    } else {
      const specialty = specialtyId.charAt(0).toUpperCase() + specialtyId.slice(1);
      const filtered = doctors.filter((doctor) =>
        doctor.specialty.toLowerCase().includes(specialtyId.toLowerCase())
      );
      setFilteredDoctors(filtered);

      // Update active filters
      setActiveFilters((prev) => {
        const withoutSpecialty = prev.filter((filter) => filter.type !== 'specialty');
        return [...withoutSpecialty, { type: 'specialty', value: specialty }];
      });
    }
  };

  // Handle filter removal
  const handleRemoveFilter = (filterToRemove) => {
    if (filterToRemove === 'all') {
      setActiveFilters([]);
      setFilteredDoctors(doctors);
      setSelectedSpecialty('all');
    } else {
      setActiveFilters((prev) =>
        prev.filter(
          (filter) =>
            !(filter.type === filterToRemove.type && filter.value === filterToRemove.value)
        )
      );

      if (filterToRemove.type === 'specialty') {
        setSelectedSpecialty('all');
        setFilteredDoctors(doctors);
      }
    }
  };

  // Handle filter application
  const handleApplyFilters = (filters) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      let filtered = [...doctors];
      const newActiveFilters = [];

      // Apply specialty filter
      if (filters.specialty) {
        filtered = filtered.filter((doctor) =>
          doctor.specialty.toLowerCase().includes(filters.specialty.toLowerCase())
        );
        newActiveFilters.push({ type: 'specialty', value: filters.specialty });
      }

      // Apply rating filter
      if (filters.rating > 0) {
        filtered = filtered.filter((doctor) => doctor.rating >= filters.rating);
        newActiveFilters.push({ type: 'rating', value: `${filters.rating}+ stars` });
      }

      // Apply insurance filter
      if (filters.insurance.length > 0) {
        newActiveFilters.push({
          type: 'insurance',
          value: `${filters.insurance.length} providers`,
        });
      }

      // Apply telemedicine filter
      if (filters.telemedicine) {
        filtered = filtered.filter((doctor) => doctor.telemedicine);
        newActiveFilters.push({ type: 'availability', value: 'Telemedicine' });
      }

      // Apply same day filter
      if (filters.sameDay) {
        filtered = filtered.filter((doctor) => doctor.sameDay);
        newActiveFilters.push({ type: 'availability', value: 'Same Day' });
      }

      // Apply verified filter
      if (filters.verified) {
        filtered = filtered.filter((doctor) => doctor.isVerified);
        newActiveFilters.push({ type: 'verification', value: 'Verified Only' });
      }

      setFilteredDoctors(filtered);
      setActiveFilters(newActiveFilters);
      setIsLoading(false);
    }, 1000);
  };

  // Handle sort change
  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);

    let sorted = [...filteredDoctors];
    switch (sortValue) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case 'price-low':
        sorted.sort((a, b) => a.consultationFee - b.consultationFee);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.consultationFee - a.consultationFee);
        break;
      case 'experience':
        sorted.sort((a, b) => b.experience - a.experience);
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredDoctors(sorted);
  };

  // Handle view toggle
  const handleViewToggle = (view) => {
    setCurrentView(view);
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (doctorId, isFavorited) => {
    console.log('Toggle favorite for doctor:', doctorId, isFavorited);
    // Implement favorite logic here
  };

  // Handle quick book
  const handleQuickBook = (doctor) => {
    setQuickBookDoctor(doctor);
    setIsQuickBookModalOpen(true);
  };

  // Handle appointment booking
  const handleBookAppointment = (appointmentData) => {
    console.log('Booking appointment:', appointmentData);
    // Implement booking logic here
    // Show success message or redirect
  };

  // Handle doctor selection in map view
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <SearchHeader
        onSearch={handleSearch}
        onLocationToggle={handleLocationToggle}
        currentLocation={currentLocation}
      />

      <FilterChips
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        resultCount={filteredDoctors.length}
      />

      <SpecialtyCategories
        onSpecialtySelect={handleSpecialtySelect}
        selectedSpecialty={selectedSpecialty}
      />

      <SortControls
        onSortChange={handleSortChange}
        onViewToggle={handleViewToggle}
        currentView={currentView}
        resultCount={filteredDoctors.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            onApplyFilters={handleApplyFilters}
            currentFilters={{}}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile filter button */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterSidebarOpen(true)}
                iconName="Filter"
                fullWidth
              >
                Filters
              </Button>
            </div>

            {/* Content based on view */}
            {currentView === 'list' ? (
              <div>
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className="bg-surface border border-border rounded-lg p-4 animate-pulse"
                      >
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-16 h-16 bg-secondary-200 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-secondary-200 rounded mb-2"></div>
                            <div className="h-3 bg-secondary-200 rounded w-2/3"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-secondary-200 rounded"></div>
                          <div className="h-3 bg-secondary-200 rounded w-3/4"></div>
                          <div className="h-8 bg-secondary-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor) => (
                      <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        onFavoriteToggle={handleFavoriteToggle}
                        onQuickBook={handleQuickBook}
                      />
                    ))}
                  </div>
                )}

                {/* No results */}
                {!isLoading && filteredDoctors.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      No doctors found
                    </h3>
                    <p className="text-text-secondary mb-4">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveFilter('all')}
                      iconName="RotateCcw"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}

                {/* Load more */}
                {!isLoading && filteredDoctors.length > 0 && (
                  <div className="text-center mt-8">
                    <Button variant="outline" iconName="ChevronDown">
                      Load More Doctors
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <MapView
                doctors={filteredDoctors}
                onDoctorSelect={handleDoctorSelect}
                selectedDoctor={selectedDoctor}
              />
            )}
          </div>
        </div>
      </div>

      {/* Quick Book Modal */}
      <QuickBookModal
        isOpen={isQuickBookModalOpen}
        onClose={() => setIsQuickBookModalOpen(false)}
        doctor={quickBookDoctor}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
};

export default DoctorSearchBrowse;
