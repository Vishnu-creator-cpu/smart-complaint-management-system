using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartComplaint.API.Models;

[Table("complainthistory")]
[Index("ActionBy", Name = "ActionBy")]
[Index("ComplaintId", Name = "ComplaintId")]
[Index("NewStatusId", Name = "NewStatusId")]
[Index("PreviousStatusId", Name = "PreviousStatusId")]
public partial class Complainthistory
{
    [Key]
    public int HistoryId { get; set; }

    public int ComplaintId { get; set; }

    public int? PreviousStatusId { get; set; }

    public int? NewStatusId { get; set; }

    public int ActionBy { get; set; }

    [Column(TypeName = "text")]
    public string? Remarks { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ActionDate { get; set; }

    [ForeignKey("ActionBy")]
    [InverseProperty("Complainthistories")]
    public virtual User ActionByNavigation { get; set; } = null!;

    [ForeignKey("ComplaintId")]
    [InverseProperty("Complainthistories")]
    public virtual Complaint Complaint { get; set; } = null!;

    [ForeignKey("NewStatusId")]
    [InverseProperty("ComplainthistoryNewStatuses")]
    public virtual Complaintstatus? NewStatus { get; set; }

    [ForeignKey("PreviousStatusId")]
    [InverseProperty("ComplainthistoryPreviousStatuses")]
    public virtual Complaintstatus? PreviousStatus { get; set; }
}
