namespace SmartComplaint.API.DTOs.Auth
{
    public class LoginResponseDto
    {
        public bool Success { get; set; }

        public string Token { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;
    }
}