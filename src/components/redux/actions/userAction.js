import {loginUser} from "../../services/userServices";
import {toast} from "react-toastify";

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';

export const handleLoginRedux = (valueLogin, password) => {
    return async (dispatch, getState) => {
        dispatch({type: FETCH_USER_LOGIN});

        let response = await loginUser(valueLogin, password);
        if (response && +response.EC === 0) {
            //success
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.token;
            let payload = {
                isAuthenticated: true,
                token,
                account: {groupWithRoles, email, username}
            }

            localStorage.setItem('jwt', token)

            dispatch({
                type: FETCH_USER_SUCCESS,
                data: {payload}
            });
        }

else
    {
        //error
        if (response && +response.EC !== 0) {
            //error
            toast.error(response.EM)
        }
        dispatch({
            type: FETCH_USER_ERROR
        });

    }

}
}
export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT
        })
    }
}

export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH
        })
    }
}
