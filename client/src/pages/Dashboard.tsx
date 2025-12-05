
import { useEffect, useState } from 'react';
import { dashboardService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface DashboardStats {
  totalLeads: number;
  activeProjects: number;
  pendingQuotes: number;
  revenue: number;
  recentActivity: any[];
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    activeProjects: 0,
    pendingQuotes: 0,
    revenue: 0,
    recentActivity: []
  });
  const { t } = useLanguage();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await dashboardService.getSummary();
      setStats(response.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return t.dashboard.justNow;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} ${t.dashboard.minsAgo}`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ${t.dashboard.hoursAgo}`;
    return `${Math.floor(diffInSeconds / 86400)} ${t.dashboard.daysAgo}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t.dashboard.totalLeads, value: stats.totalLeads, change: '+12%', color: 'bg-blue-500' },
          { label: t.dashboard.activeProjects, value: stats.activeProjects, change: '+2', color: 'bg-green-500' },
          { label: t.dashboard.pendingQuotes, value: stats.pendingQuotes, change: '-3', color: 'bg-yellow-500' },
          { label: t.dashboard.revenue, value: formatCurrency(stats.revenue), change: '+8%', color: 'bg-purple-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.dashboard.recentActivity}</h3>
          <div className="space-y-4">
            {stats.recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                  📝
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.type === 'New Quote Generated' ? t.dashboard.newQuoteGenerated : activity.type}</p>
                  <p className="text-xs text-gray-500">{formatTimeAgo(activity.date)} • Client: {activity.client}</p>
                </div>
              </div>
            ))}
            {stats.recentActivity.length === 0 && (
              <p className="text-gray-500 text-center py-4">{t.common.noData}</p>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.dashboard.systemPerformance}</h3>
          <div className="flex items-center justify-center h-full text-gray-400">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
