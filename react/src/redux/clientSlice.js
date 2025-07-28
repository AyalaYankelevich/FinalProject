// // src/redux/clientSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// // ייבוא הת'אנקים הספציפיים שהגדרנו בקובץ thunks.js
// // וודא שהנתיב לקובץ thunks.js נכון בפרויקט שלך
// import { loginClient, createClient, fetchAllClients } from "./thunk"; 

// // מצב התחלתי של הסלייס
// const initialState = {
//   clientList: [], // לרשימת כל הלקוחות (אם נדרש)
//   client: null, // ללקוח המחובר או ללקוח שנוצר
//   loading: false, // מצב טעינה כללי (לדוגמה, עבור fetchAllClients)
//   error: null, // שגיאה כללית (לדוגמה, עבור fetchAllClients)
//   loginLoading: false, // מצב טעינה עבור תהליך התחברות
//   loginError: null, // שגיאה ספציפית לתהליך התחברות
//   createLoading: false, // מצב טעינה עבור תהליך יצירת לקוח (הרשמה)
//   createError: null, // שגיאה ספציפית לתהליך יצירת לקוח
//   // מצב האם המשתמש מאומת. מאותחל לפי קיום 'clientId' ב-localStorage
//   isAuthenticated: !!localStorage.getItem('clientId'), 
// };

// const clientSlice = createSlice({
//   name: "client", // שם הסלייס
//   initialState, // המצב ההתחלתי
//   reducers: {
//     // פעולה להתנתקות משתמש
//     logoutClient(state) {
//       state.client = null; // נקה את אובייקט הלקוח
//       state.loginError = null; // נקה שגיאות התחברות
//       state.isAuthenticated = false; // עדכן ללא מאומת
//       localStorage.removeItem('clientId'); // הסר את ה-ID מהאחסון המקומי
//       // אם אתה משתמש בטוקן אימות, נקה גם אותו: localStorage.removeItem('token');
//     },
//     // פעולה לניקוי כל השגיאות הנוכחיות
//     clearClientErrors(state) {
//       state.error = null;
//       state.loginError = null;
//       state.createError = null;
//     },
//     // פעולה לעדכון הלקוח מנתונים שנשמרו (לדוגמה, מה-localStorage באתחול האפליקציה)
//     setClientFromStorage(state, action) {
//       state.client = action.payload;
//       state.isAuthenticated = !!action.payload; // אם קיים payload, המשתמש מאומת
//     },
//   },
//   extraReducers: (builder) => {
//     // --- טיפול בתהליך התחברות באמצעות loginClient thunk ---
//     builder
//       .addCase(loginClient.pending, (state) => {
//         state.loginLoading = true; // הגדר מצב טעינה
//         state.loginError = null; // נקה שגיאות קודמות
//         state.client = null; // וודא שאובייקט הלקוח ריק לפני ניסיון התחברות
//       })
//       .addCase(loginClient.fulfilled, (state, action) => {
//         state.loginLoading = false; // סיים טעינה
//         state.client = action.payload; // שמור את נתוני הלקוח שהתקבלו
//         state.isAuthenticated = true; // הגדר כמאומת
//         state.loginError = null; // נקה שגיאות
//         localStorage.setItem('clientId', action.payload.id); // שמור את ה-ID ב-localStorage
//       })
//       .addCase(loginClient.rejected, (state, action) => {
//         state.loginLoading = false; // סיים טעינה
//         state.client = null; // נקה את אובייקט הלקוח
//         state.isAuthenticated = false; // הגדר כלא מאומת
//         // שמור את הודעת השגיאה. אם ה-payload הוא אובייקט, נסה לגשת למאפיין 'message'
//         state.loginError = action.payload?.message || action.payload || "ההתחברות נכשלה.";
//         localStorage.removeItem('clientId'); // נקה ID לא תקף/לא מאומת מהאחסון המקומי
//       });

