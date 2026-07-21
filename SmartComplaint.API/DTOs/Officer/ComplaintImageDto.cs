namespace SmartComplaint.API.DTOs.Officer
{
    public class ComplaintImageDto
    {
        public string? ImageType { get; set; }

        public string? ImagePath { get; set; }

        public decimal? Latitude { get; set; }

        public decimal? Longitude { get; set; }

        public string? Address { get; set; }

        public DateTime? UploadedAt { get; set; }
    }
}