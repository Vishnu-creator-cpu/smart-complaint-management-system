namespace SmartComplaint.API.DTOs.Officer
{
    public class ChangePasswordDto
    {
        public string CurrentPassword { get; set; }

        public string NewPassword { get; set; }

        public string ConfirmPassword { get; set; }
    }
}