import { useState } from "react";
import {  useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  Users,
  DollarSign,
  X
} from "lucide-react";
import { Apiservice } from "../../services/Apiservice";

const AdminEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    capacity: 100,
    price: 0
  });
const [events, setEvents] = useState([]);
// event feth in eventpage

 const fetchEvents = async () => {
    try {
      const res = await Apiservice.get("/event/list");
      setEvents(res);
    } catch (err) {
      console.error("Fetch events error:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /* ---------------- FORM VALIDATION ---------------- */
  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required";
    }

    if (!formData.time) {
      newErrors.time = "Event time is required";
    }

    if (!formData.capacity) {
      newErrors.capacity = "Capacity is required";
    } else if (formData.capacity <= 0) {
      newErrors.capacity = "Capacity must be greater than 0";
    }

    if (!formData.price && formData.price !== 0) {
      newErrors.price = "Price is required";
    } else if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- MODAL HANDLERS ---------------- */
  const openAddModal = () => {
    setEditingEvent(null);
    setErrors({});
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      capacity: 100,
      price: 0
    });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setErrors({});
    setFormData(event);
    setShowModal(true);
  };

  const handleSave = async() => {
    if (!validateForm()) return;

    console.log("Submitting Event Data:", formData);

    if (editingEvent) {
      // Update existing event locally
      // Logic removed for static demo
    
      try{
              await Apiservice.put("/event/update", formData);
      }
      catch(err)
      {
        console.log(err);
      }
    } else {
      
        try {
          //create 
          const res = await Apiservice.post("/event/create", formData);
          console.log("Event created:", res);
          //setShowModal(false);
        }
        catch (err) {
          console.log(err)
        }
   

    }
    
    setShowModal(false);
  };

  const handleDelete = (id) => {
    // Remove event locally
    // Remove event locally
    // Logic removed for static demo
  };

  const toggleStatus = (event) => {
    // Toggle status locally
    // Toggle status locally
    // Logic removed for static demo
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage Events</h1>
          <p className="text-gray-500">Create and manage events</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full"
        >
          <Plus size={18} /> Add Event
        </button>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => {
          const percent = Math.round(
            (event.booked / event.capacity) * 100
          );

          return (
            <div
              key={event.id}
              className="bg-white p-6 rounded-3xl shadow border"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">{event.title}</h2>
                  <span
                    className={`text-xs ${
                      event.active ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {event.active ? "active" : "inactive"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Pencil
                    onClick={() => openEditModal(event)}
                    className="cursor-pointer text-blue-500"
                  />
                  <Trash2
                    onClick={() => handleDelete(event.id)}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              </div>

              <p className="text-gray-600 mt-2">{event.description}</p>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="flex items-center gap-2 bg-blue-100 p-2 rounded-full text-sm">
                  <Calendar size={16} />
                  {event.date.slice(0, 10)}
                </div>

                <div className="flex items-center gap-2 bg-purple-100 p-2 rounded-full text-sm">
                  <Clock size={16} />
                  {event.time}
                </div>

                <div className="flex items-center gap-2 bg-yellow-100 p-2 rounded-full text-sm">
                  <Users size={16} />
                  {event.booked} / {event.capacity}
                </div>

                <div className="flex items-center gap-2 bg-green-100 p-2 rounded-full text-sm">
                  <DollarSign size={16} />
                  ${event.price}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Booking</span>
                  <span>{percent}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-2 bg-indigo-500 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-3xl w-full max-w-lg relative">
            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setShowModal(false)}
            />

            <h2 className="text-xl font-bold mb-4">
              {editingEvent ? "Edit Event" : "Add Event"}
            </h2>

            <div className="space-y-4">
              {["title", "description", "date", "time", "capacity", "price"].map(
                (field) => (
                  <input
                    key={field}
                    type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                    placeholder={field}
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-lg"
                  />
                )
              )}

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-200 rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminEvents;