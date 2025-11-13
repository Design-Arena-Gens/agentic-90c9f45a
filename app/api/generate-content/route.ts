import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { topic, tone, platforms } = await request.json()

    const content: { [key: string]: string } = {}

    platforms.forEach((platform: string) => {
      content[platform] = generatePlatformContent(topic, tone, platform)
    })

    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}

function generatePlatformContent(topic: string, tone: string, platform: string): string {
  const toneAdjectives: { [key: string]: string[] } = {
    professional: ['innovative', 'strategic', 'excellence-driven'],
    casual: ['awesome', 'cool', 'amazing'],
    enthusiastic: ['exciting', 'incredible', 'fantastic'],
    formal: ['distinguished', 'esteemed', 'prestigious'],
    humorous: ['hilarious', 'witty', 'entertaining'],
    inspirational: ['transformative', 'empowering', 'groundbreaking']
  }

  const adjective = toneAdjectives[tone]?.[Math.floor(Math.random() * 3)] || 'great'

  switch (platform) {
    case 'Twitter':
      return `🚀 ${topic}! This ${adjective} development is changing the game. What are your thoughts? #Innovation #${topic.replace(/\s+/g, '')} #SocialMedia`

    case 'Facebook':
      return `Hey everyone! 👋\n\nWe're thrilled to share some news about ${topic}. This ${adjective} initiative represents our commitment to delivering value to our community.\n\nWhat do you think? Drop a comment below and let us know your thoughts! 💬\n\n#${topic.replace(/\s+/g, '')} #CommunityFirst`

    case 'LinkedIn':
      return `I'm excited to announce ${topic}.\n\nThis ${adjective} development showcases our dedication to innovation and excellence. In today's rapidly evolving landscape, initiatives like this are crucial for staying ahead.\n\nKey takeaways:\n• Strategic positioning for future growth\n• Enhanced value delivery\n• Commitment to innovation\n\nWhat's your perspective on this trend? I'd love to hear your insights.\n\n#ProfessionalDevelopment #Innovation #${topic.replace(/\s+/g, '')}`

    case 'Instagram':
      return `✨ ${topic} ✨\n\nThis ${adjective} moment is what we've been working towards! Swipe to see more 👉\n\n${getToneEmojis(tone)}\n\n#${topic.replace(/\s+/g, '')} #InstaGood #Innovation #Trending #${tone}Vibes`

    case 'YouTube':
      return `🎥 ${topic.toUpperCase()}\n\nIn this ${adjective} video, we dive deep into ${topic}. You won't believe what we discovered!\n\n⏰ Timestamps:\n0:00 - Introduction\n1:30 - Main Content\n8:45 - Key Insights\n10:00 - Conclusion\n\nDon't forget to LIKE, SUBSCRIBE, and hit that notification bell! 🔔\n\n#${topic.replace(/\s+/g, '')} #YouTube #ContentCreator`

    case 'Pinterest':
      return `📌 ${topic}\n\nDiscover this ${adjective} concept! Save this pin for later and explore more ideas on our board.\n\nPerfect for:\n✓ Inspiration seekers\n✓ Trend followers\n✓ Creative minds\n\n#${topic.replace(/\s+/g, '')} #PinterestInspiration #Ideas #Trending`

    case 'TikTok':
      return `🎵 ${topic} 🎵\n\nThis ${adjective} trend is EVERYTHING! ${getToneEmojis(tone)}\n\nTry it yourself and tag us! Let's make this viral! 🚀\n\n#${topic.replace(/\s+/g, '')} #TikTokTrending #Viral #ForYouPage #FYP #Trending`

    default:
      return `${topic} - A ${adjective} development in our journey! ${getToneEmojis(tone)}\n\n#${topic.replace(/\s+/g, '')} #SocialMedia`
  }
}

function getToneEmojis(tone: string): string {
  const emojiMap: { [key: string]: string } = {
    professional: '💼 🎯 📈',
    casual: '😊 ✌️ 🌟',
    enthusiastic: '🎉 🔥 ⚡',
    formal: '🏆 👔 📊',
    humorous: '😂 🤣 😄',
    inspirational: '💪 ✨ 🌈'
  }
  return emojiMap[tone] || '✨ 🎯 🚀'
}
