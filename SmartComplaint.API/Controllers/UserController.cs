using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartComplaint.API.DTOs.Common;
using SmartComplaint.API.Services.Implementations;
using SmartComplaint.API.Services.Interfaces;
using System.Security.Claims;

namespace SmartComplaint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public UserController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("Profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var profile = await _profileService.GetProfileAsync(userId);

            if (profile == null)
                return NotFound();

            return Ok(profile);
        }

        [HttpPut("Profile")]
        public async Task<IActionResult> UpdateProfile(ProfileDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            bool updated = await _profileService.UpdateProfileAsync(userId, dto);

            if (!updated)
                return NotFound();

            return Ok("Profile Updated Successfully");
        }
    }
}