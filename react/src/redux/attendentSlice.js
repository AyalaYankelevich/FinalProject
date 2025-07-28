// import { createSlice } from "@reduxjs/toolkit";
// import { fetchDataAsyncAction } from "./thunk";

// const  attendentSlice = createSlice({
//     name: "attendent",
//     initialState: {
//         attendentList: [],
//         loading: false,
//         error: false
//     },
//     reducers: {
       
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchDataAsyncAction.pending, (state) => {
//                 state.loading = true;
//                 state.attendentList = [];
//                 state.error = false;
//             })
//             .addCase(fetchDataAsyncAction.fulfilled, (state, action) => {
//                state.attendentList = action.payload;
//                state.loading = false;
//                state.error = false;
//             })
//             .addCase(fetchDataAsyncAction.rejected, (state) => {
//                 state.loading = false;
//                 state.error = true;
//             })
//     }
// });
 
// export default attendentSlice.reducer;



// src/redux/attendantSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { loginAttendant } from "./thunk"; // ודא שאתה מייבא את הת'אנק הנכון

// const initialState = {
//   attendant: null, // ייצג את המטפל המחובר
//   loading: false,
//   error: null,
//   loginLoading: false, // מצב טעינה ללוגין של מטפל
//   loginError: null, // שגיאת לוגין של מטפל
//   isAuthenticated: !!localStorage.getItem('userId') && localStorage.getItem('userRole') === 'attendant', // מאומת כמטפל
// };

// const attendantSlice = createSlice({
//   name: "attendant",
//   initialState,
//   reducers: {
//     setAttendant(state, action) { // פונקציה לעדכון המטפל ידנית
//       state.attendant = action.payload;
//       state.isAuthenticated = !!action.payload;
//       state.loginError = null; // נקה שגיאות בלוגין
//       if (action.payload) {
//         localStorage.setItem('userId', action.payload.id);
//         localStorage.setItem('userRole', 'attendant');
//       } else {
//         localStorage.removeItem('userId');
//         localStorage.removeItem('userRole');
//       }
//     },
//     clearAttendantErrors(state) { // נקה שגיאות עבור ה-attendantSlice
//       state.error = null;
//       state.loginError = null;
//     },
//     logoutAttendant(state) { // פונקציית יציאה עבור מטפל ספציפית
//       state.attendant = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('userId');
//       localStorage.removeItem('userRole');
//     },
//   },
//   extraReducers: (builder) => {
//     // --- טיפול ב-loginAttendant ---
//     builder
//       .addCase(loginAttendant.pending, (state) => {
//         state.loginLoading = true;
//         state.loginError = null;
//         state.attendant = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(loginAttendant.fulfilled, (state, action) => {
//         state.loginLoading = false;
//         state.attendant = action.payload; // ה-payload הוא אובייקט המטפל ישירות
//         state.isAuthenticated = true;
//         state.loginError = null;
//         localStorage.setItem('userId', action.payload.id);
//         localStorage.setItem('userRole', 'attendant'); // שמור את התפקיד 'attendant'
//       })
//       .addCase(loginAttendant.rejected, (state, action) => {
//         state.loginLoading = false;
//         state.attendant = null;
//         state.isAuthenticated = false;
//         state.loginError = action.payload?.message || "ההתחברות כמטפל נכשלה.";
//         // לא מנקים localStorage כאן, כי ייתכן שזהו לקוח
//       });
//   },
// });

// export const { setAttendant, clearAttendantErrors, logoutAttendant } = attendantSlice.actions;
// export default attendantSlice.reducer;
// src/redux/attendentSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginAttendant, fetchAttendantById } from "./thunk"; // ודא ש-fetchAttendantById מיובא

const initialState = {
  attendant: null, // אובייקט המטפל המחובר
  loading: false, // מצב טעינה כללי
  error: null, // שגיאות כלליות
  loginLoading: false, // מצב טעינה עבור התחברות
  loginError: null, // שגיאות התחברות
  // קביעת מצב אימות מ-localStorage עם טעינה ראשונית
  isAuthenticated: !!localStorage.getItem('userId') && localStorage.getItem('userRole') === 'attendant',
};

const attendantSlice = createSlice({
  name: "attendant", // שם הסלייס
  initialState, // הסטייט ההתחלתי
  reducers: {
    // פעולה להגדרת המטפל בסטייט
    setAttendant(state, action) {
      state.attendant = action.payload;
      state.isAuthenticated = !!action.payload; // אם יש מטפל, הוא מאומת
      state.loginError = null; // נקה שגיאות התחברות
      if (action.payload) {
        localStorage.setItem('userId', action.payload.id);
        localStorage.setItem('userRole', 'attendant');
      } else {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
      }
    },
    // פעולה לניקוי שגיאות
    clearAttendantErrors(state) {
      state.error = null;
      state.loginError = null;
    },
    // פעולה להתנתקות
    logoutAttendant(state) {
      state.attendant = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
    },
  },
  // טיפול בפעולות אסינכרוניות (Thunks)
  extraReducers: (builder) => {
    builder
      // טיפול ב-loginAttendant
      .addCase(loginAttendant.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
        state.attendant = null;
        state.isAuthenticated = false;
      })
      .addCase(loginAttendant.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.attendant = action.payload; // שמור את נתוני המטפל המלאים
        state.isAuthenticated = true;
        state.loginError = null;
        localStorage.setItem('userId', action.payload.id);
        localStorage.setItem('userRole', 'attendant');
      })
      .addCase(loginAttendant.rejected, (state, action) => {
        state.loginLoading = false;
        state.attendant = null;
        state.isAuthenticated = false;
        state.loginError = action.payload?.message || "ההתחברות כמטפל נכשלה.";
        localStorage.removeItem('userId'); // נקה localStorage במקרה של כישלון
        localStorage.removeItem('userRole');
      })
      // טיפול ב-fetchAttendantById (אחזור פרטי מטפל לפי ID)
      .addCase(fetchAttendantById.pending, (state) => {
        state.loading = true; // מצב טעינה לאחזור פרטים
        state.error = null;
      })
      .addCase(fetchAttendantById.fulfilled, (state, action) => {
        state.loading = false;
        state.attendant = action.payload; // שמור את פרטי המטפל המלאים
        state.isAuthenticated = true; // אם הפרטים נטענו, המשתמש מאומת
        state.error = null;
      })
      .addCase(fetchAttendantById.rejected, (state, action) => {
        state.loading = false;
        state.attendant = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || "אחזור פרטי מטפל נכשל.";
        localStorage.removeItem('userId'); // נקה localStorage במקרה של כישלון באחזור פרטים
        localStorage.removeItem('userRole');
      });
  },
});

// ייצוא פעולות רגילות
export const { setAttendant, clearAttendantErrors, logoutAttendant } = attendantSlice.actions;
// ייצוא ברירת מחדל של הרדיוסר
export default attendantSlice.reducer;