const initialState = {
  auth: null,
  users: null,
  closedDialog: true
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ORDER_BY_TIME":
      console.log('dataaaaa', action?.data)
      return { users: action.data };
    case "ORDER_BY_NAME":
      return { users: action.data };
    case "GET_USERS":
      return { users: action?.data };
    case "LOGOUT":
      localStorage.clear()
      return { users: null };
    case "CLOSE_DIALOG":
      localStorage.setItem('closedDialogggg', state.closedDialog = false)
        return { closedDialog: false };
    case "GET_USER_AUTH":
        localStorage.setItem('profile', JSON.stringify({ ...action?.data.result}))
        localStorage.setItem('closedDialogggg', true)
        console.log('actionsss', action?.data)
      return {auth: action.data, timesLoggedIn: state.timesLoggedIn + 1}
    default:
      return state;
  }
};

export default rootReducer;
