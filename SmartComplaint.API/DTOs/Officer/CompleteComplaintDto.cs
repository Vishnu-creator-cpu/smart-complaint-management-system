using System.ComponentModel.DataAnnotations;

namespace SmartComplaint.API.DTOs.Officer
{
    public class CompleteComplaintDto
    {
        [Required]
        public int ComplaintId { get; set; }

        public string Remarks { get; set; } = string.Empty;
    }
}