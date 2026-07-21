using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartComplaint.API.Models;

[Table("complaints")]
[Index("CategoryId", Name = "CategoryId")]
[Index("ComplaintNumber", Name = "ComplaintNumber", IsUnique = true)]
[Index("StatusId", Name = "StatusId")]
[Index("UserId", Name = "UserId")]
public partial class Complaint
{
    [Key]
    public int ComplaintId { get; set; }

    [StringLength(20)]
    public string ComplaintNumber { get; set; } = null!;

    [StringLength(200)]
    public string ComplaintTitle { get; set; } = null!;

    [Column(TypeName = "text")]
    public string ComplaintDescription { get; set; } = null!;

    public int CategoryId { get; set; }

    public int UserId { get; set; }

    [Column(TypeName = "enum('Low','Medium','High')")]
    public string? Priority { get; set; }

    [Column(TypeName = "text")]
    public string Address { get; set; } = null!;

    [StringLength(100)]
    public string? District { get; set; }

    [StringLength(100)]
    public string? State { get; set; }

    [StringLength(10)]
    public string? Pincode { get; set; }

    [Precision(10, 8)]
    public decimal? Latitude { get; set; }

    [Precision(11, 8)]
    public decimal? Longitude { get; set; }

    public int? StatusId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdatedAt { get; set; }

    [InverseProperty("Complaint")]
    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

    [ForeignKey("CategoryId")]
    [InverseProperty("Complaints")]
    public virtual Complaintcategory Category { get; set; } = null!;

    [InverseProperty("Complaint")]
    public virtual ICollection<Complainthistory> Complainthistories { get; set; } = new List<Complainthistory>();

    [InverseProperty("Complaint")]
    public virtual ICollection<Complaintimage> Complaintimages { get; set; } = new List<Complaintimage>();

    [ForeignKey("StatusId")]
    [InverseProperty("Complaints")]
    public virtual Complaintstatus? Status { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Complaints")]
    public virtual User User { get; set; } = null!;
}
