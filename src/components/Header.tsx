import React, { useState, useEffect } from 'react';
import { Menu, X, Wrench } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Branches', href: '#branches' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Wrench className={`h-8 w-8 ${scrolled ? 'text-blue-800' : 'text-white'} transition-colors`} />
            <span className={`text-xl font-bold ${scrolled ? 'text-blue-800' : 'text-white'} transition-colors`}>
              Abhishek & Company
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`font-medium transition-colors hover:text-orange-500 ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 py-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;