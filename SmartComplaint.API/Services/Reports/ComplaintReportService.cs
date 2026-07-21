using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using SmartComplaint.API.Data;
using SmartComplaint.API.Services.Interfaces;

namespace SmartComplaint.API.Services.Reports
{
    public class ComplaintReportService : IComplaintReportService
    {
        private readonly ApplicationDbContext _context;

        public ComplaintReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<byte[]> GenerateComplaintReportAsync(int complaintId)
        {
            var complaint = await _context.Complaints
                .Include(c => c.User)
                .Include(c => c.Category)
                .Include(c => c.Status)
                .Include(c => c.Assignments)
                    .ThenInclude(a => a.Officer)
                .Include(c => c.Complaintimages)
                .FirstOrDefaultAsync(c => c.ComplaintId == complaintId);

            if (complaint == null)
                throw new Exception("Complaint not found.");

            // Temporary PDF
            var pdf = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(20);

                    page.Content().Column(column =>
                    {
                        column.Item().Text("SMART COMPLAINT REPORT")
                            .FontSize(20)
                            .Bold();

                        column.Item().Text($"Complaint Number : {complaint.ComplaintNumber}");
                        column.Item().Text($"Citizen : {complaint.User.FullName}");
                        column.Item().Text($"Category : {complaint.Category.CategoryName}");
                        column.Item().Text($"Status : {complaint.Status.StatusName}");
                    });
                });
            }).GeneratePdf();

            return pdf;
        }
    }
}