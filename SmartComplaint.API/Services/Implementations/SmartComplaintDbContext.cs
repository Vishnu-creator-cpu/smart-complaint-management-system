using SmartComplaint.API.Data;

namespace SmartComplaint.API.Services.Implementations
{
    internal class SmartComplaintDbContext
    {
        public object Complaints { get; internal set; }

        public static implicit operator SmartComplaintDbContext(ApplicationDbContext v)
        {
            throw new NotImplementedException();
        }
    }
}