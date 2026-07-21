using Microsoft.AspNetCore.Mvc;
using SmartComplaint.API.DTOs.Auth;
using SmartComplaint.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace SmartComplaint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST: api/Auth/Register
        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterAsync(model);

            if (result == "Registration Successful")
            {
                return Ok(new
                {
                    Success = true,
                    Message = result
                });
            }

            return BadRequest(new
            {
                Success = false,
                Message = result
            });
        }

        // POST: api/Auth/Login
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _authService.LoginAsync(model);

            if (!response.Success)
            {
                return Unauthorized(response);
            }

            return Ok(response);
        }
    }
}