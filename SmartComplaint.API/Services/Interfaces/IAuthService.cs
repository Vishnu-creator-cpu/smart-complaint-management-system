using SmartComplaint.API.DTOs.Auth;

namespace SmartComplaint.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterDto registerDto);

        Task<LoginResponseDto> LoginAsync(LoginDto loginDto);
    }
}