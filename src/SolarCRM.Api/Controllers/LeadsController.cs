using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadsController : ControllerBase
    {
        private readonly ILeadRepository _leadRepository;

        public LeadsController(ILeadRepository leadRepository)
        {
            _leadRepository = leadRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeads()
        {
            var leads = await _leadRepository.GetAllAsync();
            return Ok(leads);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lead>> GetLead(Guid id)
        {
            var lead = await _leadRepository.GetByIdAsync(id);
            if (lead == null)
            {
                return NotFound();
            }
            return Ok(lead);
        }

        [HttpPost]
        public async Task<ActionResult<Lead>> CreateLead(Lead lead)
        {
            var createdLead = await _leadRepository.AddAsync(lead);
            return CreatedAtAction(nameof(GetLead), new { id = createdLead.Id }, createdLead);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLead(Guid id, Lead lead)
        {
            if (id != lead.Id)
            {
                return BadRequest();
            }

            await _leadRepository.UpdateAsync(lead);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLead(Guid id)
        {
            var lead = await _leadRepository.GetByIdAsync(id);
            if (lead == null)
            {
                return NotFound();
            }

            await _leadRepository.DeleteAsync(lead);
            return NoContent();
        }
    }
}
