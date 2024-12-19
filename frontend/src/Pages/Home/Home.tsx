import { FeaturedProviders } from "@/components/home/FeaturedProviders"
import { Features } from "@/components/home/Features"
import { Hero } from "@/components/home/Hero"
import { ServicesGrid } from "@/components/home/ServicesGrid"
import { Stats } from "@/components/home/Stats"

function Home() {
  return (
    <div>
     
          <Hero />
          <Stats />
          <ServicesGrid />
          <Features />
      <FeaturedProviders />
      
    </div>
  )
}

export default Home