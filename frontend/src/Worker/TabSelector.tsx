interface TabSelectorProps {
    activeTab: 'upcoming' | 'past';
    onTabChange: (tab: 'upcoming' | 'past') => void;
  }
  
  export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
    return (
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => onTabChange('upcoming')}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Today's Bookings
        </button>
        <button
          onClick={() => onTabChange('past')}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === 'past'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Past Bookings
        </button>
      </div>
    );
  }