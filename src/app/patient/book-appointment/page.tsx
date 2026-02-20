'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function BookingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('doctorId');
    const hospitalId = searchParams.get('hospitalId');

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const slots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mock API call to create appointment
            // In production: await fetch('/api/appointments', { ... })
            setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Booking failed:', error);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-xl mx-auto mt-20">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
                <h2 className="text-3xl font-bold mb-4">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-8">Your appointment has been successfully booked. You will receive an SMS confirmation shortly.</p>
                <Link
                    href="/patient/dashboard"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold block"
                >
                    Go to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold mb-8">Book Your Consultation</h2>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <form onSubmit={handleBooking} className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="mb-6">
                            <label className="block font-bold mb-2">Select Date</label>
                            <input
                                type="date"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block font-bold mb-4">Select Time Slot</label>
                            <div className="grid grid-cols-3 gap-3">
                                {slots.map(slot => (
                                    <button
                                        key={slot}
                                        type="button"
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`p-3 rounded-lg border-2 transition font-semibold text-sm ${selectedSlot === slot
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                : 'border-gray-100 hover:border-blue-300 text-gray-700'
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block font-bold mb-2">Reason for Visit (Optional)</label>
                            <textarea
                                rows={4}
                                placeholder="Briefly describe your health concern..."
                                className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !selectedDate || !selectedSlot}
                            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition disabled:opacity-50"
                        >
                            {loading ? 'Confirming Appointment...' : 'Confirm Appointment'}
                        </button>
                    </form>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border-t-4 border-blue-600">
                        <h3 className="font-bold text-xl mb-4">Summary</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Doctor</span>
                                <span className="font-bold">Dr. Sarah Johnson</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Hospital</span>
                                <span className="font-bold">Apollo Hospital</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Fee</span>
                                <span className="font-bold text-green-600">₹1,500</span>
                            </div>
                            <hr />
                            <div className="py-2">
                                <p className="text-gray-500 mb-1">Appointment Timing</p>
                                <p className="font-bold text-lg">
                                    {selectedDate ? new Date(selectedDate).toDateString() : 'Date not selected'}
                                </p>
                                <p className="font-bold text-blue-600">
                                    {selectedSlot || 'Time not selected'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-50 p-4 rounded-lg text-xs text-blue-800 leading-tight">
                            ⚠️ Online payment is not required. You can pay at the hospital counter during your visit.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BookAppointmentPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <header className="bg-white shadow-sm py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="font-bold text-xl text-blue-600 underline">SwasthyaSetu</Link>
                    <Link href="/patient/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                </div>
            </header>
            <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
                <BookingContent />
            </Suspense>
        </div>
    );
}
