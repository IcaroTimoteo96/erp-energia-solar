using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectAnalysisController : ControllerBase
{
    private readonly IProjectAnalysisRepository _repository;

    public ProjectAnalysisController(IProjectAnalysisRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("project/{projectId}")]
    public async Task<IActionResult> GetByProject(Guid projectId)
    {
        var analysis = await _repository.GetByProjectIdAsync(projectId);
        if (analysis == null) return NotFound();
        return Ok(analysis);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProjectAnalysis analysis)
    {
        await _repository.AddAsync(analysis);
        return CreatedAtAction(nameof(GetByProject), new { projectId = analysis.ProjectId }, analysis);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ProjectAnalysis analysis)
    {
        if (id != analysis.Id) return BadRequest();
        await _repository.UpdateAsync(analysis);
        return NoContent();
    }
}
