'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading'
import { Save, Globe, Mail, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    site_title: { title: 'The Guided Path', tagline: 'Deep Quranic reflections delivered to your inbox' },
    publishing_mode: { mode: 'manual' },
    email_config: { from_name: 'The Guided Path', reply_to: '' },
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data.settings) {
        setSettings((prev) => ({ ...prev, ...data.settings }))
      }
    } catch {
      // Use defaults
    }
    setLoading(false)
  }

  const saveSetting = async (key: string, value: any) => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      })
      if (res.ok) {
        toast.success('Settings saved')
      } else {
        toast.error('Failed to save')
      }
    } catch {
      toast.error('Failed to save')
    }
    setSaving(false)
  }

  if (loading) return <LoadingSpinner className="py-20" />

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-zinc-400">Configure your site and publishing preferences</p>
      </div>

      {/* Site Settings */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-gold-500" />
          <h2 className="text-lg font-semibold text-white">Site Settings</h2>
        </div>

        <Input
          label="Site Title"
          value={settings.site_title?.title || ''}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              site_title: { ...prev.site_title, title: e.target.value },
            }))
          }
          className="bg-zinc-900 border-zinc-700"
        />
        <Input
          label="Tagline"
          value={settings.site_title?.tagline || ''}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              site_title: { ...prev.site_title, tagline: e.target.value },
            }))
          }
          className="bg-zinc-900 border-zinc-700"
        />

        <Button
          onClick={() => saveSetting('site_title', settings.site_title)}
          loading={saving}
          size="sm"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Site Settings
        </Button>
      </div>

      {/* Publishing Mode */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-gold-500" />
          <h2 className="text-lg font-semibold text-white">Publishing Mode</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              mode: 'manual',
              title: 'Manual',
              desc: 'You write and publish manually. Full control over every post.',
            },
            {
              mode: 'approval',
              title: 'Automated with Approval',
              desc: 'AI generates drafts, you review and approve before publishing.',
            },
            {
              mode: 'auto',
              title: 'Fully Automated',
              desc: 'AI generates and publishes automatically. You can review after.',
            },
          ].map((option) => (
            <label
              key={option.mode}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                settings.publishing_mode?.mode === option.mode
                  ? 'border-gold-500 bg-gold-500/5'
                  : 'border-zinc-700 hover:border-zinc-600'
              }`}
            >
              <input
                type="radio"
                name="publishing_mode"
                value={option.mode}
                checked={settings.publishing_mode?.mode === option.mode}
                onChange={() =>
                  setSettings((prev) => ({
                    ...prev,
                    publishing_mode: { mode: option.mode },
                  }))
                }
                className="mt-1"
              />
              <div>
                <p className="font-medium text-white">{option.title}</p>
                <p className="text-sm text-zinc-400">{option.desc}</p>
              </div>
            </label>
          ))}
        </div>

        <Button
          onClick={() => saveSetting('publishing_mode', settings.publishing_mode)}
          loading={saving}
          size="sm"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Publishing Mode
        </Button>
      </div>

      {/* Email Settings */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-gold-500" />
          <h2 className="text-lg font-semibold text-white">Email Settings</h2>
        </div>

        <Input
          label="From Name"
          value={settings.email_config?.from_name || ''}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              email_config: { ...prev.email_config, from_name: e.target.value },
            }))
          }
          className="bg-zinc-900 border-zinc-700"
        />
        <Input
          label="Reply-To Email"
          value={settings.email_config?.reply_to || ''}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              email_config: { ...prev.email_config, reply_to: e.target.value },
            }))
          }
          className="bg-zinc-900 border-zinc-700"
        />

        <Button
          onClick={() => saveSetting('email_config', settings.email_config)}
          loading={saving}
          size="sm"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Email Settings
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-6">
        <p className="text-sm text-zinc-500">
          <strong className="text-zinc-400">Note:</strong> Claude API integration for automated publishing modes will be configured separately. The infrastructure is ready — just add your API key when ready.
        </p>
      </div>
    </div>
  )
}
