using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities;

public class PerformanceMonitoring : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Project? Project { get; set; }

    public DateTime ReadingDate { get; set; }
    public decimal EnergyGenerated { get; set; } // kWh gerado
    public decimal ExpectedGeneration { get; set; } // kWh esperado
    public decimal Efficiency { get; set; } // Percentual de eficiência

    public decimal CO2Avoided { get; set; } // kg de CO₂ evitado

    public string? Notes { get; set; }
    public string Status { get; set; } = "Normal"; // Normal, Warning, Critical
}
