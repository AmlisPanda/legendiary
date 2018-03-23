using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LegenDiary.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
       : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /* Define any composite PKs here*/
            modelBuilder.Entity<Widget>()
                .HasKey(m => new { m.WidgetTypeId, m.AppUserId });
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Widget> Widgets { get; set; }
        public DbSet<WidgetType> WidgetTypes { get; set; }
    }
}
