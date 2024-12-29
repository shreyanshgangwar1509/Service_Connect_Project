import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Mic } from "lucide-react";

export default function Portfolio() {
  const [workSamples, setWorkSamples] = useState([
    { id: 1, image: "/placeholder.svg", description: "" },
    { id: 2, image: "/placeholder.svg", description: "" },
    { id: 3, image: "/placeholder.svg", description: "" },
  ]);

  const addWorkSample = () => {
    setWorkSamples([
      ...workSamples,
      { id: Date.now(), image: "/placeholder.svg", description: "" },
    ]);
  };

  const updateDescription = (id, newDescription) => {
    setWorkSamples((samples) =>
      samples.map((sample) =>
        sample.id === id ? { ...sample, description: newDescription } : sample
      )
    );
  };

  const startVoiceInput = (id) => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      updateDescription(id, transcript);
    };
    recognition.start();
  };

  return (
    <div className="container mt-10 mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            My <span className="text-blue-600">Profile</span>
          </h1>
          <p className="text-muted-foreground">
            Showcase your work and expertise to potential customers
          </p>
        </div>

        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative w-30 h-30">
                <img
                  src="/placeholder.svg"
                  alt="Profile"
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">John Smith</h2>
                <p className="text-muted-foreground mb-4">
                  Professional Cleaner with 5+ years of experience
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <Badge className="bg-blue-600">Home Cleaning</Badge>
                  <Badge className="bg-blue-600">Deep Cleaning</Badge>
                  <Badge className="bg-blue-600">Office Cleaning</Badge>
                  <Badge className="bg-blue-600">Sanitization</Badge>
                </div>
                <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                  Edit Profile
                </Button>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-2xl font-bold">4.8</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  245 Reviews
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xl font-medium text-white">
                Total Jobs
              </CardTitle>
              <Award className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-white font-bold">234</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xl text-white font-medium">
                Revenue
              </CardTitle>
              <Award className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-white font-bold"> Rs 12,341</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xl text-white font-medium">
                Response Rate
              </CardTitle>
              <Star className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-white font-bold">95%</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Work Samples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {workSamples.map((sample) => (
                <div
                  key={sample.id}
                  className="relative aspect-square rounded-lg border overflow-hidden group transform transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <img
                    src={sample.image}
                    alt={`Work sample ${sample.id}`}
                    className="object-cover w-full h-full"
                  />
                  <textarea
                    value={sample.description}
                    onChange={(e) =>
                      updateDescription(sample.id, e.target.value)
                    }
                    placeholder="Describe the problem fixed"
                    className="absolute bottom-0 left-0 w-full p-2 bg-white/90 border-t outline-none resize-none"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => startVoiceInput(sample.id)}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={addWorkSample} className="mt-4 bg-black">
              Add More
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
