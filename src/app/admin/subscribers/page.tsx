'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading'
import { Search, Download, Users, UserPlus, UserMinus } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Subscriber } from '@/types'
import toast from 'react-hot-toast'

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchSubscribers()
  }, [statusFilter])

  const fetchSubscribers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/subscribers?status=${statusFilter}`)
      const data = await res.json()
      setSubscribers(data.subscribers || [])
      setTotal(data.total || 0)
    } catch {
      toast.error('Failed to fetch subscribers')
    }
    setLoading(false)
  }

  const exportCSV = () => {
    const headers = ['email', 'name', 'status', 'source', 'subscribed_at']
    const rows = subscribers.map((s) => [
      s.email,
      s.name || '',
      s.status,
      s.source || '',
      s.created_at,
    ])

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV exported')
  }

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name && s.name.toLowerCase().includes(search.toLowerCase()))
  )

  const activeCount = subscribers.filter((s) => s.status === 'active').length
  const pendingCount = subscribers.filter((s) => s.status === 'pending').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscribers</h1>
          <p className="mt-1 text-zinc-400">{total} total subscribers</p>
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Users className="h-4 w-4" />
            Total
          </div>
          <p className="mt-1 text-2xl font-bold text-white">{total}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-center gap-2 text-sm text-green-400">
            <UserPlus className="h-4 w-4" />
            Active
          </div>
          <p className="mt-1 text-2xl font-bold text-white">{activeCount}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-center gap-2 text-sm text-yellow-400">
            <UserMinus className="h-4 w-4" />
            Pending
          </div>
          <p className="mt-1 text-2xl font-bold text-white">{pendingCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search by email or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-700"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'pending', 'unsubscribed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-gold-500/20 text-gold-500'
                  : 'text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <LoadingSpinner className="py-20" />
      ) : filteredSubscribers.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-20 text-center">
          <Users className="mx-auto h-8 w-8 text-zinc-600 mb-2" />
          <p className="text-zinc-500">No subscribers found</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 divide-y divide-zinc-800">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-zinc-500 uppercase">
            <div className="col-span-4">Email</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Source</div>
            <div className="col-span-2">Date</div>
          </div>
          {filteredSubscribers.map((sub) => (
            <div key={sub.id} className="grid grid-cols-12 gap-4 px-6 py-3 items-center text-sm hover:bg-zinc-800/30">
              <div className="col-span-4 text-white truncate">{sub.email}</div>
              <div className="col-span-2 text-zinc-400 truncate">{sub.name || '—'}</div>
              <div className="col-span-2">
                <Badge
                  variant={
                    sub.status === 'active' ? 'success' :
                    sub.status === 'pending' ? 'warning' : 'danger'
                  }
                >
                  {sub.status}
                </Badge>
              </div>
              <div className="col-span-2 text-zinc-400">{sub.source || '—'}</div>
              <div className="col-span-2 text-zinc-500">{formatDate(sub.created_at)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
