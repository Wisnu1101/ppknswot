import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Introduction from './components/Introduction'
import Swot from './components/Swot'
import TextLoop from './components/TextLoop'
import Conclusion from './components/Conclusion'
import Quiz from './components/Quiz'
import AboutUs from './components/AboutUs'
import Comments from './components/Comments'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />
        <Introduction />
        <Swot />
        
        {/* TextLoop separator between SWOT and Kesimpulan */}
        <div className="relative z-10 bg-gradient-to-b from-[#fbf9ed] to-[#a7f3d0] py-6 overflow-hidden">
          <TextLoop
            text="Indonesia Emas 2045"
            shape="wave"
            speed={55}
            separator="✦"
            curviness={28}
            fontSize={46}
            fontWeight={900}
            color="#0f172a"
            ribbonColor="#FAF8EC"
            ribbonWidth={48}
            className="text-loop--banner"
          />
        </div>

        <Conclusion />
        <Quiz />
        <AboutUs />
        <Comments />
      </main>

      <Footer />
    </div>
  )
}
