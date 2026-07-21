using SmartComplaint.API.DTOs.Admin;
using SmartComplaint.API.DTOs.Dashboard;

namespace SmartComplaint.API.Services.Interfaces
{
    public interface IAdminService
    {
        Task<AdminDashboardDto> GetDashboardAsync();

        Task<List<AdminComplaintDto>> GetAllComplaintsAsync();

        Task<string> AssignComplaintAsync(
            AssignComplaintDto dto,
            int adminUserId);

        Task<List<ComplaintListDto>> GetComplaintsByDateAsync(
            DateTime from,
            DateTime to);

        Task<List<OfficerDto>> GetAllOfficersAsync();

        Task<string> UpdateComplaintStatusAsync(
            int complaintId,
            int statusId,
            string remarks,
            int adminUserId);
    }
}