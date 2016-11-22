using System.Threading.Tasks;
using HelloCoreClrApp.WebApi.Messages;

namespace HelloCoreClrApp.WebApi.Actions
{
    public interface ISayHelloWorldAction
    {
        Task<SayHelloWorldResponse> ExecuteAsync(string name);
    }
}
