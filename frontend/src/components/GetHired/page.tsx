// import { Provider } from "@radix-ui/react-toast";
import { RegisterModal } from "./register-modal";

export default function GetHiredPage() {
  return (
    <div className="min-h-screen mt-10  w-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Join Our Network of
            <span className="text-blue-600"> Professional Services</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
          Partner with Service Connect and grow your business by connecting with customers who need your expertise. Join us today and make a difference
          <h3>one service at a time!</h3>
          </p>
        </div>

        {/* Why Join Section */}
        <div className="mx-auto bg-blue-600 text-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Why Join ServiceConnect?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                ✓
              </span>
              <span>Access to 100k+ Happy Customers</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                ✓
              </span>
              <span>Present in 50+ Cities</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                ✓
              </span>
              <span>Join 10k+ Service Providers</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                ✓
              </span>
              <span>4.8 Average Rating Platform</span>
            </li>
          </ul>
        </div>

        {/* How It Works Section */}
        <div className="mt-12 mx-auto bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            How It Works
          </h2>
          <ol className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                1
              </span>
              <span>Register as a service provider</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                2
              </span>
              <span>Complete your profile and verify your skills</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                3
              </span>
              <span>Receive job requests from customers</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                4
              </span>
              <span>Provide quality service and earn great reviews</span>
            </li>
          </ol>
          <div className="mt-8 text-center">
            <RegisterModal />
          </div>
        </div>
      </div>
    </div>
  );
}
