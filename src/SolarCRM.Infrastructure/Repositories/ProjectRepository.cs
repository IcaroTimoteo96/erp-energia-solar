using Microsoft.EntityFrameworkCore;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;
using SolarCRM.Infrastructure.Persistence;

namespace SolarCRM.Infrastructure.Repositories
{
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        public ProjectRepository(SolarDbContext context) : base(context)
        {
        }

        public async Task<Project?> GetProjectWithDetailsAsync(Guid id)
        {
            return await _context.Projects
                .Include(p => p.Quote)
                .ThenInclude(q => q.Lead)
                .Include(p => p.Documents)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
