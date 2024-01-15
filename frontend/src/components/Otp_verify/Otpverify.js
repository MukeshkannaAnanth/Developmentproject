import React, { useState } from 'react';
import './otpverify.css'; // Make sure to import your CSS file
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";




const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const classes = useStyles();
  const navigate = useNavigate();


  const numberArray = otp.map((str) => +str).join('');
  const otp_no = { 'otp_no': numberArray};
  const isArrayEmpty = (arr) => arr.every((element) => element.trim().length === 0);


   const handleOtp = async(event) => {
    event.preventDefault();

    try {
      const res = await axios.post('http://localhost:8001/api/otpverify',otp_no);
      console.log(res);
      if(res.data){
        if(res.data.code==200){
          navigate('/signin');
          toast.success(res.data.data.message);
        } else{
          console.log(res);
          toast.error(res.data.data.message);
        }
      }

    } catch (err) {
      console.log('err',err.response.data.data.message);
      toast.error('Failed. '+err.response.data.data.message);
    }
   }



  const handleInputChange = (event, index) => {
    let value = event.target.value;

    // Ensure the input is a number
    if (!isNaN(value) && value !== '') {
      // Update the state with the new value
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      // Move to the next input if available
      if (index < 5) {
        document.querySelector(`.otp__field__${index + 2}`).focus();
      }
    }

    // Move to the previous input on backspace
    if (event.keyCode === 8 && index > 0) {
      document.querySelector(`.otp__field__${index}`).focus();
    }
  };

  const renderOtpInputs = () => {
    return otp.map((digit, index) => (
      <input
        key={index}
        type="number"
        className={`otp__digit otp__field__${index + 1}`}
        value={digit}
        onChange={(event) => handleInputChange(event, index)}
      />
    ));
  };

console.log(otp_no);


  return (
    <form className="otp-form" name="otp-form" onSubmit={handleOtp}>
      <div className="title">
        <h3>OTP VERIFICATION</h3>
        <p className="info">An otp has been sent to ********k876@gmail.com</p>
        <p className="msg">Please enter OTP to verify</p>
      </div>
      <div className="otp-input-fields">{renderOtpInputs()}</div>
      <div className="result">
       
       {

        

         isArrayEmpty(otp) || otp[0].length===0 || otp[1].length===0 || otp[2].length===0 || otp[3].length===0 || otp[4].length===0 || otp[5].length===0  ? (
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled
          >
            Verify Otp
          </Button>
          
         ) : (
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          
        >
          Verify Otp
        </Button>
         )
       }

        <p id="_otp" className={otp.length === 6 ? '_ok' : '_notok'}>
          {otp.join('')}
        </p>
      </div>
      
    </form>
  );
};

export default OTPVerification;
