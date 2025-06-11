// import React, { useState, useEffect } from 'react';
// import { fetchData } from '../api';
// import ChooseAttendentKind from './ChooseAttendentKind';
// import PageCalander from './PageCalander';

// const styles = {
//   card: {
//     maxWidth: "400px",
//     margin: "40px auto",
//     padding: "24px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
//     background: "#fff",
//     fontFamily: "sans-serif"
//   },
//   button: {
//     background: "#0070f3",
//     color: "#fff",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginRight: "12px"
//   },
//   overlay: {
//     position: "fixed",
//     top: 0, left: 0, right: 0, bottom: 0,
//     background: "rgba(255,255,255,0.98)",
//     zIndex: 1000,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// };

// const ClientPage = ({ client }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [error, setError] = useState("");
//   const [showAppointments, setShowAppointments] = useState(false);
//   const [showAttendentKind, setShowAttendentKind] = useState(false);
//   const [attendents, setAttendents] = useState([]);
//   const [loadingAttendents, setLoadingAttendents] = useState(false);
//   const [attendentKind, setAttendentKind] = useState(null);
//   const [showHome, setShowHome] = useState(false);
//   const [selectedAttendentId, setSelectedAttendentId] = useState(null);
//   const [showCalendar, setShowCalendar] = useState(false); // מצב חדש להראות את הקומפוננטה של לוח השנה

//   const handleFetchAppointments = async () => {
//     setShowAppointments(true);
//     setShowAttendentKind(false);
//     try {
//       const data = await fetchData('ClinicAppointment', 'getByClientId', { id: client.id }, 'get');
//       setAppointments(data);
//       setError("");
//     } catch (err) {
//       setError(err.message || "Failed to fetch clinic appointments");
//     }
//   };

//   const handleFetchAppointmentsToDoctore = () => {
//     setShowHome(true);
//     setShowCalendar(true); // להפעיל את הקומפוננטה של לוח השנה
//   };

//   const handleShowAttendentKind = () => {
//     setShowAppointments(false);
//     setShowAttendentKind(true);
//     setAttendents([]);
//     setAttendentKind(null);
//   };

//   const handleCloseAttendentKind = () => {
//     setShowAttendentKind(false);
//     setAttendents([]);
//     setAttendentKind(null);
//   };

//   const handleKindChosen = async (kindNumber) => {
//     setLoadingAttendents(true);
//     setAttendents([]);
//     setAttendentKind(kindNumber);
//     try {
//       const data = await fetchData('Attendent', 'getByKind', { kind: kindNumber }, 'get');
//       setAttendents(Array.isArray(data) ? data : []);
//       setError("");
//     } catch (err) {
//       setError(err.message || "Failed to fetch attendents");
//       setAttendents([]);
//     }
//     setLoadingAttendents(false);
//   };

//   // הוספת useEffect כדי להגדיר את selectedAttendentId רק פעם אחת
//   useEffect(() => {
//     if (attendents.length > 0 && selectedAttendentId === null) {
//       setSelectedAttendentId(attendents[0].id); // או כל לוגיקה אחרת שאתה רוצה
//     }
//   }, [attendents, selectedAttendentId]);
//   console.log('Rendering ClientPage');
//   if (!client) return <div>No client data</div>;

// console.log('Client:', client); // Add this line to log the client object

//   return (
//     <div style={styles.card}>
//       {showCalendar ? ( // אם הקומפוננטה של לוח השנה פעילה, רק אותה נציג
//         <PageCalander attendentId={selectedAttendentId} clientId={client.id} />
//       ) : (
//         <>
        
//           <h2>Welcome, {client.firstName} {client.lastName}!</h2>
//           <button style={styles.button} onClick={handleFetchAppointments}>
//             Show My Appointments
//           </button>
//           <button
//             style={{ ...styles.button, background: "#34a853" }}
//             onClick={handleShowAttendentKind}
//           >
//             Choose Attendent Kind
//           </button>
//           {error && <p style={{ color: "red" }}>{error}</p>}

