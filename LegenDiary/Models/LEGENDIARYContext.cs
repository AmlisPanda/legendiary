using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LegenDiary.Models
{
    public partial class LEGENDIARYContext : DbContext
    {
        public virtual DbSet<Appuser> Appuser { get; set; }
        public virtual DbSet<Widget> Widget { get; set; }
        public virtual DbSet<WidgetType> WidgetType { get; set; }

        public LEGENDIARYContext(DbContextOptions<LEGENDIARYContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Appuser>(entity =>
            {
                entity.ToTable("APPUSER");

                entity.Property(e => e.AppuserId).HasColumnName("APPUSER_ID");

                entity.Property(e => e.AppuserLogin)
                    .IsRequired()
                    .HasColumnName("APPUSER_LOGIN")
                    .HasMaxLength(200);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasMaxLength(200);

                entity.Property(e => e.EncryptedPassword)
                    .IsRequired()
                    .HasColumnName("ENCRYPTED_PASSWORD")
                    .HasMaxLength(500);

                entity.Property(e => e.LastConnection).HasColumnName("LAST_CONNECTION");

                entity.Property(e => e.SubscriptionDate).HasColumnName("SUBSCRIPTION_DATE");
            });

         

            modelBuilder.Entity<Widget>(entity =>
            {
                entity.ToTable("WIDGET");

                entity.Property(e => e.WidgetId).HasColumnName("WIDGET_ID");

                entity.Property(e => e.AppuserId).HasColumnName("APPUSER_ID");

                entity.Property(e => e.IsFavourite).HasColumnName("IS_FAVOURITE");

                entity.Property(e => e.Subtitle)
                    .HasColumnName("SUBTITLE")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("TITLE")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.WidgetData)
                    .HasColumnName("WIDGET_DATA")
                    .HasMaxLength(4000);

                entity.Property(e => e.WidgetDate).HasColumnName("WIDGET_DATE");

                entity.Property(e => e.WidgetTypeId).HasColumnName("WIDGET_TYPE_ID");

                entity.HasOne(d => d.Appuser)
                    .WithMany(p => p.Widget)
                    .HasForeignKey(d => d.AppuserId)
                    .HasConstraintName("FK_WIDGET_APPUSER");

                entity.HasOne(d => d.WidgetType)
                    .WithMany(p => p.Widget)
                    .HasForeignKey(d => d.WidgetTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WIDGET_WIDGET_TYPE");
            });

            modelBuilder.Entity<WidgetType>(entity =>
            {
                entity.ToTable("WIDGET_TYPE");

                entity.Property(e => e.WidgetTypeId).HasColumnName("WIDGET_TYPE_ID");

                entity.Property(e => e.Label)
                    .IsRequired()
                    .HasColumnName("LABEL")
                    .HasMaxLength(150);
            });
        }
    }
}
