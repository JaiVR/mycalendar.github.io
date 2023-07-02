import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import AddEventModal from "./AddEventModal";
import { firebaseConfig } from "./Firebase";

initializeApp(firebaseConfig);
const database = getDatabase();

export default function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    return storedEvents || [];
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsRef = ref(database, "events");
      onValue(eventsRef, async (snapshot) => {
        const firebaseEventsData = snapshot.val();
        const firebaseEvents = firebaseEventsData
          ? Object.entries(firebaseEventsData).map(([eventId, eventData]) => ({
              id: eventId,
              title: eventData.title,
              start: eventData.start,
              end: eventData.end,
              allDay: eventData.allDay,
            }))
          : [];

        const response = await axios.get(
          "https://public-holiday.p.rapidapi.com/2023/US",
          {
            headers: {
              "X-RapidAPI-Key": "af1dbd93e5msh8dcd520cee8d5f6p1c3dd9jsnfdfe56ba53b9",
              "X-RapidAPI-Host": "public-holiday.p.rapidapi.com",
            },
          }
        );
        const holidayEvents = response.data.map((holiday) => ({
          title: holiday.name,
          start: holiday.date,
          allDay: true,
        }));

        const mergedEvents = [...firebaseEvents, ...holidayEvents];
        setEvents(mergedEvents);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventAdd = (event) => {
    const newEvent = {
      id: generateId(),
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setModalOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div>
      <div className="button" style={{ marginLeft: "40%"}}>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            fontWeight: "800",
            fontSize: "large",
            padding: "10%",
            paddingTop: "2%",
            paddingBottom: "2%",
            borderRadius: "8px",
            color: "white",
            backgroundColor: "rgba(0, 125, 220)",
          }}
        >
          Add event
        </button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventAdd={handleEventAdd}
      />
      {modalOpen && (
        <AddEventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onEventAdded={handleEventAdd}
        />
      )}
    </div>
  );
}
