using System.Threading.Tasks;
using HelloWorldApp.WebApi.Messages;

namespace HelloWorldApp.WebApi.Actions
{
    public interface ISayHelloWorldAction
    {
        Task<SayHelloWorldResponse> ExecuteAsync(string name);
    }
}
