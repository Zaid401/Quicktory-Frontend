import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './components/EventCards';
import { motion } from 'framer-motion';

function App() {
  const [date, setDate] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const [monthDay, setMonthDay] = useState({ month: null, day: null });

  const handleSearch = async () => {
    if (!date) return alert('Please select a date!');

    
    const [yearPart, monthPart, dayPart] = date.split('-');
    setMonthDay({
      month: parseInt(monthPart, 10),
      day: parseInt(dayPart, 10),
    });

    
    try {
      setLoading(true);
      const res = await axios.get(
        `https://quicktory-backend.onrender.com/api/events/${date}`
      );
      setEvents(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if (!monthDay.month || !monthDay.day) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `https://byabbe.se/on-this-day/${monthDay.month}/${monthDay.day}/events.json`
        );
        const data = await res.json();

        
        const eventsWithImages = await Promise.all(
          data.events.map(async (ev) => {
            let img = null;
            if (ev.wikipedia?.length) {
              const title = encodeURIComponent(ev.wikipedia[0].title);
              try {
                const wikiRes = await fetch(
                  `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
                );
                const wikiData = await wikiRes.json();
                img = wikiData.thumbnail?.source || null;
              } catch (e) {
                console.error('Wiki image fetch failed:', e);
              }
            }
            return { ...ev, image: img };
          })
        );

        setEvents(eventsWithImages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, [monthDay]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fdfaf6] to-[#f0ebe5] dark:from-[#0f172a] dark:to-[#1e293b]">
      {/* =================== Header ================== */}
      <header className="flex justify-between items-center px-6 py-2">
        <img
          src="/images/logo1.png"
          alt="Quicktory Logo"
          className="w-16 sm:w-24 md:w-32 object-contain"
        />
        <div>
          <button  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
            <a href="https://github.com/Zaid401/Quicktory-Frontend">Github</a>
          </button>
        </div>
      </header>

      {/* =================== Hero Section ================== */}
      <section className="text-center px-6 pt-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100"
        >
          📅 Pick a date, unlock history —{' '}
          <span className="text-amber-600">instantly!</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6"
        >
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-2xl shadow-md w-full sm:w-auto"
          >
            {loading ? 'Loading...' : 'Discover Events'}
          </button>
        </motion.div>
      </section>

      {/* =================== Events Grid ================== */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((ev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <EventCard
                  year={ev.year}
                  title={ev.wikipedia[0]?.title}
                  description={ev.description}
                  links={ev.wikipedia}
                  image={ev.image} 
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center italic text-gray-500 dark:text-gray-400 mt-12">
            Please pick a date!
          </p>
        )}
      </section>

      {/* =================== Footer ================== */}
      <footer className="py-6 text-center text-gray-600 dark:text-gray-400">
        © 2025 Quicktory. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

