using Microsoft.AspNetCore.Mvc;
using SolarCRM.Application.Interfaces;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotesController : ControllerBase
    {
        private readonly IQuoteRepository _quoteRepository;
        private readonly ISolarCalculatorService _calculatorService;

        public QuotesController(IQuoteRepository quoteRepository, ISolarCalculatorService calculatorService)
        {
            _quoteRepository = quoteRepository;
            _calculatorService = calculatorService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
        {
            var quotes = await _quoteRepository.GetAllAsync();
            return Ok(quotes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(Guid id)
        {
            var quote = await _quoteRepository.GetQuoteWithItemsAsync(id);
            if (quote == null)
            {
                return NotFound();
            }
            return Ok(quote);
        }

        [HttpPost]
        public async Task<ActionResult<Quote>> CreateQuote(Quote quote)
        {
            var createdQuote = await _quoteRepository.AddAsync(quote);
            return CreatedAtAction(nameof(GetQuote), new { id = createdQuote.Id }, createdQuote);
        }

        [HttpPost("calculate")]
        public ActionResult<object> CalculateSolarSystem([FromBody] CalculationRequest request)
        {
            var size = _calculatorService.CalculateSystemSize(request.MonthlyUsage, request.PeakSunHours);
            var panels = _calculatorService.CalculatePanelCount(size, request.PanelWattage);
            var savings = _calculatorService.CalculateEstimatedSavings(size, request.EnergyRate);

            return Ok(new
            {
                SystemSizeKw = size,
                PanelCount = panels,
                EstimatedMonthlySavings = savings
            });
        }
    }

    public class CalculationRequest
    {
        public decimal MonthlyUsage { get; set; }
        public decimal PeakSunHours { get; set; }
        public int PanelWattage { get; set; }
        public decimal EnergyRate { get; set; }
    }
}
