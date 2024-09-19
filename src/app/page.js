"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileProps from "./components/dashboard/profile";
import Bell from "./components/icons/bell";
import Search from "./components/icons/Search";


export default function Home() {
  
  const pathname = usePathname();
const {data:session, status}=useSession()

console.log(session);

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Courses", href: "/courses" },
    { name: "Quiz and Exercices", href: "/quiz" },
    { name: "Progressions and Statistique", href: "/statistiques" },
    { name: "Certifications", href: "/certifications" },
    { name: "Feedbacks", href: "/feedbacks" },
    { name: "Settings", href: "/settings" },
    { name: "Support/Help", href: "/support" },
  ];


  return (
    <div className=" ">
      <header className="flex items-center justify-between px-10  h-20 border rounded-lg border-white/30 ">
        <Link href={"/"} className="text-3xl font-bold mx-4">
          X-vice
        </Link>
        <form className="flex items-center gap-3">
          <input
            className="rounded-xl w-80 bg-black border border-white px-4"
            type="text"
            placeholder="search..."
          />
          <Search />
        </form>
        <div className="flex items-center gap-4">
          <Bell />
          <ProfileProps />
        </div>
      </header>
      <div className="links flex flex-col max-w-[250px] h-screen gap-5 justify-start border-r border-white/30">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={pathname === link.href ? "bg-white text-black" : "link"}
          >
            {link.name}{" "}
          </Link>
        ))}
      </div>
    </div>
  );
}
