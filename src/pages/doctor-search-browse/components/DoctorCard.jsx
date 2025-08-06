import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DoctorCard = ({ doctor, onFavoriteToggle, onQuickBook }) => {
  const [isFavorited, setIsFavorited] = useState(doctor.isFavorited || false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavoriteToggle(doctor.id, !isFavorited);
  };

  const handleQuickBook = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickBook(doctor);
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={14} className="text-warning fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" size={14} className="text-warning" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-secondary-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow hover:shadow-md clinical-transition overflow-hidden">
      <Link to={`/doctor-profile-booking?id=${doctor.id}`} className="block">
        <div className="p-4">
          {/* Header with photo and favorite */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary-100">
                <Image
                  src={doctor.photo}
                  alt={`Dr. ${doctor.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {doctor.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-surface flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary truncate">
                    Dr. {doctor.name}
                  </h3>
                  <p className="text-sm text-text-secondary">{doctor.specialty}</p>
                  <p className="text-xs text-text-muted">{doctor.experience} years experience</p>
                </div>

                <button
                  onClick={handleFavoriteClick}
                  className="p-1 rounded-full hover:bg-muted clinical-transition"
                  aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Icon
                    name="Heart"
                    size={20}
                    className={isFavorited ? 'text-error fill-current' : 'text-text-muted'}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Rating and reviews */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">{getRatingStars(doctor.rating)}</div>
            <span className="text-sm font-medium text-text-primary">{doctor.rating}</span>
            <span className="text-sm text-text-secondary">({doctor.reviewCount} reviews)</span>
          </div>

          {/* Location and distance */}
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="MapPin" size={14} className="text-text-muted" />
            <span className="text-sm text-text-secondary">{doctor.location}</span>
            <span className="text-sm text-primary font-medium">• {doctor.distance}</span>
          </div>

          {/* Next available appointment */}
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Calendar" size={14} className="text-success" />
            <span className="text-sm text-text-secondary">Next available:</span>
            <span className="text-sm font-medium text-success">{doctor.nextAvailable}</span>
          </div>

          {/* Insurance and consultation fee */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} className="text-primary" />
              <span className="text-sm text-text-secondary">
                {doctor.acceptsInsurance ? 'Insurance accepted' : 'Self-pay only'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm text-text-secondary">From</span>
              <span className="text-lg font-semibold text-text-primary ml-1">
                ${doctor.consultationFee}
              </span>
            </div>
          </div>

          {/* Languages spoken */}
          {doctor.languages && doctor.languages.length > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Globe" size={14} className="text-text-muted" />
              <span className="text-sm text-text-secondary">
                Speaks: {doctor.languages.join(', ')}
              </span>
            </div>
          )}

          {/* Hospital affiliations */}
          {doctor.hospitals && doctor.hospitals.length > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Building" size={14} className="text-text-muted" />
              <span className="text-sm text-text-secondary">
                {doctor.hospitals[0]}
                {doctor.hospitals.length > 1 && ` +${doctor.hospitals.length - 1} more`}
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1" iconName="Eye">
              View Profile
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={handleQuickBook}
              iconName="Calendar"
            >
              Book Now
            </Button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            {doctor.isVerified && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-success-50 text-success text-xs rounded-full">
                <Icon name="CheckCircle" size={12} />
                <span>Verified</span>
              </span>
            )}
            {doctor.telemedicine && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                <Icon name="Video" size={12} />
                <span>Telemedicine</span>
              </span>
            )}
            {doctor.sameDay && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-warning-50 text-warning text-xs rounded-full">
                <Icon name="Zap" size={12} />
                <span>Same Day</span>
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DoctorCard;
