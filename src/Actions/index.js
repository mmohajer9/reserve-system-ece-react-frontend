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
