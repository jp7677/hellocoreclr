using SimpleInjector;

namespace HelloCoreClrApp
{
    public class ResourceProvider : IResourceProvider
    {
        private readonly Container container;

        public ResourceProvider(Container container)
        {
            this.container = container;
        }

        public T CreateResource<T>() where T : class => container.GetInstance<T>();
    }
}
