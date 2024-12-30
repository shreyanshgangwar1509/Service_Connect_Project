import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  const handleSwitchToPartner = () => {
    const confirmSwitch = window.confirm(
      "Do you want to switch to Service Connect Partner?"
    );
    if (confirmSwitch) {
      navigate('/HomeWorker'); // Adjust the path to your Partner page
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1
              className="text-2xl font-bold text-primary cursor-pointer"
              onClick={handleSwitchToPartner}
            >
              Service<span className="text-blue-600"> Connect</span>
            </h1>
          </div>
          <NavLinks className="hidden md:flex" />
          <MobileMenu className="md:hidden" />
        </div>
      </div>
    </nav>
  );
}
