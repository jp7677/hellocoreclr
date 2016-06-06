namespace HelloWorldApp
{
    public class GetHelloWorldAction : IGetHelloWorldAction
    {
        public GetHelloWorldResponse Execute(string name)
        {
            string result = !string.IsNullOrEmpty(name) 
                            ? string.Format("Hello {0}!", name)
                            : "Are you sure?";
            
            return new GetHelloWorldResponse
            {
                Name = result 
            };
        }
    }
}
