using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using SmartComplaint.API.Data;
using SmartComplaint.API.DTOs.Auth;
using SmartComplaint.API.Helpers;
using SmartComplaint.API.Models;
using SmartComplaint.API.Services.Interfaces;


namespace SmartComplaint.API.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtTokenGenerator _jwtTokenGenerator;

        public AuthService(
            ApplicationDbContext context,
            JwtTokenGenerator jwtTokenGenerator)
        {
            _context = context;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<string> RegisterAsync(RegisterDto model)
        {
            // Check email already exists
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                return "Email already exists.";
            }

            // Check phone number already exists
            if (await _context.Users.AnyAsync(x => x.PhoneNumber == model.PhoneNumber))
            {
                return "Phone number already exists.";
            }
            // Get User role
            var userRole = await _context.Roles
                .FirstOrDefaultAsync(r => r.RoleName == "User");

            if (userRole == null)
            {
                return "User role not found.";
            }

            // Create user
            var user = new User
            {
                FullName = model.FullName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
                Address = model.Address,
                District = model.District,
                State = model.State,
                Pincode = model.Pincode,
                RoleId = userRole.RoleId,
                IsActive = true,
                CreatedAt = DateTime.Now
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return "Registration Successful";
        }

        public async Task<LoginResponseDto> LoginAsync(LoginDto model)
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null)
            {
                return new LoginResponseDto
                {
                    Success = false,
                    Message = "Invalid Email"
                };
            }

            bool validPassword = BCrypt.Net.BCrypt.Verify(
                model.Password,
                user.PasswordHash);

            if (!validPassword)
            {
                return new LoginResponseDto
                {
                    Success = false,
                    Message = "Invalid Password"
                };
            }

            var token = _jwtTokenGenerator.GenerateToken(
    user,
    user.Role.RoleName);

            return new LoginResponseDto
            {
                Success = true,
                Token = token,
                Role = user.Role.RoleName,
                Message = "Login Successful"
            };
        }
    }
}