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
import RegistrationModal from '../modals/registration.modal'
import { useState } from 'react'
import LoginModal from '../modals/login.modal'
import { signOutFunc } from '@/actions/sing-out'
import { useAuthStore } from '@/store/auth.store'

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

  const { isAuth, session, status, setAuthState } = useAuthStore()

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const handelSingOut = async () => {
    try {
      await signOutFunc()
    } catch (error) {
      console.error('Error', error)
    }

    setAuthState('unauthenticated', null)
  }

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
    <Navbar style={{ height: layoutConfig.headerHeight }}>
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
        {isAuth && <p>Привет, {session?.user?.email}!</p>}

        {status === 'loading' ? <p>Загрузка...</p> : !isAuth ? (
          <>
            <NavbarItem className="lg:flex">
              <Button
                as={Link}
                color="secondary"
                href="#"
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                Войти
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Регистрация
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="lg:flex">
            <Button
              as={Link}
              color="secondary"
              href="#"
              variant="flat"
              onPress={handelSingOut}
            >
              Выйти
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  )
}
