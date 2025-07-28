
// import React, { useState, useEffect, useCallback } from 'react';
// import { useSelector,useDispatch } from 'react-redux';
// import {
//   Box,
//   Typography,
// } from '@mui/material';
// import {
//   createAppointment,
//   fetchSpecificAvailableTimes, // שיניתי את השם ל-fetchSpecificAvailableTimes כפי שהגדרת בסלייס
//   clearAppointmentsError // נשתמש בפעולה זו לניקוי שגיאות כלליות
// } from '..//redux/appointmentsSlice'; // ודא שהנתיב נכון
// import AvailableTimesDisplay from './AvailableTimesDisplay';
// import BookingConfirmationButton from './BookingConfirmationButton';

// export default function AppointmentScheduler({ attendentId, clientId, selectedDate }) {
//   const dispatch = useDispatch();
  
//   // יש לוודא ש-availableTimesForBooking אכן מוגדר ב-initialState של appointmentsSlice
//   const availableTimes = useSelector((state) => state.appointments.availableTimesForBooking);
//   const loading = useSelector((state) => state.appointments.loading);
//   const errorMsg = useSelector((state) => state.appointments.error);

//   const [selectedTime, setSelectedTime] = useState('');
//   const [bookingStatus, setBookingStatus] = useState('idle'); // idle | loading | success | error

//   // פונקציה לטעינת הזמנים הפנויים - כעת ב-useCallback
//   const fetchAvailableAppointments = useCallback(() => {
//     if (selectedDate && attendentId) {
//       dispatch(clearAppointmentsError()); // נקה שגיאות לפני בקשה חדשה
//       dispatch(fetchSpecificAvailableTimes({
//         date: selectedDate.format('YYYY-MM-DD'),
//         attendentId: attendentId
//       }));
//     }
//   }, [selectedDate, attendentId, dispatch]);

//   // אפקט לטעינת זמנים פנויים כאשר התאריך או המטפל משתנים
//   useEffect(() => {
//     fetchAvailableAppointments();
//     // נקה את הבחירה והסטטוס כשמשתנים נתונים
//     setSelectedTime(''); 
//     setBookingStatus('idle');
//   }, [fetchAvailableAppointments]);

//   // פונקציה לטיפול בשינוי זמן נבחר (תועבר ל-AvailableTimesDisplay)
//   const handleTimeChange = (_, newTime) => {
//     setSelectedTime(newTime);
//     setBookingStatus('idle'); // אפס סטטוס הזמנה בבחירה חדשה
//     dispatch(clearAppointmentsError()); // נקה שגיאות קודמות
//   };

//   // פונקציה לביצוע הזמנה (תועבר ל-BookingConfirmationButton)
//   const handleCommit = async () => {
//     if (!selectedTime) {
//       console.warn('No time selected for booking.');
//       return;
//     }
//     setBookingStatus('loading');
//     dispatch(clearAppointmentsError()); // נקה שגיאות לפני ניסיון חדש

//     try {
//       const appointmentData = {
//         AttendentId: attendentId,
//         ClinetId: clientId,
//         Date: selectedDate.format('YYYY-MM-DD'),
//         Hour: selectedTime,
//         IsReserved: 1 // יצירת תור חדש, לכן הוא שמור
//       };
      
//       // dispatch().unwrap() יזרוק שגיאה אם הת'אנק נכשל, כך שניתן לתפוס אותה ב-try/catch
//       await dispatch(createAppointment(appointmentData)).unwrap(); 
      
//       setBookingStatus('success');
//       // לאחר הזמנה מוצלחת, נרצה לרענן את רשימת הזמנים הפנויים
//       fetchAvailableAppointments(); 
//       setSelectedTime(''); // ננקה את הבחירה
//     } catch (error) {
//       console.error('Error during booking:', error);
//       // ה-errorMsg ב-Redux כבר עודכן על ידי הת'אנק createAppointment
//       setBookingStatus('error'); 
//     }
//   };

//   return (
//     <Box sx={{ mt: 3, width: '100%' }}>
//       <Typography variant="h6" align="center" gutterBottom>
//         Available Appointments
//       </Typography>

//       {/* קומפוננטת ילד להצגת זמנים פנויים */}
//       <AvailableTimesDisplay
//         availableTimes={availableTimes}
//         selectedTime={selectedTime}
//         onTimeChange={handleTimeChange}
//         loading={loading}
//         errorMsg={errorMsg}
//       />

//       {/* קומפוננטת ילד לכפתור השריון והודעות סטטוס */}
//       <BookingConfirmationButton
//         selectedTime={selectedTime}
//         bookingStatus={bookingStatus}
//         onCommit={handleCommit}
//         // העברת הודעת השגיאה הכללית של AppointmentsSlice
//         // היא תהיה רלוונטית גם לשגיאות booking כיוון ש-createAppointment תעדכן אותה.
//         errorMessage={errorMsg} 
//       />
//     </Box>
//   );
// }