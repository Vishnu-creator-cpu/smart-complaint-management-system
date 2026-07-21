namespace SmartComplaint.API.DTOs.Officer
{
    public class OfficerComplaintDetailsDto
    {
        public int ComplaintId { get; set; }

        public string ComplaintNumber { get; set; } = string.Empty;

        public string ComplaintTitle { get; set; } = string.Empty;

        public string ComplaintDescription { get; set; } = string.Empty;

        public string CitizenName { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string District { get; set; } = string.Empty;

        public string State { get; set; } = string.Empty;

        public string Pincode { get; set; } = string.Empty;

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public string Status { get; set; } = string.Empty;

        public string ComplaintImage { get; set; } = string.Empty;
    }
}