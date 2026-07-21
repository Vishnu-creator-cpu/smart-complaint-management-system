namespace SmartComplaint.API.DTOs.Admin
{
    public class AdminComplaintDto
    {
        public int ComplaintId { get; set; }

        public string ComplaintNumber { get; set; } = string.Empty;

        public string ComplaintTitle { get; set; } = string.Empty;

        public string CitizenName { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public DateTime? CreatedAt { get; set; }
    }
}