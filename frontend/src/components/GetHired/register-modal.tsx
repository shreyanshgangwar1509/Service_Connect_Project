// "use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import  Provider from  "../../Pages/Provider";


export function RegisterModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
          Register Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[800px]">
        <DialogTitle className="text-lg font-semibold mb-4">Register as a Service Provider</DialogTitle>
        <Provider />
      </DialogContent>
    </Dialog>
  )
}

