import React ,{ useState } from 'react';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack, Switch } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { Gear } from "phosphor-react";
import { Nav_Buttons, Profile_Menu } from '../../data'
import useSettings from '../../hooks/useSettings';
import { faker } from '@faker-js/faker';
import AntSwitch from '../../components/AntSwitch';
import Logo from '../../assets/Images/logo.ico';
import { useNavigate } from 'react-router-dom';
// import  logout  from '../../redux/slices/app.js';
import {useDispatch} from 'react-redux';
import {toast} from "react-toastify";
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import { serverUrl } from '../../config/ServerUrl';


const getPath = (index) =>{
  switch (index) {
    case 0:
      return '/app'
    
    case 1:
      return '/group'

    case 2:
      return '/call'

    case 3:
      return '/settings'
  
    default:
      break;
  }
};

const getMenuPath = (index) =>{
  switch (index) {
    case 0:
      return '/profile';
      
    case 1:
      return '/settings'
      
    case 2:
      // todo - update token and set isAuth = false
      return '/auth/login'
      
    default:
      break;
  }
}

const SideBar = () => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event);
    if(event=== 'Logout'){
      window.localStorage.removeItem('auth');
      navigate('/signin');
    }

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    const theme = useTheme();
    const navigate = useNavigate();
     // state for selected button
    const [selected, setSelected] = useState(0); // by default 0 index button is selected
    //switch themes
    const {onToggleMode} = useSettings();


 const handleLogout = async(event) => {
    event.preventDefault();
    try {
      const res = await axios.get('http://localhost:8001/api/logout');
      console.log(res.data.data.message);
      if(res.data){
        if(res.data.code==200){
          window.localStorage.removeItem('auth');
          // dispatch(logout());
          navigate('/signin');
         toast.success(res.data.data.message);
        } else{
          console.log(res);
          toast.error(res.data.data.message);
        }
      }

    } catch (err) {
      console.log('err',err);
      toast.error('Failed. '+err.response.data.data.message);
    }
   }


  return (
    <Box p={2} sx={{ backgroundColor: theme.palette.background.paper, 
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", height: "100vh", width: 100, display:"flex" }}>
        <Stack direction="column" alignItems={"center"} justifyContent="space-between" 
        sx={{ width: "100%" , height: "100%"}} spacing={3}>
          <Stack alignItems={"center"} spacing={4}>
          <Box sx={{
            backgroundColor: theme.palette.primary.main,
            height: 64,
            width: 64,
            borderRadius: 1.5
          }}>
            <img src={Logo} alt={'Logo icon'} />
          </Box>
          <Stack sx={{ width: "max-content" }} direction="column" alignItems="center" spacing={3}>
            {Nav_Buttons.map((el) => (
              el.index === selected ?
                <Box key={""} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                  <IconButton sx={{ width: "max-content", color: "#fff" }} key={el.index}>
                    {el.icon}
                  </IconButton>
                </Box>
                :
                <IconButton onClick={() => { setSelected(el.index); navigate(getPath(el.index)) }} 
                sx={{ width: "max-content", color:theme.palette.mode === 'light' ? "#000" 
                : theme.palette.text.primary }} key={el.index}>
                  {el.icon}
                </IconButton>
            ))}
            <Divider sx={{ width: "48px" }} />
            {selected === 3 ?
              <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                <IconButton sx={{ width: "max-content", color: "#fff" }}>
                  <Gear />
                </IconButton>
              </Box>
              :
              <IconButton onClick={() => { setSelected(3); navigate(getPath(3)) }} sx={{ width: "max-content",
               color: theme.palette.mode === 'light' ? "#000" :theme.palette.text.primary }} >
                <Gear />
              </IconButton>
            }
            <Divider sx={{ width: "48px" }} />
            <IconButton  sx={{ width: "max-content",
               color: theme.palette.mode === 'light' ? "#000" :theme.palette.text.primary }}
               onClick={handleLogout}
                >
                <LogoutIcon />
              </IconButton>
          </Stack>

          </Stack>
          
          <Stack spacing={4}>
            <AntSwitch onChange={()=>{
                onToggleMode();
            }} defaultChecked/>
            <Avatar id='basic-button' sx={{cursor:'pointer'}}
            src={faker.image.avatar()}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}/>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{vertical:'bottom', horizontal:'right'}}
              transformOrigin={{vertical:'bottom', horizontal:'left'}}
            >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, idx)=>(
                  <MenuItem onClick={ ()=> {handleClick(el.title); } }>
                    <Stack onClick={()=>{
                      navigate(getMenuPath(idx))
                    }} sx={{width:100}} direction='row' alignItems={'center'}
                     justifyContent='space-between'>
                      <span>{el.title}</span>
                      {el.icon}
                    </Stack>  
                  </MenuItem>
              ))}
            </Stack>
          </Menu>
          </Stack>   
        </Stack>
        
      </Box>
  )
}

export default SideBar