const initState = {
  university_id: "",
  university_name: "",
  department_id: "",
  department_name: "",
  is_admin: "",
  user_pk: "",
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  member_pk: "",
  member_id: "",
  is_data_recieved: false,
  loading: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_DATA_STATUS":
      return {
        ...state,
        is_data_recieved: action.is_data_recieved
      };
    case "SET_UNI":
      return {
        ...state,
        university_id: action.uni_id,
        university_name: action.uni_name
      };

    case "SET_DEPT":
      return {
        ...state,
        department_id: action.dept_id,
        department_name: action.dept_name
      };
    case "SET_ADMIN":
      return {
        ...state,
        is_admin: action.is_admin
      };
    case "SET_USER_INFO":
      return {
        ...state,
        user_pk: action.user_pk,
        username: action.username,
        email: action.email,
        first_name: action.first_name,
        last_name: action.last_name,
        member_pk: action.member_pk,
        member_id: action.member_id
      };
    default:
      return state;
  }
};

export default reducer;
