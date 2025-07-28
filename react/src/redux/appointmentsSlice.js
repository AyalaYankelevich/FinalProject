// src/redux/appointmentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../api'; // ודא שהנתיב ל-fetchData נכון

// --- Thunks for Appointments ---

// 1. טעינת כל התורים
export const fetchAllAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // API: GET api/ClinicAppointment/get
      const response = await fetchData('ClinicAppointment', 'get', {}, 'get');
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch all appointments');
    }
  }
);

// 2. טעינת תורים לפי לקוח
export const fetchAppointmentsByClient = createAsyncThunk(
  'appointments/fetchByClient',
  async (clientId, { rejectWithValue }) => {
    try {
      // API: GET api/ClinicAppointment/getByClientId?id={clientId}
      const response = await fetchData('ClinicAppointment', 'getByClientId', { id: clientId }, 'get');
      return response;
    } catch (error) {
      return rejectWithValue(error.message || `Failed to fetch appointments for client ${clientId}`);
    }
  }
);
// 3. טעינת תורים לפי מטפל
export const fetchAppointmentsByAttendant = createAsyncThunk(
  'appointments/fetchByAttendant',
  async (attendentId, { rejectWithValue }) => {
    try {
      // API: GET api/ClinicAppointment/getByAttendentId?id={attendentId}
      const response = await fetchData('ClinicAppointment', 'getByAttendentId', { id: attendentId }, 'get');
      return response;
    } catch (error) {
      return rejectWithValue(error.message || `Failed to fetch appointments for attendant ${attendentId}`);
    }
  }
);

// 4. יצירת תור חדש
export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      // API: POST api/ClinicAppointment
      // הנתונים נשלחים כ-JSON בגוף הבקשה (FromBody)
      // שימו לב: ה-action הוא מחרוזת ריקה כי אין לו סאב-נתיב ב-POST
      const response = await fetchData('ClinicAppointment', '', appointmentData, 'post');
      return response; // השרת מחזיר Ok("Client updated successfully"), אך אנו נצפה לאובייקט התור אם השרת היה מחזיר אותו
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create appointment');
    }
  }
);

// 5. ביטול תור
export const cancelAppointment = createAsyncThunk(
  'appointments/cancel',
  async (appointmentId, { rejectWithValue }) => {
    try {
      // API: DELETE api/ClinicAppointment/delete/{id}
      // ה-action כולל את ה-ID עבור ה-URL
      const response = await fetchData('ClinicAppointment', `delete/${appointmentId}`, {}, 'delete');
      return response; // השרת מחזיר Ok("Client deleted successfully")
    } catch (error) {
      return rejectWithValue(error.message || `Failed to cancel appointment ${appointmentId}`);
    }
  }
);

// 6. עדכון תור (לדוגמה, שינוי שעה/תאריך)
// **חשוב: ודא שיש לך פעולת HTTP PUT בקונטרולר שלך שתקבל את BLClinicAppointment בגוף הבקשה.**
// לדוגמה, אתה יכול להוסיף לקונטרולר שלך:
// [HttpPut]
// public ActionResult<BLClinicAppointment> UpdateClinicAppointment([FromBody] BLClinicAppointment ClinicAppointment) { ... }
export const updateAppointment = createAsyncThunk(
  'appointments/update',
  async (appointmentData, { rejectWithValue }) => {
    try {
      // API: PUT api/ClinicAppointment (אם הוספת פעולת PUT חדשה בקונטרולר)
      const response = await fetchData('ClinicAppointment', '', appointmentData, 'put');
      return response; // השרת אמור להחזיר את התור המעודכן
    } catch (error) {
      return rejectWithValue(error.message || `Failed to update appointment ${appointmentData.Id}`);
    }
  }
);

// ב-appointmentsSlice.js, הוסף ת'אנק חדש לטעינת זמנים פנויים ספציפית:
export const fetchSpecificAvailableTimes = createAsyncThunk(
  'appointments/fetchAvailableTimes',
  async ({ date, attendentId }, { rejectWithValue }) => {
    try {
      // API: GET api/ClinicAppointment/available?date={date}&attendentId={attendentId}
      const response = await fetchData('ClinicAppointment', 'available', { date: date.format('YYYY-MM-DD'), attendentId }, 'get');
      return response; // יחזיר מערך של מחרוזות שעה 'HH:mm'
    } catch (error) {
      return rejectWithValue(error.message || `Failed to fetch available times for ${date.format('YYYY-MM-DD')}`);
    }
  }
);

