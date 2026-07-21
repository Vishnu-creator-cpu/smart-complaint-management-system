using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartComplaint.API.Models;

[Table("assignments")]
[Index("AssignedBy", Name = "AssignedBy")]
[Index("ComplaintId", Name = "ComplaintId")]
[Index("OfficerId", Name = "OfficerId")]
public partial class Assignment
{
    [Key]
    public int AssignmentId { get; set; }

    public int ComplaintId { get; set; }

    public int OfficerId { get; set; }

    public int AssignedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? AssignedDate { get; set; }

    [ForeignKey("AssignedBy")]
    [InverseProperty("Assignments")]
    public virtual User AssignedByNavigation { get; set; } = null!;

    [ForeignKey("ComplaintId")]
    [InverseProperty("Assignments")]
    public virtual Complaint Complaint { get; set; } = null!;

    [ForeignKey("OfficerId")]
    [InverseProperty("Assignments")]
    public virtual Officer Officer { get; set; } = null!;
}
