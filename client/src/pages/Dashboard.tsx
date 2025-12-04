

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', value: '124', change: '+12%', color: 'bg-blue-500' },
          { label: 'Active Projects', value: '8', change: '+2', color: 'bg-green-500' },
          { label: 'Pending Quotes', value: '15', change: '-3', color: 'bg-yellow-500' },
          { label: 'Revenue (Mo)', value: '$45k', change: '+8%', color: 'bg-purple-500' },
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                  📝
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New Quote Generated</p>
                  <p className="text-xs text-gray-500">2 hours ago • Client: John Doe</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Performance</h3>
          <div className="flex items-center justify-center h-full text-gray-400">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
