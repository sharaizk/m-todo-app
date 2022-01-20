import {SIGN_IN, SIGN_OUT, SIGN_UP, PASS_CHANGED} from '../actions/Types'

const INITIALSTATE = {
    isSignedIn: false,
    userId: null,
    userData: null,
    token: null
}

const authReducer = (state = INITIALSTATE, action)=>{
    switch(action.type){
        case SIGN_IN:
            const{userData} = action.payload
            return{...state, isSignedIn:true, userId: userData._id, userData: userData}
        case SIGN_UP:
            return {...state, isSignedIn: false, userId: null, userData: null}
        case SIGN_OUT:
            return{...state, isSignedIn: false, userId: null, userData: null}
        case PASS_CHANGED:
            return{...state}
        default:
            return {...state}
    }
}
export default authReducer