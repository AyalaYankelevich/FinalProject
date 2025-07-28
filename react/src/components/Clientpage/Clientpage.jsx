// src/components/ClientPage/ClientPage.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MyAppointments from '../MyAppointments/MyAppointments';
import AttendentSelectionFlow from '../AttendentSelectionFlow/AttendentSelectionFlow';
import './ClientPage.css'; 

// קבועים למצבי תצוגה
const VIEW_NONE = 'none';
const VIEW_MY_APPOINTMENTS = 'myAppointments';
const VIEW_BOOK_APPOINTMENT = 'bookAppointment';

const ClientPage = () => {
  const client = useSelector((state) => state.client.client);
  const [currentView, setCurrentView] = useState(VIEW_NONE); 

  if (!client) {
    return <div className="client-card">טוען פרטי לקוח או בעיה באיתור הלקוח...</div>;
  }

  const handleGoBackToMenu = () => {
    setCurrentView(VIEW_NONE);
  };

  return (
    <div className="client-card">
      <h2>Welcome {client.firstName} {client.lastName}!</h2>

      {currentView === VIEW_NONE && (
        <div className="client-actions">
          <button
            // שינוי כאן: שניהם יהיו עם אותה מחלקה לעיצוב
            className="client-button client-button-sea-blue" 
            onClick={() => setCurrentView(VIEW_MY_APPOINTMENTS)}
          >
            My Appointments 
          </button>
          <button
            // שינוי כאן: שניהם יהיו עם אותה מחלקה לעיצוב
            className="client-button client-button-sea-blue" 
            onClick={() => setCurrentView(VIEW_BOOK_APPOINTMENT)}
          >
            Book New Appointment 
          </button>
        </div>
      )}

      {currentView === VIEW_MY_APPOINTMENTS && (
        <>
          <button 
            className="client-button client-button-sea-blue" 
            onClick={handleGoBackToMenu}
          >
            ← Back to Menu
          </button>
          <MyAppointments clientId={client.id} />
        </>
      )}

      {currentView === VIEW_BOOK_APPOINTMENT && (
        <>
          <button 
            className="client-button client-button-secondary back-button" 
            onClick={handleGoBackToMenu}
          >
            ← Back to Menu
          </button>
          <AttendentSelectionFlow clientId={client.id} onClose={handleGoBackToMenu} />
        </>
      )}
    </div>
  );
};

export default ClientPage;