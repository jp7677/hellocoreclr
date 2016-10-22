using HelloWorldApp.WebApi.Actions;

namespace HelloWorldApp.WebApi
{
    public interface IActionFactory
    {
        ISayHelloWorldAction CreateSayHelloWorldAction();
        IGetLastTenGreetingsAction CreateGetLastTenHelloWorldsAction();
    }
}
