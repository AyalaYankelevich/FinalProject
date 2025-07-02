import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const kindToValue = {
  "Dentist": 2,
  "Orthodontist": 3,
  "Dental Care": 1
};

export default function ChooseAttendentKind({ onKindChosen }) {
  const [kind, setKind] = React.useState('');

  const handleChange = (event) => {
    const selectedKind = event.target.value;
    setKind(selectedKind);
    if (onKindChosen) {
      onKindChosen(kindToValue[selectedKind]);
    }
  };

  return (
    <Box sx={{ minWidth: 250, background: '#fafafa', padding: 3, borderRadius: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="attendent-kind-label">Attendent Kind</InputLabel>
        <Select
          labelId="attendent-kind-label"
          id="attendent-kind-select"
          value={kind}
          label="Attendent Kind"
          onChange={handleChange}
        >
          <MenuItem value="Dental Care">Dental Care</MenuItem>
          <MenuItem value="Orthodontist">Orthodontist</MenuItem>
          <MenuItem value="Dentist">Dentist</MenuItem>
        </Select>
      </FormControl>

    </Box>
    
  );
}