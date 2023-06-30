import React, { useState } from "react";
import "./App.css"

export default function AddEventModal({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [allDay, setAllDay] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create a new event object
    const newEvent = {
      title,
      start,
      end,
      allDay,
    };

    // Pass the new event to the parent component
    onEventAdded(newEvent);

    // Clear the form inputs
    setTitle("");
    setStart("");
    setEnd("");
    setAllDay(false);

    // Close the modal
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Add Event</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="modal-title">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="modal-start">
            <label>Start:</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="modal-end">
            <label>End:</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <div className="modal-allday">
            <label>All Day:</label>
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="modal-add-button">Add</button>
            <button onClick={onClose} className="modal-cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
