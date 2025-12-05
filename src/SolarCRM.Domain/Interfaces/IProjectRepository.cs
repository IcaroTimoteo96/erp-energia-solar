using SolarCRM.Domain.Entities;

namespace SolarCRM.Domain.Interfaces
{
    public interface IProjectRepository : IGenericRepository<Project>
    {
        Task<Project?> GetProjectWithDetailsAsync(Guid id);
        Task<IEnumerable<Project>> GetProjectsWithDetailsAsync();
    }
}
