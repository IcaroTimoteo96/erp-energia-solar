using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;
using SolarCRM.Infrastructure.Persistence;

namespace SolarCRM.Infrastructure.Repositories
{
    public class TicketRepository : GenericRepository<Ticket>, ITicketRepository
    {
        public TicketRepository(SolarDbContext context) : base(context)
        {
        }
    }
}
