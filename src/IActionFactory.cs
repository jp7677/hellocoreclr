namespace HelloWorldApp
{
    public interface IActionFactory
    {
        IGetHelloWorldAction CreateGetHelloWorldAction();
    }
}
