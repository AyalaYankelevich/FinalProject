import React from 'react';
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';

const AppointmentDetails = ({ appointments }) => {
  return (
    <List>
      {appointments.map(appt => {
        if (!appt.date || !appt.hour) return null;
        let hourString = appt.hour;
        if (/^\d{2}:\d{2}$/.test(hourString)) hourString += ':00';
        const dateTimeString = `${appt.date}T${hourString}`;
        const appointmentDate = new Date(dateTimeString);
        if (isNaN(appointmentDate.getTime())) return null;

        // Access firstName and lastName directly from appt
        const doctorName = appt.firstName && appt.lastName ? `${appt.firstName} ${appt.lastName}` : 'N/A';

        return (
          <ListItem key={appt.id}>
            <Card variant="outlined" style={{ width: '100%', margin: '10px 0' }}>
              <CardContent>
                <Typography variant="h6">
                  Appointment Date: {appointmentDate.toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  Appointment Time: {appointmentDate.toLocaleTimeString()}
                </Typography>
                <Typography variant="body1">
                  Doctor: {doctorName}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        );
      })}
    </List>
  );
};

export default AppointmentDetails;