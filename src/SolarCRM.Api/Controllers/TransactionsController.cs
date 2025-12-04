using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionRepository _repository;

    public TransactionsController(ITransactionRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var transactions = await _repository.GetAllAsync();
        return Ok(transactions);
    }

    [HttpGet("date-range")]
    public async Task<IActionResult> GetByDateRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
    {
        var transactions = await _repository.GetTransactionsByDateRangeAsync(startDate, endDate);
        return Ok(transactions);
    }

    [HttpGet("balance")]
    public async Task<IActionResult> GetBalance()
    {
        var balance = await _repository.GetBalanceAsync();
        return Ok(new { balance });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Transaction transaction)
    {
        await _repository.AddAsync(transaction);
        return CreatedAtAction(nameof(GetAll), transaction);
    }
}
