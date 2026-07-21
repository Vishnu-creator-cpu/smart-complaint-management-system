namespace SmartComplaint.API.DTOs.Officer
{
    public class UpdateProfileDto
    {
        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public string District { get; set; }

        public string State { get; set; }

        public string Pincode { get; set; }
    }
}