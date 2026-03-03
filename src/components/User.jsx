import deleteData from "../services/delete";
import { MdDeleteForever } from "react-icons/md";
import updateData from "../services/update";
import { getOne } from "../services/get";
import UserEditForm from "./UserEditForm";
import { useState } from "react";

const User = ({ user }) => {
const [showForm, setFormShow] = useState(false);

  const likesHandler = async (id) => {
    const user = await getOne(id);
    console.log(user.likes);
    const { likes } = user;

    await updateData(id, { likes: likes + 1 });
  };

  return (
    <>
      {showForm && <UserEditForm user={user} setFormShow={setFormShow}/>}
      <div className="border">
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.channel}</p>
        <p>
          Hobies:{" "}
          {user.hobbies.map((hobby, index) => (
            <span key={index}>{hobby}</span>
          ))}
        </p>
        <p>
          Likes: {user.likes}{" "}
          <span>
            <button
              onClick={() => likesHandler(user.id)}
              className="bg-fuchsia-300 hover:cursor-pointer p-2"
            >
              Like
            </button>
          </span>
        </p>
        <button
          onClick={() => {
            deleteData(user.id);
          }}
          className="text-5xl hover:cursor-pointer text-fuchsia-500"
        >
          <MdDeleteForever />
        </button>
        <button onClick={() => setFormShow((prev) => !prev)} className="bg-amber-300 p-2">Edit</button>
      </div>
    </>
  );
};

export default User;
