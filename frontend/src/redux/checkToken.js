// NOTE this file is used to check the token which user has is the write token or not
import { baseUrl } from '../shared/baseUrl'; // so here we import the base url
import { userDataSuccess } from './dispatchers';
import { logout } from './ActionCreators';
import { getToken, getUser } from './allTokens';


export const checkToken = () => (dispatch) => {

    const token = getToken();
    const username = getUser();
    const endPoint = '/users/checkJWTToken';
    
    return fetch(baseUrl + endPoint,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
            },
            
        })
        .then(response => {
            if (response.ok) {
                return response
            }
            else { 
                if (response.ok) {
                    return response
                }
                else { 
                    var error = new Error('Error: '+ response.status + ': ' + response.statusText); 
                    error.response = response;  
                    throw error; 
                }
            }

        },               
        error => {
            var errmess = new Error(error.message); 
            throw errmess;
        })
        .then( data => data.json())
        .then(data => {
            if(data.success === true){
                dispatch(userDataSuccess(username,token));
            }else if(data.success === false){
                dispatch(logout());
            }
            
        })
        .catch(error => console.log("Error: ",error.message)); // so if there is any error then we will dispatch the error function
       
}
