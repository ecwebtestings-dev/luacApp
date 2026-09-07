import {
  CodeBracketIcon,
  CalendarIcon,
  BriefcaseIcon,
  FolderOpenIcon,
  AcademicCapIcon,
  TrophyIcon,
  UserGroupIcon,
  TagIcon,
} from '@heroicons/react/24/outline'

const benefits = [
  // Learn
  { icon: CodeBracketIcon, title: 'Practical Skills', text: 'Develop hands-on computing and technical skills.' },
  { icon: CalendarIcon, title: 'Workshops', text: 'Attend coding sessions, workshops, and hackathons.' },
  // Build
  { icon: BriefcaseIcon, title: 'Real Projects', text: 'Work on projects that strengthen your experience.' },
  { icon: FolderOpenIcon, title: 'Build Portfolio', text: 'Create an impressive portfolio for future opportunities.' },
  // Grow
  { icon: AcademicCapIcon, title: 'Career Mentorship', text: 'Receive guidance from experienced mentors.' },
  { icon: TrophyIcon, title: 'Leadership', text: 'Grow your leadership and teamwork abilities.' },
  // Connect
  { icon: UserGroupIcon, title: 'Community', text: 'Connect with passionate students and professionals.' },
  { icon: TagIcon, title: 'Networking', text: 'Build lasting relationships with industry professionals.' },
]

export default function WhyJoin() {
  return (
    <section id="activities" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="text-xs font-semibold tracking-widest text-karki">GET INVOLVED LUAC?</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mt-3 mb-4 leading-tight">
            Unlock Your Potential With LUAC
          </h2>
          <p className="text-muted mb-8 max-w-md">
            Join a vibrant community of innovators, developers, designers, and technology
            enthusiasts. Gain practical experience, build meaningful connections, and prepare
            yourself for a successful career in technology.
          </p>
          
          <a href="/register"
            className="inline-block px-6 py-3 rounded-[10px] bg-primary text-white font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Become a Member
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-4">
              <span className="flex items-center justify-center size-11 rounded-xl bg-karki/10 shrink-0">
                <b.icon className="size-5 text-karki" />
              </span>
              <div>
                <h3 className="font-bold text-dark mb-1">{b.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}