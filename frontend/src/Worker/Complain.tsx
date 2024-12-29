import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ComplainPage() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>File a Complaint</CardTitle>
        <CardDescription>Let us know about any issues you've experienced</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="service">Service Type</Label>
              <Input id="service" placeholder="Enter service type" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="provider">Service Provider</Label>
              <Input id="provider" placeholder="Enter provider name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="issue">Describe the Issue</Label>
              <Textarea id="issue" placeholder="Provide details about your complaint" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button>Submit Complaint</Button>
      </CardFooter>
    </Card>
  )
}