import React, { useState } from "react";
import { fetchData } from "../api";

const Example = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    // פונקציה שמבוצעת כאשר לוחצים על הכפתור
    const handleFetchData = () => {
        fetchData('Client', 'getAll')
            .then(data => {
                // console.log("Fetched Data:", data);
                setUsers(data);
            })
            .catch(err => setError(err));
    };

    return (
        <div>
            <h1>Users</h1>
            {/* כפתור לטעינת הנתונים */}
            <button onClick={handleFetchData}>Load Users</button>
            {error ? <p>Error: {error}</p> : null}

            {/* הצגת המשתמשים */}
            {users.map(user => (
                <li key={user.id}>
                    {user.firstName} {user.lastName} - {user.numberPhone}
                </li>
            ))}
        </div>
    );
};

export default Example;