using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities;

public class TaxConfiguration : BaseEntity
{
    public string TaxName { get; set; } = string.Empty; // ICMS, PIS, COFINS, IPI, etc.
    public decimal Rate { get; set; } // Percentual

    public string ApplicableType { get; set; } = "Product"; // Product, Service, All
    public Guid? ProductId { get; set; }
    public Product? Product { get; set; }

    public bool IsActive { get; set; } = true;
    public string? Description { get; set; }
}
