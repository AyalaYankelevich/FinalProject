// src/components/ClientPage/AttendentSelectionFlow.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../api';
import ChooseAttendentKind from '../ChooseAttendentKind/ChooseAttendentKind';
import './AttendentSelectionFlow.css';

const AttendentSelectionFlow = ({ clientId, onClose }) => {
  const navigate = useNavigate();

  const [attendents, setAttendents] = useState([]);
  const [loadingAttendents, setLoadingAttendents] = useState(false);
  const [error, setError] = useState("");

  const handleAttendentKindChosen = async (kindNumber) => {
    setLoadingAttendents(true);
    setAttendents([]);
    setError("");
    try {
      const data = await fetchData('Attendent', 'getByKind', { kind: kindNumber }, 'get');
      setAttendents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch attendents");
      setAttendents([]);
    }
    setLoadingAttendents(false);
  };

  const handleSelectAttendentAndNavigateToCalendar = (attendentId) => {
    navigate(`/PageCalander/${attendentId}`, { state: { clientId: clientId } });
  };

  return (
    <div className="overlay">
      <ChooseAttendentKind onKindChosen={handleAttendentKindChosen} />
      {loadingAttendents && <div className="loading-attendents">טוען מטפלים...</div>}
      {error && <p className="attendent-error-message">{error}</p>}

      {attendents.length > 0 && (
        <div className="attendent-list-container">
          <h3>בחר מטפל:</h3>
          {attendents.map((att) => (
            <div className="attendent-card" key={att.id}>
              <div>
                <strong>{att.firstName} {att.lastName}</strong><br/>
                {att.email && <span>{att.email}</span>}
              </div>
              <button
                className="attendent-button attendent-button-book" 
                onClick={() => handleSelectAttendentAndNavigateToCalendar(att.id)}
              >
                קבע תור
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="attendent-button attendent-button-back" // שימוש במספר מחלקות
        onClick={onClose}
      >
        חזור
      </button>
    </div>
  );
};

export default AttendentSelectionFlow;