namespace HelloWorldApp
{
    public interface IGetHelloWorldAction
    {
        GetHelloWorldResponse Execute(string name);
    }
    
    public class GetHelloWorldAction : IGetHelloWorldAction
    {
        public GetHelloWorldResponse Execute(string name)
        {
            return new GetHelloWorldResponse
            {
                Name = string.Format("Hello {0}!", name)
            };
        }
    }
}