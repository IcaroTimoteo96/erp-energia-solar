using SolarCRM.Application.Interfaces;

namespace SolarCRM.Application.Services
{
    public class SolarCalculatorService : ISolarCalculatorService
    {
        public decimal CalculateSystemSize(decimal monthlyUsageKwh, decimal peakSunHours)
        {
            // Formula: (Monthly Usage / 30 days) / Peak Sun Hours / Efficiency Loss Factor (0.8)
            return (monthlyUsageKwh / 30) / peakSunHours / 0.8m;
        }

        public decimal CalculateEstimatedSavings(decimal systemSizeKw, decimal energyRate)
        {
            // Estimate monthly generation: System Size * Peak Sun Hours * 30 * Efficiency (0.8)
            // For simplicity, we'll assume 5 peak sun hours average if not provided, but here we just use size
            // Let's assume 150 kWh per kW installed per month as a rough average for Brazil
            decimal monthlyGeneration = systemSizeKw * 150;
            return monthlyGeneration * energyRate;
        }

        public int CalculatePanelCount(decimal systemSizeKw, int panelWattage)
        {
            decimal systemSizeWatts = systemSizeKw * 1000;
            return (int)Math.Ceiling(systemSizeWatts / panelWattage);
        }
    }
}
