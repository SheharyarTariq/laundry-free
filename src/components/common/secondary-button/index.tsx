'use client'
import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';

interface SecondaryButtonProps{
  children: React.ReactNode
  route: string;
}

const SecondaryButton:React.FC<SecondaryButtonProps> = ({children, route}) => {
  const pathname = usePathname();

  return (
    <Link href={route}>
      <button className={`px-4 py-2 rounded-lg text-white  text-xs sm:text-sm md:text-base  hover:cursor-pointer ${pathname.startsWith(route) ? "bg-deep-ocean" : ""}`}>
        {children}
      </button>
    </Link>
  )
}

export default SecondaryButton
