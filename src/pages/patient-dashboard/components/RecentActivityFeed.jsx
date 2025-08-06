import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = ({ activities, onViewAll }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      appointment_booked: 'Calendar',
      appointment_confirmed: 'CheckCircle',
      appointment_cancelled: 'XCircle',
      prescription_updated: 'Pill',
      test_result: 'FileText',
      message_received: 'MessageSquare',
      payment_processed: 'CreditCard',
      document_uploaded: 'Upload',
    };
    return iconMap[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      appointment_booked: 'text-primary',
      appointment_confirmed: 'text-success',
      appointment_cancelled: 'text-error',
      prescription_updated: 'text-warning',
      test_result: 'text-primary',
      message_received: 'text-primary',
      payment_processed: 'text-success',
      document_uploaded: 'text-secondary',
    };
    return colorMap[type] || 'text-secondary';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return activityTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleActivityClick = (activity) => {
    // Handle navigation based on activity type
    console.log('Navigate to activity:', activity);
  };

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
          <Button variant="ghost" size="sm" onClick={onViewAll} iconName="ArrowRight">
            View All
          </Button>
        </div>
      </div>

      <div className="p-4">
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="w-full flex items-start space-x-3 p-3 rounded-lg hover:bg-muted clinical-transition text-left"
              >
                <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity.type)}`}>
                  <Icon name={getActivityIcon(activity.type)} size={16} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary mb-1">{activity.title}</p>
                  <p className="text-sm text-text-secondary mb-2">{activity.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                    {activity.actionRequired && (
                      <span className="px-2 py-1 text-xs font-medium bg-warning-50 text-warning rounded-full">
                        Action Required
                      </span>
                    )}
                  </div>
                </div>

                <Icon name="ChevronRight" size={16} className="text-text-muted flex-shrink-0" />
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary mb-2">No recent activity</p>
            <p className="text-sm text-text-muted">Your healthcare activities will appear here</p>
          </div>
        )}
      </div>

      {/* Quick Activity Summary */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-data font-semibold text-text-primary">
              {activities.filter((a) => a.type.includes('appointment')).length}
            </div>
            <div className="text-xs text-text-secondary">Appointments</div>
          </div>
          <div>
            <div className="text-lg font-data font-semibold text-text-primary">
              {activities.filter((a) => a.type === 'message_received').length}
            </div>
            <div className="text-xs text-text-secondary">Messages</div>
          </div>
          <div>
            <div className="text-lg font-data font-semibold text-text-primary">
              {activities.filter((a) => a.actionRequired).length}
            </div>
            <div className="text-xs text-text-secondary">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityFeed;
