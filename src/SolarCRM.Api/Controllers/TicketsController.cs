using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketsController(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            var tickets = await _ticketRepository.GetAllAsync();
            return Ok(tickets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(Guid id)
        {
            var ticket = await _ticketRepository.GetByIdAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        [HttpPost]
        public async Task<ActionResult<Ticket>> CreateTicket(Ticket ticket)
        {
            var createdTicket = await _ticketRepository.AddAsync(ticket);
            return CreatedAtAction(nameof(GetTicket), new { id = createdTicket.Id }, createdTicket);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(Guid id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }

            await _ticketRepository.UpdateAsync(ticket);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(Guid id)
        {
            var ticket = await _ticketRepository.GetByIdAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            await _ticketRepository.DeleteAsync(ticket);
            return NoContent();
        }
    }
}
