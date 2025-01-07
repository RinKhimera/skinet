using System;
using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data;

public class StoreContextSeed
{
    // Méthode statique pour initialiser la base de données avec des données de produits
    public static async Task SeedAsync(StoreContext context)
    {
        // Vérifie si la table des produits est vide
        if (!context.Products.Any())
        {
            // Lit les données des produits à partir d'un fichier JSON
            var productsData = await File.ReadAllTextAsync(
                "../Infrastructure/Data/SeedData/products.json"
            );

            // Désérialise les données JSON en une liste d'objets Product
            var products = JsonSerializer.Deserialize<List<Product>>(productsData);

            // Si la désérialisation échoue, retourne
            if (products == null)
                return;

            // Ajoute les produits désérialisés au contexte
            context.Products.AddRange(products);

            // Sauvegarde les changements dans la base de données
            await context.SaveChangesAsync();
        }

        if (!context.DeliveryMethods.Any())
        {
            var dmData = await File.ReadAllTextAsync(
                "../Infrastructure/Data/SeedData/delivery.json"
            );

            var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

            if (methods == null)
                return;

            context.DeliveryMethods.AddRange(methods);

            await context.SaveChangesAsync();
        }
    }
}
