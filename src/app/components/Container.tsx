'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaFacebook, FaInstagram } from "react-icons/fa";

import Header from './Header'


export default function Container({ children }: { children: React.ReactNode }) {
  const homepage = usePathname() === '/'

  return (
    <div className="w-screen min-h-screen bg-black">
      <Header />
      <main className="w-full font-barlow min-h-screen">{children}</main>
      <footer className="fixed bottom-0 w-full bg-neutral-900/30 px-4 py-3 sm:px-8 sm:pt-5 sm:pb-5">
       
        <p className="hidden md:flex absolute text-[10px] tracking-tight xs:tracking-normal  z-50 leading-loose bottom-5 left-12 text-white">
                Website by Vivien Ingrams
              </p>
        <div className="flex flex-col items-end gap-y-2">
          <div className="flex gap-x-2 text-neutral-300">
            <Socials />
          </div>
          <span className=" text-sm text-neutral-100 ">
            info@joelbardeau.com
          </span>
        </div>
        
      </footer>
    </div>
  )
}


interface Social {
    label: string;
    Icon: React.ComponentType<{ className: string }>;
    href: string;
}
  
const socialLinks: Social[] = [
    {label: 'Instagram', Icon: FaInstagram, href: 'https://instagram.com/sakiko.oishi?igshid=YjNmNGQ3MDY='},
    {label: 'Facebook', Icon: FaFacebook, href: 'https://facebook.com/SakikoOISHI'},
];

 function Socials () {
    return (
      <>
        {socialLinks.map(({label, Icon, href}) => (
          <Link
            aria-label={label}
            className="-m-1.5 rounded-md p-1.5 transition-all duration-300 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500  sm:-m-3 sm:p-3"
            href={href}
            key={label}>
            <Icon className="h-5 w-5 align-baseline sm:h-6 sm:w-6" />
          </Link>
        ))}
      </>
    );
  };