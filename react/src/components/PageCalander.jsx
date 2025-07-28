import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Alert,
} from '@mui/material';
import { fetchData } from '../api'; // ודא ש-fetchData מטפל גם בשליחת data ב-body עבור POST/PUT

export default function PageCalander() {
  const { attendentId: idFromParams } = useParams();
  const { client } = useSelector((state) => state.client);

  const attendentId = parseInt(idFromParams, 10);
  const clientId = client ? client.id : null;

  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  // availableTimes יכיל מערך של אובייקטים, לדוגמה: [{id: 1, hour: "09:00"}, {id: 2, hour: "10:00"}]
  const [availableTimes, setAvailableTimes] = React.useState([]); 
  const [loading, setLoading] = React.useState(false);
  // selectedTimeSlot יאחסן את האובייקט המלא של התור הנבחר: {id, hour, ...}
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState(null); 
  const [bookingStatus, setBookingStatus] = React.useState('idle');
  const [errorMsg, setErrorMsg] = React.useState('');

  useEffect(() => {
    if (isNaN(attendentId) || !clientId) {
      setErrorMsg('Attendant ID or Client ID is missing/invalid.');
      setLoading(false);
      return;
    }
    fetchAvailableAppointments(selectedDate);
  }, [selectedDate, attendentId, clientId]);

  const fetchAvailableAppointments = async (date) => {
    setLoading(true);
    setAvailableTimes([]);
    setSelectedTimeSlot(null); // נקה את בחירת התור הקודמת
    setErrorMsg('');
    try {
      const params = {
        date: date.format('YYYY-MM-DD'), 
        attendentId,
      };
      // הקונטרולר שלך מחזיר: [{id: ..., hour: ...}] (camelCase)
      const data = await fetchData('ClinicAppointment', 'available', params, 'get'); 
      console.log("Fetched available times:", data); // הדפסה לבדיקה
      setAvailableTimes(data);
    } catch (error) {
      console.error('Error fetching available appointments:', error);
      setAvailableTimes([]);
      setErrorMsg('Failed to load available appointments. ' + (error.message || ''));
    }
    setLoading(false);
  };

  const handleCommit = async () => {
    if (!selectedTimeSlot) { // ודא שאובייקט תור נבחר
      console.log('No time slot selected.');
      return;
    }
    if (!clientId) {
      setErrorMsg('Client ID is missing. Cannot book appointment.');
      return;
    }

    console.log('Starting booking process...');
    setBookingStatus('loading');
    setErrorMsg('');
    try {
      // בנה את האובייקט בדיוק כפי שה-backend מצפה לו עבור BookAppointmentRequest
      // הקונטרולר שלך מצפה ל-`AppointmentId` ו-`ClientId` (PascalCase)
      const bookingRequestData = {
        AppointmentId: selectedTimeSlot.id, // שינוי: השתמש ב-`id` (camelCase) מהאובייקט שנבחר
        ClientId: clientId, 
      };
      console.log('Data to send for booking:', bookingRequestData);

      // שינוי ה-endpoint ל-'BookAppointment' ושיטת ה-HTTP ל-'put'
      await fetchData('ClinicAppointment', 'BookAppointment', bookingRequestData, 'put'); 

      console.log('Booking successful!');
      setBookingStatus('success');
      // רענן את התורים הזמינים כדי להציג את השינויים (התור שהוזמן אמור להיעלם)
      fetchAvailableAppointments(selectedDate);
      setSelectedTimeSlot(null); // נקה את הבחירה לאחר הזמנה מוצלחת
    } catch (error) {
      console.error('Error during booking:', error);
      setBookingStatus('error');
      setErrorMsg('Failed to book appointment. Please try again. ' + (error.message || ''));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <StaticDatePicker
          orientation="landscape"
          value={selectedDate}
          onChange={setSelectedDate}
          renderInput={() => null}
          toolbarTitle="Choose a Date"
          displayStaticWrapperAs="desktop"
        />
        <Box sx={{ mt: 3, width: '100%' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Available Appointments
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          ) : errorMsg ? (
            <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>
          ) : availableTimes.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No available appointments
            </Typography>
          ) : (
            <ToggleButtonGroup
              color="primary"
              // ערך הקבוצה הוא ה-id של התור שנבחר (אם יש כזה)
              value={selectedTimeSlot ? selectedTimeSlot.id : null} // שינוי: גישה למאפיין id ב-camelCase
              exclusive
              onChange={(event, newSelectedId) => {
                // מצא את האובייקט המלא של התור מתוך availableTimes לפי ה-id
                const foundSlot = availableTimes.find(slot => slot.id === newSelectedId); // שינוי: גישה למאפיין id ב-camelCase
                setSelectedTimeSlot(foundSlot); // אחסן את האובייקט המלא בסטייט
              }}
              sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 2 }}
            >
              {/* Loop דרך availableTimes. כל 'appointment' כאן הוא אובייקט {id, hour} */}
              {availableTimes.map((appointment) => ( 
                <ToggleButton
                  key={appointment.id} // שינוי: השתמש ב-id ייחודי כ-key ל-React (camelCase)
                  value={appointment.id} // שינוי: ערך ה-ToggleButton הוא ה-id של התור (camelCase)
                >
                  {appointment.hour} {/* שינוי: הצג את מאפיין ה-hour של האובייקט (camelCase) */}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              // כפתור מושבת אם אין תור נבחר או אם עדיין בטעינה/הזמנה
              disabled={!selectedTimeSlot || bookingStatus === 'loading'} 
              onClick={handleCommit}
            >
              {bookingStatus === 'loading' ? <CircularProgress size={24} /> : 'Commit Appointment'}
            </Button>
            {bookingStatus === 'success' && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Appointment booked successfully!
              </Alert>
            )}
            {bookingStatus === 'error' && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMsg}
              </Alert>
            )}
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}