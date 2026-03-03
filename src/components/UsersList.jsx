import User from "./User";

function UsersList({users}) {
    return (
        <div>
            <h1>Users list</h1>
            <p>
                {users.map((user) => <User user={user} key={user.id}/>)}
            </p>
        </div>
    )
};

export default UsersList;