/**
 * Created by DaGuo on 2017/5/4.
 */
import {makeActionCreator, createReducer,createHandlers} from './create_helper';
import request,{ getToken,setToken,removeToken} from '../request';
import { USER} from '../constant'

const DEV = process.env.NODE_ENV == 'development';

const AUTHORIZE = 'AUTHORIZE';
const authorize = makeActionCreator(AUTHORIZE,'isAuthorized')


export function handleAuthorize(username,password){
    return (dispatch)=>{
        return request({
            method:'POST',
            url: USER.authorize,
            params: {username,password}

        })
            .then(res=>res.json())
            .then(json=>{
                DEV && console.log('authorize',json)
                if(json.status){
                    const { token } = json
                    setToken(token)
                    dispatch(authorize(true)) // authorize successfully
                }else{
                    const { message } = json
                    throw new Error(message)
                }
            })
    }
}

export function handleAutoAuth(){
    return (dispatch)=>{
        let token = getToken()
        if(token){
           return request({
                method:'POST',
                token,
                url: USER.autoAuth
            })
                .then(res=>res.json())
                .then(json=>{
                    const { status } = json
                    DEV && console.log('autoAuth:',json);
                    if(status){
                        dispatch(authorize(true))
                    }
                })
        }
    }
}

export function handleLogOut(){
    return ( dispatch )=>{
        removeToken()
        dispatch(authorize(false))
    }
}

const initialState = {
    isAuthorized:false
}
export const user_state = createReducer(initialState,{
    [AUTHORIZE]:(state,action)=>{
        let { isAuthorized } = action
        return {
            ...state,
            isAuthorized
        }
    }
})

