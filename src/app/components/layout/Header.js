"use client"

import { Button } from 'antd';
import Link from 'next/link';

function Header() {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Functionnalities", href: "/" },
    { name: "Prices", href: "/" },
    { name: "About", href: "/" },
  ];
  
  return (
    <header className="bg-black text-white flex items-center justify-between px-9">
    <h1 className="text-3xl text-white font-bold my-4">X-vice</h1>
    <nav className="md:flex gap-4 hidden">
      {links.map((link) => (
        <Link
          className="text-xl text-white font-semibold hover:text-white/30 grow "
          href={link.href}
          key={link.name}
        >
          {link.name}{" "}
        </Link>
      ))}
    </nav>
    <Button>Connexion</Button>
  </header>
  )
}

export default Header