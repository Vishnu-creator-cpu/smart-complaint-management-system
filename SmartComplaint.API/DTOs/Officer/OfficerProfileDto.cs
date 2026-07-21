namespace SmartComplaint.API.DTOs.Officer
{
    public class OfficerProfileDto
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public string District { get; set; }

        public string State { get; set; }

        public string Pincode { get; set; }

        public string EmployeeCode { get; set; }

        public string Department { get; set; }

        public string Designation { get; set; }

        public string ServiceArea { get; set; }

        public int TotalAssignedComplaints { get; set; }

        public int TotalResolvedComplaints { get; set; }

        public int TotalInProgressComplaints { get; set; }

    }
}