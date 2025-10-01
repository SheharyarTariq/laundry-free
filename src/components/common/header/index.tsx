"use client";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react'
import Divider from '../divider';
import SecondaryButton from '../secondary-button';
import { routes } from '@/lib/utils/routes';
import PrimaryButton from '../primary-button';
import { useRouter } from 'next/navigation';
import { removeTokens } from '@/app/actions';

const Header = () => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await removeTokens();
      router.push(routes.ui.signIn);
    } finally {
      setLoggingOut(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMenuClick = (route: string) => {
    router.push(route);
    closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-secondary">
      <div className="w-full px-6">
        <div className="py-4 text-white font-bold ">
         LAUNDRY-FREE
        </div>
      </div>
      <Divider/>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex w-full px-6 py-2 items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SecondaryButton route={routes.ui.dashboard}>Dashboard</SecondaryButton>
          <SecondaryButton route={routes.ui.areas}>Area</SecondaryButton>
          <SecondaryButton route={routes.ui.category}>Category</SecondaryButton>
          <SecondaryButton route={routes.ui.order}>Order</SecondaryButton>
          <SecondaryButton route={routes.ui.user}>User</SecondaryButton>
        </div>
        <div className="flex justify-end shrink-0">
          <PrimaryButton type="button" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? (
              <span className="inline-flex items-center gap-2">
                <span>Logging out...</span>
              </span>
            ) : (
              'Logout'
            )}
          </PrimaryButton>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-6 py-2 flex items-center justify-between">
        <button
          onClick={toggleMenu}
          className="text-white p-2 hover:bg-deep-ocean rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="flex justify-end shrink-0">
          <PrimaryButton type="button" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? (
              <span className="inline-flex items-center gap-2">
                <span>Logging out...</span>
              </span>
            ) : (
              'Logout'
            )}
          </PrimaryButton>
        </div>
      </div>

      {/* Mobile Side Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <button 
            className="fixed bg-black bg-opacity-50 border-0 p-0 cursor-pointer" 
            onClick={closeMenu}
            onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
            aria-label="Close menu"
          ></button>
          <div ref={menuRef} className="fixed top-0 left-0 h-full w-64 bg-secondary shadow-lg transform transition-transform">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-white font-bold" >LAUNDRY-FREE</span>
                <button
                  onClick={closeMenu}
                  className="text-white p-2 hover:bg-deep-ocean rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => handleMenuClick(routes.ui.dashboard)}
                  className="w-full text-left px-4 py-3 text-white hover:bg-deep-ocean rounded-lg transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleMenuClick(routes.ui.areas)}
                  className="w-full text-left px-4 py-3 text-white hover:bg-deep-ocean rounded-lg transition-colors"
                >
                  Area
                </button>
                <button
                  onClick={() => handleMenuClick(routes.ui.category)}
                  className="w-full text-left px-4 py-3 text-white hover:bg-deep-ocean rounded-lg transition-colors"
                >
                  Category
                </button>
                <button
                  onClick={() => handleMenuClick(routes.ui.order)}
                  className="w-full text-left px-4 py-3 text-white hover:bg-deep-ocean rounded-lg transition-colors"
                >
                  Order
                </button>
                <button
                  onClick={() => handleMenuClick(routes.ui.user)}
                  className="w-full text-left px-4 py-3 text-white hover:bg-deep-ocean rounded-lg transition-colors"
                >
                  User
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header; 