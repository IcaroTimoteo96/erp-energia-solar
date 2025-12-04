using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Domain.Interfaces;

namespace SolarCRM.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly IInvoiceRepository _repository;

    public InvoicesController(IInvoiceRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var invoices = await _repository.GetInvoicesWithDetailsAsync();
        return Ok(invoices);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var invoice = await _repository.GetByIdAsync(id);
        if (invoice == null) return NotFound();
        return Ok(invoice);
    }

    [HttpGet("number/{invoiceNumber}")]
    public async Task<IActionResult> GetByNumber(string invoiceNumber)
    {
        var invoice = await _repository.GetByInvoiceNumberAsync(invoiceNumber);
        if (invoice == null) return NotFound();
        return Ok(invoice);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Invoice invoice)
    {
        await _repository.AddAsync(invoice);
        return CreatedAtAction(nameof(GetById), new { id = invoice.Id }, invoice);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Invoice invoice)
    {
        if (id != invoice.Id) return BadRequest();
        await _repository.UpdateAsync(invoice);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var invoice = await _repository.GetByIdAsync(id);
        if (invoice == null) return NotFound();

        await _repository.DeleteAsync(invoice);
        return NoContent();
    }
}
