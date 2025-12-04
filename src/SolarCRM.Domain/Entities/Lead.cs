using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities
{
    public class Lead : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Status { get; set; } = "New"; // New, Contacted, Qualified, Lost
        public string Notes { get; set; } = string.Empty;
    }
}
