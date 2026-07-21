using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using SmartComplaint.API.Models;

namespace SmartComplaint.API.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Assignment> Assignments { get; set; }

    public virtual DbSet<Complaint> Complaints { get; set; }

    public virtual DbSet<Complaintcategory> Complaintcategories { get; set; }

    public virtual DbSet<Complainthistory> Complainthistories { get; set; }

    public virtual DbSet<Complaintimage> Complaintimages { get; set; }

    public virtual DbSet<Complaintstatus> Complaintstatuses { get; set; }

    public virtual DbSet<Emaillog> Emaillogs { get; set; }

    public virtual DbSet<Officer> Officers { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Notification> Notifications { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;database=SmartComplaintDB;user=root;password=Vishnu@2007", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.46-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");
        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId)
                .HasName("PRIMARY");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.Property(e => e.IsRead)
                .HasDefaultValue(false);

            entity.HasOne(d => d.User)
                .WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("notifications_ibfk_1");
        });

        modelBuilder.Entity<Assignment>(entity =>
        {
            entity.HasKey(e => e.AssignmentId).HasName("PRIMARY");

            entity.Property(e => e.AssignedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.AssignedByNavigation).WithMany(p => p.Assignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("assignments_ibfk_3");

            entity.HasOne(d => d.Complaint).WithMany(p => p.Assignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("assignments_ibfk_1");

            entity.HasOne(d => d.Officer).WithMany(p => p.Assignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("assignments_ibfk_2");
        });

        modelBuilder.Entity<Complaint>(entity =>
        {
            entity.HasKey(e => e.ComplaintId).HasName("PRIMARY");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.Priority).HasDefaultValueSql("'Medium'");
            entity.Property(e => e.StatusId).HasDefaultValueSql("'1'");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.Category).WithMany(p => p.Complaints)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("complaints_ibfk_1");

            entity.HasOne(d => d.Status).WithMany(p => p.Complaints).HasConstraintName("complaints_ibfk_3");

            entity.HasOne(d => d.User).WithMany(p => p.Complaints)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("complaints_ibfk_2");
        });

        modelBuilder.Entity<Complaintcategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Complainthistory>(entity =>
        {
            entity.HasKey(e => e.HistoryId).HasName("PRIMARY");

            entity.Property(e => e.ActionDate).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.ActionByNavigation).WithMany(p => p.Complainthistories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("complainthistory_ibfk_4");

            entity.HasOne(d => d.Complaint).WithMany(p => p.Complainthistories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("complainthistory_ibfk_1");

            entity.HasOne(d => d.NewStatus).WithMany(p => p.ComplainthistoryNewStatuses).HasConstraintName("complainthistory_ibfk_3");

            entity.HasOne(d => d.PreviousStatus).WithMany(p => p.ComplainthistoryPreviousStatuses).HasConstraintName("complainthistory_ibfk_2");
        });

        modelBuilder.Entity<Complaintimage>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PRIMARY");

            entity.Property(e => e.UploadedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.Complaint).WithMany(p => p.Complaintimages)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("complaintimages_ibfk_1");

            entity.HasOne(d => d.UploadedByNavigation).WithMany(p => p.Complaintimages).HasConstraintName("complaintimages_ibfk_2");
        });

        modelBuilder.Entity<Complaintstatus>(entity =>
        {
            entity.HasKey(e => e.StatusId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Emaillog>(entity =>
        {
            entity.HasKey(e => e.EmailLogId).HasName("PRIMARY");

            entity.Property(e => e.SentAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.User).WithMany(p => p.Emaillogs).HasConstraintName("emaillogs_ibfk_1");
        });

        modelBuilder.Entity<Officer>(entity =>
        {
            entity.HasKey(e => e.OfficerId).HasName("PRIMARY");

            entity.HasOne(d => d.User).WithOne(p => p.Officer)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("officers_ibfk_1");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PRIMARY");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.IsActive).HasDefaultValueSql("'1'");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