// --- Appointments Slice (אין שינוי מהותי כאן למעט ב-fulfilled/rejected handler) ---
const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAppointmentsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch All Appointments ---
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false; state.list = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false; state.error = action.payload || 'Failed to fetch all appointments';
      })

      // --- Fetch Appointments By Client ---
      .addCase(fetchAppointmentsByClient.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchAppointmentsByClient.fulfilled, (state, action) => {
        state.loading = false; state.list = action.payload;
      })
      .addCase(fetchAppointmentsByClient.rejected, (state, action) => {
        state.loading = false; state.error = action.payload || 'Failed to fetch client appointments';
      })

      // --- Fetch Appointments By Attendant ---
      .addCase(fetchAppointmentsByAttendant.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchAppointmentsByAttendant.fulfilled, (state, action) => {
        state.loading = false; state.list = action.payload;
      })
      .addCase(fetchAppointmentsByAttendant.rejected, (state, action) => {
        state.loading = false; state.error = action.payload || 'Failed to fetch attendant appointments';
      })

      // --- Create Appointment ---
      .addCase(createAppointment.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        // חשוב: אם השרת מחזיר הודעת הצלחה (כמו "Client updated successfully"),
        // ולא את אובייקט התור שנוצר, לא נוכל להוסיף אותו ל-list כאן.
        // עדיף שהשרת יחזיר את אובייקט ה-BLClinicAppointment שנוצר.
        // אם הוא לא מחזיר, תצטרך לטעון מחדש את רשימת התורים (לדוגמה, fetchAppointmentsByClient)
        // או להניח מבנה נתונים מסוים.
        // לצורך הדוגמה, נניח שהשרת יחזיר את האובייקט שנוצר אם זה פועל כך ב-BL.
        // אם לא, פשוט תמחק את השורה הבאה ובצע רענון לרשימה לאחר ההצלחה.
        // state.list.push(action.payload); // רק אם ה-payload הוא התור שנוצר
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false; state.error = action.payload || 'Failed to create appointment';
      })

      // --- Cancel Appointment ---
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        // הנחה: השרת מחזיר הצלחה בלבד. נסיר את התור מהרשימה לפי ה-ID שנשלח.
        const canceledAppointmentId = action.meta.arg;
        state.list = state.list.filter(app => app.Id !== canceledAppointmentId);
        // אם השרת רק משנה את IsReserved ל-0, אז נצטרך לעדכן את השדה:
        // const index = state.list.findIndex(app => app.Id === canceledAppointmentId);
        // if (index !== -1) { state.list[index].IsReserved = 0; }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false; state.error = action.payload || 'Failed to cancel appointment';
      })

      // --- Update Appointment ---
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        // הנחה: השרת מחזיר את התור המעודכן ב-payload
        // אם השרת מחזיר רק הודעת הצלחה, תצטרך לרענן את רשימת התורים.
        const updatedAppointment = action.payload;
        const index = state.list.findIndex(app => app.Id === updatedAppointment.Id);
        if (index !== -1) {
          state.list[index] = updatedAppointment;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false; state.error = action.payload || 'Failed to update appointment';
      })
      .addCase(fetchSpecificAvailableTimes.pending, (state) => {
  state.loading = true; state.error = null;
})
.addCase(fetchSpecificAvailableTimes.fulfilled, (state, action) => {
  state.loading = false;
  // חשוב: כאן נרצה לשמור את הזמנים הפנויים במקום אחר בסטייט,
  // כי 'list' אמור להכיל אובייקטי תור מלאים.
  // נשנה את ה-initialState ב-appointmentsSlice.js:
  // initialState: { list: [], availableTimesList: [], loading: false, error: null }
  state.availableTimesList = action.payload; // זהו מערך של מחרוזות שעה
})
.addCase(fetchSpecificAvailableTimes.rejected, (state, action) => {
  state.loading = false; state.error = action.payload || 'Failed to fetch available times';
});   
  },
});


export const { clearAppointmentsError } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;