using System.Threading.Tasks;

namespace HelloWorldApp
{
    public interface IGetHelloWorldAction
    {
        Task<GetHelloWorldResponse> ExecuteAsync(string name);
    }
}
