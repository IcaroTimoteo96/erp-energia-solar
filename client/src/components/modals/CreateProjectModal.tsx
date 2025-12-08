import { useState, useEffect } from 'react';
import Modal from '../Modal';
import { quoteService, projectService } from '../../services/api';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateProjectModal = ({ isOpen, onClose, onSuccess }: CreateProjectModalProps) => {
  const [formData, setFormData] = useState({
    quoteId: '',
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'Planning'
  });
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadQuotes();
    }
  }, [isOpen]);

  const loadQuotes = async () => {
    try {
      const response = await quoteService.getAll();
      if (Array.isArray(response.data)) {
        setQuotes(response.data);
      } else {
        console.error('Expected array of quotes but got:', response.data);
        setQuotes([]);
      }
    } catch (error) {
      console.error('Error loading quotes:', error);
      setQuotes([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await projectService.create({
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null
      });
      onSuccess();
      onClose();
      setFormData({
        quoteId: '',
        name: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        status: 'Planning'
      });
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Projeto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Projeto</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Instalação Residencial - Silva"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento Associado</label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.quoteId}
            onChange={(e) => setFormData({ ...formData, quoteId: e.target.value })}
          >
            <option value="">Selecione um orçamento...</option>
            {quotes.map((quote) => (
              <option key={quote.id} value={quote.id}>
                {quote.lead?.name} - {quote.systemSizeKw}kWp (R$ {quote.totalPrice})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Previsão de Término</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Planning">Planejamento</option>
            <option value="Installation">Instalação</option>
            <option value="Inspection">Inspeção</option>
            <option value="Completed">Concluído</option>
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
            {loading ? 'Criando...' : 'Criar Projeto'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
