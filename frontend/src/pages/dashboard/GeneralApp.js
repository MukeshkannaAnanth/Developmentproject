import React from "react";
// import Chats from "./Chats";
import { Box, Stack,Typography,TextField,Fab,InputAdornment  } from "@mui/material";
import { styled,useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import {  IconButton, Button, Divider,Tooltip } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import  { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { ChatList } from '../../data';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import ChatElement from '../../components/ChatElement';
import Conversation from '../../components/Conversation';
import Header from "../../components/Conversation/Header";
// import Footer from "../../components/Conversation/Footer";
import Message from "../../components/Conversation/Message";
import YourComponentFotter from "../../components/Conversation/Footer";
import { LinkSimple, PaperPlaneTilt, Smiley, Camera, File, Image, Sticker, User,Microphone } from 'phosphor-react';
import Picker from '@emoji-mart/react'
import { chatserverUrl } from "../../config/ServerUrl";
import { useNavigate } from "react-router-dom";
import StartChat from "../../components/StartChat";
import { Scrollbars } from 'react-custom-scrollbars';
import { ReactMic } from 'react-mic';
import CloseIcon from '@mui/icons-material/Close';
import AudioRecorder from 'react-audio-recorder';


const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: '12px',
    paddingBottom: '12px',
  }
}));




const Actions = [
  {
    color:'#4da5fe',
    icon: <Image size={24}/>,
    y:102,
    title:'Photo/Video'
  },
  {
    color:'#1b8cfe',
    icon: <Sticker size={24}/>,
    y:172,
    title:'Stickers'
  },
  {
    color:'#0172e4',
    icon: <Camera size={24}/>,
    y:242,
    title:'Image'
  },
  {
    color:'#0159b2',
    icon: <File size={24}/>,
    y:312,
    title:'Document'
  }
  
];


