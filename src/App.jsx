import { useState } from 'react';
import axios from 'axios';
import EventCard from './components/EventCards';
import Button from './components/Button';

function App() {
  const [date, setDate] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!date) return alert("Please select a date!");
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/events/${date}`);
      setEvents(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-royal min-h-screen" >
      <div>
        <div className='flex justify-between items-center pr-[30px]   ">
'>
          {/* =================== LOGO Part ================== */}
          <div className="md:mb-0">
            <img
              src="/images/logo1.png"
              className="w-[50px] sm:w-[90px] md:w-[130px] lg:w-[160px] object-contain"
              alt="Quicktory Logo"
            />
          </div>
          {/* =================== GitHub Button Part ================== */}
          <div className="mt-2 md:mt-0">
            <Button />
          </div>
        </div>
      </div>

      {/* =================== Middle Part ================== */}
      <div className="text-center pt-[20px]">
        <h1 className="text-xl sm:text-2xl md:text-3xl italic font-bold mb-2 text-white">
          📅 "Pick a date, unlock history — <span className='text-orange-500'>instantly!</span>"
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <input
            type="date"
            className="border px-4 py-2 rounded w-full sm:w-auto cursor-pointer"
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>

        {/* 📦 Content Section */}
        <div className="pt-[100px] px-4 pb-10 max-w-4xl mx-auto space-y-6">
          {events.length > 0 ? (
            events.map((event, idx) => (
              <EventCard
                key={idx}
                year={event.year}
                description={event.description}
                links={event.wikipedia}
              />
            ))
          ) : (
            <p className="text-center italic text-gray-500">Please pick a date!</p>
          )}
        </div>
    </div>
  );
}

export default App;