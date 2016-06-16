using System.Threading.Tasks;

namespace HelloWorldApp
{
    public interface IHelloWorldDataService
    {
        Task EnsureCreatedAsync();
        int GetNumberOfGreetings();
        Task SaveGreetingAsync(string greeting);
        
    }
}