import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import { ToggleSidebar, UpdateSidebarType } from '../../redux/slices/app';
import { LoggedUser } from "../../redux/slices/app";
import ToggleSidebar1 from '../../redux/slices/app';
import {useDispatch} from 'react-redux';




const MadeWithLove = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Built with love by the "}
    <Link color="inherit" href="https://material-ui.com/">
      Material-UI
    </Link>
    {" team."}
  </Typography>
);

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = () => {

  
  const dispatch = useDispatch();
  const { state } = useLocation();
  const yourProp = state && state.email;
  const navigate = useNavigate();
  const classes = useStyles();
  const [data,setData] = useState({
    email : "",
    password : ""
  });

  const handleChange = (event) => {
    setData({...data,[event.target.name]: event.target.value});
  }

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      const res = await axios.post('http://localhost:8001/api/signin',data);
      console.log(res.data.data.message);
      if(res.data){
        if(res.data.code==200){
          window.localStorage.setItem('auth',JSON.stringify(res.data.data));
         dispatch(LoggedUser());
          navigate('/app');
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

  console.log(data);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in 
          </Typography>
          <form className={classes.form} noValidat onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              
              onChange={handleChange}
              
            />
            <TextField
              variant="outlined"
              margin="normal"
              
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <MadeWithLove />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignIn;
