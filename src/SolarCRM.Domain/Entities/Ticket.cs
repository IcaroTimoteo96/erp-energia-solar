using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities
{
    public class Ticket : BaseEntity
    {
        public Guid? CustomerId { get; set; } // Could be Lead or a User
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Priority { get; set; } = "Medium"; // Low, Medium, High, Critical
        public string Status { get; set; } = "Open"; // Open, InProgress, Resolved, Closed
    }
}
