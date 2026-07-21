using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using SmartComplaint.API.Configurations;
using SmartComplaint.API.Services.Interfaces;

namespace SmartComplaint.API.Services.Implementations
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task SendEmailAsync(
            string toEmail,
            string subject,
            string body)
        {
            var email = new MimeMessage();

            email.From.Add(

    new MailboxAddress(
        _emailSettings.SenderName,
        _emailSettings.SenderEmail
    )

);

            Console.WriteLine("Receiver Email : " + toEmail);

            email.To.Add(
                MailboxAddress.Parse(toEmail));

            email.Subject = subject;

            email.Body = new TextPart("html")
            {
                Text = body
            };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
    _emailSettings.SmtpServer,
    _emailSettings.Port,
    SecureSocketOptions.StartTls
);

            await smtp.AuthenticateAsync(
    _emailSettings.Username,
    _emailSettings.Password
);

            await smtp.SendAsync(email);

            await smtp.DisconnectAsync(true);
        }
    }
}