using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities
{
    public class Interaction : BaseEntity
    {
        public Guid LeadId { get; set; }
        public Lead? Lead { get; set; }

        public string Type { get; set; } = "Call"; // Call, Email, Meeting, Note
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string Notes { get; set; } = string.Empty;
    }
}
