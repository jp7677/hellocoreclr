using System.Linq;
using System.Threading.Tasks;

namespace HelloWorldApp
{
    public class HelloWorldDataService : IHelloWorldDataService
    {
        IHelloWorldDbContextFactory dbContextFactory;

        public HelloWorldDataService(IHelloWorldDbContextFactory dbContextFactory)
        {
            this.dbContextFactory = dbContextFactory;
        }

        public async Task EnsureCreatedAsync()
        {
            using(var db = dbContextFactory.CreateHelloWorldDbContext())
            {
                await db.EnsureCreatedAsync();
            }
        }

        public int GetNumberOfGreetings()
        {
            using(var db = dbContextFactory.CreateHelloWorldDbContext())
            {
                return db.Greetings.Count();
            }
        }

        public async Task SaveGreetingAsync(string greeting)
        {
            using(var db = dbContextFactory.CreateHelloWorldDbContext())
            {
                db.Greetings.Add(new Greeting{  Name = greeting });
                await db.SaveChangesAsync();
            }
        }
    }
}