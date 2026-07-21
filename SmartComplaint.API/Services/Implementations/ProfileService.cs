using Microsoft.EntityFrameworkCore;
using SmartComplaint.API.Data;
using SmartComplaint.API.DTOs.Common;
using SmartComplaint.API.Services.Interfaces;

namespace SmartComplaint.API.Services.Implementations
{
    public class ProfileService : IProfileService
    {
        private readonly ApplicationDbContext _context;

        public ProfileService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProfileDto?> GetProfileAsync(int userId)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
                return null;

            return new ProfileDto
            {
                UserId = user.UserId,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role.RoleName,
                Address = user.Address,
                District = user.District,
                State = user.State,
                Pincode = user.Pincode
            };
        }

        public async Task<bool> UpdateProfileAsync(
    int userId,
    ProfileDto profileDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserId == userId);

            if (user == null)
                return false;

            user.FullName = profileDto.FullName;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}