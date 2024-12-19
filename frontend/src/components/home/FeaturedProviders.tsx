import { providers } from '@/lib/constants/providers';
import { ProviderCard } from './ProviderCard';

export function FeaturedProviders() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Top Rated Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} {...provider} />
          ))}
        </div>
      </div>
    </section>
  );
}