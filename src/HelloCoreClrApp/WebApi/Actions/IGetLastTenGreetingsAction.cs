using System.Threading.Tasks;
using HelloCoreClrApp.WebApi.Messages;

namespace HelloCoreClrApp.WebApi.Actions
{
    public interface IGetLastTenGreetingsAction
    {
        Task<SavedGreeting[]> Execute();
    }
}
