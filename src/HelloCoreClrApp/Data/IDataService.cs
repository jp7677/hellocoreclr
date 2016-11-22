using System.Collections.Generic;
using System.Threading.Tasks;
using HelloCoreClrApp.Data.Entities;

namespace HelloCoreClrApp.Data
{
    public interface IDataService
    {
        Task EnsureCreatedAsync();
        Task<int> GetNumberOfGreetingsAsync();
        Task SaveGreetingAsync(string greeting);
        Task<IList<Greeting>> GetLastTenGreetingsAsync(int numberOfResults);
    }
}