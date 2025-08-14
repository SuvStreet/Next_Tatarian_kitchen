'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@heroui/react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/config/site.config'
import { layoutConfig } from '@/config/layout.config'

export const Logo = () => {
  return (
    <Image
      src="/logo_tatar_kitchen.png"
      alt={siteConfig.title}
      width={26}
      height={26}
      priority
    />
  )
}

export default function Header() {
  const pathName = usePathname()

  const getNavItems = () => {
    return siteConfig.navItems.map((item) => {
      const isActive = pathName === item.href

      return (
        <NavbarItem key={item.href}>
          <Link
            color="foreground"
            href={item.href}
            className={`
                  px-3 py-1 
                  ${isActive ? 'text-blue-500' : 'text-foreground'} 
                hover:text-blue-300 hover:border
                hover:border-blue-300 hover:rounded-md
                  transition-colors
                  transition-border
                  duration-200
                `}
          >
            {item.label}
          </Link>
        </NavbarItem>
      )
    })
  }

  return (
    <Navbar className={`h-[${layoutConfig.headerHeight}]`}>
      <NavbarBrand>
        <Link rel="icon" href="/" className="flex gap-1 items-center">
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.title}</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Логин</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Регистрация
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
