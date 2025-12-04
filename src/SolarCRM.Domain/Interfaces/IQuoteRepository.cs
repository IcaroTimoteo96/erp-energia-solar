using SolarCRM.Domain.Entities;

namespace SolarCRM.Domain.Interfaces
{
    public interface IQuoteRepository : IGenericRepository<Quote>
    {
        Task<Quote?> GetQuoteWithItemsAsync(Guid id);
    }
}
