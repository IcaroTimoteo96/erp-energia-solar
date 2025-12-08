import { useEffect, useState } from 'react';
import { BarChart3, TrendingDown, TrendingUp } from 'lucide-react';
import { projectService } from '../services/api';

const Analytics = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await projectService.getAll();
      if (Array.isArray(res.data)) {
        setProjects(res.data);
      } else {
        console.error('Expected array of projects but got:', res.data);
        setProjects([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setProjects([]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Análise de Dados</h2>
        <p className="text-gray-500">Comparação entre orçado e realizado</p>
      </div>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Projetos Analisados</p>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
            <BarChart3 className="text-orange-500" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Economia Média</p>
              <p className="text-2xl font-bold text-green-600">+5.2%</p>
            </div>
            <TrendingDown className="text-green-500" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Precisão Média</p>
              <p className="text-2xl font-bold text-blue-600">92%</p>
            </div>
            <TrendingUp className="text-blue-500" size={40} />
          </div>
        </div>
      </div>

      {/* Análise por Projeto */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 font-semibold text-gray-700">
          Análise Orçado vs Realizado
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Projeto</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Orçado</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Realizado</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Variação</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => {
                const budgeted = project.quote?.totalPrice || 0;
                const actual = budgeted * (0.95 + Math.random() * 0.1); // Simulado
                const variance = ((actual - budgeted) / budgeted) * 100;

                return (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{project.name}</td>
                    <td className="px-6 py-4 text-gray-600">
                      R$ {budgeted.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      R$ {actual.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
