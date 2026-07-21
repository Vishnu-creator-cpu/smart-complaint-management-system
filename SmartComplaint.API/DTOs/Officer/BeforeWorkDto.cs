using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace SmartComplaint.API.DTOs.Officer
{
    public class BeforeWorkDto
    {
        [Required]
        public int ComplaintId { get; set; }

        [Required]
        public IFormFile Image { get; set; } = null!;

        [Required]
        public decimal Latitude { get; set; }

        [Required]
        public decimal Longitude { get; set; }

        [Required]
        public string Address { get; set; } = string.Empty;
    }
}