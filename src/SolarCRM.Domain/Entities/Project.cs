using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities
{
    public class Project : BaseEntity
    {
        public Guid QuoteId { get; set; }
        public Quote? Quote { get; set; }

        public string Name { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Status { get; set; } = "Planning"; // Planning, Installation, Inspection, Completed

        public List<ProjectDocument> Documents { get; set; } = new();
    }

    public class ProjectDocument : BaseEntity
    {
        public Guid ProjectId { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public string FileType { get; set; } = string.Empty;
    }
}
