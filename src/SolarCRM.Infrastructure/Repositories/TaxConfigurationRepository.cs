using Microsoft.EntityFrameworkCore;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;
using SolarCRM.Infrastructure.Persistence;

namespace SolarCRM.Infrastructure.Repositories;

public class TaxConfigurationRepository : GenericRepository<TaxConfiguration>, ITaxConfigurationRepository
{
    public TaxConfigurationRepository(SolarDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<TaxConfiguration>> GetActiveConfigurationsAsync()
    {
        return await _context.TaxConfigurations
            .Where(t => t.IsActive)
            .ToListAsync();
    }

    public async Task<IEnumerable<TaxConfiguration>> GetByProductIdAsync(Guid productId)
    {
        return await _context.TaxConfigurations
            .Where(t => t.ProductId == productId && t.IsActive)
            .ToListAsync();
    }
}
