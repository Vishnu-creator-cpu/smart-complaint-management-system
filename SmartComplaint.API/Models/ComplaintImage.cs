using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SmartComplaint.API.Models;

[Table("complaintimages")]
[Index("ComplaintId", Name = "ComplaintId")]
[Index("UploadedBy", Name = "UploadedBy")]
public partial class Complaintimage
{
    [Key]
    public int ImageId { get; set; }

    public int ComplaintId { get; set; }

    [Column(TypeName = "enum('Complaint','BeforeWork','DuringWork','AfterWork')")]
    public string ImageType { get; set; } = null!;

    [StringLength(255)]
    public string ImagePath { get; set; } = null!;

    [Precision(10, 8)]
    public decimal? Latitude { get; set; }

    [Precision(11, 8)]
    public decimal? Longitude { get; set; }

    [Column(TypeName = "text")]
    public string? Address { get; set; }

    public int? UploadedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UploadedAt { get; set; }

    [ForeignKey("ComplaintId")]
    [InverseProperty("Complaintimages")]
    public virtual Complaint Complaint { get; set; } = null!;

    [ForeignKey("UploadedBy")]
    [InverseProperty("Complaintimages")]
    public virtual User? UploadedByNavigation { get; set; }
}
