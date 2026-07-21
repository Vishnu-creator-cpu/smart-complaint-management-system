using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace SmartComplaint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet("claims")]
        [Authorize]
        public IActionResult GetClaims()
        {
            return Ok(User.Claims.Select(c => new
            {
                c.Type,
                c.Value
            }));
        }
    }
}