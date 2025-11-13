interface PlatformCardProps {
  name: string
  color: string
  icon: string
  connected: boolean
  onToggle: () => void
}

export default function PlatformCard({ name, color, icon, connected, onToggle }: PlatformCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 ${
        connected
          ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
          : 'bg-white text-gray-800 hover:shadow-xl'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="text-4xl">{icon}</span>
        <h3 className="font-bold text-xl">{name}</h3>
        <div className={`px-4 py-1 rounded-full text-sm font-semibold ${
          connected
            ? 'bg-white text-green-600'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {connected ? '✓ Connected' : 'Click to Connect'}
        </div>
      </div>

      {connected && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      )}
    </button>
  )
}
