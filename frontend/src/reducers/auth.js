let userState;

if(window.localStorage.getItem('auth')){
  userState = JSON.parse(window.localStorage.getItem('auth'));
} else {
  userState = null;
}

//user reducer
const authReducer = (
  state = userState, action)=>{ //{type : 'LOGGED IN USER'}
    switch(action.type){
      case "LOGGED_IN_USER":
        return {...state,...action.payload}
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
  };

  export default authReducer;