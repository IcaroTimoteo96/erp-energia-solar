import { useState, useEffect } from 'react';
import Modal from '../Modal';
import { leadService, quoteService } from '../../services/api';

interface CreateQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateQuoteModal = ({ isOpen, onClose, onSuccess }: CreateQuoteModalProps) => {
  const [formData, setFormData] = useState({
    leadId: '',
    systemSizeKw: '',
    totalPrice: '',
    monthlySavingsEstimated: '',
    status: 'Draft'
  });
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const loadLeads = async () => {
    try {
      const response = await leadService.getAll();
      setLeads(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error loading leads:', error);
      setLeads([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await quoteService.create({
        ...formData,
        systemSizeKw: parseFloat(formData.systemSizeKw),
        totalPrice: parseFloat(formData.totalPrice),
        monthlySavingsEstimated: parseFloat(formData.monthlySavingsEstimated)
      });
      onSuccess();
      onClose();
      setFormData({
        leadId: '',
        systemSizeKw: '',
        totalPrice: '',
        monthlySavingsEstimated: '',
        status: 'Draft'
      });
    } catch (error) {
      console.error('Error creating quote:', error);
      alert('Failed to create quote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Orçamento">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lead (Cliente)</label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.leadId}
            onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
          >
            <option value="">Selecione um lead...</option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.name} ({lead.email})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho do Sistema (kWp)</label>
            <input
              type="number"
              step="0.01"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.systemSizeKw}
              onChange={(e) => setFormData({ ...formData, systemSizeKw: e.target.value })}
              placeholder="5.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço Total (R$)</label>
            <input
              type="number"
              step="0.01"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.totalPrice}
              onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
              placeholder="25000.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Economia Mensal Est. (R$)</label>
          <input
            type="number"
            step="0.01"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.monthlySavingsEstimated}
            onChange={(e) => setFormData({ ...formData, monthlySavingsEstimated: e.target.value })}
            placeholder="450.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Draft">Rascunho</option>
            <option value="Sent">Enviado</option>
            <option value="Accepted">Aceito</option>
            <option value="Rejected">Rejeitado</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Orçamento'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateQuoteModal;
