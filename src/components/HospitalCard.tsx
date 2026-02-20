'use client';

import { Phone, MapPin, Clock, Users, Bed, Navigation, Calendar, Star } from 'lucide-react';

interface HospitalCardProps {
  hospital: {
    id: number;
    name: string;
    type: string;
    distance: string;
    address: string;
    phone: string;
    rating: number;
    bedsAvailable: {
      total: number;
      icu: number;
      general: number;
    };
    doctorsOnDuty: number;
    waitingTime: string;
    status: 'available' | 'limited' | 'full';
    emergency: boolean;
    services: string[];
  };
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'limited':
        return 'status-limited';
      case 'full':
        return 'status-full';
      default:
        return 'status-available';
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${hospital.phone}`;
  };

  const handleDirections = () => {
    // Open Google Maps with hospital address
    window.open(`https://maps.google.com/?q=${hospital.address}`, '_blank');
  };

  const handleBookAppointment = () => {
    console.log('Book appointment for hospital:', hospital.id);
  };

  const handleViewDetails = () => {
    console.log('View details for hospital:', hospital.id);
  };

  return (
    <div className="hospital-card animate-slide-up">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-bold text-slate-800">{hospital.name}</h3>
            <span className={`text-xs px-2 py-1 rounded ${hospital.type === 'Government' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-purple-100 text-purple-800 border border-purple-300'}`}>
              {hospital.type}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{hospital.distance}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-amber-500" />
              <span>{hospital.rating}</span>
            </div>
          </div>
        </div>
        <div className={`text-sm font-semibold ${getStatusColor(hospital.status)}`}>
          {hospital.status.toUpperCase()}
        </div>
      </div>

      {/* Address */}
      <p className="text-sm text-slate-600 mb-3">{hospital.address}</p>

      {/* Services */}
      <div className="flex flex-wrap gap-1 mb-3">
        {hospital.services.slice(0, 4).map((service, index) => (
          <span
            key={index}
            className="text-xs bg-slate-100 text-slate-700 border border-slate-300 px-2 py-1 rounded"
          >
            {service}
          </span>
        ))}
        {hospital.services.length > 4 && (
          <span className="text-xs bg-slate-100 text-slate-700 border border-slate-300 px-2 py-1 rounded">
            +{hospital.services.length - 4} more
          </span>
        )}
      </div>

      {/* Availability Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="text-center p-2 bg-slate-50 border border-slate-200 rounded">
          <Bed className="w-4 h-4 text-slate-600 mx-auto mb-1" />
          <p className="text-xs text-slate-600">Total Beds</p>
          <p className="text-sm font-bold text-slate-800">{hospital.bedsAvailable.total}</p>
        </div>
        <div className="text-center p-2 bg-slate-50 border border-slate-200 rounded">
          <div className="w-4 h-4 bg-red-100 text-red-600 rounded mx-auto mb-1 flex items-center justify-center text-xs font-bold">ICU</div>
          <p className="text-xs text-slate-600">ICU Beds</p>
          <p className="text-sm font-bold text-slate-800">{hospital.bedsAvailable.icu}</p>
        </div>
        <div className="text-center p-2 bg-slate-50 border border-slate-200 rounded">
          <Users className="w-4 h-4 text-slate-600 mx-auto mb-1" />
          <p className="text-xs text-slate-600">Doctors</p>
          <p className="text-sm font-bold text-slate-800">{hospital.doctorsOnDuty}</p>
        </div>
        <div className="text-center p-2 bg-slate-50 border border-slate-200 rounded">
          <Clock className="w-4 h-4 text-slate-600 mx-auto mb-1" />
          <p className="text-xs text-slate-600">Wait Time</p>
          <p className="text-sm font-bold text-slate-800">{hospital.waitingTime}</p>
        </div>
      </div>

      {/* Emergency Badge */}
      {hospital.emergency && (
        <div className="mb-3">
          <span className="inline-flex items-center space-x-1 bg-red-100 text-red-800 border border-red-300 px-2 py-1 rounded text-xs font-semibold">
            <span>🚨</span>
            <span>24/7 Emergency Available</span>
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={handleViewDetails}
          className="btn-secondary text-sm py-2"
        >
          View Details
        </button>
        <button
          onClick={handleCall}
          className="btn-success text-sm py-2"
        >
          <Phone className="w-4 h-4 inline mr-1" />
          Call
        </button>
        <button
          onClick={handleDirections}
          className="btn-warning text-sm py-2"
        >
          <Navigation className="w-4 h-4 inline mr-1" />
          Directions
        </button>
        <button
          onClick={handleBookAppointment}
          className="btn-primary text-sm py-2"
        >
          <Calendar className="w-4 h-4 inline mr-1" />
          Book
        </button>
      </div>
    </div>
  );
}
