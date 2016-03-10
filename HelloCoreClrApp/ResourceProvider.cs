using SimpleInjector;

namespace HelloWorldApp
{
    public class ResourceProvider : IResourceProvider
    {
        private readonly Container container;

        public ResourceProvider(Container container)
        {
            this.container = container;
        }

        public T CreateResource<T>() where T : class
        {
            return container.GetInstance<T>();
        }
    }
}
