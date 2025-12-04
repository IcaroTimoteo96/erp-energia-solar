using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InteractionsController : ControllerBase
    {
        private readonly IInteractionRepository _interactionRepository;

        public InteractionsController(IInteractionRepository interactionRepository)
        {
            _interactionRepository = interactionRepository;
        }

        [HttpGet("lead/{leadId}")]
        public async Task<ActionResult<IEnumerable<Interaction>>> GetInteractionsByLead(Guid leadId)
        {
            var interactions = await _interactionRepository.GetByLeadIdAsync(leadId);
            return Ok(interactions);
        }

        [HttpPost]
        public async Task<ActionResult<Interaction>> CreateInteraction(Interaction interaction)
        {
            var createdInteraction = await _interactionRepository.AddAsync(interaction);
            return CreatedAtAction(nameof(GetInteractionsByLead), new { leadId = createdInteraction.LeadId }, createdInteraction);
        }
    }
}
