using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PerformanceMonitoringController : ControllerBase
{
    private readonly IPerformanceMonitoringRepository _repository;

    public PerformanceMonitoringController(IPerformanceMonitoringRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("project/{projectId}")]
    public async Task<IActionResult> GetByProject(Guid projectId)
    {
        var readings = await _repository.GetByProjectIdAsync(projectId);
        return Ok(readings);
    }

    [HttpGet("project/{projectId}/co2")]
    public async Task<IActionResult> GetTotalCO2(Guid projectId)
    {
        var totalCO2 = await _repository.GetTotalCO2AvoidedAsync(projectId);
        return Ok(new { projectId, totalCO2Avoided = totalCO2 });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PerformanceMonitoring monitoring)
    {
        await _repository.AddAsync(monitoring);
        return CreatedAtAction(nameof(GetByProject), new { projectId = monitoring.ProjectId }, monitoring);
    }
}
