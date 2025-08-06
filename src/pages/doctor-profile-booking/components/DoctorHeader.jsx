import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DoctorHeader = ({ doctor, onBookNow }) => {
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={16} className="text-warning fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="StarHalf" size={16} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={16} className="text-secondary-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
          {/* Doctor Photo */}
          <div className="flex-shrink-0 mb-4 lg:mb-0">
            <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto lg:mx-0 rounded-lg overflow-hidden clinical-shadow">
              <Image
                src={doctor.photo}
                alt={`Dr. ${doctor.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Doctor Information */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-2">
              <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary">
                Dr. {doctor.name}
              </h1>
              <p className="text-lg text-primary font-medium mt-1">{doctor.specialty}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3">
              <div className="flex items-center space-x-1">{renderRatingStars(doctor.rating)}</div>
              <span className="font-data text-sm font-medium text-text-primary">
                {doctor.rating}
              </span>
              <span className="text-sm text-text-secondary">({doctor.reviewCount} reviews)</span>
            </div>

            {/* Key Credentials */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
              <div className="flex items-center space-x-1 bg-primary-50 px-2 py-1 rounded-md">
                <Icon name="Award" size={14} className="text-primary" />
                <span className="text-xs font-medium text-primary">
                  {doctor.experience} years exp
                </span>
              </div>
              <div className="flex items-center space-x-1 bg-success-50 px-2 py-1 rounded-md">
                <Icon name="MapPin" size={14} className="text-success" />
                <span className="text-xs font-medium text-success">{doctor.location}</span>
              </div>
              <div className="flex items-center space-x-1 bg-accent-50 px-2 py-1 rounded-md">
                <Icon name="DollarSign" size={14} className="text-accent" />
                <span className="text-xs font-medium text-accent">${doctor.consultationFee}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-4">
              <div className="text-center lg:text-left">
                <div className="font-data text-lg font-semibold text-text-primary">
                  {doctor.patientsServed}+
                </div>
                <div className="text-xs text-text-secondary">Patients Served</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-data text-lg font-semibold text-text-primary">
                  {doctor.successRate}%
                </div>
                <div className="text-xs text-text-secondary">Success Rate</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-data text-lg font-semibold text-text-primary">
                  {doctor.nextAvailable}
                </div>
                <div className="text-xs text-text-secondary">Next Available</div>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {doctor.verifications.map((verification, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-md"
                >
                  <Icon name="CheckCircle" size={12} className="text-success" />
                  <span className="text-xs text-text-secondary">{verification}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Book Now Button */}
          <div className="lg:hidden mt-6">
            <Button
              variant="primary"
              fullWidth
              onClick={onBookNow}
              iconName="Calendar"
              iconPosition="left"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;
