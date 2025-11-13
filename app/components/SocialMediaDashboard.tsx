'use client'

import { useState } from 'react'
import PlatformCard from './PlatformCard'
import AIAgent from './AIAgent'
import ContentGenerator from './ContentGenerator'
import ScheduleManager from './ScheduleManager'

const platforms = [
  { name: 'YouTube', color: 'youtube', icon: '▶️', connected: false },
  { name: 'Facebook', color: 'facebook', icon: '📘', connected: false },
  { name: 'Twitter', color: 'twitter', icon: '🐦', connected: false },
  { name: 'Pinterest', color: 'pinterest', icon: '📌', connected: false },
  { name: 'Instagram', color: 'instagram', icon: '📷', connected: false },
  { name: 'LinkedIn', color: 'linkedin', icon: '💼', connected: false },
  { name: 'TikTok', color: 'tiktok', icon: '🎵', connected: false },
]

export default function SocialMediaDashboard() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'platforms' | 'ai' | 'content' | 'schedule'>('platforms')

  const togglePlatform = (platformName: string) => {
    setConnectedPlatforms(prev =>
      prev.includes(platformName)
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8 bg-white rounded-lg shadow-md p-2">
        <button
          onClick={() => setActiveTab('platforms')}
          className={`flex-1 py-3 px-6 rounded-md font-semibold transition-all ${
            activeTab === 'platforms'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          🌐 Platforms
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-3 px-6 rounded-md font-semibold transition-all ${
            activeTab === 'ai'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          🤖 AI Agent
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 px-6 rounded-md font-semibold transition-all ${
            activeTab === 'content'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          ✨ Content Generator
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-3 px-6 rounded-md font-semibold transition-all ${
            activeTab === 'schedule'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          📅 Schedule
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'platforms' && (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-2">Connected Platforms</h2>
            <p className="text-gray-600 mb-4">
              Click to connect/disconnect platforms for AI automation
            </p>
            <div className="flex items-center gap-4">
              <span className="font-semibold">Status:</span>
              <span className="text-green-600">{connectedPlatforms.length} platforms connected</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {platforms.map(platform => (
              <PlatformCard
                key={platform.name}
                name={platform.name}
                color={platform.color}
                icon={platform.icon}
                connected={connectedPlatforms.includes(platform.name)}
                onToggle={() => togglePlatform(platform.name)}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ai' && <AIAgent connectedPlatforms={connectedPlatforms} />}
      {activeTab === 'content' && <ContentGenerator connectedPlatforms={connectedPlatforms} />}
      {activeTab === 'schedule' && <ScheduleManager connectedPlatforms={connectedPlatforms} />}
    </div>
  )
}
