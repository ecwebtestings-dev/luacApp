import {
  UserGroupIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  UsersIcon,
  LightBulbIcon,
  FlagIcon,
  EyeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

const whoWeAreItems = [
  { icon: AcademicCapIcon, text: 'Practical workshops and hands-on learning.' },
  { icon: CodeBracketIcon, text: 'Software development and technology projects.' },
  { icon: UsersIcon, text: 'Collaboration, mentorship, and teamwork.' },
]

const foundationCards = [
  {
    icon: FlagIcon,
    title: 'Mission',
    text: 'Empower students with practical computing skills, innovation, and professional development.',
  },
  {
    icon: EyeIcon,
    title: 'Vision',
    text: 'To become the leading student association inspiring digital transformation.',
  },
  {
    icon: MapPinIcon,
    title: 'Innovation',
    text: 'Encouraging creativity and problem-solving through technology.',
  },
]

export default function About() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-karki">LETS INTRODUCE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mt-3 leading-tight">
            Empowering Students Through
            <br />
            Technology & Innovation
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Left: dark green card — Who We Are */}
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />

            <div className="relative inline-flex items-center gap-2 bg-karki/90 text-dark text-xs font-bold tracking-wide rounded-full px-4 py-1.5 mb-6">
              <UserGroupIcon className="size-4" />
              WHO WE ARE
            </div>

            <h3 className="relative text-2xl font-extrabold text-white mb-4">
              Lira University's Home for Future Tech Leaders
            </h3>

            <p className="relative text-cream/90 mb-8">
              Lira University Association of Computing and Information Science (LUAC) is a
              student-led community that brings together passionate learners to explore
              technology, innovation, and leadership. We provide opportunities for students to
              develop practical skills, collaborate on projects, and prepare for successful
              careers in the digital world.
            </p>

            <ul className="relative space-y-4 list-none">
              {whoWeAreItems.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-cream font-medium">
                  <span className="flex items-center justify-center size-8 rounded-full bg-white/10 shrink-0">
                    <item.icon className="size-4 text-white" />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: white card — Our Foundation */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-cream" />

            <div className="relative inline-flex items-center gap-2 bg-cream text-primary text-xs font-bold tracking-wide rounded-full px-4 py-1.5 mb-6">
              <LightBulbIcon className="size-4" />
              OUR FOUNDATION
            </div>

            <h3 className="relative text-2xl font-extrabold text-dark mb-3">
              Mission, Vision & Core Values
            </h3>
            <p className="relative text-muted mb-8 max-w-sm">
              Everything we do is driven by a commitment to excellence, innovation, and
              empowering students through computing.
            </p>

            <div className="relative grid grid-cols-2 gap-4">
              {foundationCards.map((card) => (
                <div key={card.title} className="bg-cream/60 rounded-2xl p-4">
                  <span className="flex items-center justify-center size-9 rounded-full bg-white shadow-sm mb-3">
                    <card.icon className="size-4 text-primary" />
                  </span>
                  <h4 className="font-bold text-dark mb-1">{card.title}</h4>
                  <p className="text-sm text-muted">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}