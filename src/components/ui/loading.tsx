import { cn } from '@/lib/utils'

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-[#D4AF37] dark:border-zinc-700" />
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}

export function PostCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="h-48 rounded-lg bg-zinc-200 dark:bg-zinc-800 mb-4" />
      <div className="h-4 rounded bg-zinc-200 dark:bg-zinc-800 mb-2 w-3/4" />
      <div className="h-3 rounded bg-zinc-200 dark:bg-zinc-800 mb-2 w-full" />
      <div className="h-3 rounded bg-zinc-200 dark:bg-zinc-800 w-2/3" />
    </div>
  )
}
