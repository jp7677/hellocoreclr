using System.Threading.Tasks;
using HelloWorldApp.WebApi.Messages;

namespace HelloWorldApp.WebApi.Actions
{
    public interface IGetLastTenGreetingsAction
    {
        Task<SavedGreeting[]> ExecuteAsync();
    }
}
