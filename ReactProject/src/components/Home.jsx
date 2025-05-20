// import React, { useState, useEffect } from "react";
// import { fetchData } from "../api";


// const Home = () => {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchData()
//         .then(data => {
//             console.log("Fetched Data:", data);
//             setUsers(data);
//         })
//             .catch(err => setError(err));
//     }, []);

//     return (
//         <div>
//             <h1>Home</h1>

//         </div>
//     );
// }

// export default Home;
// import * as React from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// export default function BasicDateCalendar() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar />
//     </LocalizationProvider>
//   );
// }
//////////////////////////////////////////////////////////////////////////////////// a pretty calender:
// import * as React from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// export default function BasicDateCalendar() {
//   // State to handle selected date and modal visibility
//   const [selectedDate, setSelectedDate] = React.useState(null);
//   const [isModalOpen, setModalOpen] = React.useState(false);

//   // Example appointments data
//   const appointments = {
//     '2025-05-15': ['10:00 AM - Dental Cleaning', '1:00 PM - Orthodontist Consultation'],
//     '2025-05-16': ['9:00 AM - General Checkup', '4:00 PM - Dentist Appointment'],
//   };

//   // Handle date selection
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setModalOpen(true); // Open the modal when a date is selected
//   };

//   // Close modal
//   const handleClose = () => setModalOpen(false);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar onChange={handleDateChange} />

//       {/* Modal to display available appointments */}
//       <Modal
//         open={isModalOpen}
//         onClose={handleClose}
//         aria-labelledby="appointment-modal-title"
//         aria-describedby="appointment-modal-description"
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             border: '2px solid #000',
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography id="appointment-modal-title" variant="h6" component="h2">
//             Available Appointments
//           </Typography>
//           <Typography id="appointment-modal-description" sx={{ mt: 2 }}>
//             {selectedDate && appointments[selectedDate.format('YYYY-MM-DD')]
//               ? appointments[selectedDate.format('YYYY-MM-DD')].map((appointment, index) => (
//                   <div key={index}>{appointment}</div>
//                 ))
//               : 'No appointments available for this day.'}
//           </Typography>
//         </Box>
//       </Modal>
//     </LocalizationProvider>
//   );
// }
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import dayjs from 'dayjs';

export default function StaticDateTimePickerLandscape() {
  const getTimeRange = (date) => {
    // Calculate the time range (20 minutes duration)
    const startTime = dayjs(date).format('HH:mm'); // Format as 24-hour time
    const endTime = dayjs(date).add(20, 'minute').format('HH:mm'); // Add 20 minutes
    return `${startTime} - ${endTime}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        orientation="landscape"
        ampm={false} // Disable AM/PM
        renderInput={(params) => <div {...params} />}
        onChange={(date) => {
          // Example: Log the time range to the console
          console.log(`Selected Time Range: ${getTimeRange(date)}`);
        }}
        toolbarTitle="Choose a Date and Time"
      />
    </LocalizationProvider>
  );
}
