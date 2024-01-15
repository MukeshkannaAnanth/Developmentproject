import { Avatar, Badge, Box, Stack, Typography } from '@mui/material';
import {useTheme , styled} from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import { useState } from 'react';

//single chat element
const ChatElement = ({id,name, img, msg, time,online, unread, onClick, profilepic}) => {

    console.log(profilepic);
   const [senderid,setSenderid] = useState(null);

    const theme = useTheme();

    const handleClick = (e) => {
      e.preventDefault();
      // Call the onClick prop with the id and event
      onClick(id, e);
      console.log(`thisa is the chat element ${id}`);
      setSenderid(id);
    };
  
   
    return (
      <Box sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === 'light'? "#fff" : theme.palette.background.default,
        color: theme.palette.mode === 'light'? "#000" : "#fff"
      }}
        p={2}>
        <Stack direction="row" alignItems='center' justifyContent='space-between' onClick={handleClick}>
          <Stack direction='row' spacing={2}>
            {online ? <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot">
            <Avatar src={img} />
            </StyledBadge> : <Avatar src={img} /> }
            
            <Stack spacing={0.3}>
              <Typography variant='subtitle2'>
                {name}
              </Typography>
              <Typography variant='caption'>
                {msg}
              </Typography>
            </Stack>
            </Stack>
            <Stack spacing={2} alignItems='center'>
              <Typography sx={{fontWeight:600}} variant='caption'>
                {time}
              </Typography>
              <Badge color='primary' badgeContent={unread}>
  
              </Badge>
            </Stack>
          
          
        </Stack>
  
  
      </Box>
    )
  };

  export default ChatElement