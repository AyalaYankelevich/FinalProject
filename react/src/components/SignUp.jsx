import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  TextField, Button, Box, Typography, Stack, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react'; // הוספתי useEffect
import { useDispatch, useSelector } from 'react-redux'; // ייבוא חדש
import { createClient } from '../redux/thunk'; 

function isOnlyNumbers(value) {
  return /^[0-9]+$/.test(value);
}

function isOnlyLetters(value) {
  return /^[A-Za-z]+$/.test(value);
}

function isValidPhone(value) {
  return /^[0-9]{9,10}$/.test(value);
}

function isValidDateOfBirth(value) {
  if (!value) return false;
  const date = new Date(value);
  const min = new Date('1900-01-01');
  const max = new Date();
  return date >= min && date <= max;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ClientsSignUpPage() {
  const theme = useTheme();
  const dispatch = useDispatch(); // אתחול useDispatch

  // קוראים את המצב מה-Redux store
  const { createLoading, createError, client, isAuthenticated } = useSelector((state) => state.client);

  const [form, setForm] = useState({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    numberPhone: '',
    address: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  // אפקט לטיפול בהרשמה מוצלחת או שגיאה מה-Redux store
  useEffect(() => {
    if (isAuthenticated && client && !createLoading && !createError) {
      // אם המשתמש אומת ונוצר בהצלחה, ניתן לנקות את הטופס או להפנות לדף אחר.
      // לדוגמה, כדי לנקות את הטופס:
      setForm({
        id: '', firstName: '', lastName: '', dateOfBirth: '',
        numberPhone: '', address: '', email: '',
      });
      setErrors({});
      setOpenDialog(false);
      // alert('Sign up successful!'); // או כל לוגיקה אחרת להצגת הצלחה
    }
  }, [isAuthenticated, client, createLoading, createError]);


  const validate = () => {
    const newErrors = {};
    if (!isOnlyNumbers(form.id)) newErrors.id = 'ID must contain only numbers';
    if (form.id.length < 5 || form.id.length > 10) newErrors.id = 'ID must be between 5 and 10 digits'; // ולידציה נוספת לאורך תעודת זהות
    if (!isOnlyLetters(form.firstName)) newErrors.firstName = 'First name must contain only letters';
    if (!isOnlyLetters(form.lastName)) newErrors.lastName = 'Last name must contain only letters';
    if (!isValidPhone(form.numberPhone)) newErrors.numberPhone = 'Phone number must be 9-10 digits';
    if (!form.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (form.dateOfBirth && !isValidDateOfBirth(form.dateOfBirth)) newErrors.dateOfBirth = 'Date must be between 1900 and today';
    if (!form.email) newErrors.email = 'Email is required';
    if (form.email && !isValidEmail(form.email)) newErrors.email = 'Invalid email address';
    if (!form.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // נקה שגיאה בשדה ספציפי בעת שינוי
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setOpenDialog(true);
    }
  };

  const handleDialogOk = () => {
    setOpenDialog(false);
    // שולחים את ה-thunk של יצירת לקוח עם נתוני הטופס
    dispatch(createClient(form));
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <AppProvider theme={theme}>
      <Box
        sx={{
          maxWidth: 400,
          mx: 'auto',
          mt: 6,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        {isAuthenticated && client && !createLoading && !createError ? (
          <Typography variant="h6" align="center" color="success.main">
            Thank you for signing up!
          </Typography>
        ) : (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit} autoComplete="off">
              <Stack spacing={2}>
                <TextField
                  label="ID"
                  name="id"
                  value={form.id}
                  onChange={handleChange}
                  inputProps={{ maxLength: 10 }}
                  required
                  fullWidth
                  error={!!errors.id}
                  helperText={errors.id}
                />
                <TextField
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  inputProps={{ maxLength: 10 }}
                  required
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  inputProps={{ maxLength: 10 }}
                  required
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: '1900-01-01', max: todayStr }}
                  required
                  fullWidth
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                />
                <TextField
                  label="Phone Number"
                  name="numberPhone"
                  value={form.numberPhone}
                  onChange={handleChange}
                  inputProps={{ maxLength: 10 }}
                  required
                  fullWidth
                  error={!!errors.numberPhone}
                  helperText={errors.numberPhone}
                />
                <TextField
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  inputProps={{ maxLength: 100 }} // שיניתי לאורך סביר יותר לכתובת
                  required
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  inputProps={{ maxLength: 100 }}
                  required
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={createLoading}>
                  {createLoading ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </Stack>
            </form>
            {/* הצגת שגיאות מה-Redux store */}
           {createError && (
  <Typography color="error" align="center" mt={2}>
    {createError.message || 'An unknown error occurred.'} {/* <-- תיקון כאן! */}
  </Typography>
)}

            {/* Confirmation Popup */}
            <Dialog open={openDialog} onClose={handleDialogCancel}>
              <DialogTitle>Confirm Your Details</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please confirm your details before signing up:
                </DialogContentText>
                <Box sx={{ mt: 2 }}>
                  <Typography><b>ID:</b> {form.id}</Typography>
                  <Typography><b>First Name:</b> {form.firstName}</Typography>
                  <Typography><b>Last Name:</b> {form.lastName}</Typography>
                  <Typography><b>Date of Birth:</b> {form.dateOfBirth}</Typography>
                  <Typography><b>Phone Number:</b> {form.numberPhone}</Typography>
                  <Typography><b>Address:</b> {form.address}</Typography>
                  <Typography><b>Email:</b> {form.email}</Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogCancel} color="secondary">Cancel</Button>
                <Button onClick={handleDialogOk} color="primary" variant="contained" disabled={createLoading}>OK</Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Box>
    </AppProvider>
  );
}