//           {showAppointments && (
//             <ul>
//               {appointments.map(appt => {
//                 if (!appt.date || !appt.hour) return null;
//                 let hourString = appt.hour;
//                 if (/^\d{2}:\d{2}$/.test(hourString)) hourString += ':00';
//                 const dateTimeString = `${appt.date}T${hourString}`;
//                 const appointmentDate = new Date(dateTimeString);
//                 if (isNaN(appointmentDate.getTime())) return null;
//                 return (
//                   <li key={appt.id}>
//                     {appointmentDate.toLocaleDateString()} {appointmentDate.toLocaleTimeString()}
//                   </li>
//                 );
//               })}
//             </ul>
//           )}

//           {showAttendentKind && (
//             <div style={styles.overlay}>
//               <ChooseAttendentKind onKindChosen={handleKindChosen} />
//               {loadingAttendents && <div style={{ marginTop: 16 }}>Loading attendents...</div>}
//               {attendents.length > 0 && (
//                 <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
//                   <ul>
//                     {attendents.map((att, idx) => {
//                       console.log("Doctor Object:", att);
//                       return (
//                         <div style={{ ...styles.card, flex: '0 1 calc(33% - 10px)', margin: '5px' }} key={att.firstName + att.lastName + idx}>
//                           <li>{att.firstName} {att.lastName}</li>
//                           <button onClick={() => setSelectedAttendentId(att.id)}>Close appointment</button>
//                           <div>
//                             <button onClick={handleFetchAppointmentsToDoctore}>appointment</button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               )}
//               <button
//                 style={{ ...styles.button, marginTop: 24 }}
//                 onClick={handleCloseAttendentKind}
//               >
//                 Back
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ClientPage;
import React, { useState, useEffect } from 'react';
import { fetchData } from '../api';
import ChooseAttendentKind from './ChooseAttendentKind';
import PageCalander from './PageCalander';

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
  const [showHome, setShowHome] = useState(false);
  const [selectedAttendentId, setSelectedAttendentId] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false); // מצב חדש להראות את הקומפוננטה של לוח השנה

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

  const handleFetchAppointmentsToDoctore = () => {
    setShowHome(true);
    setShowCalendar(true); // להפעיל את הקומפוננטה של לוח השנה
  };

  const handleShowAttendentKind = () => {
    setShowAppointments(false);
    setShowAttendentKind(true);
    setAttendents([]);
    setAttendentKind(null);
  };

  const handleCloseAttendentKind = () => {
    setShowAttendentKind(false);
    setAttendents([]);
    setAttendentKind(null);
  };

  const handleKindChosen = async (kindNumber) => {
    setLoadingAttendents(true);
    setAttendents([]);
    setAttendentKind(kindNumber);
    try {
      const data = await fetchData('Attendent', 'getByKind', { kind: kindNumber }, 'get');
      setAttendents(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch attendents");
      setAttendents([]);
    }
    setLoadingAttendents(false);
  };

  // הוספת useEffect כדי להגדיר את selectedAttendentId רק פעם אחת
  useEffect(() => {
    if (attendents.length > 0 && selectedAttendentId === null) {
      setSelectedAttendentId(attendents[0].id); // או כל לוגיקה אחרת שאתה רוצה
    }
  }, [attendents, selectedAttendentId]);
  
  console.log('Rendering ClientPage');
  if (!client) return <div>No client data</div>;

  console.log('Client:', client); // Add this line to log the client object

  return (
    <div style={styles.card}>
      {showCalendar ? ( // אם הקומפוננטה של לוח השנה פעילה, רק אותה נציג
        <PageCalander attendentId={selectedAttendentId} clientId={client.id} />
      ) : (
        <>
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
                <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
                  <ul>
                    {attendents.map((att, idx) => {
                      console.log("Doctor Object:", att);
                      return (
                        <div style={{ ...styles.card, flex: '0 1 calc(33% - 10px)', margin: '5px' }} key={att.firstName + att.lastName + idx}>
                          <li>{att.firstName} {att.lastName}</li>
                          <button onClick={() => setSelectedAttendentId(att.id)}>Close appointment</button>
                          <div>
                            <button onClick={handleFetchAppointmentsToDoctore}>appointment</button>
                          </div>
                        </div>
                      );
                    })}
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
        </>
      )}
    </div>
  );
};

export default ClientPage;
