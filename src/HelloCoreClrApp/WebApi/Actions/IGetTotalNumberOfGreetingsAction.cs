using System.Threading.Tasks;

namespace HelloCoreClrApp.WebApi.Actions
{
    public interface IGetTotalNumberOfGreetingsAction
    {
        Task<int> ExecuteAsync();
    }
}