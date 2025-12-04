using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities
{
    public class Quote : BaseEntity
    {
        public Guid LeadId { get; set; }
        public Lead? Lead { get; set; }

        public decimal SystemSizeKw { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal MonthlySavingsEstimated { get; set; }
        public string Status { get; set; } = "Draft"; // Draft, Sent, Accepted, Rejected

        public List<QuoteItem> Items { get; set; } = new();
    }

    public class QuoteItem : BaseEntity
    {
        public Guid QuoteId { get; set; }
        public Guid ProductId { get; set; }
        public Product? Product { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
