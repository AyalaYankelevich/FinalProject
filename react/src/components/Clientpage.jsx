
// import React, { useState } from 'react';
// import { fetchData } from '../api';
// import ChooseAttendentKind from './ChooseAttendentKind';
// import { Card, CardContent, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItemButton, Grid } from '@mui/material';

// const ClientPage = ({ client }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [error, setError] = useState("");
//   const [showAppointments, setShowAppointments] = useState(false);
//   const [showAttendentKind, setShowAttendentKind] = useState(false);
//   const [attendents, setAttendents] = useState([]);
//   const [loadingAttendents, setLoadingAttendents] = useState(false);
//   const [attendentKind, setAttendentKind] = useState(null);

//   const handleFetchAppointments = async () => {
//     setShowAppointments(!showAppointments);
//     setShowAttendentKind(false);
//     if (!showAppointments) {
//       try {
//         const data = await fetchData('ClinicAppointment', 'getByClientId', { id: client.id }, 'get');
//         setAppointments(data);
//         setError("");
//       } catch (err) {
//         setError(err.message || "Failed to fetch clinic appointments");
//       }
//     }
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

//   const handleCloseAppointments = () => {
//     setShowAppointments(false);
//     setAppointments([]);
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

//   if (!client) return <div>No client data</div>;

//   return (
//     <Card style={{ maxWidth: "400px", margin: "40px auto", padding: "24px", borderRadius: "10px" }}>
//       <CardContent>
//         <Typography variant="h5">Welcome, {client.firstName} {client.lastName}!</Typography>
//         <Button variant="contained" color="primary" onClick={handleFetchAppointments} style={{ margin: "12px 0" }}>
//           {showAppointments ? "Hide My Appointments" : "Show My Appointments"}
//         </Button>
//         {!showAppointments && (
//           <Button variant="contained" color="success" onClick={handleShowAttendentKind}>
//             Choose Attendent Kind
//           </Button>
//         )}
//         {error && <Typography color="error">{error}</Typography>}

//         {showAppointments && (
//           <>
//             <List>
//               {appointments.map(appt => {
//                 if (!appt.date || !appt.hour) return null;

//                 let hourString = appt.hour;
//                 if (/^\d{2}:\d{2}$/.test(hourString)) hourString += ':00';
//                 const dateTimeString = `${appt.date}T${hourString}`;
//                 const appointmentDate = new Date(dateTimeString);
//                 if (isNaN(appointmentDate.getTime())) return null;

//                 const formattedDate = appointmentDate.toLocaleDateString('en-GB'); // Formats as DD/MM/YYYY
//                 const formattedTime = appointmentDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Formats as HH:MM:SS
//                 const doctorName = appt.firstName && appt.lastName ? `${appt.firstName} ${appt.lastName}` : 'N/A';

//                 return (
//                   <ListItemButton key={appt.id}>
//                     <Card variant="outlined" style={{ margin: '10px', width: '100%' }}>
//                       <CardContent>
//                         <Grid container spacing={2}>
//                           <Grid item xs={12}>
//                             <Typography variant="h5" component="div">
//                               Appointment Details
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body1">
//                               Date: {formattedDate}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body1">
//                               Time: {formattedTime}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={12}>
//                             <Typography variant="body1">
//                               Doctor: {doctorName}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       </CardContent>
//                     </Card>
//                   </ListItemButton>
//                 );
//               })}
//             </List>
//             <Button variant="outlined" color="secondary" onClick={handleCloseAppointments}>
//               Close Appointment Details
//             </Button>
//           </>
//         )}

