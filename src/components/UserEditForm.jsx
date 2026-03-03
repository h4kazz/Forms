import { useState, useEffect,  } from "react";
import { useForm } from "react-hook-form";
import updateData from "../services/update";

const API_URL = import.meta.env.VITE_API_URL;

function UserEditForm({ user, setFormShow }) {
  const { id, email } = user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // setValue,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
  });

  const [error, setError] = useState("");

  useEffect(() => {
    reset(user);
  }, []);

  const formHandler = async (formData) => {
    try {
      //updated form data
      await updateData(id, formData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="my-2 p-2">
      {error && <p>{error}</p>}
      <h1 className="font-bold">Edit user with email: {email} </h1>
      <form onSubmit={handleSubmit(formHandler)} noValidate>
        <div>
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            name="username"
            id="username"
            className="border mx-2"
            {...register("username", { required: "User name is required" })}
          />
          <div className="bg-red-300">{errors.username?.message}</div>
        </div>
        <div>
          <label htmlFor="email">User email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border mx-2"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g,
                message: "Invalid email address",
              },
              validate: {
                notBlackListed: (fieldValue) => {
                  if (fieldValue.endsWith("bademail.com"))
                    return "This email not allowed";
                },
              },
            })}
          />
          <div className="bg-red-300">{errors.email?.message}</div>
        </div>
        <div>
          <label htmlFor="channel">Favourite channel</label>
          <input
            type="text"
            name="channel"
            id="channel"
            className="border mx-2"
            {...register("channel")}
          />
          <div className="bg-red-300">{errors.channel?.message}</div>
        </div>
        <div>
          <button type="submit" className="bg-blue-300 p-1 m-1">
            ✅ Update user
          </button>

          <button
            className="bg-blue-300 p-1 m-1"
            onClick={() => setFormShow(false)}
          >
            ❌ Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEditForm;
