import React from 'react'
import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import {useTheme } from "@mui/material/styles";
import { useDispatch } from 'react-redux';
import { UpdateSidebarType } from '../redux/slices/app';
import { CaretLeft, X } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import { SHARED_DOCS, SHARED_LINKS } from '../data';
import {DocMsg, LinkMsg} from './Conversation/MsgTypes'
import Message from './Conversation/Message';

const StarredMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

  return (
    <Box sx={{width:320, height:'100vh'}}>
     
    </Box>
  )
}

export default StarredMessages