//     // --- טיפול בתהליך יצירת לקוח (הרשמה) באמצעות createClient thunk ---
//     builder
//       .addCase(createClient.pending, (state) => {
//         state.createLoading = true; // הגדר מצב טעינה
//         state.createError = null; // נקה שגיאות קודמות
//         state.client = null; // נקה לקוח קיים לפני יצירת חדש
//       })
//       .addCase(createClient.fulfilled, (state, action) => {
//         state.createLoading = false; // סיים טעינה
//         state.client = action.payload; // שמור את נתוני הלקוח שנוצר
//         state.isAuthenticated = true; // הגדר כמאומת לאחר הרשמה מוצלחת
//         state.createError = null; // נקה שגיאות
//         localStorage.setItem('clientId', action.payload.id); // שמור את ה-ID ב-localStorage
//       })
//       .addCase(createClient.rejected, (state, action) => {
//         state.createLoading = false; // סיים טעינה
//         state.client = null; // נקה את אובייקט הלקוח
//         state.isAuthenticated = false; // הגדר כלא מאומת
//         // שמור את הודעת השגיאה
//         state.createError = action.payload?.message || action.payload || "ההרשמה נכשלה.";
//         localStorage.removeItem('clientId');
//       });

//     // --- טיפול בתהליך אחזור כל הלקוחות (אם עדיין בשימוש) באמצעות fetchAllClients thunk ---
//     builder
//       .addCase(fetchAllClients.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllClients.fulfilled, (state, action) => {
//         state.loading = false;
//         state.clientList = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchAllClients.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || action.payload || "אחזור לקוחות נכשל.";
//       });
//   },
// });

// export const { logoutClient, clearClientErrors, setClientFromStorage } = clientSlice.actions;
// export default clientSlice.reducer;
// src/redux/clientSlice.js
import { createSlice } from "@reduxjs/toolkit";
// וודא שהנתיב לקובץ thunk.js נכון בפרויקט שלך
import { loginClient, createClient, fetchAllClients } from "./thunk"; 

// מצב התחלתי של הסלייס
const initialState = {
  clientList: [], // לרשימת כל הלקוחות (אם נדרש)
  client: null, // ללקוח המחובר או ללקוח שנוצר
  loading: false, // מצב טעינה כללי (לדוגמה, עבור fetchAllClients)
  error: null, // שגיאה כללית (לדוגמה, עבור fetchAllClients)
  loginLoading: false, // מצב טעינה עבור תהליך התחברות
  loginError: null, // שגיאה ספציפית לתהליך התחברות
  createLoading: false, // מצב טעינה עבור תהליך יצירת לקוח (הרשמה)
  createError: null, // שגיאה ספציפית לתהליך יצירת לקוח
  // מצב האם המשתמש מאומת. מאותחל לפי קיום 'userId' ב-localStorage ותפקיד 'client'
  isAuthenticated: !!localStorage.getItem('userId') && localStorage.getItem('userRole') === 'client', 
};

