using Microsoft.EntityFrameworkCore;
using SmartComplaint.API.Data;

namespace SmartComplaint.API.Helpers
{
    public class ComplaintNumberGenerator
    {
        private readonly ApplicationDbContext _context;

        public ComplaintNumberGenerator(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> GenerateComplaintNumberAsync()
        {
            int currentYear = DateTime.Now.Year;

            // Get the latest complaint number for the current year
            var lastComplaint = await _context.Complaints
                .Where(c => c.ComplaintNumber.StartsWith($"CMP-{currentYear}-"))
                .OrderByDescending(c => c.ComplaintId)
                .FirstOrDefaultAsync();

            int nextNumber = 1;

            if (lastComplaint != null)
            {
                string[] parts = lastComplaint.ComplaintNumber.Split('-');

                if (parts.Length == 3)
                {
                    nextNumber = int.Parse(parts[2]) + 1;
                }
            }

            return $"CMP-{currentYear}-{nextNumber:D6}";
        }
    }
}