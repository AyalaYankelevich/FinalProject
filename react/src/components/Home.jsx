
// import * as React from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
// import dayjs from 'dayjs';

// export default function StaticDateTimePickerLandscape() {
//   const getTimeRange = (date) => {
//     // Calculate the time range (20 minutes duration)
//     const startTime = dayjs(date).format('HH:mm'); // Format as 24-hour time
//     const endTime = dayjs(date).add(20, 'minute').format('HH:mm'); // Add 20 minutes
//     return `${startTime} - ${endTime}`;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <StaticDateTimePicker
//         orientation="landscape"
//         ampm={false} // Disable AM/PM
//         renderInput={(params) => <div {...params} />}
//         onChange={(date) => {
//           // Example: Log the time range to the console
//           console.log(`Selected Time Range: ${getTimeRange(date)}`);
//         }}
//         toolbarTitle="Choose a Date and Time"
//       />
//     </LocalizationProvider>
//   );
// }
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


export default function AppointmentBooker({ attendentId}) {
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

  const handleCommit = async () => {
    if (!selectedTime) return;
    setBookingStatus('loading');
    setErrorMsg('');
    try {
      const params = {
        attendentId,
        clientId,
        date: selectedDate.format('YYYY-MM-DD'),
        hour: selectedTime,
      };
      await fetchData('ClinicAppointment', 'reserve', params, 'post');
      setBookingStatus('success');
      fetchAvailableAppointments(selectedDate);
    } catch (error) {
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