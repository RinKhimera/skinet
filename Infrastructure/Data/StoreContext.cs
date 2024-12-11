using System;
using Core.Entities;
using Infrastructure.Config;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

// Définition de la classe StoreContext qui hérite de DbContext
public class StoreContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    // Définition de la propriété DbSet pour les produits
    public required DbSet<Product> Products { get; set; }

    public required DbSet<Address> Addresses { get; set; }

    // Méthode appelée lors de la création du modèle
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Appel de la méthode de base
        base.OnModelCreating(modelBuilder);

        // Application des configurations de l'assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProductConfiguration).Assembly);
    }
}
