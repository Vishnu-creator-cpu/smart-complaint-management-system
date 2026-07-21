namespace SmartComplaint.API.DTOs.Admin
{
    public class AssignComplaintDto
    {
        public int ComplaintId { get; set; }

        public int OfficerId { get; set; }

        public string Remarks { get; set; } = string.Empty;
    }
}