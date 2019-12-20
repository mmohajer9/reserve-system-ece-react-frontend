export const setUniversity = (uni_id , uni_name) => {
    return {
        type : 'SET_UNI',
        uni_id : uni_id,
        uni_name : uni_name
    }
}

export const setDepartment = (dept_id , dept_name) => {
    return {
        type : 'SET_DEPT',
        dept_id : dept_id,
        dept_name : dept_name
    }
}
