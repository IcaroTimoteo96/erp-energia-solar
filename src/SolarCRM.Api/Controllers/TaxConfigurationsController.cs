using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaxConfigurationsController : ControllerBase
{
    private readonly ITaxConfigurationRepository _repository;

    public TaxConfigurationsController(ITaxConfigurationRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var configs = await _repository.GetAllAsync();
        return Ok(configs);
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        var configs = await _repository.GetActiveConfigurationsAsync();
        return Ok(configs);
    }

    [HttpGet("product/{productId}")]
    public async Task<IActionResult> GetByProduct(Guid productId)
    {
        var configs = await _repository.GetByProductIdAsync(productId);
        return Ok(configs);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TaxConfiguration config)
    {
        await _repository.AddAsync(config);
        return CreatedAtAction(nameof(GetAll), config);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] TaxConfiguration config)
    {
        if (id != config.Id) return BadRequest();
        await _repository.UpdateAsync(config);
        return NoContent();
    }
}
