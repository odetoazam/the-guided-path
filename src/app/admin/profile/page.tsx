'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Mail, Lock, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setEmail(user.email || '')
        setCurrentEmail(user.email || '')

        // Get profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single()

        if (profile) {
          setFullName(profile.full_name || '')
        }
      }
    } catch {
      toast.error('Failed to load profile')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingProfile(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast.error('Not authenticated')
        return
      }

      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', user.id)

      if (error) {
        toast.error(error.message)
        return
      }

      // Also update auth metadata
      await supabase.auth.updateUser({
        data: { full_name: fullName }
      })

      toast.success('Profile updated')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setLoadingProfile(false)
    }
  }

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    if (email === currentEmail) {
      toast.error('Email is the same as current')
      return
    }

    setLoadingEmail(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ email })

      if (error) {
        toast.error(error.message)
        return
      }

      // Also update the profiles table
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase
          .from('profiles')
          .update({ email })
          .eq('id', user.id)
      }

      toast.success('Email updated. You may need to confirm the new email.')
      setCurrentEmail(email)
    } catch {
      toast.error('Failed to update email')
    } finally {
      setLoadingEmail(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoadingPassword(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Password updated successfully')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      toast.error('Failed to update password')
    } finally {
      setLoadingPassword(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="mt-1 text-sm text-zinc-400">Manage your account settings</p>
      </div>

      {/* Name Section */}
      <form onSubmit={handleUpdateProfile} className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-center gap-3 text-white">
          <User className="h-5 w-5 text-gold-500" />
          <h2 className="text-lg font-semibold">Display Name</h2>
        </div>

        <Input
          id="fullName"
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your name"
          className="bg-zinc-900 border-zinc-700 text-white"
        />

        <div className="flex justify-end">
          <Button type="submit" loading={loadingProfile} size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Name
          </Button>
        </div>
      </form>

      {/* Email Section */}
      <form onSubmit={handleUpdateEmail} className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-center gap-3 text-white">
          <Mail className="h-5 w-5 text-gold-500" />
          <h2 className="text-lg font-semibold">Email Address</h2>
        </div>

        <p className="text-sm text-zinc-400">
          Current email: <span className="text-zinc-300">{currentEmail}</span>
        </p>

        <Input
          id="email"
          label="New Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="new@email.com"
          className="bg-zinc-900 border-zinc-700 text-white"
        />

        <div className="flex justify-end">
          <Button type="submit" loading={loadingEmail} size="sm">
            <Save className="mr-2 h-4 w-4" />
            Update Email
          </Button>
        </div>
      </form>

      {/* Password Section */}
      <form onSubmit={handleUpdatePassword} className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-center gap-3 text-white">
          <Lock className="h-5 w-5 text-gold-500" />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>

        <Input
          id="newPassword"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          minLength={6}
          className="bg-zinc-900 border-zinc-700 text-white"
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          minLength={6}
          className="bg-zinc-900 border-zinc-700 text-white"
        />

        <div className="flex justify-end">
          <Button type="submit" loading={loadingPassword} size="sm">
            <Lock className="mr-2 h-4 w-4" />
            Update Password
          </Button>
        </div>
      </form>
    </div>
  )
}
