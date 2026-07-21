using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartComplaint.API.Models;

[Table("emaillogs")]
[Index("UserId", Name = "UserId")]
public partial class Emaillog
{
    [Key]
    public int EmailLogId { get; set; }

    public int? UserId { get; set; }

    [StringLength(100)]
    public string? Email { get; set; }

    [StringLength(200)]
    public string? Subject { get; set; }

    [Column(TypeName = "enum('Sent','Failed')")]
    public string? EmailStatus { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? SentAt { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Emaillogs")]
    public virtual User? User { get; set; }
}
