using System;

namespace HelloWorldApp.Data.Entities
{
    public class Greeting
    {
        public int GreetingId { get; set; }
        public string Name { get; set; }
        public DateTime TimestampUtc { get; set; }
    }
}