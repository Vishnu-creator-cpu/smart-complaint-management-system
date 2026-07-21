using SmartComplaint.API.DTOs.Common;

namespace SmartComplaint.API.Services.Interfaces
{
    public interface IProfileService
    {
        Task<ProfileDto> GetProfileAsync(int userId);

        Task<bool> UpdateProfileAsync(
            int userId,
            ProfileDto profileDto);
    }
}