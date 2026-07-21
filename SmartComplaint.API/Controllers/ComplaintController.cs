using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartComplaint.API.DTOs.Complaint;
using SmartComplaint.API.Services.Interfaces;
using System.Security.Claims;

namespace SmartComplaint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ComplaintController : ControllerBase
    {
        private readonly IComplaintService _complaintService;

        public ComplaintController(IComplaintService complaintService)
        {
            _complaintService = complaintService;
        }

        // ===========================
        // Register Complaint
        // ===========================

        [HttpPost("Register")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> RegisterComplaint([FromForm] CreateComplaintDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var result = await _complaintService.RegisterComplaintAsync(dto, userId);

            return Ok(result);
        }

        // ===========================
        // Track Complaint
        // ===========================

        [HttpGet("Status/{complaintNumber}")]
        public async Task<IActionResult> GetComplaintStatus(string complaintNumber)
        {
            var result = await _complaintService.GetComplaintStatusAsync(complaintNumber);

            if (result == null)
                return NotFound("Complaint not found.");

            return Ok(result);
        }

        // ===========================
        // My Complaints
        // ===========================

        [HttpGet("MyComplaints")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> MyComplaints()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var result = await _complaintService.GetUserComplaintsAsync(userId);

            return Ok(result);
        }
        [HttpGet("Timeline/{complaintId}")]
        public async Task<IActionResult>
GetTimeline(int complaintId)
        {
            var result =
                await _complaintService
                .GetComplaintTimelineAsync(complaintId);

            return Ok(result);
        }
    }
}