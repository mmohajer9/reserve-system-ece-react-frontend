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
  loading: false,
  selected_place: "",
  selected_date: "",
  date_time_slots: [],
  selected_date_time_slot: "",
  reservations: [],
  selected_reservation: ""
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_SELECTED_RESERVATION":
      return {
        ...state,
        selected_reservation : action.selected_reservation
      }

    case "SET_RESERVATIONS":
      return {
        ...state,
        reservations: action.reservations
      };

    case "SET_SELECTED_DATE_TIME_SLOT":
      return {
        ...state,
        selected_date_time_slot: action.selected_date_time_slot
      };
    case "SET_DATE_TIME_SLOTS":
      return {
        ...state,
        date_time_slots: action.date_time_slots
      };
    case "SET_SELECTED_DATE":
      return {
        ...state,
        selected_date: action.selected_date
      };
    case "SET_SELECTED_PLACE":
      return {
        ...state,
        selected_place: action.selected_place
      };
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
