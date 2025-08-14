'use client'

import { siteConfig } from '@/config/site.config'
import { Button } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <Image
        src={siteConfig.not_found.img}
        alt={siteConfig.not_found.title}
        width={426}
        height={426}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="text-8xl font-bold text-gray-300">
        {siteConfig.not_found.title}
      </div>

      <h1 className="text-3xl font-bold tracking-tight">
        {siteConfig.not_found.description}
      </h1>

      <div className="pt-6">
        <Button as={Link} color="primary" variant="shadow" href="/">
          Вернуться на главную
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
