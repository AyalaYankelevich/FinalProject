import React, { useState, useEffect } from "react";
import { fetchData } from "../api";


const Home = () => {
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
            <h1>Home</h1>

        </div>
    );
}

export default Home;