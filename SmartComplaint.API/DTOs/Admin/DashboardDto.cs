namespace SmartComplaint.API.DTOs.Admin
{
    public class DashboardDto
    {
        public int TotalComplaints { get; set; }

        public int SubmittedComplaints { get; set; }

        public int AssignedComplaints { get; set; }

        public int ResolvedComplaints { get; set; }

        public int TotalUsers { get; set; }

        public int TotalOfficers { get; set; }
    }
}