import { useEffect, useState } from "react";
import { Apiservice } from "../../services/Apiservice";

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await Apiservice.get("event/list");
      console.log("EVENT API RESPONSE 👉", res); // 🔥 MUST CHECK
      setEvents(res); // API returns array
    } catch (err) {
      console.error("Event fetch error:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Upcoming Events
      </h2>

      {/* 🔴 IMPORTANT PART */}
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-xl p-5 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold">{event.title}</h3>

              <p className="text-gray-500 text-sm mt-1">
                {event.description}
              </p>

              <p className="text-sm mt-3">
                📅 {new Date(event.date).toDateString()}
              </p>

              <p className="text-sm">⏰ {event.time}</p>

              <p className="mt-2 text-sm">
                🎟 {event.booked}/{event.capacity} booked
              </p>

              <p className="mt-2 font-semibold text-orange-600">
                ₹{event.price}
              </p>

              <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600">
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Event;
