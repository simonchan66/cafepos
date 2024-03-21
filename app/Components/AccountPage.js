// "use client";
// import React, { useState, useEffect } from 'react';
// import { getAuth, listUsers, createUserWithEmailAndPassword, deleteUser, updatePassword } from 'firebase/auth';
// import { useUserAuth } from "../_utils/auth-context";

// const AccountManagementPage = () => {
//   const { user } = useUserAuth();
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newEmail, setNewEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [modifiedPassword, setModifiedPassword] = useState('');

//   const auth = getAuth();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const userList = await listUsers(auth);
//         const userArray = userList.users.map((user) => ({
//           uid: user.uid,
//           email: user.email,
//           disabled: user.disabled,
//         }));
//         setUsers(userArray);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     if (user) {
//       fetchUsers();
//     }
//   }, [user, auth]);

//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//     setModifiedPassword('');
//   };

//   const handleCreateUser = async () => {
//     if (newEmail && newPassword) {
//       try {
//         await createUserWithEmailAndPassword(auth, newEmail, newPassword);
//         console.log('User created successfully');
//         setNewEmail('');
//         setNewPassword('');
//       } catch (error) {
//         console.error('Error creating user:', error);
//       }
//     }
//   };

//   const handleDeleteUser = async (user) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await deleteUser(user);
//         console.log('User deleted successfully');
//         setUsers(users.filter((u) => u.uid !== user.uid));
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   const handleModifyPassword = async () => {
//     if (selectedUser && modifiedPassword) {
//       try {
//         await updatePassword(selectedUser, modifiedPassword);
//         console.log('Password modified successfully');
//         setModifiedPassword('');
//       } catch (error) {
//         console.error('Error modifying password:', error);
//       }
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex flex-col">
//       <div className="container mx-auto py-8">
//         <h1 className="text-3xl font-bold mb-4">Account Management</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Users</h2>
//             <ul className="bg-gray-800 p-4 rounded-md">
//               {users.map((user) => (
//                 <li
//                   key={user.uid}
//                   className={`py-2 px-4 rounded-md cursor-pointer ${
//                     selectedUser?.uid === user.uid ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
//                   }`}
//                   onClick={() => handleSelectUser(user)}
//                 >
//                   {user.email}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold mb-2">User Details</h2>
//             {selectedUser ? (
//               <div className="bg-gray-800 p-4 rounded-md">
//                 <p className="mb-2">
//                   <span className="font-semibold">Email:</span> {selectedUser.email}
//                 </p>
//                 <div className="mb-4">
//                   <label htmlFor="modifiedPassword" className="font-semibold block mb-1">
//                     New Password:
//                   </label>
//                   <input
//                     type="password"
//                     id="modifiedPassword"
//                     className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={modifiedPassword}
//                     onChange={(e) => setModifiedPassword(e.target.value)}
//                   />
//                 </div>
//                 <button
//                   className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-300 mr-4"
//                   onClick={handleModifyPassword}
//                 >
//                   Modify Password
//                 </button>
//                 <button
//                   className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-300"
//                   onClick={() => handleDeleteUser(selectedUser)}
//                 >
//                   Delete User
//                 </button>
//               </div>
//             ) : (
//               <p>Select a user to view details</p>
//             )}
//           </div>
//         </div>
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-2">Create New User</h2>
//           <div className="bg-gray-800 p-4 rounded-md">
//             <div className="mb-4">
//               <label htmlFor="newEmail" className="font-semibold block mb-1">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="newEmail"
//                 className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="newPassword" className="font-semibold block mb-1">
//                 Password:
//               </label>
//               <input
//                 type="password"
//                 id="newPassword"
//                 className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </div>
//             <button
//               className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-300"
//               onClick={handleCreateUser}
//             >
//               Create User
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountManagementPage;