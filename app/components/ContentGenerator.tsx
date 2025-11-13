'use client'

import { useState } from 'react'

interface ContentGeneratorProps {
  connectedPlatforms: string[]
}

export default function ContentGenerator({ connectedPlatforms }: ContentGeneratorProps) {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('professional')
  const [generatedContent, setGeneratedContent] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim() || connectedPlatforms.length === 0) return

    setLoading(true)
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          tone,
          platforms: connectedPlatforms
        })
      })

      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (error) {
      console.error('Error generating content:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">AI Content Generator</h2>
        <p className="text-gray-600">
          Generate platform-optimized content for all your social media channels
        </p>
      </div>

      {connectedPlatforms.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800 font-semibold">
            Please connect at least one platform to generate content
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Topic / Description</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., Launch of new eco-friendly product line"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="formal">Formal</option>
                <option value="humorous">Humorous</option>
                <option value="inspirational">Inspirational</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : '✨ Generate Content for All Platforms'}
            </button>
          </div>

          {Object.keys(generatedContent).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Generated Content</h3>
              {Object.entries(generatedContent).map(([platform, content]) => (
                <div key={platform} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg">{platform}</h4>
                    <button
                      onClick={() => navigator.clipboard.writeText(content)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
