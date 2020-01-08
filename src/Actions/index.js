export const setUniversity = (uni_id, uni_name) => {
  return {
    type: "SET_UNI",
    uni_id: uni_id,
    uni_name: uni_name
  };
};

export const setDepartment = (dept_id, dept_name) => {
  return {
    type: "SET_DEPT",
    dept_id: dept_id,
    dept_name: dept_name
  };
};

export const setAdmin = is_admin => {
  return {
    type: "SET_ADMIN",
    is_admin: is_admin
  };
};

export const setUserInfo = (
  user_pk,
  username,
  email,
  first_name,
  last_name,
  member_pk,
  member_id
) => {
  return {
    type: "SET_USER_INFO",
    user_pk,
    username,
    email,
    first_name,
    last_name,
    member_pk,
    member_id
  };
};

export const setDataStatus = data_status => {
  return {
    type: "SET_DATA_STATUS",
    is_data_recieved: data_status
  };
};

export const setSelectedPlace = selected_place => {
  return {
    type: "SET_SELECTED_PLACE",
    selected_place: selected_place
  };
};

export const setSelectedDate = selected_date => {
  return {
    type: "SET_SELECTED_DATE",
    selected_date: selected_date
  };
};

export const setDateTimeSlots = date_time_slots => {
  return {
    type: "SET_DATE_TIME_SLOTS",
    date_time_slots: date_time_slots
  };
};

export const setSelectedDateTimeSlot = selected_date_time_slot => {
  return {
    type: "SET_SELECTED_DATE_TIME_SLOT",
    selected_date_time_slot: selected_date_time_slot
  };
};

export const setReservations = reservations => {
  return {
    type: "SET_RESERVATIONS",
    reservations: reservations
  };
};

export const setSelectedReservation = selected_reservation => {
  return {
    type: "SET_SELECTED_RESERVATION",
    selected_reservation: selected_reservation
  };
};

