import React from 'react';
import { NavLink } from 'react-router-dom';

export const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export const Navigation = ({ className = '' }) => {
  return (
    <nav className={`hidden md:flex items-center space-x-1 lg:space-x-2 ${className}`}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-all ${
              isActive
                ? 'text-burgundy font-semibold bg-sand/30 border-b-2 border-burgundy'
                : 'text-brand-dark hover:text-burgundy hover:bg-sand/20'
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
