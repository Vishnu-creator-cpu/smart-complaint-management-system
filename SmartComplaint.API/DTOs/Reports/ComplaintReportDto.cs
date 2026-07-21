namespace SmartComplaint.API.DTOs.Reports
{
    public class ComplaintReportDto
    {
        public string ComplaintNumber { get; set; } = string.Empty;

        public string CitizenName { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string ComplaintTitle { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string OfficerName { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public DateTime? SubmittedDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public string? BeforeWorkImage { get; set; }

        public string? DuringWorkImage { get; set; }

        public string? AfterWorkImage { get; set; }
    }
}