import { useEffect, useState } from 'react';
import { Plus, Wrench, CheckSquare, User, Calendar } from 'lucide-react';
import { serviceOrderService } from '../services/api';
import CreateServiceOrderModal from '../components/modals/CreateServiceOrderModal';

const ServiceOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await serviceOrderService.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading service orders:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Orders</h2>
          <p className="text-gray-500">Schedule installations and maintenance</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          New Order
        </button>
      </div>

      <CreateServiceOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadOrders}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {orders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{order.description}</h3>
                    <p className="text-sm text-gray-500">Project: {order.project?.name || 'General Maintenance'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'InProgress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {order.status}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    Details
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-14">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>{new Date(order.scheduledDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={16} className="text-gray-400" />
                  <span>Tech: Assigned Technician</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckSquare size={16} className="text-gray-400" />
                  <span>{order.checklist?.filter((i: any) => i.isCompleted).length || 0} / {order.checklist?.length || 0} Tasks</span>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🛠️</div>
              <h3 className="text-lg font-medium text-gray-900">No service orders</h3>
              <p>Create a service order to dispatch technicians.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceOrders;
