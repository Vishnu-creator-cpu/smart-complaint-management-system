using Microsoft.EntityFrameworkCore;
using SmartComplaint.API.Data;
using SmartComplaint.API.DTOs.Admin;
using SmartComplaint.API.DTOs.Dashboard;
using SmartComplaint.API.Models;
using SmartComplaint.API.Services.Interfaces;

namespace SmartComplaint.API.Services.Implementations
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public AdminService(
            ApplicationDbContext context,
            IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // ============================================
        // Get Dashboard
        // ============================================

        public async Task<AdminDashboardDto> GetDashboardAsync()
        {
            return new AdminDashboardDto
            {
                TotalComplaints = await _context.Complaints.CountAsync(),

                SubmittedComplaints = await _context.Complaints
                    .CountAsync(c => c.StatusId == 1),

                AssignedComplaints = await _context.Complaints
                    .CountAsync(c => c.StatusId == 2),

                ResolvedComplaints = await _context.Complaints
                    .CountAsync(c => c.StatusId == 6),

                PendingComplaints = await _context.Complaints
                    .CountAsync(c => c.StatusId == 1),

                InProgressComplaints = await _context.Complaints
                    .CountAsync(c => c.StatusId == 3),

                RejectedComplaints = await _context.Complaints
                    .CountAsync(c => c.StatusId == 5),

                TotalUsers = await _context.Users
                    .CountAsync(u => u.RoleId == 3),

                TotalOfficers = await _context.Users
                    .CountAsync(u => u.RoleId == 2)
            };
        }

        // ============================================
        // Get All Complaints
        // ============================================

        public async Task<List<AdminComplaintDto>> GetAllComplaintsAsync()
        {
            return await _context.Complaints
                .Include(c => c.User)
                .Include(c => c.Category)
                .Include(c => c.Status)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new AdminComplaintDto
                {
                    ComplaintId = c.ComplaintId,
                    ComplaintNumber = c.ComplaintNumber,
                    ComplaintTitle = c.ComplaintTitle,
                    CitizenName = c.User.FullName,
                    Category = c.Category.CategoryName,
                    Status = c.Status != null
                        ? c.Status.StatusName
                        : "Unknown",
                    CreatedAt = c.CreatedAt
                })
                .ToListAsync();
        }

        // ============================================
        // Assign Complaint
        // ============================================

        public async Task<string> AssignComplaintAsync(
            AssignComplaintDto dto,
            int adminUserId)
        {
            var complaint = await _context.Complaints
                .FirstOrDefaultAsync(c => c.ComplaintId == dto.ComplaintId);

            if (complaint == null)
                return "Complaint not found.";

            var officer = await _context.Officers
    .Include(o => o.User)
    .FirstOrDefaultAsync(o => o.OfficerId == dto.OfficerId);

            if (officer == null)
                return "Officer not found.";

            var assignment = new Assignment
            {
                ComplaintId = dto.ComplaintId,
                OfficerId = dto.OfficerId,
                AssignedBy = adminUserId,
                AssignedDate = DateTime.Now
            };

            _context.Assignments.Add(assignment);

            complaint.StatusId = 2;
            complaint.UpdatedAt = DateTime.Now;

            _context.Complainthistories.Add(new Complainthistory
            {
                ComplaintId = dto.ComplaintId,
                PreviousStatusId = 1,
                NewStatusId = 2,
                ActionBy = adminUserId,
                Remarks = dto.Remarks,
                ActionDate = DateTime.Now
            });
            _context.Notifications.Add(new Notification
            {
                UserId = officer.UserId,
                Title = "Complaint Assigned",
                Message =
        $"Complaint {complaint.ComplaintNumber} has been assigned to you.",
                IsRead = false,
                CreatedAt = DateTime.Now
            });

            await _context.SaveChangesAsync();

            await _emailService.SendEmailAsync(

    officer.User.Email,

    "Complaint Assigned Successfully",

    $@"
    <h2>Smart Complaint Management System</h2>

    <p>Hello {officer.User.FullName},</p>

    <p>
        A new complaint has been assigned to you.
    </p>

    <p>
        <b>Complaint Number :</b>
        {complaint.ComplaintNumber}
    </p>

    <p>
        <b>Complaint Title :</b>
        {complaint.ComplaintTitle}
    </p>

    <p>
        Please login to the Officer Portal and start working on the complaint.
    </p>

    <br/>

    <p>
        Thank You.
    </p>
");


            return "Complaint Assigned Successfully.";
        }

        // ============================================
        // Update Complaint Status
        // ============================================

        public async Task<string> UpdateComplaintStatusAsync(
            int complaintId,
            int statusId,
            string remarks,
            int adminUserId)
        {
            var complaint = await _context.Complaints
                .FirstOrDefaultAsync(c => c.ComplaintId == complaintId);

            if (complaint == null)
                return "Complaint not found.";

            int? previousStatus = complaint.StatusId;

            complaint.StatusId = statusId;
            complaint.UpdatedAt = DateTime.Now;

            _context.Complainthistories.Add(new Complainthistory
            {
                ComplaintId = complaintId,
                PreviousStatusId = previousStatus,
                NewStatusId = statusId,
                ActionBy = adminUserId,
                Remarks = remarks,
                ActionDate = DateTime.Now
            });

            await _context.SaveChangesAsync();



            return "Complaint Status Updated Successfully.";
        }

        // ============================================
        // Filter By Date
        // ============================================

        public async Task<List<ComplaintListDto>> GetComplaintsByDateAsync(
            DateTime from,
            DateTime to)
        {
            return await _context.Complaints
                .Include(c => c.User)
                .Include(c => c.Category)
                .Include(c => c.Status)
                .Where(c =>
                    c.CreatedAt.HasValue &&
                    c.CreatedAt.Value >= from.Date &&
                    c.CreatedAt.Value < to.Date.AddDays(1))
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new ComplaintListDto
                {
                    ComplaintId = c.ComplaintId,
                    ComplaintNumber = c.ComplaintNumber,
                    ComplaintTitle = c.ComplaintTitle,
                    CitizenName = c.User.FullName,
                    Category = c.Category.CategoryName,
                    Status = c.Status != null
                        ? c.Status.StatusName
                        : "Unknown",
                    CreatedAt = c.CreatedAt.Value
                })
                .ToListAsync();
        }

        public async Task<List<OfficerDto>> GetAllOfficersAsync()
        {
            return await _context.Officers
                .Include(o => o.User)
                .Select(o => new OfficerDto
                {
                    OfficerId = o.OfficerId,
                    FullName = o.User.FullName
                })
                .ToListAsync();
        }
    }
}