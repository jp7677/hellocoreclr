namespace HelloWorldApp
{
    public interface IResourceProvider
    {
        T CreateResource<T>() where T : class;
    }
}
