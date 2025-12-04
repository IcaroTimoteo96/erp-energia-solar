using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities;

public class Invoice : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Project? Project { get; set; }

    public string InvoiceNumber { get; set; } = string.Empty;
    public DateTime IssueDate { get; set; }
    public DateTime DueDate { get; set; }

    public decimal Subtotal { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal TotalAmount { get; set; }

    public string Status { get; set; } = "Pending"; // Pending, Paid, Overdue, Cancelled
    public DateTime? PaidDate { get; set; }

    public string? Notes { get; set; }
    public string? BoletoUrl { get; set; } // URL do boleto gerado

    public ICollection<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
}

public class InvoiceItem : BaseEntity
{
    public Guid InvoiceId { get; set; }
    public Invoice? Invoice { get; set; }

    public string Description { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TaxRate { get; set; }
    public decimal Amount { get; set; }
}
