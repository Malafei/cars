import { EDIT, LOGIN, LOGOUT, REGISTER, USERS_ALL, USERS_DELETED, USERS_EDIT } from "../constants/actionTypes";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import jwt from "jsonwebtoken";


export const UserAll= () => async(dispatch)=>{
    try{
        const {data} = await userService.all();
        dispatch({type: USERS_ALL, payload: data});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}

export const UserDelete = (id) => async(dispatch)=>{
    try{
        const {data} = await userService.delete(id);
        dispatch({type: USERS_DELETED, payload: id});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}

export const UserEdit = (id) => async(dispatch)=>{
    try{
        const {data} = await userService.edit(id);
        dispatch({type: USERS_EDIT, payload: data});
        return Promise.resolve();
    }
    catch(err){
        return Promise.reject(err.response.data);
    }
}