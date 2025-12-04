using Microsoft.EntityFrameworkCore;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;
using SolarCRM.Infrastructure.Persistence;

namespace SolarCRM.Infrastructure.Repositories;

public class ProjectAnalysisRepository : GenericRepository<ProjectAnalysis>, IProjectAnalysisRepository
{
    public ProjectAnalysisRepository(SolarDbContext context) : base(context)
    {
    }

    public async Task<ProjectAnalysis?> GetByProjectIdAsync(Guid projectId)
    {
        return await _context.ProjectAnalyses
            .Include(p => p.Project)
            .FirstOrDefaultAsync(p => p.ProjectId == projectId);
    }
}
