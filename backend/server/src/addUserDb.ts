import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

// Initialisation du client Prisma
const prisma = new PrismaClient();

async function main() {
  try {
    // Hacher le mot de passe
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync("corum123", salt);
    // Ajouter l'utilisateur dans la base de données
    const user = await prisma.user.create({
      data: {
        firstName: "admin",
        lastName: "admin",
        email: "admin@corum.com",
        birthDate: new Date("1995-02-20"),
        password: hashedPassword,
        active: false,
      },
    });

    console.log("Utilisateur ajouté avec succès:", user);
  } catch (error) {
    console.error("Erreur lors de l’ajout de l’utilisateur:", error);
  } finally {
    // Fermer la connexion à la base de données
    await prisma.$disconnect();
  }
}

// Exécution du script
main();
