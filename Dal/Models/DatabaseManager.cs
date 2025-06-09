using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Dal.Models;

public partial class DatabaseManager : DbContext
{
    public DatabaseManager()
    {
    }

    public DatabaseManager(DbContextOptions<DatabaseManager> options)
        : base(options)
    {
    }

    public virtual DbSet<Attendent> Attendents { get; set; }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<ClinicAppointment> ClinicAppointments { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=H:\\FinalProject\\DataBase\\MyDataBase.mdf;Integrated Security=True;Connect Timeout=30");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Attendent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Attenden__3214EC07DDC82AFC");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.FirstName)
                .HasMaxLength(10)
                .HasColumnName("First_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(10)
                .HasColumnName("Last_name");
            entity.Property(e => e.NumberPhone)
                .HasMaxLength(10)
                .HasColumnName("Number_phone");
        });

        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Clients__3214EC07CCABBAC5");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address).HasMaxLength(10);
            entity.Property(e => e.DateOfBirth).HasColumnName("Date_of_birth");
            entity.Property(e => e.Email).HasMaxLength(10);
            entity.Property(e => e.FirstName)
                .HasMaxLength(10)
                .HasColumnName("First_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(10)
                .HasColumnName("Last_name");
            entity.Property(e => e.NumberPhone)
                .HasMaxLength(10)
                .HasColumnName("Number_phone");
        });

        modelBuilder.Entity<ClinicAppointment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ClinicAp__3214EC07BE00E701");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.Attendent).WithMany(p => p.ClinicAppointments)
                .HasForeignKey(d => d.AttendentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClinicAppointments_Attendents");

            entity.HasOne(d => d.Clinet).WithMany(p => p.ClinicAppointments)
                .HasForeignKey(d => d.ClinetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClinicAppointments_Clients");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
