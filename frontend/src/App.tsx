import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { ServicesGrid } from './components/home/ServicesGrid';
import { Features } from './components/home/Features';
import { FeaturedProviders } from './components/home/FeaturedProviders';
import { Stats } from './components/home/Stats';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <ServicesGrid />
      <Features />
      <FeaturedProviders />
      <Footer />
    </div>
  );
}

export default App;