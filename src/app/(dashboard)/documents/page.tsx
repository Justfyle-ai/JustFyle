'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  status: 'uploading' | 'processing' | 'verified' | 'needs_review' | 'error'
  uploadedAt: Date
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFiles(files: FileList) {
    const newDocs: Document[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: file.type,
      status: 'uploading' as const,
      uploadedAt: new Date(),
    }))

    setDocuments((prev) => [...prev, ...newDocs])

    // Simulate upload → processing → verified
    newDocs.forEach((doc) => {
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) => (d.id === doc.id ? { ...d, status: 'processing' } : d))
        )
      }, 1000)

      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) => (d.id === doc.id ? { ...d, status: 'verified' } : d))
        )
      }, 3000)
    })
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  function removeDoc(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  const statusConfig = {
    uploading: { label: 'Uploading...', color: 'text-gray-500', icon: null },
    processing: { label: 'AI Reading...', color: 'text-amber-600', icon: null },
    verified: { label: 'Verified', color: 'text-green-600', icon: CheckCircle },
    needs_review: { label: 'Needs Review', color: 'text-amber-600', icon: AlertCircle },
    error: { label: 'Error', color: 'text-red-600', icon: AlertCircle },
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-500 mt-1">
          Upload your W2s, 1099s, and other tax documents. AI reads them instantly.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-brand-500 bg-brand-50'
            : 'border-surface-300 hover:border-brand-300 hover:bg-surface-200'
        }`}
      >
        <Upload size={40} className="mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-gray-500 mt-1">
          PDF, JPG, PNG — W2s, 1099s, receipts, prior returns
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Document List */}
      {documents.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Uploaded Documents
          </h2>
          {documents.map((doc) => {
            const status = statusConfig[doc.status]
            const StatusIcon = status.icon
            return (
              <div
                key={doc.id}
                className="bg-white border border-surface-300 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <FileText size={20} className="text-gray-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                  <p className={`text-xs ${status.color} flex items-center gap-1`}>
                    {StatusIcon && <StatusIcon size={12} />}
                    {status.label}
                  </p>
                </div>
                <button
                  onClick={() => removeDoc(doc.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
