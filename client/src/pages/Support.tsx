import { useEffect, useState } from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { ticketService } from '../services/api';
import CreateTicketModal from '../components/modals/CreateTicketModal';

const Support = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await ticketService.getAll();
      setTickets(response.data);
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
          <p className="text-gray-500">Manage customer inquiries and issues</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          New Ticket
        </button>
      </div>

      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadTickets}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                ticket.priority === 'High' || ticket.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {ticket.priority} Priority
              </span>
              <span className={`text-xs font-medium ${
                ticket.status === 'Resolved' ? 'text-green-600' : 'text-gray-500'
              }`}>
                {ticket.status}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 mb-2">{ticket.title}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{ticket.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MessageSquare size={16} className="text-gray-400" />
                <span>3 replies</span>
              </div>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                View Ticket
              </button>
            </div>
          </div>
        ))}

        {tickets.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎫</div>
            <h3 className="text-lg font-medium text-gray-900">No open tickets</h3>
            <p className="text-gray-500">Great job! All support requests have been handled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
