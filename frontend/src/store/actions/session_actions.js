import axios from 'axios';
import * as APIUtil from '../../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const signup = (user) => async (dispatch) => {
    try{
        const res = await axios.post('/api/users/register', user);
        if (res.status){
            dispatch(receiveUserSignIn())
        }
    } catch (errors) {
        dispatch(receiveErrors(errors.response.data))
    }
};

export const login = (user)=> async (dispatch) => {
    try{
        const res = await axios.post('/api/users/login', user);
        const { token } = res.data
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token)
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    } catch (err) {
        dispatch(receiveErrors(err.response.data));
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    APIUtil.setAuthToken(false)
    dispatch(logoutUser())
};
