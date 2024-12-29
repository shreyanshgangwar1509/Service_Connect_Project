import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, DollarSign, Star, Users, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

export default function HomeWorker() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true); 
  const navigate = useNavigate(); 
  const handleMenuClick = (route) => {
    navigate(route); 
    setMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute top-4 left-4 z-50">
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
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/community")}>Community</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/feedback")}>Feedback</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/allbookings")}>Bookings</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/logout")}>Logout</li>
            </ul>
          </div>
        )}
      </div>

      <div className="container mt-10 mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome Back, <span  className="text-blue-600"> John!</span></h1>
          <p className="text-xl text-muted-foreground">Your trusted platform for service excellence</p>
          
          {/* Toggle Button for Availability */}
          <div className="mt-6">
          <Button
  onClick={() => setIsAvailable(!isAvailable)}
  className={`px-6 py-2 ${isAvailable ? 'bg-red-500' : 'bg-green-500'}`}
>
  {isAvailable ? 'Unavailable' : 'Available'}
</Button>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl text-white font-medium">Today's Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-white font-bold">₹2,850</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between  space-y-0 pb-2">
              <CardTitle className="text-xl font-medium text-white ">Jobs Completed</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl text-white font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-white font-bold">4.8</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl text-white font-medium">Hours Worked</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-white font-bold">156</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((job) => (
                  <div key={job} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Home Cleaning</h3>
                      <p className="text-sm text-muted-foreground">123 Main St, City</p>
                      <div className="flex items-center mt-2 text-sm">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        <span>Today, 2:00 PM</span>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button  onClick={() => navigate("/order-confirmation")}>Confirm</Button>
                      <Button>Cancel</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b last:border-0 pb-4">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">5.0</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Great service, very professional and punctual. Would highly recommend!"
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}