// import React, { useState } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

// const AppointmentsCalender = () => {
//   const [value, setValue] = useState([null, null]); // ערך ברירת מחדל לטווח תאריכים

//   return (
//     // <LocalizationProvider dateAdapter={AdapterDayjs}>
//     //   <DateRangeCalendar
//     //     value={value}
//     //     onChange={(newValue) => setValue(newValue)}
//     //   />
//     // </LocalizationProvider>
//     <>
//     </>
//   );
// };

// export default AppointmentsCalender;
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

// Create the filter options function
const filter = createFilterOptions();

export default function TreatmentSelector() {
  // State for the selected value
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
            value: 0, // Default value for new custom entries
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new option dynamically
          setValue({
            title: newValue.inputValue,
            value: 0, // Default value for dynamically created options
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        // Filter options using the built-in filter function
        const filtered = filter(options, params);

        const inputValue = params.inputValue;
        // Suggest adding a new option if it doesn't exist
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
            value: 0, // Default value for dynamically created options
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="treatment-selector"
      options={treatmentOptions} // Use the treatmentOptions array
      getOptionLabel={(option) => {
        // Handle different types of options
        if (typeof option === 'string') {
          return option; // For string values
        }
        if (option.inputValue) {
          return option.inputValue; // For dynamically created options
        }
        return option.title; // For regular options
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.title}
          </li>
        );
      }}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Choose the Treatment" />
      )}
    />
  );
}

// Treatment options array
const treatmentOptions = [
  { title: 'Dental Care', value: 10 },
  { title: 'Orthodontist', value: 20 },
  { title: 'Dentist', value: 30 },
];

