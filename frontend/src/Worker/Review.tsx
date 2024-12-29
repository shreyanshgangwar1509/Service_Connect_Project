import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Review() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Card className="max-w-lg w-full shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">Leave a Review</CardTitle>
          <CardDescription className="text-gray-600">Share your experience with the Customer</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="provider" className="text-gray-700 font-semibold">Service Type</Label>
                <Input id="provider" placeholder="Enter provider name" className="border-gray-300" />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="rating" className="text-gray-700 font-semibold">Rating</Label>
                <Input
                  id="rating"
                  placeholder="Enter rating (1-5)"
                  type="number"
                  min="1"
                  max="5"
                  className="border-gray-300"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="comment" className="text-gray-700 font-semibold">Problem</Label>
                <Textarea
                  id="comment"
                  placeholder="Write your review"
                  className="border-gray-300 resize-none"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Submit Feedback
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
