import { Shield, Clock, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All service providers undergo thorough background checks and skill verification.'
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: 'Get connected with service providers within minutes, not hours.'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Our providers maintain high service standards with regular quality checks.'
  },
  {
    icon: Users,
    title: 'Local Expertise',
    description: 'Service providers from your community who understand local needs better.'
  }
];

export function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}