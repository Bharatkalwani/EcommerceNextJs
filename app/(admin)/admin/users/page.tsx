// "use client";

// import { useEffect, useState } from "react";
// import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
// import 

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     API.get("/admin/users").then((res) => setUsers(res.data));
//   }, []);

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>All Users</Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Role</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((u: any) => (
//             <TableRow key={u.id}>
//               <TableCell>{u.name}</TableCell>
//               <TableCell>{u.email}</TableCell>
//               <TableCell>{u.role}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// }