const clientSlice = createSlice({
  name: "client", // שם הסלייס
  initialState, // המצב ההתחלתי
  reducers: {
    // פעולה לעדכון הלקוח באופן ידני (לדוגמה, מטעינה מ-localStorage באתחול האפליקציה)
    // השם שונה ל-setClient כדי לא להתנגש עם setClientFromStorage אם אתה משתמש בשניהם
    setClient(state, action) { 
      state.client = action.payload;
      state.isAuthenticated = !!action.payload; 
      state.loginError = null; // נקה שגיאות בלוגין
      if (action.payload) {
        localStorage.setItem('userId', action.payload.id);
        localStorage.setItem('userRole', 'client'); // וודא ששומרים את התפקיד 'client'
      } else {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
      }
    },
    
    // פעולה לניקוי כל השגיאות הנוכחיות בסלייס זה
    clearClientErrors(state) {
      state.error = null;
      state.loginError = null;
      state.createError = null;
    },

    // פעולה להתנתקות משתמש ספציפית ללקוח
    logoutClient(state) {
      state.client = null; // נקה את אובייקט הלקוח
      state.isAuthenticated = false; // עדכן ללא מאומת
      state.loginError = null; // נקה שגיאות התחברות
      localStorage.removeItem('userId'); // הסר את ה-ID מהאחסון המקומי
      localStorage.removeItem('userRole'); // הסר את התפקיד מהאחסון המקומי
    },
  },
  extraReducers: (builder) => {
    // --- טיפול בתהליך התחברות באמצעות loginClient thunk ---
    builder
      .addCase(loginClient.pending, (state) => {
        state.loginLoading = true; // הגדר מצב טעינה
        state.loginError = null; // נקה שגיאות קודמות
        state.client = null; // וודא שאובייקט הלקוח ריק לפני ניסיון התחברות
        state.isAuthenticated = false; // הגדר כלא מאומת
      })
      .addCase(loginClient.fulfilled, (state, action) => {
        state.loginLoading = false; // סיים טעינה
        state.client = action.payload; // שמור את נתוני הלקוח שהתקבלו
        state.isAuthenticated = true; // הגדר כמאומת
        state.loginError = null; // נקה שגיאות
        localStorage.setItem('userId', action.payload.id); // שמור את ה-ID ב-localStorage
        localStorage.setItem('userRole', 'client'); // שמור את התפקיד 'client'
      })
      .addCase(loginClient.rejected, (state, action) => {
        state.loginLoading = false; // סיים טעינה
        state.client = null; // נקה את אובייקט הלקוח
        state.isAuthenticated = false; // הגדר כלא מאומת
        // שמור את הודעת השגיאה. אם ה-payload הוא אובייקט, נסה לגשת למאפיין 'message'
        state.loginError = action.payload?.message || "ההתחברות כלקוח נכשלה.";
        // חשוב: לא מנקים localStorage כאן, כי ייתכן שזהו מטפל ורק ניסיון הלקוח נכשל.
        // הניקוי יקרה רק אם גם מטפל נכשל (ב-attendantSlice)
      });

    // --- טיפול בתהליך יצירת לקוח (הרשמה) באמצעות createClient thunk ---
    builder
      .addCase(createClient.pending, (state) => {
        state.createLoading = true; // הגדר מצב טעינה
        state.createError = null; // נקה שגיאות קודמות
        state.client = null; // נקה לקוח קיים לפני יצירת חדש
        state.isAuthenticated = false; // הגדר כלא מאומת
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.createLoading = false; // סיים טעינה
        state.client = action.payload; // שמור את נתוני הלקוח שנוצר
        state.isAuthenticated = true; // הגדר כמאומת לאחר הרשמה מוצלחת
        state.createError = null; // נקה שגיאות
        localStorage.setItem('userId', action.payload.id); // שמור את ה-ID ב-localStorage
        localStorage.setItem('userRole', 'client'); // שמור את התפקיד 'client'
      })
      .addCase(createClient.rejected, (state, action) => {
        state.createLoading = false; // סיים טעינה
        state.client = null; // נקה את אובייקט הלקוח
        state.isAuthenticated = false; // הגדר כלא מאומת
        // שמור את הודעת השגיאה
        state.createError = action.payload?.message || "ההרשמה נכשלה.";
        localStorage.removeItem('userId'); // נקה ID ותפקיד אם ההרשמה נכשלה
        localStorage.removeItem('userRole');
      });

    // --- טיפול בתהליך אחזור כל הלקוחות (אם עדיין בשימוש) באמצעות fetchAllClients thunk ---
    builder
      .addCase(fetchAllClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clientList = action.payload;
        state.error = null;
      })
      .addCase(fetchAllClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "אחזור לקוחות נכשל.";
      });
  },
});

// וודא שכל הפעולות שברצונך לייצא כלולות כאן
export const { setClient, clearClientErrors, logoutClient } = clientSlice.actions;
export default clientSlice.reducer;