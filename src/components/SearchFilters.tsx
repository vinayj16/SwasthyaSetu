'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, Clock, Building } from 'lucide-react';

export default function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('5km');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const distances = ['1km', '5km', '10km', '25km'];
  const services = [
    { value: 'all', label: 'All Services' },
    { value: 'icu', label: 'ICU' },
    { value: 'opd', label: 'OPD' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'maternity', label: 'Maternity' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'cardiology', label: 'Cardiology' }
  ];
  const availabilities = [
    { value: 'all', label: 'All Availability' },
    { value: 'beds', label: 'Beds Available' },
    { value: 'doctors', label: 'Doctors Available' },
    { value: 'emergency', label: 'Emergency Only' }
  ];
  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'government', label: 'Government' },
    { value: 'private', label: 'Private' },
    { value: 'trust', label: 'Trust Hospital' }
  ];

  const handleSearch = () => {
    console.log('Searching with filters:', {
      searchQuery,
      selectedDistance,
      selectedService,
      selectedAvailability,
      selectedType
    });
  };

  return (
    <div className="search-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Find Hospitals & Services
          </h2>
          <p className="text-slate-600">
            Search for hospitals, doctors, or specific medical services near you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospital, doctor, service..."
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Distance Filter */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-slate-600" />
            <select
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(e.target.value)}
              className="flex-1 border-2 border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {distances.map((distance) => (
                <option key={distance} value={distance}>
                  {distance}
                </option>
              ))}
            </select>
          </div>

          {/* Service Filter */}
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-slate-600" />
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="flex-1 border-2 border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-600" />
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="flex-1 border-2 border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {availabilities.map((availability) => (
                <option key={availability.value} value={availability.value}>
                  {availability.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-600" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex-1 border-2 border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-slate-600">Quick filters:</span>
          {['24/7 Emergency', 'ICU Available', 'COVID-19', 'Blood Bank', 'X-Ray', 'Lab Tests'].map((filter) => (
            <button
              key={filter}
              className="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm hover:bg-blue-50 hover:border-blue-400 transition-colors duration-200"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
