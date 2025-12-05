using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ILeadRepository _leadRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IQuoteRepository _quoteRepository;
        private readonly IInvoiceRepository _invoiceRepository;

        public DashboardController(
            ILeadRepository leadRepository,
            IProjectRepository projectRepository,
            IQuoteRepository quoteRepository,
            IInvoiceRepository invoiceRepository)
        {
            _leadRepository = leadRepository;
            _projectRepository = projectRepository;
            _quoteRepository = quoteRepository;
            _invoiceRepository = invoiceRepository;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            // 1. Fetch Data
            var leads = await _leadRepository.GetAllAsync();
            var projects = await _projectRepository.GetAllAsync();
            var quotes = await _quoteRepository.GetQuotesWithDetailsAsync(); // Need details for Lead name in recent activity
            var invoices = await _invoiceRepository.GetAllAsync();

            // 2. Calculate Metrics
            var totalLeads = leads.Count;
            // Active projects are those NOT Completed and NOT Cancelled (assuming Status strings, verify if needed)
            var activeProjects = projects.Count(p => p.Status != "Completed" && p.Status != "Cancelled");
            var pendingQuotes = quotes.Count(q => q.Status == "Sent" || q.Status == "Draft" || q.Status == "Pending"); // Adjust status logic as needed
            var totalRevenue = invoices.Sum(i => i.TotalAmount); // Simple sum of all invoices

            // 3. Recent Activity (Latest 5 Quotes)
            var recentActivity = quotes
                .OrderByDescending(q => q.CreatedAt)
                .Take(5)
                .Select(q => new
                {
                    Type = "New Quote Generated",
                    Date = q.CreatedAt,
                    Client = q.Lead?.Name ?? "Unknown Client",
                    Value = q.TotalPrice
                })
                .ToList();

            return Ok(new
            {
                TotalLeads = totalLeads,
                ActiveProjects = activeProjects,
                PendingQuotes = pendingQuotes,
                Revenue = totalRevenue,
                RecentActivity = recentActivity
            });
        }
    }
}
