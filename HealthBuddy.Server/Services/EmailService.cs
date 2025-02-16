using MimeKit;
using MailKit.Net.Smtp;
using System.Net.Mail;

namespace HealthBuddy.Server.Services
{
    public class EmailService
    {
        private readonly string _smtpServer = "smtp.gmail.com"; // Thay bằng SMTP server bạn sử dụng
        private readonly int _smtpPort = 587; // Cổng SMTP
        private readonly string _emailFrom = "kiseryouta2003@gmail.com"; // Email của bạn
        private readonly string _emailPassword = "qcqa slmu vkbr edha"; // Mật khẩu ứng dụng

        public async Task<bool> SendPostApprovedMail(string emailTo)
        {

            // Tạo nội dung email
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("HealthBuddy", _emailFrom));
            message.To.Add(new MailboxAddress("", emailTo));
            message.Subject = "Thông báo về bài viết của bạn";

            message.Body = new TextPart("plain")
            {
                Text = $"Bài viết của bạn đã được quản trị viên xác nhận và được hiển thị trên trang web."
            };

            // Gửi email
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(_emailFrom, _emailPassword);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException("Không thể gửi email.", ex);
                }
            }

            // Trả về mã xác nhận
            return true;
        }
    }
}