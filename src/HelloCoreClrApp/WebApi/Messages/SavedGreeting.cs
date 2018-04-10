using System;

namespace HelloCoreClrApp.WebApi.Messages
{
    public class SavedGreeting
    {
        public string Greeting { get; set; }

        public DateTime TimestampUtc { get; set; }
    }
}
