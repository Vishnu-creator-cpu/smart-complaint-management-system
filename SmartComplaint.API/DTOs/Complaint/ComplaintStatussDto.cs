namespace SmartComplaint.API.DTOs.Complaint
{
    public class ComplaintStatusDto
    {
        public int ComplaintId { get; set; }

        public string ComplaintNumber { get; set; } = string.Empty;

        public string ComplaintTitle { get; set; } = string.Empty;

        public string CurrentStatus { get; set; } = string.Empty;

        public DateTime? LastUpdated { get; set; }
    }
}