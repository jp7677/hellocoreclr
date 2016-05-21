using System;

namespace HelloWorldApp
{
    public class ResourceProvider : IResourceProvider
    {
        public T CreateResource<T>() where T : class
        {
            throw new NotImplementedException("No SimpleInjector yet..");
        }
    }
}
