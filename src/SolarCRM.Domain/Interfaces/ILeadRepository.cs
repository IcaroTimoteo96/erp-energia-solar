using SolarCRM.Domain.Entities;

namespace SolarCRM.Domain.Interfaces
{
    public interface ILeadRepository : IGenericRepository<Lead>
    {
        // Add specific methods here if needed, e.g. GetByEmailAsync
    }
}
