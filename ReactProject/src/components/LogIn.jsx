// import React, { useState } from 'react';
// import { fetchData } from '../api';
// import SignUp from './SignUp'; // Make sure the path is correct
// import { ThemeProvider } from '@mui/material/styles';
// import { AppProvider } from '@toolpad/core';

// const LogIn = ({ signUp }) => {
//   const [id, setId] = useState('');
//   const [client, setClient] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showSignUp, setShowSignUp] = useState(false);

//   const handleSignIn = async () => {
//     setLoading(true);
//     setError('');
//     setClient(null);
//     try {
//       const data = await fetchData('Client', 'get', { id });
//       setClient(data);
//       setShowSignUp(false); // Hide sign up if user is found
//     } catch (err) {
//       setError('ID not found. Please sign up.');
//       setShowSignUp(true); // Show sign up if user not found
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
//       <h2>Sign In</h2>
//       <input
//         type="text"
//         placeholder="Enter your ID"
//         value={id}
//         onChange={(e) => setId(e.target.value)}
//         style={{
//           width: '100%',
//           padding: '0.8rem',
//           marginBottom: '1rem',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//         }}
//       />
//       <button
//         onClick={handleSignIn}
//         disabled={loading || !id}
//         style={{
//           width: '100%',
//           padding: '0.8rem',
//           backgroundColor: '#0078d4',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           fontSize: '1rem',
//           fontWeight: 'bold',
//           cursor: loading || !id ? 'not-allowed' : 'pointer',
//           opacity: loading || !id ? 0.7 : 1,
//         }}
//       >
//         {loading ? 'טוען...' : 'Sign In'}
//       </button>
//       {error && <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}
//       {client && (
//         <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
//           <h4>פרטי לקוח:</h4>
//           <pre>{JSON.stringify(client, null, 2)}</pre>
//         </div>
//       )}
//       {showSignUp && (
//         <AppProvider >
//           <SignUp onSignUp={signUp} />
//         </AppProvider>
//       )}
//     </div>
//   );
// };

// export default LogIn;
import React, { useState } from 'react';
import { fetchData } from '../api';
import SignUp from './SignUp'; // path must be correct
import { AppProvider } from '@toolpad/core';

const LogIn = ({ signUp }) => {
  const [id, setId] = useState('');
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    setClient(null);
    try {
      const data = await fetchData('Client', 'get', { id }, 'get');
      setClient(data);
      setShowSignUp(false); // Hide sign up if user is found
    } catch (err) {
      setError('ID not found. Please sign up.');
      setShowSignUp(true); // Show sign up if user not found
    }
    setLoading(false);
  };

  // --- THIS IS THE IMPORTANT PART ---
  if (showSignUp) {
    // Show only the sign up form, nothing else
    return (
      <AppProvider>
        <SignUp onSignUp={signUp} />
      </AppProvider>
    );
  }

  // Otherwise, show the login form
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Enter your ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{
          width: '100%',
          padding: '0.8rem',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      <button
        onClick={handleSignIn}
        disabled={loading || !id}
        style={{
          width: '100%',
          padding: '0.8rem',
          backgroundColor: '#0078d4',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: loading || !id ? 'not-allowed' : 'pointer',
          opacity: loading || !id ? 0.7 : 1,
        }}
      >
        {loading ? 'טוען...' : 'Sign In'}
      </button>
      {error && <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}
      {client && (
        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <h4>פרטי לקוח:</h4>
          <pre>{JSON.stringify(client, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default LogIn;