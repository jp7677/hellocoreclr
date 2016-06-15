using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HelloWorldApp
{
    public interface IHelloWorldDbContext : IDisposable
    {
        DbSet<Greeting> Greetings { get; }
        Task SaveAsync();
        void EnsureCreated();
    }
}