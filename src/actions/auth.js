import { EDIT, LOGIN, LOGOUT, REGISTER } from "../constants/actionTypes";
import authService from "../services/auth.service";
import jwt from "jsonwebtoken";
import setAuthorizationToken from "../components/utils/setAuthorizationToken";


export const RegisterUser = (model) => async (dispatch) =>{
    try{
        console.log("register to");

        const result = await authService.register(model);
        console.log("register compilte", result);
        dispatch({type: REGISTER});
        console.log("register compilte", result.data);
        const token = result.data.token;
        console.log("adasdasd");
        dispatch(authUser(token));
        console.log("adasdasda12414");
        return Promise.resolve(result);
    }
    catch(err){
        console.log(err);
        return Promise.reject(err.response.data);
    }
}

export const LoginUser = (model) => async (dispatch) =>{
    try{
        const result = await authService.login(model);
        const token = result.data.token;
        localStorage.authToken = token;
        dispatch(authUser(token));
        return Promise.resolve(result);
    }
    catch(err){
        console.log(err);
        return Promise.reject(err.response.data);
    }
}

export const authUser = (token) => (dispatch) =>{
    var user = jwt.decode(token);
    setAuthorizationToken(token);
    dispatch({type: LOGIN, payload: user});
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken')
    dispatch({
        type: LOGOUT
    });
}