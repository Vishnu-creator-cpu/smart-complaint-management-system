using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartComplaint.API.Models;

[Table("complaintcategories")]
[Index("CategoryName", Name = "CategoryName", IsUnique = true)]
public partial class Complaintcategory
{
    [Key]
    public int CategoryId { get; set; }

    [StringLength(100)]
    public string CategoryName { get; set; } = null!;

    [StringLength(300)]
    public string? Description { get; set; }

    [InverseProperty("Category")]
    public virtual ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();
}
