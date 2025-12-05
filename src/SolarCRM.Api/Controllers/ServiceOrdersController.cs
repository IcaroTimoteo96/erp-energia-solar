using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers
{
    [ApiController]
    [Route("api/service-orders")]
    public class ServiceOrdersController : ControllerBase
    {
        private readonly IServiceOrderRepository _serviceOrderRepository;

        public ServiceOrdersController(IServiceOrderRepository serviceOrderRepository)
        {
            _serviceOrderRepository = serviceOrderRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceOrder>>> GetServiceOrders()
        {
            var serviceOrders = await _serviceOrderRepository.GetAllAsync();
            return Ok(serviceOrders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceOrder>> GetServiceOrder(Guid id)
        {
            var serviceOrder = await _serviceOrderRepository.GetServiceOrderWithChecklistAsync(id);
            if (serviceOrder == null)
            {
                return NotFound();
            }
            return Ok(serviceOrder);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceOrder>> CreateServiceOrder(ServiceOrder serviceOrder)
        {
            try
            {
                var createdServiceOrder = await _serviceOrderRepository.AddAsync(serviceOrder);
                return CreatedAtAction(nameof(GetServiceOrder), new { id = createdServiceOrder.Id }, createdServiceOrder);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating service order: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateServiceOrder(Guid id, ServiceOrder serviceOrder)
        {
            if (id != serviceOrder.Id)
            {
                return BadRequest();
            }

            await _serviceOrderRepository.UpdateAsync(serviceOrder);
            return NoContent();
        }

        [HttpPost("{id}/checklist")]
        public async Task<IActionResult> AddChecklistItem(Guid id, [FromBody] ChecklistItem item)
        {
            var serviceOrder = await _serviceOrderRepository.GetServiceOrderWithChecklistAsync(id);
            if (serviceOrder == null)
            {
                return NotFound();
            }

            serviceOrder.Checklist.Add(item);
            await _serviceOrderRepository.UpdateAsync(serviceOrder);

            return Ok(item);
        }
    }
}
