using Microsoft.EntityFrameworkCore;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;
using SolarCRM.Infrastructure.Persistence;

namespace SolarCRM.Infrastructure.Repositories;

public class InvoiceRepository : GenericRepository<Invoice>, IInvoiceRepository
{
    public InvoiceRepository(SolarDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Invoice>> GetInvoicesWithDetailsAsync()
    {
        return await _context.Invoices
            .Include(i => i.Project)
            .ThenInclude(p => p.Quote)
            .ThenInclude(q => q.Lead)
            .Include(i => i.Items)
            .OrderByDescending(i => i.IssueDate)
            .ToListAsync();
    }

    public async Task<Invoice?> GetByInvoiceNumberAsync(string invoiceNumber)
    {
        return await _context.Invoices
            .Include(i => i.Items)
            .FirstOrDefaultAsync(i => i.InvoiceNumber == invoiceNumber);
    }
}
