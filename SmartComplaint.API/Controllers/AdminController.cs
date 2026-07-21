using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartComplaint.API.DTOs.Admin;
using SmartComplaint.API.Services.Interfaces;
using System.Security.Claims;

namespace SmartComplaint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // ===============================
        // Dashboard
        // ===============================

        [HttpGet("dashboard")]
        public async Task<IActionResult> Dashboard()
        {
            var result = await _adminService.GetDashboardAsync();

            return Ok(result);
        }

        // ===============================
        // All Complaints
        // ===============================

        [HttpGet("complaints")]
        public async Task<IActionResult> GetAllComplaints()
        {
            var result = await _adminService.GetAllComplaintsAsync();

            return Ok(result);
        }

        // ===============================
        // Assign Complaint
        // ===============================

        [HttpPost("assign")]
        public async Task<IActionResult> AssignComplaint(
            AssignComplaintDto dto)
        {
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var result = await _adminService.AssignComplaintAsync(
                dto,
                userId);

            return Ok(result);
        }

        // ===============================
        // Update Complaint Status
        // ===============================

        [HttpPut("update-status")]
        public async Task<IActionResult> UpdateStatus(
    UpdateComplaintStatusDto dto)
        {
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var result =
                await _adminService.UpdateComplaintStatusAsync(
                    dto.ComplaintId,
                    dto.StatusId,
                    dto.Remarks,
                    userId);

            return Ok(result);
        }

        // ===============================
        // Complaints By Date
        // ===============================

        [HttpGet("complaints/date")]
        public async Task<IActionResult> GetByDate(
            DateTime from,
            DateTime to)
        {
            var result =
                await _adminService.GetComplaintsByDateAsync(
                    from,
                    to);

            return Ok(result);
        }

        [HttpGet("officers")]
        public async Task<IActionResult> GetAllOfficers()
        {
            var result = await _adminService.GetAllOfficersAsync();

            return Ok(result);
        }
    }
}