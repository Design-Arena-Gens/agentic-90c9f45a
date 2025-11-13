'use client'

import { useState } from 'react'
import SocialMediaDashboard from './components/SocialMediaDashboard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI Social Media Agent
          </h1>
          <p className="text-gray-600 text-lg">
            Intelligent automation for YouTube, Facebook, Twitter, Pinterest, Instagram, LinkedIn & TikTok
          </p>
        </header>

        <SocialMediaDashboard />
      </div>
    </main>
  )
}
