namespace SmartComplaint.API.DTOs.Admin
{
    public class UpdateComplaintStatusDto
    {
        public int ComplaintId { get; set; }

        public int StatusId { get; set; }

        public string Remarks { get; set; } = string.Empty;
    }
}