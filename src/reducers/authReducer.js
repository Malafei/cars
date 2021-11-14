import { REGISTER, LOGIN, LOGOUT } from "../constants/actionTypes";


const initialState = {
    isAuth: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case REGISTER: {
            return{
                isAuth: false
            }
        }
        case LOGIN:{
            return{
                isAuth: true,
                user: payload
            }
        }

        case LOGOUT: {
            return{
                isAuth: false
            }
        }
        default: {
            return state;
        }
    }
}
export default authReducer;