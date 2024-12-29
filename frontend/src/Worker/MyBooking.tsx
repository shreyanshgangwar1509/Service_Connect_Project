import React, { useState } from 'react';
import { TabSelector } from './TabSelector';
import { UpcomingBookings } from './UpcomingBookings';
import { PastBookings } from './PastBooking';

export function Bookings() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Service <span className="text-blue-600">Connect</span></h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">My <span className='text-blue-600'>Bookings</span></h2>
          <p className="text-gray-600 mt-2">Manage your service bookings</p>
        </div>

        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'upcoming' ? (
          <UpcomingBookings />
        ) : (
          <PastBookings />
        )}
      </main>
    </div>
  );
}