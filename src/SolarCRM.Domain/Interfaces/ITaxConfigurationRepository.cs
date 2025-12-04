using SolarCRM.Domain.Entities;

namespace SolarCRM.Domain.Interfaces;

public interface ITaxConfigurationRepository : IGenericRepository<TaxConfiguration>
{
    Task<IEnumerable<TaxConfiguration>> GetActiveConfigurationsAsync();
    Task<IEnumerable<TaxConfiguration>> GetByProductIdAsync(Guid productId);
}
