using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities;

public class Transaction : BaseEntity
{
    public string Type { get; set; } = string.Empty; // Income, Expense
    public string Category { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime TransactionDate { get; set; }

    public string Description { get; set; } = string.Empty;
    public string? ReferenceNumber { get; set; }

    public Guid? InvoiceId { get; set; }
    public Invoice? Invoice { get; set; }

    public Guid? ProjectId { get; set; }
    public Project? Project { get; set; }

    public string PaymentMethod { get; set; } = string.Empty; // Cash, Credit, Debit, Boleto, Transfer
    public string Status { get; set; } = "Completed"; // Pending, Completed, Cancelled
}
