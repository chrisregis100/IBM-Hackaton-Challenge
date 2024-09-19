import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import User from "../../models/user";

export async function POST(req) {
  try {
    const body = await req.json();

    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    // Vérification du mot de passe
    let password = body.password; // Correction de la propriété
    if (password.length < 6) {
      console.log("Le mot de passe doit comporter au moins 6 caractères");
      return NextResponse.json(
        { message: "Le mot de passe doit comporter au moins 6 caractères" },
        { status: 400 }
      );
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      
      // Remplacer le mot de passe en clair par le mot de passe hashé
      body.password = hashedPassword;

      // Création de l'utilisateur
      const user = await User.create(body);
      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
