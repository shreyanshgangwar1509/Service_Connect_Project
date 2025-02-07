import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Community() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleMenuClick = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  return (
    <div className="space-y-6 mt-20 px-4">
      <div className="absolute top-15 left-4 z-50">
        <button
          className="p-2 border rounded-md bg-black mt-5 hover:bg-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
        {menuOpen && (
          <div className="mt-2 w-48 bg-white shadow-lg rounded-md border">
            <ul className="flex flex-col">
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/portfolio")}>Dashboard</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/HomeWorker")}>Home</li>

              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/community")}>Community</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/feedback")}>Feedback</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/allbookings")}>Bookings</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/logout")}>Logout</li>
            </ul>
          </div>
        )}
      </div>
      {/* Join Discussion Section */}
      <Card className="bg-gradient-to-br from-blue-100 to-white shadow-lg p-7">
        <CardHeader>
          <CardTitle className="text-3xl text-blue-700 font-bold">Community Forum</CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Connect with other service providers and customers
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-xl rounded-lg">
            Join Discussion
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming Events Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Upcoming Events</CardTitle>
          <CardDescription className="text-gray-600">
            Stay updated with Service Connect community events
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-hidden">
          {/* Marquee for Upcoming Events */}
          <div className="inline-block animate-marquee">
            <p className="text-lg font-medium text-blue-600">
              July 20: Service Provider Meetup • August 5: Customer Appreciation Day • August 15: Skills Workshop
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
