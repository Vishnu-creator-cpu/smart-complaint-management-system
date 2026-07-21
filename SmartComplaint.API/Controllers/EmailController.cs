using Microsoft.AspNetCore.Mvc;
using SmartComplaint.API.Services.Interfaces;

namespace SmartComplaint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpGet("TestEmail")]
        public async Task<IActionResult> TestEmail()
        {
            await _emailService.SendEmailAsync(
                "vprasath023@gmail.com",
                "Smart Complaint System",
                "<h2>Email Service Working Successfully!</h2>");

            return Ok("Email Sent Successfully.");
        }
    }
}