import About from "./About";
import Footer from "./Footer";
import Hero from "./Hero";
import WhyJoin from "./JoinUs";
import Nav from "./NavigationBar";
import TopBar from "./TopBar";

export default function Home() {
  return (
    <div className="bg-pagebg font-Inter">
      <TopBar/>
      <Nav/>
      <Hero/>
      <About/>
      <WhyJoin/>
      <Footer/>
    </div>
  )
}
