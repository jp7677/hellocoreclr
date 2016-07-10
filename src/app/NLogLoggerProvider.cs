using Microsoft.Extensions.Logging;

namespace HelloWorldApp
{
    public class NLogLoggerProvider : ILoggerProvider
    {
        public Microsoft.Extensions.Logging.ILogger CreateLogger(string categoryName)
        {
            return new NLogLogger();
        }

        public void Dispose()
        { }
    }
}