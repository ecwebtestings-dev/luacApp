import image from "../../assets/images";

export default function Hero() {
  return (
    <section className="pt-[160px] pb-16 md:pt-[200px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide text-primary bg-hoverBg rounded-full px-4 py-1.5 mb-5">
            LIRA UNIVERSITY • COMPUTING • INNOVATION
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight mb-5">
            Empowering the Next Generation of{' '}
            <span className="text-primary">Computing Professionals</span>
          </h1>

          <p className="text-muted mb-8 max-w-lg">
            The Lira University Association of Computing and Information Science
            (LUAC) is a vibrant student community dedicated to nurturing
            innovation, collaboration, and technical excellence.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/"
              className="px-6 py-3 rounded-[10px] bg-primary text-white font-semibold hover:-translate-y-0.5 transition-transform"
            >
              Join LUAC
            </a>
            <a
              href="/"
              className="px-6 py-3 rounded-[10px] border border-iconBg text-dark font-semibold hover:bg-hoverBg transition-colors"
            >
              Explore Activities
            </a>
          </div>
        </div>

        <div>
          <img src={image.MockUps} alt="LUAC Computing Platform" className="w-full h-auto" />
        </div>
      </div>
    </section>
  )
}