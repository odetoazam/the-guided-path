import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950 px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-gold-500">404</p>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">Page not found</h1>
        <p className="mt-2 text-zinc-500">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8">
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
