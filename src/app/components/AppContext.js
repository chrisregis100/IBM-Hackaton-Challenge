"use client"
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function AppProvider({ children }) {
  useEffect(() => {
    // Vérifiez si cz-shortcut-listen est ajouté dynamiquement
    const listener = document.body.getAttribute("cz-shortcut-listen");
    console.log("Current cz-shortcut-listen attribute:", listener);
  }, []);

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}