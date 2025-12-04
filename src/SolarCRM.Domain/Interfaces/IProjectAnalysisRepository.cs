using SolarCRM.Domain.Entities;

namespace SolarCRM.Domain.Interfaces;

public interface IProjectAnalysisRepository : IGenericRepository<ProjectAnalysis>
{
    Task<ProjectAnalysis?> GetByProjectIdAsync(Guid projectId);
}
