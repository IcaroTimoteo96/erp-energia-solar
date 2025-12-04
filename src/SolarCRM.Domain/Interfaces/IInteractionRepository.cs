using SolarCRM.Domain.Entities;

namespace SolarCRM.Domain.Interfaces
{
    public interface IInteractionRepository : IGenericRepository<Interaction>
    {
        Task<IEnumerable<Interaction>> GetByLeadIdAsync(Guid leadId);
    }
}
