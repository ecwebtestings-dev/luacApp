const whoWeAreItems = [
  'Practical workshops and hands-on learning.',
  'Software development and technology projects.',
  'Collaboration, mentorship, and teamwork.',
]

const foundationCards = [
  {
    title: 'Mission',
    text: 'Empower students with practical computing skills, innovation, and professional development.',
  },
  {
    title: 'Vision',
    text: 'To become the leading student association inspiring digital transformation.',
  },
  {
    title: 'Innovation',
    text: 'Encouraging creativity and problem-solving through technology.',
  },
]

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-karki">LET'S INTRODUCE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mt-4 leading-tight">
            Empowering Students Through
            <br />
            Technology & Innovation
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Left: dark green card — Who We Are */}
          <div className="rounded-3xl bg-primary p-10 md:p-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] text-karki mb-6">
              WHO WE ARE
            </span>

            <h3 className="text-2xl md:text-[28px] font-extrabold text-white mb-5 leading-snug">
              Lira University's Home for Future Tech Leaders
            </h3>

            <p className="text-cream/80 mb-10 leading-relaxed">
              Lira University Association of Computing and Information Science (LUAC) is a
              student-led community that brings together passionate learners to explore
              technology, innovation, and leadership. We provide opportunities for students to
              develop practical skills, collaborate on projects, and prepare for successful
              careers in the digital world.
            </p>

            <ul className="space-y-0 list-none divide-y divide-white/10 border-t border-white/10">
              {whoWeAreItems.map((text) => (
                <li key={text} className="py-4 text-cream/95 font-medium">
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: white card — Our Foundation */}
          <div className="rounded-3xl bg-white p-10 md:p-12 border border-black/5 shadow-[0_2px_30px_rgba(0,0,0,0.06)]">
            <span className="inline-block text-xs font-bold tracking-[0.2em] text-primary mb-6">
              OUR FOUNDATION
            </span>

            <h3 className="text-2xl md:text-[28px] font-extrabold text-dark mb-3 leading-snug">
              Mission, Vision & Core Values
            </h3>
            <p className="text-muted mb-10 leading-relaxed max-w-sm">
              Everything we do is driven by a commitment to excellence, innovation, and
              empowering students through computing.
            </p>

            <div className="space-y-5">
              {foundationCards.map((card) => (
                <div
                  key={card.title}
                  className="pb-5 border-b border-black/5 last:border-0 last:pb-0"
                >
                  <h4 className="font-bold text-dark mb-1.5 tracking-tight">{card.title}</h4>
                  <p className="text-sm text-muted leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}