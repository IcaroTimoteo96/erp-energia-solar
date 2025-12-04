namespace SolarCRM.Application.Interfaces
{
    public interface ISolarCalculatorService
    {
        decimal CalculateSystemSize(decimal monthlyUsageKwh, decimal peakSunHours);
        decimal CalculateEstimatedSavings(decimal systemSizeKw, decimal energyRate);
        int CalculatePanelCount(decimal systemSizeKw, int panelWattage);
    }
}
