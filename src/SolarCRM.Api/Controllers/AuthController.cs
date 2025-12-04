using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SolarCRM.Domain.Entities;
using SolarCRM.Infrastructure.Services;

namespace SolarCRM.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly AuthService _authService;

    public AuthController(UserManager<User> userManager, AuthService authService)
    {
        _userManager = userManager;
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        var user = new User { UserName = model.Email, Email = model.Email, FullName = model.FullName };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            return Ok(new { message = "User registered successfully" });
        }

        return BadRequest(result.Errors);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        Console.WriteLine($"Login attempt for: {model.Email}");
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            Console.WriteLine("User not found.");
            return Unauthorized("User not found");
        }

        var passwordCheck = await _userManager.CheckPasswordAsync(user, model.Password);
        if (!passwordCheck)
        {
            Console.WriteLine("Password check failed.");
            return Unauthorized("Password check failed");
        }

        var token = await _authService.GenerateTokenAsync(user);
        Console.WriteLine("Login successful, token generated.");
        return Ok(new { token, user = new { user.FullName, user.Email } });
    }
}

public class RegisterDto
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
