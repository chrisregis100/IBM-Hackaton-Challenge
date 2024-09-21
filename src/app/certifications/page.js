"use client";

import { Layout } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileProps from "../components/dashboard/profile";
import ArrowRight from "../components/icons/ArrowRight";
import Bell from "../components/icons/bell";
import Search from "../components/icons/Search";
const { Header, Content, Footer } = Layout;

export default function Home() {
  const pathname = usePathname();
  const [domain, setDomain] = useState([]);

  const session = useSession();
  console.log(session);

  useEffect(() => {
    const item = localStorage.getItem("title");
    if (item) {
      try {
        const parsedItem = JSON.parse(item);
        setDomain(parsedItem);
        console.log(parsedItem);
      } catch (error) {
        console.error("Error parsing domain data:", error);
      }
    }
  }, []);

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "My Courses", href: "/courses" },
    { name: "Quiz and Exercices", href: "/quiz" },
    { name: "Progressions and Statistique", href: "/progression" },
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
      <div className="flex bg-black text-white">
        <div className="flex flex-col max-w-[250px] min-h-screen gap-5 justify-between border-r border-white/30">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={pathname === link.href ? "lien" : "link"}
            >
              {link.name}{" "}
            </Link>
          ))}
        </div>
        <Content className="text-white text-center">
        <div className="flex flex-col items-center gap-5 text-2xl  mt-10 justify-center">
              <h1 className="font-bold">You have not finish any courses</h1>
              <Link className="flex items-center gap-4 shadow-sm border border-white/30 px-4 shadow-white/45" href={'/courses'}>
                <p>let&apos;s continue my lessons </p>{" "}
                <ArrowRight/>
              </Link>
            </div>
        </Content>
      </div>
    </div>
  );
}
