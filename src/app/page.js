"use client";

import { Layout, Radio } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { trainingModules } from "./api/Fields/fields";
import ProfileProps from "./components/dashboard/profile";
import Bell from "./components/icons/bell";
import Search from "./components/icons/Search";
import ViewDetails from "./components/layout/popover";
const { Header, Content, Footer } = Layout;


export default function Home() {
  const [stockTitle, setStockTitle]=useState([])
  
  const pathname = usePathname();

const session=useSession()

console.log(session);

function handleChange(domains) {
  console.log(domains);
  setStockTitle([...stockTitle, domains])
  localStorage.setItem("title", JSON.stringify(stockTitle))
}

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "My Courses", href: "/courses" },
    { name: "Quiz and Exercices", href: "/quiz" },
    { name: "Progressions and Statistique", href: "/progession" },
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
      <Content>
        <h1 className="text-2xl text-center mt-4 text-white">
          What domain do you want to learn ?
        </h1>
        <Radio.Group  buttonStyle="solid" className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 text-center gap-5 lg:max-w-screen-xl md:max-w-screen-md max-w-sm  mx-auto mt-10">
          {trainingModules.map((module) => (
            <Radio.Button
            onChange={()=> handleChange(module.domain)}
            value={module.id}
              key={module.id}
              className=" text-md flex hover:text-white bg-gray-400 flex-col items-center gap-2 min-h-[220px] w-[300px] mx-4 my-4 justify-center rounded-lg "
            >
              <h1 className="text-2xl font-semibold">{module.domain} </h1>
              <p className="my-2">{module.description} </p>
              <ViewDetails domainId={module.id}/>
            </Radio.Button>
            
          ))}
        </Radio.Group>

      </Content>
      
      </div>
 
    </div>
  );
}
