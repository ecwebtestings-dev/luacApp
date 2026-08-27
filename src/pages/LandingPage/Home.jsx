
import About from "./About";
import Activities from "./Activities";
import Footer from "./Footer";
import Hero from "./Hero";
import WhyJoin from "./JoinUs";
import TopBar from "./TopBar";

export default function Home() {
  return (
    <>
      <TopBar/>
      <Hero/>
      <About/>
      <Activities/>
      <WhyJoin/>
      <Footer/>
    </>
  )
}
