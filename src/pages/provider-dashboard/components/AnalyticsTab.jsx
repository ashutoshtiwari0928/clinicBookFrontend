import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsTab = ({ analyticsData }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('appointments');

  const bookingPatternData = [
    { day: 'Mon', appointments: 12, cancellations: 2 },
    { day: 'Tue', appointments: 15, cancellations: 1 },
    { day: 'Wed', appointments: 18, cancellations: 3 },
    { day: 'Thu', appointments: 14, cancellations: 2 },
    { day: 'Fri', appointments: 16, cancellations: 1 },
    { day: 'Sat', appointments: 8, cancellations: 0 },
    { day: 'Sun', appointments: 5, cancellations: 1 },
  ];

  const satisfactionData = [
    { name: 'Excellent', value: 45, color: '#10B981' },
    { name: 'Good', value: 30, color: '#3B82F6' },
    { name: 'Average', value: 20, color: '#F59E0B' },
    { name: 'Poor', value: 5, color: '#EF4444' },
  ];

  const monthlyTrends = [
    { month: 'Jan', appointments: 280, revenue: 14000, noShows: 15 },
    { month: 'Feb', appointments: 320, revenue: 16000, noShows: 12 },
    { month: 'Mar', appointments: 350, revenue: 17500, noShows: 18 },
    { month: 'Apr', appointments: 380, revenue: 19000, noShows: 20 },
    { month: 'May', appointments: 420, revenue: 21000, noShows: 16 },
    { month: 'Jun', appointments: 450, revenue: 22500, noShows: 14 },
  ];

  const keyMetrics = [
    {
      title: 'Total Appointments',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: 'Calendar',
      color: 'text-primary',
    },
    {
      title: 'No-Show Rate',
      value: '8.5%',
      change: '-2.1%',
      trend: 'down',
      icon: 'AlertCircle',
      color: 'text-warning',
    },
    {
      title: 'Patient Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      icon: 'Star',
      color: 'text-success',
    },
    {
      title: 'Revenue',
      value: '$52,400',
      change: '+18%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'text-success',
    },
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Analytics & Insights</h3>
        <div className="flex items-center space-x-2">
          {['week', 'month', 'quarter', 'year'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric.icon} size={20} className={metric.color} />
              <div className={`flex items-center space-x-1 text-sm ${getTrendColor(metric.trend)}`}>
                <Icon name={getTrendIcon(metric.trend)} size={14} />
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="text-2xl font-data font-bold text-text-primary mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-text-secondary">{metric.title}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Patterns */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-text-primary">Weekly Booking Patterns</h4>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingPatternData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="appointments" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cancellations" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Satisfaction */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-text-primary">Patient Satisfaction</h4>
            <Button variant="ghost" size="sm" iconName="Eye">
              View Details
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {satisfactionData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-text-secondary">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-surface border border-border rounded-lg p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-text-primary">Monthly Trends</h4>
            <div className="flex items-center space-x-2">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="appointments">Appointments</option>
                <option value="revenue">Revenue</option>
                <option value="noShows">No-Shows</option>
              </select>
              <Button variant="ghost" size="sm" iconName="Download">
                Export
              </Button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="font-semibold text-text-primary mb-4">Insights & Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="font-medium text-success">Positive Trend</span>
            </div>
            <p className="text-sm text-success-800">
              Patient satisfaction has increased by 0.2 points this month. Your response time
              improvements are working well.
            </p>
          </div>

          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="font-medium text-warning">Attention Needed</span>
            </div>
            <p className="text-sm text-warning-800">
              Wednesday shows higher cancellation rates. Consider sending reminder notifications 24
              hours before appointments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
