import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Slide, Stack, Typography} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react';
import {useTheme } from "@mui/material/styles";
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { ToggleSidebar, UpdateSidebarType } from '../redux/slices/app';
import { faker } from '@faker-js/faker';
import AntSwitch from './AntSwitch';
import '../css/global.css';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({open, handleClose}) =>{
  return (
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>Block this contact</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
       Are you sure you want to block this contact?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Yes</Button>
    </DialogActions>
  </Dialog>
  )
}

const DeleteDialog = ({open, handleClose}) =>{
  return (
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>Delete this chat</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
       Are you sure you want to delete this chat?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Yes</Button>
    </DialogActions>
  </Dialog>
  )
}

const Contact = () => {





  const theme = useTheme();
  const dispatch = useDispatch();

   const [profile, setProfile] = useState(false);

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedFile, setSelectedFile] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    console.log('Updated Image Src:', imageSrc);
    // setImageSrc(imageSrc)
  }, [imageSrc]);



  const handleCloseBlock = () =>{
    setOpenBlock(false);
  }

  const handleCloseDelete = () =>{
    setOpenDelete(false);
  }

  const handleFileChange = async(event) => {
    // Handle the file change event
    const file = event.target.files[0];

    // Update state with the selected file
    setSelectedFile(file);

    // Read the selected file as a data URL and update the image source
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      console.log(imageSrc);
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('id', 48);
    formData.append('image', selectedFile);
    try {
    
      const res = await axios.post('http://localhost:8001/api/uploadimg',formData);
      if(res.data){
        if(res.data.code==200){
        alert(res.data.data.message);
        } else{
          console.log(res);
          alert(res.data.data.message);
        }
      }
    } catch (err) {
      console.log('err',err.response.data.data.message);
      alert(err.response.data.data.message);
    }
    
  };

  const handleAvatarClick = () => {
    // Trigger the file input click when the Avatar is clicked
    document.getElementById('fileInput').click();
  };
  
  return (
    <Box sx={{width:320, height:'100vh'}}>
      <Stack sx={{height:'100%'}}>
        {/* Header */}
        <Box sx={{
          boxShadow: '0px 0px 2px rgba(0.25)',
          width: '100%',
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background
        }}>
          <Stack sx={{height:'100%', p:2}} direction='row' alignItems='center'
           justifyContent='space-between' spacing={3}>
            <Typography variant='subtitle2'>Contact Info</Typography>
            <IconButton onClick={()=>{
              dispatch(ToggleSidebar());
            }}>
              <X/>
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack className='scrollbar'  sx={{height:'100%', position:'relative', flexGrow:1, overflowY:'scroll'}} p={3}
        spacing={3}>
          <Stack alignItems={'center'} direction='row' spacing={2}>
           
          <Avatar 
            src={imageSrc || `../assets/Images/def_ava.jpg`}
            alt={faker.name.firstName} sx={{height:64, width:64}} 
            onClick={handleAvatarClick}
            />
            <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
        
           


            <Stack spacing={0.5}>
              <Typography variant='article' fontWeight={600}>
                {faker.name.fullName()}
              </Typography>
              <Typography variant='article' fontWeight={500}>
                {'+94 713725452'}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
            <Stack spacing={1} alignItems='center' >
              <IconButton>
                <Phone/>
              </IconButton>
              <Typography variant='overline'>Voice</Typography>
            </Stack>
            <Stack spacing={1} alignItems='center' >
              <IconButton>
                <VideoCamera/>
              </IconButton>
              <Typography variant='overline'>Video</Typography>
            </Stack>
          </Stack>
          <Divider/>
          <Stack spacing={0.5}>
            <Typography variant='article'>About</Typography>
            <Typography variant='body2'>Hi I'm working</Typography>
          </Stack>
          <Divider/>
          <Stack direction='row' alignItems={'center'} justifyContent='space-between' >
            <Typography variant='subtitle2'>Media, Links & Docs</Typography>
            <Button onClick={()=>{
              dispatch(UpdateSidebarType('SHARED'))
            }} endIcon={<CaretRight/>}>401</Button>
          </Stack>
          <Stack direction='row' spacing={2} alignItems={'center'}>
            {[1,2,3].map((el)=>(
              <Box>
                <img src={faker.image.food()} alt={faker.name.fullName()}/>
              </Box>
            ))}
          </Stack>
          <Divider/>
          <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
            <Stack direction='row' spacing={2} alignItems={'center'}>
              <Star size={21}/>
              <Typography variant='subtitle2'>Starred Messages</Typography>
            </Stack>
            <IconButton onClick={()=>{
              dispatch(UpdateSidebarType('STARRED'))
            }}><CaretRight/></IconButton>
          </Stack>
          <Divider/>
          <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
            <Stack direction='row' spacing={2} alignItems={'center'}>
              <Bell size={21}/>
              <Typography variant='subtitle2'>Mute Notifications</Typography>
            </Stack>
            <AntSwitch/>
          </Stack>
          <Divider/>
          <Typography>1 group in common</Typography>
          <Stack direction='row' spacing={2} alignItems={'center'}>
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName}/>
            <Stack spacing={0.5}>
              <Typography variant='subtitle2' >React Developers</Typography>
              <Typography variant='caption' >Kaveena, Pavithra, Ayesha, You</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' alignItems={'center'} spacing={2}>
            <Button onClick={()=>{setOpenBlock(true)}} startIcon={<Prohibit/>} fullWidth variant='outlined'>
              Block
            </Button >
            <Button onClick={()=>{setOpenDelete(true)}} startIcon={<Trash/>} fullWidth variant='outlined'>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock}/>}
      {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete}/>}
    </Box>
  )
}

export default Contact