using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartComplaint.API.Models;

[Table("users")]
[Index("Email", Name = "Email", IsUnique = true)]
[Index("PhoneNumber", Name = "PhoneNumber", IsUnique = true)]
[Index("RoleId", Name = "RoleId")]
public partial class User
{
    [Key]
    public int UserId { get; set; }

    [StringLength(100)]
    public string FullName { get; set; } = null!;

    [StringLength(100)]
    public string Email { get; set; } = null!;

    [StringLength(15)]
    public string PhoneNumber { get; set; } = null!;

    [StringLength(255)]
    public string PasswordHash { get; set; } = null!;

    [Column(TypeName = "text")]
    public string? Address { get; set; }

    [StringLength(100)]
    public string? District { get; set; }

    [StringLength(100)]
    public string? State { get; set; }

    [StringLength(10)]
    public string? Pincode { get; set; }

    public bool? IsActive { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    public int RoleId { get; set; }

    [InverseProperty("AssignedByNavigation")]
    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

    [InverseProperty("ActionByNavigation")]
    public virtual ICollection<Complainthistory> Complainthistories { get; set; } = new List<Complainthistory>();

    [InverseProperty("UploadedByNavigation")]
    public virtual ICollection<Complaintimage> Complaintimages { get; set; } = new List<Complaintimage>();

    [InverseProperty("User")]
    public virtual ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();

    [InverseProperty("User")]
    public virtual ICollection<Emaillog> Emaillogs { get; set; } = new List<Emaillog>();

    [InverseProperty("User")]
    public virtual Officer? Officer { get; set; }

    [ForeignKey("RoleId")]
    [InverseProperty("Users")]
    public virtual Role Role { get; set; } = null!;
}
