using Microsoft.EntityFrameworkCore;
using SmartComplaint.API.Data;
using SmartComplaint.API.DTOs.Complaint;
using SmartComplaint.API.DTOs.Officer;
using SmartComplaint.API.Helpers;
using SmartComplaint.API.Models;
using SmartComplaint.API.Services.Interfaces;
namespace SmartComplaint.API.Services.Implementations
{
    public class ComplaintService : IComplaintService
    {
        private readonly ApplicationDbContext _context;
        private readonly ComplaintNumberGenerator _complaintNumberGenerator;
        private readonly IWebHostEnvironment _environment;
        private readonly IEmailService _emailService;

        public ComplaintService(
            ApplicationDbContext context,
            ComplaintNumberGenerator complaintNumberGenerator,
            IWebHostEnvironment environment,
            IEmailService emailService
            )
        {
            _context = context;
            _complaintNumberGenerator = complaintNumberGenerator;
            _environment = environment;
            _emailService = emailService;
        }

        //Complaint method
        public async Task<ComplaintResponseDto> RegisterComplaintAsync(
        CreateComplaintDto dto,
        int userId)
        {
            var complaintNumber =
                await _complaintNumberGenerator.GenerateComplaintNumberAsync();

            var complaint = new Complaint
            {
                ComplaintNumber = complaintNumber,
                ComplaintTitle = dto.ComplaintTitle,
                ComplaintDescription = dto.ComplaintDescription,
                CategoryId = dto.CategoryId,
                UserId = userId,

                Address = dto.Address,
                District = dto.District,
                State = dto.State,
                Pincode = dto.Pincode,

                Latitude = dto.Latitude,
                Longitude = dto.Longitude,

                StatusId = 1,

                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Complaints.Add(complaint);

            await _context.SaveChangesAsync();


            //Complaint images

            if (dto.ComplaintImage != null)
            {
                var webRoot = _environment.WebRootPath;

                if (string.IsNullOrWhiteSpace(webRoot))
                {
                    webRoot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                }

                Directory.CreateDirectory(webRoot);

                string uploadFolder = Path.Combine(
                                       AppContext.BaseDirectory,
                                         "wwwroot",
                                         "Uploads",
                                         "ComplaintImages");

                Directory.CreateDirectory(uploadFolder);

                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }

                string fileName =
                    Guid.NewGuid().ToString() +
                    Path.GetExtension(dto.ComplaintImage.FileName);

                string filePath =
                    Path.Combine(uploadFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.ComplaintImage.CopyToAsync(stream);
                }

                var image = new Complaintimage
                {
                    ComplaintId = complaint.ComplaintId,

                    ImageType = "Complaint",

                    ImagePath = "/Uploads/ComplaintImages/" + fileName,

                    Latitude = dto.Latitude,

                    Longitude = dto.Longitude,

                    Address = dto.Address,

                    UploadedBy = userId,

                    UploadedAt = DateTime.Now
                };

                _context.Complaintimages.Add(image);
            }

 //Complaint History

            var history = new Complainthistory
            {
                ComplaintId = complaint.ComplaintId,

                PreviousStatusId = null,

                NewStatusId = 1,

                ActionBy = userId,

                Remarks = "Complaint Submitted",

                ActionDate = DateTime.Now
            };

            _context.Complainthistories.Add(history);

            await _context.SaveChangesAsync();

// return

            return new ComplaintResponseDto
            {
                ComplaintId = complaint.ComplaintId,

                ComplaintNumber = complaint.ComplaintNumber,

                ComplaintTitle = complaint.ComplaintTitle,

                Status = "Submitted",

                CreatedAt = complaint.CreatedAt,

                Message = "Complaint Registered Successfully."
            };
        }

//GetComplaintasync
        public async Task<ComplaintStatusDto?> GetComplaintStatusAsync(string complaintNumber)
        {
            var complaint = await _context.Complaints
                .Include(c => c.Status)
                .FirstOrDefaultAsync(c => c.ComplaintNumber == complaintNumber);

            if (complaint == null)
                return null;

            return new ComplaintStatusDto
            {
                ComplaintId = complaint.ComplaintId,
                ComplaintNumber = complaint.ComplaintNumber,
                ComplaintTitle = complaint.ComplaintTitle,
                CurrentStatus = complaint.Status?.StatusName ?? "Unknown",
                LastUpdated = complaint.UpdatedAt
            };
        }

 //GetuserAsync
        public async Task<List<ComplaintResponseDto>> GetUserComplaintsAsync(int userId)
        {
            return await _context.Complaints
                .Include(c => c.Status)
                .Where(c => c.UserId == userId)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new ComplaintResponseDto
                {
                    ComplaintId = c.ComplaintId,
                    ComplaintNumber = c.ComplaintNumber,
                    ComplaintTitle = c.ComplaintTitle,
                    Status = c.Status != null ? c.Status.StatusName : "Unknown",
                    CreatedAt = c.CreatedAt,
                    Message = ""
                })
                .ToListAsync();
        }
        public async Task<List<ComplaintTimelineDto>>
GetComplaintTimelineAsync(int complaintId)
        {
            var timeline = await _context.Complaintimages

                .Where(c => c.ComplaintId == complaintId)

                .Select(c => new ComplaintTimelineDto
                {
                    Stage = c.ImageType,
                    ImagePath = c.ImagePath,
                    Latitude = c.Latitude,
                    Longitude = c.Longitude,
                    Address = c.Address,
                    UploadedAt = c.UploadedAt
                })

                .OrderBy(c => c.UploadedAt)

                .ToListAsync();

            return timeline;
        }
    }
  }

