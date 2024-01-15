// import { Box, IconButton, Stack, Button, Divider } from '@mui/material';
// import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
// import { useTheme } from '@mui/material/styles';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ChatList } from '../../data';
// import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
// import ChatElement from '../../components/ChatElement';
// import Conversation from '../../components/Conversation';


// const Chats = () => {
//   const [data, setData] = useState([]);
//   const [clickedChatId, setClickedChatId] = useState(null);
//   const [Senderid, setSenderid] = useState(null);
//   const [userid,setUsername] = useState('');




//   useEffect(() => {

//     const authData = JSON.parse(localStorage.getItem('auth'));

//     if (authData) {
//       // Use the retrieved data as needed
//       setUsername(authData.user.id);
//     }



//     const fetchData = async () => {
//       try {
//         var authData = JSON.parse(window.localStorage.getItem('auth'));
//         console.log(authData.user.id);

//         const listdetails = {
//           id: authData.user.id
//         }

//         const response = await axios.post('http://localhost:8001/api/chatlist', listdetails);
//         setData(response.data.data.chatlist);
//         console.log(response.data.data.chatlist);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [])

//   const handleChatClick = (id, e) => {
//     // Your enterChat logic here
//     console.log(`Entering chat with id: ${id}`);

//     // Set the clicked chat id in the state
//     setClickedChatId(id);
 

//     // Call otherFunction or any other logic you need
//     otherFunction(id);
//   };

//   const otherFunction = (id) => {
//     // Your otherFunction logic here
//     // console.log(`Calling otherFunction with id: ${id}`);
//   };

//   const theme = useTheme();
//   return (
//     <Box sx={{
//       position: "relative", width: 320,
//       backgroundColor: theme.palette.mode === 'light' ? "#F8FAFF" : theme.palette.background.paper,
//       boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
//     }}>
//       <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
//         <Stack direction="row" alignItems='center' justifyContent='space-between'>
         
//           <IconButton>
//             <CircleDashed />
//           </IconButton>
//         </Stack>

//         <Stack sx={{ width: "100%" }}>
//           <Search>
//             <SearchIconWrapper>
//               <MagnifyingGlass color="#709CE6" />
//             </SearchIconWrapper>
//             <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
//           </Search>
//         </Stack>

//         <Stack spacing={1}>
//           <Stack direction='row' alignItems='center' spacing={1.5}>
//             <ArchiveBox size={24} />
//             <Button>
//               Archive
//             </Button>
//           </Stack>
//           <Divider />
//         </Stack>

//         <Stack className='scrollbar' spacing={2} direction='column' sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}>
//           <Stack spacing={2.4}>
            
//             {data.filter((el) => !el.pinned).map((el) => (
//               <ChatElement key={el.id} {...el} onClick={(e) => handleChatClick(el.id, e)} />
//             ))}
//           </Stack>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// }

// export default Chats;
