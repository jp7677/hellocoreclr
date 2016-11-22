using HelloCoreClrApp.WebApi.Actions;

namespace HelloCoreClrApp.WebApi
{
    public interface IActionFactory
    {
        ISayHelloWorldAction CreateSayHelloWorldAction();
        IGetLastTenGreetingsAction CreateGetLastTenGreetingsAction();
        IGetTotalNumberOfGreetingsAction CreateGetTotalNumberOfGreetingsAction();
    }
}
