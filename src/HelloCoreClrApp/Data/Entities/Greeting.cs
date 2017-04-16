using System;
using System.ComponentModel.DataAnnotations;

namespace HelloCoreClrApp.Data.Entities
{
    public class Greeting
    {
        [Key]
        public Guid GreetingId { get; set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        [Required]
        public DateTime TimestampUtc { get; set; }
    }
}