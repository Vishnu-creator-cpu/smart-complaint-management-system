using Microsoft.EntityFrameworkCore;
using SmartComplaint.API.Data;
using SmartComplaint.API.DTOs.Officer;
using SmartComplaint.API.Services.Interfaces;
using SmartComplaint.API.Models;
using Microsoft.AspNetCore.Hosting;

namespace SmartComplaint.API.Services.Implementations
{
    public class OfficerService : IOfficerService
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public OfficerService(
        ApplicationDbContext context,
        IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<List<OfficerComplaintDto>> GetAssignedComplaintsAsync(int userId)
        {
            // First find OfficerId using logged in UserId
            var officer = await _context.Officers
                .FirstOrDefaultAsync(o => o.UserId == userId);

            if (officer == null)
                return new List<OfficerComplaintDto>();

            var complaints = await _context.Assignments
                .Where(a => a.OfficerId == officer.OfficerId)
                .Include(a => a.Complaint)
                    .ThenInclude(c => c.User)
                .Include(a => a.Complaint)
                    .ThenInclude(c => c.Category)
                .Include(a => a.Complaint)
                    .ThenInclude(c => c.Status)
                .Select(a => new OfficerComplaintDto
                {
                    ComplaintId = a.Complaint.ComplaintId,
                    ComplaintNumber = a.Complaint.ComplaintNumber,
                    ComplaintTitle = a.Complaint.ComplaintTitle,
                    CitizenName = a.Complaint.User.FullName,
                    Category = a.Complaint.Category.CategoryName,
                    Status = a.Complaint.Status != null
                                ? a.Complaint.Status.StatusName
                                : "Unknown",
                    CreatedAt = a.Complaint.CreatedAt
                })
                .ToListAsync();

            return complaints;
        }

        public async Task<OfficerComplaintDetailsDto?> GetComplaintDetailsAsync(
    int complaintId,
    int userId)
        {
            // Find logged-in officer
            var officer = await _context.Officers
                .FirstOrDefaultAsync(o => o.UserId == userId);

            if (officer == null)
                return null;

            // Check whether complaint is assigned to this officer
            var assignment = await _context.Assignments
                .Include(a => a.Complaint)
                    .ThenInclude(c => c.User)
                .Include(a => a.Complaint)
                    .ThenInclude(c => c.Category)
                .Include(a => a.Complaint)
                    .ThenInclude(c => c.Status)
                .FirstOrDefaultAsync(a =>
                    a.ComplaintId == complaintId &&
                    a.OfficerId == officer.OfficerId);

            if (assignment == null)
                return null;

            // Get complaint image
            var image = await _context.Complaintimages
                .FirstOrDefaultAsync(i =>
                    i.ComplaintId == complaintId &&
                    i.ImageType == "Complaint");

            return new OfficerComplaintDetailsDto
            {
                ComplaintId = assignment.Complaint.ComplaintId,
                ComplaintNumber = assignment.Complaint.ComplaintNumber,
                ComplaintTitle = assignment.Complaint.ComplaintTitle,
                ComplaintDescription = assignment.Complaint.ComplaintDescription,
                CitizenName = assignment.Complaint.User.FullName,
                Category = assignment.Complaint.Category.CategoryName,
                Address = assignment.Complaint.Address,
                District = assignment.Complaint.District,
                State = assignment.Complaint.State,
                Pincode = assignment.Complaint.Pincode,
                Latitude = (decimal)assignment.Complaint.Latitude,
                Longitude = (decimal)assignment.Complaint.Longitude,
                Status = assignment.Complaint.Status != null
                            ? assignment.Complaint.Status.StatusName
                            : "Unknown",
                ComplaintImage = image != null ? image.ImagePath : ""
            };
        }

        //upload work before
        public async Task<string> UploadBeforeWorkAsync(
    BeforeWorkDto dto,
    int userId)
        {
            // Find logged in officer
            var officer = await _context.Officers
                .FirstOrDefaultAsync(o => o.UserId == userId);

            if (officer == null)
                return "Officer not found.";

            // Check assignment
            var assignment = await _context.Assignments
                .FirstOrDefaultAsync(a =>
                    a.ComplaintId == dto.ComplaintId &&
                    a.OfficerId == officer.OfficerId);

            if (assignment == null)
                return "Complaint is not assigned to you.";

            // Create folder
            var uploadFolder = Path.Combine(
                _environment.WebRootPath,
                "Uploads",
                "BeforeWork");

            Directory.CreateDirectory(uploadFolder);

            // Save image
            var fileName = Guid.NewGuid().ToString() +
                           Path.GetExtension(dto.Image.FileName);

            var filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }

            // Save image details
            var image = new Complaintimage
            {
                ComplaintId = dto.ComplaintId,
                ImageType = "BeforeWork",
                ImagePath = "/Uploads/BeforeWork/" + fileName,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                Address = dto.Address,
                UploadedBy = userId,
                UploadedAt = DateTime.Now
            };

            _context.Complaintimages.Add(image);

            await _context.SaveChangesAsync();

            return "Before Work Image Uploaded Successfully.";
        }

