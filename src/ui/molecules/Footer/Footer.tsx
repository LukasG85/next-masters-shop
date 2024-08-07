'use client'

import { ActiveLink } from "@/ui/atoms/ActiveLink"
import { links } from "@/ui/organisms/Navigation"

export const Footer = () => {
  return (
   

<footer className="h-20 flex bg-white shadow mt-4 dark:bg-gray-800">
    <div className="w-full max-w-1920 mx-auto p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
      {links.map((link) => (
        <li className="hover:underline me-4 md:me-6">
          <ActiveLink exact key={link.id} href={link.href}>
            {link.name}
          </ActiveLink>
        </li>
        ))}
    </ul>
    </div>
</footer>

  )
}