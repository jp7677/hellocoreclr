using System.Threading.Tasks;
using HelloWorldApp.Data.Entities;
using System.Collections.Generic;

namespace HelloWorldApp.Data
{
    public interface IDataService
    {
        Task EnsureCreatedAsync();
        Task<int> GetNumberOfGreetingsAsync();
        Task SaveGreetingAsync(string greeting);
        Task<IList<Greeting>> GetLastTenGreetingsAsync(int numberOfResults);
    }
}