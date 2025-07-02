import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByController } from '../redux/thunk'; // adjust the path as needed
import { clearErrors } from '../redux/clientSlice';
import SignUp from './SignUp';
import { AppProvider } from '@toolpad/core';
import ClientPage from './Clientpage';
const LogIn = ({ signUp }) => {
  const [id, setId] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const dispatch = useDispatch();
  const { client, loginLoading, loginError } = useSelector((state) => state.client);

  // Clear errors when user changes the ID field or reopens login
  useEffect(() => {
    dispatch(clearErrors());
    setShowSignUp(false);
    // eslint-disable-next-line
  }, [id]);

  const handleSignIn = async () => {
    // Dispatch the thunk for login
    const resultAction = await dispatch(
      fetchByController({ controller: 'Client', action: 'get', params: { id }, method: 'get' })
    );
    // If login failed, show sign-up
    if (fetchByController.rejected.match(resultAction)) {
      setShowSignUp(true);
    } else {
      setShowSignUp(false);
    }
  };

  // Show sign up if needed
  if (showSignUp) {
    return (
      <AppProvider>
        <SignUp onSignUp={signUp} />
      </AppProvider>
    );
  }

  // If client is logged in, render client page
  if (client) {
    return <ClientPage client={client} />;
  }

  // Render login form
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>Sign In</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <input
          type="text"
          placeholder="Enter your ID"
          value={id}
          onChange={e => setId(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem',
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          type="submit"
          disabled={loginLoading || !id}
          style={{
            width: '100%',
            padding: '0.8rem',
            backgroundColor: '#0078d4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loginLoading || !id ? 'not-allowed' : 'pointer',
            opacity: loginLoading || !id ? 0.7 : 1,
          }}
        >
          {loginLoading ? 'טוען...' : 'Sign In'}
        </button>
      </form>
      
      {loginError && <p style={{ marginTop: '1rem', color: 'red' }}>{loginError}</p>}
   
    </div>
  );
};

export default LogIn;