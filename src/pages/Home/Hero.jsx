import image from "../../assets/images";
import SocialProof from "./Avatar";

export default function Hero() {
  return (
    <section className="pt-[200px] pb-16 md:pt-[90px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-2 md:gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-dark leading-1.625 mb-2 font-fjalla">
             Next Generation of{' '}
            <span className="text-primary">Computing Professionals</span>
          </h1>

          <p className="text-muted mb-8 mt-4 max-w-lg">
            The Lira University Association of Computing and Information Science
            (LUAC) is a vibrant student community dedicated to nurturing
            innovation, collaboration, and technical excellence.
          </p>

         
         <div className="mt-4">
            <SocialProof/>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="/"
              className="px-8 rounded-md py-3  bg-primary text-white font-semibold hover:-translate-y-0.5 transition-transform"
            >
              Register
            </a>
           
          </div>

          
          
        </div>

        <div>
          <img src={image.Framework} alt="LUAC Computing Platform" className="w-full h-auto" />
        </div>
      </div>
    </section>
  )
}