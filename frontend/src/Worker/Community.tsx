import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Community() {
  return (
    <div className="space-y-6 mt-20 px-4">
      {/* Join Discussion Section */}
      <Card className="bg-gradient-to-br from-blue-100 to-white shadow-lg">
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
          <div className="relative">
            <marquee behavior="scroll" direction="left" className="text-lg text-blue-600 font-medium">
              July 20: Service Provider Meetup • August 5: Customer Appreciation Day • August 15: Skills Workshop
            </marquee>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
