import { useEffect, useState } from 'react';
import { Plus, Calendar, Clock, FileText, Upload } from 'lucide-react';
import { projectService } from '../services/api';
import CreateProjectModal from '../components/modals/CreateProjectModal';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectService.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.projects.title}</h2>
          <p className="text-gray-500">{t.projects.subtitle}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          {t.projects.newProject}
        </button>
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadProjects}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">{t.projects.client}: {project.quote?.lead?.name || 'Unknown'}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  project.status === 'Installation' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {project.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar size={18} className="text-gray-400" />
                  <span>{t.projects.start}: {new Date(project.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock size={18} className="text-gray-400" />
                  <span>{t.projects.end}: {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{t.projects.documents}</h4>
                <div className="space-y-2">
                  {project.documents?.map((doc: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-400" />
                        <span className="truncate max-w-[150px]">{doc.fileName}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">{t.common.view}</button>
                    </div>
                  ))}
                  {(!project.documents || project.documents.length === 0) && (
                    <p className="text-xs text-gray-400 italic">{t.projects.noDocuments}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
              <button className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
                <Upload size={16} /> {t.projects.uploadDoc}
              </button>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                {t.projects.viewDetails} →
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
           <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🏗️</div>
             <h3 className="text-lg font-medium text-gray-900">{t.projects.noProjects}</h3>
             <p className="text-gray-500">{t.projects.noProjectsSubtitle}</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
