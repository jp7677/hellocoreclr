using System.Threading.Tasks;
using System.Linq;
using HelloWorldApp.Data.Entities;

namespace HelloWorldApp.Data
{
    public interface IDataService
    {
        Task EnsureCreatedAsync();
        Task<int> GetNumberOfGreetingsAsync();
        Task SaveGreetingAsync(string greeting);
        Task<IQueryable<Greeting>> GetLastTenGreetingsAsync(int numberOfResults);
    }
}