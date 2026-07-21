using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartComplaint.API.Models;

[Table("complaintstatus")]
[Index("StatusName", Name = "StatusName", IsUnique = true)]
public partial class Complaintstatus
{
    [Key]
    public int StatusId { get; set; }

    [StringLength(50)]
    public string StatusName { get; set; } = null!;

    [InverseProperty("NewStatus")]
    public virtual ICollection<Complainthistory> ComplainthistoryNewStatuses { get; set; } = new List<Complainthistory>();

    [InverseProperty("PreviousStatus")]
    public virtual ICollection<Complainthistory> ComplainthistoryPreviousStatuses { get; set; } = new List<Complainthistory>();

    [InverseProperty("Status")]
    public virtual ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();
}
