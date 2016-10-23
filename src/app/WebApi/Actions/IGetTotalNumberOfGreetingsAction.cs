using System.Threading.Tasks;

namespace HelloWorldApp.WebApi.Actions
{
    public interface IGetTotalNumberOfGreetingsAction
    {
        Task<int> ExecuteAsync();
    }
}