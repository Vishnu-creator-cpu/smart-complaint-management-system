namespace SmartComplaint.API.DTOs.Complaint
{
    public class ComplaintResponseDto
    {
        public int ComplaintId { get; set; }

        public string ComplaintNumber { get; set; } = string.Empty;

        public string ComplaintTitle { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public DateTime? CreatedAt { get; set; }

        public string Message { get; set; } = string.Empty;
    }
}