const ChatInput = ({ 
  inputValue,
   handleChange,
    setOpenPicker,
     handleSendmessage,
      handleClear,
       fileInputRef,
        handleFileChange,
         handleButtonClick,
          handleDocsFileChange ,
          handleDocsButtonClick,
          onStop,
          onData,
          isRecording,
          stopRecording,
          startRecording,
          microphone,
          updateMicrophoneValue }) => {
  const [openAction, setOpenAction] = useState(false);
  const videoRef = useRef(null);
  const [savedAudioBlob, setSavedAudioBlob] = useState(null);

  
   
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };
  const handleOpenCamera = async () => {
    // try {
    //   // Request permission to access the camera
    //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    //   // Attach the stream to the video element
    //   if (videoRef.current) {
    //     videoRef.current.srcObject = stream;
    //   }
    // } catch (error) {
    //   console.error('Error accessing camera:', error);
    // }
  };

  const handleClose = () => {
    // Your logic for closing goes here
    console.log('Close icon clicked');
    updateMicrophoneValue(0);
  };

  return (
    <>   


      {

        microphone===1 ? (
          <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>Audio Recorder</h1>
      <CloseIcon onClick={handleClose}/>
    </div>
    <AudioRecorder 
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }} 
        downloadOnSavePress={true}
        showVisualizer={true}
        downloadFileExtension="webm"
      />
       {savedAudioBlob && (
        <div>
          <p>Saved Audio:</p>
          <audio controls src={URL.createObjectURL(savedAudioBlob)} />
        </div>
      )}
          </>
        ) : (
          null
        )
      }

     
      <StyledInput
      fullWidth
      placeholder='Write a message...'
      variant='filled'
      onChange={handleChange}
      value={inputValue}
      onClick={handleClear}
      InputProps={{
        disableUnderline: true,
        startAdornment:
          <Stack sx={{ width: 'max-content' }}>
            <Stack sx={{ position: 'relative', display: openAction ? 'inline-block' : 'none' }}>
              {Actions.map((el) => (
                <Tooltip placement='right' title={el.title} key={el.title} onClick={() => {
      if (el.title=='Photo/Video') {
        handleButtonClick();
      }
      if (el.title=='Document') {
        handleButtonClick();
      }
      if(el.title=='Image'){
        handleOpenCamera();
      }
      if(el.title=='Image'){
        handleOpenCamera();
      }
    }}>
                  <Fab sx={{ position: 'absolute', top: -el.y, backgroundColor: el.color }}>
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
              <input
        type="file"
        style={{ display: 'none' }}
        ref={(input) => (fileInputRef.current = input)}
        onChange={(e)=>{handleFileChange(e)}}
      />

      <input
        type="file"
        accept=".doc, .docx, .pdf, .txt" // Specify the document file types you want to accept

        style={{ display: 'none' }}
        onChange={(e)=>{handleDocsFileChange(e)}}
      />
            </Stack>
            <InputAdornment>
              <IconButton onClick={() => setOpenAction((prev) => !prev)}>
                <LinkSimple/>
              </IconButton>
            </InputAdornment>
          </Stack>,
        endAdornment: <InputAdornment>
          <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
            <Smiley/>
          </IconButton>
        </InputAdornment>
      }}
    />
   
    </>
  );
}








const GeneralApp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);


  const [data, setData] = useState([]);
  const [clickedChatId, setClickedChatId] = useState(null);
  const [Senderid, setSenderid] = useState(null);
  const [userid,setUsername] = useState('');
  const [chatspace,setChatspace] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [chathistory,setChathistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatmasterid,setChatmasterid] = useState('');
  const [joinchatmaster,setJoinchatmaster] = useState('');
  const [startchats,setStartchats] = useState(0);
  const [profileImg,setProfileImg] = useState('');
  const [dpname,setDpname] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [SelectedImg, setSelectedImg] = useState(null);
  const [Documents, setDocuments] = useState(null);
  const [microphone, setClickmicrophone] = useState(0);
  const [Audio, setAudio] = useState('');



  const scrollbarsRef = useRef(null);
  

  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);

  const updateMicrophoneValue = (newValue) => {
    setClickmicrophone(newValue);
  };




  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
    setAudioChunks((prevChunks) => [...prevChunks, recordedBlob]);
  };

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    setAudio(recordedBlob);
    setAudioChunks([]);
  };

  useEffect(() => {

    const authData = JSON.parse(localStorage.getItem('auth'));

    if (authData) {
      // Use the retrieved data as needed
      setUsername(authData.user.id);
    }

    const fetchSenderReceiverMsg = async (chatmasterid,s_id) => {
      try {
        const chathistoryids = {
          senderId:userid,
          receiverId:clickedChatId
         }

        const response = await axios.post('http://localhost:8001/api/messages', chathistoryids);
        console.log(response);
        setChathistory(response.data.data.history);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    //fetchSenderReceiverMsg();









    const fetchData = async () => {
      try {
        var authData = JSON.parse(window.localStorage.getItem('auth'));
        console.log(authData.user.id);

        const listdetails = {
          id: authData.user.id
        }

        const response = await axios.post('http://localhost:8001/api/chatlist', listdetails);
        setData(response.data.data.chatlist);
        console.log(response.data.data.chatlist);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const fetchchatmasterId = async() => {
      try {
          const user_ids = {
            user_id:userid,
            receiver_id:clickedChatId
          };
          const res = await axios.post('http://localhost:8001/chat/getchatmasterid',user_ids)
          console.log('chatmaster id',res.data,'user id',userid);
          setChatmasterid(res.data.data.chatmaster_id[0].chatmaster_id);
        if(res.data){
          if(res.data.code==200){
              console.log(res);
          } else{
            console.log(res);
          }
        }
       } catch (err) {
          console.log('err',err);
       }
  }
  
    fetchchatmasterId();


    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }

    
  }, [chathistory])

  const fetchSenderReceiverMsg = async (chat_masterid,s_id) => {
    try {
      const chathistoryids = {
        chatmasterid:chat_masterid,
        sender_id:s_id
       }

      const response = await axios.post('http://localhost:8001/api/messages', chathistoryids);
      console.log(response);
      setChathistory(response.data.data.history);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleEmojiClick = (emoji) => {
    // Handle the selected emoji
    setSelectedEmoji(emoji);
  
    
    console.log('on select');
  };
  const onchangeFetchMasterid = async(userids,clickedChatIds) => {
    try {
        const user_ids = {
          user_id:userids,
          receiver_id:clickedChatIds
        };
        const res = await axios.post('http://localhost:8001/chat/getchatmasterid',user_ids)
        console.log('chatmaster id',res.data,'user id',userid,'onchange fectch master id :::', res.data.data.chatmaster_id,'empty',res.data.data.chatmaster_id[0].chatmaster_id.length);
      if(res.data){
        if(res.data.code==200){
        //  console.log('chatmaster id',res.data,'user id',userid,'onchange fectch master id');
        setChatmasterid(res.data.data.chatmaster_id[0].chatmaster_id.length===0 ? '' : res.data.data.chatmaster_id[0].chatmaster_id);

        } else{
          console.log(res);
        }
      }
     } catch (err) {
        console.log('err',err);
        setChatmasterid('');

     }
}




  const OnclickfetchSenderReceiverMsg = async (chat_masterid,s_id) => {
    try {
      const chathistoryids = {
        chatmasterid:chat_masterid,
        sender_id:s_id
       }

      const response = await axios.post('http://localhost:8001/api/messages', chathistoryids);
      console.log(response);
      setChathistory(response.data.data.history);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const OnclickfetchJoinMasterid = async(userid,clickedChatId) => {
    try {
      const user_ids = {
        user_id:userid,
        receiver_id:clickedChatId
      };
      const res = await axios.post('http://localhost:8001/chat/joinchatmaster',user_ids)
      console.log('join chat chatmaster ',res.data.data.chatmaster_id);
      
    if(res.data){
      if(res.data.code==200){
          console.log(res);
          setJoinchatmaster(res.data.data.chatmaster_id)
      } else{
        console.log(res);
        setJoinchatmaster(res.data.data.chatmaster_id)
      }
    }
   } catch (err) {
      console.log('err',err);
   }
   }

  
  const handleChatClick = (chatmasterid,s_id,r_id,profileimg,name, e) => {
    onchangeFetchMasterid(s_id,r_id);
    OnclickfetchJoinMasterid(s_id,r_id)
    // Your enterChat logic here
    console.log(`Entering chat with id: ${chatmasterid} -----s_is ${s_id} -----r_id ${r_id}`);

    // Set the clicked chat id in the state
    setClickedChatId(r_id);
    setChatspace(true);
    setProfileImg(profileimg);
    setDpname(name);

    // Call otherFunction or any other logic you need
    otherFunction(chatmasterid);
    OnclickfetchSenderReceiverMsg(chatmasterid,s_id);
  };

  const otherFunction = (id) => {
    // Your otherFunction logic here
    // console.log(`Calling otherFunction with id: ${id}`);
  };





  const {sidebar} = useSelector((store)=> store.app);// access our store inside component


  const handleChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  const handleClear = () => {
    
    console.log('handle clear');
  };

  // const handleChange = (event) => {
  //   setInputValue(event.target.value);
  //   console.log(inputValue);
  // };


  const handleStart = async() => {
    // Your logic for handling the start chat action goes here

  

    console.log('Start chat clicked!');
    setStartchats(1);
  };


  const handleSendmessage = async(event) => {
    event.preventDefault();
    try {
    
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();
      
      const formattedTime = `${hours}:${minutes}`;

      const formData = new FormData();
      formData.append('senderid', userid);
      formData.append('receiverid', clickedChatId);
      formData.append('type', 'msg');
      formData.append('message', inputValue);
      formData.append('time', formattedTime);
      formData.append('incoming', false);  // Use boolean value instead of string
      formData.append('sender_income', true);  // Use boolean value instead of string
      formData.append('subtype', '');
      formData.append('chatmaster_id', chatmasterid);
      formData.append('image', SelectedImg);
      formData.append('audio', Audio);

      
      const axiosInstance = axios.create({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
 
      const res = await axiosInstance.post(`${chatserverUrl}/msgconversation`, formData);
        
         console.log(res.data.data.sendAfterConversation);
       if(res.data){
         if(res.data.code==200){
          handleClear();
          setChathistory(res.data.data.sendAfterConversation);
          setSelectedImg('');
           fetchSenderReceiverMsg(chatmasterid,userid);
         } else{
           console.log(res);
         }
       }
      
     } catch (err) {
       
       console.log('err',err);
     }
  };


  console.log(profileImg);


  const handleFileChange = (e) =>{
 // Handle the selected file
 const selectedFile = e.target.files[0];
 setSelectedImg(selectedFile);
 console.log('Selected file:', selectedFile);

 // You can add additional logic to handle the selected file
  }

  const handleDocsFileChange = (e) =>{
 
    const selectedDocsFile = e.target.files[0];
    if (selectedDocsFile) {
      // Check if the selected file is a document
      if (selectedDocsFile.type.startsWith('application/') || selectedDocsFile.type === 'text/plain') {
        console.log('Selected document:', selectedDocsFile);
        // Do something with the selected document
      } else {
        alert('Please select a valid document file.');
      }
    }

  }
  const handleButtonClick = () => {
    // Trigger the click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.value = null;
    }
  };

  const handleDocsButtonClick = () => {
    // Trigger the click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.value = null;
    }
  };

  const handlemicrophone = () =>{
    setClickmicrophone(1);
    console.log('microphone');
  }
console.log(Audio);
  return (
    <Stack direction='row' sx={{ width: '100%' }}>
      {/* Chats */}
     







      <Box sx={{
      position: "relative", width: 320,
      backgroundColor: theme.palette.mode === 'light' ? "#F8FAFF" : theme.palette.background.paper,
      boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
    }}>
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'>
         
          <IconButton>
            <CircleDashed />
          </IconButton>
        </Stack>

        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
          </Search>
        </Stack>

        <Stack spacing={1}>
          <Stack direction='row' alignItems='center' spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>
              Archive
            </Button>
          </Stack>
          <Divider />
        </Stack>

        <Stack className='scrollbar' spacing={2} direction='column' sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}>
          <Stack spacing={2.4}>
            
            {data.filter((el) => !el.pinned).map((el) => (
              <ChatElement key={el.id} {...el} onClick={(e) => handleChatClick(chatmasterid,userid,el.id,el.img,el.name, e)}/>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>


      <Box sx={{ height: '100%', width: '100%',
       backgroundColor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.default }}>
      {/* Conversation */}
      {/* <Conversation/> */}


      { chatspace ? (
       <>
    
     

       {

joinchatmaster === 1 ? (
<>
{/* <Conversation/> */}
<Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
       {/* Chat header */}
      <Header profilepic={profileImg} name={dpname}/>
        {/* Msg */}
        <Scrollbars
      ref={scrollbarsRef}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMax="100%"
      style={{ width: '100%' }}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: '#888',
            borderRadius: '6px',
          }}
        />
      )}
    >
      <Message menu={true} senderid={userid} receiverid={clickedChatId} chathistory={chathistory}/>
    </Scrollbars>
        {/* Chat footer */}
       {/* <Footer senderid={userid} receiverid={clickedChatId}/> */}
       

       <Box p={2} sx={{ width:'100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' :
     theme.palette.background.paper, boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
    <Stack direction='row' alignItems={'center'} spacing={3}>

        <Stack sx={{width:'100%'}}> 
             {/* Chat Input */}
            <Box sx={{ display: openPicker ? 'inline' : 'none' , zIndex:10, position:'fixed',bottom:81, right:100}} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                {/* <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log}/> */}
                <Picker
          onSelect={handleEmojiClick}
          style={{ position: 'absolute', bottom: '50px', right: '50px' }}
        />
            </Box> 
            <ChatInput 
            setOpenPicker={setOpenPicker} 
            handleChange={handleChange}
             handleClear={handleClear}
              fileInputRef={fileInputRef}
               handleFileChange={handleFileChange}
                handleButtonClick={handleButtonClick}
                handleDocsFileChange={handleDocsFileChange}
                handleDocsButtonClick={handleDocsButtonClick}
                isRecording={isRecording}
                onStop={onStop}
                onData={onData}
                startRecording={startRecording}
                stopRecording={stopRecording}
                microphone={microphone}
                updateMicrophoneValue={updateMicrophoneValue}
                />
        </Stack>
        
        <Box sx={{height:48, width: 48, backgroundColor:theme.palette.primary.main, 
        borderRadius: 1.5}}>
            <Stack sx={{height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                <IconButton>
                    
                    
                  {

                    inputValue.length === 0 ? ( Audio ?  (<PaperPlaneTilt color='#fff' onClick={handleSendmessage}/>) : (<Microphone color='#fff' onClick={handlemicrophone}/>)) : (<PaperPlaneTilt color='#fff' onClick={handleSendmessage}/>)
                  }

                </IconButton>
            </Stack>
            

        </Box>
    </Stack>
</Box>



       </Stack>

</>
) : (
  <>

  {
    startchats === 1 ? (
     <>

{/* <Conversation/> */}
<Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
       {/* Chat header */}
      <Header/>
        {/* Msg */}
        <Box className='scrollbar' width="100%" sx={{ flexGrow: 1, overflowY: 'auto', height: '100%' }} ref={scrollbarsRef}>
  <Message menu={true} senderid={userid} receiverid={clickedChatId} chathistory={chathistory}/>
</Box>
        {/* Chat footer */}
       {/* <Footer senderid={userid} receiverid={clickedChatId}/> */}
       

       <Box p={2} sx={{ width:'100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' :
     theme.palette.background.paper, boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
    <Stack direction='row' alignItems={'center'} spacing={3}>

        <Stack sx={{width:'100%'}}> 
             {/* Chat Input */}
            <Box sx={{ display: openPicker ? 'inline' : 'none' , zIndex:10, position:'fixed',bottom:81, right:100}}>
                <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log}/>
            </Box> 
            <ChatInput setOpenPicker={setOpenPicker} handleChange={handleChange} />
        </Stack>
        
        <Box sx={{height:48, width: 48, backgroundColor:theme.palette.primary.main, 
        borderRadius: 1.5}}>
            <Stack sx={{height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                <IconButton onClick={handleSendmessage}>
                    <PaperPlaneTilt color='#fff'/>
                </IconButton>
            </Stack>
            
        </Box>
    </Stack>
</Box>



       </Stack>

     </>
    ) : (
      <>
      <StartChat onClick={handleStart}/>
      </>
    )
  }
   
    
  </>
)
}


       </>
      ) : (
       
        <div>Welcome page</div>
      )  }



      </Box>
     
     
    </Stack>
  );
};

export default GeneralApp;
