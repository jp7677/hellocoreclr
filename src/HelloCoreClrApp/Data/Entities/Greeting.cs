using System;
using System.ComponentModel.DataAnnotations;

namespace HelloCoreClrApp.Data.Entities
{
    public class Greeting
    {
        [Key]
        public Guid GreetingId { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        [Required]
        public DateTime TimestampUtc { get; set; }
    }
}