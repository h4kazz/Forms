import { useState } from "react";
import { useForm } from "react-hook-form";
import { getAlldata } from "../services/get";

function SearchForm({ setUsers }) {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      query: "",
    },
  });

  const [error, setError] = useState("");

  const formHandler = async (formData) => {
    try {
      const { query } = formData;
      const allUsers = await getAlldata();
      const usersFound = allUsers.filter((user) =>
        user.username.includes(query),
      );
      setUsers(usersFound); // I app paduodu per props'us filtruota sarasa useriu pagal filter
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="shadow my-2 p-2">
      {error && <p>{error}</p>}
      <h1 className="font-bold">Search User</h1>
      <form onSubmit={handleSubmit(formHandler)} noValidate>
        <div>
          <label htmlFor="query">Search by name:</label>
          <input
            type="text"
            name="query"
            id="query"
            className="border mx-2"
            {...register("query")}
          />
          <div className="bg-red-300">{errors.username?.message}</div>
        </div>
        <div>
          <input type="submit" value="Search" className="bg-blue-300 p-1" />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
