// // src/pages/ClientPage.js
// import React, { useState } from 'react';
// import {
//   DatePicker,
//   LocalizationProvider,
// } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // ודא ש-dayjs מותקן
// import dayjs from 'dayjs'; // ייבוא dayjs כדי להשתמש בו לאתחול תאריך נוכחי
// import { Box, Typography } from '@mui/material';

// // ייבוא קומפוננטת מתזמן התורים שלך
// //import AppointmentScheduler from '../components/AppointmentBooker/AppointmentScheduler'; 

// export default function ClientPage() {
//   // מצב המכיל את התאריך שנבחר. אתחל אותו לתאריך הנוכחי או ל-null.
//   const [selectedDate, setSelectedDate] = useState(dayjs()); 
//   const attendentId = 1; // דוגמה: מזהה המטפל שהלקוח רוצה לקבוע איתו תור
//   const clientId = 11;  // דוגמה: מזהה הלקוח הנוכחי המחובר

//   return (
//     // LocalizationProvider הוא חובה עבור כל קומפוננטות ה-Date Pickers של MUI
    
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
        
//       <Box sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
//         <Typography variant="h4" gutterBottom align="center">
//           קביעת תור חדש
//         </Typography>
  
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h6" gutterBottom>
//             1. בחר תאריך:
//           </Typography>
//           <DatePicker
//             label="בחר תאריך לתור"
//             value={selectedDate}
//             onChange={(newValue) => setSelectedDate(newValue)}
//             // ניתן להוסיף כאן מאפיינים נוספים ל-DatePicker, לדוגמה:
//             minDate={dayjs()} // מאפשר בחירת תאריכים מהיום והלאה בלבד
//             // disablePast // אופציה נוספת לביטול תאריכים בעבר
//             // views={['year', 'month', 'day']} // אילו תצוגות לאפשר בבורר
//           />
//         </Box>

//         {/* נציג את AppointmentScheduler רק אם נבחר תאריך */}
//         {selectedDate && (
//           <Box>
//             <Typography variant="h6" gutterBottom>
//               2. בחר שעה פנויה:
//             </Typography>
//             <AppointmentScheduler
//               attendentId={attendentId}
//               clientId={clientId}
//               selectedDate={selectedDate} // מעבירים את התאריך הנבחר כ-prop
//             />
//           </Box>
//         )}
//       </Box>
//     </LocalizationProvider>
//   );
// }