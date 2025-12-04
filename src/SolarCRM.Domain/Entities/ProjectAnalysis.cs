using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities;

public class ProjectAnalysis : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Project? Project { get; set; }

    // Valores Orçados
    public decimal BudgetedCost { get; set; }
    public decimal BudgetedRevenue { get; set; }
    public DateTime BudgetedStartDate { get; set; }
    public DateTime BudgetedEndDate { get; set; }

    // Valores Realizados
    public decimal ActualCost { get; set; }
    public decimal ActualRevenue { get; set; }
    public DateTime? ActualStartDate { get; set; }
    public DateTime? ActualEndDate { get; set; }

    // Variações
    public decimal CostVariance { get; set; } // Realizado - Orçado
    public decimal RevenueVariance { get; set; }
    public int ScheduleVarianceDays { get; set; }

    public string? Analysis { get; set; }
    public string Status { get; set; } = "InProgress"; // InProgress, Completed
}
