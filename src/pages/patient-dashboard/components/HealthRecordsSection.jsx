import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthRecordsSection = ({ documents, labResults, images, onDownload, onUpload }) => {
  const [activeTab, setActiveTab] = useState('documents');

  const tabs = [
    { id: 'documents', label: 'Documents', icon: 'FileText', count: documents.length },
    { id: 'labResults', label: 'Lab Results', icon: 'Activity', count: labResults.length },
    { id: 'images', label: 'Images', icon: 'Image', count: images.length },
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getFileIcon = (type) => {
    const iconMap = {
      pdf: 'FileText',
      doc: 'FileText',
      docx: 'FileText',
      jpg: 'Image',
      jpeg: 'Image',
      png: 'Image',
      gif: 'Image',
      default: 'File',
    };
    return iconMap[type.toLowerCase()] || iconMap.default;
  };

  const renderDocuments = () => (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted clinical-transition"
        >
          <div className="flex items-center space-x-3">
            <Icon name={getFileIcon(doc.type)} size={20} className="text-primary" />
            <div>
              <p className="font-medium text-text-primary text-sm">{doc.name}</p>
              <p className="text-xs text-text-secondary">
                {formatDate(doc.date)} • {formatFileSize(doc.size)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDownload(doc.id)}
              iconName="Download"
            >
              Download
            </Button>
            <Button variant="ghost" size="sm" iconName="Eye">
              View
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLabResults = () => (
    <div className="space-y-3">
      {labResults.map((result) => (
        <div
          key={result.id}
          className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted clinical-transition"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Activity" size={20} className="text-success" />
            <div>
              <p className="font-medium text-text-primary text-sm">{result.testName}</p>
              <p className="text-xs text-text-secondary">
                {formatDate(result.date)} • {result.status}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                result.status === 'Normal'
                  ? 'bg-success-50 text-success'
                  : result.status === 'Abnormal'
                    ? 'bg-error-50 text-error'
                    : 'bg-warning-50 text-warning'
              }`}
            >
              {result.status}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDownload(result.id)}
              iconName="Download"
            >
              Download
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderImages = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="border border-border rounded-lg overflow-hidden hover:shadow-sm clinical-transition"
        >
          <div className="aspect-square bg-muted flex items-center justify-center">
            <Icon name="Image" size={32} className="text-text-muted" />
          </div>
          <div className="p-3">
            <p className="font-medium text-text-primary text-sm truncate">{image.name}</p>
            <p className="text-xs text-text-secondary">{formatDate(image.date)}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownload(image.id)}
                iconName="Download"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'documents':
        return renderDocuments();
      case 'labResults':
        return renderLabResults();
      case 'images':
        return renderImages();
      default:
        return renderDocuments();
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow mb-6">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Health Records</h2>
          <Button variant="primary" size="sm" onClick={onUpload} iconName="Upload">
            Upload File
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium clinical-transition ${
                activeTab === tab.id
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
              <span className="bg-text-muted text-white text-xs px-1.5 py-0.5 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {renderContent()}

        {((activeTab === 'documents' && documents.length === 0) ||
          (activeTab === 'labResults' && labResults.length === 0) ||
          (activeTab === 'images' && images.length === 0)) && (
          <div className="text-center py-8">
            <Icon name="Folder" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary mb-2">No {activeTab} found</p>
            <Button variant="outline" onClick={onUpload} iconName="Upload">
              Upload Your First File
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthRecordsSection;
