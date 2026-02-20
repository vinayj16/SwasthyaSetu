'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  Video,
  MessageSquare,
  MapPin,
  Phone,
  CreditCard,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  DollarSign,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function BookAppointment() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.doctorId;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    symptoms: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Mock doctor data
  const doctor = {
    id: doctorId,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    hospital: 'Apollo Hospital, Delhi',
    consultationFee: 1500,
    image: '/api/placeholder/100/100'
  };

  // Mock available slots
  const availableDates = [
    { date: '2026-01-30', day: 'Today', slots: ['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'] },
    { date: '2026-01-31', day: 'Tomorrow', slots: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
    { date: '2026-02-01', day: 'Feb 1', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'] },
    { date: '2026-02-02', day: 'Feb 2', slots: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] }
  ];

  const consultationTypes = [
    { type: 'video', label: 'Video Consultation', duration: '15-30 mins', price: 1500 },
    { type: 'in-person', label: 'In-Person Visit', duration: '30-45 mins', price: 2000 },
    { type: 'chat', label: 'Chat Consultation', duration: '10-15 mins', price: 800 }
  ];

  const paymentMethods = [
    { method: 'online', label: 'Online Payment', icon: CreditCard },
    { method: 'cod', label: 'Pay at Hospital', icon: MapPin },
    { method: 'insurance', label: 'Insurance', icon: ShieldCheck }
  ];

  useEffect(() => {
    // Load patient info from localStorage or state
    const savedPatientInfo = localStorage.getItem('patientInfo');
    if (savedPatientInfo) {
      setPatientInfo(JSON.parse(savedPatientInfo));
    }
  }, []);

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return selectedDate && selectedTime && consultationType;
      case 2:
        return patientInfo.name && patientInfo.email && patientInfo.phone && patientInfo.symptoms;
      case 3:
        return paymentMethod;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save patient info
    localStorage.setItem('patientInfo', JSON.stringify(patientInfo));
    
    setIsProcessing(false);
    setBookingConfirmed(true);
  };

  const getConsultationPrice = () => {
    const type = consultationTypes.find(t => t.type === consultationType);
    return type ? type.price : 1500;
  };

  const renderStepIndicator = () => {
    const steps = ['Select Slot', 'Patient Info', 'Payment', 'Confirm'];
    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep > index + 1
                ? 'bg-green-500 text-white'
                : currentStep === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-slate-300 text-slate-600'
            }`}>
              {currentStep > index + 1 ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-2 ${
                currentStep > index + 1 ? 'bg-green-500' : 'bg-slate-300'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border-2 border-slate-300 rounded-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-6">
            Your appointment with {doctor.name} has been successfully booked.
          </p>
          
          <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center space-x-3 mb-3">
              <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-lg" />
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-sm text-slate-600">{doctor.specialization}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Date:</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Type:</span>
                <span className="font-medium capitalize">{consultationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Fee:</span>
                <span className="font-medium">₹{getConsultationPrice()}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Link href="/dashboard" className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Go to Dashboard
            </Link>
            <button
              onClick={() => window.print()}
              className="w-full bg-slate-100 text-slate-700 py-3 px-6 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-slate-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Booking ID: #BK{Date.now()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Doctor Info Card */}
          <div className="bg-white border-2 border-slate-300 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-lg" />
              <div>
                <h2 className="text-xl font-bold text-slate-800">{doctor.name}</h2>
                <p className="text-slate-600">{doctor.specialization}</p>
                <p className="text-sm text-slate-500">{doctor.hospital}</p>
              </div>
            </div>
          </div>

          {/* Step 1: Select Date & Time */}
          {currentStep === 1 && (
            <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Select Consultation Slot</h3>
              
              {/* Consultation Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">Consultation Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {consultationTypes.map((type) => (
                    <button
                      key={type.type}
                      onClick={() => setConsultationType(type.type)}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        consultationType === type.type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-center">
                        {type.type === 'video' && <Video className="w-6 h-6 mx-auto mb-2 text-blue-600" />}
                        {type.type === 'in-person' && <User className="w-6 h-6 mx-auto mb-2 text-blue-600" />}
                        {type.type === 'chat' && <MessageSquare className="w-6 h-6 mx-auto mb-2 text-blue-600" />}
                        <p className="font-medium capitalize">{type.label}</p>
                        <p className="text-sm text-slate-600">{type.duration}</p>
                        <p className="text-lg font-bold text-blue-600">₹{type.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">Select Date</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availableDates.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedTime('');
                      }}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        selectedDate === day.date
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <p className="font-medium">{day.day}</p>
                      <p className="text-sm text-slate-600">{day.date}</p>
                      <p className="text-xs text-blue-600 mt-1">{day.slots.length} slots</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Select Time</label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {availableDates
                      .find(day => day.date === selectedDate)
                      ?.slots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 border-2 rounded-lg transition-colors ${
                            selectedTime === time
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-1">
                            <Clock className="w-4 h-4 text-slate-600" />
                            <span>{time}</span>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Patient Information */}
          {currentStep === 2 && (
            <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Patient Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={patientInfo.name}
                    onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={patientInfo.email}
                    onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={patientInfo.phone}
                    onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={patientInfo.age}
                    onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="35"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                  <select
                    value={patientInfo.gender}
                    onChange={(e) => setPatientInfo({...patientInfo, gender: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Describe your symptoms *</label>
                <textarea
                  value={patientInfo.symptoms}
                  onChange={(e) => setPatientInfo({...patientInfo, symptoms: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows={4}
                  placeholder="Please describe your symptoms and the reason for consultation..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Payment Method</h3>
              
              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.method}
                    onClick={() => setPaymentMethod(method.method)}
                    className={`w-full p-4 border-2 rounded-lg transition-colors ${
                      paymentMethod === method.method
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <method.icon className="w-5 h-5 text-slate-600" />
                        <span className="font-medium">{method.label}</span>
                      </div>
                      {paymentMethod === method.method && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Consultation Fee</span>
                    <span className="font-medium">₹{getConsultationPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Platform Fee</span>
                    <span className="font-medium">₹50</span>
                  </div>
                  <div className="border-t border-slate-300 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-lg text-blue-600">₹{getConsultationPrice() + 50}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Confirm Booking</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">Appointment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Doctor:</span>
                      <span className="font-medium">{doctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Date:</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Type:</span>
                      <span className="font-medium capitalize">{consultationType}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">Patient Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Name:</span>
                      <span className="font-medium">{patientInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email:</span>
                      <span className="font-medium">{patientInfo.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phone:</span>
                      <span className="font-medium">{patientInfo.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">Payment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Method:</span>
                      <span className="font-medium capitalize">{paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Amount:</span>
                      <span className="font-bold text-lg text-blue-600">₹{getConsultationPrice() + 50}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-semibold mb-1">Important Information</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Please arrive 10 minutes before your appointment</li>
                      <li>Bring your ID and any previous medical reports</li>
                      <li>Cancellation policy: 24 hours notice required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="bg-slate-100 text-slate-700 py-3 px-6 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!validateStep()}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleBooking}
                disabled={isProcessing}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
