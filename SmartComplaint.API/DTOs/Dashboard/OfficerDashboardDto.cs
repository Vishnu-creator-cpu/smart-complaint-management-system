namespace SmartComplaint.API.DTOs.Officer
{
    public class OfficerDashboardDto
    {
        public int TotalAssigned { get; set; }
        public int TotalResolved { get; set; }
        public int TotalInProgress { get; set; }
        public int TotalPending { get; set; }
    }
}