import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CustomerContactProps {
  phoneNumber: string;
  address: string;
}

export function CustomerContact({ phoneNumber, address }: CustomerContactProps) {
  const navigate = useNavigate();

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleChat = () => {
    navigate('/chat'); // Navigate to the Chat page
  };

  const handleLocate = () => {
    // Open in default maps app
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="flex gap-4 flex-wrap">
      <button
        onClick={handleCall}
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        <Phone size={20} />
        Call Customer
      </button>
      <button
        onClick={handleChat}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        <MessageCircle size={20} />
        Chat
      </button>
      <button
        onClick={handleLocate}
        className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
      >
        <MapPin size={20} />
        Locate
      </button>
    </div>
  );
}
