using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _projectRepository.GetAllAsync();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(Guid id)
        {
            var project = await _projectRepository.GetProjectWithDetailsAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject(Project project)
        {
            var createdProject = await _projectRepository.AddAsync(project);
            return CreatedAtAction(nameof(GetProject), new { id = createdProject.Id }, createdProject);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(Guid id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            await _projectRepository.UpdateAsync(project);
            return NoContent();
        }

        [HttpPost("{id}/documents")]
        public async Task<IActionResult> UploadDocument(Guid id, [FromBody] ProjectDocument document)
        {
            var project = await _projectRepository.GetProjectWithDetailsAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            project.Documents.Add(document);
            await _projectRepository.UpdateAsync(project);

            return Ok(document);
        }
    }
}
