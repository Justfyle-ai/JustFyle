import { FileSearch } from 'lucide-react'

export default function CPAReviewPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Review Return</h1>
        <p className="text-gray-500 mt-1">Select a return from the queue to begin review</p>
      </div>

      <div className="bg-white border border-surface-300 rounded-2xl p-12 text-center">
        <FileSearch size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">No return selected</h2>
        <p className="text-gray-500 mt-2">
          Go to the Review Queue and click on a return to start reviewing.
        </p>
      </div>
    </div>
  )
}
