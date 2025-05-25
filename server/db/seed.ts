import { storage } from "../storage";

async function seedDatabase() {
  try {
    const existingAdmin = await storage.getUserByUsername("drbenameur");

    if (existingAdmin) {
      console.log("ℹ️ Données déjà présentes dans la base");
      return;
    }

    await storage.createUser({
      username: "drbenameur",
      password: "securepassword",
      fullName: "Dr. Benameur",
      email: "contact@cabinet-benameur.com",
      role: "admin"
    });

    await storage.createNewsPost({
      title: "Acquisition d'un nouvel équipement IRM 3 Tesla",
      content: "Le Cabinet de Radiologie du Dr. Benameur est fier d'annoncer l'acquisition d'un nouvel appareil IRM 3 Tesla...",
      imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      category: "news"
    });

    await storage.createNewsPost({
      title: "Participation au Congrès International de Radiologie",
      content: "Le Dr. Benameur a participé au dernier Congrès International de Radiologie à Paris...",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      category: "news"
    });

    await storage.createNewsPost({
      title: "L'importance du dépistage précoce par imagerie",
      content: "Découvrez pourquoi l'imagerie médicale joue un rôle crucial...",
      imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      category: "news"
    });

    await storage.createNewsPost({
      title: "Comment se préparer à un examen IRM ?",
      content: "L'IRM est un examen indolore qui nécessite néanmoins une préparation spécifique...",
      imageUrl: null,
      category: "health-tips"
    });

    await storage.createNewsPost({
      title: "Radiographie et grossesse : ce qu'il faut savoir",
      content: "Pendant la grossesse, certains examens radiologiques peuvent être réalisés avec précautions...",
      imageUrl: null,
      category: "health-tips"
    });

    console.log("✅ Base de données initialisée avec succès");
  } catch (error) {
    console.error("❌ Erreur lors du seed de la base :", error);
    process.exit(1);
  }
}

seedDatabase();
