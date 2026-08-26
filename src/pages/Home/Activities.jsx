import { useRef, useState } from 'react'
import {
  CpuChipIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  WrenchScrewdriverIcon,
  ShareIcon,
  ShieldCheckIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'

const categories = [
  { icon: CpuChipIcon, title: 'Artificial Intelligence', text: 'Explore machine learning, deep learning and intelligent systems.' },
  { icon: PaintBrushIcon, title: 'Graphic Design', text: 'Create logos, posters, branding materials and digital illustrations.' },
  { icon: DevicePhoneMobileIcon, title: 'Mobile Development', text: 'Build Android and iOS applications using modern technologies.' },
  { icon: WrenchScrewdriverIcon, title: 'Computer Repair', text: 'Diagnose, repair and maintain computer hardware and software.' },
  { icon: ShareIcon, title: 'Networking', text: 'Learn networking fundamentals, routers, switches and servers.' },
  { icon: ShieldCheckIcon, title: 'Cybersecurity', text: 'Protect systems against cyber threats using modern security practices.' },
  { icon: TrophyIcon, title: 'Sports & Recreation', text: 'Develop teamwork, discipline and leadership through sports activities.' },
]

function CategoryCard({ icon: Icon, title, text }) {
  return (
    <article className="bg-white rounded-2xl p-5 border border-iconBg/40 shrink-0">
      <div className="flex items-start gap-3 mb-2">
        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-karki/15 shrink-0">
          <Icon className="size-5 text-karki" />
        </div>
        <h3 className="font-bold text-dark pt-2.5">{title}</h3>
      </div>
      <p className="text-sm text-muted">{text}</p>
    </article>
  )
}

export default function Activities() {
  const trackRef = useRef(null)
  const [activeDot, setActiveDot] = useState(0)

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.firstChild?.offsetWidth || 1
    const index = Math.round(track.scrollLeft / (cardWidth + 16))
    setActiveDot(index)
  }

  const scrollToIndex = (index) => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.firstChild?.offsetWidth || 0
    track.scrollTo({ left: index * (cardWidth + 16), behavior: 'smooth' })
  }

  return (
    <section id="categories" className="py-16 md:py-24 bg-body">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-karki">
            EXPLORE LUAC ACTIVITIES
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mt-3 mb-4">
            Learn. Build. Succeed.
          </h2>
          <p className="text-muted">
            Discover practical digital skills through our hands-on training programs designed to
            prepare you for today's technology-driven world.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c) => (
            <CategoryCard key={c.title} {...c} />
          ))}
        </div>

        {/* Mobile horizontal scroll-snap carousel */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c) => (
              <div key={c.title} className="snap-start w-[80%]">
                <CategoryCard {...c} />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-2">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to card ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  activeDot === i ? 'w-5 bg-primary' : 'w-2 bg-iconBg'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}