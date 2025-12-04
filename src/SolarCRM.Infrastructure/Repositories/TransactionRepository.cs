using Microsoft.EntityFrameworkCore;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;
using SolarCRM.Infrastructure.Persistence;

namespace SolarCRM.Infrastructure.Repositories;

public class TransactionRepository : GenericRepository<Transaction>, ITransactionRepository
{
    public TransactionRepository(SolarDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Transaction>> GetTransactionsByDateRangeAsync(DateTime startDate, DateTime endDate)
    {
        return await _context.Transactions
            .Where(t => t.TransactionDate >= startDate && t.TransactionDate <= endDate)
            .OrderByDescending(t => t.TransactionDate)
            .ToListAsync();
    }

    public async Task<decimal> GetBalanceAsync()
    {
        var income = await _context.Transactions
            .Where(t => t.Type == "Income" && t.Status == "Completed")
            .SumAsync(t => t.Amount);

        var expenses = await _context.Transactions
            .Where(t => t.Type == "Expense" && t.Status == "Completed")
            .SumAsync(t => t.Amount);

        return income - expenses;
    }
}
