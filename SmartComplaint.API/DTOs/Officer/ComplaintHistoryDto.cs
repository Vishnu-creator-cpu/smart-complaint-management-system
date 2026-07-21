namespace SmartComplaint.API.DTOs.Officer
{
    public class ComplaintHistoryDto
    {
        public string? ComplaintNumber { get; set; }

        public string? ComplaintTitle { get; set; }

        public string? Status { get; set; }

        public DateTime? ComplaintDate { get; set; }

        public DateTime? AssignedDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public string? Remarks { get; set; }

        public List<ComplaintImageDto>? Images { get; set; }
    }
}