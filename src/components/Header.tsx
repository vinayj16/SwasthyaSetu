'use client';

import { useState } from 'react';
import { Phone, MapPin, Globe, User, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Delhi, India');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const locations = ['Delhi, India', 'Mumbai, India', 'Bangalore, India', 'Chennai, India', 'Kolkata, India'];
  const languages = ['English', 'हिन्दी', 'ગુજરાતી', 'தமிழ்', 'తెలుగు'];

  return (
    <header className="bg-white border-b-2 border-slate-300 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🏥</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">SwasthyaSetu</h1>
              <p className="text-xs text-slate-600">National Health Grid</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Location Selector */}
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-slate-600" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="text-sm border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Switch */}
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-slate-600" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-sm border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency Helpline */}
            <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded px-3 py-2">
              <Phone className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-xs text-red-600 font-semibold">Emergency</p>
                <p className="text-sm font-bold text-red-700">108</p>
              </div>
            </div>

            {/* Login/Register */}
            <button className="flex items-center space-x-2 btn-primary">
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 border border-slate-300 rounded"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-300 py-4">
            <div className="space-y-4">
              {/* Location Selector Mobile */}
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-slate-600" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="text-sm border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Switch Mobile */}
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-slate-600" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="text-sm border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Emergency Helpline Mobile */}
              <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded px-3 py-2">
                <Phone className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-xs text-red-600 font-semibold">Emergency</p>
                  <p className="text-sm font-bold text-red-700">108</p>
                </div>
              </div>

              {/* Login/Register Mobile */}
              <button className="w-full flex items-center justify-center space-x-2 btn-primary">
                <User className="w-4 h-4" />
                <span>Login / Register</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
