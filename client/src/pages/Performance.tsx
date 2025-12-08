import { useEffect, useState } from 'react';
import { Activity, TrendingUp, Leaf } from 'lucide-react';
import { projectService } from '../services/api';

const Performance = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [totalCO2, setTotalCO2] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const projectsRes = await projectService.getAll();
      if (Array.isArray(projectsRes.data)) {
        setProjects(projectsRes.data);
      } else {
        console.error('Expected array of projects but got:', projectsRes.data);
        setProjects([]);
      }
      setTotalCO2(12500); // Valor simulado
    } catch (error) {
      console.error('Error loading data:', error);
      setProjects([]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Monitoramento de Desempenho</h2>
        <p className="text-gray-500">Acompanhe a eficiência dos painéis solares</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Projetos Ativos</p>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
            <Activity className="text-orange-500" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Geração Total (kWh)</p>
              <p className="text-2xl font-bold text-gray-900">15,432</p>
            </div>
            <TrendingUp className="text-blue-500" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">CO₂ Evitado (kg)</p>
              <p className="text-2xl font-bold text-gray-900">{totalCO2.toLocaleString()}</p>
            </div>
            <Leaf className="text-green-500" size={40} />
          </div>
        </div>
      </div>

      {/* Lista de Projetos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 font-semibold text-gray-700">
          Projetos Monitorados
        </div>
        <div className="p-6 space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">Sistema: {project.quote?.systemSizeKw || 0} kWp</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Normal
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Eficiência</p>
                  <p className="text-sm font-medium text-gray-900">95%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Geração Hoje</p>
                  <p className="text-sm font-medium text-gray-900">120 kWh</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">CO₂ Evitado</p>
                  <p className="text-sm font-medium text-gray-900">54 kg</p>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-gray-500 py-8">Nenhum projeto sendo monitorado</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Performance;
