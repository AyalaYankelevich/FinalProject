// src/components/AppointmentBooker/AvailableTimesDisplay.js
import React from 'react';
import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Alert,
} from '@mui/material';

export default function AvailableTimesDisplay({
  availableTimes,
  selectedTime,
  onTimeChange,
  loading,
  errorMsg,
}) {
  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      ) : errorMsg ? (
        <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>
      ) : availableTimes && availableTimes.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No available appointments for the selected date and attendant.
        </Typography>
      ) : (
        <ToggleButtonGroup
          color="primary"
          value={selectedTime}
          exclusive
          onChange={onTimeChange} // העברת ה-onChange מההורה
          sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 2 }}
        >
          {availableTimes && availableTimes.map((time) => (
            <ToggleButton key={time} value={time}>
              {time}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </>
  );
}