'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { User } from 'lucide-react'

export default function SettingsPage() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const supabase = createClient()

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || '')
        setFullName(user.user_metadata?.full_name || '')
      }
    }
    loadUser()
  }, [supabase.auth])

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account</p>
      </div>

      <div className="bg-white border border-surface-300 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center">
            <User size={28} className="text-brand-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{fullName || 'Your Name'}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>

        <hr className="border-surface-300" />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-200 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <button className="px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  )
}
