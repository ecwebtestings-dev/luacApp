
import About from "./About";
import Activities from "./Activities";
import Footer from "./Footer";
import Hero from "./Hero";
import WhyJoin from "./JoinUs";
import Nav from "./NavBar";
import TopBar from "./TopBar";

export default function Home() {
  return (
    <div className="bg-pagebg font-Inter">
      <TopBar/>
      <Nav/>
      <Hero/>
      <About/>
      <Activities/>
      <WhyJoin/>
      <Footer/>
    </div>
  )
}
