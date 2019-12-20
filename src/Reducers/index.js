const initState = {
  university_id: "",
  university_name: "",
  department_id: "",
  department_name: "",
  isAdmin: "",
  user_pk: "",
  username: "",
  first_name: "",
  last_name: "",
  member_id: ""
};

const reducer = (state = initState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default reducer;
