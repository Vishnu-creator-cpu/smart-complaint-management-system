using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartComplaint.API.Services.Interfaces;
using System.Security.Claims;

namespace SmartComplaint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var profile = await _profileService.GetProfileAsync(userId);

            if (profile == null)
                return NotFound(new
                {
                    Success = false,
                    Message = "User not found."
                });

            return Ok(new
            {
                Success = true,
                Data = profile
            });
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProfile(ProfileDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var result = await _profileService
                .UpdateProfileAsync(userId, dto);

            return Ok(new
            {
                Success = true,
                Message = result
            });
        }
    }
}