using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities
{
    public class ServiceOrder : BaseEntity
    {
        public Guid ProjectId { get; set; }
        public Project? Project { get; set; }

        public string Description { get; set; } = string.Empty;
        public DateTime ScheduledDate { get; set; }
        public string Status { get; set; } = "Scheduled"; // Scheduled, InProgress, Completed, Cancelled
        public string TechnicianNotes { get; set; } = string.Empty;

        public List<ChecklistItem> Checklist { get; set; } = new();
    }

    public class ChecklistItem : BaseEntity
    {
        public Guid ServiceOrderId { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
    }
}
