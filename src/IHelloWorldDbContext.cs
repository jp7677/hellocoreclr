using System;
using Microsoft.EntityFrameworkCore;

namespace HelloWorldApp
{
    public interface IHelloWorldDbContext : IDisposable
    {
        DbSet<Greeting> Greetings { get; }
        void Save();
        void EnsureCreated();
    }
}