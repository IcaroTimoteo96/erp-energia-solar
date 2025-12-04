using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SolarCRM.Domain.Entities;

namespace SolarCRM.Infrastructure.Persistence
{
    public class SolarDbContext : IdentityDbContext<User>
    {
        public SolarDbContext(DbContextOptions<SolarDbContext> options) : base(options)
        {
        }

        public DbSet<Lead> Leads { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<QuoteItem> QuoteItems { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectDocument> ProjectDocuments { get; set; }
        public DbSet<ServiceOrder> ServiceOrders { get; set; }
        public DbSet<ChecklistItem> ChecklistItems { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Interaction> Interactions { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TaxConfiguration> TaxConfigurations { get; set; }
        public DbSet<PerformanceMonitoring> PerformanceMonitorings { get; set; }
        public DbSet<ProjectAnalysis> ProjectAnalyses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Interaction>()
                .HasOne(i => i.Lead)
                .WithMany()
                .HasForeignKey(i => i.LeadId);

            // Configure relationships and constraints here if needed
            modelBuilder.Entity<Quote>()
                .HasOne(q => q.Lead)
                .WithMany()
                .HasForeignKey(q => q.LeadId);

            modelBuilder.Entity<QuoteItem>()
                .HasOne(qi => qi.Product)
                .WithMany()
                .HasForeignKey(qi => qi.ProductId);

            modelBuilder.Entity<Project>()
                .HasOne(p => p.Quote)
                .WithMany()
                .HasForeignKey(p => p.QuoteId);

            modelBuilder.Entity<ServiceOrder>()
                .HasOne(so => so.Project)
                .WithMany()
                .HasForeignKey(so => so.ProjectId);
        }
    }
}
