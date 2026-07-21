using System.Threading.Tasks;

namespace SmartComplaint.API.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(
            string toEmail,
            string subject,
            string body);
    }
}