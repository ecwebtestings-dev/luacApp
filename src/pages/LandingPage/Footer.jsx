import { MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-16">
      {/* CTA */}
      <div className="text-center py-16 px-4 border-b border-white/10">
        <span className="text-xs font-semibold tracking-wide text-karki">JOIN THE MOVEMENT</span>
        <h2 className="text-2xl md:text-4xl font-extrabold mt-2 mb-4">
          Be part of Uganda's future tech leaders
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-10">
          Join LUAC and grow with a community of developers, innovators, and creators shaping the
          future of technology in Uganda.
        </p>

        <div className="flex justify-center gap-10">
          <div>
            <h3 className="text-2xl font-extrabold">50+</h3>
            <p className="text-sm text-white/60">Members</p>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold">20+</h3>
            <p className="text-sm text-white/60">Projects</p>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold">2026</h3>
            <p className="text-sm text-white/60">Vision Year</p>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h2 className="text-xl font-extrabold mb-3">LUAC</h2>
          <p className="text-sm text-white/70 mb-4">
            Building a strong community of tech enthusiasts at Lira University. Learn, build,
            innovate, and lead together.
          </p>
          <div className="space-y-2 text-sm text-white/70">
            <p className="flex items-center gap-2">
              <MapPinIcon className="size-4" />
              Lira, Uganda
            </p>
            <p className="flex items-center gap-2">
              <EnvelopeIcon className="size-4" />
              luac@lirauni.ac.ug
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Activities</h3>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <a href="#" className="hover:text-white">Workshops</a>
            <a href="#" className="hover:text-white">Hackathons</a>
            <a href="#" className="hover:text-white">Bootcamps</a>
            <a href="#" className="hover:text-white">Competitions</a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">Projects</a>
            <a href="#" className="hover:text-white">Learning Materials</a>
            <a href="#" className="hover:text-white">Documentation</a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <a href="#" className="hover:text-white">About Us</a>
            <a href="#" className="hover:text-white">Executive</a>
            <a href="#" className="hover:text-white">Events</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/60">
          <p>© 2026 LUAC. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}