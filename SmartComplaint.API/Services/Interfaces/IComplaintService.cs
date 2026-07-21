using SmartComplaint.API.DTOs.Complaint;
using SmartComplaint.API.DTOs.Officer;

namespace SmartComplaint.API.Services.Interfaces
{
    public interface IComplaintService
    {
        // Register a new complaint
        Task<ComplaintResponseDto> RegisterComplaintAsync(
            CreateComplaintDto complaintDto,
            int userId);

        // Get complaint status using Complaint Number
        Task<ComplaintStatusDto?> GetComplaintStatusAsync(
            string complaintNumber);

        // Get all complaints of a particular user
        Task<List<ComplaintResponseDto>> GetUserComplaintsAsync(
            int userId);
        Task<List<ComplaintTimelineDto>>GetComplaintTimelineAsync(int complaintId);
    }
}