namespace SmartComplaint.API.DTOs.Dashboard
{
    public class AdminDashboardDto
    {
        public int TotalComplaints { get; set; }

        public int SubmittedComplaints { get; set; }

        public int AssignedComplaints { get; set; }

        public int ResolvedComplaints { get; set; }

        public int PendingComplaints { get; set; }

        public int InProgressComplaints { get; set; }

        public int RejectedComplaints { get; set; }

        public int TotalUsers { get; set; }

        public int TotalOfficers { get; set; }
    }
}