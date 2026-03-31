import { Clock, CheckCircle, AlertTriangle } from 'lucide-react'

export default function CPADashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">CPA Review Queue</h1>
        <p className="text-gray-500 mt-1">Returns awaiting your review</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-surface-300 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-amber-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-surface-300 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-surface-300 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-red-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">Flagged</p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty state */}
      <div className="bg-white border border-surface-300 rounded-2xl p-12 text-center">
        <CheckCircle size={48} className="mx-auto text-green-300 mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">All caught up!</h2>
        <p className="text-gray-500 mt-2">
          No returns waiting for review. New submissions will appear here automatically.
        </p>
      </div>
    </div>
  )
}
