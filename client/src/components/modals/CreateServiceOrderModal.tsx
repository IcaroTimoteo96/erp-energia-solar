import { useState, useEffect } from 'react';
import Modal from '../Modal';
import { projectService, serviceOrderService } from '../../services/api';

interface CreateServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateServiceOrderModal = ({ isOpen, onClose, onSuccess }: CreateServiceOrderModalProps) => {
  const [formData, setFormData] = useState({
    projectId: '',
    description: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    status: 'Scheduled',
    technicianNotes: ''
  });
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadProjects();
    }
  }, [isOpen]);

  const loadProjects = async () => {
    try {
      const response = await projectService.getAll();
      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await serviceOrderService.create({
        ...formData,
        scheduledDate: new Date(formData.scheduledDate).toISOString()
      });
      onSuccess();
      onClose();
      setFormData({
        projectId: '',
        description: '',
        scheduledDate: new Date().toISOString().split('T')[0],
        status: 'Scheduled',
        technicianNotes: ''
      });
    } catch (error) {
      console.error('Error creating service order:', error);
      alert('Failed to create service order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Ordem de Serviço">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Serviço</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Manutenção Preventiva - Inversor"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Projeto Associado</label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.projectId}
            onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
          >
            <option value="">Selecione um projeto...</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name} - {project.status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data Agendada</label>
          <input
            type="date"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.scheduledDate}
            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Scheduled">Agendado</option>
            <option value="InProgress">Em Andamento</option>
            <option value="Completed">Concluído</option>
            <option value="Cancelled">Cancelado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notas Técnicas</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            rows={3}
            value={formData.technicianNotes}
            onChange={(e) => setFormData({ ...formData, technicianNotes: e.target.value })}
            placeholder="Instruções para o técnico..."
          />
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
            {loading ? 'Criando...' : 'Criar OS'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateServiceOrderModal;
