using Microsoft.EntityFrameworkCore;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;
using SolarCRM.Infrastructure.Persistence;

namespace SolarCRM.Infrastructure.Repositories
{
    public class ServiceOrderRepository : GenericRepository<ServiceOrder>, IServiceOrderRepository
    {
        public ServiceOrderRepository(SolarDbContext context) : base(context)
        {
        }

        public async Task<ServiceOrder?> GetServiceOrderWithChecklistAsync(Guid id)
        {
            return await _context.ServiceOrders
                .Include(so => so.Checklist)
                .Include(so => so.Project)
                .FirstOrDefaultAsync(so => so.Id == id);
        }
    }
}