        public async Task<string> UploadDuringWorkAsync(
     DuringWorkDto dto,
     int userId)
        {
            // Find logged in officer
            var officer = await _context.Officers
                .FirstOrDefaultAsync(o => o.UserId == userId);

            if (officer == null)
                return "Officer not found.";

            // Check assignment
            var assignment = await _context.Assignments
                .FirstOrDefaultAsync(a =>
                    a.ComplaintId == dto.ComplaintId &&
                    a.OfficerId == officer.OfficerId);

            if (assignment == null)
                return "Complaint is not assigned to you.";

            // Create upload folder
            var uploadFolder = Path.Combine(
                _environment.WebRootPath,
                "Uploads",
                "DuringWork");

            Directory.CreateDirectory(uploadFolder);

            // Save image
            var fileName = Guid.NewGuid().ToString() +
                           Path.GetExtension(dto.Image.FileName);

            var filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }

            // Save database record
            var image = new Complaintimage
            {
                ComplaintId = dto.ComplaintId,
                ImageType = "DuringWork",
                ImagePath = "/Uploads/DuringWork/" + fileName,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                Address = dto.Address,
                UploadedBy = userId,
                UploadedAt = DateTime.Now
            };

            _context.Complaintimages.Add(image);

            await _context.SaveChangesAsync();

