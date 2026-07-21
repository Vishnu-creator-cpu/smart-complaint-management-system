using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace SmartComplaint.API.DTOs.Complaint
{
    public class CreateComplaintDto
    {
        [Required]
        public string ComplaintTitle { get; set; } = string.Empty;

        [Required]
        public string ComplaintDescription { get; set; } = string.Empty;

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string Priority { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        [Required]
        public string District { get; set; } = string.Empty;

        [Required]
        public string State { get; set; } = string.Empty;

        [Required]
        public string Pincode { get; set; } = string.Empty;

        public decimal? Latitude { get; set; }

        public decimal? Longitude { get; set; }

        public IFormFile? ComplaintImage { get; set; }
    }
}