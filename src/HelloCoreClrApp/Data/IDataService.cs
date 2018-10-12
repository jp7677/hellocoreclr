using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HelloCoreClrApp.Data.Entities;

namespace HelloCoreClrApp.Data
{
    public interface IDataService
    {
        Task EnsureCreated(CancellationToken token);

        Task<int> GetNumberOfGreetings();

        Task SaveGreeting(string greeting);

        Task<IList<Greeting>> GetLastTenGreetings(int numberOfResults);
    }
}