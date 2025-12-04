using Microsoft.EntityFrameworkCore;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;
using SolarCRM.Infrastructure.Persistence;

namespace SolarCRM.Infrastructure.Repositories
{
    public class InteractionRepository : GenericRepository<Interaction>, IInteractionRepository
    {
        public InteractionRepository(SolarDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Interaction>> GetByLeadIdAsync(Guid leadId)
        {
            return await _context.Set<Interaction>()
                .Where(i => i.LeadId == leadId)
                .OrderByDescending(i => i.Date)
                .ToListAsync();
        }
    }
}
