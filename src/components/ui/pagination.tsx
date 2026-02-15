'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page => {
          if (totalPages <= 7) return true
          if (page === 1 || page === totalPages) return true
          if (Math.abs(page - currentPage) <= 1) return true
          return false
        })
        .map((page, idx, arr) => {
          const prevPage = arr[idx - 1]
          const showEllipsis = prevPage && page - prevPage > 1
          return (
            <span key={page} className="flex items-center gap-2">
              {showEllipsis && <span className="px-1 text-zinc-400">...</span>}
              <Button
                variant={page === currentPage ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            </span>
          )
        })}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
