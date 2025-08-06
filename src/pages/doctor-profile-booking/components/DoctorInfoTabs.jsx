import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DoctorInfoTabs = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'specializations', label: 'Specializations', icon: 'Award' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                About Dr. {doctor.name}
              </h3>
              <p className="text-text-secondary leading-relaxed">{doctor.about}</p>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-2">Languages Spoken</h4>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-muted px-2 py-1 rounded-md text-sm text-text-secondary"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-2">Hospital Affiliations</h4>
              <div className="space-y-2">
                {doctor.affiliations.map((affiliation, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Building" size={16} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">{affiliation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'specializations':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Specializations & Expertise
            </h3>
            <div className="grid gap-4">
              {doctor.specializations.map((spec, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Award" size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{spec.name}</h4>
                      <p className="text-sm text-text-secondary mt-1">{spec.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-text-muted">
                          {spec.experience} years experience
                        </span>
                        <span className="text-xs text-text-muted">{spec.cases}+ cases handled</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Education & Certifications
            </h3>

            <div>
              <h4 className="font-medium text-text-primary mb-3">Medical Education</h4>
              <div className="space-y-3">
                {doctor.education.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="GraduationCap" size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-text-primary">{edu.degree}</h5>
                      <p className="text-sm text-text-secondary">{edu.institution}</p>
                      <p className="text-xs text-text-muted">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-3">Certifications</h4>
              <div className="grid gap-2">
                {doctor.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="Certificate" size={16} className="text-success" />
                      <span className="text-sm font-medium text-text-primary">{cert.name}</span>
                    </div>
                    <span className="text-xs text-text-secondary">{cert.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Patient Reviews</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={
                        i < Math.floor(doctor.rating)
                          ? 'text-warning fill-current'
                          : 'text-secondary-300'
                      }
                    />
                  ))}
                </div>
                <span className="font-data text-sm font-medium text-text-primary">
                  {doctor.rating} ({doctor.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {doctor.reviews.map((review, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-secondary-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={16} className="text-text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h5 className="font-medium text-text-primary">{review.patientName}</h5>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Icon
                                  key={i}
                                  name="Star"
                                  size={12}
                                  className={
                                    i < review.rating
                                      ? 'text-warning fill-current'
                                      : 'text-secondary-300'
                                  }
                                />
                              ))}
                            </div>
                            {review.verified && (
                              <span className="bg-success-50 text-success text-xs px-2 py-0.5 rounded-full">
                                Verified Patient
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-text-muted">{review.date}</span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {review.comment}
                      </p>
                      {review.treatmentFor && (
                        <p className="text-xs text-text-muted mt-2">
                          Treatment for: {review.treatmentFor}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-surface">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm clinical-transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{renderTabContent()}</div>
    </div>
  );
};

export default DoctorInfoTabs;
