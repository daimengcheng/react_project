import { SAVE_USER_INFO, DELETE_USER_INFO } from "../action_types";

export const createSaveUserInfoAction = (value) => {

    localStorage.setItem('user', JSON.stringify(value))
    localStorage.setItem('id', JSON.stringify(value._id))
    return { type: SAVE_USER_INFO, data: value }
}

export const createDeleteUserAction = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('id')
    return { type: DELETE_USER_INFO }
}