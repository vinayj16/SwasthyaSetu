'use client';

import { Phone, Ambulance, MapPin, Droplets } from 'lucide-react';

export default function EmergencyBar() {
  const emergencyActions = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Emergency Helpline",
      description: "Call 108 for immediate medical emergency",
      action: "tel:108",
      color: "red"
    },
    {
      icon: <Ambulance className="w-6 h-6" />,
      title: "Call Ambulance",
      description: "Request ambulance to your location",
      action: "tel:102",
      color: "orange"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Nearest ER",
      description: "Find closest emergency room",
      action: "#nearest-er",
      color: "blue"
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Blood Bank",
      description: "Check blood availability",
      action: "#blood-bank",
      color: "red"
    }
  ];

  const handleEmergencyAction = (action: string) => {
    if (action.startsWith('tel:')) {
      window.location.href = action;
    } else {
      // Handle navigation to different sections
      console.log('Navigate to:', action);
    }
  };

  return (
    <div className="emergency-bar animate-pulse-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            🚨 Emergency Services
          </h2>
          <p className="text-red-700">
            Quick access to life-saving medical services - Available 24/7
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyActions.map((item, index) => (
            <button
              key={index}
              onClick={() => handleEmergencyAction(item.action)}
              className={`bg-white border-2 border-${item.color}-300 rounded-lg p-4 hover:border-${item.color}-500 hover:shadow-lg transition-all duration-200 active:scale-[0.98] group`}
            >
              <div className={`text-${item.color}-600 mb-3 group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600">
                {item.description}
              </p>
              {item.action.startsWith('tel:') && (
                <div className="mt-2 text-xs font-semibold text-red-600">
                  📞 {item.action.replace('tel:', '')}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-red-700 font-medium">
            ⚠️ In case of severe emergency, call 108 immediately or go to the nearest hospital
          </p>
        </div>
      </div>
    </div>
  );
}
