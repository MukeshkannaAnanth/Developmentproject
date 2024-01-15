import { Box, Stack } from '@mui/material'
import React from 'react';
import {Chat_History} from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine,Video } from './MsgTypes';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


const Message = ({menu,senderid,receiverid,chathistory}) => {

  const [userid,setUsername] = useState('');
useEffect(() => {
  const authData = JSON.parse(localStorage.getItem('auth'));

    if (authData) {
      // Use the retrieved data as needed
      setUsername(authData.user.id);
    }

    




}, [])

  return (
    <Box p={3}>
        <Stack spacing={3}>
            {chathistory.map((el)=>{
                switch (el.type) {
                    case 'divider':
                      return <TimeLine el={el}/>
                        
                    case 'msg':
                        switch (el.subtype) {
                            case 'img':
                              return <MediaMsg el={el} menu={menu}/>
                              case 'video':
                                return <Video el={el} menu={menu}/>
                            case 'doc':
                                return <DocMsg el={el} menu={menu}/>
                                
                            case 'link':
                                return <LinkMsg el={el} menu={menu}/>
                            case 'reply':
                                return <ReplyMsg el={el} menu={menu}/>
                        
                            default:
                               return <TextMsg el={el} menu={menu}/>
                        }
                        break;
                
                    default:
                      return <></>;
                }
            })}
        </Stack>
    </Box>
  )
}

export default Message