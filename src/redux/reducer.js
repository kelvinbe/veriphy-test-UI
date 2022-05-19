const initialState = {
  auth: null,
  users: null
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
    case "GET_USER_AUTH":
        localStorage.setItem('profile', JSON.stringify({ ...action?.data.result}))
        console.log('actionsss', action?.data)
      return {auth: action.data}
    default:
      return state;
  }
};

export default rootReducer;
