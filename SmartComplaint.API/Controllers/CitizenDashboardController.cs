using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using SmartComplaint.API.Services.Interfaces;

namespace SmartComplaint.API.Controllers
{
    [ApiController]
    [Route("api/citizen/dashboard")]
    [Authorize(Roles = "User")]
    public class CitizenDashboardController : ControllerBase
    {
        private readonly ICitizenDashboardService _dashboardService;

        public CitizenDashboardController(ICitizenDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var userId = Convert.ToInt32(
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            );

            var result = await _dashboardService.GetDashboardAsync(userId);

            return Ok(result);
        }
    }
}