'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { LayoutDashboard, FileSearch, LogOut } from 'lucide-react'

const navItems = [
  { href: '/cpa-dashboard', label: 'Review Queue', icon: LayoutDashboard },
  { href: '/cpa-review', label: 'Active Review', icon: FileSearch },
]

export default function CPALayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex bg-surface-100">
      <aside className="w-64 bg-gray-900 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <Link href="/cpa-dashboard" className="text-xl font-bold text-white">
            Just<span className="text-brand-400">Fyle</span>
            <span className="text-xs ml-2 bg-amber-500 text-gray-900 px-2 py-0.5 rounded-full font-semibold">
              CPA
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors w-full"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
