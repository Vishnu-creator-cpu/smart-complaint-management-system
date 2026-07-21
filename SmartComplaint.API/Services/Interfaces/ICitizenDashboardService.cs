using SmartComplaint.API.DTOs.Dashboard;

namespace SmartComplaint.API.Services.Interfaces
{
    public interface ICitizenDashboardService
    {
        Task<CitizenDashboardDto> GetDashboardAsync(int userId);
    }
}