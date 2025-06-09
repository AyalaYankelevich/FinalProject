import React, { useState } from 'react';
import { fetchData } from '../api';
import ChooseAttendentKind from './ChooseAttendentKind';

const styles = {
  card: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
    background: "#fff",
    fontFamily: "sans-serif"
  },
  button: {
    background: "#0070f3",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "12px"
  },
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(255,255,255,0.98)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
};

const ClientPage = ({ client }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [showAppointments, setShowAppointments] = useState(false);
  const [showAttendentKind, setShowAttendentKind] = useState(false);
  const [attendents, setAttendents] = useState([]);
  const [loadingAttendents, setLoadingAttendents] = useState(false);
  const [attendentKind, setAttendentKind] = useState(null);

  // Fetch appointments only when button is clicked
  const handleFetchAppointments = async () => {
    setShowAppointments(true);
    setShowAttendentKind(false);
    try {
      const data = await fetchData('ClinicAppointment', 'getByClientId', { id: client.id }, 'get');
      setAppointments(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch clinic appointments");
    }
  };

  // Show ChooseAttendentKind component
  const handleShowAttendentKind = () => {
    setShowAppointments(false);
    setShowAttendentKind(true);
    setAttendents([]);
    setAttendentKind(null);
  };

  // Hide ChooseAttendentKind component
  const handleCloseAttendentKind = () => {
    setShowAttendentKind(false);
    setAttendents([]);
    setAttendentKind(null);
  };

  // Callback for when a kind is chosen
  const handleKindChosen = async (kindNumber) => {
    setLoadingAttendents(true);
    setAttendents([]);
    setAttendentKind(kindNumber);
    try {
      // Assign the result of fetchData to data
      const data = await fetchData('Attendent', 'getByKind', { kind: kindNumber }, 'get');
      console.log('DATA FROM API:', data); // <-- Now it's defined!
      setAttendents(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch attendents");
      setAttendents([]);
    }
    setLoadingAttendents(false);
  };

  if (!client) return <div>No client data</div>;

  return (
    
    <div style={styles.card}>
      <p>cheak!</p>
      <h2>Welcome, {client.firstName} {client.lastName}!</h2>
      <button style={styles.button} onClick={handleFetchAppointments}>
        Show My Appointments
      </button>
      <button
        style={{ ...styles.button, background: "#34a853" }}
        onClick={handleShowAttendentKind}
      >
        Choose Attendent Kind
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {showAppointments && (
        <ul>
          {appointments.map(appt => {
            if (!appt.date || !appt.hour) return null;
            let hourString = appt.hour;
            if (/^\d{2}:\d{2}$/.test(hourString)) hourString += ':00';
            const dateTimeString = `${appt.date}T${hourString}`;
            const appointmentDate = new Date(dateTimeString);
            if (isNaN(appointmentDate.getTime())) return null;
            return (
              <li key={appt.id}>
                {appointmentDate.toLocaleDateString()} {appointmentDate.toLocaleTimeString()}
              </li>
            );
          })}
        </ul>
      )}

      {showAttendentKind && (
        <div style={styles.overlay}>
          <ChooseAttendentKind onKindChosen={handleKindChosen} />
          {loadingAttendents && <div style={{ marginTop: 16 }}>Loading attendents...</div>}
          {attendents.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <strong>Attendents:</strong>
              <ul>
                {attendents.map((att, idx) => (
                  <li key={att.firstName + att.lastName + idx}>{att.firstName} {att.lastName}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            style={{ ...styles.button, marginTop: 24 }}
            onClick={handleCloseAttendentKind}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientPage;