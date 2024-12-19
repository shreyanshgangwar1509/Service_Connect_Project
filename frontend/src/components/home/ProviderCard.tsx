import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProviderCardProps {
  id: number;
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
}

export function ProviderCard({ name, profession, rating, reviews, image, location }: ProviderCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-gray-600">{profession}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="ml-1 font-medium">{rating}</span>
            <span className="ml-1 text-gray-600">({reviews} reviews)</span>
          </div>
          <span className="text-gray-600">{location}</span>
        </div>
      </CardContent>
    </Card>
  );
}