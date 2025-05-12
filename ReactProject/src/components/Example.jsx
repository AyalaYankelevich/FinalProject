import React, { useState, useEffect } from "react";
import { fetchData } from "../api";


const Example = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData()
        .then(data => {
            console.log("Fetched Data:", data);
            setUsers(data);
        })
            .catch(err => setError(err));
    }, []);

    return (
        <div>
            <h1>Users</h1>
            {error ? <p>Error: {error}</p> : null}

                {users.map(user => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName} - {user.numberPhone}
                    </li>
                ))}
        </div>
    );
}

export default Example;