using Microsoft.EntityFrameworkCore;
using SmartComplaint.API.Data;
using SmartComplaint.API.DTOs.Dashboard;
using SmartComplaint.API.Services.Interfaces;

namespace SmartComplaint.API.Services.Implementations
{
    public class CitizenDashboardService : ICitizenDashboardService
    {
        private readonly ApplicationDbContext _context;

        public CitizenDashboardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CitizenDashboardDto> GetDashboardAsync(int userId)
        {
            var complaints = await _context.Complaints
                .Include(c => c.Status)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return new CitizenDashboardDto
            {
                TotalComplaints = complaints.Count,

                Pending = complaints.Count(c =>
                    c.Status != null &&
                    c.Status.StatusName == "Pending"),

                Resolved = complaints.Count(c =>
                    c.Status != null &&
                    c.Status.StatusName == "Resolved"),

                Rejected = complaints.Count(c =>
                    c.Status != null &&
                    c.Status.StatusName == "Rejected")
            };
        }
    }
}