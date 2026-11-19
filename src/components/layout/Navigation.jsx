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
    <nav className={`flex items-center space-x-1 xl:space-x-2 ${className}`}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `px-2.5 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
              isActive
                ? 'text-burgundy font-semibold bg-sand/35 border-b-2 border-burgundy shadow-2xs'
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
