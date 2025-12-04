using SolarCRM.Domain.Common;

namespace SolarCRM.Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // Panel, Inverter, Structure, Cable, Other
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string Manufacturer { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
    }
}
