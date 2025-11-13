'use client'

import { useState } from 'react'
import { format } from 'date-fns'

interface ScheduleManagerProps {
  connectedPlatforms: string[]
}

interface ScheduledPost {
  id: string
  platform: string
  content: string
  scheduledTime: string
  status: 'scheduled' | 'posted' | 'failed'
}

export default function ScheduleManager({ connectedPlatforms }: ScheduleManagerProps) {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      platform: 'Twitter',
      content: 'Excited to announce our new AI-powered features! 🚀',
      scheduledTime: '2025-11-14T10:00',
      status: 'scheduled'
    },
    {
      id: '2',
      platform: 'LinkedIn',
      content: 'Check out our latest blog post about AI in social media management.',
      scheduledTime: '2025-11-14T14:00',
      status: 'scheduled'
    }
  ])

  const [newPost, setNewPost] = useState({
    platform: '',
    content: '',
    scheduledTime: ''
  })

  const handleSchedulePost = () => {
    if (!newPost.platform || !newPost.content || !newPost.scheduledTime) return

    const post: ScheduledPost = {
      id: Date.now().toString(),
      platform: newPost.platform,
      content: newPost.content,
      scheduledTime: newPost.scheduledTime,
      status: 'scheduled'
    }

    setScheduledPosts([...scheduledPosts, post])
    setNewPost({ platform: '', content: '', scheduledTime: '' })
  }

  const handleDeletePost = (id: string) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Schedule Manager</h2>
        <p className="text-gray-600">
          Schedule posts across all your connected platforms
        </p>
      </div>

      {connectedPlatforms.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800 font-semibold">
            Please connect at least one platform to schedule posts
          </p>
        </div>
      ) : (
        <>
          {/* Schedule New Post Form */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Schedule New Post</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Platform</label>
                <select
                  value={newPost.platform}
                  onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="">Select a platform</option>
                  {connectedPlatforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="What would you like to post?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Schedule Date & Time</label>
                <input
                  type="datetime-local"
                  value={newPost.scheduledTime}
                  onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <button
                onClick={handleSchedulePost}
                disabled={!newPost.platform || !newPost.content || !newPost.scheduledTime}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📅 Schedule Post
              </button>
            </div>
          </div>

          {/* Scheduled Posts List */}
          <div>
            <h3 className="text-xl font-bold mb-4">Scheduled Posts ({scheduledPosts.length})</h3>
            {scheduledPosts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No scheduled posts yet. Create your first scheduled post above!
              </div>
            ) : (
              <div className="space-y-4">
                {scheduledPosts.map(post => (
                  <div
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {post.platform}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          post.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' :
                          post.status === 'posted' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {post.status === 'scheduled' ? '⏰ Scheduled' :
                           post.status === 'posted' ? '✓ Posted' : '✗ Failed'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        🗑️ Delete
                      </button>
                    </div>

                    <p className="text-gray-700 mb-3">{post.content}</p>

                    <div className="text-sm text-gray-500">
                      📅 {new Date(post.scheduledTime).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
