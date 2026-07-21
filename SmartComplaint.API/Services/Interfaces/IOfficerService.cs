using SmartComplaint.API.DTOs.Dashboard;
using SmartComplaint.API.DTOs.Officer;

namespace SmartComplaint.API.Services.Interfaces
{
    public interface IOfficerService
    {
        Task<List<OfficerComplaintDto>> GetAssignedComplaintsAsync(int officerId);
        Task<OfficerComplaintDetailsDto?> GetComplaintDetailsAsync(int complaintId, int userId);
        Task<string> UploadBeforeWorkAsync(BeforeWorkDto dto, int userId);
        Task<string> UploadDuringWorkAsync(DuringWorkDto dto, int userId);
        Task<string> UploadAfterWorkAsync(AfterWorkDto dto, int userId);
        Task<string> CompleteComplaintAsync(CompleteComplaintDto dto, int userId);
        Task<OfficerProfileDto> GetProfileAsync(int officerId);
        Task<string> ChangePasswordAsync(ChangePasswordDto dto,int userId);
        Task<string> UpdateProfileAsync(UpdateProfileDto dto,int userId);
        Task<List<NotificationDto>>GetNotificationsAsync(int userId);
        Task<ComplaintHistoryDto> GetComplaintHistoryAsync(int complaintId,int userId);
        Task<string> MarkNotificationAsReadAsync(int notificationId, int userId);
        Task<OfficerDashboardDto> GetDashboardAsync(int userId);
    }
}