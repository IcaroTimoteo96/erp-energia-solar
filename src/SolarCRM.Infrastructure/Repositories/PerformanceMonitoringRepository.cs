using Microsoft.EntityFrameworkCore;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;
using SolarCRM.Infrastructure.Persistence;

namespace SolarCRM.Infrastructure.Repositories;

public class PerformanceMonitoringRepository : GenericRepository<PerformanceMonitoring>, IPerformanceMonitoringRepository
{
    public PerformanceMonitoringRepository(SolarDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<PerformanceMonitoring>> GetByProjectIdAsync(Guid projectId)
    {
        return await _context.PerformanceMonitorings
            .Where(p => p.ProjectId == projectId)
            .OrderByDescending(p => p.ReadingDate)
            .ToListAsync();
    }

    public async Task<decimal> GetTotalCO2AvoidedAsync(Guid projectId)
    {
        return await _context.PerformanceMonitorings
            .Where(p => p.ProjectId == projectId)
            .SumAsync(p => p.CO2Avoided);
    }
}
