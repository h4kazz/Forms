import YoutubeForm from "./components/YoutubeForm";
import "./App.css";
import UsersList from "./components/UsersList";
import { useState, useEffect } from "react";
import { getAlldata } from "./services/get";
import SearchForm from "./components/SearchForm";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const usersList = await getAlldata();
    setUsers(usersList);
  };

  useEffect(() => {
    const getData = async () => {
      await fetchUsers();
    };

    getData(users);
  }, []);

  return (
    <>
      <SearchForm setUsers={setUsers}/>
      {/* <YoutubeForm fetchUsers={fetchUsers} /> */}
      <UsersList users={users} />
    </>
  );
}

export default App;