            return "During Work Image Uploaded Successfully.";
        }
        public async Task<string> UploadAfterWorkAsync(
    AfterWorkDto dto,
    int userId)
        {
            // Find logged in officer
            var officer = await _context.Officers
                .FirstOrDefaultAsync(o => o.UserId == userId);

            if (officer == null)
                return "Officer not found.";

            // Check assignment
            var assignment = await _context.Assignments
                .FirstOrDefaultAsync(a =>
                    a.ComplaintId == dto.ComplaintId &&
                    a.OfficerId == officer.OfficerId);

            if (assignment == null)
                return "Complaint is not assigned to you.";

            // Create upload folder
            var uploadFolder = Path.Combine(
                _environment.WebRootPath,
                "Uploads",
                "AfterWork");

            Directory.CreateDirectory(uploadFolder);

            // Save image
            var fileName = Guid.NewGuid().ToString() +
                           Path.GetExtension(dto.Image.FileName);

            var filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }

            // Save database record
            var image = new Complaintimage
            {
                ComplaintId = dto.ComplaintId,
                ImageType = "AfterWork",
                ImagePath = "/Uploads/AfterWork/" + fileName,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                Address = dto.Address,
                UploadedBy = userId,
                UploadedAt = DateTime.Now
            };

            _context.Complaintimages.Add(image);

            await _context.SaveChangesAsync();

            return "After Work Image Uploaded Successfully.";
        }

        public async Task<string> CompleteComplaintAsync(
    CompleteComplaintDto dto,
    int userId)
        {
            // Find logged in officer
            var officer = await _context.Officers
                .FirstOrDefaultAsync(o => o.UserId == userId);

            if (officer == null)
                return "Officer not found.";

            // Check assignment
            var assignment = await _context.Assignments
                .FirstOrDefaultAsync(a =>
                    a.ComplaintId == dto.ComplaintId &&
                    a.OfficerId == officer.OfficerId);

            if (assignment == null)
                return "Complaint is not assigned to you.";

            // Find complaint
            var complaint = await _context.Complaints
                .FirstOrDefaultAsync(c => c.ComplaintId == dto.ComplaintId);

            if (complaint == null)
                return "Complaint not found.";

            // Update complaint status (Resolved)
            complaint.StatusId = 6;
            complaint.UpdatedAt = DateTime.Now;

            // Save complaint history
            var history = new Complainthistory
            {
                ComplaintId = dto.ComplaintId,
                PreviousStatusId = 2, // Assigned
                NewStatusId = 6,      // Resolved
                ActionBy = userId,
                Remarks = dto.Remarks,
                ActionDate = DateTime.Now
            };

            _context.Complainthistories.Add(history);

            await _context.SaveChangesAsync();

            return "Complaint Completed Successfully.";
        }
        
        public async Task<OfficerProfileDto>
GetProfileAsync(int userId)
        {

            var officer = await _context.Officers

                .Include(o => o.User)

                .FirstOrDefaultAsync(o => o.UserId == userId);


            if (officer == null)
                return null;


            var totalAssigned = await _context.Assignments

                .CountAsync(a => a.OfficerId == officer.OfficerId);


            var resolvedComplaints = await _context.Assignments

                .CountAsync(a =>

                a.OfficerId == officer.OfficerId &&

                a.Complaint.StatusId == 6);


            var inProgressComplaints = await _context.Assignments

                .CountAsync(a =>

                a.OfficerId == officer.OfficerId &&

                a.Complaint.StatusId == 4);


            return new OfficerProfileDto
            {
                FullName = officer.User.FullName,

                Email = officer.User.Email,

                PhoneNumber = officer.User.PhoneNumber,

                Address = officer.User.Address,

                District = officer.User.District,

                State = officer.User.State,

                Pincode = officer.User.Pincode,

                EmployeeCode = officer.EmployeeCode,

                Department = officer.Department,

                Designation = officer.Designation,

                ServiceArea = officer.ServiceArea,

                TotalAssignedComplaints = totalAssigned,

                TotalResolvedComplaints = resolvedComplaints,

                TotalInProgressComplaints = inProgressComplaints
            };

        }
        public async Task<string> ChangePasswordAsync(
    ChangePasswordDto dto,
    int userId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
                return "User not found.";

            // Check current password

            if (!BCrypt.Net.BCrypt.Verify(
                dto.CurrentPassword,
                user.PasswordHash))
            {
                return "Current password is incorrect.";
            }

            // Check new password and confirm password

            if (dto.NewPassword != dto.ConfirmPassword)
            {
                return "Passwords do not match.";
            }

            // Update password

            user.PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(
                    dto.NewPassword);

            await _context.SaveChangesAsync();

            return "Password changed successfully.";
        }

        public async Task<string> UpdateProfileAsync(
         UpdateProfileDto dto,int userId)
        {

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
                return "User not found.";


            // Phone number already exists check

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(x =>

                    x.PhoneNumber == dto.PhoneNumber
                    &&
                    x.UserId != userId

                );


            if (existingUser != null)
            {
                return "Phone Number already exists.";
            }


            // Update details

            user.PhoneNumber = dto.PhoneNumber;
            user.Address = dto.Address;
            user.District = dto.District;
            user.State = dto.State;
            user.Pincode = dto.Pincode;


            await _context.SaveChangesAsync();


            return "Profile Updated Successfully.";

        }
        public async Task<List<NotificationDto>>
        GetNotificationsAsync(int userId)
        {
            return await _context.Notifications

                .Where(n => n.UserId == userId)

                .OrderByDescending(n => n.CreatedAt)

                .Select(n => new NotificationDto
                {
                    NotificationId = n.NotificationId,
                    Title = n.Title,
                    Message = n.Message,
                    IsRead = n.IsRead,
                    CreatedAt = n.CreatedAt
                })

                .ToListAsync();
        }
        public async Task<ComplaintHistoryDto>
