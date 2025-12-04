using SolarCRM.Domain.Entities;

namespace SolarCRM.Domain.Interfaces;

public interface IPerformanceMonitoringRepository : IGenericRepository<PerformanceMonitoring>
{
    Task<IEnumerable<PerformanceMonitoring>> GetByProjectIdAsync(Guid projectId);
    Task<decimal> GetTotalCO2AvoidedAsync(Guid projectId);
}
