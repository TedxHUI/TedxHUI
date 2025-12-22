import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Beaker } from 'lucide-react';
import { Button } from '../components/ui/button';
import Logo from "../assets/DP Image.png";


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/speakers', label: 'Speakers' },
    { path: '/agenda', label: 'Agenda' },
    { path: '/createdp', label: 'Create DP' },
    { path: '/merchandise', label: 'Merchandise' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-[#fff] border-b border-border sticky top-0 z-50 px-[3rem]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <img className='w-30 h-12' src={Logo} alt="Logo" />
            <span className="text-xl font-bold text-primary"></span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-0 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-accent bg-accent-light'
                      : 'text-foreground hover:text-accent hover:bg-accent-light/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="nav_btn-container hidden lg:flex items-center space-x-8">
            <Button variant="default" className="shadow-glow hover:gradient-primary rounded-full bg-[#EA1D2C]">
              Register Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-base font-medium transition-all ${
                      isActive
                        ? 'text-accent bg-accent-light'
                        : 'text-foreground hover:text-accent hover:bg-accent-light/50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button className="mt-4 bg-gradient-primary">
                Get Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;