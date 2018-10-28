using System;

namespace HelloCoreClrApp.Hosting
{
    public class GracefulShutdownServiceOptions
    {
        public Action OnStopping { get; set; }

        public Action OnStopped { get; set; }
    }
}