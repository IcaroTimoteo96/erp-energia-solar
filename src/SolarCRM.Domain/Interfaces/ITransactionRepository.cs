using SolarCRM.Domain.Entities;

namespace SolarCRM.Domain.Interfaces;

public interface ITransactionRepository : IGenericRepository<Transaction>
{
    Task<IEnumerable<Transaction>> GetTransactionsByDateRangeAsync(DateTime startDate, DateTime endDate);
    Task<decimal> GetBalanceAsync();
}
