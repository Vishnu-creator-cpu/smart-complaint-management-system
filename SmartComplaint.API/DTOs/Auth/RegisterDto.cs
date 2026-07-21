using System.ComponentModel.DataAnnotations;

namespace SmartComplaint.API.DTOs.Auth
{
    public class RegisterDto
    {
        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        [Required]
        public string District { get; set; } = string.Empty;

        [Required]
        public string State { get; set; } = string.Empty;

        [Required]
        public string Pincode { get; set; } = string.Empty;
    }
}