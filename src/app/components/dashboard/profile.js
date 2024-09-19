"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

function ProfileProps(image) {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: "My profile", href: "/Profile" },
    { name: "Deconnexion", href: "/Deconnexion" },
  ]

  return (
    <div className='bg-white/30  relative rounded-sm '>
      <button
        type='button'
        className='inline-flex   border-0 justify-start'
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
      >
        <Image alt='profile' className='rounded-full'  src={image} width={50} height={50} />
      </button>
      <div id="dropdown-menu" className={`transition-all absolute z-10 shadow border border-gray-400/25 duration-200 mt-1 -ml-10 ${isOpen ? 'flex flex-col items-center bg-white/30 text-white mt-5 h-auto rounded-lg' : 'hidden'}`}>
        {links.map(link => (
          <Link href={link.href} key={link.name} className="p-4 hover:bg-black w-full">
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProfileProps