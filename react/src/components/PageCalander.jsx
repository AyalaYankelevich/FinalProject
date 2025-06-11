
import * as React from 'react';
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
import { fetchData } from '../api';


export default function AppointmentBooker({ attendentId, clientId}) {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [availableTimes, setAvailableTimes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState('');
  const [bookingStatus, setBookingStatus] = React.useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = React.useState('');

  // Fetch available appointments for selected date and attendant
  const fetchAvailableAppointments = async (date) => {
    setLoading(true);
    setAvailableTimes([]);
    setSelectedTime('');
    setErrorMsg('');
    try {
      const params = {
        date: date.format('YYYY-MM-DD'),
        attendentId,
      };
      const data = await fetchData('ClinicAppointment', 'available', params, 'get');
      setAvailableTimes(data);
    } catch (error) {
      setAvailableTimes([]);
      setErrorMsg('Failed to load available appointments.');
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAvailableAppointments(selectedDate);
    // eslint-disable-next-line
  }, [selectedDate, attendentId]);

  const handleDateChange = (date) => setSelectedDate(date);

  const handleTimeChange = (_, newTime) => setSelectedTime(newTime);

//   const handleCommit = async () => {
//     if (!selectedTime) return;
//     setBookingStatus('loading');
//     setErrorMsg('');
//     try {
//       const params = {
//         attendentId,
//         clientId, // Make sure clientId is defined in your component
//         date: selectedDate.format('YYYY-MM-DD'),
//         hour: selectedTime,
//       };
//       await fetchData('ClinicAppointment', 'AddClinicAppointment', params, 'post'); // Change to the correct action
//       setBookingStatus('success');
//       fetchAvailableAppointments(selectedDate);
//     } catch (error) {
//       setBookingStatus('error');
//       setErrorMsg('Failed to book appointment. Please try again.');
//     }
// };

const handleCommit = async () => {
  if (!selectedTime) {
      console.log('No time selected.');
      return;
  }
  console.log('Starting booking process...');
  setBookingStatus('loading');
  setErrorMsg('');
  try {
      const params = {
          attendentId,
          clientId, // Make sure clientId is defined in your component
          date: selectedDate.format('YYYY-MM-DD'),
          hour: selectedTime,
      };
      console.log('Parameters:', params);
      await fetchData('ClinicAppointment', 'AddClinicAppointment', params, 'post'); // Change to the correct action
      console.log('Booking successful!');
      setBookingStatus('success');
      fetchAvailableAppointments(selectedDate);
  } catch (error) {
      console.error('Error during booking:', error);
      setBookingStatus('error');
      setErrorMsg('Failed to book appointment. Please try again.');
  }
};


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <StaticDatePicker
          orientation="landscape"
          value={selectedDate}
          onChange={handleDateChange}
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
              value={selectedTime}
              exclusive
              onChange={handleTimeChange}
              sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 2 }}
            >
              {availableTimes.map((time) => (
                <ToggleButton key={time} value={time}>
                  {time}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={!selectedTime || bookingStatus === 'loading'}
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