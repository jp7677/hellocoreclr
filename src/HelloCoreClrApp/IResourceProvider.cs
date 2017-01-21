namespace HelloCoreClrApp
{
    /// <summary>
    /// Usage of a ResourceProvider is only allowed in factory classes.
    /// </summary>
    public interface IResourceProvider
    {
        T CreateResource<T>() where T : class;
    }
}
