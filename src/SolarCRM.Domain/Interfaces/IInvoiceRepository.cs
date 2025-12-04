using SolarCRM.Domain.Entities;

namespace SolarCRM.Domain.Interfaces;

public interface IInvoiceRepository : IGenericRepository<Invoice>
{
    Task<IEnumerable<Invoice>> GetInvoicesWithDetailsAsync();
    Task<Invoice?> GetByInvoiceNumberAsync(string invoiceNumber);
}