//         {showAttendentKind && (
//           <Dialog open={showAttendentKind} onClose={handleCloseAttendentKind}>
//             <DialogTitle>Choose Attendent Kind</DialogTitle>
//             <DialogContent>
//               <ChooseAttendentKind onKindChosen={handleKindChosen} />
//               {loadingAttendents && <CircularProgress style={{ marginTop: 16 }} />}
//               {attendents.length > 0 && (
//                 <div style={{ marginTop: 16 }}>
//                   <strong>Attendents:</strong>
//                   <List>
//                     {attendents.map((att, idx) => (
//                       <ListItemButton key={att.firstName + att.lastName + idx}>
//                         {att.firstName} {att.lastName}
//                       </ListItemButton>
//                     ))}
//                   </List>
//                 </div>
//               )}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseAttendentKind} color="primary">Back</Button>
//             </DialogActions>
//           </Dialog>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ClientPage;
import React, { useState } from 'react';
import { fetchData } from '../api';
import ChooseAttendentKind from './ChooseAttendentKind';
import { Card, CardContent, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItemButton, Grid } from '@mui/material';

const ClientPage = ({ client }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [showAppointments, setShowAppointments] = useState(false);
  const [showAttendentKind, setShowAttendentKind] = useState(false);
  const [attendents, setAttendents] = useState([]);
  const [loadingAttendents, setLoadingAttendents] = useState(false);
  const [attendentKind, setAttendentKind] = useState(null);

  const handleFetchAppointments = async () => {
    setShowAppointments(!showAppointments);
    setShowAttendentKind(false);
    if (!showAppointments) {
      try {
        const data = await fetchData('ClinicAppointment', 'getByClientId', { id: client.id }, 'get');
        setAppointments(data);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to fetch clinic appointments");
      }
    }
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

  const handleCloseAppointments = () => {
    setShowAppointments(false);
    setAppointments([]);
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

  if (!client) return <div>No client data</div>;

  return (
    <Card style={{ maxWidth: "400px", margin: "40px auto", padding: "24px", borderRadius: "10px" }}>
      <CardContent>
        <Typography variant="h5">Welcome, {client.firstName} {client.lastName}!</Typography>
        <Button variant="contained" color="primary" onClick={handleFetchAppointments} style={{ margin: "12px 0" }}>
          {showAppointments ? "Hide My Appointments" : "Show My Appointments"}
        </Button>
        {!showAppointments && (
          <Button variant="contained" color="success" onClick={handleShowAttendentKind}>
            Choose Attendent Kind
          </Button>
        )}
        {error && <Typography color="error">{error}</Typography>}

        {showAppointments && (
          <>
            <List>
              {appointments.map(appt => {
                if (!appt.date || !appt.hour) return null;

                let hourString = appt.hour;
                if (/^\d{2}:\d{2}$/.test(hourString)) hourString += ':00';
                const dateTimeString = `${appt.date}T${hourString}`;
                const appointmentDate = new Date(dateTimeString);
                if (isNaN(appointmentDate.getTime())) return null;

                const formattedDate = appointmentDate.toLocaleDateString('en-GB'); // Formats as DD/MM/YYYY
                const formattedTime = appointmentDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Formats as HH:MM:SS
                const doctorName = appt.firstName && appt.lastName ? `${appt.firstName} ${appt.lastName}` : 'N/A';

                return (
                  <ListItemButton key={appt.id}>
                    <Card variant="outlined" style={{ margin: '10px', width: '100%' }}>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h5" component="div">
                              Appointment Details
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1">
                              Date: {formattedDate}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1">
                              Time: {formattedTime}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body1">
                              Doctor: {doctorName}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </ListItemButton>
                );
              })}
            </List>
          </>
        )}

        {showAttendentKind && (
          <Dialog open={showAttendentKind} onClose={handleCloseAttendentKind}>
            <DialogTitle>Choose Attendent Kind</DialogTitle>
            <DialogContent>
              <ChooseAttendentKind onKindChosen={handleKindChosen} />
              {loadingAttendents && <CircularProgress style={{ marginTop: 16 }} />}
              {attendents.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <strong>Attendents:</strong>
                  <List>
                    {attendents.map((att, idx) => (
                      <ListItemButton key={att.firstName + att.lastName + idx}>
                        {att.firstName} {att.lastName}
                      </ListItemButton>
                    ))}
                  </List>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAttendentKind} color="primary">Back</Button>
            </DialogActions>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientPage;