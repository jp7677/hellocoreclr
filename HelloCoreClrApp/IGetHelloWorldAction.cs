namespace HelloWorldApp
{
    public interface IGetHelloWorldAction
    {
        GetHelloWorldResponse Execute(string name);
    }
}
