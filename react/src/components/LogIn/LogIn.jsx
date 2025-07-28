// src/components/LogIn/LogIn.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { loginClient, loginAttendant } from '../../redux/thunk'; // ייבוא הת'אנקים ללוגין
import { clearClientErrors } from '../../redux/clientSlice'; // ייבוא פעולת ניקוי שגיאות עבור הלקוח
import { clearAttendantErrors } from '../../redux/attendentSlice'; // ייבוא פעולת ניקוי שגיאות עבור המטפל (ודא שהנתיב ושם הקובץ נכונים, כלומר 'attendentSlice' אם זה השם שלו)
import './login.css'; // קובץ ה-CSS עבור העיצוב של דף הלוגין

const LogIn = () => {
  const [id, setId] = useState(''); // סטייט עבור שדה קלט המזהה (ID)
  const dispatch = useDispatch(); // הוק של Redux לביצוע פעולות
  const navigate = useNavigate(); // הוק של React Router לניווט בין דפים

  // שליפת נתונים רלוונטיים מסטייט ה-Redux עבור הלקוח
  const { 
    client, 
    loginLoading: clientLoginLoading, 
    loginError: clientLoginError, 
    isAuthenticated: clientIsAuthenticated 
  } = useSelector((state) => state.client);

  // שליפת נתונים רלוונטיים מסטייט ה-Redux עבור המטפל
  const { 
    attendant, 
    loginLoading: attendantLoginLoading, 
    loginError: attendantLoginError, 
    isAuthenticated: attendantIsAuthenticated 
  } = useSelector((state) => state.attendant);

  // מצבי טעינה ושגיאה מאוחדים לטובת ממשק המשתמש
  const overallLoading = clientLoginLoading || attendantLoginLoading;
  // נציג שגיאת מטפל אם קיימת, אחרת שגיאת לקוח
  const overallError = attendantLoginError || clientLoginError;

  // אפקט לטיפול בניווט מיידי אם המשתמש כבר מאומת (לדוגמה, לאחר רענון דף והנתונים נטענו מ-localStorage)
  useEffect(() => {
    // נקה שגיאות בכל טעינה מחדש של הקומפוננטה
    dispatch(clearClientErrors());
    dispatch(clearAttendantErrors());

    const storedRole = localStorage.getItem('userRole');

    // אם הלקוח מאומת ומוגדר כ'client' ב-localStorage, נווט לדף הלקוח
    if (clientIsAuthenticated && storedRole === 'client' && client) {
      navigate('/Clientpage');
    } 
    // אחרת, אם המטפל מאומת ומוגדר כ'attendant' ב-localStorage, נווט לדף המטפל
    else if (attendantIsAuthenticated && storedRole === 'attendant' && attendant) {
      navigate('/AttendantPage');
    }
  }, [dispatch, clientIsAuthenticated, attendantIsAuthenticated, client, attendant, navigate]);

  // פונקציה לטיפול בלחיצה על כפתור ההתחברות
  const handleSignIn = async (e) => {
    e.preventDefault(); // מנע את טעינת הדף מחדש
    if (!id.trim()) { // וודא שה-ID אינו ריק
      return;
    }
    
    // נקה שגיאות קודמות לפני כל ניסיון התחברות חדש
    dispatch(clearClientErrors());
    dispatch(clearAttendantErrors());

    // 1. נסה להתחבר כלקוח
    const clientResult = await dispatch(loginClient(id));

    // אם ההתחברות כלקוח הצליחה (הת'אנק חזר עם fulfilled)
    if (loginClient.fulfilled.match(clientResult)) {
      navigate('/Clientpage'); // נווט לדף הלקוח
    } else {
      // 2. אם התחברות כלקוח נכשלה, נסה להתחבר כמטפל
      const attendantResult = await dispatch(loginAttendant(id));

      // אם ההתחברות כמטפל הצליחה (הת'אנק חזר עם fulfilled)
      if (loginAttendant.fulfilled.match(attendantResult)) {
        navigate('/AttendantPage'); // נווט לדף המטפל
      } else {
        // 3. אם גם התחברות כמטפל נכשלה, ה-ID לא נמצא.
        // נוציא את הודעת השגיאה ונציע הרשמה
        const errorPayload = attendantResult.payload; // זהו אובייקט השגיאה מה-rejectWithValue
        if (errorPayload && (errorPayload.message === "משתמש לא נמצא." || errorPayload.message === "מטפל לא נמצא." || errorPayload.message.includes("not found"))) {
          navigate('/signup'); // נווט לדף ההרשמה
        }
        // אחרת, ה-overallError כבר יציג את השגיאה המתאימה (לדוגמה: "Incorrect password")
      }
    }
  };

  return (
    <div className='overlay'>
      <div className='login-container'>
        <h2>התחברות</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="הזן את המזהה שלך"
            value={id}
            onChange={e => setId(e.target.value)}
            className='login-input'
            required
          />
          <button
            type="submit"
            disabled={overallLoading || !id.trim()} // כפתור מושבת בזמן טעינה או אם השדה ריק
            className='login-button'
          >
            {overallLoading ? 'טוען...' : 'התחבר'} {/* שינוי טקסט הכפתור בזמן טעינה */}
          </button>
        </form>
        {overallError && <p className='error-message'>{overallError}</p>} {/* הצגת הודעת שגיאה */}

        <p style={{ marginTop: '1rem' }}>
          אין לך חשבון? <a onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>הירשם/י כאן</a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;