GetComplaintHistoryAsync(int complaintId, int userId)
        {
            // Logged in Officer

            var officer = await _context.Officers
                .FirstOrDefaultAsync(o => o.UserId == userId);


            if (officer == null)
                return null;


            // Check whether complaint is assigned

            var assignment = await _context.Assignments

                .Include(a => a.Complaint)

                .FirstOrDefaultAsync(a =>

                    a.ComplaintId == complaintId &&
                    a.OfficerId == officer.OfficerId);


            if (assignment == null)
                return null;


            // Fetch Complaint Details

            var complaint = await _context.Complaints

                .Include(c => c.Status)

                .FirstOrDefaultAsync(c =>
                    c.ComplaintId == complaintId);


            if (complaint == null)
                return null;


            // Fetch Complaint Images

            var images = await _context.Complaintimages

                .Where(i => i.ComplaintId == complaintId)

                .Select(i => new ComplaintImageDto
                {
                    ImageType = i.ImageType,
                    ImagePath = i.ImagePath,
                    Latitude = i.Latitude,
                    Longitude = i.Longitude,
                    Address = i.Address,
                    UploadedAt = i.UploadedAt
                })

                .ToListAsync();


            // Fetch Complaint Completion History

            var completionHistory = await _context.Complainthistories

                .OrderByDescending(h => h.ActionDate)

                .FirstOrDefaultAsync(h =>
                    h.ComplaintId == complaintId);


            // Return DTO

            return new ComplaintHistoryDto
            {
                ComplaintNumber = complaint.ComplaintNumber,

                ComplaintTitle = complaint.ComplaintTitle,

                Status = complaint.Status?.StatusName,

                ComplaintDate = complaint.CreatedAt,

                AssignedDate = assignment.AssignedDate,

                CompletedDate = completionHistory?.ActionDate,

                Remarks = completionHistory?.Remarks,

                Images = images
            };
        }
        public async Task<string> MarkNotificationAsReadAsync(
    int notificationId,
    int userId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n =>
                    n.NotificationId == notificationId &&
                    n.UserId == userId);

            if (notification == null)
            {
                return "Notification not found.";
            }

            notification.IsRead = true;

            await _context.SaveChangesAsync();

            return "Notification marked as read successfully.";
        }
        public async Task<OfficerDashboardDto> GetDashboardAsync(int userId)
        {
            var officer = await _context.Officers
                .FirstOrDefaultAsync(o => o.UserId == userId);

            if (officer == null)
                return null;

            var totalAssigned = await _context.Assignments
                .CountAsync(a => a.OfficerId == officer.OfficerId);

            var totalResolved = await _context.Assignments
                .CountAsync(a =>
                    a.OfficerId == officer.OfficerId &&
                    a.Complaint.StatusId == 6);

            var totalInProgress = await _context.Assignments
                .CountAsync(a =>
                    a.OfficerId == officer.OfficerId &&
                    a.Complaint.StatusId == 3);

            var totalPending =
                totalAssigned - totalResolved - totalInProgress;

            return new OfficerDashboardDto
            {
                TotalAssigned = totalAssigned,
                TotalResolved = totalResolved,
                TotalInProgress = totalInProgress,
                TotalPending = totalPending
            };
        }
    }
} 