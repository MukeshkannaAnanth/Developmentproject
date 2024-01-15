import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './startchat.css'
import ChatIcon from '@mui/icons-material/Chat';

const StartChat = ( {onClick }) => {
  return (
    <div class="d-flex">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
<section class="container pt-3 mb-3">
<h2 class="h3 block-title text-center">What we do<small>Whatever we do, we do with your end user in mind </small></h2>
<div class="row pt-5 mt-30 " style={{
    justifyContent:"center"
}}>
<div class="col-lg-4 col-sm-6 mb-30 pb-5" onClick={onClick}>
    <a class="card" href="#/">
        <div class="box-shadow bg-white rounded-circle mx-auto text-center" style={{/*width: 90px; height: 90px; margin-top: -45px;*/}}><i class="fa fa-comment fa-3x head-icon"></i></div>
        <div class="card-body text-center">
            <h3 class="card-title pt-1">Start Chat</h3>
            <p class="card-text text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p><span class="text-sm text-uppercase font-weight-bold">Learn More&nbsp;<i class="fe-icon-arrow-right"></i></span>
        </div>
    </a>
</div>
<div class="col-lg-4 col-sm-6 mb-30 pb-5">
    <a class="card" href="#/">
        <div class="box-shadow bg-white rounded-circle mx-auto text-center" style={{/*width: 90px; height: 90px; margin-top: -45px;*/}}><i class="fa fa-user-circle-o fa-3x head-icon"></i></div>
        <div class="card-body text-center">
            <h3 class="card-title pt-1">Web &amp; UI Design</h3>
            <p class="card-text text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p><span class="text-sm text-uppercase font-weight-bold">Learn More&nbsp;<i class="fe-icon-arrow-right"></i></span>
        </div>
    </a>
</div>

</div>
</section>
</div>
  )
}

export default StartChat