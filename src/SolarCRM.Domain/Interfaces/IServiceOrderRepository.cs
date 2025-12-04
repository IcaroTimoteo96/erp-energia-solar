using SolarCRM.Domain.Entities;

namespace SolarCRM.Domain.Interfaces
{
    public interface IServiceOrderRepository : IGenericRepository<ServiceOrder>
    {
        Task<ServiceOrder?> GetServiceOrderWithChecklistAsync(Guid id);
    }
}
