using Microsoft.EntityFrameworkCore;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;
using SolarCRM.Infrastructure.Persistence;

namespace SolarCRM.Infrastructure.Repositories
{
    public class QuoteRepository : GenericRepository<Quote>, IQuoteRepository
    {
        public QuoteRepository(SolarDbContext context) : base(context)
        {
        }

        public async Task<Quote?> GetQuoteWithItemsAsync(Guid id)
        {
            return await _context.Quotes
                .Include(q => q.Items)
                .ThenInclude(qi => qi.Product)
                .Include(q => q.Lead)
                .FirstOrDefaultAsync(q => q.Id == id);
        }
    }
}
