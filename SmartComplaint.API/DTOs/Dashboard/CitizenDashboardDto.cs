namespace SmartComplaint.API.DTOs.Dashboard
{
    public class CitizenDashboardDto
    {
        public int TotalComplaints { get; set; }

        public int Pending { get; set; }

        public int Resolved { get; set; }

        public int Rejected { get; set; }
    }
}