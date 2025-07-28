// import React, { useEffect } from "react"; 
// import { useDispatch, useSelector } from "react-redux"; 
// import { fetchByController } from "../../redux/thunk"; 
 
const AttendentPage = () => { 
//   const dispatch = useDispatch(); 
//   const { 
//     // attendent, 
//     appointments, 
//     clients, 
//     appointmentsLoading, 
//     appointmentsError, 
//     clientsLoading, 
//     clientsError, 
//   } = useSelector((state) => state.attendent); 
 
//   useEffect(() => { 
//     if (attendent && attendent.id) { 
//       //  םירות ךושמ 
//       dispatch( 
//         fetchByController({ 
//           controller: "Attendent", 
//           action: "appointments", 
//           params: { attendentId: attendent.id, date: new Date().toISOString().slice(0, 10) }, 
//           method: "get", 
//         }) 
//       ); 
//       // תוחוקל ךושמ 
//       dispatch( 
//         fetchByController({ 
//           controller: "Attendent", 
//           action: "clients", 
//           params: { attendentId: attendent.id }, 
//           method: "get", 
//         }) 
//       ); 
//     } 
//   }, [attendent, dispatch]); 
 
//   if (!attendent) return <div> יארחאכ רבחתהל ךילע </div>; 
 
//   return ( 
//     <div style={{ maxWidth: 700, margin: "2rem auto", direction: "rtl", textAlign: "right" }}> 
//       <h2> םולש {attendent.firstName} {attendent.lastName}!</h2> 
 
//       <h3> םויהל ךלש םירותה :</h3> 
//       {appointmentsLoading ? ( 
//         <p> םירות ןעוט ...</p> 
//       ) : appointmentsError ? ( 
//         <p style={{ color: "red" }}>{appointmentsError}</p> 
//       ) : ( 
//         <ul> 
//           {appointments.length > 0 ? ( 
//             appointments.map((appt, i) => ( 
//               <li key={i}> 
//                 העש : {appt.time} | חוקל : {appt.clientName} | לופיט : {appt.treatment} 
//               </li> 
//             )) 
//           ) : ( 
//             <li> םויהל םירות ןיא </li> 
//           )} 
//         </ul> 
//       )} 
 
//       <h3> ךלש תוחוקלה :</h3> 
//       {clientsLoading ? ( 
//         <p> תוחוקל ןעוט ...</p> 
//       ) : clientsError ? ( 
//         <p style={{ color: "red" }}>{clientsError}</p> 
//       ) : ( 
//         <ul> 
//           {clients.length > 0 ? ( 
//             clients.map((client, i) => ( 
//               <li key={i}> 
//                 {client.name} | ןופלט : {client.phone} 
//               </li> 
//             )) 
//           ) : ( 
//             <li> הגצהל תוחוקל ןיא </li> 
//           )} 
//         </ul> 
//       )} 
//     </div> 
//   ); 

return(
    <></>
)
};
 export default AttendentPage;