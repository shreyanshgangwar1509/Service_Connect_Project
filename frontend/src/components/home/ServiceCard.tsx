import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookingModal } from '../booking/BookingModal';

interface ServiceCardProps {
  icon: LucideIcon;
  name: string;
  color: string;
  description: string;
  price: string;
}

export function ServiceCard({ icon: Icon, name, color, description, price }: ServiceCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <Card className="group hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <Icon className={`h-12 w-12 ${color} mb-4`} />
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <p className="font-medium text-blue-600 mb-4">{price}</p>
          <Button 
            className="w-full"
            onClick={() => setIsBookingModalOpen(true)}
          >
            Book Now
          </Button>
        </CardContent>
      </Card>

      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceName={name}
      />
    </>
  );
}