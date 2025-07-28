import React, { useState, useEffect } from 'react';
import './MyAppointments.css';
import { useDispatch, useSelector } from 'react-redux';
 import { fetchAppointmentsByClient } from '../../redux/appointmentsSlice';
 
const MyAppointments = ({ clientId }) => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.list);
  const loading = useSelector((state) => state.appointments.loading);
  const error = useSelector((state) => state.appointments.error);
  useEffect(() => {
    if (clientId) {
      dispatch(fetchAppointmentsByClient(clientId)); 
    }
  }, [clientId, dispatch]);

  if (loading) {
    return <p className="appointments-loading">טוען תורים...</p>;
  }

  if (error) {
    return <p className="appointments-error">{error}</p>;
  }

  if (appointments.length === 0) {
    return <p className="no-appointments-message">אין לך תורים קרובים כרגע</p>;
  }

  return (
    <div className="appointments-container">
      <h3>התורים הקרובים שלך:</h3>
      <ul className="appointments-list">
        {appointments.map(appt => {
          if (!appt.date || !appt.hour) return null;
          let hourString = appt.hour;
          if (/^\d{2}:\d{2}$/.test(hourString)) hourString += ':00';
          const dateTimeString = `${appt.date}T${hourString}`;
          const appointmentDate = new Date(dateTimeString);
          if (isNaN(appointmentDate.getTime())) return null;
          return (
            <li key={appt.id} className="appointment-item">
              {appointmentDate.toLocaleDateString()} בשעה {appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyAppointments;
