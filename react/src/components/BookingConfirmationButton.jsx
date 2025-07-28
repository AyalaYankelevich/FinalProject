// src/components/AppointmentBooker/BookingConfirmationButton.js
import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

export default function BookingConfirmationButton({
  selectedTime,
  bookingStatus, // idle | loading | success | error
  onCommit,      // פונקציה לביצוע ההזמנה
  errorMessage,  // הודעת שגיאה כללית (אם יש)
}) {
  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedTime || bookingStatus === 'loading'} // כפתור מושבת אם אין זמן נבחר או בטעינה
        onClick={onCommit} // הפעלת פונקציית ההזמנה מההורה
      >
        {bookingStatus === 'loading' ? <CircularProgress size={24} /> : 'Commit Appointment'}
      </Button>

      {/* הודעות סטטוס לאחר ניסיון ההזמנה */}
      {bookingStatus === 'success' && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Appointment booked successfully!
        </Alert>
      )}
      {bookingStatus === 'error' && errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
}