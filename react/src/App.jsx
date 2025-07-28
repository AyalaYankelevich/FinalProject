// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setClient, logoutClient } from './redux/clientSlice';
import { setAttendant, logoutAttendant,} from './redux/attendentSlice';
import { fetchClientById, fetchAttendantById } from './redux/thunk';
import './App.css'; 
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp';
import ClientPage from './components/Clientpage/Clientpage'; 
import AttendantPage from './components/AttendentSelectionFlow/AttendentPage'; 
import PageCalander from './components/PageCalander'; 

// קומפוננטה עזר למסלולים מוגנים (Private Routes)
const PrivateRoute = ({ children, allowedRoles }) => {
  // נבדוק את סטטוס האימות מכל Slice
  const { isAuthenticated: clientIsAuthenticated, client } = useSelector((state) => state.client);
  const { isAuthenticated: attendantIsAuthenticated, attendant } = useSelector((state) => state.attendant);
  const dispatch = useDispatch();

  // קביעת התפקיד המאומת ואובייקט המשתמש
  const userRole = clientIsAuthenticated ? 'client' : (attendantIsAuthenticated ? 'attendant' : null);
  const isAuthenticated = clientIsAuthenticated || attendantIsAuthenticated;

  // אם המשתמש לא מאומת, נווט לדף ההתחברות
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // אם המשתמש מאומת אך תפקידו אינו מורשה, נווט לדף "לא מורשה"
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // הצג את הקומפוננטה המוגנת
  return children;
};
// ---

const App = () => {
  const dispatch = useDispatch();

  // גישה לסטטוס האימות מכל Slice
  const { isAuthenticated: clientIsAuthenticated } = useSelector((state) => state.client);
  const { isAuthenticated: attendantIsAuthenticated } = useSelector((state) => state.attendant);

  // קביעת התפקיד המאומת לשימוש כללי בניווט
  const userRole = clientIsAuthenticated ? 'client' : (attendantIsAuthenticated ? 'attendant' : null);
  const isAuthenticated = clientIsAuthenticated || attendantIsAuthenticated;

  // אפקט לטעינת פרטי משתמש מ-localStorage לאחר רענון/טעינה ראשונית
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('userRole');

    // טען משתמש מה-localStorage רק אם יש ID ותפקיד, והמשתמש עדיין לא מאומת בסטייט
    if (userId && storedRole) {
      if (storedRole === 'client' && !clientIsAuthenticated) {
        // אם יש ID ותפקיד 'client' אך הלקוח לא מאומת בסטייט, נסה לטעון אותו
        dispatch(fetchClientById(parseInt(userId)));
      } else if (storedRole === 'attendant' && !attendantIsAuthenticated) {
        // אם יש ID ותפקיד 'attendant' אך המטפל לא מאומת בסטייט, נסה לטעון אותו
        dispatch(fetchAttendantById(parseInt(userId)));
      }
    }
    // התלויות (dependencies) של ה-useEffect: ירוץ רק אם ה-dispatch או סטטוס האימות משתנים
  }, [dispatch, clientIsAuthenticated, attendantIsAuthenticated]);

  // פונקציה לטיפול ביציאה מהמערכת
  const handleSignOut = () => {
    dispatch(logoutClient()); // נקה את סטייט הלקוח
    dispatch(logoutAttendant()); // נקה את סטייט המטפל
  };

  return (
    <BrowserRouter>
      <nav className="main-nav">
        <div className="nav-left">
          <NavLink to="/" className="nav-link">Home</NavLink>
        </div>
        <div className="nav-right">
          {!isAuthenticated ? ( // אם המשתמש לא מאומת, הצג כפתורי הרשמה והתחברות
            <>
              <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
              <NavLink to="/login" className="nav-link">Log In</NavLink>
            </>
          ) : ( // אם המשתמש מאומת, הצג כפתורים רלוונטיים ותפריט יציאה
            <>
              {userRole === 'client' && (
                <NavLink to="/Clientpage" className="nav-link">My Profile</NavLink>
              )}
              {userRole === 'attendant' && (
                <NavLink to="/AttendantPage" className="nav-link">Attendant Dashboard</NavLink>
              )}
              <button onClick={handleSignOut} className="nav-link sign-out-button">Sign Out</button>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        {/* נתיב לדף "לא מורשה" */}
        <Route path='/unauthorized' element={<div>You are not authorized to view this page.</div>} />

        {/* נתיב מוגן לדף הלקוח */}
        <Route
          path="/Clientpage"
          element={
            <PrivateRoute allowedRoles={['client']}>
              <ClientPage />
            </PrivateRoute>
          }
        />
        {/* נתיב מוגן לדף המטפל */}
        <Route
          path="/AttendantPage"
          element={
            <PrivateRoute allowedRoles={['attendant']}>
              <AttendantPage />
            </PrivateRoute>
          }
        />
        {/* נתיב מוגן לדף לוח השנה (עם פרמטר attendentId) */}
        <Route
          path="/PageCalander/:attendentId"
          element={
            <PrivateRoute allowedRoles={['client', 'attendant']}>
              <PageCalander />
            </PrivateRoute>
          }
        />

        {/* ניתוב ראשי לאחר התחברות - מונע חזרה לדף הבית אם כבר מחוברים */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              userRole === 'client' ? <Navigate to="/Clientpage" replace /> :
              userRole === 'attendant' ? <Navigate to="/AttendantPage" replace /> :
              <Home /> // אם תפקיד לא מוגדר מסיבה כלשהי, חזור לדף הבית
            ) : <Home />
          }
        />
        {/* ניתוב מדף הלוגין - מונע לוגין מחדש אם כבר מחוברים */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              userRole === 'client' ? <Navigate to="/Clientpage" replace /> :
              userRole === 'attendant' ? <Navigate to="/AttendantPage" replace /> :
              <Home /> // אם תפקיד לא מוגדר מסיבה כלשהי, חזור לדף הבית
            ) : <LogIn />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;