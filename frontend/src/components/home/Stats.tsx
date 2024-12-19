export function Stats() {
  return (
    <section className="py-12 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-blue-100">Cities Covered</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">10k+</div>
            <div className="text-blue-100">Service Providers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100k+</div>
            <div className="text-blue-100">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4.8</div>
            <div className="text-blue-100">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}