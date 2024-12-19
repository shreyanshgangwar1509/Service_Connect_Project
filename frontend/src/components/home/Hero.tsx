import { SearchSection } from './SearchSection';

export function Hero() {
  return (
    <section className="pt-32 w-full pb-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Trusted Service Partner in{' '}
            <span className="text-blue-600">Local Communities</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connecting skilled local service providers with customers in tier 2 and 3 cities across India.
            Quality service, trusted professionals, fair prices.
          </p>
          <SearchSection />
        </div>
      </div>
    </section>
  );
}