import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchByController } from "../redux/thunk"; // Adjust path as needed

const Example = () => {
  const dispatch = useDispatch();

  const { clientList, loading, error } = useSelector((state) => state.client);

  const handleFetchData = () => {
    dispatch(fetchByController({ controller: "Client", action: "getAll" }));
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleFetchData} disabled={loading}>
        {loading ? "Loading..." : "Load Users"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {clientList.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.numberPhone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Example;