import {CREATE_TASK, GET_TASKS, COMPLETE_TASK, GETDATE_TASK, SIGN_OUT} from '../actions/Types'

const INITIALSTATE = {
    tasklist: [],
    dateList:[]
}

const taskReducer = (state = INITIALSTATE, action)=>{
    switch(action.type){
        case CREATE_TASK:
            return{...state}
        case GET_TASKS:
            return {...state, tasklist: action.payload.tasks}
        case COMPLETE_TASK:
            return{...state}
        case GETDATE_TASK:
            return{...state, dateList: action.payload.tasks}
        case "DELETE_TASK":
            return{...state}
        case SIGN_OUT:
            return {...state, tasklist:[], dateList:[]}
        default:
            return {...state}
    }
}
export default taskReducer