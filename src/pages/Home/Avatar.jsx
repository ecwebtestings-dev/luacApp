const avatars = ['A', 'B', 'C', 'D']

export default function SocialProof() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex">
        {avatars.map((letter, i) => (
          <div
            key={letter}
            style={{ zIndex: avatars.length - i }}
            className={`flex items-center justify-center size-9 rounded-full bg-white border-2 border-primary text-primary font-bold text-md ${
              i > 0 ? '-ml-3' : ''
            }`}
          >
            {letter}
          </div>
        ))}
      </div>

      <p className="text-sm text-muted">
        <span className="text-iconBg mr-1">•</span>
        Join 200+ Tech Students
      </p>
    </div>
  )
}