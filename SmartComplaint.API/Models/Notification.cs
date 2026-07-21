using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartComplaint.API.Models;

[Table("notifications")]
public partial class Notification
{
    [Key]
    public int NotificationId { get; set; }

    public int UserId { get; set; }

    public string Title { get; set; } = null!;

    public string Message { get; set; } = null!;

    public bool IsRead { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}