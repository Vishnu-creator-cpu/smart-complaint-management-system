namespace SmartComplaint.API.Services.Interfaces
{
    public interface IComplaintReportService
    {
        Task<byte[]> GenerateComplaintReportAsync(int complaintId);
    }
}