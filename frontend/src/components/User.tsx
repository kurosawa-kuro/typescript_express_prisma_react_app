import React, { useState, useEffect } from "react";
import styles from "./User.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAsyncGetUsers,
    fetchAsyncCreateUser,
    fetchAsyncUpdateUser,
    fetchAsyncDeleteUser,
    editUser,
    selectUsers,
    selectEditedUser,
} from "../features/userSlice";
import { AppDispatch } from "../app/store";

const User = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector(selectUsers);
    const editedUser = useSelector(selectEditedUser);
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        const fetchBootLoader = async () => {
            const result = await dispatch(fetchAsyncGetUsers());
            if (fetchAsyncGetUsers.rejected.match(result)) {
                setSuccessMsg("Get error!");
            }
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <>
            <h3 data-testid="h3-user">User</h3>
            <span className={styles.user__status}>{successMsg}</span>
            <div>
                <input
                    type="text"
                    placeholder="new user name"
                    value={editedUser.name}
                    onChange={async (e) =>
                        await dispatch(
                            editUser({ ...editedUser, name: e.target.value })
                        )
                    }
                />
                <button
                    data-testid="btn-post"
                    disabled={!editedUser.name}
                    onClick={
                        editedUser.id === 0
                            ? async () => {
                                await dispatch(
                                    fetchAsyncCreateUser({
                                        name: editedUser.name,
                                    })
                                );
                                await dispatch(
                                    editUser({
                                        id: 0,
                                        name: "",
                                    })
                                );
                            }
                            : async () => {
                                const result = await dispatch(
                                    fetchAsyncUpdateUser(editedUser)
                                );
                                await dispatch(
                                    editUser({
                                        id: 0,
                                        name: "",
                                    })
                                );
                                if (fetchAsyncUpdateUser.fulfilled.match(result)) {
                                    setSuccessMsg("Updated in user!");
                                }
                            }
                    }
                >
                    {editedUser.id === 0 ? "Create" : "Update"}
                </button>
                <ul>
                    {users.map((user) => (
                        <li className={styles.user__item} key={user.id}>
                            <span data-testid={`list-${user.id}`}>{user.name}</span>
                            <div>
                                <button
                                    data-testid={`delete-user-${user.id}`}
                                    onClick={async () => {
                                        const result = await dispatch(
                                            fetchAsyncDeleteUser(user.id)
                                        );
                                        if (fetchAsyncDeleteUser.fulfilled.match(result)) {
                                            setSuccessMsg("Deleted in user!");
                                        }
                                    }}
                                >
                                    delete
                                </button>
                                <button
                                    data-testid={`edit-user-${user.id}`}
                                    onClick={async () => {
                                        await dispatch(editUser(user));
                                    }}
                                >
                                    edit
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default User;


// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import {
//     fetchAsyncGetUsers, selectUsers
// } from "../features/userSlice";
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch } from '../app/store';

// const User = () => {
//     const dispatch: AppDispatch = useDispatch();
//     const users: User[] = useSelector(selectUsers);

//     type User = {
//         id: number,
//         name: string,
//         email: string,
//     };

//     const [successMsg, setSuccessMsg] = useState("");

//     useEffect(() => {
//         const fetchBootLoader = async () => {
//             const result = await dispatch(fetchAsyncGetUsers());
//             if (fetchAsyncGetUsers.rejected.match(result)) {
//                 setSuccessMsg("Get error!");
//             }
//         };
//         fetchBootLoader();
//     }, [dispatch]);

//     return (
//         <>
//             <span >{successMsg}</span>
//             <h2>Users</h2>
//             <ul>
//                 {users && users.map((user) => (
//                     <li key={user.id}><span>name:{user.name}, email:{user.email}</span></li>
//                 ))}
//             </ul>
//         </>
//     )
// }

// export default User