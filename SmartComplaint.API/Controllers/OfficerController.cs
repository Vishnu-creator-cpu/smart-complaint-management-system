using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartComplaint.API.DTOs.Officer;
using SmartComplaint.API.Services.Interfaces;
using System.Security.Claims;

namespace SmartComplaint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Officer")]
    public class OfficerController : ControllerBase
    {
        private readonly IOfficerService _officerService;

        public OfficerController(IOfficerService officerService)
        {
            _officerService = officerService;
        }

        // =====================================
        // My Assigned Complaints
        // =====================================

        [HttpGet("MyComplaints")]
        public async Task<IActionResult> MyComplaints()
        {
            var officerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (officerIdClaim == null)
                return Unauthorized();

            int officerId = int.Parse(officerIdClaim.Value);

            var result = await _officerService.GetAssignedComplaintsAsync(officerId);

            return Ok(result);
        }
        // =====================================
        // Complaint Details
        // =====================================

        [HttpGet("Complaint/{complaintId}")]
        public async Task<IActionResult> GetComplaintDetails(int complaintId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var result = await _officerService.GetComplaintDetailsAsync(
                complaintId,
                userId);

            if (result == null)
                return NotFound("Complaint not found.");

            return Ok(result);
        }
        // =====================================
        // Upload Before Work Image
        // =====================================

        [HttpPost("UploadBeforeWork")]
        public async Task<IActionResult> UploadBeforeWork([FromForm] BeforeWorkDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var result = await _officerService.UploadBeforeWorkAsync(dto, userId);

            return Ok(result);
        }
        // =====================================
        // Upload During Work Image
        // =====================================

        [HttpPost("UploadDuringWork")]
        public async Task<IActionResult> UploadDuringWork([FromForm] DuringWorkDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var result = await _officerService.UploadDuringWorkAsync(dto, userId);

            return Ok(result);
        }
        // =====================================
        // Upload After Work Image
        // =====================================

        [HttpPost("UploadAfterWork")]
        public async Task<IActionResult> UploadAfterWork([FromForm] AfterWorkDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var result = await _officerService.UploadAfterWorkAsync(dto, userId);

            return Ok(result);
        }
        [HttpPost("CompleteComplaint")]
        public async Task<IActionResult> CompleteComplaint(
    CompleteComplaintDto dto)
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var result =
                await _officerService
                .CompleteComplaintAsync(dto, userId);

            return Ok(result);
        }
        // =====================================
        // Officer Profile
        // =====================================

        [HttpGet("Profile")]
        public async Task<IActionResult> GetProfile()
        {

            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier);


            if (userIdClaim == null)
                return Unauthorized();


            int userId = int.Parse(userIdClaim.Value);


            var result =
                await _officerService
                .GetProfileAsync(userId);


            return Ok(result);

        }
        [HttpPut("ChangePassword")]
        public async Task<IActionResult>
         ChangePassword(ChangePasswordDto dto)
        {
            var userIdClaim =
                User.FindFirst(
                    ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId =
                int.Parse(userIdClaim.Value);

            var result =
                await _officerService
                .ChangePasswordAsync(
                    dto,
                    userId);

            return Ok(result);
        }
        [HttpPut("UpdateProfile")]
        public async Task<IActionResult>
UpdateProfile(UpdateProfileDto dto)
        {

            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier);


            if (userIdClaim == null)
                return Unauthorized();


            int userId =
                int.Parse(userIdClaim.Value);


            var result =
                await _officerService
                .UpdateProfileAsync(dto, userId);


            return Ok(result);

        }
        [HttpGet("Notifications")]
        public async Task<IActionResult>
GetNotifications()
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();


            int userId =
                int.Parse(userIdClaim.Value);


            var result =
                await _officerService
                .GetNotificationsAsync(userId);


            return Ok(result);
        }
        

        [HttpGet("ComplaintHistory/{complaintId}")]
        public async Task<IActionResult>
GetComplaintHistory(int complaintId)
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();


            int userId =
                int.Parse(userIdClaim.Value);


            var result =
                await _officerService
                .GetComplaintHistoryAsync(
                    complaintId,
                    userId);


            if (result == null)
                return NotFound(
                    "Complaint history not found."
                );


            return Ok(result);
        }

        [HttpPut("MarkNotificationAsRead/{notificationId}")]
        public async Task<IActionResult> MarkNotificationAsRead(
     int notificationId)
        {
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var result =
                await _officerService.MarkNotificationAsReadAsync(
                    notificationId,
                    userId);

            return Ok(result);
        }
        [HttpGet("Dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var result = await _officerService.GetDashboardAsync(userId);

            return Ok(result);
        }
    }
}