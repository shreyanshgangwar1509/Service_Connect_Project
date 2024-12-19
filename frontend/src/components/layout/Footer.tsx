// // import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
// import { CiFacebook, CiTwitter } from "react-icons/ci";
// import { FaInstagram, FaLinkedin } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import { useEffect } from "react";
// import "./Footer.css"

// export function Footer() {
//   useEffect(() => {
//     // Add Google Translate script if it doesn't already exist
//     if (
//       !document.querySelector(
//         'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
//       )
//     ) {
//       const googleTranslateScript = document.createElement("script");
//       googleTranslateScript.src =
//         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       googleTranslateScript.type = "text/javascript";
//       googleTranslateScript.async = true;
//       document.body.appendChild(googleTranslateScript);

//       window.googleTranslateElementInit = () => {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: "en",
//             includedLanguages:
//               "hi,en,kn,mr,ur,te,ta,sa,pa,kok,gu,ml,bn,kn", // Supported languages
//           },
//           "google_translate_element"
//         );
//       };
//     }

//     // Function to remove "Powered by Google" text
//     const removePoweredByText = () => {
//       const intervalId = setInterval(() => {
//         const googleGadget = document.querySelector(".goog-te-gadget");
//         if (googleGadget) {
//           googleGadget.childNodes.forEach((node) => {
//             if (
//               node.nodeType === Node.TEXT_NODE &&
//               node.nodeValue.includes("Powered by")
//             ) {
//               node.remove();
//             }
//           });
//           if (!googleGadget.innerText.includes("Powered by")) {
//             clearInterval(intervalId);
//           }
//         }
//       }, 100);
//       return intervalId;
//     };

//     const intervalId = removePoweredByText();

//     // Cleanup function to clear interval
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <footer className="bg-gray-900 text-gray-300">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">ServiceConnect</h3>
//             <p className="text-gray-400">
//               Empowering local service providers and making quality services
//               accessible in tier 2 and 3 cities.
//             </p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Bookings
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Services
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Become a Provider
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Inventory
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Help Center
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Safety
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Terms of Service
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Privacy Policy
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold text-white mb-4">
//               Connect With Us
//             </h4>
//             <div id="google_translate_element"></div>
//             <div className="flex space-x-4 mt-4">
//               <Button variant="ghost" size="icon" className="hover:text-white">
//                 <CiFacebook className="h-5 w-5" />
//               </Button>
//               <Button variant="ghost" size="icon" className="hover:text-white">
//                 <CiTwitter className="h-5 w-5" />
//               </Button>
//               <Button variant="ghost" size="icon" className="hover:text-white">
//                 <FaInstagram className="h-5 w-5" />
//               </Button>
//               <Button variant="ghost" size="icon" className="hover:text-white">
//                 <FaLinkedin className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//           <p>&copy; {new Date().getFullYear()} ServiceConnect. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { CiFacebook, CiTwitter } from "react-icons/ci";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import "./Footer.css";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export function Footer() {
  useEffect(() => {
    // Add Google Translate script if it doesn't already exist
    if (
      !document.querySelector(
        'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
      )
    ) {
      const googleTranslateScript = document.createElement("script");
      googleTranslateScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      googleTranslateScript.type = "text/javascript";
      googleTranslateScript.async = true;
      document.body.appendChild(googleTranslateScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi,en,kn,mr,ur,te,ta,sa,pa,kok,gu,ml,bn", // Supported languages
          },
          "google_translate_element"
        );
      };
    }

    // Hide Google Translate unwanted elements
    const hideGoogleTranslateElements = () => {
      const intervalId = setInterval(() => {
        const iframe = document.querySelector('iframe[class*="skiptranslate"]') as HTMLIFrameElement | null;
        if (iframe) {
          iframe.style.visibility = "hidden";
        }

        const skipTranslateDiv = document.querySelector(".skiptranslate");
        if (skipTranslateDiv) {
          const tables = skipTranslateDiv.querySelectorAll("table");
          tables.forEach((table) => {
            (table as HTMLElement).style.display = "none";
          });
        }
      }, 100);

      return intervalId;
    };

    // Function to clean up "Powered by Google" text and unwanted table
    const cleanUpGoogleElements = () => {
      const intervalId = setInterval(() => {
        const googleTable = document.querySelector(
          'table[class="VIpgJd-ZVi9od-ORHb-KE6vqe"]'
        ) as HTMLElement | null;
        if (googleTable) {
          googleTable.style.display = "none";
        }

        const googleGadget = document.querySelector(".goog-te-gadget");
        if (googleGadget) {
          googleGadget.childNodes.forEach((node) => {
            if (
              node.nodeType === Node.TEXT_NODE &&
              node.nodeValue?.includes("Powered by")
            ) {
              node.remove();
            }
          });
        }
      }, 100);

      return intervalId;
    };

    const interval1 = hideGoogleTranslateElements();
    const interval2 = cleanUpGoogleElements();

    // Cleanup function to clear intervals
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1: About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">ServiceConnect</h3>
            <p className="text-gray-400">
              Empowering local service providers and making quality services
              accessible in tier 2 and 3 cities.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Bookings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Become a Provider
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Inventory
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Social Media & Google Translate */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h4>
            <div id="google_translate_element"></div>
            <div className="flex space-x-4 mt-4">
              <Button variant="ghost" size="icon" className="hover:text-white">
                <CiFacebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-white">
                <CiTwitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-white">
                <FaInstagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-white">
                <FaLinkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} ServiceConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}