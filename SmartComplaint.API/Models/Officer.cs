using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartComplaint.API.Models;

[Table("officers")]
[Index("EmployeeCode", Name = "EmployeeCode", IsUnique = true)]
[Index("UserId", Name = "UserId", IsUnique = true)]
public partial class Officer
{
    [Key]
    public int OfficerId { get; set; }

    public int UserId { get; set; }

    [StringLength(30)]
    public string? EmployeeCode { get; set; }

    [StringLength(100)]
    public string? Department { get; set; }

    [StringLength(100)]
    public string? Designation { get; set; }

    [StringLength(100)]
    public string? ServiceArea { get; set; }

    [InverseProperty("Officer")]
    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

    [ForeignKey("UserId")]
    [InverseProperty("Officer")]
    public virtual User User { get; set; } = null!;
}
