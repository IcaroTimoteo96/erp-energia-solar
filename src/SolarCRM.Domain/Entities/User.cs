using Microsoft.AspNetCore.Identity;

namespace SolarCRM.Domain.Entities;

public class User : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
}
