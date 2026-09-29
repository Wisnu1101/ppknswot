import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Introduction from './components/Introduction'
import Swot from './components/Swot'
import Conclusion from './components/Conclusion'
import Quiz from './components/Quiz'
import AboutUs from './components/AboutUs'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />
        <Introduction />
        <Swot />
        <Conclusion />
        <Quiz />
        <AboutUs />
      </main>

      <Footer />
    </div>
  )
}
